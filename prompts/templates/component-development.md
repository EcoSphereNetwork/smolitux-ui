# Smolitux UI Komponenten-Entwicklung

## 🎯 Ziel

Entwickle eine hochwertige React-Komponente für die Smolitux UI-Bibliothek, die folgende Kriterien erfüllt:

- Vollständige TypeScript-Typisierung
- Barrierefreiheit nach WCAG 2.1 AA
- Responsive Design
- Theming-Unterstützung
- Umfassende Tests
- Storybook-Dokumentation

## 📋 Komponenten-Spezifikation

```typescript
// Komponenten-Name: {{COMPONENT_NAME}}
// Paket: @smolitux/{{PACKAGE_NAME}}
// Beschreibung: {{COMPONENT_DESCRIPTION}}

export interface {{COMPONENT_NAME}}Props {
  /** Beschreibung der Prop */
  prop1?: string;
  /** Beschreibung der Prop */
  prop2?: number;
  /** Beschreibung der Prop */
  children?: React.ReactNode;
  // Weitere Props...
}
```

## 🧩 Komponenten-Struktur

Die Komponente sollte folgende Dateien enthalten:

1. `{{COMPONENT_NAME}}/{{COMPONENT_NAME}}.tsx` - Hauptkomponente
2. `{{COMPONENT_NAME}}/{{COMPONENT_NAME}}.test.tsx` - Tests
3. `{{COMPONENT_NAME}}/{{COMPONENT_NAME}}.stories.tsx` - Storybook-Stories
4. `{{COMPONENT_NAME}}/index.ts` - Export

## 📝 Implementierungsrichtlinien

### TypeScript

- Verwende explizite Typen für alle Props
- Vermeide `any` und `unknown` Typen
- Verwende `React.forwardRef` für Komponenten, die Refs unterstützen
- Verwende `React.memo` für Komponenten, die häufig neu gerendert werden

### Barrierefreiheit

- Verwende semantische HTML-Elemente
- Füge ARIA-Attribute hinzu, wo nötig
- Stelle sicher, dass die Komponente mit Tastatur bedienbar ist
- Stelle sicher, dass die Komponente mit Screenreadern kompatibel ist

### Styling

- Verwende Tailwind CSS für Styling
- Verwende CSS-Variablen für Theme-Werte
- Stelle sicher, dass die Komponente responsive ist
- Unterstütze Dark Mode

### Tests

- Teste das Rendering der Komponente
- Teste die Interaktion mit der Komponente
- Teste die Barrierefreiheit der Komponente
- Teste die Theming-Unterstützung der Komponente

## 🧪 Test-Template

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';

describe('{{COMPONENT_NAME}}', () => {
  it('renders correctly', () => {
    render(<{{COMPONENT_NAME}} />);
    // Assertions...
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<{{COMPONENT_NAME}} onClick={handleClick} />);
    
    // Interactions and assertions...
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<{{COMPONENT_NAME}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 📚 Storybook-Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';

const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'Components/{{PACKAGE_NAME}}/{{COMPONENT_NAME}}',
  component: {{COMPONENT_NAME}},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '{{COMPONENT_DESCRIPTION}}',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ArgTypes...
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default args...
  },
};

// Weitere Stories...
```

## 🔍 Qualitätskriterien

- ✅ Keine TypeScript-Fehler
- ✅ Keine ESLint-Fehler
- ✅ Alle Tests bestehen
- ✅ Keine Barrierefreiheitsverletzungen
- ✅ Responsive Design
- ✅ Theming-Unterstützung
- ✅ Vollständige Dokumentation

## 📋 Checkliste

- [ ] Komponente implementiert
- [ ] Tests geschrieben
- [ ] Storybook-Stories erstellt
- [ ] Barrierefreiheit getestet
- [ ] Responsive Design getestet
- [ ] Theming-Unterstützung getestet
- [ ] Dokumentation erstellt