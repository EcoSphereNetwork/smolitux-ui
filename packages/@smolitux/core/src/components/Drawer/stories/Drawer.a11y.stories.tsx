import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Drawer.A11y> = {
  title: 'Core/Drawer/A11y',
  component: Drawer.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version des Drawers mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom']
    },
    width: { control: 'text' },
    height: { control: 'text' },
    accessibleLabel: { control: 'text' },
    accessibleDescription: { control: 'text' },
    a11yTexts: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof Drawer.A11y>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Drawer Titel',
    children: <p>Drawer Inhalt</p>,
    accessibleLabel: 'Informations-Drawer',
    accessibleDescription: 'Dieser Drawer enthaelt wichtige Informationen'
  }
};

export const Navigation: Story = {
  args: {
    isOpen: true,
    title: 'Navigation',
    children: (
      <nav>
        <ul className="space-y-2">
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Startseite</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Profil</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Einstellungen</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Hilfe</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Abmelden</a></li>
        </ul>
      </nav>
    ),
    isNavigation: true,
    accessibleLabel: 'Hauptnavigation',
    accessibleDescription: 'Enthaelt die Hauptnavigationspunkte der Anwendung'
  }
};

export const Form: Story = {
  args: {
    isOpen: true,
    title: 'Formular',
    children: (
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </form>
    ),
    isForm: true,
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Abbrechen</Button>
        <Button variant="primary">Speichern</Button>
      </div>
    ),
    accessibleLabel: 'Formular: Benutzerdaten eingeben',
    accessibleDescription: 'Bitte geben Sie Ihre Daten ein und klicken Sie auf Speichern'
  }
};

export const Search: Story = {
  args: {
    isOpen: true,
    title: 'Suche',
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Suchbegriff</label>
          <input
            type="search"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Suchen..."
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategorie</label>
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
        <Button variant="primary" className="w-full">Suchen</Button>
      </div>
    ),
    isSearch: true,
    accessibleLabel: 'Suchfunktion',
    accessibleDescription: 'Geben Sie einen Suchbegriff ein und waehlen Sie optional eine Kategorie aus'
  }
};

export const CustomA11yTexts: Story = {
  args: {
    isOpen: true,
    title: 'Drawer mit benutzerdefinierten Texten',
    children: <p>Dieser Drawer verwendet benutzerdefinierte Texte fuer Screenreader.</p>,
    a11yTexts: {
      closeButtonLabel: 'Drawer schliessen',
      drawerTitleLabel: 'Benutzerdefinierter Drawer',
      drawerDescriptionLabel: 'Benutzerdefinierter Drawer-Inhalt',
      overlayLabel: 'Klicken Sie hier, um den Drawer zu schliessen'
    },
    accessibleLabel: 'Drawer mit angepassten Screenreader-Texten',
    accessibleDescription: 'Dieser Drawer demonstriert die Anpassung von Screenreader-Texten'
  }
};

export const DifferentPlacements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="p-4">
        <div className="mb-4 space-y-2">
          <div>
            <Button 
              variant="primary" 
              onClick={() => { setPlacement('left'); setIsOpen(true); }}
              className="mr-2"
            >
              Links
            </Button>
            <Button 
              variant="primary" 
              onClick={() => { setPlacement('right'); setIsOpen(true); }}
              className="mr-2"
            >
              Rechts
            </Button>
            <Button 
              variant="primary" 
              onClick={() => { setPlacement('top'); setIsOpen(true); }}
              className="mr-2"
            >
              Oben
            </Button>
            <Button 
              variant="primary" 
              onClick={() => { setPlacement('bottom'); setIsOpen(true); }}
            >
              Unten
            </Button>
          </div>
        </div>
        
        <Drawer.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${placement} Drawer`}
          placement={placement}
          accessibleLabel={`Drawer von ${placement}`}
          accessibleDescription={`Dieser Drawer wird von ${placement} eingeblendet`}
          trapFocus={true}
        >
          <p>Dieser Drawer wird von {placement} eingeblendet.</p>
          <div className="mt-4">
            <Button onClick={() => setIsOpen(false)}>Schliessen</Button>
          </div>
        </Drawer.A11y>
      </div>
    );
  }
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Drawer oeffnen</Button>
        
        <Drawer.A11y
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interaktiver Drawer"
          accessibleLabel="Interaktiver Drawer mit Formular"
          accessibleDescription="Dieser Drawer enthaelt ein interaktives Formular"
          trapFocus={true}
          isForm={true}
          footer={
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  alert('Formular abgesendet!');
                  setIsOpen(false);
                }}
              >
                Absenden
              </Button>
            </div>
          }
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="interactive-name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="interactive-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="interactive-message" className="block text-sm font-medium text-gray-700">Nachricht</label>
              <textarea
                id="interactive-message"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </form>
        </Drawer.A11y>
      </div>
    );
  }
};