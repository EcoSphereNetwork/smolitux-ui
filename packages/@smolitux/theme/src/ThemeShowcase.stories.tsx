import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './theme-provider';
import { defaultTheme } from './Default';
import Button from '../../core/src/components/Button';

const meta: Meta = {
  title: 'Theme/Showcase',
  component: ThemeProvider,
};
export default meta;

type Story = StoryObj;

const ToggleExample = () => {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ padding: 8 }}>
      Mode: {themeMode}
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
      {Object.entries(defaultTheme.colors.primary).map(([k, v]) => (
        <div key={k} style={{ background: v, width: 40, height: 40 }} />
      ))}
    </div>
  ),
};

export const TypographyScale: Story = {
  render: () => (
    <div>
      {Object.entries(defaultTheme.typography.fontSize).map(([k, v]) => (
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
