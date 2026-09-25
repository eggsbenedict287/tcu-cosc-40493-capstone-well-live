# Business Rules

**Project:** Well Live Application
**Team:** Team 07 - Well Live
**Client:** Ms. Sarah Becan
**Version:** 0.1

---

_**How to use this template.** Instructions appear in italic square brackets. Fill in underneath them and leave them in place until the document is stable._

_**What a business rule is.** A corporate policy, a government regulation, a law, an industry standard, or a computational formula. Business rules are a rich source of requirements, because they dictate properties your system must have in order to conform to them._

_**What a business rule is not: a software requirement.** This is the distinction students get wrong, so read it twice. A rule is a property of the **business**. It exists whether or not your software does, it was true before you arrived, and it will still be true if the project is cancelled. "A student may only submit a peer evaluation during an active week" is a rule the course had before anyone wrote code._

_What belongs to your software is the **enforcement** of that rule, and that is a functional requirement, written in the specification and cited back here. Keeping the two apart is what lets you answer the question that comes up every semester: "who decided this, and can we change it?" If it is a rule, the client's organization decides and you comply. If it is a requirement, your team decides and you can negotiate._

## How to hear one in a meeting

_[Rules almost never arrive announced. They surface in the middle of a story about something else, usually in one of these shapes:]_

- _"Must comply with..."_
- _"Only `<someone>` may `<do something>`"_
- _"If `<condition>`, then `<something happens>`"_
- _"Must be calculated according to..."_
- _"...unless it has been more than a year."_

_Examples of a client stating a rule without knowing it: "A new client must pay 30 percent of the estimated consulting fee and travel expenses in advance." "Time-off approvals must comply with the company's vacation policy."_

_When you hear one, write it down in the meeting. You will not reconstruct it afterward, and the exact wording matters because the rule is someone else's sentence, not yours._

## The five shapes a rule takes

_[Useful for recognizing rules, not for organizing this document. Sections below are grouped by topic, not by these categories.]_

| Shape | What it does | Example |
|---|---|---|
| **Fact** | States something always true about the business | Every senior design team belongs to exactly one course section. |
| **Constraint** | Restricts what may be done, or by whom | Only a course admin may create a course section. |
| **Action enabler** | Triggers an action when a condition holds | If a student has not completed safety training in 12 months, the request is refused. |
| **Inference** | Derives a new fact from known facts | A team with no submissions for two consecutive weeks is at risk. |
| **Computation** | Defines how a value is calculated | The peer evaluation score is the mean of all scores received that week. |

_Computations are the ones teams forget are rules. A formula the client uses today is a rule you must reproduce exactly, not a design decision you get to make. Ask for the spreadsheet._

## What a rule turns into

_[One rule usually propagates into several requirements of different kinds. This is why the document exists as its own artifact rather than being scattered through the specification.]_

| Requirement type | How the rule shows up | Example |
|---|---|---|
| Business requirement | A regulation drives a business objective | The system must enable compliance with all federal and state chemical reporting regulations within five months. |
| User requirement | A privacy policy dictates who may do what | Only laboratory managers may generate chemical exposure reports for anyone other than themselves. |
| Functional requirement | A company policy becomes system behavior | If an invoice is received from an unregistered vendor, the system shall email the vendor the supplier intake form and the W-9. |
| Quality attribute | A safety regulation becomes a checked property | The system must maintain safety training records and check them before a user can request a hazardous chemical. |

## Identifiers and traceability

_Each rule carries a stable `BR-<slug>` identifier, a name-based slug coined from the rule's gist: `BR-active-weeks`, `BR-section-admin-only`, `BR-artifact-key-unique`. Never renumber, rename, or repoint one. The thematic grouping into sections below is organizational only and does not affect a rule's identity, so moving a rule between sections is free and renaming it is not._

_**Cite rules, do not copy them.** When a use case is governed by a rule, its Business Rules field carries the identifier only, never the rule's text. One rule, one home. A rule copied into three use cases will be updated in one of them._

_A rule may cite another rule by identifier where one depends on another._

## Every rule needs a source

