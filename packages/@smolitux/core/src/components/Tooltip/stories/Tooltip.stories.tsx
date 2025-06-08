import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Der Inhalt des Tooltips',
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top',
          'right',
          'bottom',
          'left',
          'top-start',
          'top-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end',
          'left-start',
          'left-end',
        ],
      },
      description: 'Die Platzierung des Tooltips relativ zum Trigger-Element',
    },
    trigger: {
      control: {
        type: 'select',
        options: ['hover', 'click', 'focus'],
      },
      description: 'Das Ereignis, das den Tooltip auslöst',
    },
    delay: {
      control: 'number',
      description: 'Die Verzögerung in Millisekunden, bevor der Tooltip angezeigt wird',
    },
    offset: {
      control: 'number',
      description: 'Der Abstand in Pixeln zwischen dem Tooltip und dem Trigger-Element',
    },
    arrow: {
      control: 'boolean',
      description: 'Zeigt einen Pfeil an, der auf das Trigger-Element zeigt',
    },
    maxWidth: {
      control: 'text',
      description: 'Die maximale Breite des Tooltips',
    },
    variant: {
      control: {
        type: 'select',
        options: ['light', 'dark', 'info', 'success', 'warning', 'error'],
      },
      description: 'Die Variante des Tooltips',
    },
    isOpen: {
      control: 'boolean',
      description: 'Kontrolliert, ob der Tooltip angezeigt wird',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Schließt den Tooltip, wenn die Escape-Taste gedrückt wird',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Schließt den Tooltip, wenn außerhalb geklickt wird',
    },
    interactive: {
      control: 'boolean',
      description: 'Erlaubt Interaktionen mit dem Tooltip-Inhalt',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Dies ist ein Tooltip',
    children: <Button>Hover über mich</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex justify-center">
        <Tooltip content="Tooltip oben links" placement="top-start">
          <Button>Oben links</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip oben" placement="top">
          <Button>Oben</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip oben rechts" placement="top-end">
          <Button>Oben rechts</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip links" placement="left">
          <Button>Links</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip in der Mitte" placement="bottom">
          <Button variant="primary">Mitte</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip rechts" placement="right">
          <Button>Rechts</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip unten links" placement="bottom-start">
          <Button>Unten links</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip unten" placement="bottom">
          <Button>Unten</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip unten rechts" placement="bottom-end">
          <Button>Unten rechts</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Triggers: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Tooltip content="Hover-Tooltip" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="Klick-Tooltip" trigger="click">
        <Button>Klick</Button>
      </Tooltip>
      <Tooltip content="Fokus-Tooltip" trigger="focus">
        <Button>Fokus (Tab)</Button>
      </Tooltip>
    </div>
  ),
};

export const WithArrow: Story = {
  args: {
    content: 'Tooltip mit Pfeil',
    arrow: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'Tooltip ohne Pfeil',
    arrow: false,
    children: <Button>Hover über mich</Button>,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="Light Tooltip" variant="light">
        <Button>Light</Button>
      </Tooltip>
      <Tooltip content="Dark Tooltip" variant="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Info Tooltip" variant="info">
        <Button>Info</Button>
      </Tooltip>
      <Tooltip content="Success Tooltip" variant="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip content="Warning Tooltip" variant="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip content="Error Tooltip" variant="error">
        <Button>Error</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'Tooltip mit Verzögerung (500ms)',
    delay: 500,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithOffset: Story = {
  args: {
    content: 'Tooltip mit Abstand (16px)',
    offset: 16,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithMaxWidth: Story = {
  args: {
    content:
      'Dies ist ein Tooltip mit einem sehr langen Text, der auf mehrere Zeilen umgebrochen werden sollte, um die maximale Breite zu demonstrieren.',
    maxWidth: '200px',
    children: <Button>Hover über mich</Button>,
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center space-y-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Tooltip schließen' : 'Tooltip öffnen'}
        </Button>
        <Tooltip content="Kontrollierter Tooltip" isOpen={isOpen}>
          <Button variant="outlined">Tooltip-Trigger</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Interactive: Story = {
  args: {
    content: (
      <div>
        <p className="mb-2">Interaktiver Tooltip mit einem Link</p>
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Beispiel-Link
        </a>
      </div>
    ),
    interactive: true,
    children: <Button>Hover und interagiere</Button>,
  },
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div className="p-1">
        <h3 className="text-sm font-bold mb-2">Tooltip-Titel</h3>
        <p className="text-xs mb-2">Dies ist ein Tooltip mit reichhaltigem Inhalt.</p>
        <div className="flex justify-between text-xs">
          <span className="text-green-500">Verfügbar</span>
          <span>10 Stück</span>
        </div>
      </div>
    ),
    maxWidth: '250px',
    interactive: true,
    children: <Button>Hover für Details</Button>,
  },
};
