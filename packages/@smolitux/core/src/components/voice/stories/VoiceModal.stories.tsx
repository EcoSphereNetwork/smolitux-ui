import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceModal } from '../VoiceModal';

const meta: Meta<typeof VoiceModal> = {
  title: 'Core/Voice/VoiceModal',
  component: VoiceModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Modal geöffnet' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceModal>;

export const Basic: Story = {
  args: {
    isOpen: true,
    children: <div className="p-4">Sprich \"schließen\" um das Modal zu schließen.</div>,
  },
};
