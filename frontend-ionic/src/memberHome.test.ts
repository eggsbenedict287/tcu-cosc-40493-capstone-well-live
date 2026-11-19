import { getAssessmentForm, getSavedAssessment } from './api';
import { loadMemberHome } from './memberHome';

jest.mock('./api', () => ({ getAssessmentForm: jest.fn(), getSavedAssessment: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

test('a completed assessment restores the saved concerns without fetching a new quiz', async () => {
  const saved = { formVersion: 1, completedAt: '2026-11-17T20:00:00Z',
    answers: { sleep_problems: { status: 'CONCERN' } }, sectionFollowUps: {} };
  (getSavedAssessment as jest.Mock).mockResolvedValueOnce(saved);
  expect(await loadMemberHome()).toEqual({ saved, form: null });
  expect(getAssessmentForm).not.toHaveBeenCalled();
});

test('a member without a saved assessment starts a fresh questionnaire', async () => {
  const form = { version: 1, explanation: 'Optional', sections: [] };
  (getSavedAssessment as jest.Mock).mockResolvedValueOnce(null);
  (getAssessmentForm as jest.Mock).mockResolvedValueOnce(form);
  expect(await loadMemberHome()).toEqual({ saved: null, form });
});

test('a failed restoration is an error rather than an empty or repeat assessment', async () => {
  (getSavedAssessment as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await expect(loadMemberHome()).rejects.toThrow('Offline');
  expect(getAssessmentForm).not.toHaveBeenCalled();
});
