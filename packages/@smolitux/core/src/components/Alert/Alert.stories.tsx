import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Core/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'filled', 'subtle'],
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide-right', 'slide-down', 'none'],
    },
    title: { control: 'text' },
    message: { control: 'text' },
    showIcon: { control: 'boolean' },
    closable: { control: 'boolean' },
    autoClose: { control: 'number' },
    autoFocus: { control: 'boolean' },
    animated: { control: 'boolean' },
    compact: { control: 'boolean' },
    bordered: { control: 'boolean' },
    rounded: { control: 'boolean' },
    shadow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Erfolg',
    message: 'Die Aktion wurde erfolgreich ausgeführt.',
    showIcon: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Fehler',
    message: 'Es ist ein Fehler aufgetreten.',
    showIcon: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Achtung',
    message: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    showIcon: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'Die Wartungsarbeiten beginnen in 5 Minuten.',
    showIcon: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    message: 'Dies ist eine Benachrichtigung ohne Titel.',
    showIcon: true,
  },
};

export const Closable: Story = {
  args: {
    type: 'info',
    title: 'Schließbar',
    message: 'Klicken Sie auf das X, um diese Benachrichtigung zu schließen.',
    showIcon: true,
    closable: true,
    onClose: () => console.log('Alert geschlossen'),
  },
};

export const OutlineVariant: Story = {
  args: {
    type: 'success',
    title: 'Outline-Variante',
    message: 'Dies ist eine Benachrichtigung mit Outline-Variante.',
    showIcon: true,
    variant: 'outline',
  },
};

export const FilledVariant: Story = {
  args: {
    type: 'error',
    title: 'Filled-Variante',
    message: 'Dies ist eine Benachrichtigung mit Filled-Variante.',
    showIcon: true,
    variant: 'filled',
  },
};

export const SubtleVariant: Story = {
  args: {
    type: 'warning',
    title: 'Subtle-Variante',
    message: 'Dies ist eine Benachrichtigung mit Subtle-Variante.',
    showIcon: true,
    variant: 'subtle',
  },
};

export const WithActions: Story = {
  args: {
    type: 'info',
    title: 'Mit Aktionen',
    message: 'Möchten Sie fortfahren?',
    showIcon: true,
    actions: [
      { label: 'Abbrechen', onClick: () => console.log('Abbrechen geklickt') },
      { label: 'Fortfahren', onClick: () => console.log('Fortfahren geklickt'), variant: 'primary' },
    ],
  },
};

export const Compact: Story = {
  args: {
    type: 'info',
    message: 'Dies ist eine kompakte Benachrichtigung.',
    showIcon: true,
    compact: true,
  },
};

export const WithShadow: Story = {
  args: {
    type: 'success',
    title: 'Mit Schatten',
    message: 'Diese Benachrichtigung hat einen Schatten.',
    showIcon: true,
    shadow: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    type: 'warning',
    title: 'Ohne Icon',
    message: 'Diese Benachrichtigung hat kein Icon.',
    showIcon: false,
  },
};

export const WithCustomContent: Story = {
  args: {
    type: 'info',
    title: 'Mit benutzerdefiniertem Inhalt',
    message: 'Diese Benachrichtigung enthält benutzerdefinierten Inhalt.',
    showIcon: true,
    children: (
      <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Hier können Sie beliebigen Inhalt hinzufügen.
        </p>
      </div>
    ),
  },
};