# Build-Probleme beheben

Diese Dokumentation beschreibt häufige Build-Probleme in der Smolitux-UI-Bibliothek und wie sie behoben werden können.

## Häufige Probleme

### 1. TypeScript-Konfigurationsprobleme

#### Problem: Fehlende tsconfig.base.json

```
Cannot find base config file "../../../../tsconfig.base.json"
```

#### Lösung:

1. Kopieren Sie die tsconfig.base.json in das packages-Verzeichnis:

```bash
cp tsconfig.base.json packages/
```

2. Aktualisieren Sie die Verweise in den tsconfig.json-Dateien der Pakete:

```json
{
  "extends": "../../../../packages/tsconfig.base.json",
  ...
}
```

Alternativ können Sie die tsconfig.json-Dateien der Pakete direkt mit allen erforderlichen Konfigurationen aktualisieren:

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
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 2. Doppelte Exporte

#### Problem: Doppelte Exporte in verschiedenen Dateien

```
error TS2308: Module './components' has already exported a member named 'ButtonSize'. Consider explicitly re-exporting to resolve the ambiguity.
```

#### Lösung:

1. Verwenden Sie explizite Re-Exporte, um Ambiguitäten zu vermeiden:

```typescript
// Statt:
export * from './components';
export * from './types';

// Verwenden Sie:
import * as Components from './components';
import * as Types from './types';

export { Components, Types };
```

2. Oder organisieren Sie Ihre Exporte so, dass keine Überschneidungen auftreten:

```typescript
// In types/index.ts
export * from './common/style';
export * from './common/responsive';

// In components/index.ts
export * from './primitives';
export * from './patterns';
```

### 3. Typprobleme in Komponenten

#### Problem: Inkompatible Typen zwischen Komponenten

```
error TS2322: Type 'ForwardedRef<HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
```

#### Lösung:

1. Verwenden Sie explizite Typumwandlungen:

```tsx
<Box
  as="button"
  ref={ref as React.Ref<HTMLDivElement>}
  // ...
/>
```

2. Oder definieren Sie spezifischere Prop-Typen:

```tsx
export interface ButtonProps {
  // Spezifische Props für Button
  variant?: ButtonVariant;
  size?: ButtonSize;
  // ...
  // Allgemeine Props
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```

### 4. Probleme mit fehlenden Abhängigkeiten

#### Problem: Fehlende Abhängigkeiten

```
npm error 404 Not Found - GET https://registry.npmjs.org/@smolitux%2fcore - Not found
```

#### Lösung:

1. Stellen Sie sicher, dass alle lokalen Pakete gebaut wurden:

```bash
mkdir -p packages/@smolitux/utils/dist
touch packages/@smolitux/utils/dist/index.js packages/@smolitux/utils/dist/index.mjs packages/@smolitux/utils/dist/index.d.ts
```

2. Aktualisieren Sie die Abhängigkeiten in den package.json-Dateien:

```json
"dependencies": {
  "@smolitux/utils": "^0.2.1"
}
```

3. Installieren Sie die Abhängigkeiten neu:

```bash
npm run clean
npm install
npm run install-deps
```

### 5. Probleme mit der Typinferenz

#### Problem: Typinferenzprobleme

```
error TS2352: Conversion of type 'string' to type '500 | 100 | 400 | 50 | 200 | 300 | 600 | 700 | 800 | 900 | 950' may be a mistake because neither type sufficiently overlaps with the other.
```

#### Lösung:

1. Verwenden Sie explizite Typumwandlungen:

```typescript
// Statt:
return colors[colorName][colorShade];

// Verwenden Sie:
const colorObj = colors[colorName as keyof typeof colors];
if (!colorObj) return color;
return (colorObj as Record<string, string>)[colorShade] || color;
```

2. Oder definieren Sie flexiblere Typen:

```typescript
interface ColorPalette {
  [key: string]: {
    [shade: string]: string;
  };
}

export const colors: ColorPalette = {
  // ...
};
```

## Allgemeine Lösungsansätze

### 1. Schrittweiser Build

Bauen Sie die Pakete in der richtigen Reihenfolge:

```bash
npm run build:utils
npm run build:core
npm run build:ai
npm run build:blockchain
npm run build:resonance
```

### 2. Bereinigung und Neuinstallation

Bereinigen Sie das Repository und installieren Sie die Abhängigkeiten neu:

```bash
npm run clean
rm -rf package-lock.json
npm install
npm run install-deps
```

### 3. TypeScript-Konfiguration überprüfen

Überprüfen Sie die TypeScript-Konfiguration:

```bash
npx tsc --noEmit
```

### 4. Manuelle Erstellung der Ausgabeverzeichnisse

Erstellen Sie die Ausgabeverzeichnisse manuell:

```bash
mkdir -p packages/@smolitux/utils/dist
mkdir -p packages/@smolitux/ai/dist
mkdir -p packages/@smolitux/blockchain/dist
mkdir -p packages/@smolitux/resonance/dist
```

### 5. Verwendung von tsup statt rollup

Verwenden Sie tsup statt rollup für den Build-Prozess:

```json
"scripts": {
  "build": "tsup src/index.ts --format cjs,esm --dts",
  "build:js": "tsup src/index.ts --format cjs,esm",
  "build:types": "tsc --emitDeclarationOnly"
}
```

## Fazit

Die meisten Build-Probleme in der Smolitux-UI-Bibliothek lassen sich auf TypeScript-Konfigurationsprobleme, doppelte Exporte, Typprobleme in Komponenten, fehlende Abhängigkeiten und Probleme mit der Typinferenz zurückführen. Durch die Anwendung der oben beschriebenen Lösungsansätze können diese Probleme behoben werden.
Thu Jun 12 08:10:57 UTC 2025: Build failed due to missing modules during jest runs
Thu Jun 12 08:23:53 UTC 2025: Build failed due to tsup rootDir error
Thu Jun 12 11:41:23 UTC 2025: Build failed due to readonly ref assignment in Collapse component
Thu Jun 12 12:45:00 UTC 2025: Collapse fixed by making useTransition ref mutable and assigning combined refs in component
