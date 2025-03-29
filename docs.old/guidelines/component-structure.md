# Komponenten-Struktur

Diese Dokumentation beschreibt die Struktur und Organisation von Komponenten in der Smolitux-UI-Bibliothek.

## Verzeichnisstruktur

Jede Komponente sollte in einem eigenen Verzeichnis mit folgendem Aufbau organisiert sein:

```
ComponentName/
├── ComponentName.tsx       # Hauptkomponente
├── ComponentName.stories.tsx  # Storybook-Geschichten
├── ComponentName.test.tsx  # Tests
├── ComponentName.styles.ts # Styles (optional)
└── index.ts                # Export
```

## Komponenten-Datei

Die Hauptkomponente sollte folgende Struktur haben:

```tsx
import React from 'react';
import { Box, Flex, Text } from '@smolitux/utils/src/components/primitives';

export interface ComponentNameProps {
  /** Beschreibung der Prop */
  propName: PropType;
  /** Optionale Prop mit Standardwert */
  optionalProp?: OptionalPropType;
  /** Callback-Funktion */
  onSomething?: (param: ParamType) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ComponentName-Komponente für [Beschreibung der Komponente].
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optionalProp = defaultValue,
  onSomething,
  className = '',
  style,
}) => {
  // State und Hooks
  const [state, setState] = React.useState(initialState);

  // Event-Handler
  const handleEvent = () => {
    // Logik
    if (onSomething) {
      onSomething(param);
    }
  };

  // Render-Hilfsfunktionen
  const renderSomething = () => {
    return (
      <Box>
        {/* ... */}
      </Box>
    );
  };

  // Hauptrender
  return (
    <Box
      className={`component-name ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Komponenten-Inhalt */}
    </Box>
  );
};
```

## Index-Datei

Die Index-Datei sollte die Komponente und ihre Typen exportieren:

```tsx
export * from './ComponentName';
```

## Storybook-Datei

Die Storybook-Datei sollte verschiedene Varianten der Komponente zeigen:

```tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    propName: 'value',
    optionalProp: 'optionalValue',
  },
};

export const Variant: Story = {
  args: {
    propName: 'variantValue',
    optionalProp: 'differentValue',
  },
};
```

## Test-Datei

Die Test-Datei sollte die Komponente testen:

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    render(<ComponentName propName="value" />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  it('calls onSomething when event occurs', () => {
    const onSomething = jest.fn();
    render(<ComponentName propName="value" onSomething={onSomething} />);
    
    fireEvent.click(screen.getByText('trigger'));
    expect(onSomething).toHaveBeenCalledTimes(1);
    expect(onSomething).toHaveBeenCalledWith(expectedParam);
  });
});
```

## Styles-Datei (optional)

Wenn die Komponente komplexe Styles hat, können diese in einer separaten Datei definiert werden:

```tsx
import { css } from '@emotion/react';

export const containerStyles = css`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const headerStyles = css`
  margin-bottom: 16px;
  font-weight: bold;
`;

// ...
```

## Richtlinien für Komponenten

### Allgemeine Richtlinien

1. **Funktionale Komponenten**: Verwenden Sie funktionale Komponenten mit React Hooks.
2. **TypeScript**: Verwenden Sie TypeScript für alle Komponenten.
3. **JSDoc-Kommentare**: Dokumentieren Sie alle Props und die Komponente selbst.
4. **Einheitliche Benennung**: Verwenden Sie PascalCase für Komponenten und camelCase für Props und Funktionen.
5. **Konsistente Struktur**: Folgen Sie der oben beschriebenen Struktur für alle Komponenten.

### Props

1. **Minimale Props**: Halten Sie die Anzahl der Props minimal und fokussiert.
2. **Standardwerte**: Geben Sie Standardwerte für optionale Props an.
3. **Callback-Benennung**: Verwenden Sie `on`-Präfix für Callback-Props (z.B. `onClick`, `onSubmit`).
4. **Konsistente Props**: Verwenden Sie konsistente Props über alle Komponenten hinweg.
5. **Dokumentation**: Dokumentieren Sie alle Props mit JSDoc-Kommentaren.

### Styling

1. **Primitive Komponenten**: Verwenden Sie primitive Komponenten aus `@smolitux/utils` für das Layout.
2. **Konsistente Abstände**: Verwenden Sie konsistente Abstände und Größen.
3. **Responsive Design**: Stellen Sie sicher, dass alle Komponenten responsiv sind.
4. **Theming**: Verwenden Sie das Theme-System für Farben, Abstände und Typografie.
5. **Barrierefreiheit**: Stellen Sie sicher, dass alle Komponenten barrierefrei sind.

### Testen

1. **Einheitstests**: Schreiben Sie Tests für alle Komponenten.
2. **Interaktionstests**: Testen Sie Benutzerinteraktionen mit `fireEvent`.
3. **Snapshot-Tests**: Verwenden Sie Snapshot-Tests für UI-Konsistenz.
4. **Mocking**: Mocken Sie externe Abhängigkeiten und Callbacks.
5. **Testabdeckung**: Streben Sie eine hohe Testabdeckung an.

### Dokumentation

1. **Storybook**: Erstellen Sie Storybook-Geschichten für alle Komponenten.
2. **Varianten**: Zeigen Sie verschiedene Varianten und Zustände der Komponente.
3. **Interaktive Beispiele**: Erstellen Sie interaktive Beispiele für komplexe Komponenten.
4. **Dokumentation**: Dokumentieren Sie die Verwendung und Einschränkungen der Komponente.
5. **Beispiele**: Geben Sie Beispiele für häufige Anwendungsfälle.