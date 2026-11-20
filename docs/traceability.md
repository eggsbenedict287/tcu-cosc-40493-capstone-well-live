# Traceability Matrix

**Project:** Well Live
**Team:** Team 7
**Version:** 0.1
**Last checked:** 2026-11-20, Angelette Munoz

---

_**How to use this template.** Instructions appear in italic square brackets. Fill in underneath them and leave them in place until the document is stable._

_**What this file is.** The map of your project, from the reason something exists to the thing that does it. Every other document owns its own contents; this one owns the **links between them**, so nobody has to restate anything to find out what connects to what._

_**Why it exists before any code does.** The question it answers in week 4 is "did we specify everything we promised, and nothing we did not?" The question it answers in week 12 is "this broke, what was it supposed to do, and who asked for it?" Those are the same question, and the file that answers the second one is the file you started in week 4. Starting it later means reconstructing links from memory, which is the same work done worse._

_**It grows.** Week 4 fills in two tables. Week 8 adds the columns for design, code, and tests once those exist, and the tables below leave room for them. Do not add empty columns now._

_**Run the checks by hand this week.** Each table below ends with two checks. They are cheap, and they fail loudly. Hand the whole file to your agent and ask it to run them, then verify what it tells you, because a check reported as passing by the thing that also wrote the table is not evidence._

---

## 1. Feature to use case area

