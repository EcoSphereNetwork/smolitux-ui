import type { Meta, StoryObj } from '@storybook/react';
import { DropdownItemA11y } from './DropdownItemA11y';

const meta: Meta<typeof DropdownItemA11y> = {
  title: 'Components/DropdownItemA11y',
  component: DropdownItemA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownItemA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownItemA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownItemA11y',
    onClick: () => alert('Clicked!'),
  },
};
