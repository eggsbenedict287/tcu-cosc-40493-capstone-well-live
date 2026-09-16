# Well Live Requirements Guide

This guide summarizes the September 11, 2026 client meeting and explains how to use it when completing the requirements templates in [`docs/requirements/`](docs/requirements/). It is a requirements-discovery aid, not a replacement for the canonical documents. Stable identifiers such as `BO-*`, `FEAT-*`, `UC-*`, `BR-*`, and `FR-*` should be added only after Sarah confirms the product boundary.

## 1. Meeting at a glance

**Meeting:** Client meeting 1, September 11, 2026, 11:00 AM  
**Client:** Sarah Becan  
**Product:** Well Live  
**Primary direction:** A health-and-wellness education and peer-support product with a social-media-style experience.

The clearest client priority is **credible, approachable health education**. Sarah wants users to scroll through useful educational content that is tailored to their interests and, if they choose, information from an initial health assessment. The product should also provide a supportive community where users can share experiences and connect with people facing similar health concerns. The client described the vision as holistic: physical, mental, and financial health rather than only fitness or disease treatment.

The meeting did not establish a complete production-ready specification. Several ideas were exploratory, and important decisions about legal boundaries, content review, payment, data retention, moderation, and operating responsibility remain open. Treat this document as evidence to organize the next requirements conversation, not as permission to invent missing details.

## 2. What the client said

### 2.1 Confirmed direction

These points were stated or explicitly accepted during the meeting:

| Area | Meeting finding | Requirements implication |
|---|---|---|
| Primary value | The main goal is health literacy and education. | Make education the first MVP capability and the main business objective candidate. |
| Community | Users should be able to relate to and support people with similar health journeys. | Community participation is a feature candidate, but its exact MVP depth must be chosen. |
| Topics | The product should address holistic health: mind, body, and financial health. | Add these as domain concepts; do not narrow the product to physical conditions only. |
| Evidence | Educational content should be credible and backed by research, using sources such as NIH or WHO where appropriate. | Define acceptable sources, source display, review responsibility, and update rules before writing business rules. |
| Personalization | The education feed should be tailored to user interests, goals, and potentially health information provided by the user. | Specify the inputs and user controls. Do not assume automated medical inference is safe or required. |
| Assessment | The initial assessment should primarily use fixed choices such as yes/no, medication selections, and goals, with an “other” option for information not listed. | Create a candidate assessment use case and data dictionary; Sarah can help validate health questions. |
| Assessment maintenance | Users should be able to view and change their assessment answers later. | Include an update-assessment flow and define how changes affect personalization. |
| Access | The client accepted subscription-based access for the current direction, with a tentative low annual price discussed. | Treat subscriptions as a confirmed business direction but keep price, payment provider, cancellation, and entitlement behavior open. |
| Platforms | A native app is preferred; a website is also desirable. | Record native mobile and web support as a scope decision to resolve, not as an automatic implementation commitment. |
| Community identity | Users should start anonymous by default and optionally reveal their identity. | Define anonymous display versus account identity and identify privacy implications. |
| User age | The initial direction is users over 18. | Record an adult-only assumption or business rule candidate; confirm age verification requirements. |
| User content | Users may share personal health journeys, provided it is clearly not medical advice. | Separate official educational content from peer-generated content and disclaim both appropriately. |
| Moderation | Harmful, bullying, or strongly negative content should not remain; deletion was preferred over an aggressive “ban” approach. | Define report, review, hide/delete, escalation, and repeat-offender behavior rather than guessing. |
| Community structure | A broad public discussion model with topic-based groups was favored, including groups for common or rare conditions. | Decide whether groups, comments, private messages, and real-time chat are MVP features or later scope. |
| Data deletion | Users should be able to delete their data. After cancellation, the client favored retaining data for roughly six months to one year, then deleting it. | This is a retention candidate, not a final policy. Confirm the exact period and exceptions before writing `BR-*` requirements. |
| Personalization choice | Users should be able to use the product without personalization if they prefer. | Add an opt-out/reset behavior to the requirements backlog. |
| Design | Sarah prefers soft blues and greens, a nature-inspired look, and possibly a dove with an olive branch as the logo. | Put visual direction in UI/design notes, not in business rules or core functional requirements. |
| Client collaboration | Sarah is willing to help shape the health assessment and prefers periodic, generally monthly, meetings, ideally in person when practical. | Record the collaboration approach and schedule separately from software requirements. |

### 2.2 Ideas discussed but not yet commitments

The following were proposed in conversation but need confirmation before they become scope:

