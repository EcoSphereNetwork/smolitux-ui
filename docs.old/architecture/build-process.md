# Build-Prozess

Diese Dokumentation beschreibt den Build-Prozess der Smolitux-UI-Bibliothek.

## Übersicht

Der Build-Prozess von Smolitux-UI verwendet verschiedene Tools und Technologien, um die Komponenten zu kompilieren, zu bündeln und zu veröffentlichen.

## Build-Tools

### TypeScript

TypeScript wird verwendet, um statische Typisierung zu ermöglichen und den Code zu kompilieren.

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": "."
  },
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### tsup

tsup wird verwendet, um TypeScript-Code zu kompilieren und zu bündeln. Es ist eine einfache und schnelle Alternative zu Rollup und Webpack.

```json
// package.json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "build:js": "tsup src/index.ts --format cjs,esm",
    "build:types": "tsc --emitDeclarationOnly"
  }
}
```

### Lerna

Lerna wird verwendet, um das Monorepo zu verwalten und die Pakete zu veröffentlichen.

```json
// lerna.json
{
  "version": "0.2.1",
  "npmClient": "npm",
  "useWorkspaces": true,
  "packages": ["packages/*", "packages/@smolitux/*"],
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "command": {
    "publish": {
      "conventionalCommits": true,
      "yes": true
    },
    "run": {
      "stream": true
    },
    "version": {
      "message": "chore(release): publish %s",
      "conventionalCommits": true,
      "createRelease": "github"
    }
  }
}
```

### Jest

Jest wird verwendet, um Tests auszuführen.

```json
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Storybook

Storybook wird verwendet, um Komponenten zu dokumentieren und zu testen.

```json
// .storybook/main.js
module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
```

## Build-Prozess

Der Build-Prozess besteht aus mehreren Schritten:

1. **Kompilierung**: TypeScript-Code wird zu JavaScript kompiliert.
2. **Bündelung**: JavaScript-Code wird gebündelt.
3. **Typgenerierung**: TypeScript-Deklarationsdateien werden generiert.
4. **Tests**: Tests werden ausgeführt.
5. **Dokumentation**: Storybook-Dokumentation wird generiert.
6. **Veröffentlichung**: Pakete werden veröffentlicht.

### Kompilierung und Bündelung

Die Kompilierung und Bündelung erfolgt mit tsup. tsup verwendet esbuild, um den Code zu kompilieren und zu bündeln.

```bash
npm run build
```

Dieser Befehl führt `tsup src/index.ts --format cjs,esm --dts` für jedes Paket aus. Dies generiert CommonJS- und ES-Module-Bundles sowie TypeScript-Deklarationsdateien.

### Typgenerierung

Die Typgenerierung erfolgt mit TypeScript. TypeScript generiert Deklarationsdateien (`.d.ts`), die die Typen der Komponenten und Funktionen beschreiben.

```bash
npm run build:types
```

Dieser Befehl führt `tsc --emitDeclarationOnly` für jedes Paket aus. Dies generiert nur TypeScript-Deklarationsdateien, ohne JavaScript-Code zu kompilieren.

### Tests

Die Tests werden mit Jest ausgeführt.

```bash
npm test
```

Dieser Befehl führt `jest` für jedes Paket aus. Dies führt alle Tests aus und generiert einen Testbericht.

### Dokumentation

Die Dokumentation wird mit Storybook generiert.

```bash
npm run build-storybook
```

Dieser Befehl führt `storybook build` aus. Dies generiert eine statische Website mit der Storybook-Dokumentation.

### Veröffentlichung

Die Veröffentlichung erfolgt mit Lerna.

```bash
npx lerna publish
```

Dieser Befehl veröffentlicht alle Pakete auf npm. Er erhöht die Versionsnummer, erstellt Git-Tags und pusht die Änderungen.

## Continuous Integration

Die Continuous Integration erfolgt mit GitHub Actions. Die CI-Pipeline führt die folgenden Schritte aus:

1. **Checkout**: Der Code wird ausgecheckt.
2. **Setup**: Node.js wird eingerichtet.
3. **Install**: Die Abhängigkeiten werden installiert.
4. **Build**: Der Code wird gebaut.
5. **Test**: Die Tests werden ausgeführt.
6. **Lint**: Der Code wird gelinted.
7. **Storybook**: Die Storybook-Dokumentation wird gebaut.
8. **Publish**: Die Pakete werden veröffentlicht (nur bei Tags).

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm run lint
      - run: npm run build-storybook
      - if: startsWith(github.ref, 'refs/tags/')
        run: npx lerna publish from-git --yes
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Lokaler Build

Für den lokalen Build können die folgenden Befehle verwendet werden:

```bash
# Installieren der Abhängigkeiten
npm install

# Bauen aller Pakete
npm run build

# Bauen eines bestimmten Pakets
npm run build:utils
npm run build:core
npm run build:ai
npm run build:blockchain
npm run build:resonance

# Ausführen der Tests
npm test

# Ausführen von Storybook
npm run storybook
```

## Fehlerbehebung

### Problem: TypeScript-Fehler

Wenn TypeScript-Fehler auftreten, können die folgenden Schritte helfen:

1. Überprüfen Sie die tsconfig.json-Dateien.
2. Stellen Sie sicher, dass alle Abhängigkeiten installiert sind.
3. Führen Sie `tsc --noEmit` aus, um Fehler zu identifizieren.

### Problem: Build-Fehler

Wenn Build-Fehler auftreten, können die folgenden Schritte helfen:

1. Löschen Sie die node_modules-Verzeichnisse und die package-lock.json-Datei.
2. Installieren Sie die Abhängigkeiten neu.
3. Bauen Sie die Pakete in der richtigen Reihenfolge.

### Problem: Test-Fehler

Wenn Test-Fehler auftreten, können die folgenden Schritte helfen:

1. Überprüfen Sie die Jest-Konfiguration.
2. Stellen Sie sicher, dass alle Abhängigkeiten installiert sind.
3. Führen Sie `jest --verbose` aus, um detaillierte Fehlerinformationen zu erhalten.

## Fazit

Der Build-Prozess von Smolitux-UI ist darauf ausgelegt, eine modulare und erweiterbare Komponentenbibliothek zu schaffen. Durch die Verwendung moderner Build-Tools und -Technologien können wir eine effiziente und zuverlässige Bibliothek erstellen.