import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './theme-provider';

const meta: Meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
};
export default meta;

type Story = StoryObj;

const Demo = () => {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ padding: 8 }}>
      Current: {themeMode}
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
