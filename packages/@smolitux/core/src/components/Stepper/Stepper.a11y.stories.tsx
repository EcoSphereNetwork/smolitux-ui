import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StepperA11y from './Stepper.a11y';

const meta: Meta<typeof StepperA11y> = {
  title: 'Components/StepperA11y',
  component: StepperA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'StepperA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom StepperA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive StepperA11y',
    onClick: () => alert('Clicked!'),
  },
};
