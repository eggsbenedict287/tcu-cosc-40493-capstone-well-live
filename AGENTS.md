# AGENTS.md

Instructions for coding agents working in the Well Live repository. This file says **where** the project's rules live; it does not repeat them. When a rule matters, open the file that owns it and follow that file.

## Project

Well Live is Team 07's capstone project (TCU COSC 40493) for client Sarah Becan. For what the product is and why it exists, read [vision and scope](docs/requirements/vision-and-scope.md). For the client's own framing, see the [pitch summary](docs/pitches/well-live-pitch-summary.md).

The project is in the requirements and architecture phase. There is no application code yet.

## Repository map

| Path | What it holds |
|---|---|
| [`docs/requirements/`](docs/requirements/) | The requirements documents: vision and scope, use cases, the specification, business rules, glossary, and open issues |
| [`docs/design/`](docs/design/) | The architecture-of-record |
| [`docs/traceability.md`](docs/traceability.md) | The links between features, use cases, business rules, and (later) design, code, and tests |
| [`docs/guides/`](docs/guides/) | Client meeting summaries and interview guides; evidence, not requirements |
| [`docs/pitches/`](docs/pitches/), [`docs/napkins/`](docs/napkins/) | Client source material |
| [`docs/team-contract.md`](docs/team-contract.md) | How the team works: meetings, decisions, git workflow, AI use |
| [`prototypes/`](prototypes/) | Static design mockups; see each prototype's README for how to view it |

## Where the rules live

