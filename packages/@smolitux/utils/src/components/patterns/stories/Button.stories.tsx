import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Basic/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Button variant',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon to display before the button text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon to display after the button text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Button color scheme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
      table: {
        type: { summary: 'function' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline CSS styles',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="secondary">Secondary</Button>
        <Button colorScheme="success">Success</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button colorScheme="warning">Warning</Button>
        <Button colorScheme="info">Info</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="outline" colorScheme="primary">
          Primary
        </Button>
        <Button variant="outline" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="outline" colorScheme="success">
          Success
        </Button>
        <Button variant="outline" colorScheme="danger">
          Danger
        </Button>
        <Button variant="outline" colorScheme="warning">
          Warning
        </Button>
        <Button variant="outline" colorScheme="info">
          Info
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost" colorScheme="primary">
          Primary
        </Button>
        <Button variant="ghost" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="ghost" colorScheme="success">
          Success
        </Button>
        <Button variant="ghost" colorScheme="danger">
          Danger
        </Button>
        <Button variant="ghost" colorScheme="warning">
          Warning
        </Button>
        <Button variant="ghost" colorScheme="info">
          Info
        </Button>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const leftIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L20 20H4L12 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const rightIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button leftIcon={leftIcon}>Left Icon</Button>
        <Button rightIcon={rightIcon}>Right Icon</Button>
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Both Icons
        </Button>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: {
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2)',
    },
    children: 'Custom Style',
  },
};
