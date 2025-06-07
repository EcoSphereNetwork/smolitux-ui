# Smolitux-UI: Aktualisierte Budgetplanung mit Meilensteinen

## Aktueller Status
- **Version 0.2.2**: Abgeschlossen und veröffentlicht
- **Nächstes Ziel**: Version 0.3.0 mit Fokus auf Testabdeckung, Barrierefreiheit, Dokumentation und Sprachsteuerung

## Gesamtbudget für Version 0.3.0: 67.380 €

## Phase 1: A11y-Tests und Sprachsteuerung-Grundinfrastruktur (4 Wochen)
**Budget: 21.600 €**

### Meilenstein 1.1: A11y-Tests für Kernkomponenten (2 Wochen)
- Implementierung von A11y-Tests für ColorPicker, Dialog, Drawer, FileUpload
- Implementierung von A11y-Tests für FormControl, Menu, Modal, Pagination
- Verbesserung der ARIA-Attribute und Tastaturnavigation
- **Kosten: 8.800 €**
  - KI-Tool-Kosten: 2.400 € (160 Stunden × 15€/Stunde)
  - Personalkosten: 6.000 € (1 zusätzlicher Frontend-Entwickler, 100 Stunden × 60€/Stunde)
  - Technische Ressourcen: 400 €

### Meilenstein 1.2: Sprachsteuerung-Grundinfrastruktur und A11y-Tests (2 Wochen)
- Entwicklung der Basisarchitektur für Sprachsteuerung (@smolitux/voice-control)
- Implementierung von A11y-Tests für Layout-Komponenten
- Verbesserung der ARIA-Attribute und Tastaturnavigation
- **Kosten: 12.800 €**
  - KI-Tool-Kosten: 3.600 € (240 Stunden × 15€/Stunde)
  - Personalkosten: 8.400 € (1 zusätzlicher Frontend-Entwickler + 1 Sprachsteuerungs-Spezialist, 140 Stunden × 60€/Stunde)
  - Technische Ressourcen: 800 €

## Phase 2: Tests, Barrierefreiheit und Sprachsteuerung-Integration (5 Wochen)
**Budget: 29.600 €**

### Meilenstein 2.1: Snapshot-Tests und Web Speech API Integration (2 Wochen)
- Implementierung von Snapshot-Tests für alle Kernkomponenten
- Implementierung von Snapshot-Tests für Layout- und Diagramm-Komponenten
- Integration der Web Speech API in die Sprachsteuerung
- **Kosten: 11.800 €**
  - KI-Tool-Kosten: 3.600 € (240 Stunden × 15€/Stunde)
  - Personalkosten: 7.800 € (2 zusätzliche Frontend-Entwickler, 130 Stunden × 60€/Stunde)
  - Technische Ressourcen: 400 €

### Meilenstein 2.2: Integrationstests und Komponenten-Integration (3 Wochen)
- Implementierung von Integrationstests für komplexe Komponenten
- Implementierung von Performance-Tests für komplexe Komponenten
- Verbesserung der Barrierefreiheit für alle Komponenten
- Integration der Sprachsteuerung in ausgewählte Kernkomponenten
- **Kosten: 17.800 €**
  - KI-Tool-Kosten: 5.400 € (360 Stunden × 15€/Stunde)
  - Personalkosten: 11.700 € (2 zusätzliche Frontend-Entwickler + 1 Sprachsteuerungs-Spezialist, 195 Stunden × 60€/Stunde)
  - Technische Ressourcen: 700 €

## Phase 3: Dokumentation, Resonance-Komponenten und TensorFlow.js (5 Wochen)
**Budget: 21.180 €**

### Meilenstein 3.1: Dokumentation und TensorFlow.js Integration (3 Wochen)
- Vervollständigung der API-Dokumentation für alle Komponenten
- Erweiterung der Storybook-Integration mit Beispielen
- Erstellung von Barrierefreiheits-Richtlinien und Best Practices
- Integration von TensorFlow.js in die Sprachsteuerung
- **Kosten: 12.180 €**
  - KI-Tool-Kosten: 3.600 € (240 Stunden × 15€/Stunde)
  - Personalkosten: 7.800 € (1 Dokumentationsspezialist + 1 Sprachsteuerungs-Spezialist, 130 Stunden × 60€/Stunde)
  - Technische Ressourcen: 780 €

### Meilenstein 3.2: @smolitux/resonance-Komponenten und Finalisierung (2 Wochen)
- Implementierung von Feed-Komponenten (FeedView, FeedFilter, FeedItem)
- Implementierung von Post-Komponenten (PostView, PostInteractions)
- Implementierung von Profil-Komponenten (ProfileHeader, ProfileContent)
- Finalisierung und Integration aller Komponenten
- **Kosten: 9.000 €**
  - KI-Tool-Kosten: 2.400 € (160 Stunden × 15€/Stunde)
  - Personalkosten: 6.000 € (1 zusätzlicher Frontend-Entwickler + 1 Integrations-Spezialist, 100 Stunden × 60€/Stunde)
  - Technische Ressourcen: 600 €

## Reserve für Unvorhergesehenes und externe Dienste
**Budget: 6.000 € (ca. 10% des Gesamtbudgets)**
- Externe APIs und Services: 1.500 € (inkl. Speech Recognition APIs)
- Infrastruktur und Tools: 1.000 €
- TensorFlow.js Modelltraining: 800 €
- Unvorhergesehene Kosten: 2.700 €

## Vergleich zur ursprünglichen Planung
- **Ursprüngliches Gesamtbudget**: 247.390 € (für Version 1.0.0)
- **Vorheriges Budget für Version 0.3.0**: 55.140 € (ohne Sprachsteuerung)
- **Aktualisiertes Budget für Version 0.3.0**: 67.380 € (mit Sprachsteuerung)
- **Fokus**: Qualität, Barrierefreiheit, Sprachsteuerung und Integration mit ResonanceLink statt vollständiger Implementierung aller geplanten Komponenten
- **Zeitrahmen**: 14 Wochen (3,5 Monate) statt 36 Wochen (9 Monate)

## Vorteile der aktualisierten Planung
1. **Schnellere Markteinführung**: Version 0.3.0 in 3,5 Monaten statt Version 1.0.0 in 9 Monaten
2. **Geringere Kosten**: 67.380 € statt 247.390 €
3. **Fokus auf Qualität**: Verbesserung der Testabdeckung und Barrierefreiheit
4. **Innovative Sprachsteuerung**: Differenzierungsmerkmal gegenüber anderen UI-Bibliotheken
5. **Priorisierung wichtiger Komponenten**: Konzentration auf @smolitux/resonance für das ResonanceLink-Ökosystem
6. **Synergie zwischen Barrierefreiheit und Sprachsteuerung**: Gemeinsame Entwicklung verbessert beide Aspekte
7. **Flexibilität**: Möglichkeit, nach Version 0.3.0 basierend auf Feedback und Anforderungen anzupassen
