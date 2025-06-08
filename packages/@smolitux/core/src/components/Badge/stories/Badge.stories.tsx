import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Avatar } from '../../Avatar/Avatar';

const meta: Meta<typeof Badge> = {
  title: 'Core/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['solid', 'subtle', 'outline'],
      },
      description: 'Die Variante des Badges',
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Die Farbe des Badges',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      description: 'Die Größe des Badges',
    },
    rounded: {
      control: 'boolean',
      description: 'Gibt an, ob der Badge abgerundete Ecken haben soll',
    },
    pill: {
      control: 'boolean',
      description: 'Gibt an, ob der Badge als Pill dargestellt werden soll',
    },
    invisible: {
      control: 'boolean',
      description: 'Gibt an, ob der Badge unsichtbar sein soll',
    },
    max: {
      control: 'number',
      description: 'Die maximale Anzahl, die angezeigt werden soll',
    },
    showZero: {
      control: 'boolean',
      description: 'Gibt an, ob der Badge angezeigt werden soll, wenn der Wert 0 ist',
    },
    placement: {
      control: {
        type: 'select',
        options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      },
      description: 'Die Position des Badges relativ zum übergeordneten Element',
    },
    overlap: {
      control: 'boolean',
      description: 'Gibt an, ob der Badge das übergeordnete Element überlappen soll',
    },
    offset: {
      control: 'array',
      description: 'Der Offset des Badges [x, y]',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: '42',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="info">Info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const Pill: Story = {
  args: {
    pill: true,
    children: 'Pill Badge',
  },
};

export const Numeric: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge>1</Badge>
      <Badge>25</Badge>
      <Badge>99+</Badge>
      <Badge max={99}>100</Badge>
      <Badge max={999}>1000</Badge>
    </div>
  ),
};

export const WithZero: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge showZero={false}>0</Badge>
      <Badge showZero={true}>0</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Badge>
      <Badge>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </Badge>
      <Badge>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Info
      </Badge>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div className="relative inline-flex">
      <Avatar name="JD" size="md" />
      <Badge placement="bottom-right" color="success" size="xs" overlap pill />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex space-x-12">
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          Box
        </div>
        <Badge placement="top-right" color="primary" size="sm" overlap>
          TR
        </Badge>
      </div>
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          Box
        </div>
        <Badge placement="top-left" color="secondary" size="sm" overlap>
          TL
        </Badge>
      </div>
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          Box
        </div>
        <Badge placement="bottom-right" color="success" size="sm" overlap>
          BR
        </Badge>
      </div>
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          Box
        </div>
        <Badge placement="bottom-left" color="danger" size="sm" overlap>
          BL
        </Badge>
      </div>
    </div>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <div className="relative inline-flex">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
        Box
      </div>
      <Badge placement="top-right" color="primary" size="sm" overlap offset={[10, -10]}>
        Offset
      </Badge>
    </div>
  ),
};

export const Invisible: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Badge invisible={false}>Visible</Badge>
      <Badge invisible={true}>Invisible</Badge>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Custom</Badge>
  ),
};
