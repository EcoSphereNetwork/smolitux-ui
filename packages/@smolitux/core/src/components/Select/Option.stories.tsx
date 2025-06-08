import type { Meta, StoryObj } from '@storybook/react';
import { Option } from './Option';

const meta: Meta<typeof Option> = {
  title: 'Components/Option',
  component: Option,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Option',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Option',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Option',
    onClick: () => alert('Clicked!'),
  },
};
