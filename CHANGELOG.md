# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

> **Hinweis:** Die vollständige Dokumentation finden Sie im [Wiki](/docs/wiki/index.md). Die aktuelle Version des Changelogs finden Sie [hier](/docs/wiki/development/changelog.md).

## [0.3.7] - 2025-06-20

### Changed

- Adjusted Jest configuration path for `@smolitux/testing`
- Added named export for `defaultTheme` and cleaned up theme exports

## [0.3.3] - 2025-06-17

### Added

- Component counts documented in component-status.md

### Fixed
- Removed legacy theme-provider implementation
- Updated TypeScript path mappings

## [0.3.4] - 2025-06-18

### Changed

- Added forwardRef and data-testid to `Option` component
- Updated related tests and stories

## [0.3.5] - 2025-06-18

### Changed

- `Tooltip` component now uses `forwardRef` for external ref access

## [0.3.6] - 2025-06-19

### Changed

- `Collapse` component now supports `forwardRef` and exposes the container ref.

## [0.3.7] - 2025-06-10
### Changed
- `AudioPlayer` component now uses `forwardRef` and sets `displayName`.
### Fixed
- Removed obsolete test TODO comments for chart components
- Updated documentation to reflect existing tests

## [0.3.7] - 2025-06-19
### Changed
- Updated EthereumProvider typing with generic request results
- Implemented `forwardRef` for WalletConnect, TokenDisplay and TransactionHistory
- Simplified tests and added ref forwarding checks
### Fixed
- `FeedItem` in `@smolitux/resonance` now forwards refs correctly

## [0.3.8] - 2025-06-20
### Added
- forwardRef support for `DashboardLayout`
- Accessibility tests for `Header` and `Footer`
- Storybook stories for `NotificationCenter`
### Changed
- DashboardLayout forwards refs to its root element
- `NotificationCenter` now forwards refs and exposes a `data-testid`
- `AudioPlayer` component now uses `forwardRef` and sets `displayName`.
- `Slide` component now uses `forwardRef` for external ref access and updated tests
- Documentation page summarizing common open-source licenses
- Forward refs added to all federation components with display names
- Updated federation Jest rootDir
- Updated TODO logs for federation components

## [0.3.2] - 2025-06-08

### Added
- Storybook stories for `NotificationCenter`
### Changed
- `NotificationCenter` now forwards refs and exposes a `data-testid`
- Offline Komponentenscan und TODO-Liste erstellt

## [0.3.1] - 2025-06-08

### Added

- component status updated with voice-control package

## [0.3.0] - 2025-06-08

### Added

- minimal project setup without Lerna
- central TypeScript, ESLint and Jest configuration

## [0.2.3] - 2025-06-08

### Changed

- updated TypeScript build configuration for docs
- declared Node.js and Docusaurus module types in root config

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2025-04-02

### Hinzugefügt

- Umfassender Komponenten-Teststatus-Bericht in der Dokumentation
- Detaillierte Release Notes für Version 0.2.2

### Geändert

- Verbesserte Codeformatierung in allen Dateien
- Aktualisierte Versionsnummer in package.json und lerna.json

### Behoben

- Syntaxfehler in FormField.tsx behoben
- Syntaxfehler in ActivityStream.tsx behoben
- HTML-Dateien mit .tsx-Erweiterung in .html umbenannt, um TypeScript-Kompilierungsfehler zu vermeiden

### Hinzugefügt

- Storybook-Stories für mehrere Komponenten (Button, Card, Avatar, Breadcrumb, Tooltip, Modal, Table, Accordion)
- Cypress E2E-Tests für Komponenten
- Cypress Accessibility-Tests
