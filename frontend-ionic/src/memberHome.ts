import { getAssessmentForm, getSavedAssessment } from './api';
import type { AssessmentForm, SavedAssessment } from './api';

export async function loadMemberHome(): Promise<{
  saved: SavedAssessment | null;
  form: AssessmentForm | null;
}> {
  const saved = await getSavedAssessment();
  return saved ? { saved, form: null } : { saved: null, form: await getAssessmentForm() };
}
