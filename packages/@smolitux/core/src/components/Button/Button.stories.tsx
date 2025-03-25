import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Die Button-Komponente ist ein grundlegendes UI-Element für Benutzerinteraktionen.
 * Sie unterstützt verschiedene Varianten, Größen und Zustände.
 * 
 * ## Barrierefreiheit
 * 
 * - Verwendet semantisches `<button>`-Element
 * - Unterstützt Keyboard-Navigation (Enter/Space)
 * - Enthält ARIA-Attribute für verschiedene Zustände
 * - Icons sind mit `aria-hidden="true"` markiert
 */
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'Die visuelle Variante des Buttons'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Die Größe des Buttons'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ob der Button die volle Breite ausfüllen soll'
    },
    loading: {
      control: 'boolean',
      description: 'Loading-Zustand des Buttons'
    },
    disabled: {
      control: 'boolean',
      description: 'Ob der Button deaktiviert ist'
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon vor dem Text'
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon nach dem Text'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Der Typ des Buttons (Standard: button)'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback-Funktion, die beim Klicken ausgeführt wird'
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
        <Button 
          onClick={() => alert('Button wurde aktiviert!')}
          aria-describedby="keyboard-hint"
        >
          Fokussieren und Enter/Space drücken
        </Button>
        <p id="keyboard-hint" className="text-xs text-gray-500 mt-1">
          Dieser Button kann mit der Tastatur (Enter oder Space) aktiviert werden
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">ARIA-Attribute</h3>
        <Button 
          loading 
          aria-describedby="loading-hint"
        >
          Loading-Zustand
        </Button>
        <p id="loading-hint" className="text-xs text-gray-500 mt-1">
          Dieser Button hat aria-busy="true" und aria-disabled="true"
        </p>
      </div>
    </div>
  ),
};