- AI chatbot answers or AI-generated recommendations.
- Search results that summarize health topics and link to articles, videos, podcasts, or diagrams.
- Personalized recommendations based on medication, diagnoses, or other sensitive health information.
- Professional content from doctors, pharmacists, physical therapists, or other credentialed people.
- User profiles, following/friends, private messaging, and group messaging.
- Likes or positive reactions.
- User-uploaded photos and videos, including progress posts.
- Automatically recommending or restricting users to groups based on assessment answers.
- Users creating new groups for conditions not listed in the assessment.
- Native mobile applications in addition to a website.
- A free tier or a subscription price of approximately five dollars per year.

Use these as **candidate features or open questions**, not as approved requirements. The transcript contains several team proposals that Sarah accepted conversationally without specifying the operational details needed for implementation.

## 3. Recommended MVP interpretation

The safest interpretation of the meeting is an **education-first MVP**:

1. Account creation and subscription-gated access, if payment is confirmed as feasible.
2. A user assessment with controlled health, medication, interest, and goal selections plus an “other” path.
3. A browsable or scrollable feed of credible educational material.
4. Clear separation between official educational material and user-generated experiences.
5. Basic topic-based community participation with privacy-preserving display names.
6. User controls to review, update, delete, or opt out of the information used for personalization.
7. A moderation and reporting baseline before community posting is enabled.

Do not assume that a full social network, real-time chat, AI medical assistant, professional verification system, payment platform, or healthcare integration fits in the MVP. The client explicitly identified education as the first feature to build. Record anything not selected for the MVP in the scope section with a reason instead of silently leaving it ambiguous.

## 4. How the meeting feeds each template

### 4.1 `project-glossary.md`

Use the glossary for terms whose meaning must remain consistent across the client conversation, requirements, code, and database. Start with terms heard in the meeting and define them in Sarah’s domain language:

- **Well Live** — the proposed health-and-wellness education and peer-support product.
- **Health literacy** — understanding and using trustworthy health information; confirm Sarah’s preferred wording.
- **Educational content** — official, evidence-oriented material distinguished from personal user experiences.
- **Peer support** — interaction among users sharing health journeys or similar concerns.
- **Health assessment** — the structured user questionnaire used to collect selected health, medication, interest, and goal information.
- **Personalization** — organizing or recommending content based on information the user has provided; confirm whether this includes only preferences or sensitive health data.
- **Official content** — material accepted through the product’s authoritative content process; define who qualifies and what review means.
- **User-generated content** — posts, comments, messages, images, or videos created by members.
- **Anonymous** — the identity shown to other users, which may differ from the account identity; confirm whether complete anonymity is possible.
- **Medical advice** — a term that must be defined for disclaimers and moderation. The product must not casually use this phrase without confirming the intended boundary.
- **Subscription** — the access entitlement and its states; define active, canceled, expired, failed-payment, and any trial state.
- **Group** or **topic** — a community space organized around a health or wellness subject.

Put terms in alphabetical order and flag unresolved meanings with a corresponding `OI-*` entry. Do not define implementation terms such as “database record” as glossary concepts.

### 4.2 `vision-and-scope.md`

#### Background and current process

The meeting did not document a complete current manual process. Do not invent one. Describe the current situation only as far as the evidence supports it: health education is scattered across general internet and social-media sources, users may struggle to judge credibility, and people seeking support may have difficulty finding others with similar experiences. Add a process diagram only after the client demonstrates the actual current workflow or source materials.

#### Business problem

A defensible draft problem statement is:

> People need approachable, trustworthy health and wellness education and supportive peer connection, but general online and social-media content can be difficult to evaluate, may not be relevant to the individual, and may not provide a safe community context.

Have Sarah confirm this wording. Avoid claiming that Well Live will improve clinical outcomes; that was part of the broader pitch aspiration, not a measurable commitment made in this meeting.

#### Business objectives

Create candidate objectives from the meeting, but mark baselines as unknown:

- Increase access to understandable, credible health education.
- Help users find educational content relevant to their interests and goals.
- Provide a supportive environment for sharing health journeys.
- Make holistic health topics approachable across physical, mental, and financial health.

The template requires quantitative objectives. The meeting supplied no baseline, target, timeframe, or measurement source. Add `OI-*` questions asking Sarah how success will be measured rather than inventing percentages, user counts, or health outcomes.

#### Vision statement

Use the meeting’s strongest distinction:

| | Draft content to confirm |
|---|---|
| **For** | Adults seeking approachable health and wellness education and peer support |
| **Who** | Need trustworthy information that feels relevant and a safe way to learn from others |
| **The Well Live** | Is a subscription-based health-and-wellness education and community product |
| **That** | Organizes credible educational content around user interests and supports health-focused community interaction |
| **Unlike** | General search and social-media platforms where credibility, relevance, and safety are inconsistent |
| **Our product** | Separates evidence-oriented education from peer experiences and emphasizes supportive, privacy-conscious participation |

Read this table back to Sarah before treating it as approved. In particular, confirm “adults,” “subscription-based,” and “community” as product-boundary decisions.

