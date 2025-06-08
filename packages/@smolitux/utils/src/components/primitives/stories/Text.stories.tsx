import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';

const meta: Meta<typeof Text> = {
  title: 'Utils/Primitives/Text',
  component: Text,
  args: { children: 'Example text' },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
export const BoldLarge: Story = {
  args: { weight: 'bold', size: 'lg' },
};
