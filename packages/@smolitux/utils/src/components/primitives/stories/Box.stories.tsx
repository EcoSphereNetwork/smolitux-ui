import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

const meta: Meta<typeof Box> = {
  title: 'Utils/Primitives/Box',
  component: Box,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    children: 'Content',
    className: 'p-4 border rounded',
  },
};
