import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../';

const meta: Meta<typeof RadioGroup.A11y> = {
  title: 'Core/RadioGroup/A11y',
  component: RadioGroup.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der RadioGroup-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Die verfügbaren Optionen',
    },
    value: {
      control: 'text',
      description: 'Der aktuell ausgewählte Wert',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardwert (wenn nicht kontrolliert)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Größe der Radiobuttons',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Farbe der Radiobuttons',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Ausrichtung der Radiobuttons',
    },
    spacing: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Abstand zwischen den Radiobuttons',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Deaktiviert alle Radiobuttons',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für die Radiogruppe',
    },
    ariaLabelledby: {
      control: 'text',
      description: 'ARIA-Labelledby für die Radiogruppe',
    },
    ariaDescribedby: {
      control: 'text',
      description: 'ARIA-Describedby für die Radiogruppe',
    },
    description: {
      control: 'text',
      description: 'Beschreibung für die Radiogruppe (für Screenreader)',
    },
    showDescription: {
      control: 'boolean',
      description: 'Ob die Beschreibung sichtbar sein soll',
    },
    liveRegion: {
      control: 'boolean',
      description: 'Ob die Radiogruppe eine Live-Region haben soll',
    },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Politeness der Live-Region',
    },
    announceChanges: {
      control: 'boolean',
      description: 'Ob Änderungen angekündigt werden sollen',
    },
    announceFormat: {
      control: 'text',
      description: 'Format der Ankündigung',
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Ob die Radiogruppe eine Tastaturnavigation haben soll',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Ob der Fokus automatisch auf den ersten Radiobutton gesetzt werden soll',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup.A11y>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen',
  },
};

export const WithDescription: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen',
    description: 'Bitte wählen Sie eine der folgenden Optionen aus',
    showDescription: true,
  },
};

export const WithOptionDescriptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1', description: 'Beschreibung für Option 1' },
      { value: 'option2', label: 'Option 2', description: 'Beschreibung für Option 2' },
      { value: 'option3', label: 'Option 3', description: 'Beschreibung für Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen',
  },
};

export const HorizontalOrientation: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen',
    orientation: 'horizontal',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Small (sm)</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Kleine Radiobuttons"
          size="sm"
        />
      </div>
      <div>
        <h3 className="mb-2">Medium (md)</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Mittlere Radiobuttons"
          size="md"
        />
      </div>
      <div>
        <h3 className="mb-2">Large (lg)</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Große Radiobuttons"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Primary</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Primäre Radiobuttons"
          color="primary"
        />
      </div>
      <div>
        <h3 className="mb-2">Secondary</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Sekundäre Radiobuttons"
          color="secondary"
        />
      </div>
      <div>
        <h3 className="mb-2">Success</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Erfolgreiche Radiobuttons"
          color="success"
        />
      </div>
      <div>
        <h3 className="mb-2">Danger</h3>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ]}
          defaultValue="option1"
          ariaLabel="Gefährliche Radiobuttons"
          color="danger"
        />
      </div>
    </div>
  ),
};

export const WithLiveRegion: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    ariaLabel: 'Auswahloptionen mit Live-Region',
    liveRegion: true,
    announceChanges: true,
    announceFormat: 'Option {label} ausgewählt',
    liveRegionPoliteness: 'polite',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <div>
        <RadioGroup.A11y
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          value={value}
          onChange={handleChange}
          ariaLabel="Kontrollierte Radiobuttons"
          liveRegion={true}
          announceChanges={true}
        />

        <div className="mt-4">
          <p>Ausgewählter Wert: {value}</p>
        </div>
      </div>
    );
  },
};
