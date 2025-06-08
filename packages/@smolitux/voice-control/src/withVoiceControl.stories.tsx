import type { Meta, StoryObj } from '@storybook/react';
import { withVoiceControl } from './withVoiceControl';

const meta: Meta<typeof withVoiceControl> = {
  title: 'Components/withVoiceControl',
  component: withVoiceControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'withVoiceControl',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom withVoiceControl',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive withVoiceControl',
    onClick: () => alert('Clicked!'),
  },
};
