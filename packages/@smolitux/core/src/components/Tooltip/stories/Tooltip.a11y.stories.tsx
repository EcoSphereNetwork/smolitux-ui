import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Tooltip.A11y> = {
  title: 'Core/Tooltip/A11y',
  component: Tooltip.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Tooltip-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Inhalt des Tooltips',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position des Tooltips relativ zum Trigger-Element',
    },
    delay: {
      control: { type: 'number' },
      description: 'Verzögerung vor dem Anzeigen des Tooltips (in ms)',
    },
    hideDelay: {
      control: { type: 'number' },
      description: 'Verzögerung vor dem Ausblenden des Tooltips (in ms)',
    },
    maxWidth: {
      control: { type: 'number' },
      description: 'Maximale Breite des Tooltips',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktiviert den Tooltip',
    },
    arrow: {
      control: 'boolean',
      description: 'Zeigt einen Pfeil an',
    },
    id: {
      control: 'text',
      description: 'ID für Barrierefreiheit',
    },
    role: {
      control: 'text',
      description: 'ARIA-Rolle für den Tooltip',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für den Tooltip',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Schließt den Tooltip bei Drücken der Escape-Taste',
    },
    showOnFocus: {
      control: 'boolean',
      description: 'Zeigt den Tooltip bei Fokus an',
    },
    showOnHover: {
      control: 'boolean',
      description: 'Zeigt den Tooltip bei Hover an',
    },
    showOnClick: {
      control: 'boolean',
      description: 'Zeigt den Tooltip bei Klick an',
    },
    hideOnBlur: {
      control: 'boolean',
      description: 'Versteckt den Tooltip bei Blur',
    },
    hideOnMouseLeave: {
      control: 'boolean',
      description: 'Versteckt den Tooltip bei Maus-Leave',
    },
    hideOnClickOutside: {
      control: 'boolean',
      description: 'Versteckt den Tooltip bei Klick außerhalb',
    },
    isOpen: {
      control: 'boolean',
      description: 'Tooltip ist sichtbar',
    },
    announce: {
      control: 'boolean',
      description: 'Tooltip soll für Screenreader angekündigt werden',
    },
    announcePoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Höflichkeitsstufe für Screenreader-Ankündigungen',
    },
    interactive: {
      control: 'boolean',
      description: 'Tooltip soll interaktiv sein',
    },
    focusable: {
      control: 'boolean',
      description: 'Tooltip soll fokussierbar sein',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Tooltip soll den Fokus einfangen',
    },
    returnFocus: {
      control: 'boolean',
      description: 'Tooltip soll den Fokus zurückgeben, wenn er geschlossen wird',
    },
    dismissible: {
      control: 'boolean',
      description: 'Tooltip soll schließbar sein',
    },
    dismissibleByEscape: {
      control: 'boolean',
      description: 'Tooltip soll durch Escape schließbar sein',
    },
    dismissibleByOutsideClick: {
      control: 'boolean',
      description: 'Tooltip soll durch Klick außerhalb schließbar sein',
    },
    persistent: {
      control: 'boolean',
      description: 'Tooltip soll persistent sein',
    },
    liveRegion: {
      control: 'boolean',
      description: 'Tooltip soll eine Live-Region sein',
    },
    atomic: {
      control: 'boolean',
      description: 'Tooltip soll atomar sein',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Tooltip soll einen Schließen-Button haben',
    },
    closeButtonLabel: {
      control: 'text',
      description: 'Label für den Schließen-Button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip.A11y>;

export const Default: Story = {
  args: {
    content: 'Dies ist ein barrierefreier Tooltip mit verbesserten ARIA-Attributen.',
    ariaLabel: 'Hilfeinformation',
    children: <Button>Hover über mich</Button>,
  },
};

export const WithDifferentPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-8">
      <div>
        <Tooltip.A11y content="Tooltip oben" position="top" ariaLabel="Tooltip oben">
          <Button>Oben</Button>
        </Tooltip.A11y>
      </div>

      <div className="flex space-x-8">
        <Tooltip.A11y content="Tooltip links" position="left" ariaLabel="Tooltip links">
          <Button>Links</Button>
        </Tooltip.A11y>

        <Tooltip.A11y content="Tooltip rechts" position="right" ariaLabel="Tooltip rechts">
          <Button>Rechts</Button>
        </Tooltip.A11y>
      </div>

      <div>
        <Tooltip.A11y content="Tooltip unten" position="bottom" ariaLabel="Tooltip unten">
          <Button>Unten</Button>
        </Tooltip.A11y>
      </div>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'Dieser Tooltip wird mit einer Verzögerung von 1 Sekunde angezeigt.',
    ariaLabel: 'Verzögerter Tooltip',
    delay: 1000,
    children: <Button>Hover über mich (1s Verzögerung)</Button>,
  },
};

