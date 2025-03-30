# Entwicklungsplan für Smolitux UI

## Übersicht

Dieser Plan beschreibt die systematische Weiterentwicklung der Smolitux UI Bibliothek mit Fokus auf:

1. Behebung von Lint-Fehlern
2. Vervollständigung der Komponententests
3. Verbesserung der Barrierefreiheit
4. Vereinheitlichung der Dokumentation

## 1. Lint-Fehler beheben

Basierend auf dem bereits erstellten Plan zur Behebung der Lint-Fehler werden wir systematisch vorgehen:

### Phase 1: Kritische Fehler beheben (Priorität: Hoch)

- ✅ Parsing-Fehler in ActivityStream-Komponente
- ✅ Parsing-Fehler in CrossPlatformShare-Komponente
- ✅ Parsing-Fehler in FormField.tsx
- ✅ Parsing-Fehler in Toast/__tests__/Toast.spec.tsx

### Phase 2: Kernpakete bereinigen (Priorität: Hoch)

- ✅ @smolitux/core
  - ✅ Unbenutzte Importe entfernen
  - ✅ TypeScript-Typisierung verbessern (any durch spezifische Typen ersetzen)
  - ✅ Validierungsfunktionen korrigieren

- ✅ @smolitux/theme
  - ✅ Unbenutzte ThemeMode-Import entfernt
  - ✅ Unbenutzte themeMode-Parameter entfernt

- ✅ @smolitux/utils
  - ✅ Typisierungsprobleme beheben
  - ✅ Responsive-Funktionen verbessern

### Phase 3: Komponenten-Pakete bereinigen (Priorität: Mittel)

Für jedes Paket (@smolitux/ai, @smolitux/blockchain, etc.):
- ✅ @smolitux/federation: Unbenutzte Importe entfernen
- ✅ @smolitux/layout: Unbenutzte Variablen entfernen
- ✅ @smolitux/ai: Lint-Fehler behoben
  - ✅ Unbenutzte useEffect-Importe entfernt
  - ✅ Unbenutzte TabView-Importe entfernt
  - ✅ any durch unknown in Record-Typen ersetzt
  - ✅ Unbenutzte threshold-Variable entfernt
  - ✅ Test-Imports korrigiert
- ⬜ @smolitux/blockchain: Lint-Fehler beheben
- ⬜ @smolitux/charts: Lint-Fehler beheben
- ⬜ @smolitux/media: Lint-Fehler beheben
- ⬜ @smolitux/resonance: Lint-Fehler beheben

### Phase 4: ESLint-Konfiguration anpassen (Priorität: Niedrig)

- ⬜ Regeln in der ESLint-Konfiguration anpassen
- ⬜ Inline-Kommentare für spezifische Ausnahmen hinzufügen

## 2. Komponententests vervollständigen

### Phase 1: Testinfrastruktur einrichten (Priorität: Hoch)

- ⬜ Testumgebung überprüfen und ggf. aktualisieren
- ⬜ Test-Utilities für häufige Testfälle erstellen
- ⬜ Mocks für externe Abhängigkeiten erstellen

### Phase 2: Unit-Tests für Basiskomponenten (Priorität: Hoch)

- ✅ Identifizieren von Komponenten ohne Tests oder mit unzureichender Testabdeckung
- ✅ Unit-Tests für Button.A11y-Komponente implementiert
- ✅ Unit-Tests für InputA11y-Komponente implementiert
- ⬜ Unit-Tests für weitere Basiskomponenten in @smolitux/core implementieren
- ⬜ Testabdeckung für jede Komponente überprüfen (Ziel: >80%)

### Phase 3: Integrationstests für komplexe Komponenten (Priorität: Mittel)

- ⬜ Integrationstests für komplexe Komponenten implementieren
- ⬜ Interaktionen zwischen Komponenten testen
- ⬜ Edge Cases und Fehlerszenarien abdecken

### Phase 4: Spezielle Komponententests (Priorität: Mittel)

- ✅ Barrierefreiheitstests für Button.A11y implementiert
- ✅ Barrierefreiheitstests für InputA11y implementiert
- ⬜ Barrierefreiheitstests für weitere Komponenten implementieren
- ⬜ Performance-Tests für kritische Komponenten
- ⬜ Visuelle Regressionstests

## 3. Barrierefreiheit verbessern

### Phase 1: Barrierefreiheits-Audit (Priorität: Hoch)

- ⬜ Alle Komponenten auf Barrierefreiheit prüfen
- ⬜ Probleme nach Schweregrad kategorisieren
- ⬜ Priorisierte Liste von zu verbessernden Komponenten erstellen

### Phase 2: Basiskomponenten verbessern (Priorität: Hoch)

- ✅ Toast-Komponente (bereits verbessert)
- ✅ Button-Komponente (Button.A11y-Komponente implementiert)
- ✅ Input-Komponente (InputA11y-Komponente implementiert)
- ✅ Select-Komponente (SelectA11y-Komponente implementiert)
- ✅ Flex-Komponente (FlexA11y-Komponente implementiert)
- ✅ Zoom-Komponente (ZoomA11y-Komponente implementiert)

### Phase 3: Komplexe Komponenten verbessern (Priorität: Mittel)

