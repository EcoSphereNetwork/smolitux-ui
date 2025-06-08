import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Utils/Primitives/Text',
  component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  render: () => <Text size="lg" weight="bold">Hello</Text>,
};
