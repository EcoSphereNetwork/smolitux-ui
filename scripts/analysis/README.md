# Analyse-Skripte

Skripte zur Analyse von Code und Komponenten.

## Verfügbare Skripte

- **analysis.sh**: Hauptanalyse-Skript für das Repository
- **smolitux-analyzer.sh**: Analysiert Komponenten und deren Status
- **generate-coverage-report.js**: Generiert Berichte zur Testabdeckung
- **run_complete_analysis.sh**: Führt eine vollständige Analyse des Repositories durch

## Verwendung

```bash
# Repository analysieren
./analysis.sh

# Komponente analysieren
./smolitux-analyzer.sh --package core --component Button

# Testabdeckung generieren
node generate-coverage-report.js

# Vollständige Analyse durchführen
./run_complete_analysis.sh
```

## Erweiterung

Um ein neues Analyse-Skript hinzuzufügen:

1. Erstelle das Skript im `analysis/`-Verzeichnis
2. Mache es ausführbar mit `chmod +x dein-skript.sh`
3. Dokumentiere es in dieser README-Datei
4. Füge es ggf. in bestehende Workflow-Skripte ein