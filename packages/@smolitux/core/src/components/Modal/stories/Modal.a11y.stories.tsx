import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Modal.A11y> = {
  title: 'Core/Modal/A11y',
  component: Modal.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Modal-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    title: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom', 'left', 'right'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    showConfirmButton: { control: 'boolean' },
    showCancelButton: { control: 'boolean' },
    confirmButtonText: { control: 'text' },
    cancelButtonText: { control: 'text' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
    isAlertDialog: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    description: { control: 'text' },
    announceOnOpen: { control: 'boolean' },
    openAnnouncement: { control: 'text' },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
    },
    animated: { control: 'boolean' },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal.A11y>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Barrierefreier Dialog',
    children: <p>Dies ist ein barrierefreier Dialog mit verbesserten ARIA-Attributen.</p>,
    ariaLabel: 'Beispiel-Dialog',
    description: 'Dieser Dialog demonstriert die barrierefreie Version der Modal-Komponente.',
  },
};

export const AlertDialog: Story = {
  args: {
    isOpen: true,
    title: 'Warnung',
    children: (
      <p>
        Möchten Sie diese Aktion wirklich durchführen? Diese Aktion kann nicht rückgängig gemacht
        werden.
      </p>
    ),
    isAlertDialog: true,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Bestätigen',
    cancelButtonText: 'Abbrechen',
    ariaLabel: 'Warnungs-Dialog',
    description: 'Dieser Dialog erfordert Ihre Bestätigung für eine wichtige Aktion.',
  },
};

export const WithAnnouncement: Story = {
  args: {
    isOpen: true,
    title: 'Dialog mit Ankündigung',
    children: <p>Dieser Dialog wird beim Öffnen für Screenreader angekündigt.</p>,
    announceOnOpen: true,
    openAnnouncement: 'Ein wichtiger Dialog wurde geöffnet. Bitte beachten Sie die Informationen.',
    liveRegionPoliteness: 'assertive',
    ariaLabel: 'Angekündigter Dialog',
    description: 'Dieser Dialog demonstriert die Verwendung von Live-Regionen für Ankündigungen.',
  },
};

export const WithCustomFooter: Story = {
  args: {
    isOpen: true,
    title: 'Dialog mit benutzerdefiniertem Footer',
    children: <p>Dieser Dialog hat einen benutzerdefinierten Footer mit zusätzlichen Optionen.</p>,
    footer: (
      <div className="flex justify-between w-full">
        <Button variant="outline" size="sm">
          Zurück
        </Button>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Speichern
          </Button>
          <Button variant="primary" size="sm">
            Weiter
          </Button>
        </div>
      </div>
    ),
    ariaLabel: 'Dialog mit benutzerdefiniertem Footer',
    description: 'Dieser Dialog demonstriert die Verwendung eines benutzerdefinierten Footers.',
  },
};

export const WithForm: Story = {
  args: {
    isOpen: true,
    title: 'Formular-Dialog',
    children: (
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </form>
    ),
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Absenden',
    cancelButtonText: 'Abbrechen',
    ariaLabel: 'Formular-Dialog',
    description: 'Dieser Dialog enthält ein Formular zur Eingabe von Daten.',
  },
};

export const WithAnimation: Story = {
  args: {
    isOpen: true,
    title: 'Animierter Dialog',
    children: <p>Dieser Dialog wird mit einer Animation geöffnet und geschlossen.</p>,
    animated: true,
    animation: 'slide',
    ariaLabel: 'Animierter Dialog',
    description: 'Dieser Dialog demonstriert die Verwendung von Animationen.',
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setSize('xs');
              setIsOpen(true);
            }}
          >
            Extra Small
          </Button>
          <Button
            onClick={() => {
              setSize('sm');
              setIsOpen(true);
            }}
          >
            Small
          </Button>
          <Button
            onClick={() => {
              setSize('md');
              setIsOpen(true);
            }}
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              setSize('lg');
              setIsOpen(true);
            }}
          >
            Large
          </Button>
          <Button
            onClick={() => {
              setSize('xl');
              setIsOpen(true);
            }}
          >
            Extra Large
          </Button>
          <Button
            onClick={() => {
              setSize('full');
              setIsOpen(true);
            }}
          >
            Full
          </Button>
        </div>

        <Modal.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Dialog`}
          size={size}
          ariaLabel={`Dialog in Größe ${size}`}
          description={`Dieser Dialog demonstriert die Größe ${size}.`}
        >
          <p>Dieser Dialog hat die Größe {size}.</p>
          <div className="mt-4">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal.A11y>
      </div>
    );
  },
};

export const DifferentPositions: Story = {
  render: () => {
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>(
      'center'
    );
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setPosition('center');
              setIsOpen(true);
            }}
          >
            Center
          </Button>
          <Button
            onClick={() => {
              setPosition('top');
              setIsOpen(true);
            }}
          >
            Top
          </Button>
          <Button
            onClick={() => {
              setPosition('bottom');
              setIsOpen(true);
            }}
          >
            Bottom
          </Button>
          <Button
            onClick={() => {
              setPosition('left');
              setIsOpen(true);
            }}
          >
            Left
          </Button>
          <Button
            onClick={() => {
              setPosition('right');
              setIsOpen(true);
            }}
          >
            Right
          </Button>
        </div>

        <Modal.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`Dialog Position: ${position}`}
          position={position}
          ariaLabel={`Dialog an Position ${position}`}
          description={`Dieser Dialog demonstriert die Position ${position}.`}
        >
          <p>Dieser Dialog wird an der Position {position} angezeigt.</p>
          <div className="mt-4">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal.A11y>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsOpen(true)}>Dialog öffnen</Button>

        {result && (
          <div className="p-4 bg-gray-100 rounded">
            <p>Ergebnis: {result}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setResult(null)}>
              Zurücksetzen
            </Button>
          </div>
        )}

        <Modal.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interaktiver Dialog"
          showConfirmButton
          showCancelButton
          confirmButtonText="Bestätigen"
          cancelButtonText="Abbrechen"
          onConfirm={() => {
            setResult('Bestätigt');
            setIsOpen(false);
          }}
          onCancel={() => {
            setResult('Abgebrochen');
            setIsOpen(false);
          }}
          ariaLabel="Interaktiver Dialog mit Bestätigung"
          description="Dieser Dialog demonstriert die Interaktion mit Bestätigen- und Abbrechen-Buttons."
          announceOnOpen
          openAnnouncement="Ein Dialog wurde geöffnet, der Ihre Bestätigung erfordert."
        >
          <p>Bitte bestätigen oder brechen Sie diese Aktion ab.</p>
          <p className="mt-2 text-sm text-gray-500">
            Dieser Dialog demonstriert die Interaktion mit der A11y-Version des Modals.
          </p>
        </Modal.A11y>
      </div>
    );
  },
};
