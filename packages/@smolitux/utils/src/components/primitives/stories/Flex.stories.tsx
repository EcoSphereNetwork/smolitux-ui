import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Utils/Primitives/Flex',
  component: Flex,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Flex>;

export const Row: Story = {
  render: () => (
    <Flex gap={8} className="border p-4">
      <Box className="p-2 bg-gray-200">1</Box>
      <Box className="p-2 bg-gray-200">2</Box>
      <Box className="p-2 bg-gray-200">3</Box>
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={8} className="border p-4">
      <Box className="p-2 bg-gray-200">A</Box>
      <Box className="p-2 bg-gray-200">B</Box>
      <Box className="p-2 bg-gray-200">C</Box>
    </Flex>
  ),
};
