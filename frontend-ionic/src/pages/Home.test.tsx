import React from 'react';
import type * as MockReact from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getAssessmentForm, getCurrentMember, getSavedAssessment, login, logout, updateAssessment, validateSection } from '../api';
import { loadMemberHome } from '../memberHome';
import Home from './Home';

jest.mock('../api');
jest.mock('../memberHome');
jest.mock('../components/ArticleLibrary', () => ({ __esModule: true,
  default: ({ answers }: { answers: Record<string, { status: string }> }) =>
    <div>Article state: {answers.sleep_problems?.status ?? 'general'}</div> }));

// Keep Ionic layout out of component logic tests; verify the real scrollToTop contract.
jest.mock('@ionic/react', () => {
  const mockReact = jest.requireActual<typeof import('react')>('react');
  interface MockContainerProps {
    children?: MockReact.ReactNode;
  }
  interface MockValueEvent {
    detail: { value: string };
  }
  interface MockRadioGroupProps {
    'aria-label'?: string;
    value?: string;
    onIonChange: (event: MockValueEvent) => void;
  }
  interface MockInputProps {
    'aria-label'?: string;
    type?: MockReact.HTMLInputTypeAttribute;
    required?: boolean;
    value?: string | number;
    onIonInput?: (event: MockValueEvent) => void;
  }
  interface MockContentHandle {
    scrollToTop: () => Promise<void>;
  }
  const container = (props: MockContainerProps) => mockReact.createElement('div', {}, props.children);
  const content = mockReact.forwardRef<MockContentHandle, MockContainerProps>(function MockIonContent(props, ref) {
    const element = mockReact.useRef<HTMLDivElement>(null);
    mockReact.useImperativeHandle(ref, () => ({ scrollToTop: () => {
      const node = element.current;
      if (!node) throw new Error('Mock Ionic content is not mounted');
      node.setAttribute('data-scroll-count', String(Number(node.getAttribute('data-scroll-count') ?? 0) + 1));
      return Promise.resolve();
    } }));
    return mockReact.createElement('div', { ref: element, 'data-testid': 'ion-content' }, props.children);
  });
  return {
    IonPage: container, IonHeader: container, IonToolbar: container, IonTitle: container,
    IonItem: container, IonLabel: container, IonList: container, IonText: container,
    IonRadio: container,
    IonRadioGroup: (props: MockRadioGroupProps) => mockReact.createElement('select', {
      'aria-label': props['aria-label'], value: props.value ?? '',
      onChange: (event: MockReact.ChangeEvent<HTMLSelectElement>) => props.onIonChange({ detail: { value: event.target.value } }),
    }, ['', 'CONCERN', 'NO_CONCERN', 'SKIPPED'].map((value) => mockReact.createElement('option', { key: value, value }, value))),
    IonSelect: container, IonSelectOption: container,
    IonContent: content,
    IonLoading: () => null,
    IonButton: (props: MockReact.ButtonHTMLAttributes<HTMLButtonElement>) => mockReact.createElement('button', {
      onClick: props.onClick, disabled: props.disabled, type: props.type ?? 'button',
    }, props.children),
    IonInput: (props: MockInputProps) => mockReact.createElement('input', { 'aria-label': props['aria-label'],
      type: props.type, required: props.required, value: props.value ?? '',
      onChange: (event: MockReact.ChangeEvent<HTMLInputElement>) => props.onIonInput?.({ detail: { value: event.target.value } }),
    }),
    IonCheckbox: container, IonTextarea: container,
  };
});

const member = { memberId: 'member', email: 'member@example.test', firstName: 'Elijah', lastName: 'Johnston' };
const form = { version: 1, explanation: 'Optional', sections: [
  { id: 'first', title: 'First section', items: [] },
  { id: 'second', title: 'Second section', items: [] },
] };

beforeEach(() => {
  jest.clearAllMocks();
  (getCurrentMember as jest.Mock).mockResolvedValue(member);
  (validateSection as jest.Mock).mockResolvedValue({ valid: true });
});

test('refresh restores saved answers and name directly to the article home', async () => {
  (loadMemberHome as jest.Mock).mockResolvedValue({ form: null, saved: {
    completedAt: '2026-11-17T20:00:00Z', answers: { sleep_problems: { status: 'CONCERN' } }, sectionFollowUps: {},
  } });
  render(<Home />);
  expect(await screen.findByRole('heading', { name: 'Welcome, Elijah Johnston!' })).toBeInTheDocument();
  expect(screen.getByText('Article state: CONCERN')).toBeInTheDocument();
  expect(screen.queryByText('First section')).not.toBeInTheDocument();
});

