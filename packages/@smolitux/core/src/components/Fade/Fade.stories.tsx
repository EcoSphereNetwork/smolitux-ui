import type { Meta, StoryObj } from '@storybook/react';
import { Fade } from './Fade';

const meta: Meta<typeof Fade> = {
  title: 'Components/Fade',
  component: Fade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Fade',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Fade',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Fade',
    onClick: () => alert('Clicked!'),
  },
};