- ✅ Dropdown-Komponente (DropdownA11y-Komponente implementiert)
- ⬜ Tabs-Komponente
- ⬜ Accordion-Komponente
- ⬜ Toast-Komponente
- ⬜ Tooltip-Komponente
- ⬜ Radio-Komponente
- ⬜ Slider-Komponente

### Phase 4: Barrierefreiheits-Dokumentation (Priorität: Mittel)

- ✅ Toast-Komponente (bereits dokumentiert)
- ✅ Button-Komponente (Barrierefreiheits-Dokumentation erstellt)
- ✅ Allgemeine A11y-Komponenten-Dokumentation erstellt
- ✅ Komponentenstatus mit A11y-Komponenten aktualisiert
- ✅ Dropdown-Dokumentation mit DropdownA11y-Informationen aktualisiert
- ⬜ Barrierefreiheits-Dokumentation für weitere Komponenten erstellen
- ⬜ Best Practices für Entwickler dokumentieren

## 4. Dokumentation vereinheitlichen

### Phase 1: Dokumentationsstandard definieren (Priorität: Hoch)

- ⬜ Einheitliche Struktur für Komponentendokumentation festlegen
- ⬜ Dokumentationsvorlage erstellen
- ⬜ Style Guide für Dokumentation erstellen

### Phase 2: Basiskomponenten dokumentieren (Priorität: Hoch)

- ✅ Toast-Komponente (bereits dokumentiert)
- ✅ Button-Komponente (Barrierefreiheits-Dokumentation erstellt)
- ⬜ Input-Komponente
- ⬜ Select-Komponente
- ⬜ Checkbox-Komponente
- ⬜ Radio-Komponente

### Phase 3: Komplexe Komponenten dokumentieren (Priorität: Mittel)

- ⬜ Modal-Komponente
- ⬜ Dropdown-Komponente
- ⬜ Tabs-Komponente
- ⬜ Table-Komponente
- ⬜ Form-Komponente

### Phase 4: Storybook-Integration (Priorität: Mittel)

- ⬜ Storybook-Konfiguration überprüfen und aktualisieren
- ⬜ Stories für alle Komponenten erstellen oder aktualisieren
- ⬜ Interaktive Beispiele hinzufügen

## Nächste Schritte

1. ✅ Phase 1 der Lint-Fehler-Behebung abgeschlossen
2. ✅ Phase 2 der Lint-Fehler-Behebung für @smolitux/core, @smolitux/theme und @smolitux/utils abgeschlossen
3. ✅ Phase 3 der Lint-Fehler-Behebung für @smolitux/federation, @smolitux/layout und @smolitux/ai abgeschlossen
4. ✅ Barrierefreiheit für Button, Input, Select, Dropdown, Flex und Zoom verbessert
5. ✅ Tests für barrierefreie Komponenten implementiert
6. ✅ Dokumentation für barrierefreie Komponenten erstellt
7. ⬜ Verbleibende Lint-Fehler in anderen Paketen beheben
8. ⬜ Weitere barrierefreie Komponenten implementieren
9. ⬜ Barrierefreiheits-Audit für weitere Komponenten durchführen
10. ⬜ Testinfrastruktur weiter verbessern

## Zeitplan

- **Woche 1-2 (abgeschlossen)**: 
  - ✅ Kritische Lint-Fehler behoben
  - ✅ Lint-Fehler in @smolitux/core, @smolitux/theme und @smolitux/utils behoben
  - ✅ Barrierefreiheit für Button und Input verbessert
  - ✅ Tests für barrierefreie Komponenten implementiert
  - ✅ Dokumentation für Button-Komponente erstellt

- **Woche 3-4 (abgeschlossen)**: 
  - ✅ Lint-Fehler in @smolitux/federation, @smolitux/layout und @smolitux/ai behoben
  - ✅ Barrierefreiheit für Select, Dropdown, Flex und Zoom verbessert
  - ✅ Tests für weitere barrierefreie Komponenten implementiert
  - ✅ Allgemeine A11y-Komponenten-Dokumentation erstellt
  - ✅ Komponentenstatus mit A11y-Komponenten aktualisiert

- **Woche 5 (aktuell)**: 
  - ⬜ Lint-Fehler in @smolitux/blockchain beheben
  - ⬜ Lint-Fehler in @smolitux/charts beheben
  - ⬜ TabsA11y-Komponente implementieren
  - ⬜ AccordionA11y-Komponente implementieren
  - ⬜ Dokumentation für weitere barrierefreie Komponenten erstellen

- **Woche 6 (geplant)**: 
  - ⬜ Lint-Fehler in @smolitux/media beheben
  - ⬜ Lint-Fehler in @smolitux/resonance beheben
  - ⬜ ToastA11y-Komponente implementieren
  - ⬜ TooltipA11y-Komponente implementieren
  - ⬜ Automatisierte Barrierefreiheitstests implementieren

- **Woche 7 (geplant)**: 
  - ⬜ RadioA11y-Komponente implementieren
  - ⬜ SliderA11y-Komponente implementieren
  - ⬜ E2E-Tests mit Cypress oder Playwright implementieren
  - ⬜ Visuelle Regressionstests implementieren
  - ⬜ Finale Überprüfung und Dokumentation