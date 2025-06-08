import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
import { Box } from './Box';

const meta: Meta<typeof Flex> = {
  title: 'Utils/Primitives/Flex',
  component: Flex,
};
export default meta;

type Story = StoryObj<typeof Flex>;

export const Row: Story = {
  render: () => (
    <Flex gap={8}>
      <Box style={{ background: '#eee', padding: 8 }}>Item 1</Box>
      <Box style={{ background: '#eee', padding: 8 }}>Item 2</Box>
    </Flex>
  ),
};
