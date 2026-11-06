# Assessment Draft Questions Test Dispositions

**Reviewed baseline:** main `3fdbe132a5d9a35bb3b794c95f51277d012ccafc`, current merged [ACC draft](../design/acc.md)
**State:** Not implementation-ready. This is a partial capture of the baseline review, not a passing questions test of a corrected design.

## Fresh-context review evidence

A separate read-only planning chat received only the complete [completion use case](../requirements/use-cases.md#uc-acc-complete-assessment-the-member-completes-the-health-and-wellness-assessment), its cited [business rules](../requirements/business-rules.md), [architecture section 8](../design/architectural-design.md#8-crosscutting-concepts), and the current ACC draft. It received no drafting conversation or questionnaire file. It completed a review identifying 29 implementation guesses and reported that the draft is not implementation-ready.

The available context-retrieval tool truncated its full reply. The following findings are the ones independently retrieved in full; they must not be represented as the entire 29-item review. A follow-up attempt to save the complete list encountered the child session's command/file-tool failure. The full final questions test must be captured after the corrected design is written, with one disposition per finding in its PR.

## Retrieved findings and dispositions

| Finding | Wrong guess could violate requirements? | Disposition at this stop |
|---|---|---|
| Actual questionnaire: questions, section order, choices, stable IDs and metadata are missing from the draft | Yes; an implementer would invent collection fields and source wording | Source questionnaire has now been read by the parent: 110 primary items and eight prompts across seven sections. Full source-to-ID mapping is proposed for the corrected ACC design after shape acceptance. Current design remains unresolved. |
| Response model: the draft's Concern / No concern / Skipped and basic information conflict with the UC's universal Other, sets of choices and Boolean screening | Yes; either implementation would contradict a supplied contract | The user's accepted application decisions settle intended behavior, but the UC and SRS still need the explicitly authorized alignment after the design-shape gate. No client approval is claimed. |
| Controlled topic catalog: an implementer would choose missing wellness-interest topics and map them to the five pillars | Yes; invented choices could change scope | Proposed correction removes the placeholder collection model in favor of the supplied questionnaire. Do not invent a topic catalog or personalization behavior for this slice. Await the corrected requirements diff. |
| Follow-up associations: prompt bindings and wording are absent apart from the partly described family section | Yes; changes what is requested and retained | Proposed mapping binds five physical prompts, one family section prompt, Have religion and Support groups. Owner must review these associations; optionality and stale-text removal are accepted application decisions. Mapping has not yet been written into ACC. |

## Other confirmed blockers and proposed handling

These are the parent's disposition tracker, not additional findings attributed to the truncated independent reply.

| Issue | Current handling |
|---|---|
| Personalization postcondition/message contradict the general-feed scope | Proposed UC/SRS correction; no personalization setting created or enabled. |
| Placeholder paths, stack, identity and encryption foundations are not implementable contracts | Ionic Vue and Spring Boot are supplied stack decisions; concrete paths/security/session/data design proposed to owner. MySQL/Aiven remains proposed pending confirmation. No product code exists. |
| Member/subscription definition conflicts with the payment-free proving slice | Team question [OI-8](../requirements/OPEN-ISSUES.md#open); real database-backed demo sign-in proposed, never mock identity. |
| Real collection scope, retention, use explanation and sensitive-selection response | Explicit unresolved client questions [OI-4 through OI-7](../requirements/OPEN-ISSUES.md#open). Fictitious-data-only demonstration proposed; no clinical response or retention period invented. |
| Retry normalization, lost-response handling, concurrency and timestamp need precise contracts | Accepted team decisions are included in the proposed design shape; new extensions must be defined in the UC before the design cites them. |
| Final implementation tests are missing | Keep Build Not started / Verify None; corrected test list and concrete test paths must be approved, then implemented against real authentication/API/MySQL. |

## Human gate

[Design command Phase 2](../../.claude/commands/design.md#phase-2-draft-the-design-and-wait) requires acceptance of the proposed shape before writing the design. After that, write the concrete diff, run and fully capture a fresh questions test, and obtain two nonowner approvals and a human merge before a fresh implementation session. The previous merged draft does not resolve these blockers.
