# Repository Guidelines

This monorepo contains a React component library (packages in `packages/`) and a small Python CLI (in `src/`).

## JavaScript/TypeScript

- Use `npm run format` to apply Prettier formatting (print width 100).
- Run `npm run lint` to check ESLint rules.
- Execute unit tests with `npm run test`.
- End‑to‑end tests use Playwright: `npm run test:e2e`.
- Build all packages via `npm run build`.

## Python

- Install dependencies with `poetry install`.
- Format code with `poetry run ruff check --fix .` and `poetry run black .`.
- Type‑check using `poetry run mypy .`.
- Run tests through `poetry run pytest` (or `make test`).

## Commits and Pull Requests

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages (`feat:`, `fix:`, `docs:`, etc.).
- Keep commits focused. Update or add tests for code changes.
- Include a short summary of changes and test results in the PR description.
