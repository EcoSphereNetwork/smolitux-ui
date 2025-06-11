# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [0.3.7] - 2025-06-20

### Changed
- Adjusted Jest configuration path for `@smolitux/testing`
- Added named export for `defaultTheme` and cleaned up theme exports
- `Slide` component now forwards refs and tests were updated accordingly.

### Added
- Documentation page summarizing common open-source licenses

### Fixed
- `FeedItem` in `@smolitux/resonance` now forwards refs correctly

## [0.3.1] - 2025-06-08

- component status updated with voice-control package

## [0.3.2] - 2025-06-17
- Removed legacy theme-provider implementation in @smolitux/theme
- Updated monorepo TypeScript path mappings

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
