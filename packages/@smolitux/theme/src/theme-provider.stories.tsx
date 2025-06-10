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
  const { mode, toggleMode } = useTheme();
  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>Toggle</button>
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