_[The column teams leave blank, and the one that matters most. For each rule, record where it comes from: a named policy document, a regulation, a page of the client's handbook, or the person who told you and the date.]_

_A rule you cannot attribute is usually not a rule. It is your team's design decision wearing a rule's clothes, and it belongs in the specification where it can be argued with. The test: if you asked your client to change it tomorrow, who would have to approve? If the answer is "you", it was never a rule._

_Where a rule is expected to change, say so and say when. Rules change on the business's schedule, not on yours._

## Where your AI teammate helps, and where it is dangerous

_[Delegate: turning your meeting notes into candidate rules, spotting sentences in a transcript that have the shape of a rule, and finding use cases in your specification that a given rule ought to govern but does not cite.]_

_**Do not let it invent rules.** This section is the single most dangerous place in your requirements for fabricated content, because an invented rule reads exactly like a real one. "Passwords must be at least 8 characters." "Records must be retained for 7 years." Both are plausible, both are common, and neither is your client's policy unless your client said so. A fabricated rule then propagates into functional requirements, tests that pass, and code that enforces something nobody asked for._

_The Source column is the defense. Every rule traces to a document or a person, or it does not go in the file. When your agent proposes a rule, the only question is: who told us this?_

## Revision History

| Date | Version | Description | Author |
|---|---|---|---|
| _[YYYY-MM-DD]_ | 0.1 | Initial rules from the client brief and first client meeting | _[Name]_ |

---

## 1. Introduction

### 1.1 Purpose

This document establishes the official policies, regulatory baselines, content standards, and business constraints that govern Well Live as an organization. These rules exist independently of software architecture or interface choices—they define how Well Live operates commercially, clinically, and ethically. System requirement specifications, software architecture designs, and development sprints must directly trace back to and comply with the rules established here.

### 1.2 Scope

This document governs platform monetization, content vetting standards, user health data consent, identity protection, and the boundaries of peer community engagement across the five wellness pillars: nutrition, fitness, finance, mental health, and spiritual health. 

Explicitly out of scope are:
* Direct clinical medical procedures and doctor-patient telehealth consultations.
* Formal psychiatric crisis intervention and emergency dispatch workflows.
* Third-party electronic health record (EHR) integrations with hospital networks.
* Pharmaceutical prescription fulfillment and physical medical device sales.
---

## 2. Rules

_[Group rules under topic headings that fit your project. The Project Pulse headings are one example, not a required set: Course Administration, Teams and Assignment, Access and Ownership, Identity and Uniqueness, Editing and Locking, Deletion Integrity, Review and Submission._

_Format each rule as a bold identifier, the rule in one sentence, then its source. Worked examples:]_

### 2.1 Health, Safety, and Clinical Boundaries

- **`BR-non-diagnostic`:** Well Live's educational content, community discussion, and personalized recommendations must never be presented as a medical diagnosis, prescription, or substitute for professional care.
  **Source:** technical assessment (`napkin.md`, "The Hard Part" — building the platform "without acting as an unlicensed diagnostic medical device") and the pitch summary's Candidate Quality and Safety Requirements, "Safety." **Candidate** — a working rule until the client confirms the platform's clinical boundary directly.
- **`BR-no-clinical-services`:** Well Live does not provide direct clinical medical procedures, doctor-patient telehealth consultations, psychiatric crisis intervention or emergency dispatch, electronic health record (EHR) integration, or prescription fulfillment or medical device sales.
  **Source:** `business-rules.md` §1.2 Scope, drafted from the original client brief; the same exclusions appear under "Potential Post-MVP Scope" in `well-live-pitch-summary.md`.
- **`BR-content-review`:** All member-facing educational content must pass a clinical or evidence-based review step before it is published.
  **Source:** technical assessment (`napkin.md`, system architecture — "Human-in-the-Loop Clinical Review") and the pitch summary's Candidate Quality and Safety Requirements, "Credibility." **Candidate** — who performs this review, and how often content is revalidated, are both still open client questions per the pitch summary.

### 2.2 Content and Topic Scope

- **`BR-five-pillars`:** Educational content and community discussion topics are limited to the five wellness pillars named in the founding brief: nutrition, fitness, financial health, mental health, and spiritual health.
  **Source:** original project brief (`napkin.md` §7, "Educational topics encompass").
- **`BR-ad-free`:** Subscribed members are not shown third-party advertising.
  **Source:** vision-and-scope.md, business opportunity statement ("Members get an ad-free space..."). **Candidate** — stated as part of the product pitch, not yet confirmed as a binding client policy.

### 2.3 Subscription and Access

- **`BR-subscription-model`:** Well Live's core business model is subscription-based access, not a free or one-time-purchase model.
  **Source:** original project brief (`napkin.md` §7 Overview — "a subscription-based application").
- **`BR-account-required`:** A person must hold a member account to access personalized content, post, or participate in community discussion. An unauthenticated visitor may view only introductory information about the service.
  **Source:** `well-live-pitch-summary.md`, Candidate MVP Scope — Account and Subscription Access. **Candidate** — the summary itself notes the MVP scope "must be validated with the client."

### 2.4 Privacy, Identity, and Data Handling

- **`BR-health-data-protection`:** Any sensitive health data collected (history, medications, goals) must be encrypted at rest and in transit and restricted by role-based access control.
  **Source:** technical assessment (`napkin.md` §1, "HIPAA-compliant Session & Token Management") and vision-and-scope.md, `RI-privacy-breach` mitigation.
- **`BR-no-mandatory-health-disclosure`:** The system must not require a member to disclose sensitive health information unless the client explicitly confirms this is necessary.
  **Source:** `well-live-pitch-summary.md`, Candidate MVP Scope — Member Profile and Goals.
- **`BR-pseudonymous-option`:** A member may choose to participate in community spaces (posts, comments, chat) under a pseudonymous handle rather than their account's real identity.
  **Source:** vision-and-scope.md improved-process flow ("Elect to Post Anonymously? → Generate Anonymous Handle"). **Candidate for the specification instead of this file** — this was a team design choice, not a client mandate; `well-live-pitch-summary.md` still lists "Should members be able to post anonymously or pseudonymously?" as an open client question.

### 2.5 Regulatory and Platform Constraints

- **`BR-not-medical-device`:** The platform must be designed and operated so that it is not classified as a regulated medical device or telehealth diagnostic service, to remain eligible for distribution through the Apple App Store and Google Play Store.
  **Source:** technical assessment (`napkin.md`, Kill Risks — "Regulatory & Privacy Non-Compliance") and vision-and-scope.md, `AS-app-store-clearance` assumption.

_[That third entry is deliberate. Flag rules you are not sure about rather than dropping them; deciding whether something is a rule or a requirement is a conversation to have with your client, and it is worth having.]_

_**Checklist:** Does every rule have a source? Could your client change it without asking you? Is it stated as one sentence about the business, rather than as a sentence about your software? Does any use case cite it, and if none does, is that correct?_
