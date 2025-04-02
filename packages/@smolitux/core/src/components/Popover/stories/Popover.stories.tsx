import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../Popover';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Core/Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn der Popover geschlossen wird',
    },
    trigger: {
      description: 'Das Element, das den Popover auslöst',
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'right',
          'right-start',
          'right-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
        ],
      },
      description: 'Die Platzierung des Popovers relativ zum Trigger',
    },
    offset: {
      control: 'array',
      description: 'Der Offset des Popovers [skidding, distance]',
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover geschlossen werden soll, wenn außerhalb geklickt wird',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover geschlossen werden soll, wenn die Escape-Taste gedrückt wird',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Gibt an, ob der Fokus im Popover gefangen werden soll',
    },
    returnFocusOnClose: {
      control: 'boolean',
      description: 'Gibt an, ob der Fokus zurückgesetzt werden soll, wenn der Popover geschlossen wird',
    },
    initialFocusRef: {
      description: 'Ref zum Element, das den initialen Fokus erhalten soll',
    },
    arrowSize: {
      control: 'number',
      description: 'Die Größe des Pfeils',
    },
    arrowShadowColor: {
      control: 'color',
      description: 'Die Schattenfarbe des Pfeils',
    },
    gutter: {
      control: 'number',
      description: 'Der Abstand zwischen dem Popover und dem Trigger',
    },
    flip: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover umgedreht werden soll, wenn nicht genügend Platz vorhanden ist',
    },
    preventOverflow: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover am Überlaufen gehindert werden soll',
    },
    matchWidth: {
      control: 'boolean',
      description: 'Gibt an, ob der Popover die gleiche Breite wie der Trigger haben soll',
    },
    children: {
      description: 'Der Inhalt des Popovers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <Button onClick={() => setIsOpen(!isOpen)}>
            Popover öffnen
          </Button>
        }
      >
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">Popover-Titel</h3>
          <p>Dies ist der Inhalt des Popovers.</p>
        </div>
      </Popover>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = React.useState<any>('bottom');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button size="sm" onClick={() => setPlacement('top')}>Top</Button>
          <Button size="sm" onClick={() => setPlacement('top-start')}>Top Start</Button>
          <Button size="sm" onClick={() => setPlacement('top-end')}>Top End</Button>
          <Button size="sm" onClick={() => setPlacement('right')}>Right</Button>
          <Button size="sm" onClick={() => setPlacement('right-start')}>Right Start</Button>
          <Button size="sm" onClick={() => setPlacement('right-end')}>Right End</Button>
          <Button size="sm" onClick={() => setPlacement('bottom')}>Bottom</Button>
          <Button size="sm" onClick={() => setPlacement('bottom-start')}>Bottom Start</Button>
          <Button size="sm" onClick={() => setPlacement('bottom-end')}>Bottom End</Button>
          <Button size="sm" onClick={() => setPlacement('left')}>Left</Button>
          <Button size="sm" onClick={() => setPlacement('left-start')}>Left Start</Button>
          <Button size="sm" onClick={() => setPlacement('left-end')}>Left End</Button>
        </div>
        
        <div className="flex justify-center">
          <Popover
            trigger={
              <Button>Platzierung: {placement}</Button>
            }
            placement={placement}
          >
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Popover-Titel</h3>
              <p>Platzierung: {placement}</p>
            </div>
          </Popover>
        </div>
      </div>
    );
  },
};

export const WithArrow: Story = {
  render: () => (
    <Popover
      trigger={<Button>Mit Pfeil</Button>}
      showArrow
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Popover mit Pfeil</h3>
        <p>Dieser Popover hat einen Pfeil, der auf den Trigger zeigt.</p>
      </div>
    </Popover>
  ),
};

