import type { Meta, StoryObj } from '@storybook/react';
import { VoiceModal } from './VoiceModal';

const meta: Meta<typeof VoiceModal> = {
  title: 'Components/VoiceModal',
  component: VoiceModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceModal',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceModal',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceModal',
    onClick: () => alert('Clicked!'),
  },
};
