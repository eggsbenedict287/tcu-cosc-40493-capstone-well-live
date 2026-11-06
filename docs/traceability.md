# Traceability Matrix

**Project:** Well Live
**Team:** Team 07
**Version:** 0.2 proposed
**Last checked:** 2026-11-06, corrected-design preparation against main `eea456b`; no implemented slice is claimed.

This document owns links, not requirements. Release placement and priorities below are **proposals pending team review**, not a forecast or client commitment. [Estimates and missing actuals](planning/checkpoint-2-estimates.md) do not yet establish capacity.

## 1. Feature to use case area

| Feature | Business objectives | Use case areas |
|---|---|---|
| [FEAT-account-profile](requirements/vision-and-scope.md#42-major-features-and-scope) | [BO-intake-completion](requirements/vision-and-scope.md#22-business-objectives) | ACC |
| [FEAT-personalized-content](requirements/vision-and-scope.md#42-major-features-and-scope) | [BO-health-literacy](requirements/vision-and-scope.md#22-business-objectives), [BO-content-credibility](requirements/vision-and-scope.md#22-business-objectives) | CON; assessment input from ACC |
| [FEAT-community-discussions](requirements/vision-and-scope.md#42-major-features-and-scope) | [BO-peer-engagement](requirements/vision-and-scope.md#22-business-objectives) | COM |
| [FEAT-content-moderation](requirements/vision-and-scope.md#42-major-features-and-scope) | [BO-content-credibility](requirements/vision-and-scope.md#22-business-objectives) | MOD |
| [FEAT-subscriptions](requirements/vision-and-scope.md#42-major-features-and-scope) | [BO-retention-rate](requirements/vision-and-scope.md#22-business-objectives) | SUB |
| [FEAT-administration](requirements/vision-and-scope.md#42-major-features-and-scope) | Enabling; no direct objective asserted | ADM — no defined use case; gap remains |

All six defined features and all five defined use case areas are represented. Architecture also names ADM, but its use cases are missing. `FEAT-general-content` is referenced in vision and scope §4.3 but has no definition; it is not invented as a seventh feature here. The source [use-case scope](requirements/use-cases.md#12-scope) already flags this inconsistency.

## 2. Business rule to what enforces it

The Source column summarizes the owning document's attribution, retaining its candidate qualifications. Old `napkin.md` source references resolve to the existing [napkin0.md](napkins/napkin0.md); the historical source references in business rules are not silently edited.

| Business rule | Source | Requirements that cite it |
|---|---|---|
| [BR-non-diagnostic](requirements/business-rules.md#21-health-safety-and-clinical-boundaries) | [Technical assessment](napkins/napkin0.md); [pitch summary](pitches/well-live-pitch-summary.md), candidate | [UC-ACC-create-account](requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account), [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed), [UC-CON-read-content](requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources), [UC-COM-create-post](requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post), [UC-COM-comment-on-post](requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post), [UC-MOD-report-content](requirements/use-cases.md#uc-mod-report-content-the-member-reports-harmful-or-misleading-content) |
| [BR-no-clinical-services](requirements/business-rules.md#21-health-safety-and-clinical-boundaries) | [Business rules §1.2](requirements/business-rules.md#12-scope); [pitch summary](pitches/well-live-pitch-summary.md) | [UC-CON-read-content](requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources), [UC-MOD-report-content](requirements/use-cases.md#uc-mod-report-content-the-member-reports-harmful-or-misleading-content) |
| [BR-content-review](requirements/business-rules.md#21-health-safety-and-clinical-boundaries) | [Technical assessment](napkins/napkin0.md); [pitch summary](pitches/well-live-pitch-summary.md), candidate | [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed), [UC-CON-search-content](requirements/use-cases.md#uc-con-search-content-the-member-searches-or-filters-educational-content), [UC-CON-read-content](requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources), [UC-MOD-review-report](requirements/use-cases.md#uc-mod-review-report-the-moderator-reviews-a-content-report) |
| [BR-five-pillars](requirements/business-rules.md#22-content-and-topic-scope) | [Technical assessment](napkins/napkin0.md) | [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed), [UC-CON-search-content](requirements/use-cases.md#uc-con-search-content-the-member-searches-or-filters-educational-content), [UC-COM-join-topic-group](requirements/use-cases.md#uc-com-join-topic-group-the-member-browses-and-joins-a-topic-group), [UC-COM-create-post](requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post) |
| [BR-ad-free](requirements/business-rules.md#22-content-and-topic-scope) | [Vision and scope](requirements/vision-and-scope.md), candidate | [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed), [UC-SUB-manage-subscription](requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) |
| [BR-subscription-model](requirements/business-rules.md#23-subscription-and-access) | [Technical assessment](napkins/napkin0.md) | [UC-SUB-manage-subscription](requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) |
| [BR-account-required](requirements/business-rules.md#23-subscription-and-access) | [Pitch summary](pitches/well-live-pitch-summary.md), candidate | [UC-ACC-create-account](requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account), [UC-ACC-sign-in](requirements/use-cases.md#uc-acc-sign-in-the-member-signs-in), [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed), [UC-COM-join-topic-group](requirements/use-cases.md#uc-com-join-topic-group-the-member-browses-and-joins-a-topic-group), [UC-COM-create-post](requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post), [UC-COM-comment-on-post](requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post), [UC-SUB-manage-subscription](requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) |
| [BR-health-data-protection](requirements/business-rules.md#24-privacy-identity-and-data-handling) | [Technical assessment](napkins/napkin0.md); [vision and scope](requirements/vision-and-scope.md) | [UC-ACC-sign-in](requirements/use-cases.md#uc-acc-sign-in-the-member-signs-in), [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [UC-ACC-update-assessment](requirements/use-cases.md#uc-acc-update-assessment-the-member-updates-their-assessment-answers), [UC-ACC-delete-account](requirements/use-cases.md#uc-acc-delete-account-the-member-deletes-their-account-and-personal-data), [UC-MOD-review-report](requirements/use-cases.md#uc-mod-review-report-the-moderator-reviews-a-content-report) |
| [BR-no-mandatory-health-disclosure](requirements/business-rules.md#24-privacy-identity-and-data-handling) | [Pitch summary](pitches/well-live-pitch-summary.md) | [UC-ACC-create-account](requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account), [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [UC-ACC-update-assessment](requirements/use-cases.md#uc-acc-update-assessment-the-member-updates-their-assessment-answers), [UC-CON-opt-out-personalization](requirements/use-cases.md#uc-con-opt-out-personalization-the-member-opts-out-of-or-resets-personalization) |
| [BR-pseudonymous-option](requirements/business-rules.md#24-privacy-identity-and-data-handling) | [Vision and scope](requirements/vision-and-scope.md); [pitch summary](pitches/well-live-pitch-summary.md), team choice/client question | [UC-ACC-set-display-identity](requirements/use-cases.md#uc-acc-set-display-identity-the-member-chooses-how-their-identity-is-displayed), [UC-COM-create-post](requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post), [UC-COM-comment-on-post](requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post) |
| [BR-not-medical-device](requirements/business-rules.md#25-regulatory-and-platform-constraints) | [Technical assessment](napkins/napkin0.md); [vision and scope](requirements/vision-and-scope.md) | [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) |

Every one of the eleven defined rules is cited by at least one defined UC. This establishes specification links only; implementation enforcement has not been verified. All BR identifiers in UC Business Rules fields resolve. Candidate policies still need client review.

## 3. Use cases and release proposals

Release values are `v0.1.0` (proving slice), `v0.2.0` (proposed next delivery), `v1.0.0` (fall MVP), `Spring`, or `Out`. No existing UC is declared Out by this proposal. Fall readiness, remaining capacity and client scope must be reviewed before moving rows into v1.0.0.

`v0.1.0` needs real authentication/member storage and a general-feed destination. These are partial foundations of other UCs, not proof those full UCs are complete. All Code and Tests cells remain empty because main/current checkout has only static prototypes. Remote integrate-health-assessment contains an unverified backend and React/Ionic React draft; PR #44 merged into that branch, not main. It does not establish compliance with this corrected design or the selected Ionic Vue stack. The merged assessment draft [PR #39](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/39) still has blockers; [PR #40](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/40) changes a diagram label only.

| Requirement | Priority proposal | Release proposal | Design | Code | Tests | Build | Verify |
|---|---|---|---|---|---|---|---|
| [UC-ACC-create-account](requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account) | High | v0.2.0 |  | | | Not started | None |
| [UC-ACC-sign-in](requirements/use-cases.md#uc-acc-sign-in-the-member-signs-in) | High | v0.2.0 |  | | | Not started | None |
| [UC-ACC-complete-assessment](requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) | High | v0.1.0 | [Corrected ACC design](design/acc.md#uc-acc-complete-assessment) — review/merge and team decisions pending | | | Not started | None |
| [UC-ACC-update-assessment](requirements/use-cases.md#uc-acc-update-assessment-the-member-updates-their-assessment-answers) | Medium | v0.2.0 |  | | | Not started | None |
| [UC-ACC-set-display-identity](requirements/use-cases.md#uc-acc-set-display-identity-the-member-chooses-how-their-identity-is-displayed) | Medium | v0.2.0 |  | | | Not started | None |
| [UC-ACC-delete-account](requirements/use-cases.md#uc-acc-delete-account-the-member-deletes-their-account-and-personal-data) | Medium | v0.2.0 |  | | | Not started | None |
| [UC-CON-browse-feed](requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed) | High | v0.2.0 |  | | | Not started | None |
| [UC-CON-search-content](requirements/use-cases.md#uc-con-search-content-the-member-searches-or-filters-educational-content) | Medium | v0.2.0 |  | | | Not started | None |
| [UC-CON-read-content](requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources) | Medium | v0.2.0 |  | | | Not started | None |
| [UC-CON-opt-out-personalization](requirements/use-cases.md#uc-con-opt-out-personalization-the-member-opts-out-of-or-resets-personalization) | Medium | Spring |  | | | Not started | None |
| [UC-COM-join-topic-group](requirements/use-cases.md#uc-com-join-topic-group-the-member-browses-and-joins-a-topic-group) | Low | Spring |  | | | Not started | None |
| [UC-COM-create-post](requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post) | Low | Spring |  | | | Not started | None |
| [UC-COM-comment-on-post](requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post) | Low | Spring |  | | | Not started | None |
| [UC-MOD-report-content](requirements/use-cases.md#uc-mod-report-content-the-member-reports-harmful-or-misleading-content) | Low | Spring |  | | | Not started | None |
| [UC-MOD-review-report](requirements/use-cases.md#uc-mod-review-report-the-moderator-reviews-a-content-report) | Low | Spring |  | | | Not started | None |
| [UC-SUB-manage-subscription](requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) | Low | Spring |  | | | Not started | None |

## 4. Non-use-case functional requirements

[SRS §5.2](requirements/software-requirements-specification.md#52-non-use-case-functional-requirements) defines **zero project FRs**. `FR-SAVE-autosave-active` is an italic template example and is excluded. All 16 defined UCs are above; no FR row is invented to make this table look complete.

If the team defines a project FR in the owning SRS, add its real source link and Release/Design/Code/Tests/Build/Verify row here in the same PR.

## 5. Gaps and checks

- Feature coverage: six defined features linked; ADM behavior remains unspecified.
- UC coverage: 16/16 defined UCs linked; every row has an allowed release proposal.
- FR coverage: 0/0 defined project FRs; SRS functional inventory remains a review item.
- Rule coverage: 11/11 defined BRs linked to citing UCs; candidate status preserved.
- Delivery evidence: no production application, tests, CI or tags found at the checked baseline. Static [prototypes](../prototypes/) are design evidence.
- Definition gaps: undefined `FEAT-general-content`; Member/subscription mismatch between [glossary](requirements/project-glossary.md#member) and [SRS user classes](requirements/software-requirements-specification.md#22-user-classes-and-characteristics). The corrected assessment mapping/requirements are proposed in this branch, not merged or implemented. See [impact preparation](planning/assessment-change-issue.md).

Do not set the assessment row to Designed merely because a prior draft was merged. After two nonowner approvals, resolution of its implementation-blocking decisions and human merge of the corrected design, update its Build to Designed; leave Code/Tests/Verify unclaimed until implementation supplies evidence. Owner-only retrieval in ACC is only a foundation of the update UC, not a design or completion claim for that entire UC.

## Working this document with your agent

Regenerate links only from definitions in owning documents. Report undefined identifiers and uncovered features rather than inventing behavior. Keep priorities, release scope, acceptance and review human. A design file's existence does not establish a built or verified feature.
