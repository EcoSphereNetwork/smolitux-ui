import type { Meta, StoryObj } from '@storybook/react';
import { ThemeUtilities } from './ThemeUtilities';

const meta: Meta<typeof ThemeUtilities> = {
  title: 'Components/ThemeUtilities',
  component: ThemeUtilities,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ThemeUtilities',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ThemeUtilities',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ThemeUtilities',
    onClick: () => alert('Clicked!'),
  },
};
