import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Dialog.A11y> = {
  title: 'Core/Dialog/A11y',
  component: Dialog.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version des Dialogs mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error', 'confirm'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    accessibleLabel: { control: 'text' },
    accessibleDescription: { control: 'text' },
    a11yTexts: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog.A11y>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Dialog Titel',
    children: <p>Dialog Inhalt</p>,
    accessibleLabel: 'Informations-Dialog',
    accessibleDescription: 'Dieser Dialog enthaelt wichtige Informationen',
  },
};

export const AlertDialog: Story = {
  args: {
    isOpen: true,
    title: 'Warnung',
    children: <p>Moechten Sie dieses Element wirklich loeschen?</p>,
    isAlertDialog: true,
    variant: 'warning',
    confirmLabel: 'Loeschen',
    cancelLabel: 'Abbrechen',
    accessibleLabel: 'Warnung: Loeschbestaetigung',
    accessibleDescription: 'Diese Aktion kann nicht rueckgaengig gemacht werden',
  },
};

export const FormDialog: Story = {
  args: {
    isOpen: true,
    title: 'Formular',
    children: (
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="mb-4">
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
    isFormDialog: true,
    confirmLabel: 'Speichern',
    cancelLabel: 'Abbrechen',
    accessibleLabel: 'Formular: Benutzerdaten eingeben',
    accessibleDescription: 'Bitte geben Sie Ihre Daten ein und klicken Sie auf Speichern',
  },
};

export const SearchDialog: Story = {
  args: {
    isOpen: true,
    title: 'Suche',
    children: (
      <div>
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Suchbegriff
          </label>
          <input
            type="search"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Suchen..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Kategorie
          </label>
          <select
            id="category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Alle Kategorien</option>
            <option value="1">Kategorie 1</option>
            <option value="2">Kategorie 2</option>
            <option value="3">Kategorie 3</option>
          </select>
        </div>
      </div>
    ),
    isSearchDialog: true,
    confirmLabel: 'Suchen',
    cancelLabel: 'Abbrechen',
    accessibleLabel: 'Suchfunktion',
    accessibleDescription:
      'Geben Sie einen Suchbegriff ein und waehlen Sie optional eine Kategorie aus',
  },
};

export const CustomA11yTexts: Story = {
  args: {
    isOpen: true,
    title: 'Dialog mit benutzerdefinierten Texten',
    children: <p>Dieser Dialog verwendet benutzerdefinierte Texte fuer Screenreader.</p>,
    a11yTexts: {
      closeButtonLabel: 'Dialog schliessen',
      confirmButtonLabel: 'Akzeptieren',
      cancelButtonLabel: 'Verwerfen',
      dialogTitleLabel: 'Wichtige Information',
      dialogDescriptionLabel: 'Bitte lesen Sie die folgenden Informationen sorgfaeltig',
    },
    accessibleLabel: 'Dialog mit angepassten Screenreader-Texten',
    accessibleDescription: 'Dieser Dialog demonstriert die Anpassung von Screenreader-Texten',
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Dialog oeffnen</Button>

        <Dialog.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interaktiver Dialog"
          confirmLabel="Bestaetigen"
          cancelLabel="Abbrechen"
          onConfirm={() => {
            alert('Bestaetigt!');
            setIsOpen(false);
          }}
          onCancel={() => {
            alert('Abgebrochen!');
            setIsOpen(false);
          }}
          accessibleLabel="Interaktiver Dialog mit Bestaetigung"
          accessibleDescription="Dieser Dialog demonstriert die Interaktion mit Bestaetigen- und Abbrechen-Buttons"
          trapFocus={true}
          autoFocus={true}
        >
          <p>Dieser Dialog demonstriert die Interaktion mit der A11y-Version des Dialogs.</p>
          <p>
            Er enthaelt verbesserte Barrierefreiheits-Funktionen wie Fokus-Einfangen und
            automatischen Fokus.
          </p>
        </Dialog.A11y>
      </div>
    );
  },
};
