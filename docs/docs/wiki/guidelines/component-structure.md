# Komponenten-Struktur Richtlinien

## Einführung

Diese Richtlinien definieren die Struktur und Organisation von Komponenten in der Smolitux UI Bibliothek. Eine konsistente Struktur erleichtert die Wartung, Erweiterung und Nutzung der Komponenten.

## Verzeichnisstruktur

Jede Komponente sollte in einem eigenen Verzeichnis innerhalb von `packages/@smolitux/core/src/components/` organisiert sein:

```
packages/@smolitux/core/src/components/ComponentName/
├── ComponentName.tsx         # Hauptkomponentendatei
├── ComponentName.css         # Komponentenspezifische Styles (optional)
├── index.ts                  # Export der Komponente
├── __tests__/                # Testverzeichnis
│   ├── ComponentName.test.tsx       # Funktionale Tests
│   └── ComponentName.a11y.test.tsx  # Barrierefreiheitstests
└── stories/                  # Storybook-Geschichten
    └── ComponentName.stories.tsx
```

## Komponenten-Datei-Struktur

Jede Komponenten-Datei (`ComponentName.tsx`) sollte folgende Struktur haben:

```tsx
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

// 1. Typdefinitionen
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /** Dokumentation der Prop */
  propName?: PropType;
  // Weitere Props...
}

// 2. Komponente
/**
 * Beschreibung der Komponente und ihrer Verwendung
 * 
 * @example
 * ```tsx
 * <ComponentName propName={value}>Inhalt</ComponentName>
 * ```
 */
export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(({
  propName = defaultValue,
  className,
  children,
  ...rest
}, ref) => {
  // 3. Hooks und State

  // 4. Berechnete Werte und Effekte
  
  // 5. Event Handler
  
  // 6. Render
  return (
    <div
      ref={ref}
      className={classNames(
        'base-class',
        propName && 'conditional-class',
        className
      )}
      data-testid="component-name"
      {...rest}
    >
      {children}
    </div>
  );
});

// 7. Display Name
ComponentName.displayName = 'ComponentName';

// 8. Default Export
export default ComponentName;
```

## Index-Datei

Die `index.ts`-Datei sollte die Komponente und ihre Typen exportieren:

```tsx
export { default, ComponentName, type ComponentNameProps } from './ComponentName';
```

## Tests

### Funktionale Tests

Funktionale Tests (`ComponentName.test.tsx`) sollten die Komponente auf korrekte Funktionalität testen:

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  test('renders correctly with default props', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByTestId('component-name')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<ComponentName className="custom-class">Content</ComponentName>);
    expect(screen.getByTestId('component-name')).toHaveClass('custom-class');
  });

  // Weitere Tests...
});
```

### Barrierefreiheitstests

Barrierefreiheitstests (`ComponentName.a11y.test.tsx`) sollten die Komponente auf Barrierefreiheit testen:

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from '../ComponentName';

expect.extend(toHaveNoViolations);

describe('ComponentName Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<ComponentName>Content</ComponentName>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Weitere Tests...
});
```

## Storybook-Geschichten

Storybook-Geschichten (`ComponentName.stories.tsx`) sollten die Komponente in verschiedenen Zuständen und Konfigurationen demonstrieren:

```tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Core/Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    propName: {
      control: 'text',
      description: 'Beschreibung der Prop',
    },
    // Weitere Props...
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Content',
  },
};

export const WithCustomProp: Story = {
  args: {
    propName: 'value',
    children: 'Content',
  },
};

// Weitere Geschichten...
```

## Dokumentation

Jede Komponente sollte gut dokumentiert sein:

1. **JSDoc-Kommentare** für die Komponente und ihre Props
2. **Beispiele** für die Verwendung der Komponente
3. **Storybook-Dokumentation** mit Beschreibungen und Beispielen

## Richtlinien für Props

1. **Konsistente Benennung**: Verwende konsistente Namen für ähnliche Props in verschiedenen Komponenten (z.B. `size`, `variant`, `color`).
2. **Sinnvolle Defaults**: Setze sinnvolle Standardwerte für Props.
3. **Typsicherheit**: Verwende TypeScript für strikte Typisierung.
4. **Prop Spreading**: Verwende `...rest` für HTML-Attribute, die an das Root-Element weitergegeben werden.
5. **Ref Forwarding**: Verwende `forwardRef` für alle Komponenten.

## Styling-Richtlinien

1. **Tailwind CSS**: Verwende Tailwind-Klassen für Styling.
2. **Konsistente Varianten**: Verwende konsistente Varianten (`primary`, `secondary`, etc.) für alle Komponenten.
3. **Responsive Design**: Stelle sicher, dass alle Komponenten responsiv sind.
4. **Dark Mode**: Unterstütze Dark Mode mit `dark:` Präfix-Klassen.
5. **Barrierefreiheit**: Stelle sicher, dass alle Komponenten die Barrierefreiheitsrichtlinien erfüllen.

## Komponentenkategorien

Organisiere Komponenten in logische Kategorien:

1. **Layout**: Komponenten für Layoutstruktur (Box, Flex, Grid, Container)
2. **Inputs**: Formularelemente (Button, Input, Select, Checkbox)
3. **Data Display**: Komponenten zur Datenanzeige (Table, List, Card, Avatar)
4. **Feedback**: Komponenten für Benutzerfeedback (Alert, Toast, Progress, Spinner)
5. **Overlay**: Komponenten, die über anderen angezeigt werden (Modal, Tooltip, Popover)
6. **Navigation**: Navigationskomponenten (Menu, Tabs, Breadcrumb)
7. **Disclosure**: Komponenten zum Ein-/Ausblenden von Inhalten (Accordion, Collapse)

## Versionierung und Änderungen

1. **Semantic Versioning**: Folge Semantic Versioning für Änderungen.
2. **Breaking Changes**: Dokumentiere Breaking Changes deutlich.
3. **Deprecation**: Markiere veraltete Komponenten oder Props mit `@deprecated`-Tags.
4. **Changelog**: Führe ein Changelog für alle Änderungen.

## Qualitätssicherung

Jede Komponente sollte folgende Qualitätskriterien erfüllen:

1. **Vollständige Tests**: Unit-Tests und Barrierefreiheitstests
2. **Storybook-Dokumentation**: Vollständige Storybook-Geschichten
3. **TypeScript**: Vollständige Typisierung
4. **Barrierefreiheit**: WCAG 2.1 AA-konform
5. **Performance**: Optimiert für Leistung und Bündelgröße