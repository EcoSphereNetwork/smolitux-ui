import type { Meta, StoryObj } from '@storybook/react';
import ThemeTypen from './ThemeTypen';

const meta: Meta<typeof ThemeTypen> = {
  title: 'Components/ThemeTypen',
  component: ThemeTypen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ThemeTypen',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ThemeTypen',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ThemeTypen',
    onClick: () => alert('Clicked!'),
  },
};
