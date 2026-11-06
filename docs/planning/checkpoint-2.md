# Checkpoint 2 Preparation Checklist

**Checked:** 2026-11-06 against origin/main `eea456b84e598b202f33b577f6e773f0263d3271`.
**Branch:** `design/assessment-checkpoint-2`; includes the earlier preparation and current main.
**State:** Corrected design written for review; no implementation or working-slice claim.

Document verification: source-extracted 110 item/eight prompt labels match the mapping; 37 unique planned test rows; 310 local links/anchors checked, no failures; 13 deny rules (five Read rules) and six ignored planned paths checked; git diff --check passed. Editor diagnostics: none. No product build/test/analyzer ran.

| Item | Evidence | Status / next action |
|---|---|---|
| Access/current state | AGENTS/design/implement read; git status/root/origin succeed in exact checkout; latest main fetched | Complete; teammate work preserved. Current execution works without the earlier sandbox setup workaround. |
| Design/requirements | [ACC](../design/acc.md), [UC](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [SRS](../requirements/software-requirements-specification.md), [questions test](assessment-review-dispositions.md) | Partial; 110 primary items/eight prompts, concrete contracts and planned tests. Open decisions, two nonowner reviews and human merge remain. |
| Architecture | [Stack/runtime/quality/risk proposals](../design/architectural-design.md#93-checkpoint-2-stack-decisions) | Partial; Ionic Vue, Spring Boot and tools recorded; MySQL/Aiven proposed; no verified quality scenario. |
| Settings/charter | [Claude settings](../../.claude/settings.json), [AGENTS](../../AGENTS.md), [ignore rules](../../.gitignore) | Partial; deny/dependency/attribution/parallel rules prepared. Human harmless-sentinel refusal check in Claude and teammate review/merge pending. Does not configure Codex. |
| Traceability/releases | [16 UC rows and 11 BR links](../traceability.md) | Partial; zero project FR definitions in SRS §5.2. Release/priorities proposed; Code/Tests empty and Verify None. Undefined feature/administration gaps explicit. |
| Coarse estimates | [Four-part suggestions](checkpoint-2-estimates.md), preserved [teammate coarse rows](../calibration.md) | Partial; issue/owner links, independent estimates and dated team agreement missing. Commits do not prove poker occurred. |
| Calibration | [Pending records/formulas](checkpoint-2-estimates.md#calibration-preparation) | Missing actual-hours evidence; examples excluded, ratios and biggest miss not invented. |
| Impact | [Issue body/search findings](assessment-change-issue.md) | Partial; GitHub issue creation previously returned 403; no issue number claimed. |
| Implementation | [Human stops](../design/acc.md#implementation-ordering-and-human-stops) | Blocked; corrected design unmerged on main. Preserve remote integration draft, reconcile after approval, start fresh implementation session and stop after trunk for owner explanation. |
| Tests/static checks | [Selected tools and findings contract](assessment-checks-and-ci.md) | Missing execution; no package.json/pom.xml in this checkout. No app tests/builds/analyzers run; counts unavailable, not zero. All test rows planned. |
| PR CI | [Two-job plan and Project Pulse comparison](assessment-checks-and-ci.md#future-workflow-contract) | Blocked until approved real builds. No workflow referencing nonexistent files created. Full-SHA pins, ubuntu-latest, no fixes/device builds/continue-on-error required. |
| Release | [Draft notes](../releases/v0.1.0.md), [conditional tag/demo instructions](checkpoint-2-release.md) | Partial preparation; release blocked. No runnable demo/tag/release; passing implementation, human review/merge and explicit release authorization required. |

## One grouped human input request

Review the concrete design diff and original questionnaire mapping; record decisions in [open issues](../requirements/OPEN-ISSUES.md#open):
- OI-2: accept/change proposed MySQL/local tests and Aiven free-plan development hosting.
- OI-8: approve nonpaid account meaning, real sign-in with fictitious active member fixtures and feed/profile shells as this slice's boundary. Owner already requires fictitious development/demo data.
- OI-9: approve session/throttle values and JDK/Node/package versions after dependency checks.
- OI-10: settle exact numeric wire grammar, resource limits and retry-validation precedence without changing the accepted value domain.
- OI-11: accept deferring access-audit policy only for fictitious work; resolve before real deployment.
- OI-12: name key/hosting operators and review key recovery and HTTPS/proxy/logging protection before a hosted demonstration.
- Supply UC owners/issues, dated independent poker/agreed estimates, UC-tagged Project Pulse actual hours by person since each estimate and genuine biggest-miss observations.

Client/team OI-4–OI-7 remain open for collection, retention, explanation and sensitive selections. No clinical response, duration or client approval is invented.

## Review handoff

The [design command](../../.claude/commands/design.md#phase-4-record-the-design-and-open-the-gate) requires a questions test and teammate merge; the [team contract](../team-contract.md#5-git-workflow-and-review) requires two nonowner approvals. PR #39 has one observed approval; later label/stack merges do not approve this corrected proposal.

Newly fetched `origin/integrate-health-assessment` at 58c3602 contains backend plus React/Ionic React drafts. PR #44 merged into that integration branch, not main, with only a bot comment observed as its review. Its design still names blockers. Preserve it; do not treat it as approved Ionic Vue implementation.

The [design PR body](assessment-design-pr.md) records scope, dispositions and files outside the impact list. Connector reads/native branch pushes work, but prior issue/PR creation returned 403; report the actual new attempt separately.

Open [PR #45](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/45) proposes a backend-only workflow referencing absent builds and different analyzers. It is preserved; the [checking plan](assessment-checks-and-ci.md#existing-remote-workflow-proposal) records the mismatches. No UC-specific issue or activity reports were found in the repository GitHub issue inventory (the only non-PR issue is architecture #30); releases remain empty.

## Course evidence

- [Checkpoint 2](https://washingtonwei.github.io/cosc-40943/project/#checkpoint-2-checklist)
- [Settings and parallel workflow](https://washingtonwei.github.io/cosc-40943/agent-setup/#10-your-team-repository)
- [Estimate definitions](https://washingtonwei.github.io/cosc-40943/modules/implementation/#42-where-the-hours-go-now)

## Working this document with your agent

Use observed evidence. Preserve design review/merge, dependency review, fresh implementation context, trunk explanation, teammate review and explicit release authorization. Documents and proposed commands are not a running feature.
