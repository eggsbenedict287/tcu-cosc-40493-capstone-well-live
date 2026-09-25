# Use Cases

**Project:** Well Live
**Team:** Team 07 - Well Live
**Client:** Sarah Becan
**Version:** 0.1

---

_**How to use this template.** Instructions appear in italic square brackets. Fill in underneath them and leave them in place until the document is stable._

_**What a use case is.** One goal a user can accomplish with your system, written as the dialogue between the actor and the system, including what happens when it goes wrong. It is the unit of work in this course: one use case becomes one issue, one branch, one pull request, and one set of tests._

_**Why the use case and not the user story.** You will meet user stories in industry, and they are a good planning tool: "As a student, I want to submit my report so that I get credit." A story is deliberately under-specified, because it is a **placeholder for a conversation** that happens later, between people. That is exactly the wrong property when the thing building your code is an agent that will implement precisely what the specification says and never ask what you meant. Use stories to plan and prioritize. Build against use cases._

_The difference that matters is the parts a story does not have: preconditions, the step-by-step flow, and above all the **extensions**, which is where the failure paths live. Most defects your team ships this semester will be in a path nobody wrote down._

## Identifiers

_Use cases are identified as `UC-<AREA>-<slug>`, where the area code groups related functionality and the slug is coined from the goal: `UC-RUB-create-rubric`, `UC-WAR-manage-activities`, `UC-STU-invite-students`._

_Pick your own area codes from your project's feature areas, three or four letters each, and list them at the top of the Use Case List. Areas correspond to the `FEAT-*` entries in your [vision and scope](vision-and-scope.md), which is where use cases come from._

_**Never renumber, rename, or repoint an identifier.** Moving a use case between areas would change its identifier, so put it in the right area the first time, and if you get it wrong, leave it. An identifier is an address, not a description._

_Within one use case, `PRE-1`, `POST-1`, and the step numbers are local and may be renumbered freely, because nothing outside the use case cites them._

## Revision History

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-09-25 | 0.1 | Draft use cases derived from the vision and scope feature list and the requirements guide (client meeting 1, 2026-09-11). Not yet reviewed with the client. | Esteban Hernandez-Anguiano |

---

## 1. Introduction

### 1.1 Purpose

_[One paragraph: this document specifies the goals users can accomplish with the system, in enough detail that a developer knows what to build and a tester knows what to check.]_

This document specifies the goals that members, moderators, and administrators can accomplish with Well Live, in enough detail that a developer knows what to build and a tester knows what to check. It is a **draft**: the goals come from the candidate list in the [requirements guide](requirements-guide.md) (§4.3), which summarizes the September 11, 2026 client meeting, and from the `FEAT-*` entries in the [vision and scope](vision-and-scope.md). No use case below has been confirmed with Sarah Becan yet. Anything the meeting did not settle is recorded under **Open Issues** in each use case rather than filled in with a guess.

### 1.2 Scope

_[Which feature areas from the vision and scope are covered here. Name the `FEAT-*` entries. If a feature has no use cases yet, say so rather than leaving the reader to notice.]_

Covered, with the MVP features first:

- `FEAT-account-profile` (MVP): account creation, sign-in, the health and wellness assessment, display identity, and account deletion.
- `FEAT-personalized-content` (MVP, as a general, non-personalized feed first): browsing, searching, and reading educational content, and opting out of personalization.
- `FEAT-community-discussions` (not yet placed in or out of the MVP): topic groups, posts, and comments. Real-time and direct/group chat are out of scope per the vision and scope, so there are no chat use cases.
- `FEAT-content-moderation` (out of the MVP): reporting and reviewing harmful content. The requirements guide recommends having this baseline in place **before** community posting is turned on, so these use cases ship together with `FEAT-community-discussions`.
- `FEAT-subscriptions` (out of the MVP): managing subscription access.

**Not yet covered:** `FEAT-administration` has no use cases. Publishing and reviewing educational content (`BR-content-review`) needs one, but we can't write it until the client confirms who the content reviewer is.

**Inconsistency to fix:** vision and scope §4.3 lists `FEAT-general-content` as MVP, but §4.2 defines no such feature. This draft assumes it means the non-personalized first version of `FEAT-personalized-content`. That section needs correcting, not a new identifier.

---

## 2. Use Case Template

_[The field definitions. Every use case below uses exactly these fields, in this order.]_

**UC ID and Name.** _The identifier plus a concise name stating the value this use case provides to a user. Begin with an action verb, followed by an object: "Create a rubric", not "Rubric creation" and not "Rubric management", which is a feature, not a goal._

**Created By** and **Date Created.** _Who wrote it, and when._

**Primary and Secondary Actors.** _An actor is a person or other entity outside the system that interacts with it. The primary actor initiates this use case; secondary actors participate in completing it. Actors usually correspond to the user classes you identified in the vision and scope._

**Trigger.** _The business event, system event, or user action that starts the use case. The trigger tells the system to begin testing the preconditions._

**Description.** _A brief statement of the reason for and the outcome of this use case._

**Preconditions.** _What must already be true before this use case can start. **The system must be able to test each precondition**, which is what separates a precondition from a hope. Label them `PRE-1`, `PRE-2`. Example: PRE-1. The user's identity has been authenticated._

**Postconditions.** _The state of the system at successful conclusion. Label them `POST-1`, `POST-2`. Example: POST-1. The price of the item in the database has been updated with the new value._

**Main Success Scenario.** _The actor's actions and the system's responses under normal, expected conditions, as a numbered list that alternates between the two and ends by accomplishing the goal in the name. Write "The system validates..." not "The system will validate..."; use cases are written in the present tense._

**Extensions.** _Where the real work is. Two kinds, both numbered relative to the step they branch from:_

- _**Alternative flows**, other ways the use case can still succeed. Number them `4a`, `4b` for branches from step 4, with their own sub-steps `4a1`, `4a2`. Say where the flow branches off and, if it does, where it rejoins._
- _**Exceptions**, anticipated error conditions and how the system responds. Numbered the same way._

_**A use case with no extensions is not finished.** For every step, ask: what if the input is invalid, the thing is not found, the user cancels, the user is not allowed, or the external system is down? An agent building from a flow with no failure paths will invent the error handling, and you will not find out until a demo._

