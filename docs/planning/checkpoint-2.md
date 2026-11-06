# Checkpoint 2 Preparation Checklist

**Checked:** 2026-11-06, against origin/main `3fdbe132a5d9a35bb3b794c95f51277d012ccafc`
**Branch:** `chore/checkpoint-2-preparation`
**State:** Preparation only; human design stops and delivery evidence remain open.

| Item | Evidence / prepared work | Status and next action |
|---|---|---|
| Access and baseline | Exact repository root/origin verified; starting `design-health-assessment` was clean; fetched main contains PRs #39 and #40 | Complete; original branch retained, preparation starts from current origin/main |
| Assessment design and requirements | [ACC draft](../design/acc.md), [use case](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), complete questionnaire read; concrete shape proposed to owner | Partial; accept shape under [design command Phase 2](../../.claude/commands/design.md#phase-2-draft-the-design-and-wait), then write corrected mapping/contracts/requirements and run fresh questions test; two nonowner approvals and human merge before implementation |
| Architecture | Section 8 read in full; Ionic accepted but Vue/backend/database decisions missing; runtime/quality/risk template gaps remain | Partial; proposed changes belong in the design PR after shape acceptance; keep components provisional until proven |
| Settings | [Claude settings](../../.claude/settings.json), [charter](../../AGENTS.md#agent-settings-and-secrets), ignored planned local secret mount and course worktree path | Partial; static validation and reviewable diff required, then human Claude sentinel refusal check and teammate review/merge |
| Charter | [Dependency, attribution and parallel-work rules](../../AGENTS.md#parallel-agent-workflow) | Partial; team review/merge required; no dependency added |
| Traceability/release plan | [16 UC rows, all defined project FRs and rule/feature links](../traceability.md) | Partial; priorities/releases are proposals; zero project FR definitions in SRS §5.2; undefined feature and administration gaps explicit |
| Coarse estimates | [Four-part suggested ranges](checkpoint-2-estimates.md#coarse-planning-proposals) for every UC | Partial; use-case issues, independent team poker and human agreement missing; not retroactive votes |
| Calibration | [Pending rows and formula](checkpoint-2-estimates.md#calibration-preparation) | Missing evidence; Project Pulse hours, estimate dates/ranges, per-person/team ratios and retrospective observations not supplied; no finished UC established |
| Questionnaire impact | [Issue-ready impact body and searches](assessment-change-issue.md) | Partial; GitHub creation refused with 403, browser needs sign-in; submit the prepared issue when write access is available |
| Implementation and tests | Tracked tree contains static prototypes only; no app manifests, integration tests or CI | Blocked by corrected design review/merge and [fresh implementation session](../../.claude/commands/implement.md); build real auth/API/MySQL flow, then stop at trunk commit for owner explanation before leaves |
| v0.1.0 | [Draft notes](../releases/v0.1.0.md), [conditional startup/tag/demo commands](checkpoint-2-release.md) | Blocked; no running demo, mapped tests, build evidence, tag or release; publish only after implementation review/merge and explicit authorization |

## Team decisions pending

One grouped request has been presented for MySQL on Aiven's free plan/local tests, fictitious-data-only demonstration scope, assessment ownership and available poker/Project Pulse evidence. The design-shape proposal also asks for real database-backed demo sign-in, member terminology without paid entitlement for the proving slice, and questionnaire follow-up associations. None is silently marked accepted.

Client questions are recorded in [OPEN-ISSUES.md](../requirements/OPEN-ISSUES.md): collection scope, retention/disposal, explanation of use, and response to sensitive concern selections. The proposed demonstration scope uses fictitious data only; no alert, clinical advice or retention period is invented. Existing client answers are not claimed.

## Review and access handoff

The [team contract](../team-contract.md#5-git-workflow-and-review) requires **two approving nonowner reviews**. Draft PR creation is authorized but merging, self-approval, messaging, paid resources and release publication are not.

Normal command execution fails during sandbox setup; supported repository-scoped elevated checks work when approved. The GitHub connector reads the repository but issue creation returns `403 Resource not accessible by integration`; the available browser is signed out. Do not infer write access from a successful read or weaken filesystem permissions. The local impact body remains ready for submission.

No Windows permissions changed, no reset/reclone/init/delete of Git metadata, no credentials or real assessment answers added, and no product implementation started. The questionnaire source remains unchanged. Read-only delegated preparation did not write files.

## Course evidence

- [Checkpoint 2 checklist](https://washingtonwei.github.io/cosc-40943/project/#checkpoint-2-checklist)
- [Shared settings and charter rules](https://washingtonwei.github.io/cosc-40943/agent-setup/#10-your-team-repository)
- [Estimate definitions and calibration](https://washingtonwei.github.io/cosc-40943/modules/implementation/#42-where-the-hours-go-now)

## Working this document with your agent

Update status from observed evidence and link it. Keep design-shape acceptance, two nonowner reviews/merge, trunk explanation, dependency checks, real-data scope and release authorization human. A document or proposed command is not evidence of a working slice.
