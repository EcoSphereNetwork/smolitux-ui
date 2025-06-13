# Smolitux UI - Prompts

Dieses Verzeichnis enthält Prompt-Templates für die Entwicklung mit Codex.

## Verzeichnisstruktur

- **core/**: Basis-Prompts für das gesamte Projekt
- **packages/**: Paket-spezifische Prompts
  - **core/**: Prompts für das Core-Paket
  - **theme/**: Prompts für das Theme-Paket
  - **utils/**: Prompts für das Utils-Paket
  - **testing/**: Prompts für das Testing-Paket
- **workflows/**: Workflow-spezifische Prompts

## Verwendung

Prompts können mit dem Prompt-Builder generiert werden:

```bash
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component
```
