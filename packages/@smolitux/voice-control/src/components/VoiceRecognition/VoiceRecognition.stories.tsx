import type { Meta, StoryObj } from '@storybook/react';
import { VoiceRecognition } from './VoiceRecognition';

const meta: Meta<typeof VoiceRecognition> = {
  title: 'Voice Control/VoiceRecognition',
  component: VoiceRecognition,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof VoiceRecognition> = {
  args: {},
};
