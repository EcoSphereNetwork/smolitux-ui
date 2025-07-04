# Smolitux-UI Entwicklungsdokumentation

Diese Dokumentation enthält wichtige Informationen für Entwickler, die an der Smolitux-UI-Bibliothek arbeiten oder sie verwenden möchten.

## Inhaltsverzeichnis

### Release-Informationen

- [Release Notes v0.2.1](./v0.2.1-release-notes.md) - Detaillierte Informationen zum aktuellen Release

### Analyse und Verbesserung

- [Build-Analyse](./build-analysis.md) - Analyse der Probleme beim Build-Prozess
- [Erste Analyse 2025-06-09](./analysis-2025-06-09.md) - Zusammenfassung des aktuellen Entwicklungsstands
- [Verbesserungsplan](./roadmap.md) - Plan zur Verbesserung der Bibliothek
- [Build-Fix-Anleitung](./build-fix-guide.md) - Anleitung zur Behebung der Build-Probleme

### Projektplanung

- [Implementierungsplan](./roadmap/implementation-plan.md) - Schrittweise Umsetzung der weiteren Entwicklung
- [Kalkulation v0.2.2](./Finanzierung/Kalkulation-v0.2.2.md) - Übersicht der geplanten Aufwände
- [Roadmap](./roadmap.md) - Gesamte Entwicklungs-Roadmap

### Entwicklungsrichtlinien

- [Coding Standards](../guidelines/coding-standards.md) - Richtlinien für die Codequalität
- [Komponenten-Struktur](../guidelines/component-structure.md) - Struktur und Organisation von Komponenten
- [Testing-Strategie](../guidelines/testing-strategy.md) - Strategie für Tests und Qualitätssicherung

### Architektur

- [Paketstruktur](../architecture/package-structure.md) - Übersicht über die Paketstruktur
- [Abhängigkeiten](../architecture/dependencies.md) - Verwaltung von Abhängigkeiten
- [Build-Prozess](../architecture/build-process.md) - Übersicht über den Build-Prozess

## Erste Schritte

Um mit der Entwicklung zu beginnen, folgen Sie diesen Schritten:

1. Repository klonen:

   ```bash
   git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
   cd smolitux-ui
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Build ausführen:

   ```bash
   npm run build
   ```

4. Storybook starten:
   ```bash
   npm run storybook
   ```

## Bekannte Probleme

Derzeit gibt es einige bekannte Probleme mit dem Build-Prozess. Siehe [Build-Analyse](./build-analysis.md) für Details und [Build-Fix-Anleitung](./build-fix-guide.md) für Lösungen.

## Beitragen

Wir freuen uns über Beiträge zur Verbesserung der Smolitux-UI-Bibliothek. Bitte lesen Sie die [Beitragsrichtlinien](./contributing.md) für weitere Informationen.

## Lizenz

Smolitux-UI ist unter der [MIT-Lizenz](https://github.com/EcoSphereNetwork/smolitux-ui/blob/main/LICENSE) lizenziert. Eine Übersicht über häufig genutzte Lizenzen unserer Abhängigkeiten findet sich im Abschnitt [*Open-Source Licenses*](../guides/open-source-licenses.md).