**Priority.** _Relative priority of implementing this. Use the same scheme across all your use cases._

**Frequency of Use.** _Roughly how often this is performed, per an appropriate unit of time. An early indicator of load, concurrency, and transaction volume, and it is the field that tells your architecture which use cases matter._

**Business Rules.** _The `BR-*` identifiers that govern this use case. **Identifiers only, never the rule's text**, so the rule has one home in [business-rules.md](business-rules.md) and cannot go stale here._

**Associated Information.** _Everything a developer needs that is not a step: the data fields and their validation rules, quality attributes that apply, display and sort strategies, and what happens if execution fails for a systemic reason such as a network timeout. If the use case makes a durable change, say whether a failure rolls it back, completes it, or leaves it partially done._

_Data fields are specified as a table:_

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| _[field]_ | _[type]_ | _[required, format, range]_ | _[who may see or set it]_ | _[term]_ |

**Related Use Cases.** _Other use cases this one invokes or is invoked by, by identifier and name._

**Assumptions.** _Anything assumed about this use case or how it executes._

**Open Issues.** _What you do not know yet. Mirror it into [OPEN-ISSUES.md](OPEN-ISSUES.md) so it is visible in one place._

---

## 3. Use Case List

_[Your area codes, then a table of every use case by area. Write this list first, before specifying any single use case in detail. It is the cheapest thing to review with your client, and finding out you missed a whole area costs minutes here rather than a week later.]_

**Priority scheme:** **High** = in the MVP (vision and scope §4.3). **Medium** = candidate for the first release after the MVP, or required before a Medium feature can go live. **Low** = explicitly out of the MVP.

| Area code | Feature area | Use cases |
|---|---|---|
| ACC | Account and profile, from `FEAT-account-profile` | `UC-ACC-create-account`, `UC-ACC-sign-in`, `UC-ACC-complete-assessment`, `UC-ACC-update-assessment`, `UC-ACC-set-display-identity`, `UC-ACC-delete-account` |
| CON | Educational content, from `FEAT-personalized-content` | `UC-CON-browse-feed`, `UC-CON-search-content`, `UC-CON-read-content`, `UC-CON-opt-out-personalization` |
| COM | Community, from `FEAT-community-discussions` | `UC-COM-join-topic-group`, `UC-COM-create-post`, `UC-COM-comment-on-post` |
| MOD | Moderation, from `FEAT-content-moderation` | `UC-MOD-report-content`, `UC-MOD-review-report` |
| SUB | Subscription, from `FEAT-subscriptions` | `UC-SUB-manage-subscription` |
| ADM | Administration, from `FEAT-administration` | _None yet (see §1.2)_ |

| Use case | Primary actor | Priority |
|---|---|---|
| `UC-ACC-create-account`: Create an account | Visitor | High |
| `UC-ACC-sign-in`: Sign in | Member | High |
| `UC-ACC-complete-assessment`: Complete the health and wellness assessment | Member | High |
| `UC-ACC-update-assessment`: Update assessment answers | Member | High |
| `UC-ACC-set-display-identity`: Choose how my identity is displayed | Member | Medium |
| `UC-ACC-delete-account`: Delete my account and personal data | Member | High |
| `UC-CON-browse-feed`: Browse the educational feed | Member | High |
| `UC-CON-search-content`: Search or filter educational content | Member | High |
| `UC-CON-read-content`: Read an educational item and its sources | Member | High |
| `UC-CON-opt-out-personalization`: Opt out of or reset personalization | Member | Medium |
| `UC-COM-join-topic-group`: Browse and join a topic group | Member | Medium |
| `UC-COM-create-post`: Share a health journey post | Member | Medium |
| `UC-COM-comment-on-post`: Respond to a post | Member | Medium |
| `UC-MOD-report-content`: Report harmful or misleading content | Member | Medium |
| `UC-MOD-review-report`: Review a content report | Moderator | Medium |
| `UC-SUB-manage-subscription`: Manage my subscription | Member | Low |

---

## 4. Use Cases

_[One `###` heading per use case, grouped under a `##` heading per area. Worked example below, taken from Project Pulse. Delete it and write your own.]_

_**Draft note (applies to every use case below).** The vision and scope takes subscriptions out of the MVP, but the glossary defines a **Member** as someone with an active subscription. Until that's settled, "member" below means "a person with a Well Live account." Any precondition or extension that depends on subscription state says so explicitly._

## 4.1 Account and Profile (ACC)

### UC-ACC-create-account: The visitor creates an account

**UC ID and Name:** `UC-ACC-create-account`: Create an account
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** visitor
**Secondary Actors:** authentication service (vision and scope §4.1)
**Trigger:** The visitor indicates to create a Well Live account.
**Description:** A visitor who wants to use Well Live's educational and community features creates an account, so that they become a member and can sign in.

**Preconditions:**

- PRE-1. The visitor is not signed in to Well Live.

**Postconditions:**

- POST-1. A member account exists with the entered email address, and it is not yet linked to any assessment.
- POST-2. The account's community display identity is set to its default (see `UC-ACC-set-display-identity`).
- POST-3. The member is signed in.

**Main Success Scenario:**

1. The visitor indicates to create an account.
2. The system displays the account fields listed in the Associated Information, the age-eligibility statement, and the statement that Well Live provides education and peer support, not medical advice.
3. The visitor enters the account fields, confirms the age-eligibility statement, accepts the terms, and submits.
4. The system validates the fields against the rules in the Associated Information.
5. The system confirms that no account already exists for the email address.
6. The system creates the account and signs the member in.
7. The system offers the member the choice to start `UC-ACC-complete-assessment` now or skip it.
8. The member chooses to skip it, and the system displays the educational feed (`UC-CON-browse-feed`).
9. Use case ends.

**Extensions:**

- **3a. The visitor does not confirm the age-eligibility statement:**
    - 3a1. The system explains that Well Live accounts are currently limited to adults and does not create an account.
    - 3a2. Use case ends.
- **3b. The visitor cancels:**
    - 3b1. The system discards the entered values without creating an account. Use case ends.
- **4a. One or more fields are invalid:**
    - 4a1. The system identifies each invalid field and why it is invalid, and keeps the valid values.
    - 4a2. Returns to step 3.
