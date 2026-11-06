import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  Answers,
  ApiError,
  AssessmentForm,
  AssessmentItem,
  AssessmentSection,
  getAssessmentForm,
  getCurrentMember,
  login,
  logout,
  Member,
  register,
  submitAssessment,
  validateSection,
} from '../api';
import './Home.css';

function createSubmissionId(): string {
  if (!window.crypto?.getRandomValues) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
      const random = Math.floor(Math.random() * 16);
      return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    });
  }
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function answerForItem(item: AssessmentItem, answer?: Answers[string]): Answers[string] | undefined {
  if (!answer) {
    return undefined;
  }
  if (item.inputType === 'CONCERN') {
    if (!answer.status) {
      return undefined;
    }
    return {
      status: answer.status,
      ...(answer.status === 'OTHER' && answer.value ? { value: answer.value } : {}),
      ...(answer.status === 'CONCERN' && answer.followUpText ? { followUpText: answer.followUpText } : {}),
    };
  }
  if (!answer.value?.trim()) {
    return undefined;
  }
  return {
    value: answer.value,
    ...(item.inputType === 'NUMBER' && answer.unit ? { unit: answer.unit } : {}),
  };
}

function sectionAnswers(section: AssessmentSection, answers: Answers): Answers {
  return section.items.reduce<Answers>((result, item) => {
    const answer = answerForItem(item, answers[item.id]);
    if (answer) {
      result[item.id] = answer;
    }
    return result;
  }, {});
}

function allAnswers(form: AssessmentForm, answers: Answers): Answers {
  return form.sections.reduce<Answers>(
    (result, section) => Object.assign(result, sectionAnswers(section, answers)),
    {},
  );
}

function displayAnswer(item: AssessmentItem, answer?: Answers[string]): string {
  if (!answer) {
    return 'Skip';
  }
  if (item.inputType === 'CONCERN') {
    const option = item.options.find((candidate) => candidate.value === answer.status);
    if (answer.status === 'OTHER') {
      return `${option?.label ?? 'Others'}: ${answer.value ?? ''}`;
    }
    return option?.label ?? 'Skip';
  }
  return `${answer.value ?? ''}${answer.unit ? ` ${answer.unit}` : ''}`;
}

