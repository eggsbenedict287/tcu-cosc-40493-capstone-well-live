# Assessment Questions Test and Dispositions

**Date/baseline:** 2026-11-06; corrected proposal against main `eea456b`.
**Result:** Not implementation-ready. Complete numbered review captured; unresolved human gates are not passing answers.

## Fresh review evidence

A new read-only reviewer with no drafting history consumed only full [ACC](../design/acc.md), the bounded [completion UC](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), [architecture §8](../design/architectural-design.md#8-crosscutting-concepts) and exactly its five cited [BR bullet definitions](../requirements/business-rules.md). No links were followed; no Word/glossary/open-issue/checklist/context read. The reviewer reported source isolation and made no writes. It counted 110 primary items/eight prompts internally; it did not verify Word fidelity.

The review is a read-only questions test, not teammate approval or a product test. Dispositions below include subsequent documentation corrections; these corrections have not received a second independent review. Findings that require team/client decisions remain blocking. No application analyzers/builds/tests ran.

## Complete isolated review: 28 findings

| # | Remaining guess / proposed choice | Wrong guess could violate a requirement? | Disposition |
|---|---|---|---|
| 1 | **Design authorization.** Human merge after two nonowner approvals | Yes | Open gate; no implementation. Existing merges do not approve the corrected diff. |
| 2 | **Database/hosting OI-2.** Approve MySQL/local tests/Aiven arrangement | Yes | Open gate; no engine substituted or service provisioned. |
| 3 | **Member/demo/shell scope OI-8.** Real database-backed fictitious accounts; limited navigation shells | Yes | Open gate, including eligibility/bootstrap responsibility and shell boundary. |
| 4 | **Runtime/session/throttle OI-9.** Required reviewed values, no insecure defaults | Yes | Open gate; counting/reset semantics and runtime/package versions must be recorded. |
| 5 | **Dependencies.** Human-check exact package/source/version before installation | Yes | Open gate; none installed. Tool selection alone does not approve every dependency. |
| 6 | **Numeric interpretation OI-10.** Exact decimal strings/exponents and normalized precision | Yes | Open gate; exact grammar/examples/blank-unit handling and precedence need approval. |
| 7 | **Shared auth/encryption.** Standard Spring facilities and AES-GCM envelope | Yes | Proposals remain subject to teammate design review; no custom/embedded key fallback. |
| 8 | **Questionnaire mapping.** Immutable version 1 source comparison | Yes | Parent extracted Word mapping; human comparison still required. Isolated reviewer cannot certify Word fidelity. |
| 9 | **Demonstration notice.** Fictitious-only explicit explanation | Yes | Concrete proposed copy added to ACC Overview for review before demonstration. No real consent asserted. |
| 10 | **Real collection OI-4–OI-7.** No invented collection/retention/clinical response | Yes | Blocked before real collection/deployment; owner already requires fictitious development/demo. |
| 11 | **Access audit OI-11.** No answer-bearing payload; explicit policy decision | Yes | Open policy gate; team must accept fictitious-only deferral, client/team decide real deployment. |
| 12 | **Implementation/release stops.** Fresh context, separate schema/security, trunk explanation, human merge/release permission | Yes | Preserved in ACC ordering; no implementation/tag/release. |
| 13 | **FORM_CHANGED diagram.** Explicit reload; only authentication enters sign-in | Yes | Fixed second sequence diagram, separate version/authentication branches; T06/T33. |
| 14 | **Decimal resource bounds.** Exact safe parser and transport limits | Yes | Included in OI-10; unresolved, never a hidden health magnitude cap. |
| 15 | **Numeric lexical examples.** Shared grammar/sign/point/whitespace/exponent and age rules | Yes | OI-10 remains blocking; normalization proposal is not accepted parser policy. |
| 16 | **Cached pages/delayed work.** Destroy references and invalidate requests on leave/account change | Yes | Added Ionic/cache/back-restore cleanup, generation/context checks and T33; no browser/session/router storage. |
| 17 | **CSRF after sign-in.** Return fresh token after rotating authenticated session | Yes | Added sign-in response csrfToken, consistent X-CSRF-TOKEN contract; T28. |
| 18 | **Unauthorized-account UI.** Separate 401, CSRF 403, role/status 403 | Yes | Added AUTHENTICATION_REQUIRED/CSRF_REJECTED/ACCESS_DENIED branches; no automatic sign-in/submission loop; T33. |
| 19 | **Security-handler errors.** Same safe JSON at real filter chain | Yes | Added explicit entry-point/access-denied/CSRF/throttle binding; T26/T28. |
| 20 | **Key lifecycle.** Provision/rotate/retain decrypt keys and protected recovery | Yes | Added OI-12, gate before hosted demo; missing key identifier fails closed. |
| 21 | **Current member on every path.** Serialize current-status check with disabling | Yes | Added member lock/status check to form/validation/read as well as save; T37 expanded. |
| 22 | **Response-loss classification.** Only confirmed rollback reports SAVE_UNAVAILABLE; otherwise unknown original attempt | Yes | API/sequence/state contracts and T08/T09/T36 distinguish failures; no generic rollback promise. |
| 23 | **Transport/infrastructure.** Review actual HTTPS/proxy/session/logging settings | Yes | Architecture boundary and OI-12 gate; T26/T28/T34 remain planned, no operational claim. |
| 24 | **Opaque memberContext method.** Server-derived stable opaque memory binding only | No for method | Local implementation choice; never owner authority, request field or exposed identity. Account-switch contract is mandatory. |
| 25 | **DTO serialization.** Allowlisted consistent version/schema/examples | No for private layout | Local details retained; section IDs, formVersion, validation/CSRF/success examples fixed. All-skipped/stale fields have tests. |
| 26 | **Envelope/migration representation.** Lossless engine types, unique member, UTC microseconds, unambiguous authenticated binding | No for encoding | Local choice constrained by T21–T25; truncation/security/precision changes require design correction. |
| 27 | **UI organization.** Accessible source-order optional controls and explicit summary/confirmation | No for presentation | Local choice; preserve wording/order/response distinctions and no implicit submission. |
| 28 | **Private code/test organization.** Planned responsibilities and T01–T37 oracles | No for private names | Local choice; implementation must map every row to named observed tests. No tests exist yet. |

## Preliminary review: 18 findings, qualification retained

An earlier fresh reviewer accidentally displayed neighboring BR definitions during extraction. It said findings relied on the permitted sources, but that run did not satisfy strict isolation; it was superseded by the isolated review above. Its full findings and dispositions are retained rather than represented as a passing run:

| # | Finding / proposed handling | Requirement risk | Disposition |
|---|---|---|---|
| P01 | MySQL/Aiven approval | Yes | OI-2 open; no silent engine choice. |
| P02 | Member/real fictitious-account sign-in | Yes | OI-8 open. |
| P03 | Runtime/security/dependency settings | Yes | OI-9 and package checks open. |
| P04 | Numeric grammar/resource limits | Yes | OI-10 open. |
| P05 | Fictitious scope versus review status | Yes | UC PRE-3 says owner-required; scope/notice proposals separately need teammate review. |
| P06 | Real collection/retention/use/sensitive selections | Yes | OI-4–OI-7 block real deployment. |
| P07 | Access audit/retention | Yes | OI-11 recorded. |
| P08 | Source mapping review | Yes | Full mapping supplied; human Word comparison still pending. |
| P09 | Reauthentication/account switching | Yes | Same-account in-place recovery, memberContext binding, clear on switch; T33. |
| P10 | Unknown COMMIT acknowledgment | Yes | SAVE_OUTCOME_UNKNOWN, original-attempt reconciliation; T09. |
| P11 | Mutable payload on unknown retry | Yes | Immutable snapshot at confirmation; disable edit until reconciled/leave; T36. |
| P12 | Concurrent member disabling | Yes | Current status under shared member lock; T37. |
| P13 | Stale follow-up strings versus shape rejection | Yes | Explicit structurally valid stale strings removed before content validation; malformed types/unknown fields still 400; T20/T29. |
| P14 | Take-later entry | Yes | Feed → /profile → deliberate /assessment action; T35; not full profile management. |
| P15 | General-feed shell acceptance | Yes | OI-8 scope gate; no content-UC completion claim. |
| P16 | Exact DTO/section/token field names | No for names | Seven IDs, formVersion and compact examples/CSRF contract recorded. |
| P17 | Cipher/envelope/private names | No for encoding, security binding mandatory | Diagram uses planned AssessmentAnswerProtector; lossless standard encoding and owner/version binding constrained by tests. |
| P18 | Layout/component/test organization | No for aesthetics/private structure | Local implementation choice within wording/order/optional/privacy constraints. |

The older baseline review's partial four-finding capture is superseded by these complete reports, not retroactively expanded into its unavailable 29-item reply.

## Human action

Review the concrete [design diff](assessment-design-pr.md), resolve implementation decisions OI-2/OI-8–OI-11 and dependencies, compare the source mapping, obtain two nonowner approvals, then have a human merge. OI-12 gates hosted demonstration; OI-4–OI-7 and audit/privacy decisions gate real deployment. Start implementation fresh after the merged approved design; preserve the trunk explanation stop and later teammate merge/release stops.
