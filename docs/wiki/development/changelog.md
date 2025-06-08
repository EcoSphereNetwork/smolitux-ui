# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [0.3.1] - 2025-06-08
- component status updated with voice-control package

## [0.2.3] - 2025-06-08
- Updated TypeScript docs configuration

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2023-03-26

### Hinzugefügt
- Button-Komponente: Unterstützung für `solid`-Variante als Alias für `primary`
- Button-Komponente: Unterstützung für `outline`-Variante als Alias für `ghost`
- Button-Komponente: Unterstützung für `isLoading`-Prop als Alias für `loading`
- TabView-Komponente: Unterstützung für `onChange`-Prop als Alias für `onTabChange`

### Geändert
- Verbesserte Exportstruktur in der Utils-Bibliothek für einfachere Importe
- Aktualisierte Dokumentation mit neuen Varianten und Props

### Behoben
- Typfehler in der Button-Komponente
- Typfehler in der TabView-Komponente

## [0.2.1] - 2025-03-26

### Hinzugefügt
- Neue Komponenten für ResonanceLink:
  - Governance-Komponenten:
    - GovernanceDashboard: Übersicht über Community-Governance
    - ProposalView: Detailansicht für Vorschläge
    - VotingSystem: System für Abstimmungen
  - Monetarisierungs-Komponenten:
    - RevenueModel: Visualisierung des 30-30-30-Modells
    - RewardSystem: Belohnungssystem für Benutzeraktivitäten
    - CreatorDashboard: Dashboard für Content-Ersteller
  - Theme-System:
    - ThemeProvider: Für Theme-Kontext
    - createTheme: Für benutzerdefinierte Themes
    - useTheme: Hook für Theme-Zugriff

### Geändert
- Alle Komponenten haben jetzt default exports
- TypeScript-Deklarationsdateien (DTS) wurden vorübergehend deaktiviert

### Bekannte Probleme
- Charts-Komponenten haben Syntaxfehler und sind noch nicht nutzbar
- Einige Tests schlagen fehl aufgrund von Snapshot-Änderungen
- Formularvalidierung und Internationalisierung sind noch nicht vollständig implementiert
## [0.3.0] - 2025-06-08
- Repository reinitialized without Lerna
- Minimal TypeScript, ESLint and Jest setup

