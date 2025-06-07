import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceCard } from '../VoiceCard';

const meta: Meta<typeof VoiceCard> = {
  title: 'Core/Voice/VoiceCard',
  component: VoiceCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    collapsible: { control: 'boolean' },
    expandable: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceCard>;

export const Basic: Story = {
  args: { children: 'Sprachgesteuerte Karte' },
};
