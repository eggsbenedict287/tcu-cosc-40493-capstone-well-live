# Assessment Checking and Pull Request CI Plan

**State:** Design preparation only, 2026-11-06. No application manifests, checking configuration or workflow exist in this checkout. No selected analyzer, compiler, application test or build has run. This document does not make those checks pass.

## Selected tools and planned build configuration

The owner's selection is recorded as [KD-checking-tools](../design/architectural-design.md#93-checkpoint-2-stack-decisions). Configuration is created only after the corrected [ACC design](../design/acc.md) is reviewed/merged and the course implementation gates permit it. Package/runtime versions and additional test/tool dependencies still receive the [human package check](../../AGENTS.md#how-to-work-here).

| Part | Selected tool | Planned configuration | Read-only command contract after it exists |
|---|---|---|---|
| Frontend | Prettier | frontend/package.json; frontend/.prettierrc.json | npm run format:check → prettier --check src/ |
| Frontend | ESLint, Vue and TypeScript support | frontend/eslint.config.js with reviewed Vue/TypeScript parser/config packages | npm run lint:check → eslint src --max-warnings 0 |
| Frontend | vue-tsc | frontend/tsconfig.app.json; package script | npm run type-check → vue-tsc --noEmit -p tsconfig.app.json |
| Backend | Spotless with google-java-format | backend/pom.xml; pinned plugin and formatter versions | ./mvnw --batch-mode --no-transfer-progress spotless:check |
| Backend | Checkstyle | backend/pom.xml; backend/config/checkstyle/checkstyle.xml | ./mvnw --batch-mode --no-transfer-progress checkstyle:check |
| Backend | Java compilation | backend/pom.xml; reviewed JDK/compiler settings | ./mvnw --batch-mode --no-transfer-progress test-compile |

These are **proposed script contracts**, not commands runnable today. Maven verification will bind the selected checking goals plus real unit/integration tests; frontend scripts will include unit tests and a web build. Neither the read-only checking commands nor CI may invoke ESLint --fix, Prettier --write, spotless:apply or another source repair.

The core selected package identities are prettier, eslint, eslint-plugin-vue, vue-tsc and the TypeScript ESLint configuration/parser packages chosen with the actual Vue setup; backend com.diffplug.spotless:spotless-maven-plugin, google-java-format and org.apache.maven.plugins:maven-checkstyle-plugin. This list is not a statement that unselected transitive packages, versions or extra testing dependencies have been approved or installed.

## Findings report contract and current counts

For the first actual run, record revision, tool/version, command, exit code, scope and whether execution completed. Run each selected check independently so one failure does not hide another local diagnostic run. Capture findings without editing source. Execution/configuration failure is not zero findings.

| Analyzer | Grouping key | Current count | Evidence |
|---|---|---|---|
| Prettier | Formatting category / affected file (Prettier has no ESLint-style rule IDs) | Not available — not run | No frontend package/configuration |
| ESLint | ruleId and severity; parser failures separately | Not available — not run | No frontend package/configuration |
| vue-tsc | TS diagnostic code; configuration/launcher failures separately | Not available — not run | No frontend tsconfig/build |
| Spotless | Formatting category / affected Java file | Not available — not run | No backend POM |
| Checkstyle | XML error source/check name and severity | Not available — not run | No backend POM/configuration |
| Java compiler | Diagnostic code/category, separately from Maven resolution failures | Not available — not run | No backend POM/build |

After implementation, use ESLint's JSON formatter for aggregation, Checkstyle's XML report, and captured compiler/type-check/format output. Count exactly what each tool reports: affected files are not equivalent to rule occurrences. Include warnings and null-rule parser errors. Keep source unchanged after observing findings; triage/remediation is a separate human decision. Do not add suppressions, baselines or relaxed rules merely to get green. No counts from Project Pulse are Well Live measurements.

## Future workflow contract

Only create `.github/workflows/pull-request.yml` after the relevant real builds, lockfiles, wrappers, test configuration and commands exist and have been exercised. The workflow is not created by this design PR.

