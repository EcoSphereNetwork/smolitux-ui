import type { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#e5e7eb', padding: '10px', border: '1px solid #d1d5db' }}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Grid gap="sm">
      <Grid.Item xs={12} md={6}>
        <Box>Item 1</Box>
      </Grid.Item>
      <Grid.Item xs={12} md={6}>
        <Box>Item 2</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid gap={{ sm: 'xs', md: 'md' }} cols={{ sm: 2, md: 4 }} justify={{ md: 'center' }}>
      <Grid.Item xs={12} sm={6} md={2}>
        <Box>One</Box>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={2}>
        <Box>Two</Box>
      </Grid.Item>
    </Grid>
  ),
};
