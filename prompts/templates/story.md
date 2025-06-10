# Story-Template

## Story-Struktur

```
Component/
└── Component.stories.tsx    # Storybook-Stories
```

## Story-Implementierung

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Core/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Beschreibung der Komponente und ihrer Verwendung.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Die visuelle Variante der Komponente',
      table: {
        type: { summary: 'ComponentVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Die Größe der Komponente',
      table: {
        type: { summary: 'ComponentSize' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktiviert die Komponente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    children: {
      control: 'text',
      description: 'Der Inhalt der Komponente',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Komponente',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="outline">Outline</Component>
      <Component variant="ghost">Ghost</Component>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component>Default</Component>
      <Component disabled>Disabled</Component>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Playground',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const WithCustomStyles: Story = {
  args: {
    children: 'Custom Styles',
    className: 'custom-class',
    style: { backgroundColor: '#f0f0f0', padding: '2rem' },
  },
};

export const WithEvents: Story = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Clicked!'),
  },
};

export const WithLongText: Story = {
  args: {
    children: 'This is a very long text that should wrap properly and not overflow the component',
  },
};

export const WithEmoji: Story = {
  args: {
    children: '😀 😎 👍 🚀',
  },
};

export const WithHTML: Story = {
  args: {
    children: (
      <>
        <strong>Bold</strong> and <em>italic</em> text
      </>
    ),
  },
};

export const WithNestedComponents: Story = {
  args: {
    children: (
      <>
        <Component size="sm">Nested Component</Component>
      </>
    ),
  },
};

export const Responsive: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ width: '100%', padding: '1rem' }}>
      <p>Resize the window to see the responsive behavior:</p>
      <Component style={{ width: '100%' }}>Responsive Component</Component>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    children: 'Dark Mode',
  },
};

export const WithControls: Story = {
  args: {
    children: 'Try the controls in the Controls panel below',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const WithDocs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is a detailed description of this specific story.',
      },
    },
  },
  args: {
    children: 'With Documentation',
  },
};

export const WithDecorators: Story = {
  decorators: [
    (Story) => (
      <div style={{ border: '2px dashed #ccc', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'With Decorators',
  },
};

export const WithActions: Story = {
  args: {
    children: 'With Actions',
    onClick: (e) => console.log('Clicked', e),
    onMouseEnter: () => console.log('Mouse Enter'),
    onMouseLeave: () => console.log('Mouse Leave'),
  },
};

export const WithA11y: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  args: {
    children: 'Accessibility Tested',
  },
};

export const WithViewports: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    children: 'Mobile Viewport',
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('With Interactions'));
  },
  args: {
    children: 'With Interactions',
    onClick: () => console.log('Clicked in interaction'),
  },
};
```

## Story-Dokumentation

```typescript
import { Canvas, Meta, Story, ArgsTable } from '@storybook/addon-docs';
import { Component } from './Component';

<Meta title="Components/Core/Component/Docs" component={Component} />

# Component

Die Komponente ist eine grundlegende UI-Komponente, die für verschiedene Zwecke verwendet werden kann.

## Eigenschaften

<ArgsTable of={Component} />

## Beispiele

### Standard

<Canvas>
  <Story id="components-core-component--default" />
</Canvas>

### Varianten

<Canvas>
  <Story id="components-core-component--variants" />
</Canvas>

### Größen

<Canvas>
  <Story id="components-core-component--sizes" />
</Canvas>

### Zustände

<Canvas>
  <Story id="components-core-component--states" />
</Canvas>

## Verwendung

```jsx
import { Component } from '@smolitux/core';

function Example() {
  return <Component>Beispiel</Component>;
}
```

## Barrierefreiheit

Die Komponente ist vollständig barrierefrei und unterstützt:

- Tastaturnavigation
- Screenreader
- Hohen Kontrast
- Verschiedene Schriftgrößen

## Best Practices

- Verwende aussagekräftige Inhalte
- Wähle die passende Variante für den Kontext
- Verwende die passende Größe für die Umgebung
- Stelle sicher, dass die Komponente genügend Kontrast hat

## Einschränkungen

- Die Komponente sollte nicht für X verwendet werden
- Die Komponente unterstützt keine Y
- Die Komponente hat bekannte Probleme mit Z
```