# Entwickler-Prompt: Smolitux UI Bibliothek - Weiterentwicklung und Testdurchführung

## Ausgangssituation

Du übernimmst die Weiterentwicklung und Fertigstellung der Smolitux UI Bibliothek, einer React-basierten Komponentenbibliothek. Die Codebasis befindet sich bereits in Entwicklung, und deine Aufgabe ist es, den aktuellen Stand zu evaluieren, die Bibliothek zu vervollständigen und umfassend zu testen.

## Deine Aufgaben

### 1. Bestandsaufnahme und Analyse
- Verschaffe dir einen Überblick über die Projektstruktur (`packages/@smolitux/*`)
- Prüfe den Entwicklungsstand der einzelnen Komponenten
- Sichte die vorhandene Dokumentation, insbesondere im `docs/`-Verzeichnis
- Identifiziere fehlende Komponenten und Funktionalitäten basierend auf der README.md und den Anforderungsdokumenten

### 2. Planung und Priorisierung
- Erstelle eine priorisierte Liste von:
  - Zu vervollständigenden Komponenten
  - Zu überarbeitenden Komponenten
  - Fehlenden Features
  - Durchzuführenden Tests gemäß Testplan

### 3. Komponenten-Entwicklung und -Verbesserung
- Vervollständige fehlende Komponenten gemäß der Projektanforderungen
- Verbessere bestehende Komponenten hinsichtlich:
  - Funktionalität
  - Barrierefreiheit
  - Wiederverwendbarkeit
  - TypeScript-Typisierung
  - Performance

### 4. Testdurchführung
- Folge systematisch dem vorhandenen Testplan unter `docs/testing/testplan/`
- Implementiere die Tests in der angegebenen Reihenfolge:
  1. Richte die Testinfrastruktur ein
  2. Entwickle Unit-Tests für Basiskomponenten
  3. Implementiere Integrationstests für komplexe Komponenten
  4. Führe spezielle Komponententests durch
  5. Setze visuelle Tests um
  6. Führe Browserkompatibilitätstests durch
  7. Integriere die Tests in die CI/CD-Pipeline

### 5. Dokumentation
- Aktualisiere oder vervollständige die Komponentendokumentation
- Dokumentiere deine Entscheidungen und Implementierungsdetails
- Sorge für aussagekräftige JSDoc-Kommentare im Code

## Workflow

1. **Nach jedem bedeutenden Arbeitsschritt:**
   - Committe deine Änderungen mit klaren, beschreibenden Commit-Nachrichten
   - Pushe einen Pull Request an das GitHub-Repository
   - Struktur: `[Bereich]: Was wurde gemacht und warum`

2. **Für jede abgeschlossene Komponente oder Feature:**
   - Stelle sicher, dass Tests vorhanden sind
   - Überprüfe die Testabdeckung
   - Stelle sicher, dass die Komponente in Storybook dokumentiert ist

3. **Für jeden Meilenstein im Testplan:**
   - Dokumentiere den Fortschritt
   - Beschreibe Herausforderungen und Lösungen
   - Führe eine Selbstüberprüfung anhand der Kriterien im Testplan durch

## Technische Anforderungen

- Verwende React 18+ und TypeScript
- Halte dich an die bestehende Projektstruktur und Konventionen
- Stelle Kompatibilität mit allen gängigen Browsern sicher
- Sorge für Barrierefreiheit (WCAG 2.1 AA)
- Beachte die Performance-Vorgaben (Lighthouse-Score > 90)

## Abnahmekriterien

Die Arbeit gilt als erfolgreich abgeschlossen, wenn:
1. Alle in der README genannten Komponenten vollständig implementiert sind
2. Der gesamte Testplan durchgeführt wurde mit akzeptabler Testabdeckung (>80%)
3. Die CI/CD-Pipeline erfolgreich eingerichtet ist und alle Tests bestehen
4. Die Komponenten in allen unterstützten Browsern korrekt funktionieren
5. Die Dokumentation vollständig und aktuell ist

## Berichterstattung

Halte in deinem Pull Request klar fest:
- Was du gemacht hast
- Welche Entscheidungen du getroffen hast und warum
- Welche Probleme aufgetreten sind und wie du sie gelöst hast
- Welcher Teil des Testplans abgedeckt wurde
- Welche nächsten Schritte geplant sind

## Wichtige Hinweise

- Qualität geht vor Geschwindigkeit
- Folge bestehenden Codemustern und -konventionen
- Teste gründlich auf verschiedenen Geräten und Browsern
- Achte besonders auf Barrierefreiheit und Benutzerfreundlichkeit

Bitte beginne mit einer Analyse des aktuellen Stands und erstelle deinen ersten Pull Request mit einem detaillierten Bericht über deine Erkenntnisse und geplanten nächsten Schritte.
