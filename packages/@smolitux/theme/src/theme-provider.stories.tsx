import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

const meta: Meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
};

export default meta;

type Story = StoryObj;

const Example: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current mode: {themeMode}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <Example />
    </ThemeProvider>
  ),
};
