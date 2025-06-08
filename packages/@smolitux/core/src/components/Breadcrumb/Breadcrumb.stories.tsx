import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Breadcrumb',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Breadcrumb',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Breadcrumb',
    onClick: () => alert('Clicked!'),
  },
};
