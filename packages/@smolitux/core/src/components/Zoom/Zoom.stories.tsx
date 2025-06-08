import type { Meta, StoryObj } from '@storybook/react';
import { Zoom } from './Zoom';

const meta: Meta<typeof Zoom> = {
  title: 'Components/Zoom',
  component: Zoom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Zoom',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Zoom',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Zoom',
    onClick: () => alert('Clicked!'),
  },
};
