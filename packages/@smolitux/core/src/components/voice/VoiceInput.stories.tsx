import type { Meta, StoryObj } from '@storybook/react';
import { VoiceInput } from './VoiceInput';

const meta: Meta<typeof VoiceInput> = {
  title: 'Components/VoiceInput',
  component: VoiceInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceInput',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceInput',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceInput',
    onClick: () => alert('Clicked!'),
  },
};
