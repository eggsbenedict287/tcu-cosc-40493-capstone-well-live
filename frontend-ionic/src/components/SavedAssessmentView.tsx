import React from 'react';
import type { AssessmentForm, SavedAssessment } from '../api';
import { displayAnswer } from '../assessmentDisplay';

interface Props { saved: SavedAssessment; form: AssessmentForm; onEdit: () => void; busy: boolean }

const SavedAssessmentView: React.FC<Props> = ({ saved, form, onEdit, busy }) => (
  <section className="wl-account-panel" aria-labelledby="saved-assessment-heading">
    <p className="wl-eyebrow">What you have shared</p>
    <h1 id="saved-assessment-heading">Your health assessment</h1>
    <p>Review your saved answers below. You can change or clear them; nothing changes until you save.</p>
    <p className="wl-source">Completed: {new Date(saved.completedAt).toLocaleString()}<br />
      Last updated: {new Date(saved.updatedAt ?? saved.completedAt).toLocaleString()}</p>
    <button type="button" className="wl-button" disabled={busy} onClick={onEdit}>Edit answers</button>
    <div className="wl-saved-sections">
      {form.sections.map((section, index) => (
        <details key={section.id} open={index === 0}>
          <summary>{section.title}</summary>
          <dl>
            {section.items.map((item) => (
              <div className="wl-saved-answer" key={item.id}>
                <dt>{item.question}</dt>
                <dd>{displayAnswer(item, saved.answers[item.id])}
                  {saved.answers[item.id]?.followUpText && <p>{item.followUpPrompt}: {saved.answers[item.id].followUpText}</p>}
                </dd>
              </div>
            ))}
          </dl>
          {saved.sectionFollowUps?.[section.id] && <p>{section.followUpPrompt}: {saved.sectionFollowUps[section.id]}</p>}
        </details>
      ))}
    </div>
    <p className="wl-disclaimer">Your answers organize educational content. They are not a medical evaluation.</p>
  </section>
);

export default SavedAssessmentView;
