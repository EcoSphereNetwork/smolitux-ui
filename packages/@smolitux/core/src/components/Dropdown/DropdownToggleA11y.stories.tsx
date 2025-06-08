import type { Meta, StoryObj } from '@storybook/react';
import { DropdownToggleA11y } from './DropdownToggleA11y';

const meta: Meta<typeof DropdownToggleA11y> = {
  title: 'Components/DropdownToggleA11y',
  component: DropdownToggleA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownToggleA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownToggleA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownToggleA11y',
    onClick: () => alert('Clicked!'),
  },
};
