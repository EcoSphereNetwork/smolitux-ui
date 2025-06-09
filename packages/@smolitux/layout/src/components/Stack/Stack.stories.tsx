import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <div className="bg-gray-200 p-2">Item 1</div>
      <div className="bg-gray-200 p-2">Item 2</div>
      <div className="bg-gray-200 p-2">Item 3</div>
    </Stack>
  ),
  args: {
    spacing: 2,
    direction: 'vertical',
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <Stack {...args}>
      <div className="bg-gray-200 p-2">Item 1</div>
      <div className="bg-gray-200 p-2">Item 2</div>
      <div className="bg-gray-200 p-2">Item 3</div>
    </Stack>
  ),
  args: {
    spacing: 4,
    direction: 'horizontal',
  },
};

export const WithDivider: Story = {
  render: (args) => (
    <Stack {...args} divider={<span className="mx-1">|</span>}>
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </Stack>
  ),
  args: {
    direction: 'horizontal',
    spacing: 2,
  },
};

export const Responsive: Story = {
  render: (args) => (
    <Stack {...args}>
      <div className="bg-gray-200 p-2">Item 1</div>
      <div className="bg-gray-200 p-2">Item 2</div>
      <div className="bg-gray-200 p-2">Item 3</div>
    </Stack>
  ),
  args: {
    direction: { sm: 'vertical', md: 'horizontal' },
    spacing: { sm: 2, lg: 6 },
  },
};
