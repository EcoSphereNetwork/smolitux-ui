import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Box } from './Box';

const meta: Meta<typeof Grid> = {
  title: 'Utils/Primitives/Grid',
  component: Grid,
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const TwoColumns: Story = {
  render: () => (
    <Grid columns={2} gap={8}>
      <Box style={{ background: '#eee', padding: 8 }}>1</Box>
      <Box style={{ background: '#eee', padding: 8 }}>2</Box>
    </Grid>
  ),
};
