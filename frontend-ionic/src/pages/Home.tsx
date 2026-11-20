import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
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
  getSavedAssessment,
  SavedAssessment,
  updateAssessment,
  login,
  logout,
  Member,
  register,
  submitAssessment,
  validateSection,
} from '../api';
import './Home.css';
import ArticleLibrary from '../components/ArticleLibrary';
import { loadMemberHome } from '../memberHome';
import MemberSidebar, { DashboardView } from '../components/MemberSidebar';
import SavedAssessmentView from '../components/SavedAssessmentView';
import { displayAnswer, hasDisclosedAnswers } from '../assessmentDisplay';
import './MemberDashboard.css';
import AuthPanel, { AuthValues } from '../components/AuthPanel';

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
  if (item.inputType === 'SELECT') {
    if (!answer.value) {
      return undefined;
    }
    return {
      value: answer.value,
      ...(answer.value === 'OTHER' && answer.followUpText
        ? { followUpText: answer.followUpText }
        : {}),
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

const Home: React.FC = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [form, setForm] = useState<AssessmentForm | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [sectionFollowUps, setSectionFollowUps] = useState<Record<string, string>>({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<SavedAssessment | null>(null);
  const [dashboardView, setDashboardView] = useState<DashboardView>('articles');
  const [editingAssessment, setEditingAssessment] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [notice, setNotice] = useState('');
  const updateId = useRef(createSubmissionId());
  const [welcomeName, setWelcomeName] = useState('');
  const [restoring, setRestoring] = useState(false);
  const [restoreFailed, setRestoreFailed] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [registerMode, setRegisterMode] = useState(false);
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

  const restoreMember = useCallback(async (currentMember: Member, isActive: () => boolean = () => true) => {
    setRestoring(true);
    setRestoreFailed(false);
    setError('');
    setForm(null);
    setSavedAssessment(null);
    setEditingAssessment(false);
    setDashboardView('articles');
    setConfirmClearAll(false);
    setNotice('');
    setAnswers({});
    setSectionFollowUps({});
    setCompletedAt(null);
    setShowWelcome(false);
    setReviewing(false);
    setSectionIndex(0);
    setWelcomeName([currentMember.firstName, currentMember.lastName].filter(Boolean).join(' '));
    submissionId.current = createSubmissionId();
    try {
      const state = await loadMemberHome();
      if (!isActive()) return;
      if (state.saved) {
        setSavedAssessment(state.saved);
        setAnswers(state.saved.answers);
        setSectionFollowUps(state.saved.sectionFollowUps ?? {});
        setCompletedAt(state.saved.completedAt);
        setShowWelcome(true);
      } else {
        setForm(state.form);
      }
    } catch (requestError) {
      if (isActive()) {
        setRestoreFailed(true);
        setError(requestError instanceof Error ? requestError.message : 'Could not restore your account.');
      }
    } finally {
      if (isActive()) setRestoring(false);
    }
  }, []);

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
          await restoreMember(currentMember, () => active);
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
  }, [restoreMember]);

  // Ionic retains IonContent scroll position between sections unless reset explicitly.
  useEffect(() => {
    const content = contentRef.current;
    if (initializing || !content) return;
    const frame = requestAnimationFrame(() => {
      void content.scrollToTop(0).catch(() => undefined);
    });
    return () => cancelAnimationFrame(frame);
  }, [sectionIndex, reviewing, completedAt, showWelcome, initializing, restoring, registerMode, dashboardView, editingAssessment]);

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

  const handleAuthentication = async (values: AuthValues) => {
    const { firstName, lastName, email, password, ageConfirmed, termsAccepted } = values;
    clearErrors();
    if (registerMode && (!ageConfirmed || !termsAccepted)) {
      setError('Confirm age eligibility and accept the terms and educational disclaimer to create an account.');
      return;
    }
    if (registerMode && (!firstName.trim() || !lastName.trim())) {
      setError('Enter your first and last name to create an account.');
      return;
    }
    setBusy(true);
    try {
      const authenticatedMember = registerMode
        ? await register(email, password, ageConfirmed, termsAccepted, firstName, lastName)
        : await login(email, password);
      setMember(authenticatedMember);
      await restoreMember(authenticatedMember);
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
      setRegisterMode(false);
      setSavedAssessment(null);
      setEditingAssessment(false);
      setDashboardView('articles');
      setConfirmClearAll(false);
      setNotice('');
      setForm(null);
      setAnswers({});
      setSectionFollowUps({});
      setSectionIndex(0);
      setReviewing(false);
      setCompletedAt(null);
      setShowWelcome(false);
      setWelcomeName('');
      setRestoreFailed(false);
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setBusy(false);
    }
  };

  const navigateDashboard = async (view: DashboardView) => {
    if (busy || editingAssessment) return;
    clearErrors();
    setNotice('');
    if (view !== 'assessment') { setDashboardView(view); return; }
    setBusy(true);
    try {
      const [saved, questionnaire] = await Promise.all([getSavedAssessment(), getAssessmentForm()]);
      if (!saved) throw new Error('No saved assessment was found. Refresh your account before continuing.');
      if (saved.formVersion !== questionnaire.version) {
        throw new Error('The questionnaire has changed. Editing this version is not available yet.');
      }
      setSavedAssessment(saved);
      setAnswers(saved.answers);
      setSectionFollowUps(saved.sectionFollowUps ?? {});
      setForm(questionnaire);
      setDashboardView('assessment');
    } catch (requestError) { handleError(requestError); }
    finally { setBusy(false); }
  };

  const startEditing = () => {
    if (!savedAssessment || !form) return;
    clearErrors();
    setNotice('');
    setAnswers(savedAssessment.answers);
    setSectionFollowUps(savedAssessment.sectionFollowUps ?? {});
    setSectionIndex(0);
    setReviewing(false);
    setConfirmClearAll(false);
    updateId.current = createSubmissionId();
    setEditingAssessment(true);
  };

  const cancelEditing = () => {
    if (!savedAssessment || busy) return;
    setAnswers(savedAssessment.answers);
    setSectionFollowUps(savedAssessment.sectionFollowUps ?? {});
    setEditingAssessment(false);
    setReviewing(false);
    setSectionIndex(0);
    setConfirmClearAll(false);
    clearErrors();
    setDashboardView('assessment');
  };

    const clearingAll = editingAssessment && savedAssessment !== null
    && hasDisclosedAnswers(savedAssessment.answers)
    && !hasDisclosedAnswers(answers)
    && !(hasFamilyConcern && Object.values(sectionFollowUps).some((value) => value.trim()));

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
      if (editingAssessment && savedAssessment) {
        if (clearingAll && !confirmClearAll) {
          setError('Confirm that all saved answers will be removed before saving.');
          return;
        }
        const saved = await updateAssessment(form.version, updateId.current, savedAssessment.revision ?? 0,
          allAnswers(form, answers), followUps, confirmClearAll);
        setSavedAssessment(saved);
        setAnswers(saved.answers);
        setSectionFollowUps(saved.sectionFollowUps ?? {});
        setCompletedAt(saved.completedAt);
        setEditingAssessment(false);
        setReviewing(false);
        setConfirmClearAll(false);
        setDashboardView('assessment');
        setNotice('Your assessment changes were saved. Your articles now use the updated answers.');
      } else {
        const response = await submitAssessment(form.version, submissionId.current, allAnswers(form, answers), followUps);
        setCompletedAt(response.completedAt);
        setSavedAssessment({ formVersion: form.version, completedAt: response.completedAt,
          updatedAt: response.completedAt, revision: 0, answers: allAnswers(form, answers), sectionFollowUps: followUps });
      }
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

    if (item.inputType === 'SELECT') {
      return (
        <div key={item.id} className="assessment-question">
          <IonItem>
            <IonLabel position="stacked">{item.question}</IonLabel>
            <IonSelect
              value={answer?.value}
              placeholder="Select an option"
              onIonChange={(event) =>
                updateAnswer(item.id, {
                  value: event.detail.value,
                  ...(event.detail.value === 'OTHER' && answer?.followUpText
                    ? { followUpText: answer.followUpText }
                    : {}),
                })
              }
            >
              {item.options.map((option) => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {item.options.some((option) => option.value === answer?.value && option.requiresShortAnswer) && (
            <IonItem>
              <IonLabel position="stacked">Please specify (required)</IonLabel>
              <IonTextarea
                maxlength={500}
                value={answer?.followUpText ?? ''}
                onIonInput={(event) =>
                  updateAnswer(item.id, {
                    ...answer,
                    value: answer?.value,
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
          <IonTitle>Well Live</IonTitle>
          {member && (!completedAt || !showWelcome || editingAssessment) && (
            <IonButton slot="end" fill="clear" onClick={handleLogout} disabled={busy || restoring || editingAssessment}>
              Sign out
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} className={member ? 'ion-padding' : 'wl-auth-content'}>
        {member && error && (
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
          <AuthPanel key={registerMode ? 'register' : 'signin'} registerMode={registerMode}
            busy={busy} error={error} fieldErrors={fieldErrors} onSubmit={handleAuthentication}
            onSwitch={() => { clearErrors(); setRegisterMode((current) => !current); }} />
        )}

        {member && editingAssessment && (
          <section className="wl-edit-banner" aria-label="Assessment editing">
            <h2>Editing your assessment</h2>
            <p>Changes stay private to this screen until you review and save. Cancel editing to navigate or sign out.</p>
            <div className="wl-edit-controls">
              <button type="button" className="wl-button wl-button--outline" disabled={busy} onClick={cancelEditing}>Cancel changes</button>
              <button type="button" className="wl-button wl-button--outline" disabled={busy} onClick={() => {
                clearErrors(); setAnswers({}); setSectionFollowUps({}); setConfirmClearAll(false); setReviewing(true);
              }}>Clear all answers</button>
            </div>
          </section>
        )}

        {member && !restoring && !restoreFailed && form && (!completedAt || editingAssessment) && !reviewing && currentSection && (
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

        {member && !restoring && restoreFailed && (
          <section>
            <h2>Could not restore your account</h2>
            <p>Your saved assessment has not been changed. Retry loading it before continuing.</p>
            <IonButton disabled={busy} onClick={() => { void restoreMember(member); }}>Retry restoring account</IonButton>
          </section>
        )}

        {member && !restoring && !restoreFailed && !form && !completedAt && (
          <section>
            <h2>Assessment form unavailable</h2>
            <p>You are signed in, but the questionnaire could not be loaded.</p>
            <IonButton onClick={reloadForm} disabled={busy}>Retry loading form</IonButton>
          </section>
        )}

        {member && form && reviewing && (!completedAt || editingAssessment) && (
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
            {clearingAll && (
              <div className="wl-clear-confirmation">
                <label><input type="checkbox" checked={confirmClearAll}
                  onChange={(event) => setConfirmClearAll(event.target.checked)} />
                  I confirm that all previously saved answers will be removed and my articles will return to general content.
                </label>
              </div>
            )}
            <div className="assessment-actions">
              <IonButton fill="outline" disabled={busy} onClick={() => setReviewing(false)}>
                Back to answers
              </IonButton>
              <IonButton disabled={busy || (clearingAll && !confirmClearAll)} onClick={submit}>
                {editingAssessment ? 'Save changes' : 'Submit assessment'}
              </IonButton>
            </div>
          </section>
        )}

                {completedAt && !showWelcome && !editingAssessment && (
          <section>
            <h2>Assessment submitted</h2>
            <p>Your assessment was saved successfully.</p>
            <p>Completed at: {new Date(completedAt).toLocaleString()}</p>
            <IonButton onClick={() => setShowWelcome(true)}>
              Continue to home
            </IonButton>
          </section>
        )}

        {member && completedAt && showWelcome && !editingAssessment && (
          <div className="wl-dashboard">
            <div className="wl-dashboard-main">
              {notice && <p className="wl-save-notice" role="status">{notice}</p>}
              {dashboardView === 'articles' && (
                <>
                  <section className="wl-dashboard-welcome" aria-labelledby="welcome-heading">
                    <p className="wl-eyebrow">Well Live</p>
                    <h1 id="welcome-heading">{welcomeName.trim() ? `Welcome, ${welcomeName.trim()}!` : 'Welcome to Well Live'}</h1>
                    <p>Your space for wellness education and support.</p>
                  </section>
                  <ArticleLibrary answers={savedAssessment?.answers ?? answers} />
                </>
              )}
              {dashboardView === 'profile' && (
                <section className="wl-account-panel" aria-labelledby="profile-heading">
                  <p className="wl-eyebrow">Your account</p>
                  <h1 id="profile-heading">My profile</h1>
                  <dl className="wl-profile-data">
                    <div><dt>Name</dt><dd>{welcomeName || 'Not provided'}</dd></div>
                    <div><dt>Email</dt><dd>{member.email}</dd></div>
                    <div><dt>Health assessment</dt><dd>Completed</dd></div>
                    <div><dt>Last updated</dt><dd>{new Date(savedAssessment?.updatedAt ?? completedAt).toLocaleString()}</dd></div>
                  </dl>
                  <button type="button" className="wl-button" disabled={busy} onClick={() => { void navigateDashboard('assessment'); }}>View my assessment</button>
                </section>
              )}
              {dashboardView === 'assessment' && savedAssessment && form && (
                <SavedAssessmentView saved={savedAssessment} form={form} onEdit={startEditing} busy={busy} />
              )}
            </div>
            <MemberSidebar member={member} active={dashboardView} busy={busy || restoring}
              onNavigate={(view) => { void navigateDashboard(view); }} onLogout={() => { void handleLogout(); }} />
          </div>
        )}
      </IonContent>
      <IonLoading isOpen={busy || restoring} message={restoring ? 'Restoring your account...' : 'Please wait...'} />
    </IonPage>
  );
};

export default Home;
