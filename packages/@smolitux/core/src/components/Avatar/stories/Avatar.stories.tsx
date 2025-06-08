import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Die URL des Avatarbildes',
    },
    alt: {
      control: 'text',
      description: 'Der alternative Text für das Bild',
    },
    name: {
      control: 'text',
      description: 'Der Name, der für die Initialen verwendet wird, wenn kein Bild vorhanden ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      },
      description: 'Die Größe des Avatars',
    },
    variant: {
      control: {
        type: 'select',
        options: ['circle', 'square', 'rounded'],
      },
      description: 'Die Form des Avatars',
    },
    status: {
      control: {
        type: 'select',
        options: ['online', 'offline', 'away', 'busy', 'none'],
      },
      description: 'Der Status des Avatars',
    },
    statusPosition: {
      control: {
        type: 'select',
        options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      },
      description: 'Die Position des Statusindikators',
    },
    border: {
      control: 'boolean',
      description: 'Gibt an, ob der Avatar einen Rahmen haben soll',
    },
    borderColor: {
      control: 'color',
      description: 'Die Farbe des Rahmens',
    },
    backgroundColor: {
      control: 'color',
      description: 'Die Hintergrundfarbe des Avatars',
    },
    textColor: {
      control: 'color',
      description: 'Die Textfarbe der Initialen',
    },
    icon: {
      control: 'text',
      description: 'Ein Icon, das angezeigt wird, wenn kein Bild oder Name vorhanden ist',
    },
    loading: {
      control: 'boolean',
      description: 'Gibt an, ob der Avatar im Ladezustand ist',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback, der aufgerufen wird, wenn der Avatar geklickt wird',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Avatar',
    size: 'md',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Max Mustermann',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    ),
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <Avatar size="xs" name="XS" />
        <span className="mt-2 text-xs">xs</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="sm" name="SM" />
        <span className="mt-2 text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="md" name="MD" />
        <span className="mt-2 text-xs">md</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="lg" name="LG" />
        <span className="mt-2 text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="xl" name="XL" />
        <span className="mt-2 text-xs">xl</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar size="2xl" name="2XL" />
        <span className="mt-2 text-xs">2xl</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <Avatar variant="circle" name="Circle" />
        <span className="mt-2 text-xs">circle</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar variant="square" name="Square" />
        <span className="mt-2 text-xs">square</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar variant="rounded" name="Rounded" />
        <span className="mt-2 text-xs">rounded</span>
      </div>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <Avatar status="online" name="Online" />
        <span className="mt-2 text-xs">online</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="offline" name="Offline" />
        <span className="mt-2 text-xs">offline</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="away" name="Away" />
        <span className="mt-2 text-xs">away</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="busy" name="Busy" />
        <span className="mt-2 text-xs">busy</span>
      </div>
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <Avatar status="online" statusPosition="top-right" name="TR" />
        <span className="mt-2 text-xs">top-right</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="online" statusPosition="top-left" name="TL" />
        <span className="mt-2 text-xs">top-left</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="online" statusPosition="bottom-right" name="BR" />
        <span className="mt-2 text-xs">bottom-right</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar status="online" statusPosition="bottom-left" name="BL" />
        <span className="mt-2 text-xs">bottom-left</span>
      </div>
    </div>
  ),
};

export const WithBorder: Story = {
  args: {
    name: 'Border',
    border: true,
    borderColor: '#3b82f6',
  },
};

export const WithCustomColors: Story = {
  args: {
    name: 'Custom',
    backgroundColor: '#f97316',
    textColor: '#ffffff',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    size: 'md',
  },
};

export const Clickable: Story = {
  args: {
    name: 'Click Me',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar src="https://i.pravatar.cc/300?img=1" border />
      <Avatar src="https://i.pravatar.cc/300?img=2" border />
      <Avatar src="https://i.pravatar.cc/300?img=3" border />
      <Avatar name="+3" backgroundColor="#6b7280" textColor="#ffffff" border />
    </div>
  ),
};

export const FallbackBehavior: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <Avatar src="https://invalid-url.com/image.jpg" name="Fallback" />
        <span className="mt-2 text-xs">Image Error → Initials</span>
      </div>
      <div className="flex flex-col items-center">
        <Avatar src="https://invalid-url.com/image.jpg" />
        <span className="mt-2 text-xs">No Name → Icon</span>
      </div>
    </div>
  ),
};
