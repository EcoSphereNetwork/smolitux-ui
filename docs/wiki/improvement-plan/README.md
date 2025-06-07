# Verbesserungsplan für smolitux-ui

## Hauptprobleme

### 1. Probleme mit @smolitux/core

- **Versionskonflikte**: Die Version von @smolitux/core ist inkonsistent. In einigen Paketen wird Version 0.1.0 referenziert, während die tatsächliche Version 0.1.1 ist.
- **Abhängigkeiten**: Viele Komponenten in den neuen Paketen (ai, blockchain, community, federation, media) haben direkte Abhängigkeiten zu @smolitux/core-Komponenten wie Card, Button, ProgressBar, etc.
- **Fehlende Implementierung**: Wir haben einige dieser Abhängigkeiten in ContentAnalytics, SentimentDisplay und RecommendationCarousel entfernt, aber es gibt noch viele weitere.

### 2. Fehlende und inkonsistente Abhängigkeiten

- **Fehlende npm-Pakete**: Viele Abhängigkeiten, die in package.json definiert sind, wurden nicht installiert.
- **Babel-Konfiguration**: Babel-Presets fehlen, die für die Transpilierung benötigt werden.
- **Storybook**: Storybook-Abhängigkeiten fehlen ebenfalls.
- **Versionskonflikte**: Inkonsistente Versionen von Abhängigkeiten wie TypeScript (4.9.5 vs. 5.8.2).

### 3. Build-Probleme

- **Lerna-Konfiguration**: Der Build-Prozess mit lerna schlägt fehl, weil die Abhängigkeiten nicht korrekt aufgelöst werden können.
- **tsup-Konfiguration**: Probleme mit der tsup-Konfiguration, die für den Build verwendet wird.
- **Fehlende TypeScript-Konfiguration**: Keine zentrale tsconfig.json im Wurzelverzeichnis und keine spezifischen Konfigurationen für die Pakete.

### 4. Test- und Dokumentationsprobleme

- **Fehlende Tests**: Obwohl wir einige Tests für die neuen Komponenten erstellt haben, fehlen Tests für viele andere Komponenten.
- **Unvollständige Dokumentation**: Die Dokumentation für viele Komponenten ist unvollständig.

## Detaillierter Verbesserungsplan

### Phase 1: Abhängigkeiten und Konfiguration

1. **Zentrale TypeScript-Konfiguration erstellen**
   - Erstellen einer tsconfig.json im Wurzelverzeichnis
   - Konfiguration für JSX, moderne JavaScript-Features und strikte Typisierung
   - Referenzierung in allen Paketen

2. **Abhängigkeiten synchronisieren**
   - Alle Pakete auf Version 0.2.0 aktualisieren
   - Konsistente Abhängigkeitsversionen in allen package.json-Dateien
   - Installation aller fehlenden Abhängigkeiten

3. **Lerna-Konfiguration verbessern**
   - Aktualisierung der lerna.json für die neue Lerna-Version
   - Entfernung veralteter Konfigurationsoptionen
   - Anpassung der Build-Skripte

### Phase 2: @smolitux/core-Abhängigkeiten auflösen

1. **Strategie für Komponenten-Abhängigkeiten**
   - **Option A**: Eigene Implementierungen für alle Komponenten erstellen
   - **Option B**: Peer-Dependency-System implementieren
   - **Option C**: Komponenten-Adapter erstellen, die @smolitux/core optional machen

2. **Komponenten-Refactoring**
   - Systematisches Refactoring aller Komponenten in den neuen Paketen
   - Priorisierung nach Häufigkeit der Verwendung:
     1. Card (23 Verwendungen)
     2. Button (19 Verwendungen)
     3. ProgressBar (6 Verwendungen)
     4. TabView (4 Verwendungen)
     5. Tooltip (2 Verwendungen)
     6. Modal (1 Verwendung)
     7. Input (5 Verwendungen)

3. **Gemeinsame Utilities erstellen**
   - Erstellen eines @smolitux/utils-Pakets für gemeinsame Funktionalitäten
   - Implementierung von Hilfsfunktionen für Styling, Theming, etc.

### Phase 3: Tests und Dokumentation

1. **Test-Framework verbessern**
   - Einrichtung einer zentralen Jest-Konfiguration
   - Erstellung von Test-Utilities für alle Pakete
   - Implementierung von Mock-Funktionen für externe Abhängigkeiten

2. **Tests für alle Komponenten**
   - Systematische Erstellung von Tests für alle Komponenten
   - Abdeckung von Basis-Funktionalität, Edge Cases und Accessibility

3. **Dokumentation vervollständigen**
   - Standardisiertes Dokumentationsformat für alle Komponenten
   - Beispiele für die Verwendung mit und ohne @smolitux/core
   - API-Referenz für alle Props und Methoden

### Phase 4: Storybook und Beispiele

1. **Storybook-Integration**
   - Zentrale Storybook-Konfiguration für alle Pakete
   - Stories für alle Komponenten mit verschiedenen Varianten
   - Dokumentation der Props direkt in Storybook

2. **Beispiel-Anwendungen**
   - Erstellung von Beispiel-Anwendungen, die die Komponenten demonstrieren
   - Integration mit verschiedenen Frameworks (Next.js, Vite, etc.)
   - Demonstrationen für verschiedene Anwendungsfälle

### Phase 5: Release und Veröffentlichung

1. **Versionierungsstrategie**
   - Implementierung von Semantic Versioning für alle Pakete
   - Synchronisierung der Versionen zwischen den Paketen
   - Automatisierte Version-Bumps

2. **Release-Prozess**
   - Automatisierter Release-Prozess mit GitHub Actions
   - Erstellung von Changelogs für jedes Paket
   - Veröffentlichung auf npm

3. **Dokumentations-Website**
   - Erstellung einer zentralen Dokumentations-Website
   - Integration von Storybook
   - Bereitstellung von Tutorials und Guides

## Konkrete nächste Schritte

1. **Erstellen einer zentralen tsconfig.json**
2. **Aktualisieren aller package.json-Dateien für konsistente Versionen**
3. **Implementieren von eigenständigen Versionen der Card- und Button-Komponenten**
4. **Refactoring der verbleibenden Komponenten in @smolitux/ai**
5. **Erstellen einer zentralen Jest-Konfiguration**
6. **Vervollständigen der Tests für @smolitux/ai**