export const WithArrow: Story = {
  args: {
    content: 'Dieser Tooltip hat einen Pfeil.',
    ariaLabel: 'Tooltip mit Pfeil',
    arrow: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'Dieser Tooltip hat keinen Pfeil.',
    ariaLabel: 'Tooltip ohne Pfeil',
    arrow: false,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithCustomMaxWidth: Story = {
  args: {
    content:
      'Dieser Tooltip hat eine benutzerdefinierte maximale Breite von 150px. Der Text wird umgebrochen, wenn er zu lang ist.',
    ariaLabel: 'Tooltip mit benutzerdefinierter Breite',
    maxWidth: 150,
    children: <Button>Hover über mich</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'Dieser Tooltip ist deaktiviert und wird nicht angezeigt.',
    ariaLabel: 'Deaktivierter Tooltip',
    disabled: true,
    children: <Button>Hover über mich (deaktiviert)</Button>,
  },
};

export const WithCustomId: Story = {
  args: {
    content: 'Dieser Tooltip hat eine benutzerdefinierte ID.',
    ariaLabel: 'Tooltip mit ID',
    id: 'custom-tooltip-id',
    children: <Button>Hover über mich</Button>,
  },
};

export const WithCustomRole: Story = {
  args: {
    content: 'Dieser Tooltip hat eine benutzerdefinierte ARIA-Rolle.',
    ariaLabel: 'Tooltip mit Rolle',
    role: 'status',
    children: <Button>Hover über mich</Button>,
  },
};

export const WithAssertiveAnnouncement: Story = {
  args: {
    content: 'Dieser Tooltip wird assertiv für Screenreader angekündigt.',
    ariaLabel: 'Assertiver Tooltip',
    announce: true,
    announcePoliteness: 'assertive',
    children: <Button>Hover über mich</Button>,
  },
};

export const Interactive: Story = {
  args: {
    content: 'Dieser Tooltip ist interaktiv und kann angeklickt werden.',
    ariaLabel: 'Interaktiver Tooltip',
    interactive: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const Focusable: Story = {
  args: {
    content: 'Dieser Tooltip ist fokussierbar.',
    ariaLabel: 'Fokussierbarer Tooltip',
    focusable: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithCloseButton: Story = {
  args: {
    content: 'Dieser Tooltip hat einen Schließen-Button.',
    ariaLabel: 'Tooltip mit Schließen-Button',
    hasCloseButton: true,
    closeButtonLabel: 'Schließen',
    interactive: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const ShowOnClick: Story = {
  args: {
    content: 'Dieser Tooltip wird bei Klick angezeigt.',
    ariaLabel: 'Tooltip bei Klick',
    showOnHover: false,
    showOnClick: true,
    children: <Button>Klick mich</Button>,
  },
};

export const Persistent: Story = {
  args: {
    content: 'Dieser Tooltip ist persistent und bleibt geöffnet, bis er explizit geschlossen wird.',
    ariaLabel: 'Persistenter Tooltip',
    persistent: true,
    hasCloseButton: true,
    closeButtonLabel: 'Schließen',
    interactive: true,
    showOnClick: true,
    showOnHover: false,
    children: <Button>Klick mich</Button>,
  },
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div className="p-2">
        <h3 className="text-lg font-bold mb-2">Tooltip mit reichem Inhalt</h3>
        <p className="mb-2">Dieser Tooltip enthält formatierten Text und Links.</p>
        <ul className="list-disc pl-5 mb-2">
          <li>Punkt 1</li>
          <li>Punkt 2</li>
          <li>Punkt 3</li>
        </ul>
        <a href="#" className="text-blue-500 hover:underline">
          Mehr erfahren
        </a>
      </div>
    ),
    ariaLabel: 'Tooltip mit reichem Inhalt',
    interactive: true,
    maxWidth: 300,
    children: <Button>Hover über mich</Button>,
  },
};

export const WithCustomStyles: Story = {
  args: {
    content: 'Dieser Tooltip hat benutzerdefinierte Styles.',
    ariaLabel: 'Tooltip mit benutzerdefinierten Styles',
    className: 'bg-purple-500 text-white',
    children: <Button>Hover über mich</Button>,
  },
};

export const WithDifferentTriggers: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Tooltip.A11y content="Tooltip für einen Button" ariaLabel="Button-Tooltip">
          <Button>Button</Button>
        </Tooltip.A11y>
      </div>

      <div>
        <Tooltip.A11y content="Tooltip für einen Link" ariaLabel="Link-Tooltip">
          <a href="#" className="text-blue-500 hover:underline">
            Link
          </a>
        </Tooltip.A11y>
      </div>

      <div>
        <Tooltip.A11y content="Tooltip für ein Icon" ariaLabel="Icon-Tooltip">
          <span className="inline-block p-2 bg-gray-200 rounded-full cursor-help">?</span>
        </Tooltip.A11y>
      </div>

      <div>
        <Tooltip.A11y content="Tooltip für ein Bild" ariaLabel="Bild-Tooltip">
          <img src="https://via.placeholder.com/50" alt="Platzhalterbild" className="rounded" />
        </Tooltip.A11y>
      </div>
    </div>
  ),
};
