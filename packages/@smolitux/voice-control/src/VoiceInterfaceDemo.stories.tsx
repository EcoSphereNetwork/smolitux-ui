import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceControlProvider } from './VoiceControlProvider';
import { withVoiceControl } from './withVoiceControl';
import { SpeechSynthesizer } from './SpeechSynthesizer';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} {...props} />
));

const VoiceButton = withVoiceControl(Button, ['hello']);

const meta: Meta = {
  title: 'VoiceControl/VoiceInterfaceDemo',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const CommandDemo: Story = {
  render: () => (
    <VoiceControlProvider debug>
      <VoiceButton aria-label="Say Hello">Say Hello</VoiceButton>
    </VoiceControlProvider>
  ),
};

export const AudioControls: Story = {
  render: () => (
    <button onClick={() => new SpeechSynthesizer({ lang: 'en-US' }).speak('Hello World')}>
      Speak
    </button>
  ),
};
