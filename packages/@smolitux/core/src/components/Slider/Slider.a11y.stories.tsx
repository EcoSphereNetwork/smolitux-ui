import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider.a11y } from './Slider.a11y';

const meta: Meta<typeof Slider.a11y> = {
  title: 'Components/Slider.a11y',
  component: Slider.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Slider.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Slider.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Slider.a11y',
    onClick: () => alert('Clicked!'),
  },
};
