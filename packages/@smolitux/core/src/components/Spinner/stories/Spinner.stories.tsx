import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Größe des Spinners',
    },
    variant: {
      control: 'select',
      options: ['border', 'grow', 'dots', 'ring'],
      description: 'Variante des Spinners',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Farbe des Spinners',
    },
    speed: {
      control: 'number',
      description: 'Geschwindigkeit der Animation (in Sekunden)',
    },
    label: {
      control: 'text',
      description: 'Label für Screenreader',
    },
    centered: {
      control: 'boolean',
      description: 'Zentriert den Spinner im Container',
    },
    text: {
      control: 'text',
      description: 'Zeigt einen Text unter dem Spinner an',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Volle Breite des Containers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'border',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Spinner variant="border" />
      <Spinner variant="grow" />
      <Spinner variant="dots" />
      <Spinner variant="ring" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="danger" />
      <Spinner color="warning" />
      <Spinner color="info" />
      <Spinner color="light" />
      <Spinner color="dark" />
    </div>
  ),
};

export const WithText: Story = {
  args: {
    text: 'Wird geladen...',
  },
};

export const CustomSpeed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Spinner speed={0.5} />
      <Spinner speed={1} />
      <Spinner speed={2} />
    </div>
  ),
};

export const Centered: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '200px', border: '1px dashed #ccc', width: '100%' }}>
      <Spinner centered />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    text: 'Daten werden geladen...',
  },
};