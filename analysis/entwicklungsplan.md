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
- ⬜ Verbleibende Parsing-Fehler in anderen Komponenten identifizieren und beheben

### Phase 2: Kernpakete bereinigen (Priorität: Hoch)

- ⬜ @smolitux/core
  - Unbenutzte Importe entfernen
  - TypeScript-Typisierung verbessern (any durch spezifische Typen ersetzen)
  - Validierungsfunktionen korrigieren

- ⬜ @smolitux/theme
  - Unbenutzte Variablen entfernen
  - Theme-Provider optimieren

- ⬜ @smolitux/utils
  - Typisierungsprobleme beheben
  - Responsive-Funktionen verbessern

### Phase 3: Komponenten-Pakete bereinigen (Priorität: Mittel)

Für jedes Paket (@smolitux/ai, @smolitux/blockchain, etc.):
- ⬜ Unbenutzte Importe entfernen
- ⬜ TypeScript-Typisierung verbessern
- ⬜ Barrierefreiheitsprobleme beheben
- ⬜ Strukturelle Probleme korrigieren

### Phase 4: ESLint-Konfiguration anpassen (Priorität: Niedrig)

- ⬜ Regeln in der ESLint-Konfiguration anpassen
- ⬜ Inline-Kommentare für spezifische Ausnahmen hinzufügen

## 2. Komponententests vervollständigen

### Phase 1: Testinfrastruktur einrichten (Priorität: Hoch)

- ⬜ Testumgebung überprüfen und ggf. aktualisieren
- ⬜ Test-Utilities für häufige Testfälle erstellen
- ⬜ Mocks für externe Abhängigkeiten erstellen

### Phase 2: Unit-Tests für Basiskomponenten (Priorität: Hoch)

- ⬜ Identifizieren von Komponenten ohne Tests oder mit unzureichender Testabdeckung
- ⬜ Unit-Tests für Basiskomponenten in @smolitux/core implementieren
- ⬜ Testabdeckung für jede Komponente überprüfen (Ziel: >80%)

### Phase 3: Integrationstests für komplexe Komponenten (Priorität: Mittel)

- ⬜ Integrationstests für komplexe Komponenten implementieren
- ⬜ Interaktionen zwischen Komponenten testen
- ⬜ Edge Cases und Fehlerszenarien abdecken

### Phase 4: Spezielle Komponententests (Priorität: Mittel)

- ⬜ Barrierefreiheitstests implementieren
- ⬜ Performance-Tests für kritische Komponenten
- ⬜ Visuelle Regressionstests

## 3. Barrierefreiheit verbessern

### Phase 1: Barrierefreiheits-Audit (Priorität: Hoch)

- ⬜ Alle Komponenten auf Barrierefreiheit prüfen
- ⬜ Probleme nach Schweregrad kategorisieren
- ⬜ Priorisierte Liste von zu verbessernden Komponenten erstellen

### Phase 2: Basiskomponenten verbessern (Priorität: Hoch)

- ✅ Toast-Komponente (bereits verbessert)
- ⬜ Button-Komponente
- ⬜ Input-Komponente
- ⬜ Select-Komponente
- ⬜ Checkbox-Komponente
- ⬜ Radio-Komponente

### Phase 3: Komplexe Komponenten verbessern (Priorität: Mittel)

- ⬜ Modal-Komponente
- ⬜ Dropdown-Komponente
- ⬜ Tabs-Komponente
- ⬜ Table-Komponente
- ⬜ Form-Komponente

### Phase 4: Barrierefreiheits-Dokumentation (Priorität: Mittel)

- ✅ Toast-Komponente (bereits dokumentiert)
- ⬜ Barrierefreiheits-Dokumentation für alle Komponenten erstellen
- ⬜ Best Practices für Entwickler dokumentieren

## 4. Dokumentation vereinheitlichen

### Phase 1: Dokumentationsstandard definieren (Priorität: Hoch)

- ⬜ Einheitliche Struktur für Komponentendokumentation festlegen
- ⬜ Dokumentationsvorlage erstellen
- ⬜ Style Guide für Dokumentation erstellen

### Phase 2: Basiskomponenten dokumentieren (Priorität: Hoch)

- ✅ Toast-Komponente (bereits dokumentiert)
- ⬜ Button-Komponente
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

1. Mit Phase 1 der Lint-Fehler-Behebung beginnen
2. Parallel dazu das Barrierefreiheits-Audit durchführen
3. Dokumentationsstandard definieren
4. Testinfrastruktur überprüfen und aktualisieren

## Zeitplan

- **Woche 1**: Lint-Fehler beheben, Barrierefreiheits-Audit, Dokumentationsstandard
- **Woche 2**: Basiskomponenten verbessern und dokumentieren, Unit-Tests implementieren
- **Woche 3**: Komplexe Komponenten verbessern und dokumentieren, Integrationstests implementieren
- **Woche 4**: Spezielle Tests, Storybook-Integration, finale Überprüfung