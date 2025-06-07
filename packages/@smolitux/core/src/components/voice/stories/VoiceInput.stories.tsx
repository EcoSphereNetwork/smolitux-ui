import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceInput } from '../VoiceInput';

const meta: Meta<typeof VoiceInput> = {
  title: 'Core/Voice/VoiceInput',
  component: VoiceInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Platzhaltertext' },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceInput>;

export const Basic: Story = {
  args: { placeholder: 'Sprich einen Text' },
};
