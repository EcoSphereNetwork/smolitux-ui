import type { Meta, StoryObj } from '@storybook/react';
import { VoiceCard } from './VoiceCard';

const meta: Meta<typeof VoiceCard> = {
  title: 'Components/VoiceCard',
  component: VoiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceCard',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceCard',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceCard',
    onClick: () => alert('Clicked!'),
  },
};
