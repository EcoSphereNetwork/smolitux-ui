import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Core/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading indicator component with customizable size, variant, and fullscreen mode.',
      },
    },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controls visibility of the loader',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loader',
    },
    label: {
      control: 'text',
      description: 'Label for screen readers or visible text',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'subtle', 'contrast'],
      description: 'Visual variant of the loader',
    },
    'aria-live': {
      control: { type: 'select' },
      options: ['polite', 'assertive'],
      description: 'ARIA live region politeness',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Fullscreen centered mode for loading screens',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'primary',
    label: 'Loading content...',
  },
};

export const Small: Story = {
  args: {
    visible: true,
    size: 'sm',
    variant: 'primary',
    label: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    visible: true,
    size: 'lg',
    variant: 'primary',
    label: 'Loading data...',
  },
};

export const CustomSize: Story = {
  args: {
    visible: true,
    size: 48,
    variant: 'primary',
    label: 'Custom size loader',
  },
};

export const Subtle: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'subtle',
    label: 'Subtle loading...',
  },
};

export const Contrast: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'contrast',
    label: 'Contrast loading...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Invisible: Story = {
  args: {
    visible: false,
    size: 'md',
    variant: 'primary',
    label: 'This loader is not visible',
  },
};

export const Assertive: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'primary',
    label: 'Important loading...',
    'aria-live': 'assertive',
  },
};

export const Fullscreen: Story = {
  args: {
    visible: true,
    size: 'lg',
    variant: 'primary',
    label: 'Loading application...',
    fullscreen: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '400px',
      },
    },
  },
};

export const FullscreenContrast: Story = {
  args: {
    visible: true,
    size: 'lg',
    variant: 'contrast',
    label: 'Loading...',
    fullscreen: true,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      story: {
        height: '400px',
      },
    },
  },
};

// Interactive example showing visibility toggle
export const Interactive: Story = {
  args: {
    visible: true,
    size: 'md',
    variant: 'primary',
    label: 'Toggle visibility with the control',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the visible control to toggle the loader on and off.',
      },
    },
  },
};