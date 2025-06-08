import type { Meta, StoryObj } from '@storybook/react';
import { MenuDropdown } from './MenuDropdown';

const meta: Meta<typeof MenuDropdown> = {
  title: 'Components/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MenuDropdown',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MenuDropdown',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MenuDropdown',
    onClick: () => alert('Clicked!'),
  },
};
