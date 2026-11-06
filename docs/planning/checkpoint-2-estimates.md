# Checkpoint 2 Estimates and Calibration

**Prepared:** 2026-11-06, Codex-assisted proposals
**State:** Human inputs missing; no planning-poker round or actual hours asserted.

## Coarse planning proposals

These ranges are suggested **human hours**, not agent runtime or commitments. They include uncertainty about review and integration, with the assessment range including necessary security/member foundations. They are not measured from this team's history. Reduce duplicated foundation effort during team planning; do not sum the table as a release forecast.

The [course definitions](https://washingtonwei.github.io/cosc-40943/modules/implementation/#42-where-the-hours-go-now) distinguish Clarify (REQUIREMENTS/COMMUNICATION), Design (DESIGN), Build and review (DEVELOPMENT/REVIEW), and Verify (TESTING/BUGFIX). Review by another teammate belongs to the UC too. Multi-UC meetings remain overhead.

| Use case | Clarify h | Design h | Build and review h | Verify h | Total h | Agreement / issue |
|---|---|---|---|---|---|---|
| [UC-ACC-create-account](../requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account) | 1–2 | 1–3 | 4–8 | 2–4 | 8–17 | Suggested only; issue/owner and poker agreement missing |
| [UC-ACC-sign-in](../requirements/use-cases.md#uc-acc-sign-in-the-member-signs-in) | 1–3 | 2–4 | 5–10 | 3–6 | 11–23 | Suggested only; issue/owner and poker agreement missing |
| [UC-ACC-complete-assessment](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) | 2–5 | 3–6 | 12–24 | 8–16 | 25–51 | Suggested only; issue/owner and poker agreement missing |
| [UC-ACC-update-assessment](../requirements/use-cases.md#uc-acc-update-assessment-the-member-updates-their-assessment-answers) | 1–3 | 2–4 | 5–10 | 4–8 | 12–25 | Suggested only; issue/owner and poker agreement missing |
| [UC-ACC-set-display-identity](../requirements/use-cases.md#uc-acc-set-display-identity-the-member-chooses-how-their-identity-is-displayed) | 1–2 | 1–2 | 3–6 | 2–4 | 7–14 | Suggested only; issue/owner and poker agreement missing |
| [UC-ACC-delete-account](../requirements/use-cases.md#uc-acc-delete-account-the-member-deletes-their-account-and-personal-data) | 2–5 | 2–4 | 5–10 | 4–8 | 13–27 | Suggested only; issue/owner and poker agreement missing |
| [UC-CON-browse-feed](../requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed) | 1–3 | 1–3 | 4–8 | 3–5 | 9–19 | Suggested only; issue/owner and poker agreement missing |
| [UC-CON-search-content](../requirements/use-cases.md#uc-con-search-content-the-member-searches-or-filters-educational-content) | 1–2 | 1–3 | 3–6 | 2–4 | 7–15 | Suggested only; issue/owner and poker agreement missing |
| [UC-CON-read-content](../requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources) | 1–2 | 1–2 | 2–5 | 2–4 | 6–13 | Suggested only; issue/owner and poker agreement missing |
| [UC-CON-opt-out-personalization](../requirements/use-cases.md#uc-con-opt-out-personalization-the-member-opts-out-of-or-resets-personalization) | 2–4 | 1–3 | 3–6 | 2–5 | 8–18 | Suggested only; issue/owner and poker agreement missing |
| [UC-COM-join-topic-group](../requirements/use-cases.md#uc-com-join-topic-group-the-member-browses-and-joins-a-topic-group) | 2–4 | 1–3 | 3–7 | 2–5 | 8–19 | Suggested only; issue/owner and poker agreement missing |
| [UC-COM-create-post](../requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post) | 2–5 | 2–4 | 4–8 | 3–6 | 11–23 | Suggested only; issue/owner and poker agreement missing |
| [UC-COM-comment-on-post](../requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post) | 1–3 | 1–3 | 3–6 | 2–5 | 7–17 | Suggested only; issue/owner and poker agreement missing |
| [UC-MOD-report-content](../requirements/use-cases.md#uc-mod-report-content-the-member-reports-harmful-or-misleading-content) | 2–4 | 1–3 | 3–7 | 3–6 | 9–20 | Suggested only; issue/owner and poker agreement missing |
| [UC-MOD-review-report](../requirements/use-cases.md#uc-mod-review-report-the-moderator-reviews-a-content-report) | 3–6 | 2–5 | 5–10 | 4–8 | 14–29 | Suggested only; issue/owner and poker agreement missing |
| [UC-SUB-manage-subscription](../requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) | 4–8 | 3–6 | 8–16 | 6–12 | 21–42 | Suggested only; issue/owner and poker agreement missing |

The assessment draft predates this preparation. Its row is a proposed range for remaining clarification and changed scope, **not a backdated coarse estimate**. After its corrected design merges, the owner should make a fresh refined estimate from its approved test rows: remaining clarify/design, build/review, verify. No refined estimate has been agreed.

Each not-yet-designed UC still needs an issue and a meeting poker round: independent four-part ranges, simultaneous reveal, high/low discussion, then recorded human agreement and date. The suggested rows above must not be relabeled as votes.

## Calibration preparation

[Calibration](https://washingtonwei.github.io/cosc-40943/modules/implementation/#44-recording-and-calibrating) uses UC-tagged Project Pulse activity hours **since each estimate was made**. Midpoint = (low + high) / 2; ratio = actual / midpoint. Maintain separate coarse/refined rows and per-person/team totals; avoid double-counting shared time. A missing actual or midpoint gives no ratio.

No finished UC or qualifying estimates/actuals were evidenced. The following are pending records, not completed calibration:

| UC | Estimate kind | Made | Agreed range | Midpoint | Actual h since estimate | Ratio | Biggest miss |
|---|---|---|---|---|---|---|---|
| [UC-ACC-create-account](../requirements/use-cases.md#uc-acc-create-account-the-visitor-creates-an-account) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-sign-in](../requirements/use-cases.md#uc-acc-sign-in-the-member-signs-in) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-complete-assessment](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-update-assessment](../requirements/use-cases.md#uc-acc-update-assessment-the-member-updates-their-assessment-answers) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-set-display-identity](../requirements/use-cases.md#uc-acc-set-display-identity-the-member-chooses-how-their-identity-is-displayed) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-delete-account](../requirements/use-cases.md#uc-acc-delete-account-the-member-deletes-their-account-and-personal-data) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-CON-browse-feed](../requirements/use-cases.md#uc-con-browse-feed-the-member-browses-the-educational-feed) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-CON-search-content](../requirements/use-cases.md#uc-con-search-content-the-member-searches-or-filters-educational-content) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-CON-read-content](../requirements/use-cases.md#uc-con-read-content-the-member-reads-an-educational-item-and-its-sources) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-CON-opt-out-personalization](../requirements/use-cases.md#uc-con-opt-out-personalization-the-member-opts-out-of-or-resets-personalization) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-COM-join-topic-group](../requirements/use-cases.md#uc-com-join-topic-group-the-member-browses-and-joins-a-topic-group) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-COM-create-post](../requirements/use-cases.md#uc-com-create-post-the-member-shares-a-health-journey-post) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-COM-comment-on-post](../requirements/use-cases.md#uc-com-comment-on-post-the-member-responds-to-a-post) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-MOD-report-content](../requirements/use-cases.md#uc-mod-report-content-the-member-reports-harmful-or-misleading-content) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-MOD-review-report](../requirements/use-cases.md#uc-mod-review-report-the-moderator-reviews-a-content-report) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-SUB-manage-subscription](../requirements/use-cases.md#uc-sub-manage-subscription-the-member-manages-their-subscription) | Coarse | Not supplied | Not supplied | — | Not supplied | Not calculated | Retrospective not held/evidenced |
| [UC-ACC-complete-assessment](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) | Refined | After corrected design merge | Not yet made | — | Not supplied | Not calculated | Pending implementation and retrospective |

## One team input request

Supply UC owners/issues; dated independent poker ranges and the agreed four-part ranges; any historical/refined estimates; dated UC-tagged Project Pulse entries by person/category with actual hours since each estimate; and each completed UC's genuine biggest-miss observation. Do not send health answers, credentials or unrelated activity data. Activity reports are in Project Pulse, not this repository; none were supplied through the connected sources.

## Release forecast

Uncalibrated. Team availability and overhead are missing. Review the [release proposals](../traceability.md#3-use-cases-and-release-proposals) against remaining human capacity before promising v1.0.0. Neither this table nor a merged design proves completed implementation.
