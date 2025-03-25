#!/bin/bash

# Erstelle Hauptverzeichnis für Monorepo
mkdir -p resonance-ui

# Wechsle in das Hauptverzeichnis
cd resonance-ui

# Initialisiere npm package
npm init -y

# Installiere Lerna für Monorepo-Management
npm install -D lerna

# Erstelle Lerna-Konfigurationsdatei
cat > lerna.json << 'EOL'
{
  "version": "0.1.0",
  "npmClient": "npm",
  "useWorkspaces": true,
  "packages": ["packages/*"],
  "command": {
    "publish": {
      "conventionalCommits": true,
      "yes": true
    }
  }
}
EOL

# Aktualisiere package.json für Workspaces
cat > package.json << 'EOL'
{
  "name": "resonance-ui-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "storybook": "cd packages/docs && npm run storybook",
    "dev": "cd packages/playground && npm run dev"
  },
  "devDependencies": {
    "lerna": "^6.6.2"
  }
}
EOL

# Erstelle Verzeichnisse für die Pakete
mkdir -p packages/@resonance/core/src/{components,hooks,contexts,utils}
mkdir -p packages/@resonance/theme/src/{light,dark}
mkdir -p packages/@resonance/icons/src
mkdir -p packages/@resonance/layout/src
mkdir -p packages/@resonance/charts/src
mkdir -p packages/@resonance/types
mkdir -p packages/docs/storybook
mkdir -p packages/playground/src

# Erstelle README.md
cat > README.md << 'EOL'
# Resonance UI

Eine moderne React-Komponentenbibliothek für die einheitliche Gestaltung von MVPs.

## Pakete

- **@resonance/core**: Grundlegende UI-Komponenten
- **@resonance/theme**: Theming und Styling
- **@resonance/icons**: Icon-Bibliothek
- **@resonance/layout**: Layout-Komponenten
- **@resonance/charts**: Diagramm-Komponenten
- **@resonance/types**: Gemeinsame TypeScript-Typen

## Entwicklung

```bash
# Abhängigkeiten installieren
npm run bootstrap

# Entwicklungsserver starten (Playground)
npm run dev

# Storybook starten
npm run storybook
```

## Build

```bash
# Alle Pakete bauen
npm run build
```
EOL

# Erstelle package.json für core
cat > packages/@resonance/core/package.json << 'EOL'
{
  "name": "@resonance/core",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
EOL

# Erstelle package.json für theme
cat > packages/@resonance/theme/package.json << 'EOL'
{
  "name": "@resonance/theme",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
EOL

# Erstelle die restlichen package.json-Dateien (ähnlich wie oben, angepasst an die jeweiligen Pakete)

# Erstelle eine Root-Konfiguration für TypeScript
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@resonance/core": ["packages/@resonance/core/src"],
      "@resonance/theme": ["packages/@resonance/theme/src"],
      "@resonance/icons": ["packages/@resonance/icons/src"],
      "@resonance/layout": ["packages/@resonance/layout/src"],
      "@resonance/charts": ["packages/@resonance/charts/src"],
      "@resonance/types": ["packages/@resonance/types"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
EOL

# Erstelle eine .gitignore-Datei
cat > .gitignore << 'EOL'
node_modules
dist
.DS_Store
.env
.env.*
*.log
coverage
EOL

echo "Monorepo-Struktur für Resonance UI wurde erstellt."
