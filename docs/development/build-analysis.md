# Analyse der Build-Probleme in Smolitux-UI v0.2.1

## Identifizierte Probleme

### 1. Lerna Bootstrap-Befehl veraltet
- **Problem**: Der Befehl `lerna bootstrap` ist in neueren Versionen von Lerna (v7+) nicht mehr verfügbar.
- **Fehlermeldung**: `ERR! bootstrap The "bootstrap" command was removed by default in v7, and is no longer maintained.`
- **Ursache**: Veraltete Konfiguration in package.json, die nicht mit der aktuellen Lerna-Version kompatibel ist.

### 2. Cypress-Installation schlägt fehl
- **Problem**: Die Installation von Cypress führt zu Fehlern.
- **Fehlermeldung**: `Error: Cannot find module './lib/parse'`
- **Ursache**: Inkompatibilität zwischen Cypress und der aktuellen Node.js-Version oder fehlende Abhängigkeiten.

### 3. npmlog-Abhängigkeit fehlt
- **Problem**: Die npmlog-Abhängigkeit wird benötigt, ist aber nicht installiert.
- **Fehlermeldung**: `Error: Cannot find module '/workspace/smolitux-ui/node_modules/npmlog/lib/log.js'`
- **Ursache**: Fehlende Abhängigkeit, die von Lerna benötigt wird.

### 4. Fehlende Typendefinitionen und Module
- **Problem**: Beim Bauen der Pakete fehlen verschiedene Typendefinitionen und Module.
- **Fehlermeldungen**:
  - `Could not resolve "./layout"`
  - `Could not resolve "./form"`
  - `Could not resolve "./feedback"`
  - `Could not resolve "./navigation"`
  - `Cannot find module './components'`
  - `Cannot find module './styling'`
  - `Cannot find module './types'`
- **Ursache**: Unvollständige Projektstruktur, fehlende Dateien oder falsche Import-Pfade.

### 5. Probleme mit der tsconfig.json
- **Problem**: Die TypeScript-Konfiguration kann nicht gefunden werden.
- **Fehlermeldungen**:
  - `Cannot find base config file "../../../../tsconfig.json"`
  - `error TS5083: Cannot read file '/workspace/tsconfig.json'`
- **Ursache**: Falsche Pfade in der tsconfig.json oder fehlende Konfigurationsdateien.

### 6. Pakete nicht im npm-Registry
- **Problem**: Die Pakete sind nicht im npm-Registry verfügbar.
- **Fehlermeldung**: `npm error 404 Not Found - GET https://registry.npmjs.org/@smolitux%2fcore - Not found`
- **Ursache**: Die Pakete wurden noch nicht veröffentlicht oder sind privat.

## Fehlende Dateien und Abhängigkeiten

### Fehlende Dateien
1. `/workspace/smolitux-ui/packages/@smolitux/utils/src/types/components/layout/index.ts`
2. `/workspace/smolitux-ui/packages/@smolitux/utils/src/types/components/form/index.ts`
3. `/workspace/smolitux-ui/packages/@smolitux/utils/src/types/components/feedback/index.ts`
4. `/workspace/smolitux-ui/packages/@smolitux/utils/src/types/components/navigation/index.ts`
5. `/workspace/smolitux-ui/packages/@smolitux/utils/src/components/index.ts` (unvollständig)
6. `/workspace/smolitux-ui/packages/@smolitux/utils/src/styling/index.ts` (unvollständig)
7. `/workspace/smolitux-ui/packages/@smolitux/utils/src/types/index.ts` (unvollständig)
8. `/workspace/tsconfig.json` (falsch referenziert)

### Fehlende Abhängigkeiten
1. `npmlog` - Wird von Lerna benötigt
2. Korrekte Version von `cross-spawn` - Wird von Cypress benötigt

### Problematische Abhängigkeiten
1. `cypress` - Verursacht Installationsprobleme
2. `@percy/cypress` - Abhängig von Cypress
3. `@testing-library/cypress` - Abhängig von Cypress
4. `start-server-and-test` - Wird für Cypress-Tests verwendet