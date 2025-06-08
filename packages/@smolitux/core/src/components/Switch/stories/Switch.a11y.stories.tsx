import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../';

const meta: Meta<typeof Switch.A11y> = {
  title: 'Core/Switch/A11y',
  component: Switch.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Switch-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label für den Switch',
    },
    checked: {
      control: 'boolean',
      description: 'Ist der Switch aktiviert?',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Standard-Aktivierungsstatus (unkontrollierter Modus)',
    },
    disabled: {
      control: 'boolean',
      description: 'Ist der Switch deaktiviert?',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Größe des Switches',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Farbschema des Switches',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
      description: 'Variante des Switches',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position des Labels',
    },
    isVertical: {
      control: 'boolean',
      description: 'Vertikale Ausrichtung',
    },
    required: {
      control: 'boolean',
      description: 'Ist der Switch erforderlich?',
    },
    error: {
      control: 'text',
      description: 'Fehlermeldung',
    },
    helperText: {
      control: 'text',
      description: 'Hilfetext',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für den Switch',
    },
    description: {
      control: 'text',
      description: 'Beschreibung für Screenreader',
    },
    checkedStateText: {
      control: 'text',
      description: 'Text für den aktivierten Zustand (für Screenreader)',
    },
    uncheckedStateText: {
      control: 'text',
      description: 'Text für den deaktivierten Zustand (für Screenreader)',
    },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Politeness der Live-Region',
    },
    busy: {
      control: 'boolean',
      description: 'Ist der Switch beschäftigt?',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Automatischer Fokus',
    },
    icons: {
      control: 'boolean',
      description: 'Icons anzeigen',
    },
    labels: {
      control: 'object',
      description: 'Labels für die Zustände',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch.A11y>;

export const Default: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    description: 'Aktivieren Sie diese Option, um Benachrichtigungen zu erhalten',
  },
};

export const WithCustomStateText: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    checkedStateText: 'aktiviert',
    uncheckedStateText: 'deaktiviert',
  },
};

export const WithError: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    error: 'Bitte wählen Sie eine Option',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    helperText: 'Sie können diese Einstellung jederzeit ändern',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    required: true,
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Label links</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          labelPosition="left"
        />
      </div>
      <div>
        <h3 className="mb-2">Label rechts</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          labelPosition="right"
        />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Extra Small (xs)</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          size="xs"
        />
      </div>
      <div>
        <h3 className="mb-2">Small (sm)</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          size="sm"
        />
      </div>
      <div>
        <h3 className="mb-2">Medium (md)</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          size="md"
        />
      </div>
      <div>
        <h3 className="mb-2">Large (lg)</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          size="lg"
        />
      </div>
      <div>
        <h3 className="mb-2">Extra Large (xl)</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          size="xl"
        />
      </div>
    </div>
  ),
};

export const DifferentColorSchemes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Primary</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="primary"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Secondary</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="secondary"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Success</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="success"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Danger</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="danger"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Warning</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="warning"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Info</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="info"
          checked
        />
      </div>
      <div>
        <h3 className="mb-2">Neutral</h3>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          colorScheme="neutral"
          checked
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    icons: true,
  },
};

export const WithLabels: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    labels: { on: 'AN', off: 'AUS' },
  },
};

export const VerticalLayout: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    isVertical: true,
  },
};

export const WithLiveRegion: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    liveRegionPoliteness: 'assertive',
  },
};

export const Busy: Story = {
  args: {
    label: 'Benachrichtigungen aktivieren',
    ariaLabel: 'Benachrichtigungen',
    busy: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (isChecked: boolean) => {
      setChecked(isChecked);
    };

    return (
      <div>
        <Switch.A11y
          label="Benachrichtigungen aktivieren"
          ariaLabel="Benachrichtigungen"
          checked={checked}
          onChange={handleChange}
        />

        <div className="mt-4">
          <p>Status: {checked ? 'Aktiviert' : 'Deaktiviert'}</p>
        </div>
      </div>
    );
  },
};
