import type { Meta, StoryObj } from '@storybook/react';
import { MenuDivider } from './MenuDivider';

const meta: Meta<typeof MenuDivider> = {
  title: 'Components/MenuDivider',
  component: MenuDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MenuDivider',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MenuDivider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MenuDivider',
    onClick: () => alert('Clicked!'),
  },
};
