const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export type AnswerStatus = 'CONCERN' | 'NO_CONCERN' | 'SKIPPED' | 'OTHER';

export interface AssessmentAnswer {
  status?: AnswerStatus;
  value?: string;
  unit?: string;
  followUpText?: string;
}

export interface AssessmentOption {
  value: AnswerStatus;
  label: string;
  requiresShortAnswer: boolean;
}

export interface AssessmentItem {
  id: string;
  question: string;
  inputType: 'CONCERN' | 'TEXT' | 'NUMBER' | 'INTEGER';
  units: string[];
  options: AssessmentOption[];
  validationHint: string | null;
  followUpPrompt: string | null;
}

export interface AssessmentSection {
  id: string;
  title: string;
  items: AssessmentItem[];
  followUpPrompt: string | null;
}

export interface AssessmentForm {
  version: number;
  explanation: string;
  sections: AssessmentSection[];
}

export interface Member {
  memberId: string;
  email: string;
}

export type Answers = Record<string, AssessmentAnswer>;

interface ApiProblem {
  status?: number;
  code?: string;
  detail?: string;
  fieldErrors?: Record<string, string>;
}

export class ApiError extends Error {
  fieldErrors: Record<string, string>;
  status?: number;
  code?: string;

  constructor(
    message: string,
    fieldErrors: Record<string, string> = {},
    status?: number,
    code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
    this.fieldErrors = fieldErrors;
    this.status = status;
    this.code = code;
  }
}

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const entry = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : undefined;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  csrfProtected = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (csrfProtected) {
    const csrfResponse = await fetch(`${API_BASE_URL}/api/auth/csrf`, {
      credentials: 'include',
    });
    if (!csrfResponse.ok) {
      throw new ApiError('Could not prepare a secure request. Please try again.');
    }

    const csrf = (await csrfResponse.json()) as { headerName?: string };
    const token = readCookie('XSRF-TOKEN');
    if (!csrf.headerName || !token) {
      throw new ApiError('The security token was not available. Please refresh and try again.');
    }
    headers.set(csrf.headerName, token);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  const responseBody = await response.text();
  if (!response.ok) {
    let problem: ApiProblem = {};
    try {
      problem = responseBody ? (JSON.parse(responseBody) as ApiProblem) : {};
    } catch {
      throw new ApiError(`The server returned an unexpected response (${response.status}).`);
    }
    throw new ApiError(
      problem.detail ?? `Request failed (${response.status}).`,
      problem.fieldErrors,
      response.status,
      problem.code,
    );
  }

  if (response.status === 204 || !responseBody) {
    return undefined as T;
  }
  try {
    return JSON.parse(responseBody) as T;
  } catch {
    throw new ApiError('The server returned an invalid response.');
  }
}

export async function getCurrentMember(): Promise<Member | null> {
  try {
    return await request<Member>('/api/auth/me');
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

export function register(
  email: string,
  password: string,
  ageEligibilityConfirmed: boolean,
  termsAccepted: boolean,
): Promise<Member> {
  return request<Member>(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        ageEligibilityConfirmed,
        termsAccepted,
      }),
    },
    true,
  );
}

export function login(email: string, password: string): Promise<Member> {
  return request<Member>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) },
    true,
  );
}

export function logout(): Promise<void> {
  return request<void>('/api/auth/logout', { method: 'POST' }, true);
}

export function getAssessmentForm(): Promise<AssessmentForm> {
  return request<AssessmentForm>('/api/assessment/form');
}

export function validateSection(
  formVersion: number,
  sectionId: string,
  answers: Answers,
  sectionFollowUps: Record<string, string>,
): Promise<{ valid: boolean }> {
  return request(
    '/api/assessment/section-validations',
    {
      method: 'POST',
      body: JSON.stringify({ formVersion, sectionId, answers, sectionFollowUps }),
    },
    true,
  );
}

export function submitAssessment(
  formVersion: number,
  submissionId: string,
  answers: Answers,
  sectionFollowUps: Record<string, string>,
): Promise<{ formVersion: number; completedAt: string }> {
  return request(
    '/api/assessment',
    {
      method: 'POST',
      body: JSON.stringify({ formVersion, submissionId, answers, sectionFollowUps }),
    },
    true,
  );
}
