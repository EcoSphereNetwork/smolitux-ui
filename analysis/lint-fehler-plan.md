# Plan zur Behebung der Lint-Fehler

## Übersicht

Die ESLint-Prüfung hat 735 Probleme identifiziert (521 Fehler, 214 Warnungen). Um die CI/CD-Pipeline vollständig zu aktivieren, müssen diese Probleme behoben werden. Dieser Plan beschreibt die Strategie zur systematischen Behebung der Lint-Fehler.

## Kategorisierung der Fehler

Die Lint-Fehler können in folgende Kategorien eingeteilt werden:

1. **Unbenutzte Importe und Variablen** (häufigster Fehlertyp)
   - `'X' is defined but never used`
   - `'X' is assigned a value but never used`

2. **TypeScript-Typisierungsprobleme**
   - `Unexpected any. Specify a different type`
   - `The {} ("empty object") type allows any non-nullish value`

3. **Parsing-Fehler** (kritisch)
   - `')' expected`
   - `Unterminated string literal`

4. **Barrierefreiheitsprobleme**
   - `The href attribute requires a valid value to be accessible`

5. **Strukturelle Probleme**
   - `Unexpected lexical declaration in case block`

## Priorisierung

1. **Kritische Fehler zuerst beheben**
   - Parsing-Fehler, die die Kompilierung verhindern
   - Fehler in Kernkomponenten

2. **Nach Paketen vorgehen**
   - Mit @smolitux/core beginnen (Basis-Bibliothek)
   - Dann @smolitux/theme und @smolitux/utils (grundlegende Hilfspakete)
   - Anschließend die spezifischen Komponenten-Pakete

3. **Nach Fehlertypen vorgehen**
   - Zuerst unbenutzte Importe und Variablen (einfach zu beheben)
   - Dann TypeScript-Typisierungsprobleme (erfordern mehr Überlegung)
   - Schließlich strukturelle und Barrierefreiheitsprobleme

## Konkrete Schritte

### Phase 1: Kritische Fehler beheben

1. Parsing-Fehler in folgenden Dateien beheben:
   - `/workspace/smolitux-ui/packages/@smolitux/federation/src/components/ActivityStream/ActivityStream.tsx`
   - `/workspace/smolitux-ui/packages/@smolitux/federation/src/components/CrossPlatformShare/CrossPlatformShare.tsx`

### Phase 2: Kernpakete bereinigen

1. @smolitux/core
   - Unbenutzte Importe entfernen
   - TypeScript-Typisierung verbessern
   - Validierungsfunktionen korrigieren

2. @smolitux/theme
   - Unbenutzte Variablen entfernen
   - Theme-Provider optimieren

3. @smolitux/utils
   - Typisierungsprobleme beheben
   - Responsive-Funktionen verbessern

### Phase 3: Komponenten-Pakete bereinigen

1. Für jedes Paket (@smolitux/ai, @smolitux/blockchain, etc.):
   - Unbenutzte Importe entfernen
   - TypeScript-Typisierung verbessern
   - Barrierefreiheitsprobleme beheben
   - Strukturelle Probleme korrigieren

### Phase 4: ESLint-Konfiguration anpassen

1. Für bestimmte Warnungen, die nicht behoben werden können oder sollen:
   - Regeln in der ESLint-Konfiguration anpassen
   - Inline-Kommentare für spezifische Ausnahmen hinzufügen

## Automatisierung

Für die einfacheren Probleme können wir Automatisierung nutzen:

1. ESLint mit `--fix` Option für automatisch behebbare Probleme
2. Skript zur Entfernung ungenutzter Importe
3. Skript zur Verbesserung der TypeScript-Typisierung

## Tracking und Fortschritt

Der Fortschritt wird in diesem Dokument verfolgt:

- [x] Phase 1: Kritische Fehler beheben
  - [x] Parsing-Fehler in ActivityStream-Komponente behoben
  - [x] Parsing-Fehler in CrossPlatformShare-Komponente behoben

- [x] Phase 2: Kernpakete bereinigen
  - [x] @smolitux/core: Unbenutzte Importe entfernt
  - [x] @smolitux/core: TypeScript-Typisierung verbessert
  - [x] @smolitux/core: Validierungsfunktionen korrigiert
  - [ ] @smolitux/theme: Unbenutzte Variablen entfernen
  - [ ] @smolitux/theme: Theme-Provider optimieren
  - [x] @smolitux/utils: Typisierungsprobleme behoben
  - [x] @smolitux/utils: Responsive-Funktionen verbessert

- [ ] Phase 3: Komponenten-Pakete bereinigen
  - [x] @smolitux/federation: Unbenutzte Importe entfernt
  - [ ] Weitere Pakete bereinigen

- [ ] Phase 4: ESLint-Konfiguration anpassen

## Nächste Schritte

1. ✅ Phase 1 abgeschlossen: Kritische Parsing-Fehler behoben
2. ✅ @smolitux/core und @smolitux/utils bereinigt
3. ✅ @smolitux/federation teilweise bereinigt
4. Verbleibende Pakete systematisch bereinigen:
   - @smolitux/theme
   - @smolitux/ai
   - @smolitux/blockchain
   - @smolitux/community
   - @smolitux/media
5. ESLint-Konfiguration für verbleibende Warnungen anpassen