test('each next/back section and the review screen resets the Ionic scroll position', async () => {
  (loadMemberHome as jest.Mock).mockResolvedValue({ saved: null, form });
  render(<Home />);
  await screen.findByRole('heading', { name: 'First section' });
  const count = () => Number(screen.getByTestId('ion-content').getAttribute('data-scroll-count'));
  await waitFor(() => expect(count()).toBeGreaterThan(0));
  let before = count();
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
  await screen.findByRole('heading', { name: 'Second section' });
  await waitFor(() => expect(count()).toBeGreaterThan(before));
  before = count();
  fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  await screen.findByRole('heading', { name: 'First section' });
  await waitFor(() => expect(count()).toBeGreaterThan(before));
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
  await screen.findByRole('heading', { name: 'Second section' });
  before = count();
  fireEvent.click(screen.getByRole('button', { name: 'Review answers' }));
  await screen.findByRole('heading', { name: 'Review your answers' });
  await waitFor(() => expect(count()).toBeGreaterThan(before));
});

test('failed restoration offers retry and never displays a new questionnaire', async () => {
  (loadMemberHome as jest.Mock).mockRejectedValueOnce(new Error('Offline'))
    .mockResolvedValueOnce({ saved: null, form });
  render(<Home />);
  await screen.findByRole('heading', { name: 'Could not restore your account' });
  expect(screen.queryByText('First section')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Retry restoring account' }));
  expect(await screen.findByRole('heading', { name: 'First section' })).toBeInTheDocument();
});

test('first and last name are requested only when creating an account', async () => {
  (getCurrentMember as jest.Mock).mockResolvedValue(null);
  render(<Home />);
  await screen.findByRole('heading', { name: 'Sign in' });
  expect(screen.queryByLabelText('First name')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
  expect(screen.getByLabelText('First name')).toBeRequired();
  expect(screen.getByLabelText('Last name')).toBeRequired();
});

test('switching authentication screens discards credentials in both directions', async () => {
  (getCurrentMember as jest.Mock).mockResolvedValue(null);
  const { container } = render(<Home />);
  await screen.findByRole('heading', { name: 'Sign in' });
  const email = () => container.querySelector('input[type="email"]') as HTMLInputElement;
  const password = () => container.querySelector('input[type="password"]') as HTMLInputElement;
  fireEvent.change(email(), { target: { value: 'signin@example.test' } });
  fireEvent.change(password(), { target: { value: 'first-secret' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
  expect(email()).toHaveValue('');
  expect(password()).toHaveValue('');
  fireEvent.change(email(), { target: { value: 'signup@example.test' } });
  fireEvent.change(password(), { target: { value: 'second-secret' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign in/ }));
  expect(email()).toHaveValue('');
  expect(password()).toHaveValue('');
});

test('signing out remounts an empty sign-in form', async () => {
  (getCurrentMember as jest.Mock).mockResolvedValue(null);
  (login as jest.Mock).mockResolvedValue(member);
  (logout as jest.Mock).mockResolvedValue(undefined);
  (loadMemberHome as jest.Mock).mockResolvedValue({ saved: null, form });
  render(<Home />);
  await screen.findByRole('heading', { name: 'Sign in' });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'member@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'private-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  await screen.findByRole('heading', { name: 'First section' });
  expect(login).toHaveBeenCalledWith('member@example.test', 'private-password');
  fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
  await screen.findByRole('heading', { name: 'Sign in' });
  expect(screen.getByLabelText('Email')).toHaveValue('');
  expect(screen.getByLabelText('Password')).toHaveValue('');
});

const editForm = { version: 1, explanation: 'Optional', sections: [{ id: 'physical_concerns',
  title: 'Physical concerns', items: [{ id: 'sleep_problems', question: 'Sleep problems', inputType: 'CONCERN',
    options: [{ value: 'CONCERN', label: 'Concern' }, { value: 'NO_CONCERN', label: 'No concern' },
      { value: 'SKIPPED', label: 'Skip' }], units: [], followUpPrompt: null }] }] };
const savedSnapshot = { formVersion: 1, completedAt: '2026-11-17T20:00:00Z', updatedAt: '2026-11-17T20:00:00Z',
  revision: 0, answers: { sleep_problems: { status: 'CONCERN' } }, sectionFollowUps: {} };

async function openSavedAnswers() {
  (loadMemberHome as jest.Mock).mockResolvedValue({ form: null, saved: savedSnapshot });
  (getSavedAssessment as jest.Mock).mockResolvedValue(savedSnapshot);
  (getAssessmentForm as jest.Mock).mockResolvedValue(editForm);
  render(<Home />);
  await screen.findByRole('heading', { name: 'Welcome, Elijah Johnston!' });
  fireEvent.click(screen.getByRole('button', { name: 'Health assessment' }));
  await screen.findByRole('heading', { name: 'Your health assessment' });
}

test('profile and saved answers are accessible from the named sidebar', async () => {
  await openSavedAnswers();
  expect(screen.getByText('Concern')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
  expect(await screen.findByRole('heading', { name: 'My profile' })).toBeInTheDocument();
  expect(screen.getByText('member@example.test')).toBeInTheDocument();
});

test('cancel discards draft answers and leaves the saved feed unchanged', async () => {
  await openSavedAnswers();
  fireEvent.click(screen.getByRole('button', { name: 'Edit answers' }));
  fireEvent.change(screen.getByLabelText('Sleep problems'), { target: { value: 'NO_CONCERN' } });
  fireEvent.click(screen.getByRole('button', { name: 'Cancel changes' }));
  expect(screen.getByText('Concern')).toBeInTheDocument();
  expect(updateAssessment).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Articles' }));
  expect(await screen.findByText('Article state: CONCERN')).toBeInTheDocument();
});

test('saving an edit updates recommendations only after the successful response', async () => {
  await openSavedAnswers();
  const updated = { ...savedSnapshot, revision: 1, answers: { sleep_problems: { status: 'NO_CONCERN' } } };
  (updateAssessment as jest.Mock).mockResolvedValue(updated);
  fireEvent.click(screen.getByRole('button', { name: 'Edit answers' }));
  fireEvent.change(screen.getByLabelText('Sleep problems'), { target: { value: 'NO_CONCERN' } });
  fireEvent.click(screen.getByRole('button', { name: 'Review answers' }));
  await screen.findByRole('heading', { name: 'Review your answers' });
  fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
  await screen.findByRole('heading', { name: 'Your health assessment' });
  expect(updateAssessment).toHaveBeenCalledWith(1, expect.any(String), 0,
    { sleep_problems: { status: 'NO_CONCERN' } }, {}, false);
  fireEvent.click(screen.getByRole('button', { name: 'Articles' }));
  expect(await screen.findByText('Article state: NO_CONCERN')).toBeInTheDocument();
});

test('failed saves retain edits for retry while Cancel returns to the previous snapshot', async () => {
  await openSavedAnswers();
  (updateAssessment as jest.Mock).mockRejectedValueOnce(new Error('Temporarily unavailable'));
  fireEvent.click(screen.getByRole('button', { name: 'Edit answers' }));
  fireEvent.change(screen.getByLabelText('Sleep problems'), { target: { value: 'NO_CONCERN' } });
  fireEvent.click(screen.getByRole('button', { name: 'Review answers' }));
  await screen.findByRole('heading', { name: 'Review your answers' });
  fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Temporarily unavailable');
  expect(screen.getByText('No concern')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save changes' })).toBeEnabled();
  fireEvent.click(screen.getByRole('button', { name: 'Cancel changes' }));
  expect(screen.getByText('Concern')).toBeInTheDocument();
});

test('clearing all answers requires explicit confirmation before saving', async () => {
  await openSavedAnswers();
  (updateAssessment as jest.Mock).mockResolvedValue({ ...savedSnapshot, revision: 1,
    answers: { sleep_problems: { status: 'SKIPPED' } } });
  fireEvent.click(screen.getByRole('button', { name: 'Edit answers' }));
  fireEvent.click(screen.getByRole('button', { name: 'Clear all answers' }));
  expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
  fireEvent.click(screen.getByRole('checkbox', { name: /all previously saved answers will be removed/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
  await screen.findByRole('heading', { name: 'Your health assessment' });
  expect(updateAssessment).toHaveBeenCalledWith(1, expect.any(String), 0, {}, {}, true);
  expect(screen.getByText('Skipped')).toBeInTheDocument();
});
