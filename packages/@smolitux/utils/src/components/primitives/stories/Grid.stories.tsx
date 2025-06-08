import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../Grid';
import { Box } from '../Box';

const meta: Meta<typeof Grid> = {
  title: 'Utils/Primitives/Grid',
  component: Grid,
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