#### Features

Use capability-level feature candidates, not implementation details:

- `FEAT-education-discovery` — browse and discover credible health and wellness education.
- `FEAT-assessment-personalization` — provide and maintain user-selected health, interest, and goal information used to organize content.
- `FEAT-community-support` — share experiences and interact around health and wellness topics.
- `FEAT-privacy-controls` — control identity display, personalization, and personal-data deletion.
- `FEAT-moderation` — report and review harmful or inappropriate community content.
- `FEAT-subscription-access` — manage subscription-gated access if payment is confirmed for the release.

These are proposed slugs only. Create stable identifiers after client review, then derive use cases from the approved list.

#### MVP and out-of-scope

Make education the first MVP priority. Ask Sarah to choose whether assessment, community, subscriptions, moderation, search, and AI are also required for the first release. Explicitly place unchosen capabilities out of scope, with reasons such as safety review, implementation effort, or unresolved legal requirements.

#### Risks, assumptions, and dependencies

Candidate risks from the meeting include:

- Users may interpret education or peer posts as medical advice.
- Sensitive health and medication data may create privacy, security, retention, and compliance obligations.
- Harmful or abusive community content may require more moderation than the team can support.
- AI-generated answers may be inaccurate and create liability concerns.
- Credibility claims may fail without a defined source and review process.
- Subscription access may require payment, cancellation, refund, and customer-support behavior not yet defined.

Candidate assumptions/dependencies include Sarah’s help validating the assessment, access to authoritative content sources, and a future decision about who reviews and maintains content after the student project. Do not write “HIPAA compliant” or another legal conclusion unless the client or a qualified advisor confirms the applicable obligations.

### 4.3 `use-cases.md`

Derive use cases from approved feature areas. Candidate goals from the meeting are:

- Create an account and obtain access.
- Complete the health and wellness assessment.
- Update assessment answers.
- Browse the educational feed.
- Search or filter educational content.
- Read educational content and its source information.
- Opt out of or reset personalization.
- Create a peer-support post.
- Browse or join a topic group.
- Comment or respond supportively.
- Report harmful or misleading content.
- Review or moderate reported content.
- Manage subscription access.
- Delete personal data or close an account.

Do not create use cases for every idea mentioned in the meeting. First confirm whether the actor can actually accomplish the goal in the MVP.

For each use case:

- Begin the name with a verb, such as **Complete health assessment**.
- Identify the actor and trigger precisely.
- Make every precondition testable, for example, “The user has an active subscription,” not “The user is eligible.”
- Include extensions for invalid assessment values, canceled subscriptions, unavailable content sources, failed payments, privacy choices, deleted content, and unauthorized access.
- Cite business-rule identifiers only in the **Business Rules** field.
- Put data fields and validation in **Associated Information**, including whether a field is optional, sensitive, user-visible, editable, or used for personalization.
- State what happens if a recommendation or external content service is unavailable.

The assessment use case should not imply that the system diagnoses a condition. It records what the user chooses to disclose. The content-feed use case should distinguish topic-based filtering from any AI or medical inference.

### 4.4 `business-rules.md`

A business rule must be a policy that exists independently of the software and must have a source. The meeting produced candidate rules, but most need confirmation:

- Only users who meet the agreed age requirement may create an account.
- A user’s displayed identity is anonymous by default unless the user chooses otherwise.
- User-generated health experiences are not presented as professional medical advice.
- Educational content must meet an agreed credibility and review standard before publication.
- Harmful, abusive, or unsafe community content may be removed or otherwise moderated.
- Users may delete their personal data.
- Data from a canceled subscription is retained only for the confirmed retention period, then deleted, subject to confirmed exceptions.

Do not turn team design preferences into rules. “Use positive reactions instead of downvotes” is a product decision, not automatically a client business policy. Likewise, a disclaimer, a privacy notice, or a system enforcement behavior belongs in the SRS unless Sarah confirms the underlying business policy.

Every finalized rule needs a source such as Sarah Becan, the client’s policy, a legal advisor, or an authoritative content standard, plus the date confirmed. If a rule is only a team proposal, keep it in `OPEN-ISSUES.md` or the SRS as a design constraint candidate.

### 4.5 `software-requirements-specification.md`

The SRS is the hub for requirements that do not belong in the other documents. Fill it after the glossary, scope, use cases, and business rules have been reviewed.

**Introduction and references**

- Replace the placeholders with Well Live, the team name, Sarah/client organization, and the current version.
- Link to the glossary, vision and scope, use cases, business rules, and open issues.
- Include authoritative health-content, privacy, accessibility, or payment references only after confirming they apply.

**Overall description**

