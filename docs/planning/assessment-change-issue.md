# Assessment Questionnaire Change Issue

**State:** Ready to copy into a GitHub issue; creation attempted on 2026-11-06 and refused with `403 Resource not accessible by integration`. No issue number is claimed. The available browser requires GitHub sign-in.

**Proposed title:** Align assessment questionnaire and record Checkpoint 2 impact

## Change and provenance
Sarah's questionnaire was added in PR #38; PR #39 merged a draft assessment design and PR #40 clarified its Continue label. The team supplied application decisions on 2026-11-06. These decisions are not evidence that Sarah approved collection, retention, use, or sensitive-selection handling.

## Impact list
- [UC-ACC-complete-assessment](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/blob/main/docs/requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment): questionnaire, tri-state responses, optional follow-ups, normalization, confirmation, retry/conflict flows, general feed.
- UC-ACC-update-assessment: its validation delegates to completion; retain response distinctions when later designed.
- UC-CON-browse-feed and UC-CON-opt-out-personalization: completion opens the general feed; this slice must not enable personalization.
- BR-no-mandatory-health-disclosure, BR-health-data-protection, BR-non-diagnostic, BR-not-medical-device, BR-five-pillars; SEC-protected-data: preserve existing policies; no new client rule is asserted.
- docs/health assessment.docx: source wording, unchanged.
- docs/requirements/use-cases.md and software-requirements-specification.md §7.1–7.4: remove conflicting placeholders and cite canonical validation.
- docs/requirements/project-glossary.md: resolve Member/subscription mismatch before implementing access; do not silently create a payment gate.
- docs/requirements/OPEN-ISSUES.md: collection scope, retention, explanation of use, sensitive-selection response and technical decisions.
- docs/design/acc.md; docs/design/architectural-design.md §§5–11; docs/traceability.md: concrete design, stack/security boundaries, tests and honest states.
- prototypes/design/education-first-app-mockups/: inspect assessment/feed terminology as demonstration evidence only; no production implementation exists.

## Search findings at origin/main 3fdbe132a5d9a35bb3b794c95f51277d012ccafc
Repository-scoped rg searches for UC-ACC-complete-assessment, assessment, Other, personalization and FR- found universal Other/binary screening placeholders in the completion UC, obsolete assessment fields and personalization-enabled in SRS §7.2, incomplete mapping/paths in acc.md, and architecture ownership/encryption/UTC/atomicity obligations. The update UC references completion validation. Traceability still contains Project Pulse examples. SRS §5.2 defines no project FR; FR-SAVE-autosave-active is explicitly an example. FEAT-general-content is cited but undefined; do not fabricate its definition.
Tracked-tree inspection found static prototypes but no application manifests, source tests, CI workflows or release tags. GitHub releases collection is empty.

## Client questions to take through the team
1. Which questionnaire information may be collected for real member use?
2. What retention/deletion and backup-retention policy applies?
3. What explanation of use may be shown before collection?
4. What response, if any, is expected to sensitive concern selections?
No clinical advice, alert, notification or retention duration is implied.

## Proposed proving scope and gates
Use fictitious data only until client questions and privacy review are resolved. Full questionnaire with real authenticated ownership and real MySQL persistence; no personalization. Aiven free-plan MySQL remains proposed pending team confirmation; no service provisioned.
Accept the design shape, then prepare its diff/PR; two nonowner approvals and human merge are required before a fresh implementation session. Preserve trunk review stop and release authorization.
PRs must name files outside this list and why; settings/charter, estimates/calibration, release/checklist documents are independent Checkpoint 2 preparation, not assessment behavior.
