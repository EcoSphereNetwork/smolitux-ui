# Project Context for LLMs

This monorepo hosts the **Smolitux UI** component library and supporting tooling.

- Packages are under `packages/@smolitux/` and built with TypeScript.
- Tests use Jest (`npm run test`) and Playwright for e2e (`npm run test:e2e`).
- Linting uses ESLint (`npm run lint`).
- The setup script `scripts/setup-dev-env.sh` installs dependencies and syncs versions.
- Follow Conventional Commits and run formatting via `npm run format` before commits.

CI builds all packages and runs linting and tests.
