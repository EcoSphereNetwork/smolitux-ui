# Entwicklungsanleitung

Diese Anleitung beschreibt den Entwicklungsworkflow und Best Practices für die Smolitux UI Bibliothek.

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js (v18 oder höher)
- Yarn (v1.22 oder höher)
- Git

### Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/EcoSphereNetwork/smolitux-ui.git
   cd smolitux-ui
   ```

2. Abhängigkeiten installieren:
   ```bash
   yarn install
   ```

3. Entwicklungsserver starten:
   ```bash
   yarn dev
   ```

## Projektstruktur

```
smolitux-ui/
├── docs/                  # Dokumentation
├── packages/              # Monorepo-Pakete
│   ├── @smolitux/core/    # Kernkomponenten
│   ├── @smolitux/charts/  # Diagramm-Komponenten
│   ├── @smolitux/layout/  # Layout-Komponenten
│   └── @smolitux/theme/   # Theming-System
├── examples/              # Beispielanwendungen
├── scripts/               # Build- und Entwicklungsskripte
└── .storybook/            # Storybook-Konfiguration
```

## Komponenten entwickeln

### Neue Komponente erstellen

1. Erstelle einen neuen Ordner für die Komponente:
   ```bash
   mkdir -p packages/@smolitux/core/src/components/MyComponent
   ```

2. Erstelle die Komponenten-Dateien:
   ```bash
   touch packages/@smolitux/core/src/components/MyComponent/MyComponent.tsx
   touch packages/@smolitux/core/src/components/MyComponent/index.ts
   ```

3. Implementiere die Komponente:
   ```tsx
   // MyComponent.tsx
   import React from 'react';

   export interface MyComponentProps {
     /** Beschreibung der Prop */
     label?: string;
     /** Weitere Props... */
   }

   export const MyComponent: React.FC<MyComponentProps> = ({
     label = 'Default',
     ...props
   }) => {
     return (
       <div className="my-component" {...props}>
         {label}
       </div>
     );
   };
   ```

4. Erstelle den Export in der index.ts:
   ```tsx
   // index.ts
   export { MyComponent } from './MyComponent';
   export type { MyComponentProps } from './MyComponent';

   // Für Abwärtskompatibilität
   export { MyComponent as default } from './MyComponent';
   ```

5. Füge die Komponente zum Hauptexport hinzu:
   ```tsx
   // packages/@smolitux/core/src/components/index.tsx
   export * from './MyComponent';
   ```

### Tests schreiben

1. Erstelle einen Test-Ordner:
   ```bash
   mkdir -p packages/@smolitux/core/src/components/MyComponent/__tests__
   ```

2. Erstelle Unit-Tests:
   ```bash
   touch packages/@smolitux/core/src/components/MyComponent/__tests__/MyComponent.test.tsx
   ```

3. Implementiere die Tests:
   ```tsx
   // MyComponent.test.tsx
   import React from 'react';
   import { render, screen } from '@testing-library/react';
   import { MyComponent } from '../MyComponent';

   describe('MyComponent', () => {
     it('renders with default props', () => {
       render(<MyComponent />);
       expect(screen.getByText('Default')).toBeInTheDocument();
     });

     it('renders with custom label', () => {
       render(<MyComponent label="Custom Label" />);
       expect(screen.getByText('Custom Label')).toBeInTheDocument();
     });
   });
   ```

4. Erstelle Snapshot-Tests:
   ```bash
   touch packages/@smolitux/core/src/components/MyComponent/__tests__/MyComponent.spec.tsx
   ```

5. Implementiere die Snapshot-Tests:
   ```tsx
   // MyComponent.spec.tsx
   import React from 'react';
   import { render } from '@testing-library/react';
   import { MyComponent } from '../MyComponent';

   describe('MyComponent Snapshots', () => {
     it('renders correctly with default props', () => {
       const { asFragment } = render(<MyComponent />);
       expect(asFragment()).toMatchSnapshot();
     });

     it('renders correctly with custom props', () => {
       const { asFragment } = render(<MyComponent label="Custom" />);
       expect(asFragment()).toMatchSnapshot();
     });
   });
   ```

### Storybook-Beispiele erstellen

1. Erstelle eine Story-Datei:
   ```bash
   touch packages/@smolitux/core/src/components/MyComponent/MyComponent.stories.tsx
   ```

2. Implementiere die Stories:
   ```tsx
   // MyComponent.stories.tsx
   import React from 'react';
   import { Meta, StoryObj } from '@storybook/react';
   import { MyComponent } from './MyComponent';

   const meta: Meta<typeof MyComponent> = {
     title: 'Core/MyComponent',
     component: MyComponent,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
   };

   export default meta;
   type Story = StoryObj<typeof MyComponent>;

   export const Default: Story = {
     args: {},
   };

   export const WithCustomLabel: Story = {
     args: {
       label: 'Benutzerdefiniertes Label',
     },
   };
   ```

## Code-Qualität

### Linting und Formatierung

```bash
# Linting ausführen
yarn lint

