import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import { tokens } from './tokens';
import Button from '@smolitux/core/components/Button';

const meta: Meta = {
  title: 'Theme/Showcase',
  component: ThemeProvider,
};
export default meta;

type Story = StoryObj;

const ToggleExample = () => {
  const { mode, toggleMode } = useTheme();
  return (
    <button onClick={toggleMode} style={{ padding: 8 }}>
      Mode: {mode}
    </button>
  );
};

export const ThemeShowcase: Story = {
  render: () => (
    <ThemeProvider>
      <ToggleExample />
    </ThemeProvider>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {Object.entries(tokens.colors.primary).map(([k, v]) => (
        <div key={k} style={{ background: v, width: 40, height: 40 }} />
      ))}
    </div>
  ),
};

export const TypographyScale: Story = {
  render: () => (
    <div>
      {Object.entries(tokens.typography.fontSize).map(([k, v]) => (
        <p key={k} style={{ fontSize: v, margin: 0 }}>
          {k} - {v}
        </p>
      ))}
    </div>
  ),
};

export const ComponentTheming: Story = {
  render: () => (
    <ThemeProvider>
      <Button>Button</Button>
    </ThemeProvider>
  ),
};
