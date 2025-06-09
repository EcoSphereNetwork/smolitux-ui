import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from './index';

const meta: Meta = {
  title: 'Theme/Tokens',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {Object.entries(tokens.colors.primary).map(([k, v]) => (
        <div key={k} style={{ backgroundColor: v, width: 40, height: 40 }} title={k} />
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Object.entries(tokens.spacing).map(([k, v]) => (
        <li key={k} style={{ marginBottom: '0.25rem' }}>
          {k}: {v}
        </li>
      ))}
    </ul>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Object.entries(tokens.breakpoints).map(([k, v]) => (
        <li key={k}>{k}: {v}px</li>
      ))}
    </ul>
  ),
};

export const Typography: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Object.entries(tokens.typography.fontWeight).map(([k, v]) => (
        <li key={k}>{k}: {v}</li>
      ))}
    </ul>
  ),
};
