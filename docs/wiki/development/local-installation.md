# Lokale Installation von Smolitux-UI

Diese Anleitung beschreibt die Einrichtung einer frischen Entwicklungsumgebung.

## Voraussetzungen

- Node.js v20+
- npm v9+
- Git

## Installation

```bash
git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
cd smolitux-ui
npm install
```

## Entwicklung

Die wichtigsten Befehle im Root-Verzeichnis:

```bash
npm run lint   # Code-Qualität prüfen
npm run test   # Unit-Tests ausführen
npm run build  # Pakete bauen
```

Alle Pakete werden über die gemeinsamen Workspaces verwaltet. Individuelle Build-Skripte sind nicht mehr erforderlich.

## Fehlerbehebung

Sollten Probleme auftreten, löschen Sie lokale `node_modules` und führen Sie die Installation erneut aus:

```bash
rm -rf **/node_modules
npm install
```

## Weitere Informationen

Ausführliche Dokumentation finden Sie im Ordner [docs/wiki](../).
