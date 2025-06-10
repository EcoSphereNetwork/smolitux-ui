import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SliderA11y from './Slider.a11y';

const meta: Meta<typeof SliderA11y> = {
  title: 'Components/SliderA11y',
  component: SliderA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'SliderA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom SliderA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive SliderA11y',
    onClick: () => alert('Clicked!'),
  },
};
