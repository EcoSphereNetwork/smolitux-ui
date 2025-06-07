# CI/CD Overview

This project uses GitHub Actions to automate common tasks. Only a few workflows remain after cleanup:

- **ci.yml** – runs lint checks, unit tests with coverage, builds packages and Storybook. Storybook is deployed when changes land on `main`.
- **e2e-tests.yml** – runs Playwright end‑to‑end tests for pull requests and pushes.
- **accessibility-tests.yml** – executes accessibility checks and uploads a report.
- **docusaurus.yml** – builds and deploys the documentation site.
- **release.yml** – publishes new versions to npm when a tag `v*` is pushed.

These workflows ensure quality and automate releases while keeping the workflow directory lightweight.
