import { getAssessmentForm, getSavedAssessment, login, logout, register, updateAssessment } from './api';

const originalFetch = global.fetch;

beforeEach(() => {
  document.cookie = 'XSRF-TOKEN=test-csrf-token; path=/';
  global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
});

afterEach(() => {
  global.fetch = originalFetch;
  document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/';
});

test('loads the questionnaire from the backend with the session cookie', async () => {
  const form = { version: 1, explanation: 'Optional', sections: [] };
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({ ok: true, status: 200, text: async () => JSON.stringify(form) });

  await expect(getAssessmentForm()).resolves.toEqual(form);
  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/assessment/form',
    expect.objectContaining({ credentials: 'include' }),
  );
});

test('signs in using the backend CSRF cookie and header contract', async () => {
  const member = { memberId: 'member-id', email: 'member@example.test' };
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ headerName: 'X-XSRF-TOKEN' }),
    })
    .mockResolvedValueOnce({ ok: true, status: 200, text: async () => JSON.stringify(member) });

  await expect(login('member@example.test', 'secret')).resolves.toEqual(member);
  expect(global.fetch).toHaveBeenNthCalledWith(
    1,
    'http://localhost:8080/api/auth/csrf',
    expect.objectContaining({ credentials: 'include' }),
  );
  const loginRequest = (global.fetch as jest.Mock).mock.calls[1][1] as RequestInit;
  expect(new Headers(loginRequest.headers).get('X-XSRF-TOKEN')).toBe('test-csrf-token');
  expect(loginRequest.body).toBe(JSON.stringify({ email: 'member@example.test', password: 'secret' }));
});

test('signs out successfully when the backend returns an empty response', async () => {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ headerName: 'X-XSRF-TOKEN' }),
    })
    .mockResolvedValueOnce({ ok: true, status: 200, text: async () => '' });

  await expect(logout()).resolves.toBeUndefined();
});

test('saved assessment retrieval is owner-session based and bypasses browser caching', async () => {
  const saved = { formVersion: 1, completedAt: '2026-11-17T20:00:00Z', answers: {}, sectionFollowUps: {} };
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, status: 200, text: async () => JSON.stringify(saved) });
  await expect(getSavedAssessment()).resolves.toEqual(saved);
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/assessment',
    expect.objectContaining({ credentials: 'include', cache: 'no-store' }));
});

test('204 means no completed assessment', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, status: 204, text: async () => '' });
  await expect(getSavedAssessment()).resolves.toBeNull();
});

test.each(['', 'null', '{}'])('a malformed 200 response (%s) cannot restart the questionnaire', async (body) => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, status: 200, text: async () => body });
  await expect(getSavedAssessment()).rejects.toThrow();
});

test('a saved-assessment server failure is not converted to a fresh questionnaire', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503,
    text: async () => JSON.stringify({ detail: 'Temporarily unavailable' }) });
  await expect(getSavedAssessment()).rejects.toThrow('Temporarily unavailable');
});

test('registration sends first and last name trimmed with the existing agreements', async () => {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ headerName: 'X-XSRF-TOKEN' }) })
    .mockResolvedValueOnce({ ok: true, status: 201, text: async () => JSON.stringify({ memberId: 'new-member' }) });
  await register('new@example.test', 'secret', true, true, ' Elijah ', ' Johnston ');
  const request = (global.fetch as jest.Mock).mock.calls[1][1] as RequestInit;
  expect(JSON.parse(request.body as string)).toEqual({ email: 'new@example.test', password: 'secret',
    ageEligibilityConfirmed: true, termsAccepted: true, firstName: 'Elijah', lastName: 'Johnston' });
});

test('assessment edits use PUT with CSRF, revision and retry identifier but no member ID', async () => {
  const saved = { formVersion: 1, revision: 1, completedAt: '2026-11-17T20:00:00Z', answers: {}, sectionFollowUps: {} };
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ headerName: 'X-XSRF-TOKEN' }) })
    .mockResolvedValueOnce({ ok: true, status: 200, text: async () => JSON.stringify(saved) });
  await expect(updateAssessment(1, 'update-id', 0, {}, {}, true)).resolves.toEqual(saved);
  const request = (global.fetch as jest.Mock).mock.calls[1][1] as RequestInit;
  expect(request.method).toBe('PUT');
  expect(new Headers(request.headers).get('X-XSRF-TOKEN')).toBe('test-csrf-token');
  expect(JSON.parse(request.body as string)).toEqual({ formVersion: 1, updateId: 'update-id', expectedRevision: 0,
    answers: {}, sectionFollowUps: {}, confirmClearAll: true });
});
