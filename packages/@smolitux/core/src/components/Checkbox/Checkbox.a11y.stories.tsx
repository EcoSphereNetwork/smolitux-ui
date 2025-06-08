import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox.a11y } from './Checkbox.a11y';

const meta: Meta<typeof Checkbox.a11y> = {
  title: 'Components/Checkbox.a11y',
  component: Checkbox.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Checkbox.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Checkbox.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Checkbox.a11y',
    onClick: () => alert('Clicked!'),
  },
};
