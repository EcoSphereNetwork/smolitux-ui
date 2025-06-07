import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flexbox',
  component: Flex,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Flex>;

export const Responsive: Story = {
  render: () => (
    <Flex direction={{ sm: 'column', md: 'row' }} gap={{ sm: 2, lg: 6 }}>
      <div className="bg-gray-200 p-2">Item 1</div>
      <div className="bg-gray-200 p-2">Item 2</div>
    </Flex>
  ),
};
