import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio.a11y } from './Radio.a11y';

const meta: Meta<typeof Radio.a11y> = {
  title: 'Components/Radio.a11y',
  component: Radio.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Radio.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Radio.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Radio.a11y',
    onClick: () => alert('Clicked!'),
  },
};
