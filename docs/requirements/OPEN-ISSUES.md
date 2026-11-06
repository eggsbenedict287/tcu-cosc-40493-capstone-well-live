# Open Issues

**Project:** Well Live
**Team:** Team 07 — An Cao, Esteban Hernandez-Anguiano, Elijah Johnston, Nikola Koltin, Angelette Munoz, William Schuller
**Client:** Sarah Becan
**Version:** 0.2 proposed

---

_**What this file is.** Every question about the project that you cannot answer yet, in one place, with the name of the person who can answer it. It is the shortest document in `docs/requirements/` and the one your client meetings run on._

_**Why it exists.** A draft specification with confident guesses in the gaps is more dangerous than one with holes in it, because nobody can tell the guesses from the facts. Writing "we do not know" is not an admission of failure in week 3, it is the correct state. What fails is knowing and not writing it down._

_**Where entries come from.** Three places, and all three are routine:_

- _Drafting a section of [vision-and-scope.md](vision-and-scope.md) and hitting something the client brief does not say._
- _Your agent's list. When you ask it to draft a section, ask it to list every question it could not answer from the material you gave it. Its list is longer than yours and it is not embarrassed to ask obvious things._
- _The meeting itself. Your client says something that contradicts your notes, or answers a question with "I would have to check"._

_**How they leave.** Answered in a client meeting, in Slack, or by reading a document. Record the answer and the date, mark it resolved, and put the substance where it belongs (an objective, a term in the [glossary](project-glossary.md), a business rule). This file is a queue, not a home: an answer that stays here has not been filed._

_**Identifiers here are numbers**, `OI-1` upward, and that is deliberate. Numbers are fine for a list that only ever grows at the bottom and gets cited lightly. The slug convention in [vision-and-scope.md](vision-and-scope.md) exists for identifiers that get **reordered** or **cited often**, which is not this list._

## Before a client meeting

_[Sort the open list by what it costs you to stay wrong, not by what is easy to ask. You will get through fewer questions than you plan to. Take the ones where a wrong guess sends the whole team down the wrong path for a month, and leave the ones you can settle by reading a document or trying the client's current tool yourself.]_

_[Send the shortlist to your client the day before. A client who has seen the questions arrives with answers instead of promises.]_

## Open

| ID | Question | Why it matters | Who can answer | Raised |
|---|---|---|---|---|
| OI-2 | Will the team accept MySQL on Aiven's free plan for development and the proving slice, with local MySQL for development/tests? Who owns operation and later production approval? | Database choice and hosting remain proposed; no paid resource or client approval is implied. | Team; client for production responsibilities | 2026-09-25; clarified 2026-11-06 |
| OI-3 | Where will the Spring Boot backend be hosted, who owns it, and what approved budget applies? | Database hosting would not itself host the backend. A hosted demonstration still needs application compute and HTTPS. | Team and client | 2026-09-26; clarified 2026-11-06 |
| OI-4 | Which entries in the supplied questionnaire may be collected for real member use, and which must be excluded? | [UC-ACC-complete-assessment](use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) has corrected collection fields proposed in this branch. Questionnaire wording is source evidence, not approval of collection scope. The owner requires fictitious data only for development and demonstration; real collection remains blocked. | Client and team | 2026-11-06 |
| OI-5 | What retention, deletion and backup-retention rules apply to assessment answers and access/audit records? | Blocks real-data deployment and completion of [SRS §7.4](software-requirements-specification.md#74-data-acquisition-integrity-retention-and-disposal). No duration or cleanup schedule is assumed. | Client and team | 2026-11-06 |
| OI-6 | What exact explanation of collection purpose, use, access and optional disclosure should members see before answering? | Completion step 2 requires an explanation; the team must not invent consent text or claim personalization already uses answers. Demonstration text must identify fictitious-data scope. | Client; team for demonstration wording | 2026-11-06 |
| OI-7 | What response, if any, should follow sensitive concern selections in the questionnaire? | No clinical advice, alert, notification, monitoring or intervention may be inferred. Confirm the intended boundary before real-member use. | Client and team | 2026-11-06 |
| OI-8 | For the proving slice, does Member mean an authenticated account without a paid subscription, may fictitious active member accounts be bootstrapped for real sign-in, and is a general-feed/profile entry shell an acceptable dependency boundary? | [Glossary Member](project-glossary.md#member) requires a subscription; [SRS user classes](software-requirements-specification.md#22-user-classes-and-characteristics) and the MVP defer payments. Real authentication must not be replaced with mock identity. The shell proves navigation and take-later entry, not the full content/profile use cases. | Team | 2026-11-06 |
| OI-9 | Which session lifetime, login throttle/window values, supported JDK/Node runtimes and dependency versions will the team approve for the shared sign-in/build foundations? | Missing or invalid security settings must fail startup; the design must not invent client policies or install unchecked packages. | Team / use-case owner | 2026-11-06 |
| OI-10 | Does the team accept the proposed exact decimal-string wire/normalization rules and retry-validation precedence in ACC, including the treatment of insignificant zeros and exponent notation? What request/number-size limits are compatible with the accepted value domain? | Both clients must agree on equivalence and validation without rounding or a hidden magnitude limit; resource limits must not be guessed. | Team / use-case owner | 2026-11-06 |
| OI-11 | Must assessment access itself produce audit events, what metadata is permitted, and how long are such records retained? May fictitious-only implementation proceed while this real-deployment policy remains open? | [Architecture §8.2 Auditing](../design/architectural-design.md#82-other-concepts) explicitly leaves this unresolved. Ordinary safe operational logging is not an approved access-audit policy; no assessment answers belong in audit payloads. | Client and team; team for fictitious-only boundary | 2026-11-06 |
| OI-12 | Who provisions/rotates assessment encryption keys and retains decrypt keys/recovery backups, and which HTTPS/proxy/session/logging configuration enforces the demonstration's privacy boundary? | Review before hosted demonstration. Key-ID lookup fails closed; losing old keys prevents owner reads. No key, answer body or credential may enter logs/traces/backups without its approved protection. Real deployment also requires client privacy decisions. | Team and hosting/key operator | 2026-11-06 |

OI-1 was a template instruction, not a project question; its number is not reused. The team's accepted application decisions supplied on 2026-11-06 do not answer these client questions. No client answer is recorded by this preparation.

## Resolved

| ID | Question | Answer | Answered by | Date | Filed in |
|---|---|---|---|---|---|

No resolved project questions are recorded here. The former OI-0 row was an example, not a client answer.
