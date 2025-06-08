import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Utils/Primitives/Box',
  component: Box,
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => <Box style={{ padding: 16, background: '#eee' }}>Box</Box>,
};
