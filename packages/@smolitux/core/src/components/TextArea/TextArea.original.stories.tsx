import type { Meta, StoryObj } from '@storybook/react';
import { TextArea.original } from './TextArea.original';

const meta: Meta<typeof TextArea.original> = {
  title: 'Components/TextArea.original',
  component: TextArea.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TextArea.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TextArea.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TextArea.original',
    onClick: () => alert('Clicked!'),
  },
};