- **5a. An account already exists for the email address:**
    - 5a1. The system says it cannot create the account with that email address and offers `UC-ACC-sign-in`. The message must not reveal more about the existing account than the chosen account-enumeration policy allows (open issue).
    - 5a2. The visitor either goes to `UC-ACC-sign-in`, returns to step 3, or ends the use case.
- **6a. The authentication service or database is unavailable:**
    - 6a1. The system does not create a partial account, tells the visitor that account creation is temporarily unavailable, and keeps the entered values except the password.
    - 6a2. Use case ends.
- **7a. The member chooses to start the assessment:**
    - 7a1. `UC-ACC-complete-assessment` begins. Use case ends when it finishes.
- **\*a. (Applies once `FEAT-subscriptions` is delivered.) An active subscription is required for member access:**
    - \*a1. After step 6, the system invokes `UC-SUB-manage-subscription` so the member can start a subscription before continuing to step 7.

**Priority:** High
**Frequency of Use:** Once per member. Volume depends on member growth, which the client hasn't estimated yet.
**Business Rules:** `BR-account-required`, `BR-non-diagnostic`, `BR-no-mandatory-health-disclosure`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| email address | String | Required; valid email format; unique across accounts | Visible only to the member and administrators; never shown in the community | Member |
| password | String | Required; strength policy to be decided by the team in the SRS, not invented here | Stored only as a salted hash; never displayed or logged | — |
| age-eligibility confirmation | Boolean | Required; must be true | Recorded with a timestamp | Member |
| terms and disclaimer acceptance | Boolean | Required; must be true | Recorded with the accepted version and a timestamp | Educational Content |

Account creation is all-or-nothing: if any step after validation fails, no account record is kept.

**Related Use Cases:** `UC-ACC-sign-in`, `UC-ACC-complete-assessment`, `UC-CON-browse-feed`, `UC-SUB-manage-subscription`.
**Assumptions:** Accounts use email and password. Age is self-attested (the client said 18+ but gave no verification method).
**Open Issues:** How is age eligibility verified: self-attestation, date of birth, or something stronger? Is email verification required before first use? Is social sign-in (Google/Apple) expected? What is the wording of the education-not-advice disclaimer, and who approves it?

---

### UC-ACC-sign-in: The member signs in

**UC ID and Name:** `UC-ACC-sign-in`: Sign in
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** authentication service
**Trigger:** The member indicates to sign in.
**Description:** A member with an existing account proves their identity so they can use member features.

**Preconditions:**

- PRE-1. The person is not signed in on this device.

**Postconditions:**

- POST-1. The member has an authenticated session.

**Main Success Scenario:**

1. The member indicates to sign in.
2. The system asks for an email address and password.
3. The member enters them and submits.
4. The system verifies the credentials against an existing, non-deleted account.
5. The system starts an authenticated session and displays the educational feed (`UC-CON-browse-feed`).
6. Use case ends.

**Extensions:**

- **4a. The credentials don't match an account:**
    - 4a1. The system displays a generic "email or password is incorrect" message that doesn't say which one was wrong.
    - 4a2. Returns to step 2.
- **4b. Repeated failed attempts:**
    - 4b1. The system applies the lockout or throttling policy defined in the SRS. Use case ends.
- **4c. The account is pending deletion (see `UC-ACC-delete-account`):**
    - 4c1. The system tells the member the account is scheduled for deletion and offers whatever restore option the retention policy allows (open issue). Use case ends.
- **4d. The authentication service is unavailable:**
    - 4d1. The system says sign-in is temporarily unavailable. Use case ends.
- **2a. The member has forgotten their password:**
    - 2a1. The system starts a password reset. That flow isn't specified yet, and nothing in this use case depends on it.

**Priority:** High
**Frequency of Use:** Once per session per member. The team expects several sessions per member per week, but that's unconfirmed.
**Business Rules:** `BR-account-required`, `BR-health-data-protection`

**Associated Information:** Session lifetime, lockout thresholds, and password reset are team decisions for the SRS. They aren't client policies. Sign-in never shows assessment data before authentication succeeds.

**Related Use Cases:** `UC-ACC-create-account`, `UC-ACC-delete-account`, `UC-CON-browse-feed`.
**Assumptions:** Email and password are the only sign-in method in the MVP.
**Open Issues:** Is password reset in the MVP? Should the member be signed out after a period of inactivity, given that health data is involved?

---

### UC-ACC-complete-assessment: The member completes the health and wellness assessment

**UC ID and Name:** `UC-ACC-complete-assessment`: Complete the health and wellness assessment
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member accepts the offer at the end of `UC-ACC-create-account`, or indicates to take the assessment later from their profile.
**Description:** The member records what they choose to share about their interests, goals, health history, and medications, so Well Live can organize educational content around it. The assessment **records what the member discloses. It does not diagnose, score, or infer a condition.**

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The member has no saved assessment. (If they have one, `UC-ACC-update-assessment` applies.)

**Postconditions:**

- POST-1. The member's assessment is saved with each answered question and the time it was saved. Unanswered questions stay empty.
- POST-2. The member's personalization setting is on, unless they turned it off during the assessment.

**Main Success Scenario:**

1. The member indicates to take the assessment.
2. The system explains why the questions are asked and that every question is optional. It also says the assessment is not a medical evaluation and how the answers will be used.
3. The system presents the first section of questions (see "Assessment sections" in the Associated Information). Each question offers fixed choices plus an "Other" option.
4. The member answers or skips each question in the section and continues.
5. The system validates the section's answers and keeps them.
6. Steps 3 to 5 repeat for each remaining section.
7. The system shows a summary of the answers and asks the member to confirm.
8. The member confirms.
9. The system saves the assessment and tells the member their feed will reflect their interests and goals.
10. The system displays the educational feed (`UC-CON-browse-feed`).
11. Use case ends.

**Extensions:**

- **3a. The member chooses to skip the whole assessment:**
    - 3a1. The system saves nothing, notes that the member can take the assessment later from their profile, and displays the general feed. Use case ends.
- **4a. The member selects "Other":**
    - 4a1. The system asks for a short free-text description.
    - 4a2. The member enters it. Rejoins at step 4.
- **5a. A free-text "Other" answer is invalid (empty after selecting Other, or over the length limit):**
    - 5a1. The system identifies the problem. Returns to step 4.
