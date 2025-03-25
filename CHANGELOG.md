# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-03-25

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