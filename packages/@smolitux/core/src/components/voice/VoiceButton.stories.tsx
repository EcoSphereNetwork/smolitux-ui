import type { Meta, StoryObj } from '@storybook/react';
import { VoiceButton } from './VoiceButton';

const meta: Meta<typeof VoiceButton> = {
  title: 'Components/VoiceButton',
  component: VoiceButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceButton',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceButton',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceButton',
    onClick: () => alert('Clicked!'),
  },
};