_[Your vision and scope lists product **features** (`FEAT-<slug>`), each a capability a stakeholder can see. Your use case file groups behavior into **use case areas** (`UC-<AREA>-*`). This table connects them, and it is where **business objectives attach**: the objective hangs on the feature, and every use case underneath inherits it. That is why the objective is named here once, rather than repeated on forty use cases._

_Features and areas are deliberately many-to-many. A feature that lands on exactly one area is probably too narrow, and a feature that reads "create, edit, and delete X" is a list of use cases wearing a feature's clothes._

| Feature | Business objectives | Use case areas |
|---|---|---|
| `FEAT-account-profile` | `BO-intake-completion`, `BO-retention-rate` | `ACC ` |
| `FEAT-personalized-content` | `BO-health-literacy`, `BO-content-credibility` | `CON` |
| `FEAT-community-discussions` | `BO-peer-engagement`, `BO-retention-rate` | `CON` |
| `FEAT-content-moderation` | `BO-content-credibility`, `BO-peer-engagement` | `CON` |
| `FEAT-subscriptions` | `BO-retention-rate` | `ACC` |
| `FEAT-administration` | (enabling, serves no objective directly) | `ACC`. `CON` |

_[An enabling feature that serves no measurable objective on its own says so, as the second row does. That is different from forgetting to fill the column in.]_

**Checks.**

1. **Every feature has at least one area.** A feature with none means your vision promises something nobody has specified.
2. **Every area is reached by a feature.** An area no feature points at means you have use cases no stakeholder asked for.

---

## 2. Business rule to what enforces it

_[A business rule is a property of your client's business, so it has no implementation of its own. What it has is a set of requirements that enforce it, and this table is how you find them. Rules are **cited, never restated**: the rule's text lives in `business-rules.md` and nowhere else, and this table holds only the identifier and the links._

_The **Source** column is duplicated here from `business-rules.md` on purpose, and it is the one exception in this file. It is the column reviewers and clients actually read, and a rule whose source is one click away is a rule nobody checks._


| Business rule | Source | Enforced by |
|---|---|---|
| `BR-non-diagnostic` | `napkin.md` | `UC-CON-browse-feed`, `UC-CON-read-content` |
| `BR-no-clinical-services` | `business-rules.md` | `OPEN-ISSUES.md`|
| `BR-content-review	Technical assessment` | `napkin.md` | `UC-CON-browse-feed`, `UC-CON-read-content` |
| `BR-five-pillars` | `napkin.md` | `UC-ACC-complete-assessment`, `UC-CON-browse-feed`, `UC-CON-read-content` |
| `BR-ad-free` | `vision-and-scope.md §2.1` `Business Opportunity Statement — Candidate` |	`UC-CON-browse-feed`, `UC-CON-read-content` |
| `BR-subscription-model`| `napkin.md` | `UC-ACC-create-account, UC-ACC-sign-in` |
| `BR-account-required`| `well-live-pitch-summary.md` | `UC-ACC-create-account, UC-ACC-sign-in, UC-CON-browse-feed, UC-CON-read-content` |
| `BR-health-data-protection`| `napkin.md, vision-and-scope.md` | `UC-ACC-create-account, UC-ACC-sign-in, UC-ACC-complete-assessment` |
| `BR-no-mandatory-health-disclosure`| `well-live-pitch-summary.md` | `UC-ACC-complete-assessment` |
| `BR-pseudonymous-option`| `vision-and-scope.md` | `UC-ACC-set-display-identity` |
| `BR-not-medical-device` | `napkin.md` | `UC-CON-browse-feed, UC-CON-read-content` |

**1st row is missing steps

**Checks.**

1. **Every rule is enforced by something.** A rule with an empty third column is a policy your software ignores. That may be the right answer, and it is only the right answer if you decided it on purpose. Write the decision in `OPEN-ISSUES.md` rather than leaving the cell blank.
2. **Every requirement that cites a rule cites one that exists.** Search your use cases and specification for every `BR-` identifier and confirm each one is defined in `business-rules.md`. This is the check that catches a draft citing `BR-late-penalty` because a late penalty is the kind of thing a course usually has. A generated document cites plausible identifiers with complete confidence, and nothing else in your process will notice.

---

## 3. From here (week 8)

_[Leave this section as it is until week 8. It says what the two tables above grow into, so that nobody restructures the file in the meantime._

_In week 8 the spine extends past the use case: **business objective → feature → use case area → use case → design → code → test.** A third table arrives with one row per use case and columns for the design element, the source files, and the tests, tracked as two separate states, built and verified, so that a use case which is built but untested stays visibly unverified rather than being absorbed into a single "done".]_

| Use Case | Design | Code | Build | Main-flow test | Extension Tests | Verify |
|---|---|---|---|---|---|---|
| UC-ACC-complete-assessment | [ACC — Account, Profile, and Assessment](docs/design/architectural-design.md#52-use-case-areas-and-components) | `frontend-ionic/src/pages/Home.tsx` |✅ Built| `frontend-ionic/src/pages/Home.test.tsx` | `[profile and saved answers are accessible from the named sidebar]frontend-ionic/src/pages/Home.test.tsx#188` |✅ Verified|
| UC-ACC-create-account | [ACC — Account, Profile, and Assessment](docs/design/architectural-design.md#52-use-case-areas-and-components) | `frontend-ionic/src/components/AuthPanel.tsx` |✅ Built| `frontend-ionic/src/components/AuthPanel.test.tsx` | `[names and agreement selections reset when leaving registration]frontend-ionic/src/components/AuthPanel.test.tsx#25` |✅ Verified|
| UC-ACC-sign-in | [ACC — Account, Profile, and Assessment](docs/design/architectural-design.md#52-use-case-areas-and-components) | `frontend-ionic/src/components/AuthPanel.tsx` |✅ Built| `frontend-ionic/src/components/AuthPanel.test.tsx` |`[Email or password is incorrect]frontend-ionic/src/components/AuthPanel.test.tsx#60`|✅ Verified|
| UC-CON-browse-feed | [CON — Educational Content](docs/design/architectural-design.md#52-use-case-areas-and-components) |🟡 Not built|🟡 Not built| | |🟡 Partial(Not Verified)|
| UC-CON-read-content | [CON — Educational Content](docs/design/architectural-design.md#52-use-case-areas-and-components) | `frontend-ionic/src/components/ArticleLibrary.tsx` |✅ Built| `frontend-ionic/src/components/ArticleLibrary.test.tsx` | `[skipped assessments show general resources instead if a diagnostic claim]frontend-ionic/src/components/ArticleLibrary.test.tsx#20` |✅ Verified|
| UC-ACC-set-display-identity | [ACC — Account, Profile, and Assessment](docs/design/architectural-design.md#52-use-case-areas-and-components) |🟡 Not built|🟡 Not built| | |🟡 Partial(Not Verified)|

docs/design/architectural-design.md
## Working this document with your agent

_[Delegate: running both checks and reporting what fails; finding every `BR-`, `FEAT-`, and `UC-` identifier cited anywhere in `docs/` and listing the ones with no definition; regenerating the second table from the Business Rules fields of your use cases after you have edited them._

_Keep human: whether an area with no feature is a missing feature or a use case that should not exist, and whether an unenforced rule is an oversight or a decision. Both are questions about your client's business, and the answer is not in your repository._

_**The specific failure to watch for:** an agent asked to "fill in the traceability matrix" produces a complete, well-formed table in which every cell is populated and some of the links are invented. A blank cell is information. A confidently wrong link is worse than no link, because it makes the check pass. Verify every row you did not write yourself by opening the document at the other end.]_
