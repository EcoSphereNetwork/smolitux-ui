import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioA11y from './Radio.a11y';

const meta: Meta<typeof RadioA11y> = {
  title: 'Components/RadioA11y',
  component: RadioA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RadioA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RadioA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RadioA11y',
    onClick: () => alert('Clicked!'),
  },
};
