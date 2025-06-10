# Hilfsskripte

Allgemeine Hilfsskripte und -funktionen für die Entwicklung.

## Verfügbare Skripte

- **utils.sh**: Hauptskript mit gemeinsamen Hilfsfunktionen
- **common-functions.sh**: Gemeinsame Funktionen für alle Skripte
- **setup-dev-env.sh**: Richtet die Entwicklungsumgebung ein
- **codespace-setup.sh**: Konfiguriert GitHub Codespaces
- **issue_utils.sh**: Hilfsfunktionen für die Issue-Verwaltung
- **create_issues.sh**: Erstellt GitHub Issues basierend auf Templates
- **create_package_issues.sh**: Erstellt paketspezifische Issues
- **progress-tracker.js**: Verfolgt den Fortschritt der Entwicklung

## Verwendung

```bash
# Entwicklungsumgebung einrichten
./setup-dev-env.sh

# Codespace einrichten
./codespace-setup.sh

# Hilfsfunktionen importieren
source ./utils.sh

# Issues erstellen
./create_issues.sh --template component-missing

# Fortschritt verfolgen
node progress-tracker.js
```

## Erweiterung

Um ein neues Hilfsskript hinzuzufügen:

1. Erstelle das Skript im `utils/`-Verzeichnis
2. Mache es ausführbar mit `chmod +x dein-skript.sh` (für Shell-Skripte)
3. Dokumentiere es in dieser README-Datei
4. Füge es ggf. in bestehende Workflow-Skripte ein

## Gemeinsame Funktionen

Die Datei `common-functions.sh` enthält gemeinsame Funktionen, die in allen Skripten verwendet werden können:

- Logging-Funktionen
- Fehlerbehandlung
- Verzeichnisoperationen
- Konfigurationsmanagement