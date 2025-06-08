import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';

const meta: Meta<typeof Text> = {
  title: 'Utils/Primitives/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    children: 'Hello Text',
    size: 'lg',
  },
};
