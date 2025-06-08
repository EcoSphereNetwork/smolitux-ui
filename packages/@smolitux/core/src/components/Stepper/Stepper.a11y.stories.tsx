import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper.a11y } from './Stepper.a11y';

const meta: Meta<typeof Stepper.a11y> = {
  title: 'Components/Stepper.a11y',
  component: Stepper.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stepper.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Stepper.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Stepper.a11y',
    onClick: () => alert('Clicked!'),
  },
};
