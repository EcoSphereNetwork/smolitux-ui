import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slide.a11y } from './Slide.a11y';

const meta: Meta<typeof Slide.a11y> = {
  title: 'Components/Slide.a11y',
  component: Slide.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Slide.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Slide.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Slide.a11y',
    onClick: () => alert('Clicked!'),
  },
};
