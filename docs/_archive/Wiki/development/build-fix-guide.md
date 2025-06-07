# Anleitung zur Behebung der Build-Probleme in Smolitux-UI

Diese Anleitung beschreibt Schritt für Schritt, wie die identifizierten Build-Probleme in der Smolitux-UI-Bibliothek behoben werden können.

## Voraussetzungen

- Node.js v16+ installiert
- Git installiert
- Zugriff auf das Smolitux-UI-Repository

## Schritt 1: Repository klonen und Branch erstellen

```bash
git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
cd smolitux-ui
git checkout -b fix/build-process
```

## Schritt 2: package.json aktualisieren

Öffnen Sie die Datei `package.json` im Root-Verzeichnis und aktualisieren Sie die Scripts-Sektion:

```json
"scripts": {
  "install-deps": "lerna exec -- npm install",
  "clean": "lerna clean --yes",
  "build": "lerna run build --no-bail",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --ci --coverage",
  "test:update-snapshots": "jest --updateSnapshot",
  "test:e2e": "playwright test",
  "lint": "lerna run lint",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "dev": "cd packages/playground && npm run dev"
}
```

Entfernen Sie problematische Abhängigkeiten aus der devDependencies-Sektion:

```bash
npm uninstall cypress @percy/cypress @testing-library/cypress start-server-and-test
```

## Schritt 3: Zentrale TypeScript-Konfiguration erstellen

Erstellen Sie eine zentrale `tsconfig.json` im Root-Verzeichnis:

```json
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
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "."
  },
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

## Schritt 4: Paket-spezifische TypeScript-Konfigurationen aktualisieren

Aktualisieren Sie die `tsconfig.json` in jedem Paket, um auf die zentrale Konfiguration zu verweisen. Beispiel für `packages/@smolitux/utils/tsconfig.json`:

```json
{
  "extends": "../../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

## Schritt 5: Fehlende Dateien erstellen

### 1. Erstellen Sie die fehlenden Komponenten-Typen-Dateien:

```bash
mkdir -p packages/@smolitux/utils/src/types/components/{layout,form,feedback,navigation}
```

Erstellen Sie `packages/@smolitux/utils/src/types/components/layout/index.ts`:

```typescript
// Layout component types
export interface LayoutProps {
  children: React.ReactNode;
}
```

Erstellen Sie `packages/@smolitux/utils/src/types/components/form/index.ts`:

```typescript
// Form component types
export interface FormProps {
  children: React.ReactNode;
}
```

Erstellen Sie `packages/@smolitux/utils/src/types/components/feedback/index.ts`:

```typescript
// Feedback component types
export interface FeedbackProps {
  children: React.ReactNode;
}
```

Erstellen Sie `packages/@smolitux/utils/src/types/components/navigation/index.ts`:

```typescript
// Navigation component types
export interface NavigationProps {
  children: React.ReactNode;
}
```

### 2. Überprüfen Sie die Komponenten-Index-Datei:

Stellen Sie sicher, dass `packages/@smolitux/utils/src/components/index.ts` korrekt ist:

```typescript
// Basic component utilities
export * from './primitives';

// Common component patterns
export * from './patterns';
```

### 3. Erstellen Sie die fehlende Styling-Index-Datei:

Erstellen Sie `packages/@smolitux/utils/src/styling/index.ts`:

```typescript
// Styling utilities
export * from './theme';
export * from './colors';
export * from './spacing';
```

Erstellen Sie die referenzierten Dateien, falls sie nicht existieren:

```bash
mkdir -p packages/@smolitux/utils/src/styling/{theme,colors,spacing}
```

Erstellen Sie `packages/@smolitux/utils/src/styling/theme/index.ts`:

```typescript
// Theme utilities
export const defaultTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    success: '#10b981',
  },
};
```

Erstellen Sie `packages/@smolitux/utils/src/styling/colors/index.ts`:

```typescript
// Color utilities
export const colors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  success: '#10b981',
};
```

Erstellen Sie `packages/@smolitux/utils/src/styling/spacing/index.ts`:

```typescript
// Spacing utilities
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};
```

### 4. Erstellen Sie die fehlende Types-Index-Datei:

Erstellen Sie `packages/@smolitux/utils/src/types/index.ts`:

```typescript
// Type utilities
export * from './components';
export * from './theme';
export * from './common';
```

Erstellen Sie die referenzierten Dateien, falls sie nicht existieren:

```bash
mkdir -p packages/@smolitux/utils/src/types/{theme,common}
```

Erstellen Sie `packages/@smolitux/utils/src/types/theme/index.ts`:

```typescript
// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    warning: string;
    info: string;
    success: string;
  };
}
```

Erstellen Sie `packages/@smolitux/utils/src/types/common/index.ts`:

```typescript
// Common types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type ColorScheme = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
```

## Schritt 6: Abhängigkeiten installieren

Installieren Sie die fehlende npmlog-Abhängigkeit:

```bash
npm install npmlog --save-dev
```

## Schritt 7: Build-Prozess testen

Führen Sie den Build-Prozess aus:

```bash
npm run build
```

## Schritt 8: Änderungen committen und pushen

```bash
git add .
git commit -m "Fix: Resolve build process issues"
git push origin fix/build-process
```

## Schritt 9: Pull Request erstellen

Erstellen Sie einen Pull Request auf GitHub, um Ihre Änderungen in den Hauptbranch zu integrieren.

## Fehlerbehebung

### Problem: Lerna-Befehle schlagen fehl

Versuchen Sie, Lerna global zu installieren:

```bash
npm install -g lerna
```

### Problem: TypeScript-Kompilierungsfehler

Überprüfen Sie die TypeScript-Konfiguration und stellen Sie sicher, dass alle Pfade korrekt sind:

```bash
npx tsc --noEmit
```

### Problem: Jest-Tests schlagen fehl

Aktualisieren Sie die Jest-Konfiguration:

```bash
npm install --save-dev jest-environment-jsdom
```

Und aktualisieren Sie `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  // ...
};
```

## Nächste Schritte

Nach der Behebung der Build-Probleme sollten Sie:

1. Die Testabdeckung erhöhen
2. Die Dokumentation aktualisieren
3. Eine neue Version veröffentlichen

Siehe den [Verbesserungsplan](./improvement-plan.md) für weitere Details.