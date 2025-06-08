import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

const meta: Meta<typeof Box> = {
  title: 'Utils/Primitives/Box',
  component: Box,
  args: { children: 'Box content' },
};
export default meta;

export const Default: StoryObj<typeof Box> = {};
export const CustomStyle: StoryObj<typeof Box> = {
  args: { style: { padding: '1rem', backgroundColor: '#f3f4f6' } },
};
