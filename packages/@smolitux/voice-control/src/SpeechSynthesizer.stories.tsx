import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SpeechSynthesizer } from './SpeechSynthesizer';

const meta: Meta = {
  title: 'VoiceControl/SpeechSynthesizer',
};
export default meta;

const Template: React.FC<{ text: string }> = ({ text }) => {
  const handleSpeak = () => {
    const synth = new SpeechSynthesizer({ lang: 'en-US' });
    synth.speak(text);
  };
  return <button onClick={handleSpeak}>Speak</button>;
};

type Story = StoryObj<{ text: string }>;

export const Default: Story = {
  render: () => <Template text="Hello World" />,
};
