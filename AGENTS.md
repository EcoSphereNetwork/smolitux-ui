# Smolitux UI Guide for Codex Agents

This repository hosts the **Smolitux UI** component library. Packages live under
`packages/@smolitux/` and are written in TypeScript. A small Python CLI exists in
`Trash/src`.

## Repository Layout

- `packages/@smolitux/` – main library packages (`core`, `theme`, `icons`,
  `layout`, `charts`, `ai`, `blockchain`, `community`, `media`, `resonance`,
  `testing`, `utils`)
- `docs/` – Docusaurus documentation site
- `docs/wiki/development/` - smolitux-ui development documentation
- `scripts/` – helper scripts such as `setup-dev-env.sh`
- `test-app/` – simple demo application

## Node Development

- Format with `npm run format` (Prettier, width 100).
- Lint using `npm run lint`.
- Run unit tests via `npm run test`.
- End‑to‑end tests use Playwright: `npm run test:e2e`.
- Build all packages with `npm run build` or `./build-all.sh`.
- Start Storybook using `npm run storybook`.

## Python CLI (`Trash/src`)

- Install dependencies with `poetry install`.
- Format with `poetry run ruff check --fix .` and `poetry run black .`.
- Type‑check using `poetry run mypy .`.
- Run tests through `poetry run pytest` or `make test`.

## Documentation

- The Docusaurus site resides in `docs/`. Use `npm start` inside that directory
  to preview docs and `npm run build` to generate the static site.

- The smloitux-ui 

## Commits and Pull Requests

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit
  messages (`feat:`, `fix:`, `docs:`, etc.).
- Keep commits focused and update or add tests for changes.
- Include a short summary of changes and test results in the PR description.
- Always run `npm run lint` and `npm run test` before opening a PR.

## Codex Role

- Codex may modify or add tests and documentation but must **not** publish
  releases or push tags.