- Describe Well Live as an education-and-community product, not a clinical system, unless the client changes that boundary.
- List candidate user classes: member, moderator, content administrator/reviewer, and subscription administrator. Confirm which roles exist.
- Record native app versus web support as an unresolved operating-environment decision.
- Record implementation constraints only when they are real. Do not infer a required framework, database, cloud provider, or AI service from the meeting.

**Functional requirements**

Use EARS-style requirements for cross-cutting behavior such as:

- separating official educational content from user-generated posts;
- showing source or review information for educational material;
- applying the user’s personalization choice;
- preserving anonymous display by default;
- enforcing access based on subscription state;
- allowing data deletion;
- handling moderation reports;
- preventing unauthorized access to sensitive assessment information.

Each requirement needs a tester-visible oracle. “The system shall be user-friendly” is not sufficient; use measurable accessibility, response-time, or workflow criteria after Sarah or the team makes a deliberate decision.

**Data requirements**

Candidate business entities include `Member`, `Subscription`, `Assessment`, `AssessmentResponse`, `Topic`, `EducationalContent`, `ContentSource`, `CommunityPost`, `Comment`, `Group`, `ModerationReport`, and `ModerationAction`. Confirm the entities and fields before drawing the domain model.

Treat diagnoses, medications, assessment answers, private messages, and moderation records as potentially sensitive. The meeting does not establish what must be collected, who may access it, where it is stored, or how long it is retained. Those are open questions, not blanks to fill with common defaults.

**External interfaces**

Potential interfaces include a payment provider, content-source links, media hosting, email or notification services, and an AI service. None was selected in the meeting. Document an interface only after identifying the data crossing the boundary, owner, failure behavior, and privacy impact.

**Quality attributes**

The meeting clearly raises usability, accessibility, security, privacy, robustness, maintainability, and content-safety concerns. It does not provide numeric thresholds. Ask for or deliberately choose measurable targets; never insert invented values such as “99.9% uptime” or “200 ms response time.”

For safety and legal scope, distinguish:

- what the product does: education and peer support;
- what it does not do: diagnosis, prescription, or guaranteed clinical advice;
- what warnings and escalation behavior are required;
- who owns content review and moderation.

## 5. Open issues to carry into `OPEN-ISSUES.md`

Create one `OI-*` row per question, with an owner and the artifact blocked by the answer. The highest-priority questions are:

1. What is the single measurable success outcome for the MVP, and what is its baseline?
2. Is the first release education-only, or must it include community, assessment, personalization, subscriptions, and moderation?
3. Is access truly subscription-only? What is the price, payment provider, trial policy, cancellation behavior, refund behavior, and failed-payment behavior?
4. Is the target platform a native app, a responsive website, or both?
5. Which health, medication, demographic, and goal fields may be collected, and which are optional?
6. Is the product strictly general education and peer support, or does it provide any clinical guidance, care navigation, or treatment support?
7. What sources qualify as credible, who reviews content, how are credentials represented, and how often is content revalidated?
8. Is AI allowed to summarize, search, recommend, or answer questions? If so, who reviews output and what topics are prohibited?
9. What moderation actions are required besides deletion, and who performs them? What is the response time for safety reports?
10. Are comments, public groups, private messages, real-time chat, reactions, photos, and videos all in scope?
11. Does “anonymous by default” mean a pseudonym visible to members, complete anonymity, or a separate anonymous-post option?
12. What is the exact retention period after cancellation, and are there legal, payment, moderation, or backup exceptions?
13. What does a user-data deletion request remove, and how quickly must it take effect?
14. Will users under 18 be excluded, and how is age eligibility verified?
15. Who operates, moderates, reviews content, pays for hosting, and maintains the product after the student project ends?
16. Which privacy and health-data laws or policies apply, and is Well Live expected to handle regulated health information?
17. What content formats are required for the MVP: text, images, video, podcasts, diagrams, or external links?
18. What expected member count, content volume, concurrent usage, and media storage need to be supported?

When an issue is answered, move the substance into the correct canonical document and mark the issue resolved. `OPEN-ISSUES.md` is a queue, not the permanent home of requirements.

## 6. Traceability workflow

Use this order so that the documents remain consistent:

1. Confirm vocabulary in `project-glossary.md`.
2. Confirm the problem, measurable objectives, stakeholders, product boundary, and MVP in `vision-and-scope.md`.
3. Convert only approved features into use-case goals in `use-cases.md`.
4. Record client-owned policies and formulas in `business-rules.md`, each with a source.
5. Fill the SRS with cross-cutting functional requirements, data requirements, interfaces, constraints, and measurable quality attributes.
6. Add identifiers only after the client confirms the concepts; never renumber or silently rename existing identifiers.
7. For each requirement, be able to trace backward to the transcript, client confirmation, source document, or an explicit team decision.

The central rule from this meeting is: **do not let a plausible health-app idea become a requirement until the client confirms its scope, safety boundary, owner, and testable behavior.**