- Trigger pull_request targeting main; contents: read.
- Exactly two jobs, frontend and backend, each on ubuntu-latest. Independent job failures remain visible.
- Frontend uses a reviewed Node runtime and npm lockfile, npm ci, the three read-only checks, real unit-test script and a Vite web build. No Capacitor/device build.
- Backend uses a reviewed JDK and Maven wrapper, selected read-only checks, Java compilation and real unit/MySQL integration tests through verify. Database fixtures are fictitious; no Aiven/production credentials on pull requests.
- Pin **every action** to its verified full 40-character commit SHA; document tag/repository provenance. A version tag alone is insufficient. Refresh pins deliberately, not by guessing SHAs.
- No automatic fixes, no continue-on-error, no ignored exit codes or fallback success. Failure to install/run/configure a check fails its job. Report upload may use if: always() without changing job success.
- Cache keys use the real frontend lockfile and backend POM. Do not reference missing files, use pull_request_target for untrusted code, expose production secrets, provision paid services or deploy from this checking workflow.
- Validate startup and browser integration commands against the implemented app before claiming end-to-end CI coverage. The complete design's browser demonstration remains required even if initial PR jobs run unit/MySQL integration tests plus builds.

The two jobs keep feedback separate: frontend failures point to Vue/TypeScript/style or web build/tests; backend failures point to formatting/style/Java or API/database tests. Both are blocking under the selected contract. This is the intended workflow explanation, not evidence of an existing workflow or successful run.

### Existing remote workflow proposal

Inspection also found open [PR #45](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/pull/45) at 22ec147f, targeting main. It is separate teammate work and remains unchanged. Its body acknowledges backend/plugin configuration is absent; its proposed workflow runs Maven in missing backend/, has only a backend job, uses PMD/SpotBugs/FindSecBugs and omits Checkstyle. Those are concrete mismatches with this task's current two-part tool selection and prohibition on nonexistent builds. No commands or action pins in that PR were executed/validated here. Review/reconcile or supersede it only when actual approved builds exist; do not merge it as evidence this checking contract is satisfied.

## Project Pulse comparison

Inspected Project Pulse at immutable revision [a3986a57c726f37c13708ad9236ed5e4dbce1bc2](https://github.com/Washingtonwei/project-pulse/tree/a3986a57c726f37c13708ad9236ed5e4dbce1bc2), using its [Maven workflow](https://github.com/Washingtonwei/project-pulse/blob/a3986a57c726f37c13708ad9236ed5e4dbce1bc2/.github/workflows/maven-build.yml), [frontend package](https://github.com/Washingtonwei/project-pulse/blob/a3986a57c726f37c13708ad9236ed5e4dbce1bc2/frontend/package.json) and [backend POM](https://github.com/Washingtonwei/project-pulse/blob/a3986a57c726f37c13708ad9236ed5e4dbce1bc2/backend/pom.xml). This was a source inspection, not an analyzer run on Project Pulse.

| Aspect | Project Pulse at inspected revision | Well Live selection / current state |
|---|---|---|
| Frontend checks | ESLint lint:check, vue-tsc type-check, Prettier --check src/ | Same categories selected; no manifest/configuration or run yet |
| Repair commands | package scripts also expose lint --fix and prettier --write; workflow uses check variants | No repair in the requested checking run or PR workflow |
| Backend checks | Maven verify includes SpotBugs and PMD; excludes/baselines configured in POM | Spotless/google-java-format, Checkstyle and Java compilation selected; do not copy extra analyzers/baselines |
| PR jobs | build, frontend and dockerfile | Two planned jobs: frontend/backend; no device or Dockerfile job requested |
| Failure behavior | Frontend check steps use continue-on-error: true; backend verify is blocking | Both planned jobs block on findings/failures; no continue-on-error |
| Build/test commands | Backend mvn --batch-mode verify; workflow frontend steps run checks | Planned real backend verify and frontend unit tests/web build after manifests exist |
| Actions/runners | Full-SHA action pins; ubuntu-latest | Same pinning/runner policy required; no workflow created yet |
| Measured counts | Workflow comments contain historical totals; not rerun or independently measured here | All selected-tool counts explicitly not run; rule counts await implementation |
| Deployment scope | Separate Azure deployment workflow exists | No deployment/release from PR checks |

No analysis findings have been repaired in this task. Documentation validation is reported separately from application static analysis.
