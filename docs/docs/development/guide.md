---
sidebar_position: 1
---

# Entwicklungsanleitung

Diese Anleitung bietet Informationen für Entwickler, die zu Smolitux-UI beitragen möchten.

## Entwicklungsumgebung einrichten

Um mit der Entwicklung von Smolitux-UI zu beginnen, folgen Sie diesen Schritten:

1. Klonen Sie das Repository:
   ```bash
   git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
   cd smolitux-ui
   ```

2. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starten Sie die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```

## Projektstruktur

Das Projekt ist wie folgt strukturiert:

```
smolitux-ui/
├── packages/           # Monorepo-Pakete
│   ├── core/           # Kernkomponenten
│   ├── icons/          # Icon-Bibliothek
│   ├── theme/          # Theming-System
│   └── utils/          # Hilfsfunktionen
├── examples/           # Beispielanwendungen
├── docs/               # Dokumentation
├── scripts/            # Build- und Entwicklungsskripte
└── tests/              # Tests
```

## Entwicklungsworkflow

1. **Erstellen eines Feature-Branches**:
   ```bash
   git checkout -b feature/neue-komponente
   ```

2. **Implementieren der Änderungen**:
   - Fügen Sie neue Komponenten in das entsprechende Paket hinzu
   - Schreiben Sie Tests für Ihre Komponenten
   - Aktualisieren Sie die Dokumentation

3. **Lokales Testen**:
   ```bash
   npm test
   npm run lint
   ```

4. **Pull Request erstellen**:
   - Pushen Sie Ihre Änderungen zu GitHub
   - Erstellen Sie einen Pull Request mit einer detaillierten Beschreibung

## Coding-Standards

- Verwenden Sie TypeScript für alle neuen Komponenten
- Folgen Sie den Richtlinien für Zugänglichkeit (WCAG 2.1 AA)
- Schreiben Sie Tests für alle neuen Funktionen
- Dokumentieren Sie Ihre Komponenten mit JSDoc-Kommentaren

## Veröffentlichungsprozess

Smolitux-UI folgt der semantischen Versionierung:

- **Patch-Versionen** (z.B. 1.0.1): Bugfixes und kleine Änderungen
- **Minor-Versionen** (z.B. 1.1.0): Neue Funktionen, die abwärtskompatibel sind
- **Major-Versionen** (z.B. 2.0.0): Breaking Changes

Der Veröffentlichungsprozess wird durch GitHub Actions automatisiert.