- **4b. The member leaves before confirming:**
    - 4b1. The system discards the unsaved answers. PRE-2 still holds, so the member can start again later. Use case ends.
- **7a. The member wants to change an answer:**
    - 7a1. The member picks a section, and the system returns to step 3 for that section.
- **9a. Saving fails (database unavailable):**
    - 9a1. The system saves nothing (no partial assessment), tells the member, and keeps the answers on screen so they can retry. Returns to step 8 or ends.

**Priority:** High
**Frequency of Use:** At most once per member. After that, changes go through `UC-ACC-update-assessment`.
**Business Rules:** `BR-no-mandatory-health-disclosure`, `BR-health-data-protection`, `BR-non-diagnostic`, `BR-not-medical-device`, `BR-five-pillars`

**Associated Information:**

Assessment sections (**placeholder**: Sarah offered to help write the actual questions and choices):

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| wellness interests | Set of Topic | Optional; values from the controlled topic list | Not sensitive; used for personalization | Topic |
| health goals | Set of choice + optional "Other" text | Optional; controlled list; free text length limit TBD | Visible only to the member; used for personalization | Health Goal |
| health conditions / history | Set of choice + optional "Other" text | Optional; controlled list | **Sensitive**; visible only to the member; encrypted; used for personalization only if the client confirms that's allowed | Health History |
| medications | Set of choice + optional "Other" text | Optional; controlled list | **Sensitive**; visible only to the member; encrypted | Medication |
| yes/no screening questions | Boolean per question | Optional | Sensitivity depends on the question; defaults to sensitive | Assessment |

No assessment answer is ever shown to other members, moderators, or on public profiles. The whole assessment is saved in one transaction.

**Related Use Cases:** `UC-ACC-create-account`, `UC-ACC-update-assessment`, `UC-CON-browse-feed`, `UC-CON-opt-out-personalization`.
**Assumptions:** In the MVP the feed isn't personalized yet (vision and scope §4.2), so the answers are stored for later personalization and shown back to the member.
**Open Issues:** What are the actual questions and choices? May diagnoses and medications be collected at all, and may they drive personalization? Who can read "Other" free text, and is it reviewed? Does an assessment answer ever suggest topic groups automatically?

---

### UC-ACC-update-assessment: The member updates their assessment answers

**UC ID and Name:** `UC-ACC-update-assessment`: Update assessment answers
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to view or change their assessment.
**Description:** The member reviews what they've shared and changes or clears answers, so the information Well Live holds about them stays accurate and under their control.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The member has a saved assessment.

**Postconditions:**

- POST-1. The saved assessment reflects the member's changes, with a new last-updated time.
- POST-2. Content ordering uses the updated answers from the member's next feed load (once personalization exists).

**Main Success Scenario:**

1. The member indicates to view their assessment.
2. The system displays every saved answer, grouped by section.
3. The member changes, adds, or clears answers and submits.
4. The system validates the changes using the rules in `UC-ACC-complete-assessment`.
5. The system saves the changes and confirms.
6. Use case ends.

**Extensions:**

- **3a. The member clears all answers:**
    - 3a1. The system asks the member to confirm that all their answers will be removed.
    - 3a2. On confirmation, the system deletes the stored answers (not just hides them), and the member's feed reverts to general content. Use case ends.
- **3b. The member cancels:**
    - 3b1. The system discards the changes. Use case ends.
- **4a. Validation fails:**
    - 4a1. The system identifies each invalid answer. Returns to step 3.
- **5a. Saving fails:**
    - 5a1. The system keeps the previous saved assessment unchanged, tells the member, and keeps the edits on screen to retry. Returns to step 3 or ends.

**Priority:** High
**Frequency of Use:** Occasional, when a member's health situation or goals change.
**Business Rules:** `BR-no-mandatory-health-disclosure`, `BR-health-data-protection`

**Associated Information:** Same fields as `UC-ACC-complete-assessment`. Changes are saved all-or-nothing. Earlier versions of the answers are not kept unless the client asks for history.

**Related Use Cases:** `UC-ACC-complete-assessment`, `UC-CON-opt-out-personalization`, `UC-ACC-delete-account`.
**Assumptions:** No history of previous answers is kept.
**Open Issues:** Should changes to sensitive answers be logged for audit? If a question is retired, what happens to members' existing answers?

---

### UC-ACC-set-display-identity: The member chooses how their identity is displayed

**UC ID and Name:** `UC-ACC-set-display-identity`: Choose how my identity is displayed
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to change their community display identity.
**Description:** Members start out anonymous by default in the community. A member can choose to reveal a chosen name, or go back to anonymous, so they control what other members see.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. The member's display mode (anonymous or named) and display name are saved and apply to everything the member has posted and will post.

**Main Success Scenario:**

1. The member indicates to change their display identity.
2. The system shows the current mode, the current display name, and a preview of how posts and comments appear to other members.
3. The member selects "named" and enters a display name.
4. The system validates the display name.
5. The system saves the change and shows the updated preview.
6. Use case ends.

**Extensions:**

- **3a. The member selects "anonymous":**
    - 3a1. The system shows the system-generated anonymous handle. Continues at step 5.
- **4a. The display name is invalid, already in use, or contains contact details or the member's email:**
    - 4a1. The system explains why. Returns to step 3.
- **3b. The member cancels:**
    - 3b1. Nothing changes. Use case ends.

**Priority:** Medium (only matters once `FEAT-community-discussions` ships)
**Frequency of Use:** Rare; usually once per member.
**Business Rules:** `BR-pseudonymous-option`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| display mode | Enum {anonymous, named} | Required; default anonymous | Set only by the member | Profile |
| display name | String | Required when mode is named; uniqueness and length TBD | Visible to all members | Profile |
| anonymous handle | String | System-generated; unique; not derived from the email or real name | Visible to all members | Profile |

Moderators and administrators can still link any post to its account (see `UC-MOD-review-report`).

**Related Use Cases:** `UC-COM-create-post`, `UC-COM-comment-on-post`, `UC-MOD-review-report`.
**Assumptions:** Changing the mode applies retroactively to past posts. The alternative is changing it per post.
**Open Issues:** Does "anonymous by default" mean a visible pseudonym, complete anonymity, or a per-post anonymous option? Does switching modes apply to past posts?

---

