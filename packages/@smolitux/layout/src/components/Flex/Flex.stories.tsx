import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({ children }) => (
  <div style={{ padding: '10px', background: '#e5e7eb', border: '1px solid #d1d5db' }}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: [<Box key="1">Item 1</Box>, <Box key="2">Item 2</Box>, <Box key="3">Item 3</Box>],
  },
};

export const Responsive: Story = {
  args: {
    direction: { sm: 'column', md: 'row' },
    justify: { md: 'center' },
    gap: { sm: 'xs', md: 'md' },
    children: [<Box key="1">One</Box>, <Box key="2">Two</Box>],
  },
};
