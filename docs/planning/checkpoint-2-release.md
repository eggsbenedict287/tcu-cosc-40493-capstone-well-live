# Checkpoint 2 Startup and Release Preparation

**State:** Planned command contract, not a reproducible running demo yet. No application manifests, wrappers or tests exist at baseline `3fdbe13`. Replace this status with observed commands and results in the implementation PR.

## Startup contract for implementation review

The design-shape proposal selects Ionic Vue in `frontend/` and Spring Boot in `backend/`. Planned environment variable names are `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `WELL_LIVE_ASSESSMENT_KEY`, and `WELL_LIVE_ALLOWED_ORIGIN`. Names are proposals until the design is accepted; values belong in the backend secret store or ignored `backend/secrets/`, never the frontend, repository, screenshots or logs.

MySQL on Aiven's free plan is proposed pending team confirmation; local MySQL can support tests. No hosted resources have been provisioned. TLS must verify the database certificate/host, and the browser/API connection must use HTTPS under architecture section 8. These details and real sign-in fixtures must be exercised before the following planned commands can be called reproducible.

After the merged implementation supplies the named files and checked dependencies, use separate PowerShell terminals at this exact checkout. Proposed backend commands:

```powershell
Set-Location -LiteralPath 'C:\Users\cody0\Documents\tcu-cosc-40493-capstone-well-live\backend'
if (-not (Test-Path -LiteralPath '.\mvnw.cmd')) { throw 'Implementation and Maven wrapper are missing.' }
.\mvnw.cmd verify
.\mvnw.cmd spring-boot:run
```

Proposed frontend commands, after environment configuration and the human dependency check:

```powershell
Set-Location -LiteralPath 'C:\Users\cody0\Documents\tcu-cosc-40493-capstone-well-live\frontend'
if (-not (Test-Path -LiteralPath '.\package-lock.json')) { throw 'Reviewed implementation lockfile is missing.' }
npm.cmd ci
npm.cmd run test:unit
npm.cmd run build
npm.cmd run dev
```

The implementation must define these script names or revise this document to match observed commands. Do not run them today or install packages before a person checks their identity. Real-database integration and browser-suite commands must be filled from the implementation's actual configuration, not guessed here.

## Demonstration acceptance

Use two fictitious database-backed accounts through real sign-in. Show the complete version-1 questionnaire and conditional optional prompts; Concern/No concern/Skipped distinctions; unit-aware measurements and text boundaries; edit from summary; all-skipped confirmation; skip/abandon with no save; successful save/readback with its single UTC timestamp; a lost-response retry; ownership refusals and database-failure rollback. Inspect only fictitious answers. Map every accepted design test row to an actual test and its observed result in the implementation PR.

## Exact tag commands after human authorization

Run only after the release gate in [the draft notes](../releases/v0.1.0.md#release-gate) passes. The reviewed SHA is supplied by the human from the merged implementation PR. These checks refuse a dirty checkout, an unexpected main revision and an existing tag.

```powershell
Set-Location -LiteralPath 'C:\Users\cody0\Documents\tcu-cosc-40493-capstone-well-live'
git fetch origin --tags
if ($LASTEXITCODE -ne 0) { throw 'Fetch failed.' }
if (git status --porcelain) { throw 'Working tree is not clean.' }
$reviewedCommit = Read-Host 'Paste the full reviewed and merged implementation SHA after authorizing release'
if ($reviewedCommit -notmatch '^[0-9a-f]{40}$') { throw 'A full commit SHA is required.' }
if ((git rev-parse origin/main) -ne $reviewedCommit) { throw 'origin/main differs from the reviewed SHA.' }
if (git tag --list v0.1.0) { throw 'v0.1.0 already exists; do not overwrite it.' }
git tag -a v0.1.0 $reviewedCommit -m 'Well Live v0.1.0 assessment proving slice'
if ($LASTEXITCODE -ne 0) { throw 'Tag creation failed.' }
git push origin refs/tags/v0.1.0
if ($LASTEXITCODE -ne 0) { throw 'Tag push failed; do not publish.' }
```

After inspecting final notes and the pushed tag, an authorized human with authenticated GitHub CLI may publish using:

```powershell
gh release create v0.1.0 --repo eggsbenedict287/tcu-cosc-40493-capstone-well-live --verify-tag --title 'Well Live v0.1.0' --notes-file docs/releases/v0.1.0.md
```

`gh` is currently unavailable in this execution environment. The connected GitHub integration refused issue creation with 403 and the browser requires sign-in. No release, tag, dependency install or service provisioning occurred during preparation.
