import { getAssessmentForm, login, logout } from './api';

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