### UC-ACC-delete-account: The member deletes their account and personal data

**UC ID and Name:** `UC-ACC-delete-account`: Delete my account and personal data
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** payment provider (only once `FEAT-subscriptions` is delivered)
**Trigger:** The member indicates to delete their account.
**Description:** The member removes their account and the personal data Well Live holds about them, as the client said members should be able to do.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The member has re-entered their password within the current session for this action.

**Postconditions:**

- POST-1. The member can no longer sign in.
- POST-2. The member's assessment answers are permanently deleted.
- POST-3. The member's posts and comments are handled according to the confirmed deletion policy (open issue).
- POST-4. Any remaining personal data is scheduled for deletion by the end of the confirmed retention period.

**Main Success Scenario:**

1. The member indicates to delete their account.
2. The system explains exactly what will be deleted, what (if anything) is kept and for how long, and that deletion can't be undone.
3. The member re-enters their password and confirms.
4. The system verifies the password.
5. The system disables sign-in for the account, deletes the assessment answers, and applies the deletion policy to the member's community content.
6. The system ends all of the member's sessions and confirms the deletion.
7. Use case ends.

**Extensions:**

- **3a. The member cancels:**
    - 3a1. Nothing changes. Use case ends.
- **4a. Password verification fails:**
    - 4a1. The system rejects the request. Returns to step 3.
- **5a. (Once `FEAT-subscriptions` is delivered.) The member has an active subscription:**
    - 5a1. The system cancels the subscription with the payment provider before deleting anything.
    - 5a2. If the payment provider is unavailable, the system stops, deletes nothing, and tells the member to try again. Use case ends.
- **5b. A deletion step fails partway:**
    - 5b1. Sign-in stays disabled, and the system retries the remaining deletions until they succeed. The member is told deletion is in progress. The account must never be left usable with some of its data gone.

**Priority:** High
**Frequency of Use:** Rare.
**Business Rules:** `BR-health-data-protection`

**Associated Information:** The requirements guide records the client *favoring* 6 months to 1 year of retention after subscription cancellation. That is a candidate, not a policy, so no retention period is written here. A member-requested deletion and a lapsed subscription may follow different rules.

**Related Use Cases:** `UC-ACC-sign-in`, `UC-SUB-manage-subscription`.
**Assumptions:** Deletion can't be undone once confirmed.
**Open Issues:** What does deletion remove: the assessment only, or also profile, posts, comments, and moderation records? How fast must it take effect? Are posts deleted or anonymized? What is the exact retention period, and what are the legal, payment, moderation, or backup exceptions?

---

## 4.2 Educational Content (CON)

### UC-CON-browse-feed: The member browses the educational feed