const Home: React.FC = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [form, setForm] = useState<AssessmentForm | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [sectionFollowUps, setSectionFollowUps] = useState<Record<string, string>>({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [registerMode, setRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionId = useRef(createSubmissionId());

  const currentSection = form?.sections[sectionIndex];
  const hasFamilyConcern = useMemo(() => {
    const familySection = form?.sections.find((section) => section.id === 'family_relationship_concerns');
    return Boolean(familySection?.items.some((item) => answers[item.id]?.status === 'CONCERN'));
  }, [answers, form]);

  useEffect(() => {
    let active = true;
    const initialize = async () => {
      try {
        const currentMember = await getCurrentMember();
        if (!active) {
          return;
        }
        setMember(currentMember);
        if (currentMember) {
          const questionnaire = await getAssessmentForm();
          if (active) {
            setForm(questionnaire);
          }
        }
      } catch (requestError) {
        if (active) {
          setError(requestError instanceof Error ? requestError.message : 'Could not connect to the backend.');
        }
      } finally {
        if (active) {
          setInitializing(false);
        }
      }
    };
    void initialize();
    return () => {
      active = false;
    };
  }, []);

  const clearErrors = () => {
    setError('');
    setFieldErrors({});
  };

  const reloadForm = async () => {
    clearErrors();
    setBusy(true);
    try {
      setForm(await getAssessmentForm());
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const handleError = (requestError: unknown) => {
    if (requestError instanceof ApiError) {
      setError(requestError.message);
      setFieldErrors(requestError.fieldErrors);
    } else {
      setError(requestError instanceof Error ? requestError.message : 'The request could not be completed.');
    }
  };

  const handleAuthentication = async (event: FormEvent) => {
    event.preventDefault();
    clearErrors();
    if (registerMode && (!ageConfirmed || !termsAccepted)) {
      setError('Confirm age eligibility and accept the terms and educational disclaimer to create an account.');
      return;
    }
    setBusy(true);
    try {
      const authenticatedMember = registerMode
        ? await register(email, password, ageConfirmed, termsAccepted)
        : await login(email, password);
      setMember(authenticatedMember);
      const questionnaire = await getAssessmentForm();
      setForm(questionnaire);
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    clearErrors();
    setBusy(true);
    try {
      await logout();
      setMember(null);
      setForm(null);
      setAnswers({});
      setSectionFollowUps({});
      setSectionIndex(0);
      setReviewing(false);
      setCompletedAt(null);
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const updateAnswer = (itemId: string, answer: Answers[string]) => {
    setAnswers((current) => ({ ...current, [itemId]: answer }));
  };

  const currentFollowUps = (): Record<string, string> => {
    if (currentSection?.id !== 'family_relationship_concerns' || !hasFamilyConcern) {
      return {};
    }
    const text = sectionFollowUps[currentSection.id]?.trim();
    return text ? { [currentSection.id]: text } : {};
  };

  const continueSection = async () => {
    if (!form || !currentSection) {
      return;
    }
    clearErrors();
    setBusy(true);
    try {
      await validateSection(
        form.version,
        currentSection.id,
        sectionAnswers(currentSection, answers),
        currentFollowUps(),
      );
      if (sectionIndex < form.sections.length - 1) {
        setSectionIndex((index) => index + 1);
      } else {
        setReviewing(true);
      }
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    if (!form) {
      return;
    }
    clearErrors();
    setBusy(true);
    const familyFollowUp = form.sections.find((section) => section.id === 'family_relationship_concerns');
    const rawFamilyFollowUp = familyFollowUp ? sectionFollowUps[familyFollowUp.id]?.trim() : '';
    const followUps = rawFamilyFollowUp && hasFamilyConcern && familyFollowUp
      ? { [familyFollowUp.id]: rawFamilyFollowUp }
      : {};
    try {
      const response = await submitAssessment(
        form.version,
        submissionId.current,
        allAnswers(form, answers),
        followUps,
      );
      setCompletedAt(response.completedAt);
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const renderQuestion = (item: AssessmentItem) => {
    const answer = answers[item.id];
    if (item.inputType === 'CONCERN') {
      return (
        <div key={item.id} className="assessment-question">
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">{item.question}</IonLabel>
          </IonItem>
          <IonRadioGroup
            aria-label={item.question}
            value={answer?.status}
            onIonChange={(event) => {
              const status = event.detail.value as Answers[string]['status'];
              updateAnswer(item.id, {
                status,
                ...(status === 'OTHER' && answer?.value ? { value: answer.value } : {}),
                ...(status === 'CONCERN' && answer?.followUpText
                  ? { followUpText: answer.followUpText }
                  : {}),
              });
            }}
          >
            {item.options.map((option) => (
              <IonItem key={option.value}>
                <IonRadio value={option.value}>{option.label}</IonRadio>
              </IonItem>
            ))}
          </IonRadioGroup>
          {answer?.status === 'OTHER' && (
            <IonItem>
              <IonLabel position="stacked">Short answer</IonLabel>
              <IonTextarea
                maxlength={500}
                value={answer.value ?? ''}
                onIonInput={(event) =>
                  updateAnswer(item.id, { ...answer, value: String(event.detail.value ?? '') })
                }
              />
            </IonItem>
          )}
          {answer?.status === 'CONCERN' && item.followUpPrompt && (
            <IonItem>
              <IonLabel position="stacked">{item.followUpPrompt} (optional)</IonLabel>
              <IonTextarea
                maxlength={500}
                value={answer.followUpText ?? ''}
                onIonInput={(event) =>
                  updateAnswer(item.id, {
                    ...answer,
                    followUpText: String(event.detail.value ?? ''),
                  })
                }
              />
            </IonItem>
          )}
        </div>
      );
    }

    return (
      <div key={item.id} className="assessment-question">
        <IonItem>
          <IonLabel position="stacked">{item.question}</IonLabel>
          <IonInput
            type={item.inputType === 'TEXT' ? 'text' : 'number'}
            inputMode={item.inputType === 'TEXT' ? 'text' : 'decimal'}
            min={item.inputType === 'INTEGER' ? 0 : undefined}
            max={item.inputType === 'INTEGER' ? 150 : undefined}
            step={item.inputType === 'INTEGER' ? '1' : 'any'}
            value={answer?.value ?? ''}
            onIonInput={(event) =>
              updateAnswer(item.id, { ...answer, value: String(event.detail.value ?? '') })
            }
          />
        </IonItem>
        {item.inputType === 'NUMBER' && (
          <IonItem>
            <IonLabel position="stacked">Unit</IonLabel>
            <IonSelect
              value={answer?.unit}
              placeholder="Select a unit"
              onIonChange={(event) =>
                updateAnswer(item.id, { ...answer, unit: event.detail.value })
              }
            >
              {item.units.map((unit) => (
                <IonSelectOption key={unit} value={unit}>{unit}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}
      </div>
    );
  };

  if (initializing) {
    return <IonLoading isOpen message="Connecting to Well Live..." />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Well Live Assessment</IonTitle>
          {member && (
            <IonButton slot="end" fill="clear" onClick={handleLogout} disabled={busy}>
              Sign out
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p role="alert">{error}</p>
            {Object.entries(fieldErrors).length > 0 && (
              <ul>
                {Object.entries(fieldErrors).map(([field, message]) => (
                  <li key={field}>{field}: {message}</li>
                ))}
              </ul>
            )}
          </IonText>
        )}

        {!member && (
          <form onSubmit={handleAuthentication}>
            <h2>{registerMode ? 'Create your account' : 'Sign in'}</h2>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                required
                autocomplete="email"
                value={email}
                onIonInput={(event) => setEmail(String(event.detail.value ?? ''))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                required
                autocomplete={registerMode ? 'new-password' : 'current-password'}
                value={password}
                onIonInput={(event) => setPassword(String(event.detail.value ?? ''))}
              />
            </IonItem>
            {registerMode && (
              <IonList>
                <IonItem>
                  <IonCheckbox
                    checked={ageConfirmed}
                    onIonChange={(event) => setAgeConfirmed(event.detail.checked)}
                  >
                    I confirm that I meet the age eligibility requirement.
                  </IonCheckbox>
                </IonItem>
                <IonItem>
                  <IonCheckbox
                    checked={termsAccepted}
                    onIonChange={(event) => setTermsAccepted(event.detail.checked)}
                  >
                    I accept the terms and educational disclaimer.
                  </IonCheckbox>
                </IonItem>
              </IonList>
            )}
            <IonButton expand="block" type="submit" disabled={busy}>
              {registerMode ? 'Create account' : 'Sign in'}
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              type="button"
              disabled={busy}
              onClick={() => {
                clearErrors();
                setRegisterMode((current) => !current);
              }}
            >
              {registerMode ? 'Already have an account? Sign in' : 'Create an account'}
            </IonButton>
          </form>
        )}

        {member && form && !completedAt && !reviewing && currentSection && (
          <section>
            <p>{member.email}</p>
            <h2>{currentSection.title}</h2>
            <p>{form.explanation}</p>
            <p>Section {sectionIndex + 1} of {form.sections.length}. Questions are optional.</p>
            {currentSection.items.map(renderQuestion)}
            {currentSection.id === 'family_relationship_concerns' && hasFamilyConcern && (
              <IonItem>
                <IonLabel position="stacked">
                  {currentSection.followUpPrompt ?? 'Specify concern'} (optional)
                </IonLabel>
                <IonTextarea
                  maxlength={500}
                  value={sectionFollowUps[currentSection.id] ?? ''}
                  onIonInput={(event) =>
                    setSectionFollowUps((current) => ({
                      ...current,
                      [currentSection.id]: String(event.detail.value ?? ''),
                    }))
                  }
                />
              </IonItem>
            )}
            <div className="assessment-actions">
              {sectionIndex > 0 && (
                <IonButton
                  fill="outline"
                  disabled={busy}
                  onClick={() => setSectionIndex((index) => index - 1)}
                >
                  Back
                </IonButton>
              )}
              <IonButton onClick={continueSection} disabled={busy}>
                {sectionIndex === form.sections.length - 1 ? 'Review answers' : 'Continue'}
              </IonButton>
            </div>
          </section>
        )}

        {member && !form && !completedAt && (
          <section>
            <h2>Assessment form unavailable</h2>
            <p>You are signed in, but the questionnaire could not be loaded.</p>
            <IonButton onClick={reloadForm} disabled={busy}>Retry loading form</IonButton>
          </section>
        )}

        {member && form && reviewing && !completedAt && (
          <section>
            <h2>Review your answers</h2>
            <p>{form.explanation}</p>
            {form.sections.map((section) => (
              <div key={section.id}>
                <h3>{section.title}</h3>
                {section.items.map((item) => (
                  <IonItem key={item.id}>
                    <IonLabel className="ion-text-wrap">
                      <strong>{item.question}</strong>
                      <p>{displayAnswer(item, answers[item.id])}</p>
                      {answers[item.id]?.followUpText && (
                        <p>{item.followUpPrompt}: {answers[item.id]?.followUpText}</p>
                      )}
                    </IonLabel>
                  </IonItem>
                ))}
                {section.id === 'family_relationship_concerns' && sectionFollowUps[section.id] && (
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      <strong>{section.followUpPrompt ?? 'Specify concern'}</strong>
                      <p>{sectionFollowUps[section.id]}</p>
                    </IonLabel>
                  </IonItem>
                )}
              </div>
            ))}
            <div className="assessment-actions">
              <IonButton fill="outline" disabled={busy} onClick={() => setReviewing(false)}>
                Back to answers
              </IonButton>
              <IonButton disabled={busy} onClick={submit}>Submit assessment</IonButton>
            </div>
          </section>
        )}

        {completedAt && (
          <section>
            <h2>Assessment submitted</h2>
            <p>Your assessment was saved successfully.</p>
            <p>Completed at: {new Date(completedAt).toLocaleString()}</p>
          </section>
        )}
      </IonContent>
      <IonLoading isOpen={busy} message="Please wait..." />
    </IonPage>
  );
};

export default Home;
