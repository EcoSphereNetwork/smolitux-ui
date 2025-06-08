import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

const meta: Meta<typeof Box> = {
  title: 'Utils/Primitives/Box',
  component: Box,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Box content' },
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {};
export const CustomStyle: Story = {
  args: { style: { padding: '1rem', backgroundColor: '#f3f4f6' } },
};
export const Basic: Story = {
  args: {
    children: 'Content',
    className: 'p-4 border rounded',
  },
};
