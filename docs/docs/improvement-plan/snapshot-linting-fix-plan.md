# Fix-Plan: Schnappschussdateien aktualisieren und Linting beheben

**Fix‑Plan zur Aktualisierung der Schnappschussdateien und Behebung des Lintings**

1. **Fehlerhafte Testdatei beheben**

   - Datei `packages/@smolitux/core/src/components/Toast/__tests__/Toast.spec.tsx` enthält eine komplette HTML‑Seite und keine Testlogik.
   - Datei ersetzen oder löschen und durch eine korrekte Testimplementierung ersetzen (z. B. `Toast.test.tsx`).

2. **Abhängigkeiten aktualisieren**

   - In `package.json` im Root-Verzeichnis folgende devDependencies ergänzen:
     ```json
     "eslint-scope": "^8.3.0",
     "pretty-format": "^29.7.0"
     ```
   - Anschließend alle Pakete neu installieren: `yarn install` oder `npm install`.

3. **Node-Module-Probleme beheben**

   - Falls `node_modules/eslint` oder `node_modules/jest-cli` unvollständig sind, `rm -rf node_modules` ausführen und die Abhängigkeiten komplett neu installieren.

4. **.prettierignore optimieren**

   - Nach Reparatur von `Toast.spec.tsx` prüfen, welche Dateien noch Probleme verursachen:
     ```
     packages/@smolitux/charts/src/components/ScatterPlot/ScatterPlot.old.tsx
     packages/@smolitux/core/src/components/Menu/__tests__/Menu.spec.tsx
     packages/@smolitux/core/src/components/Menu/__tests__/Menu.test.original.tsx
     packages/@smolitux/core/src/components/RadioGroup/__tests__/RadioGroup.spec.tsx
     packages/@smolitux/core/src/components/RadioGroup/__tests__/RadioGroup.test.tsx
     packages/@smolitux/core/src/components/Skeleton/__tests__/Skeleton.spec.tsx
     packages/@smolitux/core/src/components/Toast/__tests__/Toast.spec.tsx (nach Fix entfernen)
     ```
   - Nur Dateien mit dauerhaft ungültigen Fragmenten in `.prettierignore` belassen.

5. **Linting-Fehler beheben**

   - Mit `npm run lint` bzw. `npm run lint:fix` alle Pakete prüfen.
   - Linting-Warnungen oder Fehler schrittweise korrigieren (Imports, Typen, Formatierung).
   - Bei Versionskonflikten (eslint 8 vs. 9) eine einheitliche Version definieren.

6. **Schnappschüsse aktualisieren**

   - Nach der Installation der Abhängigkeiten und erfolgreichem Linting:
     `npm run test:update-snapshots` ausführen.
   - Dadurch werden alle vorhandenen Snapshot-Dateien unter `__tests__/__snapshots__` aktualisiert.

7. **Testlauf validieren**

   - `npm run test` ausführen.
   - Falls weitere Schnappschüsse fehlen oder Tests fehlschlagen, erneut `npm run test:update-snapshots` aufrufen und Fehler korrigieren.

8. **Formatierung sicherstellen**

   - `npm run format` ausführen und alle Änderungen committen.
   - Bei Bedarf `npm run format:check` in CI integrieren.

9. **Empfehlungen für zukünftige Tests & Formatierungen**
   - Snapshot-Tests regelmäßig mit `npm run test:update-snapshots` aktualisieren.
   - Linting und Formatierung als pre-commit Hooks (z. B. mit `husky`/`lint-staged`) einrichten.
   - Größere HTML-Dateien oder generierte Testdaten als Fixtures ablegen und nicht in Testdateien einbetten.

Dieser Plan führt zu konsistenten Abhängigkeiten, repariert die fehlerhafte Testdatei und sorgt dafür, dass Formatierung, Linting und Tests wieder ohne Fehler laufen.
