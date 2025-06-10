# Validierungs-Skripte

Skripte zur Validierung von Code und Komponenten.

## Verfügbare Skripte

- **validation.sh**: Hauptvalidierungs-Skript für das Repository
- **component-validator.js**: Validiert Komponenten auf Vollständigkeit und Qualität
- **run-visual-tests.sh**: Führt visuelle Tests für Komponenten durch
- **update-visual-snapshots.sh**: Aktualisiert visuelle Snapshots für Tests
- **codex-lint-fix-engine.sh**: Automatisierte Lint-Fixes mit Codex
- **codex-lint-phase0.sh** bis **codex-lint-phase3.sh**: Phasenweise Lint-Validierung

## Verwendung

```bash
# Repository validieren
./validation.sh

# Komponente validieren
node component-validator.js --package core --component Button

# Visuelle Tests durchführen
./run-visual-tests.sh

# Visuelle Snapshots aktualisieren
./update-visual-snapshots.sh

# Lint-Fixes durchführen
./codex-lint-fix-engine.sh
```

## Erweiterung

Um ein neues Validierungs-Skript hinzuzufügen:

1. Erstelle das Skript im `validation/`-Verzeichnis
2. Mache es ausführbar mit `chmod +x dein-skript.sh` (für Shell-Skripte)
3. Dokumentiere es in dieser README-Datei
4. Füge es ggf. in bestehende Workflow-Skripte ein

## Validierungskriterien

Die Validierungsskripte prüfen folgende Aspekte:

- TypeScript-Fehler
- ESLint-Regeln
- Testabdeckung
- Barrierefreiheit
- Dokumentation
- Build-Erfolg