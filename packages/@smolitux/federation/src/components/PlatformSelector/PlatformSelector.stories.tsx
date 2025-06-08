import type { Meta, StoryObj } from '@storybook/react';
import { PlatformSelector } from './PlatformSelector';

const meta: Meta<typeof PlatformSelector> = {
  title: 'Components/PlatformSelector',
  component: PlatformSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'PlatformSelector',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom PlatformSelector',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PlatformSelector',
    onClick: () => alert('Clicked!'),
  },
};
