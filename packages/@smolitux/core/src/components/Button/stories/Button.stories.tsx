import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'link'],
      description: 'Variante des Buttons',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Größe des Buttons',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Farbe des Buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktiviert den Button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Button nimmt die volle Breite ein',
    },
    loading: {
      control: 'boolean',
      description: 'Zeigt einen Ladezustand an',
    },
    icon: {
      control: 'text',
      description: 'Icon für den Button (als React-Element)',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position des Icons',
    },
    rounded: {
      control: 'boolean',
      description: 'Rundet die Ecken des Buttons stärker ab',
    },
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Schattenstärke des Buttons',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    children: 'Outlined Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Text Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'md',
    children: 'Link Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button
        icon={
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        iconPosition="left"
      >
        Left Icon
      </Button>
      <Button
        icon={
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        }
        iconPosition="right"
      >
        Right Icon
      </Button>
      <Button
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        }
        aria-label="Refresh"
      />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button rounded={false}>Standard</Button>
      <Button rounded>Rounded</Button>
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button elevation="none">No Shadow</Button>
      <Button elevation="sm">Small Shadow</Button>
      <Button elevation="md">Medium Shadow</Button>
      <Button elevation="lg">Large Shadow</Button>
    </div>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button className="rounded-r-none border-r-0">Left</Button>
        <Button className="rounded-none border-r-0">Middle</Button>
        <Button className="rounded-l-none">Right</Button>
      </div>

      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button variant="outlined" className="rounded-r-none border-r-0">
          Left
        </Button>
        <Button variant="outlined" className="rounded-none border-r-0">
          Middle
        </Button>
        <Button variant="outlined" className="rounded-l-none">
          Right
        </Button>
      </div>
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <div className="flex gap-2">
      <div className="group relative inline-block">
        <Button>Hover Me</Button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Tooltip Text
        </div>
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button as="a" href="#" target="_blank" rel="noopener noreferrer">
      External Link
    </Button>
  ),
};
