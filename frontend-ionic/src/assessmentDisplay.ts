import type { Answers, AssessmentItem } from './api';

export function displayAnswer(item: AssessmentItem, answer?: Answers[string]): string {
  if (!answer || answer.status === 'SKIPPED') return 'Skipped';
  if (item.inputType === 'CONCERN') {
    const option = item.options.find((candidate) => candidate.value === answer.status);
    if (answer.status === 'OTHER') return `${option?.label ?? 'Others'}: ${answer.value ?? ''}`;
    return option?.label ?? 'Skipped';
  }
  if (item.inputType === 'SELECT') {
    return item.options.find((candidate) => candidate.value === answer.value)?.label
      ?? answer.value
      ?? 'Skipped';
  }
  return `${answer.value ?? ''}${answer.unit ? ` ${answer.unit}` : ''}`;
}

export function hasDisclosedAnswers(answers: Answers): boolean {
  return Object.values(answers).some((answer) =>
    Boolean((answer.status && answer.status !== 'SKIPPED') || answer.value?.trim() || answer.followUpText?.trim()));
}
