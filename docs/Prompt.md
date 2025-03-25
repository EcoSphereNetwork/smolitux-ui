# Smolitux UI Bibliothek - Entwicklerprompt zur Überarbeitung und Testdurchführung

## Überblick
Du wirst die React-basierte Smolitux UI Komponentenbibliothek überarbeiten und systematisch testen. Deine Aufgabe umfasst Code-Review, Refactoring und die strukturierte Implementierung des vorhandenen Testplans.

## Projektziele
1. Überprüfung und Verbesserung der bestehenden Komponenten
2. Implementierung fehlender Funktionalitäten
3. Systematische Durchführung des Testplans
4. Dokumentation aller Arbeitsschritte
5. Regelmäßige Commits und PRs zum Repository

## Arbeitsablauf

### Phase 1: Code-Review und Analyse
1. Überprüfe die Projektstruktur und Dateien in `/packages/@smolitux`
2. Analysiere die bestehenden Komponenten auf:
   - Codequalität und Performance
   - TypeScript-Typisierung
   - Komponentenarchitektur
   - Konsistenz mit Design-Vorgaben
3. Erstelle eine Priorisierungsliste für Verbesserungen
4. **AKTION:** Dokumentiere deine Analyse und erstelle einen ersten PR mit "Initial code review analysis"

### Phase 2: Komponenten-Überarbeitung
1. Beginne mit Basiskomponenten (Button, Input, etc.)
2. Verbessere die Komponenten gemäß deiner Analyseergebnisse:
   - Behebe fehlende Typendefinitionen
   - Optimiere Performance-kritische Abschnitte
   - Standardisiere die API-Struktur
   - Sorge für Barrierefreiheit
3. **AKTION:** Führe für jede größere Komponente oder logische Gruppe einen separaten Commit durch und pushe einen PR mit "Component refactoring: [Komponentenname]"

### Phase 3: Test-Setup nach Testplan
1. Implementiere die Testinfrastruktur gemäß `/docs/testing/testplan/02-Testinfrastruktur.md`
2. Installiere alle erforderlichen Test-Dependencies
3. Richte Jest, React Testing Library und andere Testtools ein
4. Erstelle Test-Utilities und Mocks
5. **AKTION:** Committe die Test-Infrastruktur und erstelle einen PR mit "Test infrastructure setup"

### Phase 4: Unit-Tests implementieren
1. Befolge den Plan in `/docs/testing/testplan/03-Unit-Tests.md`
2. Beginne mit Tests für grundlegende Komponenten
3. Teste verschiedene Zustände und Interaktionen
4. Achte auf mindestens 80% Testabdeckung
5. **AKTION:** Committe Tests für jede Komponente oder logische Einheit und erstelle PRs mit "Unit tests: [Komponentenname]"

### Phase 5: Integrations- und spezielle Komponententests
1. Implementiere Integrationstests gemäß `/docs/testing/testplan/04-Integrationstests.md`
2. Entwickle spezielle Tests für komplexere Komponenten gemäß `/docs/testing/testplan/05-Spezielle-Komponententests.md`
3. **AKTION:** Committe die Tests und erstelle PRs mit "Integration tests: [Testbereich]"

### Phase 6: Visuelle und Browser-Kompatibilitätstests
1. Richte Storybook und Chromatic für visuelle Tests ein gemäß `/docs/testing/testplan/06-Visuelle-Tests.md`
2. Implementiere Playwright für Browser-Kompatibilitätstests gemäß `/docs/testing/testplan/07-Browserkompatibilitätstests.md`
3. **AKTION:** Committe diese Tests und erstelle PRs mit "Visual and browser compatibility tests"

### Phase 7: CI/CD-Integration
1. Richte GitHub Actions für CI/CD ein gemäß `/docs/testing/testplan/08-CI-CD-Integration.md`
2. **AKTION:** Committe die CI/CD-Konfiguration und erstelle einen PR mit "CI/CD configuration"

## Dokumentationsanforderungen
Für jeden Arbeitsschritt:
1. Dokumentiere deine Änderungen und Verbesserungen
2. Beschreibe die implementierten Tests
3. Notiere Herausforderungen und wie du sie gelöst hast
4. Erstelle oder aktualisiere die Komponenten-Dokumentation

## Commit- und PR-Richtlinien
1. Mache häufige, kleine Commits mit aussagekräftigen Nachrichten
2. Strukturiere deine Commit-Nachrichten wie folgt:
   ```
   [Bereich]: Kurze Beschreibung was geändert wurde
   
   - Detaillierte Änderung 1
   - Detaillierte Änderung 2
   ```
3. Erstelle für jede größere Aufgabe einen separaten Pull Request
4. Benenne PRs klar und füge eine Beschreibung hinzu, die folgendes enthält:
   - Was wurde geändert/implementiert
   - Warum wurden diese Änderungen vorgenommen
   - Wie kann getestet werden

## Meilensteine und Lieferumfang
- Meilenstein 1: Code-Review und Analyse abgeschlossen
- Meilenstein 2: Kernkomponenten überarbeitet
- Meilenstein 3: Testinfrastruktur eingerichtet und grundlegende Tests implementiert
- Meilenstein 4: Integrations- und spezielle Komponententests implementiert
- Meilenstein 5: Visuelle und Browser-Kompatibilitätstests implementiert
- Meilenstein 6: CI/CD-Pipeline eingerichtet

## Finale Lieferung
Am Ende des Projekts sollte folgendes erreicht sein:
1. Überarbeitete, gut dokumentierte Komponenten
2. Umfassende Testsuite gemäß Testplan
3. Funktionierende CI/CD-Pipeline
4. Ausführliche Dokumentation aller Änderungen und Tests

Bitte verfolge diesen Prozess schrittweise und halte uns über deinen Fortschritt auf dem Laufenden. Dokumentiere sorgfältig jeden Schritt und stelle sicher, dass nach jedem größeren Meilenstein ein Pull Request erstellt wird.
