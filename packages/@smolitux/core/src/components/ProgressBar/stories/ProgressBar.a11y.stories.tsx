import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof ProgressBar.A11y> = {
  title: 'Core/ProgressBar/A11y',
  component: ProgressBar.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der ProgressBar-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Aktueller Wert des Fortschritts',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimaler Wert',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximaler Wert',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Größe der Fortschrittsleiste',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Farbe der Fortschrittsleiste',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'striped', 'animated'],
      description: 'Variante der Fortschrittsleiste',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Unbestimmter Fortschritt',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Label anzeigen',
    },
    labelFormat: {
      control: { type: 'select' },
      options: ['percentage', 'value', 'valueAndMax', 'custom'],
      description: 'Format des Labels',
    },
    customLabel: {
      control: { type: 'text' },
      description: 'Benutzerdefiniertes Label (wenn labelFormat="custom")',
    },
    inverted: {
      control: { type: 'boolean' },
      description: 'Invertierter Fortschritt (von rechts nach links)',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Abgerundete Ecken',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA-Label für die Fortschrittsleiste',
    },
    description: {
      control: { type: 'text' },
      description: 'Beschreibung für Screenreader',
    },
    textValueFormat: {
      control: { type: 'text' },
      description: 'Format des Textwerts für Screenreader',
    },
    liveUpdate: {
      control: { type: 'boolean' },
      description: 'Live-Updates für Screenreader',
    },
    announceProgress: {
      control: { type: 'boolean' },
      description: 'Fortschritt für Screenreader ankündigen',
    },
    announceFormat: {
      control: { type: 'text' },
      description: 'Format der Ankündigung für Screenreader',
    },
    announcePoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Höflichkeit der Ankündigung für Screenreader',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar.A11y>;

export const Default: Story = {
  args: {
    value: 50,
    ariaLabel: 'Ladefortschritt',
    description: 'Datei wird hochgeladen',
    showLabel: true,
  },
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    indeterminate: true,
    ariaLabel: 'Ladefortschritt',
    description: 'Bitte warten, Daten werden geladen',
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: 75,
    max: 200,
    showLabel: true,
    labelFormat: 'valueAndMax',
    ariaLabel: 'Ladefortschritt',
    description: 'Datei wird hochgeladen',
  },
};

export const WithCustomTextValue: Story = {
  args: {
    value: 75,
    textValueFormat: 'Fortschritt: {value} von {max} ({percentage}%)',
    ariaLabel: 'Ladefortschritt',
    description: 'Datei wird hochgeladen',
    showLabel: true,
  },
};

export const WithLiveAnnouncements: Story = {
  args: {
    value: 75,
    announceProgress: true,
    announceFormat: 'Fortschritt: {percentage}% abgeschlossen',
    announcePoliteness: 'polite',
    ariaLabel: 'Ladefortschritt',
    description: 'Datei wird hochgeladen',
    showLabel: true,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2">Extra Small (xs)</p>
        <ProgressBar.A11y value={75} size="xs" ariaLabel="Extra kleiner Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Small (sm)</p>
        <ProgressBar.A11y value={75} size="sm" ariaLabel="Kleiner Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Medium (md)</p>
        <ProgressBar.A11y value={75} size="md" ariaLabel="Mittlerer Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Large (lg)</p>
        <ProgressBar.A11y value={75} size="lg" ariaLabel="Großer Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Extra Large (xl)</p>
        <ProgressBar.A11y value={75} size="xl" ariaLabel="Extra großer Fortschritt" showLabel />
      </div>
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2">Primary</p>
        <ProgressBar.A11y value={75} color="primary" ariaLabel="Primärer Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Secondary</p>
        <ProgressBar.A11y
          value={75}
          color="secondary"
          ariaLabel="Sekundärer Fortschritt"
          showLabel
        />
      </div>
      <div>
        <p className="mb-2">Success</p>
        <ProgressBar.A11y
          value={75}
          color="success"
          ariaLabel="Erfolgreicher Fortschritt"
          showLabel
        />
      </div>
      <div>
        <p className="mb-2">Danger</p>
        <ProgressBar.A11y
          value={75}
          color="danger"
          ariaLabel="Gefährlicher Fortschritt"
          showLabel
        />
      </div>
      <div>
        <p className="mb-2">Warning</p>
        <ProgressBar.A11y value={75} color="warning" ariaLabel="Warnender Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Info</p>
        <ProgressBar.A11y
          value={75}
          color="info"
          ariaLabel="Informierender Fortschritt"
          showLabel
        />
      </div>
      <div>
        <p className="mb-2">Neutral</p>
        <ProgressBar.A11y value={75} color="neutral" ariaLabel="Neutraler Fortschritt" showLabel />
      </div>
    </div>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2">Solid</p>
        <ProgressBar.A11y value={75} variant="solid" ariaLabel="Solider Fortschritt" showLabel />
      </div>
      <div>
        <p className="mb-2">Striped</p>
        <ProgressBar.A11y
          value={75}
          variant="striped"
          ariaLabel="Gestreifter Fortschritt"
          showLabel
        />
      </div>
      <div>
        <p className="mb-2">Animated</p>
        <ProgressBar.A11y
          value={75}
          variant="animated"
          ariaLabel="Animierter Fortschritt"
          showLabel
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isRunning) {
        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              setIsRunning(false);
              return 100;
            }
            return prev + 5;
          });
        }, 500);
      }

      return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
      setIsRunning(true);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div className="space-y-4">
        <ProgressBar.A11y
          value={progress}
          ariaLabel="Interaktiver Fortschritt"
          description="Fortschritt kann mit den Buttons gesteuert werden"
          showLabel
          announceProgress
          announceFormat="Fortschritt: {percentage}% abgeschlossen"
        />

        <div className="flex space-x-4">
          <Button onClick={handleStart} disabled={isRunning || progress >= 100}>
            Start
          </Button>
          <Button onClick={handleReset} disabled={progress === 0}>
            Zurücksetzen
          </Button>
        </div>
      </div>
    );
  },
};
