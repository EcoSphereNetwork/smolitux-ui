import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceButton } from '../VoiceButton';

const meta: Meta<typeof VoiceButton> = {
  title: 'Core/Voice/VoiceButton',
  component: VoiceButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Buttoninhalt' },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceButton>;

export const Basic: Story = {
  args: { children: 'Sprechen oder klicken' },
};
