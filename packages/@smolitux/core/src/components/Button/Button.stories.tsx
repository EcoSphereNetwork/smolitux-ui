// packages/@smolitux/core/src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

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
