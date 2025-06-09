import type { Meta, StoryObj } from '@storybook/react';
import { providers } from './providers';

const meta: Meta<typeof providers> = {
  title: 'Components/testing/providers',
  component: providers,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'providers component from @smolitux/testing package',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'providers Component',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled providers',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive providers',
    onClick: () => console.log('providers clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled providers',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground providers',
  },
};
