# Corrected Assessment Design PR Handoff

**Branch:** `design/assessment-checkpoint-2` → `main`.
**Title:** Correct assessment design and Checkpoint 2 checking plan
**State:** Ready for draft PR creation; no PR number or approval claimed. Creation result will be recorded below.
**Compare:** https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/compare/main...design/assessment-checkpoint-2?expand=1

No repository PR template exists on inspected main; the body uses the course headings. Select Create draft pull request; preserve two nonowner approvals and human merge. The earlier preparation-only PR handoff is superseded by this combined design handoff.

+## Traces to

[UC-ACC-complete-assessment](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [ACC](../design/acc.md), and Checkpoint 2 preparation. This is a proposed corrected design; implementation remains stopped.

## What changed

The prior draft omitted source items/contracts and conflicted with supplied response/confirmation decisions. The proposal now maps 110 items/eight prompts, aligns UC/SRS, defines concrete Ionic Vue/Spring Boot paths, APIs/security/atomic retry behavior, diagrams and 37 test rows.
Architecture records stack/tool selections and MySQL as proposed; checking/CI planning includes the Project Pulse comparison. Independent preparation includes deny/attribution/dependency rules, honest traceability, estimates/calibration placeholders and gated release notes.

```diff
- placeholder questionnaire/paths; incomplete retry and identity boundaries
+ complete version-1 mapping; owner-bound atomic save and immutable uncertain attempt
+ account-safe draft lifecycle; explicit unresolved decisions and planned test oracles
```

## How it was verified

**Before:** main eea456b has no app manifests and only the earlier blocker draft. PR #39 has one observed approval; #44 merged into a separate React/Ionic React integration branch with no approving human review observed.
**After:** fresh isolated read-only questions test completed with 28 findings/dispositions; Word-derived mapping and documentation checks are recorded in the review/checklist. No product behavior is verified.
**Not verified:** human questionnaire comparison, all 37 product test rows, every selected analyzer/build, Claude runtime deny refusal, real UI/API/MySQL demo, estimates/actuals, hosted setup. No workflow created around missing manifests.

Documentation validation passed: 110 item/eight prompt labels matched the extracted Word paragraphs; 37 unique test rows; 310 then-current local links/anchors; 13 settings deny rules (five Read rules); six planned secret/worktree paths ignored; git diff --check. Editor reported no diagnostics. These are document/settings checks, not application static-analysis results. Existing [PR #45](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/45) references absent backend builds and different analyzers; preserved and flagged in the checking plan.

<details>
<summary>Questions test</summary>

Fresh reviewer had only ACC, bounded completion UC, its five exact BR definitions and architecture §8; no drafting history or Word source. It preserved source isolation and made no writes. It did not certify Word fidelity. The preliminary 18-finding run was qualified by neighboring-BR exposure and is fully retained in [the report](assessment-review-dispositions.md); this isolated run supersedes it. Documentation fixes below followed review and have not had a second independent review. Unresolved requirement-risk decisions remain blockers.

| # | Guess / proposed choice | Wrong guess risk | Disposition |
|---|---|---|---|
| 1 | Design authorization: Human merge after two nonowner approvals | Yes | Open gate; no implementation. Existing merges do not approve the corrected diff. |
| 2 | Database/hosting OI-2: Approve MySQL/local tests/Aiven arrangement | Yes | Open gate; no engine substituted or service provisioned. |
| 3 | Member/demo/shell scope OI-8: Real database-backed fictitious accounts; limited navigation shells | Yes | Open gate, including eligibility/bootstrap responsibility and shell boundary. |
| 4 | Runtime/session/throttle OI-9: Required reviewed values, no insecure defaults | Yes | Open gate; counting/reset semantics and runtime/package versions must be recorded. |
| 5 | Dependencies: Human-check exact package/source/version before installation | Yes | Open gate; none installed. Tool selection alone does not approve every dependency. |
| 6 | Numeric interpretation OI-10: Exact decimal strings/exponents and normalized precision | Yes | Open gate; exact grammar/examples/blank-unit handling and precedence need approval. |
| 7 | Shared auth/encryption: Standard Spring facilities and AES-GCM envelope | Yes | Proposals remain subject to teammate design review; no custom/embedded key fallback. |
| 8 | Questionnaire mapping: Immutable version 1 source comparison | Yes | Parent extracted Word mapping; human comparison still required. Isolated reviewer cannot certify Word fidelity. |
| 9 | Demonstration notice: Fictitious-only explicit explanation | Yes | Concrete proposed copy added to ACC Overview for review before demonstration. No real consent asserted. |
| 10 | Real collection OI-4–OI-7: No invented collection/retention/clinical response | Yes | Blocked before real collection/deployment; owner already requires fictitious development/demo. |
| 11 | Access audit OI-11: No answer-bearing payload; explicit policy decision | Yes | Open policy gate; team must accept fictitious-only deferral, client/team decide real deployment. |
| 12 | Implementation/release stops: Fresh context, separate schema/security, trunk explanation, human merge/release permission | Yes | Preserved in ACC ordering; no implementation/tag/release. |
| 13 | FORM_CHANGED diagram: Explicit reload; only authentication enters sign-in | Yes | Fixed second sequence diagram, separate version/authentication branches; T06/T33. |
| 14 | Decimal resource bounds: Exact safe parser and transport limits | Yes | Included in OI-10; unresolved, never a hidden health magnitude cap. |
| 15 | Numeric lexical examples: Shared grammar/sign/point/whitespace/exponent and age rules | Yes | OI-10 remains blocking; normalization proposal is not accepted parser policy. |
| 16 | Cached pages/delayed work: Destroy references and invalidate requests on leave/account change | Yes | Added Ionic/cache/back-restore cleanup, generation/context checks and T33; no browser/session/router storage. |
| 17 | CSRF after sign-in: Return fresh token after rotating authenticated session | Yes | Added sign-in response csrfToken, consistent X-CSRF-TOKEN contract; T28. |
| 18 | Unauthorized-account UI: Separate 401, CSRF 403, role/status 403 | Yes | Added AUTHENTICATION_REQUIRED/CSRF_REJECTED/ACCESS_DENIED branches; no automatic sign-in/submission loop; T33. |
| 19 | Security-handler errors: Same safe JSON at real filter chain | Yes | Added explicit entry-point/access-denied/CSRF/throttle binding; T26/T28. |
| 20 | Key lifecycle: Provision/rotate/retain decrypt keys and protected recovery | Yes | Added OI-12, gate before hosted demo; missing key identifier fails closed. |
| 21 | Current member on every path: Serialize current-status check with disabling | Yes | Added member lock/status check to form/validation/read as well as save; T37 expanded. |
| 22 | Response-loss classification: Only confirmed rollback reports SAVE_UNAVAILABLE; otherwise unknown original attempt | Yes | API/sequence/state contracts and T08/T09/T36 distinguish failures; no generic rollback promise. |
| 23 | Transport/infrastructure: Review actual HTTPS/proxy/session/logging settings | Yes | Architecture boundary and OI-12 gate; T26/T28/T34 remain planned, no operational claim. |
| 24 | Opaque memberContext method: Server-derived stable opaque memory binding only | No for method | Local implementation choice; never owner authority, request field or exposed identity. Account-switch contract is mandatory. |
| 25 | DTO serialization: Allowlisted consistent version/schema/examples | No for private layout | Local details retained; section IDs, formVersion, validation/CSRF/success examples fixed. All-skipped/stale fields have tests. |
| 26 | Envelope/migration representation: Lossless engine types, unique member, UTC microseconds, unambiguous authenticated binding | No for encoding | Local choice constrained by T21–T25; truncation/security/precision changes require design correction. |
| 27 | UI organization: Accessible source-order optional controls and explicit summary/confirmation | No for presentation | Local choice; preserve wording/order/response distinctions and no implicit submission. |
| 28 | Private code/test organization: Planned responsibilities and T01–T37 oracles | No for private names | Local choice; implementation must map every row to named observed tests. No tests exist yet. |

</details>

## Reviewer focus

Resolve OI-2/OI-8–OI-11 and exact dependency/runtime decisions; review source mapping, shared security/encryption and the proposed notice. OI-12 gates hosted demonstration; OI-4–OI-7 and privacy/audit policy gate real collection.
Require two nonowner approvals and human merge, then a fresh implementation session. Preserve schema/security commits, trunk explanation before leaves, teammate review and explicit release permission; do not treat an older merge as approval of this proposal.

**Files outside the behavioral impact list:** AGENTS.md, .claude/settings.json and .gitignore prepare shared course guardrails; docs/planning/* and docs/releases/v0.1.0.md prepare checklist/review, proposed estimates, issue/PR handoff and conditional release commands. They implement no product behavior. Existing main calibration/transcription and remote code are preserved; this branch includes earlier independent preparation rather than overwriting it.

**Merge danger:** reversible documentation/settings changes with project-wide instruction impact; runtime Claude refusal and policy proposals still need humans. No code, dependency install, workflow, credentials, real answers, service, tag or release is added. Existing attribution is preserved.
