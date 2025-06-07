import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Core/Forms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label des TextAreas' },
    helperText: { control: 'text', description: 'Hilfetext unter dem Feld' },
    error: { control: 'text', description: 'Fehlermeldung' },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Groesse des TextAreas',
    },
    variant: {
      control: { type: 'select', options: ['outline', 'filled', 'unstyled', 'flushed'] },
      description: 'Visuelle Variante',
    },
    fullWidth: { control: 'boolean', description: 'Breite 100% einnehmen' },
    autoResize: { control: 'boolean', description: 'Passt Hoehe automatisch an' },
    rows: { control: 'number', description: 'Anzahl der Zeilen' },
    maxLength: { control: 'number', description: 'Maximale Zeichenanzahl' },
    showCount: { control: 'boolean', description: 'Zeichenzahl anzeigen' },
    placeholder: { control: 'text', description: 'Platzhaltertext' },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  args: {
    label: 'Beschreibung',
    placeholder: 'Geben Sie eine Beschreibung ein',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextArea size="sm" placeholder="Small" />
      <TextArea size="md" placeholder="Medium" />
      <TextArea size="lg" placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextArea variant="outline" placeholder="Outline" />
      <TextArea variant="filled" placeholder="Filled" />
      <TextArea variant="flushed" placeholder="Flushed" />
      <TextArea variant="unstyled" placeholder="Unstyled" />
    </div>
  ),
};

export const WithCounter: Story = {
  args: {
    label: 'Kommentar',
    maxLength: 100,
    showCount: true,
    placeholder: 'Maximal 100 Zeichen',
  },
};
