import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceSelect } from '../VoiceSelect';

const meta: Meta<typeof VoiceSelect> = {
  title: 'Core/Voice/VoiceSelect',
  component: VoiceSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Auswahloptionen' },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceSelect>;

export const Basic: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};