| Need | Source of truth |
|---|---|
| What a term means, and which word to use | [Project glossary](docs/requirements/project-glossary.md) |
| Business policy the system must follow (`BR-*`) | [Business rules](docs/requirements/business-rules.md) |
| What the system must do (`UC-*`) | [Use cases](docs/requirements/use-cases.md) |
| Functional, interface, data, and quality requirements (`FR-*`, `SEC-*`, `CO-*`, …) | [Software requirements specification](docs/requirements/software-requirements-specification.md) |
| Objectives, features, scope (`BO-*`, `FEAT-*`, …) | [Vision and scope](docs/requirements/vision-and-scope.md) |
| System shape and key decisions (`KD-*`, `QS-*`, …) | [Architectural design](docs/design/architectural-design.md) |
| Unanswered questions (`OI-*`) | [Open issues](docs/requirements/OPEN-ISSUES.md) |
| Identifier formats | The "Identifiers" section at the top of the document that owns each space |
| Branching, pull requests, review | [Team contract §5](docs/team-contract.md#5-git-workflow-and-review) |
| Responsibility for agent output | [Team contract §6](docs/team-contract.md#6-working-with-ai) |

Several documents end with a **"Working this document with your agent"** section. Read it before doing any work on that document.

## How to work here

- **Do not edit Markdown or text documents unless the user explicitly asks you to edit that document.** This covers everything in `docs/` and the READMEs. If you notice something that should change, report it and let the user decide.
- **Cite, do not restate.** Refer to requirements, rules, and terms by their identifier or glossary term and link to the owning document. Never copy their text into another file.
- **Never invent an identifier.** Before citing any `BO-`, `FEAT-`, `UC-`, `BR-`, `FR-`, `KD-`, or other identifier, confirm it is defined in its owning document. If it is not, say so instead of citing it.
- **Use the glossary's words.** Names in code, documents, and messages follow the glossary. Do not coin synonyms; if a concept has no term, raise it with the user.
- **Do not fill gaps with guesses.** When the documents do not answer a question, list the question for the user rather than assuming. Open questions belong in [open issues](docs/requirements/OPEN-ISSUES.md), added by a team member.
- **Do not commit or push** unless the user asks. When asked, follow the workflow in the team contract.
- **Never put secrets in the repository.** The architectural design says where they live.
- **No dependency is added until a person confirms it exists and is the one we meant.** Record the package, source, version and human check in the issue or PR before installation.
- **Never remove a `Co-Authored-By` trailer from a commit.** Preserve existing attribution; new agent-assisted commits identify the assisting agent.

## Parallel-agent workflow

For parallel implementation, follow the [course workflow](https://washingtonwei.github.io/cosc-40943/agent-setup/#10-your-team-repository):

- One agent per sub-issue, each in its own worktree and branch and ending in its own pull request.
- Fan out only after the shared code the leaves depend on is merged.
- Never split one use case's layers across agents.
- No more agents running than pull requests you will review that day.

Read-only research and fresh-context review may be delegated without parallel file edits. Follow the [design](.claude/commands/design.md) and [implementation](.claude/commands/implement.md) human stops.

## Agent settings and secrets

[Claude project settings](.claude/settings.json) deny reads of environment files, secret directories and private-key files. Planned local secret mounts belong under `backend/secrets/` (ignored); deployment secrets remain in the server environment or hosting secret store under [architecture section 8](docs/design/architectural-design.md#8-crosscutting-concepts). Inventory paths only; never inspect secret contents to locate them.

These are Claude Code rules, not Codex settings or an operating-system lock. Codex separately uses its filesystem sandbox and approval checks. Keep both enabled. After changing secret paths, update the deny patterns and verify refusal in Claude with a harmless sentinel, never real credentials. Settings and branch protection require human review; two nonowner approvals remain required by [the team contract](docs/team-contract.md#5-git-workflow-and-review).

## Technology stack

| Layer | Technology | Decision |
|---|---|---|
| Frontend client | Ionic with Vue | `KD-frontend-framework` and `KD-vue-client` in [architectural design §9](docs/design/architectural-design.md#9-architecture-decisions) |
| Backend API | Spring Boot | `KD-spring-boot` in [architectural design §9](docs/design/architectural-design.md#9-architecture-decisions) |

## Coding conventions

_To be written. Until then there are no conventions to follow; do not adopt a framework or style beyond the technology stack above on your own._

The selected checking tools are Prettier, Vue/TypeScript ESLint and vue-tsc for the frontend; Spotless/google-java-format, Checkstyle and Java compilation for the backend. See the [checking plan](docs/planning/assessment-checks-and-ci.md) before adding their build configuration. They have not run: manifests and application code are not present yet. Preserve the design/trunk gates; report findings without automatic source repair.

## Build and test

No build or test commands exist yet. The prototypes are static HTML and open directly in a browser.

## To do

Known gaps in the repository, last surveyed 2026-10-25. These are for the team to work through; an agent does not start on one unless asked, and the document-editing rule above still applies. Remove an item when it is done.

**Every requirements and design document**
- [ ] The `Version` line still carries `<!-- TODO: change version number -->` in vision and scope, use cases, the specification, business rules, the glossary, open issues, and the architectural design.

**[Architectural design](docs/design/architectural-design.md)** (due dates are in each section's header)
- [ ] Revision history row has no date or author.
- [ ] §3 Context and Scope, §4 Solution Strategy, §5.1 Containers, and §5.2 Use case areas still hold the template's cafeteria example instead of Well Live content (due Checkpoint 1).
- [ ] §8.1 Security is unwritten (named at Checkpoint 1, detailed at Checkpoint 2).
- [ ] §9.1 still holds the example row, and §9.2 still holds the example `KD-deployment-shape` instead of the team's decision (due Checkpoint 1).
- [ ] The technology stack has no `KD-*` decision yet; §2 defers it to §9. This also blocks the Coding conventions section above.
- [ ] §10.1 and §12 are missing their one-line links to the specification and the glossary.
- [ ] §6 Runtime View (Checkpoint 2), §7 Deployment View (Checkpoint 3), §10.2 Quality scenarios (Checkpoint 2), and §11 Risks and Technical Debt (Checkpoint 2) are not due yet and still hold template text.

**[Software requirements specification](docs/requirements/software-requirements-specification.md)**
- [ ] §4 Vision and Scope has no link to vision and scope.
- [ ] §7.2 Data dictionary leaves several length and uniqueness limits TBD.
- [ ] §7.3 Reports must be reviewed with the client before implementation.
- [ ] §7.4 Retention periods are TBD pending client approval.
- [ ] §8.4 No API document exists yet.

**[Use cases](docs/requirements/use-cases.md)**
- [ ] Several input-field length limits are TBD, matching the specification's data dictionary.
- [ ] The revision history records the use cases as not yet reviewed with the client.

**[Vision and scope](docs/requirements/vision-and-scope.md)**
- [ ] §3.1 The content contributor stakeholder is unconfirmed.
- [ ] §4.4 lists the deployment decisions still open.

**[Business rules](docs/requirements/business-rules.md)**
- [ ] Revision history row still has placeholder date and author.

**[Open issues](docs/requirements/OPEN-ISSUES.md)**
- [ ] `OI-1` is still the template's instruction text, not a real question.
- [ ] `OI-2` and `OI-3` are still wrapped in template italics and brackets.
- [ ] The Resolved table still holds the example row `OI-0`.

**[Traceability matrix](docs/traceability.md)**
- [ ] Not started: the header is the template's placeholders, and both tables hold the Project Pulse example rows rather than Well Live's features, areas, and rules.

**[Team contract](docs/team-contract.md)**
- [ ] The `Signed` date in the header is still `<date>`.
- [ ] §5 ends mid-sentence at "Blocking a merge:", so the merge-blocking criteria are missing.
- [ ] §5 and §6 refer to `AGENTS.md` without a link to [it](AGENTS.md).

**[Client interview guide](docs/guides/client-interview-guide.md)**
- [ ] The header is still the template's placeholders, and no per-meeting copy has been saved in `docs/requirements/` as the guide describes.

**This file**
- [ ] Write Coding conventions and Build and test once the stack is decided.
