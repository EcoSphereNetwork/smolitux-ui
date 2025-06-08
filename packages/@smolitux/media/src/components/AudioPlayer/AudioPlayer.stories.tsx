import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Components/AudioPlayer',
  component: AudioPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'AudioPlayer',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom AudioPlayer',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive AudioPlayer',
    onClick: () => alert('Clicked!'),
  },
};
