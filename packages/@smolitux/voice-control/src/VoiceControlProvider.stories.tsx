import type { Meta, StoryObj } from '@storybook/react';
import { VoiceControlProvider } from './VoiceControlProvider';

const meta: Meta<typeof VoiceControlProvider> = {
  title: 'Components/VoiceControlProvider',
  component: VoiceControlProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceControlProvider',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceControlProvider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceControlProvider',
    onClick: () => alert('Clicked!'),
  },
};
