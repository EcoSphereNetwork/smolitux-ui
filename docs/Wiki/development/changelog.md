# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

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
  - Feed-Komponenten:
    - FeedView: Anzeige von Beiträgen im Feed
    - PostCreator: Erstellung von Beiträgen
  - Post-Komponenten:
    - PostView: Anzeige von Beiträgen
    - PostInteractions: Interaktionen mit Beiträgen
    - PostMetrics: Metriken für Beiträge
  - Profil-Komponenten:
    - ProfileView: Anzeige von Benutzerprofilen
- Neue KI-Komponenten:
  - FakeNewsDetector: Erkennung von Falschinformationen
  - TrollFilter: Filterung von toxischen Kommentaren
  - ContentModerator: Moderation von Inhalten
- Neue Blockchain-Komponenten:
  - TokenEconomy: Visualisierung der Token-Wirtschaft
  - SmartContractInteraction: Interaktion mit Smart Contracts

### Verbessert
- Verbesserte Typendefinitionen für alle Komponenten
- Bessere Dokumentation mit JSDoc-Kommentaren
- Optimierte Leistung bei komplexen Komponenten
- Verbesserte Browserkompatibilität durch Erkennung der Ausführungsumgebung
- Hinzugefügt: Primitive Komponenten (Box, Flex, Text) für konsistentes Layout
- Hinzugefügt: Test-App zur Demonstration der Komponenten

### Fehlerbehebungen
- Behoben: Syntaxfehler in Charts-Komponenten
- Behoben: Fehlerhafte Snapshot-Tests
- Behoben: Probleme mit der Formularvalidierung
- Behoben: Falsche Modul-Pfade in package.json-Dateien (index.mjs statt index.esm.js)
- Behoben: Probleme mit i18n-Initialisierung in Node.js-Umgebungen
- Behoben: Fehlerhafte Importe zwischen Paketen, die auf interne Quellcode-Pfade verwiesen

## [0.2.0] - 2025-03-25

### Hinzugefügt
- Erste Version der erweiterten Komponenten-Bibliothek
- Neue Pakete für spezifische Anwendungsbereiche:
  - @smolitux/ai: KI-bezogene Komponenten
  - @smolitux/blockchain: Blockchain-bezogene Komponenten
  - @smolitux/community: Community-bezogene Komponenten
  - @smolitux/federation: Föderations-bezogene Komponenten
  - @smolitux/media: Medien-bezogene Komponenten
  - @smolitux/utils: Hilfsfunktionen und -komponenten

## [0.1.0] - 2025-03-24

### Hinzugefügt
- Erste Version der Smolitux UI Komponenten-Bibliothek
- Core-Komponenten:
  - Alert: Für Benachrichtigungen und Warnungen
  - Badge: Für Labels, Zähler und Status
  - Button: Für Aktionen
  - Checkbox: Für Auswahloptionen
  - ColorPicker: Für Farbauswahl
  - FormControl: Container für Formularelemente
  - Input: Für Texteingaben
  - Modal: Für modale Dialoge
  - Radio: Für Auswahloptionen
  - Select: Für Auswahlmenüs
  - Switch: Für Ein/Aus-Schalter
  - Table: Für tabellarische Daten
- Layout-Komponenten:
  - Container: Für zentrierten Inhalt mit maximaler Breite
  - Grid: Für Raster-Layouts
  - Flex: Für flexible Layouts
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