**UC ID and Name:** `UC-CON-browse-feed`: Browse the educational feed
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member signs in, or indicates to open the feed.
**Description:** The member scrolls through a feed of reviewed educational content (the client's first priority), so they can find credible health and wellness information in a familiar social-media format.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. A page of published educational items is displayed. It may be empty.

**Main Success Scenario:**

1. The member opens the feed.
2. The system retrieves the first page of published educational items, ordered by the "Feed ordering" in the Associated Information.
3. The system displays each item as a card showing the fields in "Card display." Each card is visibly marked as official educational content.
4. The member scrolls to the end of the loaded items.
5. The system loads and appends the next page. Steps 4 and 5 repeat.
6. The member selects an item, and `UC-CON-read-content` begins.
7. Use case ends.

**Extensions:**

- **2a. No published content exists:**
    - 2a1. The system shows an empty-feed message. Use case ends.
- **2b. The content store is unavailable:**
    - 2b1. The system shows an error with a retry option and no stale or partial page. Use case ends, or returns to step 2 on retry.
- **2c. (Once personalization exists.) The personalization service is unavailable, or the member has opted out or has no assessment:**
    - 2c1. The system falls back to general ordering without an error, and the feed still loads.
- **5a. No more items:**
    - 5a1. The system shows an end-of-feed indicator.
- **1a. (Once `FEAT-subscriptions` is delivered.) The member's subscription isn't active:**
    - 1a1. The system shows the visitor introduction and offers `UC-SUB-manage-subscription`. Use case ends.

**Priority:** High
**Frequency of Use:** Every session. This is the most frequent use case in the product.
**Business Rules:** `BR-account-required`, `BR-content-review`, `BR-five-pillars`, `BR-non-diagnostic`, `BR-ad-free`

**Associated Information:**

Feed ordering: MVP is newest published first (general, non-personalized feed). Later, items matching the member's interests and goals rank higher. The ordering is topic matching on what the member disclosed. It is **not** AI or medical inference.

Card display: title, topic, content format (article, video, podcast, diagram), short summary, source name, published date.

Page size: team decision in the SRS.

Only items in the **published** state appear. Draft or unreviewed items never do. User posts never appear in the educational feed. They belong to the community (`UC-COM-*`).

**Related Use Cases:** `UC-CON-read-content`, `UC-CON-search-content`, `UC-CON-opt-out-personalization`, `UC-ACC-complete-assessment`.
**Assumptions:** The MVP content set is seeded by the team from sources the client approves, because no content-publishing use case exists yet.
**Open Issues:** Which content formats are in the MVP? Which sources count as credible (NIH and WHO were named)? Who reviews content, and how often is it revalidated? Can visitors see a sample of the feed?

---

### UC-CON-search-content: The member searches or filters educational content

**UC ID and Name:** `UC-CON-search-content`: Search or filter educational content
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to search, or selects a topic filter.
**Description:** The member looks for educational content on a specific subject instead of scrolling.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. A list of published educational items matching the search values is displayed. It may be empty.

**Main Success Scenario:**

1. The member indicates to search.
2. The system asks for search values using the "Search criteria" in the Associated Information.
3. The member enters one or more values and submits.
4. The system finds all published items that match.
5. The system displays them using the feed's card display, sorted by the "Sort criteria."
6. The member selects an item, and `UC-CON-read-content` begins.
7. Use case ends.

**Extensions:**

- **3a. No values entered:**
    - 3a1. The system asks for at least one value. Returns to step 2.
- **4a. No matching items:**
    - 4a1. The system says nothing matched and suggests browsing by topic. Returns to step 2, or ends.
- **4b. Search is unavailable:**
    - 4b1. The system shows an error. Use case ends.

**Priority:** High
**Frequency of Use:** Several times per week per active member (unconfirmed estimate).
**Business Rules:** `BR-content-review`, `BR-five-pillars`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| keywords | String | Optional; length limit TBD | Search terms may reveal health concerns, so don't log them with the member's identity | Educational Content |
| topic | Topic | Optional; from the controlled topic list | — | Topic |
| content format | Enum | Optional | — | Educational Content |

Sort criteria: relevance to keywords, then newest published.

Search returns matching items. It **does not** generate summaries or answers. AI summaries were discussed but not committed.

**Related Use Cases:** `UC-CON-browse-feed`, `UC-CON-read-content`.
**Assumptions:** Search covers only official educational content, not community posts.
**Open Issues:** Is AI-generated search summarization wanted, and if so, who reviews it? Should search also cover community posts?

---

### UC-CON-read-content: The member reads an educational item and its sources

**UC ID and Name:** `UC-CON-read-content`: Read an educational item and its sources
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** external content host (for linked videos, podcasts, or articles)
**Trigger:** The member selects an educational item.
**Description:** The member opens an educational item and sees where the information comes from, so they can judge its credibility.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The selected item is in the published state.

**Postconditions:**

- POST-1. The item's full content, sources, review information, and disclaimer are displayed.

**Main Success Scenario:**

1. The member selects an item.
2. The system retrieves the item.
3. The system displays the content, its sources (with links), the date it was last reviewed, and the education-not-medical-advice disclaimer.
4. The member reads the item and returns to where they came from.
5. Use case ends.

**Extensions:**

- **2a. The item was unpublished or removed after the member's list loaded:**
    - 2a1. The system says the item is no longer available and returns the member to the list. Use case ends.
- **3a. The item embeds or links to external media that can't be reached:**
    - 3a1. The system still shows the text, sources, and disclaimer, and marks the media as unavailable.
- **4a. The member selects a source link:**
    - 4a1. The system opens the source outside Well Live and says it is leaving Well Live.
- **4b. The member thinks the content is wrong or harmful:**
    - 4b1. `UC-MOD-report-content` begins.

**Priority:** High
**Frequency of Use:** Several times per session.
**Business Rules:** `BR-content-review`, `BR-non-diagnostic`, `BR-no-clinical-services`

**Associated Information:** Displayed fields: title, topic, format, body or media, source list (name and link), last-reviewed date, reviewer credit (if the client wants it), disclaimer. Official content must look clearly different from member posts.

**Related Use Cases:** `UC-CON-browse-feed`, `UC-CON-search-content`, `UC-MOD-report-content`.
**Assumptions:** Each item has at least one source.
**Open Issues:** Should reviewer names or credentials be shown? What is the exact disclaimer text?

---

### UC-CON-opt-out-personalization: The member opts out of or resets personalization

**UC ID and Name:** `UC-CON-opt-out-personalization`: Opt out of or reset personalization
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to change their personalization setting.
**Description:** The client said members should be able to use Well Live without personalization. The member turns personalization off or back on, and their feed changes to match.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. The member's personalization setting is saved, and the next feed load uses it.

**Main Success Scenario:**

1. The member indicates to change their personalization setting.
2. The system shows the current setting and explains which information personalization uses.
3. The member turns personalization off and confirms.
4. The system saves the setting. The feed now uses general ordering, and the assessment answers stay stored.
5. Use case ends.

**Extensions:**

- **3a. The member turns personalization on:**
    - 3a1. If the member has no assessment, the system offers `UC-ACC-complete-assessment`. Continues at step 4.
- **3b. The member also wants their answers removed:**
    - 3b1. The system directs them to `UC-ACC-update-assessment`, extension 3a (clear all answers).
- **4a. Saving fails:**
    - 4a1. The previous setting stays in effect, and the system tells the member. Use case ends.

**Priority:** Medium (MVP feed is not personalized yet)
**Frequency of Use:** Rare.
**Business Rules:** `BR-no-mandatory-health-disclosure`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| personalization enabled | Boolean | Required; default on after an assessment is saved, off otherwise | Set only by the member | Personalized Content |

**Related Use Cases:** `UC-CON-browse-feed`, `UC-ACC-complete-assessment`, `UC-ACC-update-assessment`.
**Assumptions:** Turning personalization off doesn't delete assessment data.
**Open Issues:** Should personalization be opt-in rather than on by default?

---

## 4.3 Community (COM)

_Draft note: none of these use cases should go live before `UC-MOD-report-content` and `UC-MOD-review-report` exist (requirements guide §3, item 7)._

### UC-COM-join-topic-group: The member browses and joins a topic group

**UC ID and Name:** `UC-COM-join-topic-group`: Browse and join a topic group
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to browse community groups.
**Description:** The member finds a topic-based group, such as one for a common or rare condition, and joins it so they can connect with people on a similar health journey.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. The member is recorded as a member of the chosen group, and the group appears in their group list.

**Main Success Scenario:**

1. The member indicates to browse groups.
2. The system displays the available groups by topic, with each group's name, description, and member count.
3. The member selects a group.
4. The system shows the group's description, community guidelines, and recent posts.
5. The member indicates to join.
6. The system records the membership and confirms.
7. Use case ends.

**Extensions:**

- **2a. No groups exist:**
    - 2a1. The system shows an empty-state message. Use case ends.
- **5a. The member is already in the group:**
    - 5a1. The system offers to leave the group instead. If the member confirms, the system removes the membership. Use case ends.
- **5b. The member doesn't want to join:**
    - 5b1. The member returns to step 2 or ends the use case.
- **6a. Saving fails:**
    - 6a1. No membership is recorded, and the system tells the member. Use case ends.

**Priority:** Medium
**Frequency of Use:** Occasional.
**Business Rules:** `BR-account-required`, `BR-five-pillars`

**Associated Information:** Other members can see group membership only as the member's display identity (`UC-ACC-set-display-identity`). Whether membership lists are visible at all is an open issue.

**Related Use Cases:** `UC-COM-create-post`, `UC-ACC-set-display-identity`.
**Assumptions:** Administrators create groups. Members can't create groups yet.
**Open Issues:** Can members create groups for conditions that aren't listed? Should the assessment suggest groups or restrict who can join them? Are group member lists visible?

---

### UC-COM-create-post: The member shares a health journey post

**UC ID and Name:** `UC-COM-create-post`: Share a health journey post
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to create a post in a group.
**Description:** The member shares a personal experience with a group. It's clearly shown as a peer experience, not medical advice.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The member belongs to the target group.
- PRE-3. The member's posting privileges are not suspended by a moderation action.

**Postconditions:**

- POST-1. The post is saved and visible in the group under the member's current display identity, labeled as a member experience.

**Main Success Scenario:**

1. The member indicates to create a post in the group.
2. The system shows the post form, a reminder of the community guidelines, and a note that posts are personal experience, not medical advice.
3. The member enters the post and submits.
4. The system validates the post.
5. The system saves and publishes the post to the group.
6. The system displays the post in the group.
7. Use case ends.

**Extensions:**

- **3a. The member cancels:**
    - 3a1. The system discards the draft after confirming. Use case ends.
- **4a. The post is empty or too long:**
    - 4a1. The system identifies the problem. Returns to step 3.
- **4b. (If the team adopts it.) The post matches a high-risk term filter, such as medication dosage changes (`RI-peer-misinformation`):**
    - 4b1. The system handles it according to the filter policy (open issue: warn, hold for review, or block).
- **PRE-3 fails. Posting is suspended:**
    - The system explains that posting is currently restricted. Use case ends.
- **5a. Saving fails:**
    - 5a1. Nothing is published. The system keeps the text so the member can retry. Use case ends.

**Priority:** Medium
**Frequency of Use:** Unknown; this is the main driver of moderation workload.
**Business Rules:** `BR-account-required`, `BR-non-diagnostic`, `BR-pseudonymous-option`, `BR-five-pillars`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| body | Text | Required; max length TBD | Visible to group members | Post |
| group | Group | Required; the member must belong to it | — | Topic |
| author | Member | Set by the system | Shown only as display identity; the account link is visible to moderators only | Member |

**Related Use Cases:** `UC-COM-join-topic-group`, `UC-COM-comment-on-post`, `UC-MOD-report-content`, `UC-ACC-set-display-identity`.
**Assumptions:** Text only. Photo and video posts were discussed, but they aren't committed.
**Open Issues:** Are images or videos in scope? Can the author edit or delete a post? Are likes or positive reactions in scope? Is there a pre-publication filter, and what does it do?

---

### UC-COM-comment-on-post: The member responds to a post

**UC ID and Name:** `UC-COM-comment-on-post`: Respond to a post
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to comment on a post.
**Description:** The member replies supportively to another member's post.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The member belongs to the post's group.
- PRE-3. The member's posting privileges are not suspended.

**Postconditions:**

- POST-1. The comment is saved and shown under the post with the member's display identity.

**Main Success Scenario:**

1. The member indicates to comment on a post.
2. The system shows the comment form with the community-guidelines reminder.
3. The member enters the comment and submits.
4. The system validates the comment.
5. The system saves it and displays it under the post.
6. Use case ends.

**Extensions:**

- **4a. The comment is empty or too long:**
    - 4a1. The system identifies the problem. Returns to step 3.
- **5a. The post was removed while the member was writing:**
    - 5a1. The system says the post is no longer available and doesn't save the comment. Use case ends.
- **5b. Saving fails:**
    - 5b1. Nothing is saved. The system keeps the text so the member can retry. Use case ends.
- **3a. The member cancels:**
    - 3a1. The draft is discarded. Use case ends.

**Priority:** Medium
**Frequency of Use:** Higher than posts (unconfirmed).
**Business Rules:** `BR-account-required`, `BR-non-diagnostic`, `BR-pseudonymous-option`

**Associated Information:** Same field rules as a post body. The comment's author is shown by display identity only.

**Related Use Cases:** `UC-COM-create-post`, `UC-MOD-report-content`.
**Assumptions:** Comments are one level deep, with no nested replies.
**Open Issues:** Are nested replies needed?

---

## 4.4 Moderation (MOD)

### UC-MOD-report-content: The member reports harmful or misleading content

**UC ID and Name:** `UC-MOD-report-content`: Report harmful or misleading content
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** none
**Trigger:** The member indicates to report a post, comment, or educational item.
**Description:** The member flags content they believe is harmful, bullying, or misleading, so a moderator can review it.

**Preconditions:**

- PRE-1. The member is signed in.
- PRE-2. The reported item exists and is visible to the member.

**Postconditions:**

- POST-1. An open report linking the member, the item, and the reason is saved in the moderation queue.

**Main Success Scenario:**

1. The member indicates to report an item.
2. The system asks for a reason from the "Report reasons" list and optional details.
3. The member picks a reason and submits.
4. The system saves the report and confirms it was received. The reported author isn't told who reported them.
5. Use case ends.

**Extensions:**

- **3a. The member cancels:**
    - 3a1. Nothing is saved. Use case ends.
- **4a. The member has already reported this item:**
    - 4a1. The system says the report is already under review. Use case ends.
- **4b. Saving fails:**
    - 4b1. The system tells the member, and the report can be resubmitted. Use case ends.
- **2a. The content describes a risk of self-harm or an emergency:**
    - 2a1. The system shows crisis-resource information. Well Live itself does not provide crisis intervention (`BR-no-clinical-services`). Continues at step 3.

**Priority:** Medium (required before community posting goes live)
**Frequency of Use:** Unknown; this drives moderator staffing.
**Business Rules:** `BR-no-clinical-services`, `BR-non-diagnostic`

**Associated Information:**

| Property name | Data type | Validation rule | Security or access concerns | Glossary reference |
|---|---|---|---|---|
| reason | Enum (placeholder: harmful or unsafe, bullying or harassment, medical misinformation, other) | Required | Visible to moderators | — |
| details | Text | Optional; max length TBD | Visible to moderators only | — |
| reporter | Member | Set by the system | Never shown to the reported author | Member |

**Related Use Cases:** `UC-MOD-review-report`, `UC-COM-create-post`, `UC-COM-comment-on-post`, `UC-CON-read-content`.
**Assumptions:** Any signed-in member can report any item they can see.
**Open Issues:** What reason list does the client want? What crisis-resource message should be shown, and who approves it?

---

### UC-MOD-review-report: The moderator reviews a content report

**UC ID and Name:** `UC-MOD-review-report`: Review a content report
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** moderator
**Secondary Actors:** reported member (notified of the outcome)
**Trigger:** The moderator opens the moderation queue.
**Description:** The moderator decides whether a reported item breaks the community guidelines and, if it does, removes it. The client prefers deleting harmful content over aggressive banning.

**Preconditions:**

- PRE-1. The moderator is signed in with the moderator role.
- PRE-2. At least one report is open.

**Postconditions:**

- POST-1. The report is closed with a recorded decision, moderator, and time.
- POST-2. If the item was removed, it's no longer visible to members.

**Main Success Scenario:**

1. The moderator opens the moderation queue.
2. The system lists open reports, oldest first, with the item, reason, and number of reports.
3. The moderator selects a report.
4. The system shows the full item, its context (the parent post for a comment), every report on it, and the author's account and prior moderation history.
5. The moderator decides the item breaks the guidelines, chooses "remove," and enters a note.
6. The system hides the item from members, closes every report on it, records the action, and notifies the author that the content was removed and why.
7. Use case ends.

**Extensions:**

- **5a. The moderator decides no violation occurred:**
    - 5a1. The system closes the report as "no action" and records the decision. The item stays visible. Use case ends.
- **5b. The reported item is official educational content:**
    - 5b1. The system routes the report to the content-review process instead of removing the item (`BR-content-review`; owner is an open issue). Use case ends.
- **5c. The author is a repeat offender:**
    - 5c1. The moderator may suspend the author's posting privileges according to the confirmed escalation policy (open issue). The system records the suspension.
- **4a. The item was already deleted by its author:**
    - 4a1. The system closes the report as "content no longer exists." Use case ends.
- **4b. Another moderator is already reviewing this report:**
    - 4b1. The system shows who is reviewing it and prevents conflicting decisions. Use case ends or returns to step 2.
- **6a. Saving the action fails:**
    - 6a1. The item's visibility and the report status stay unchanged, and the system tells the moderator. Use case ends.
- **PRE-1 fails. The person doesn't have the moderator role:**
    - The system denies access to the queue. Use case ends.

**Priority:** Medium (required before community posting goes live)
**Frequency of Use:** Unknown; it depends on report volume.
**Business Rules:** `BR-content-review`, `BR-health-data-protection`

**Associated Information:** Moderators can see the account behind a post but **cannot** see the author's assessment answers. Every moderation action is recorded (who, what, when, why). Removal hides the item. Whether removed items are later permanently deleted follows the retention policy.

**Related Use Cases:** `UC-MOD-report-content`, `UC-ACC-set-display-identity`.
**Assumptions:** Hiding is enough to count as "removal" for the MVP.
**Open Issues:** Who are the moderators: staff, volunteers, or health professionals? What actions exist besides removal (warn, suspend, ban)? What is the required response time for safety reports? Can an author appeal?

---

## 4.5 Subscription (SUB)

### UC-SUB-manage-subscription: The member manages their subscription

**UC ID and Name:** `UC-SUB-manage-subscription`: Manage my subscription
**Created By:** Esteban Hernandez-Anguiano
**Date Created:** 2026-09-25
**Primary Actor:** member
**Secondary Actors:** payment provider
**Trigger:** The member indicates to start, view, or cancel their subscription, or another use case invokes this one because access requires a subscription.
**Description:** The member starts or cancels the subscription that gives them access to Well Live. The client accepted subscription-based access. Price, provider, and lifecycle behavior are still open.

**Preconditions:**

- PRE-1. The member is signed in.

**Postconditions:**

- POST-1. The member's subscription state in Well Live matches the payment provider's record.

**Main Success Scenario:**

1. The member indicates to manage their subscription.
2. The system shows the current subscription state and, if none is active, the plan and price.
3. The member chooses to subscribe.
4. The system sends the member to the payment provider.
5. The member completes payment with the provider.
6. The system receives the provider's confirmation and marks the subscription active.
7. The system confirms, and the member has member access.
8. Use case ends.

**Extensions:**

- **3a. The member cancels an active subscription:**
    - 3a1. The system explains when access ends and what happens to their data (retention policy, open issue).
    - 3a2. The member confirms. The system cancels with the provider and records the end date. Use case ends.
- **5a. Payment fails or the member abandons it:**
    - 5a1. The subscription stays inactive, and the system tells the member. Use case ends.
- **6a. The provider is unavailable or confirmation never arrives:**
    - 6a1. The system shows the subscription as pending and doesn't grant access until the provider confirms. Use case ends.
- **\*a. The provider reports a renewal failure later:**
    - \*a1. The system changes the subscription state according to the confirmed failed-payment policy (open issue).

**Priority:** Low (out of the MVP)
**Frequency of Use:** About once per member per billing period.
**Business Rules:** `BR-subscription-model`, `BR-account-required`, `BR-ad-free`

**Associated Information:** Well Live stores no card data. Payment details stay with the provider. The subscription state values (active, canceled, expired, failed payment, trial?) need defining in the glossary before this can be built.

**Related Use Cases:** `UC-ACC-create-account`, `UC-ACC-delete-account`, `UC-CON-browse-feed`.
**Assumptions:** There is one plan, billed yearly (a low yearly price was discussed but not fixed).
**Open Issues:** Price, payment provider, free tier or trial, refund policy, failed-payment behavior, and data retention after cancellation.

---

## Working these with your agent

_[Delegate: drafting the main success scenario once you have the trigger and the goal; proposing extensions you have not thought of, which it is genuinely good at; turning a filled-in use case into a first set of test cases; checking that every `BR-*` you cite exists in [business-rules.md](business-rules.md).]_

_Keep human: whether this is one use case or three, what the priority is, and whether an extension the agent proposed is a real path in your client's business or a generic one it has seen elsewhere. "The system handles concurrent edits" is a real requirement for some projects and invented complexity for others, and only you have met the client._

_The verification that catches the most: read the main success scenario aloud to someone who has not read the document, and stop wherever they ask a question. Every question is a missing step or a missing extension._

_**Checklist for each use case:** Does the name start with a verb? Can the system test every precondition? Does every step alternate actor and system? Is there at least one extension per step that can fail? Does every business rule appear as an identifier only? Could a tester write test cases from this without asking you anything?_
