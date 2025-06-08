import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceControlProvider, useVoiceControl } from './VoiceControlProvider';

const Demo = () => {
  const { isListening, recognizedText } = useVoiceControl();
  return (
    <div>
      <p>Listening: {String(isListening)}</p>
      <p>Recognized: {recognizedText}</p>
    </div>
  );
};

const meta: Meta<typeof VoiceControlProvider> = {
  title: 'VoiceControl/VoiceControlProvider',
  component: VoiceControlProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VoiceControlProvider>
      <Demo />
    </VoiceControlProvider>
  ),
};

