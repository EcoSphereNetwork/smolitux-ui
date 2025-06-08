import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { withVoiceControl } from './withVoiceControl';
import { VoiceControlProvider } from './VoiceControlProvider';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} {...props} />
));

const VoiceButton = withVoiceControl(Button, ['hello']);

const meta: Meta<typeof VoiceButton> = {
  title: 'VoiceControl/withVoiceControl',
  component: VoiceButton,
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
      <VoiceButton>Say Hello</VoiceButton>
    </VoiceControlProvider>
  ),
};
