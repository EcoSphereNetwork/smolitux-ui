import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Die Button-Komponente ist ein grundlegendes UI-Element für Benutzerinteraktionen.
 * Sie unterstützt verschiedene Varianten, Größen und Zustände.
 *
 * ## Verwendung
 *
 * ```tsx
 * import { Button } from '@smolitux/core';
 *
 * // Einfacher Button
 * <Button>Klick mich</Button>
 *
 * // Button mit Variante und Größe
 * <Button variant="primary" size="lg">Großer Button</Button>
 *
 * // Button mit Icon
 * <Button leftIcon={<Icon />}>Mit Icon</Button>
 *
 * // Button als Link
 * <Button isLink href="https://example.com" target="_blank">Link Button</Button>
 *
 * // Button mit Zuständen
 * <Button loading>Wird geladen...</Button>
 * <Button disabled>Deaktiviert</Button>
 * ```
 *
 * ## Barrierefreiheit
 *
 * - Verwendet semantisches `<button>`-Element (oder `<a>` für Links)
 * - Unterstützt Keyboard-Navigation (Enter/Space)
 * - Enthält ARIA-Attribute für verschiedene Zustände (aria-disabled, aria-busy, aria-pressed)
 * - Icons sind mit `aria-hidden="true"` markiert
 * - Icon-Buttons ohne Text erfordern ein `aria-label`
 * - Externe Links erhalten automatisch `rel="noopener noreferrer"` und `target="_blank"`
 *
 * ## Best Practices
 *
 * - Verwende klare, handlungsorientierte Beschriftungen
 * - Wähle die Variante entsprechend der Wichtigkeit der Aktion
 * - Verwende `loading` für asynchrone Aktionen
 * - Stelle sicher, dass Icon-Buttons ein `aria-label` haben
 * - Verwende `fullWidth` nur, wenn der Button eine wichtige Aktion in einem begrenzten Raum darstellt
 */
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'outline',
        'ghost',
        'link',
        'unstyled',
      ],
      description: 'Die visuelle Variante des Buttons',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Die Größe des Buttons',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: 'select',
      options: ['square', 'rounded', 'pill'],
      description: 'Die Form des Buttons',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: 'rounded' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ob der Button die volle Breite ausfüllen soll',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: false },
      },
    },
    shadow: {
      control: 'boolean',
      description: 'Ob der Button einen Schatten haben soll',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading-Zustand des Buttons',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Alias für loading',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Ob der Button deaktiviert ist',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    active: {
      control: 'boolean',
      description: 'Ob der Button aktiv ist',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    isSuccess: {
      control: 'boolean',
      description: 'Ob der Button im Erfolgs-Zustand ist',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Ob der Button im Fehler-Zustand ist',
      table: {
        category: 'Zustand',
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon vor dem Text',
      table: {
        category: 'Inhalt',
      },
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon nach dem Text',
      table: {
        category: 'Inhalt',
      },
    },
    loadingText: {
      control: 'text',
      description: 'Text, der im Loading-Zustand angezeigt wird',
      table: {
        category: 'Inhalt',
        defaultValue: { summary: 'Loading...' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Der Typ des Buttons',
      table: {
        category: 'Verhalten',
        defaultValue: { summary: 'button' },
      },
    },
    isLink: {
      control: 'boolean',
      description: 'Ob der Button als Link gerendert werden soll',
      table: {
        category: 'Verhalten',
        defaultValue: { summary: false },
      },
    },
    href: {
      control: 'text',
      description: 'URL für Link-Buttons',
      table: {
        category: 'Verhalten',
        defaultValue: { summary: undefined },
      },
    },
    isExternal: {
      control: 'boolean',
      description: 'Ob der Link-Button zu einer externen Seite führt',
      table: {
        category: 'Verhalten',
        defaultValue: { summary: false },
      },
    },
    isIconButton: {
      control: 'boolean',
      description: 'Ob der Button nur ein Icon enthält',
      table: {
        category: 'Aussehen',
        defaultValue: { summary: false },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback-Funktion, die beim Klicken ausgeführt wird',
      table: {
        category: 'Ereignisse',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basis-Story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

// Varianten
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Größen
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Zustände
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};

// Mit Icons
export const WithLeftIcon: Story = {
  args: {
    children: 'Button with Left Icon',
    leftIcon: <span>👈</span>,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button with Right Icon',
    rightIcon: <span>👉</span>,
  },
};

// Beispiel für eine Gruppe von Buttons
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex space-x-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

// Beispiel für Barrierefreiheit
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard-Navigation</h3>
        <Button onClick={() => alert('Button wurde aktiviert!')} aria-describedby="keyboard-hint">
          Fokussieren und Enter/Space drücken
        </Button>
        <p id="keyboard-hint" className="text-xs text-gray-500 mt-1">
          Dieser Button kann mit der Tastatur (Enter oder Space) aktiviert werden
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">ARIA-Attribute</h3>
        <Button loading aria-describedby="loading-hint">
          Loading-Zustand
        </Button>
        <p id="loading-hint" className="text-xs text-gray-500 mt-1">
          Dieser Button hat aria-busy="true" und aria-disabled="true"
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Icon-Button mit aria-label</h3>
        <Button isIconButton aria-label="Suchen" leftIcon={<span>🔍</span>} />
        <span className="text-xs text-gray-500 ml-2">Icon-Buttons benötigen ein aria-label</span>
      </div>
    </div>
  ),
};

// Beispiel für verschiedene Formen
export const Shapes: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Button shape="square">Eckig</Button>
      <Button shape="rounded">Abgerundet</Button>
      <Button shape="pill">Pill</Button>
    </div>
  ),
};

// Beispiel für Link-Buttons
export const LinkButtons: Story = {
  render: () => (
    <div className="space-y-2">
      <Button isLink href="#">
        Interner Link
      </Button>
      <Button isLink href="https://example.com" isExternal>
        Externer Link
      </Button>
      <Button variant="primary" isLink href="#">
        Styled Link
      </Button>
    </div>
  ),
};

// Beispiel für Zustände
export const States: Story = {
  render: () => (
    <div className="space-y-2">
      <Button isSuccess>Erfolg</Button>
      <Button isError>Fehler</Button>
      <Button active>Aktiv</Button>
      <Button isToggle isToggleOn>
        Toggle (An)
      </Button>
      <Button isToggle>Toggle (Aus)</Button>
    </div>
  ),
};
