# CI/CD-Integration für Smolitux UI

Diese Dokumentation beschreibt die CI/CD-Integration für die Smolitux UI-Bibliothek.

## Überblick

Die CI/CD-Pipeline für Smolitux UI besteht aus zwei Hauptworkflows:

1. **CI-Workflow**: Wird bei Pull Requests und Pushes auf main/develop ausgeführt
2. **Release-Workflow**: Wird beim Pushen von Tags ausgeführt

## CI-Workflow

Der CI-Workflow führt folgende Jobs aus:

### Lint

- Prüft den Code auf Einhaltung der Coding-Standards
- Verwendet ESLint und TypeScript

### Unit Tests

- Führt Unit- und Integrationstests mit Jest aus
- Generiert Testabdeckungsberichte
- Lädt Abdeckungsberichte zu Codecov hoch

### Build

- Kompiliert die Komponenten mit TypeScript
- Erstellt die Distributionspakete
- Speichert die Build-Artefakte für andere Jobs

### Storybook

- Baut die Storybook-Dokumentation
- Speichert die Storybook-Artefakte für E2E-Tests

### Visual Tests (optional)

- Führt visuelle Regressionstests mit Chromatic durch
- Vergleicht UI-Komponenten mit Baseline-Screenshots
- Benötigt ein Chromatic-Projekt-Token

### Browser Tests

- Führt E2E-Tests mit Playwright aus
- Testet auf verschiedenen Browsern (Chrome, Firefox)
- Verwendet die gebaute Storybook-Dokumentation

### Notification

- Sendet Benachrichtigungen über den Pipeline-Status
- Unterstützt Slack-Webhooks

## Release-Workflow

Der Release-Workflow wird ausgeführt, wenn ein neues Tag gepusht wird:

### Release

- Baut die Pakete
- Führt Tests aus
- Veröffentlicht die Pakete auf npm
- Erstellt einen GitHub Release mit Release Notes

### Deploy Docs

- Baut die Storybook-Dokumentation
- Veröffentlicht die Dokumentation auf GitHub Pages

## Einrichtung

### Erforderliche Secrets

Folgende Secrets müssen in den GitHub Repository-Einstellungen konfiguriert werden:

- `NPM_TOKEN`: Token für die Veröffentlichung auf npm
- `CODECOV_TOKEN`: Token für die Hochladung von Testabdeckungsberichten
- `CHROMATIC_PROJECT_TOKEN` (optional): Token für visuelle Regressionstests
- `SLACK_WEBHOOK_URL` (optional): URL für Slack-Benachrichtigungen

### Branch-Schutzregeln

Für den `main`-Branch sollten folgende Schutzregeln konfiguriert werden:

1. Require status checks to pass before merging
2. Require branches to be up to date before merging
3. Status checks that are required:
   - lint
   - unit_tests
   - build
   - browser_tests

## Workflow-Dateien

Die Workflow-Dateien befinden sich im Verzeichnis `.github/workflows/`:

- `ci.yml`: CI-Workflow
- `release.yml`: Release-Workflow

## Testberichte

Die Pipeline generiert verschiedene Testberichte:

- Jest-Berichte: `reports/jest/jest-junit.xml`
- Playwright-Berichte: `playwright-report/`
- Codecov-Berichte: Werden automatisch hochgeladen

## Fehlerbehebung

### Häufige Probleme

1. **Tests schlagen fehl**: Überprüfen Sie die Testberichte für Details
2. **Build schlägt fehl**: Überprüfen Sie die TypeScript-Fehler
3. **Veröffentlichung schlägt fehl**: Überprüfen Sie das NPM_TOKEN

### Wiederholungsversuche

Für instabile Tests verwendet die Pipeline Wiederholungsversuche:

- E2E-Tests werden bis zu 2 Mal wiederholt
- Visuelle Tests können manuell in Chromatic überprüft werden

## Best Practices

1. **Commit-Nachrichten**: Verwenden Sie konventionelle Commit-Nachrichten für automatische Versionierung
2. **Tests**: Schreiben Sie Tests für alle neuen Funktionen
3. **Dokumentation**: Aktualisieren Sie die Dokumentation bei API-Änderungen
4. **Versionierung**: Verwenden Sie semantische Versionierung

## Ressourcen

- [GitHub Actions-Dokumentation](https://docs.github.com/en/actions)
- [Playwright-Dokumentation](https://playwright.dev/docs/intro)
- [Jest-Dokumentation](https://jestjs.io/docs/getting-started)
- [Codecov-Dokumentation](https://docs.codecov.io/docs)
- [Chromatic-Dokumentation](https://www.chromatic.com/docs/)