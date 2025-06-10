import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SlideA11y from './Slide.a11y';

const meta: Meta<typeof SlideA11y> = {
  title: 'Components/SlideA11y',
  component: SlideA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'SlideA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom SlideA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive SlideA11y',
    onClick: () => alert('Clicked!'),
  },
};
