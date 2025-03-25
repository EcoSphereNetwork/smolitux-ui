# Nächste Schritte für die Testinfrastruktur

Dieses Dokument beschreibt die nächsten Schritte für die Testinfrastruktur der Smolitux UI-Bibliothek.

## Aktuelle Probleme

Bei der Einrichtung der Testinfrastruktur sind folgende Probleme aufgetreten:

- Abhängigkeitsprobleme mit Jest und y18n
- Möglicherweise Kompatibilitätsprobleme zwischen den verschiedenen Versionen der Testbibliotheken

## Nächste Schritte

### 1. Abhängigkeiten beheben

- Überprüfen der Versionen aller Testabhängigkeiten
- Sicherstellen, dass alle Abhängigkeiten kompatibel sind
- Möglicherweise Downgrade oder Upgrade bestimmter Pakete

### 2. Unit-Tests für Button-Komponente

- Implementierung der Unit-Tests für die Button-Komponente
- Sicherstellen, dass alle Varianten, Größen und Zustände getestet werden
- Sicherstellen, dass alle Interaktionen getestet werden

### 3. Unit-Tests für weitere Komponenten

- Implementierung der Unit-Tests für die Input-Komponente
- Implementierung der Unit-Tests für die Select-Komponente
- Implementierung der Unit-Tests für die Card-Komponente

### 4. Integrationstests

- Implementierung von Integrationstests für Komponenten, die miteinander interagieren
- Testen von Formularen mit verschiedenen Formular-Elementen
- Testen von komplexeren UI-Patterns

### 5. E2E-Tests mit Playwright

- Einrichtung von Playwright für E2E-Tests
- Implementierung von E2E-Tests für grundlegende Benutzerszenarien
- Testen der Browser-Kompatibilität

### 6. Visuelle Tests mit Chromatic

- Einrichtung von Chromatic für visuelle Tests
- Implementierung von visuellen Tests für alle Komponenten
- Testen von verschiedenen Themes und Viewport-Größen

### 7. CI/CD-Integration

- Einrichtung einer CI/CD-Pipeline mit GitHub Actions
- Automatisierte Tests bei jedem Commit und Pull Request
- Automatisierte Veröffentlichung bei Tags

## Fazit

Die Testinfrastruktur für die Smolitux UI-Bibliothek wurde eingerichtet, aber es gibt noch einige Probleme zu lösen. Die nächsten Schritte konzentrieren sich auf die Behebung dieser Probleme und die Implementierung von Tests für alle Komponenten.