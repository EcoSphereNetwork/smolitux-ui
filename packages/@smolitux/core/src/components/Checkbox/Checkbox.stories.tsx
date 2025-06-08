import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'filled', 'minimal'],
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    labelPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    indeterminate: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    bordered: { control: 'boolean' },
    rounded: { control: 'boolean' },
    shadow: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Standard Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Ausgewählte Checkbox',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Mit Hilfetext',
    helperText: 'Dies ist ein Hilfetext für die Checkbox',
  },
};

export const WithError: Story = {
  args: {
    label: 'Mit Fehlermeldung',
    error: 'Diese Checkbox muss ausgewählt werden',
    isInvalid: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminierter Zustand',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Deaktivierte Checkbox',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Erforderliche Checkbox',
    required: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Ladende Checkbox',
    isLoading: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Erfolgreich validierte Checkbox',
    isSuccess: true,
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox size="xs" label="Extra Small" />
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
      <Checkbox size="xl" label="Extra Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox variant="solid" label="Solid Variante" />
      <Checkbox variant="outline" label="Outline Variante" />
      <Checkbox variant="filled" label="Filled Variante" />
      <Checkbox variant="minimal" label="Minimal Variante" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox colorScheme="primary" label="Primary" checked />
      <Checkbox colorScheme="secondary" label="Secondary" checked />
      <Checkbox colorScheme="success" label="Success" checked />
      <Checkbox colorScheme="danger" label="Danger" checked />
      <Checkbox colorScheme="warning" label="Warning" checked />
      <Checkbox colorScheme="info" label="Info" checked />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox labelPosition="left" label="Label links" />
      <Checkbox labelPosition="right" label="Label rechts" />
    </div>
  ),
};

export const WithStyles: Story = {
  args: {
    label: 'Stilisierte Checkbox',
    bordered: true,
    rounded: true,
    shadow: true,
    hoverable: true,
  },
};

export const FormGroup: Story = {
  render: () => (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Nutzungsbedingungen</h3>
      <div className="flex flex-col space-y-3">
        <Checkbox
          label="Ich akzeptiere die Nutzungsbedingungen"
          required
          helperText="Sie müssen die Nutzungsbedingungen akzeptieren, um fortzufahren"
        />
        <Checkbox
          label="Ich möchte Newsletter erhalten"
          helperText="Wir senden Ihnen gelegentlich Updates zu unseren Produkten"
        />
        <Checkbox
          label="Ich erlaube die Verwendung von Cookies"
          helperText="Cookies helfen uns, Ihre Erfahrung zu verbessern"
        />
      </div>
    </div>
  ),
};