# Formatierung ausführen
yarn format

# Typen prüfen
yarn typecheck
```

### Performance-Optimierung

- Verwende `useMemo` für berechnete Werte:
  ```tsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

- Verwende `useCallback` für Event-Handler:
  ```tsx
  const handleClick = useCallback(() => {
    // Handler-Logik
  }, [dependency]);
  ```

- Verwende `React.memo` für Komponenten, die sich selten ändern:
  ```tsx
  const MemoizedComponent = React.memo(MyComponent);
  ```

## Tests ausführen

```bash
# Alle Tests ausführen
yarn test

# Tests mit Coverage ausführen
yarn test:coverage

# Tests im Watch-Modus ausführen
yarn test:watch
```

## Dokumentation

### Lokale Dokumentation starten

```bash
# Dokumentation lokal starten
cd docs
yarn start
```

### Komponenten dokumentieren

- Verwende JSDoc-Kommentare für Props:
  ```tsx
  export interface ButtonProps {
    /** Die Variante des Buttons */
    variant?: 'primary' | 'secondary' | 'ghost';
    
    /** Die Größe des Buttons */
    size?: 'sm' | 'md' | 'lg';
    
    /** Wird ausgelöst, wenn der Button geklickt wird */
    onClick?: () => void;
  }
  ```

## Git-Workflow

1. Feature-Branch erstellen:
   ```bash
   git checkout -b feature/neue-komponente
   ```

2. Änderungen committen:
   ```bash
   git add .
   git commit -m "feat: Neue Komponente hinzugefügt"
   ```

3. Änderungen pushen:
   ```bash
   git push origin feature/neue-komponente
   ```

4. Pull Request erstellen

## Veröffentlichung

### Versionierung

Die Bibliothek folgt der [Semantic Versioning](https://semver.org/)-Spezifikation:

- **MAJOR**: Inkompatible API-Änderungen
- **MINOR**: Funktionen hinzufügen (abwärtskompatibel)
- **PATCH**: Bugfixes (abwärtskompatibel)

### Release-Prozess

1. Version erhöhen:
   ```bash
   yarn version:bump
   ```

2. Changelog aktualisieren:
   ```bash
   yarn changelog
   ```

3. Release erstellen:
   ```bash
   yarn release
   ```

## Best Practices

### Komponenten-Design

1. **Einfachheit**: Halte Komponenten einfach und fokussiert auf einen Zweck
2. **Komposition**: Bevorzuge Komposition über Vererbung
3. **Konsistenz**: Halte dich an bestehende Muster und Konventionen
4. **Barrierefreiheit**: Implementiere ARIA-Attribute und Keyboard-Navigation
5. **Responsivität**: Stelle sicher, dass Komponenten auf allen Bildschirmgrößen funktionieren

### Performance

1. **Memoization**: Verwende useMemo und useCallback für teure Berechnungen
2. **Lazy Loading**: Lade Komponenten bei Bedarf
3. **Code-Splitting**: Teile den Code in kleinere Chunks
4. **Bundle-Größe**: Halte die Bundle-Größe klein
5. **Rendering-Optimierung**: Vermeide unnötige Renderings

### Dokumentation

1. **API-Referenz**: Dokumentiere alle Props und ihre Verwendung
2. **Beispiele**: Füge Beispiele für häufige Anwendungsfälle hinzu
3. **Storybook**: Erstelle interaktive Beispiele mit Storybook
4. **Kommentare**: Kommentiere komplexe Logik im Code
5. **Änderungsprotokoll**: Halte das Änderungsprotokoll aktuell

### Menu-Komponenten

- Nutze `Tab` und `Arrow`-Tasten zur Navigation innerhalb eines Menus.
- Untermenüs werden mit `ArrowRight` bzw. `ArrowDown` geöffnet und mit `ArrowLeft` oder `ArrowUp` geschlossen, abhängig von der Ausrichtung.

### Validierungslogik & ARIA-Integration

- Fehler- und Erfolgsmeldungen werden über den `FormControl`-Context verteilt.
- `FormLabel`, `FormHint`, `FormError` und `FormSuccess` greifen auf diesen Context zu.
- Eingabefelder erhalten `aria-describedby` und `aria-errormessage` automatisch über die zugehörigen IDs.
