import { displayAnswer, hasDisclosedAnswers } from './assessmentDisplay';
import type { AssessmentItem } from './api';

const textItem: AssessmentItem = { id: 'age', question: 'Age', inputType: 'INTEGER', options: [], units: [],
  followUpPrompt: null, validationHint: null };
const selectItem: AssessmentItem = { id: 'biological_sex', question: 'Biological sex', inputType: 'SELECT',
  options: [{ value: 'FEMALE', label: 'Female', requiresShortAnswer: false }], units: [],
  followUpPrompt: null, validationHint: null };
test('saved skipped demographic answers display Skipped rather than a blank', () => {
  expect(displayAnswer(textItem, { status: 'SKIPPED' })).toBe('Skipped');
  expect(displayAnswer(textItem, { value: '34' })).toBe('34');
});
test('select answers display their labels instead of API values', () => {
  expect(displayAnswer(selectItem, { value: 'FEMALE' })).toBe('Female');
});
test('clearing checks distinguish skipped answers from explicit No concern', () => {
  expect(hasDisclosedAnswers({ age: { status: 'SKIPPED' } })).toBe(false);
  expect(hasDisclosedAnswers({ pain: { status: 'NO_CONCERN' } })).toBe(true);
  expect(hasDisclosedAnswers({ age: { value: '34' } })).toBe(true);
});
