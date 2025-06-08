import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TextArea',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TextArea',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TextArea',
    onClick: () => alert('Clicked!'),
  },
};
