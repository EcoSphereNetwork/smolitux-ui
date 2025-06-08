import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../Grid';
import { Box } from '../Box';

const meta: Meta<typeof Grid> = {
  title: 'Utils/Primitives/Grid',
  component: Grid,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid columns={2} gap={8}>
      <Box style={{ background: '#ddd', padding: '8px' }}>1</Box>
      <Box style={{ background: '#ddd', padding: '8px' }}>2</Box>
      <Box style={{ background: '#ddd', padding: '8px' }}>3</Box>
      <Box style={{ background: '#ddd', padding: '8px' }}>4</Box>
    </Grid>
  ),
};

export const Basic: Story = {
  render: () => (
    <Grid columns={3} gap={8} className="p-4 border">
      <Box className="p-2 bg-gray-200">1</Box>
      <Box className="p-2 bg-gray-200">2</Box>
      <Box className="p-2 bg-gray-200">3</Box>
    </Grid>
  ),
};
