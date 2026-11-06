# Checkpoint 2 Preparation Pull Request

**State:** Historical preparation-only handoff, superseded by [draft design PR #47](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/47) and [its current handoff](assessment-design-pr.md). Do not create a duplicate preparation PR. The original connector attempt returned 403; authenticated browser fallback later succeeded for the combined design branch.

**Branch:** `chore/checkpoint-2-preparation` targeting `main`
**Create PR:** https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/compare/main...chore/checkpoint-2-preparation?expand=1

Choose **Create draft pull request**, with title **Prepare Checkpoint 2 guardrails, traceability and review evidence**, and the description below. Do not merge before two nonowner approvals.

## Traces to
[UC-ACC-complete-assessment](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/blob/main/docs/requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment) and the Checkpoint 2 preparation checklist.
This PR prepares independent documentation; the existing ACC design still has blockers and does not authorize implementation.

## What changed
Adds Claude deny rules and dependency/attribution/parallel-work charter rules; replaces unrelated traceability examples with 16 real UCs, 11 BR links and proposed priorities/releases.
Records client questions, suggested four-part human-hour ranges, empty calibration records, an issue-ready impact list and gated release preparation. No votes, hours, client approval or working slice are asserted.
No repository PR template exists at the inspected baseline; this description uses the course headings.

## How it was verified
Verified exact root/origin and clean starting state against origin/main 3fdbe132a5d9a35bb3b794c95f51277d012ccafc; static checks passed for 13 settings rules, 204 local paths/anchors and 16/16 UC release rows; git diff --check passed.
Six planned secret/worktree paths are ignored; no secret contents were inspected for inventory. No application tests/builds exist or ran.
Not verified: Claude runtime refusal (needs harmless sentinel in Claude), team poker/Project Pulse actuals, design acceptance, running UI/API/MySQL slice.

## Reviewer focus
Require two approving nonowner reviews and human merge. Approve/change release and priority proposals; supply missing estimates/actuals. Claude settings do not configure Codex.
Outside the assessment impact list: AGENTS.md, .claude/settings.json, .gitignore, docs/planning/* and docs/releases/v0.1.0.md support independent Checkpoint 2 preparation; they do not implement assessment behavior.
The corrected design/requirements shape still needs owner acceptance before writing, then its own PR and human merge; implementation, trunk review and release authorization remain closed.
