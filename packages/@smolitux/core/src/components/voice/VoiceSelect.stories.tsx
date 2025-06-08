import type { Meta, StoryObj } from '@storybook/react';
import { VoiceSelect } from './VoiceSelect';

const meta: Meta<typeof VoiceSelect> = {
  title: 'Components/VoiceSelect',
  component: VoiceSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VoiceSelect',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VoiceSelect',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VoiceSelect',
    onClick: () => alert('Clicked!'),
  },
};
