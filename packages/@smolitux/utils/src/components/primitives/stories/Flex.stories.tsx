import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Utils/Primitives/Flex',
  component: Flex,
};
export default meta;

type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  render: () => (
    <Flex gap={8} justify="center" align="center">
      <Box style={{ background: '#ddd', padding: '8px' }}>A</Box>
      <Box style={{ background: '#ddd', padding: '8px' }}>B</Box>
    </Flex>
  ),
};
