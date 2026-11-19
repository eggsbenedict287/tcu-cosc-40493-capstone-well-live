import { displayAnswer, hasDisclosedAnswers } from './assessmentDisplay';
import type { AssessmentItem } from './api';

const textItem: AssessmentItem = { id: 'age', question: 'Age', inputType: 'INTEGER', options: [], units: [],
  followUpPrompt: null, validationHint: null };
test('saved skipped demographic answers display Skipped rather than a blank', () => {
  expect(displayAnswer(textItem, { status: 'SKIPPED' })).toBe('Skipped');
  expect(displayAnswer(textItem, { value: '34' })).toBe('34');
});
test('clearing checks distinguish skipped answers from explicit No concern', () => {
  expect(hasDisclosedAnswers({ age: { status: 'SKIPPED' } })).toBe(false);
  expect(hasDisclosedAnswers({ pain: { status: 'NO_CONCERN' } })).toBe(true);
  expect(hasDisclosedAnswers({ age: { value: '34' } })).toBe(true);
});
