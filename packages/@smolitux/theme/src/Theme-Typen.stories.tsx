import type { Meta, StoryObj } from '@storybook/react';
import { Theme-Typen } from './Theme-Typen';

const meta: Meta<typeof Theme-Typen> = {
  title: 'Components/Theme-Typen',
  component: Theme-Typen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Theme-Typen',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Theme-Typen',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Theme-Typen',
    onClick: () => alert('Clicked!'),
  },
};
