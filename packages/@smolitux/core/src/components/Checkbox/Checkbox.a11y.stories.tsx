import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CheckboxA11y from './Checkbox.a11y';

const meta: Meta<typeof CheckboxA11y> = {
  title: 'Components/CheckboxA11y',
  component: CheckboxA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'CheckboxA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom CheckboxA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive CheckboxA11y',
    onClick: () => alert('Clicked!'),
  },
};
