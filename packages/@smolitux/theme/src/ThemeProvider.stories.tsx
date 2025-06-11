import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

const meta: Meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
};
export default meta;

type Story = StoryObj;

const Demo = () => {
  const { mode, toggleMode } = useTheme();
  return (
    <button onClick={toggleMode} style={{ padding: 8 }}>
      Current: {mode}
    </button>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  ),
};