export const WithCustomArrow: Story = {
  render: () => (
    <Popover
      trigger={<Button>Benutzerdefinierter Pfeil</Button>}
      showArrow
      arrowSize={10}
      arrowShadowColor="#3182ce"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Popover mit benutzerdefiniertem Pfeil</h3>
        <p>Dieser Popover hat einen benutzerdefinierten Pfeil mit angepasster Größe und Schattenfarbe.</p>
      </div>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover
      trigger={<Button>Mit Schließen-Button</Button>}
      showCloseButton
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Popover mit Schließen-Button</h3>
        <p>Dieser Popover hat einen Schließen-Button in der oberen rechten Ecke.</p>
      </div>
    </Popover>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Popover
      trigger={<Button>Mit Header</Button>}
      header={
        <div className="bg-blue-500 text-white p-3">
          <h3 className="font-medium">Popover-Header</h3>
        </div>
      }
    >
      <div className="p-4">
        <p>Dieser Popover hat einen benutzerdefinierten Header.</p>
      </div>
    </Popover>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Popover
      trigger={<Button>Mit Footer</Button>}
      footer={
        <div className="bg-gray-100 dark:bg-gray-800 p-3 flex justify-end">
          <Button size="sm" variant="ghost">Abbrechen</Button>
          <Button size="sm" className="ml-2">Speichern</Button>
        </div>
      }
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Popover mit Footer</h3>
        <p>Dieser Popover hat einen benutzerdefinierten Footer mit Aktions-Buttons.</p>
      </div>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => {
    const initialFocusRef = React.useRef<HTMLInputElement>(null);
    
    return (
      <Popover
        trigger={<Button>Formular</Button>}
        initialFocusRef={initialFocusRef}
        trapFocus
      >
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Anmelden</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-Mail
              </label>
              <input
                ref={initialFocusRef}
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E-Mail eingeben"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passwort eingeben"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Anmelden
              </Button>
            </div>
          </form>
        </div>
      </Popover>
    );
  },
};

export const WithLazyRender: Story = {
  render: () => (
    <Popover
      trigger={<Button>Lazy Rendering</Button>}
      lazyRendering
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Lazy Rendering</h3>
        <p>Dieser Popover wird erst gerendert, wenn er geöffnet wird.</p>
        <p className="text-sm text-gray-500 mt-2">
          Zeitstempel: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </Popover>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Popover
      trigger={
        <div className="cursor-pointer text-blue-500 hover:text-blue-700 underline">
          Mehr Informationen
        </div>
      }
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Zusätzliche Informationen</h3>
        <p>Hier finden Sie weitere Informationen zu diesem Thema.</p>
      </div>
    </Popover>
  ),
};

export const WithHoverTrigger: Story = {
  render: () => (
    <Popover
      trigger={<Button>Hover über mich</Button>}
      triggerEvent="hover"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Hover-Popover</h3>
        <p>Dieser Popover wird beim Hovern über den Trigger angezeigt.</p>
      </div>
    </Popover>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Popover
      trigger={
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Benutzerdefiniertes Styling
        </Button>
      }
      className="border-2 border-purple-500 rounded-lg shadow-lg"
      showArrow
      arrowClassName="border-purple-500"
    >
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
        <h3 className="text-lg font-bold mb-2">Benutzerdefiniertes Styling</h3>
        <p>Dieser Popover verwendet benutzerdefiniertes Styling mit Farbverläufen und Schatten.</p>
        <button className="mt-4 px-4 py-2 bg-white text-purple-500 rounded-full font-medium">
          Aktion
        </button>
      </div>
    </Popover>
  ),
};

export const WithAnimation: Story = {
  render: () => (
    <Popover
      trigger={<Button>Mit Animation</Button>}
      animation="scale"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Animierter Popover</h3>
        <p>Dieser Popover wird mit einer Skalierungsanimation angezeigt.</p>
      </div>
    </Popover>
  ),
};

export const WithTooltipStyle: Story = {
  render: () => (
    <Popover
      trigger={<Button>Tooltip-Stil</Button>}
      triggerEvent="hover"
      showArrow
      className="bg-gray-900 text-white"
    >
      <div className="p-2 text-sm">
        Dies ist ein Popover im Tooltip-Stil.
      </div>
    </Popover>
  ),
};

export const WithInteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<any>('bottom');
    const [showArrow, setShowArrow] = React.useState(true);
    const [showCloseButton, setShowCloseButton] = React.useState(false);
    const [triggerEvent, setTriggerEvent] = React.useState<'click' | 'hover'>('click');
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Platzierung</label>
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="top">Top</option>
              <option value="right">Right</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Trigger-Event</label>
            <select
              value={triggerEvent}
              onChange={(e) => setTriggerEvent(e.target.value as 'click' | 'hover')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="click">Click</option>
              <option value="hover">Hover</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showArrow"
              checked={showArrow}
              onChange={(e) => setShowArrow(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showArrow" className="ml-2 block text-sm">
              Pfeil anzeigen
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showCloseButton"
              checked={showCloseButton}
              onChange={(e) => setShowCloseButton(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showCloseButton" className="ml-2 block text-sm">
              Schließen-Button anzeigen
            </label>
          </div>
        </div>
        
        <div className="flex justify-center pt-8">
          <Popover
            isOpen={triggerEvent === 'click' ? isOpen : undefined}
            onClose={() => setIsOpen(false)}
            trigger={
              <Button
                onClick={() => triggerEvent === 'click' && setIsOpen(!isOpen)}
              >
                Popover {triggerEvent === 'click' ? (isOpen ? 'schließen' : 'öffnen') : 'anzeigen'}
              </Button>
            }
            placement={placement}
            showArrow={showArrow}
            showCloseButton={showCloseButton}
            triggerEvent={triggerEvent}
          >
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Interaktiver Popover</h3>
              <p>Platzierung: {placement}</p>
              <p>Trigger-Event: {triggerEvent}</p>
              <p>Pfeil: {showArrow ? 'Ja' : 'Nein'}</p>
              <p>Schließen-Button: {showCloseButton ? 'Ja' : 'Nein'}</p>
            </div>
          </Popover>
        </div>
      </div>
    );
  },
};