import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../Drawer';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Core/Overlay/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob der Drawer geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn der Drawer geschlossen wird',
    },
    placement: {
      control: {
        type: 'select',
        options: ['left', 'right', 'top', 'bottom'],
      },
      description: 'Die Platzierung des Drawers',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      },
      description: 'Die Größe des Drawers',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Gibt an, ob der Drawer geschlossen werden soll, wenn auf den Overlay geklickt wird',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Gibt an, ob der Drawer geschlossen werden soll, wenn die Escape-Taste gedrückt wird',
    },
    blockScrollOnMount: {
      control: 'boolean',
      description: 'Gibt an, ob das Scrollen blockiert werden soll, wenn der Drawer geöffnet wird',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Gibt an, ob der Fokus im Drawer gefangen werden soll',
    },
    returnFocusOnClose: {
      control: 'boolean',
      description: 'Gibt an, ob der Fokus zurückgesetzt werden soll, wenn der Drawer geschlossen wird',
    },
    initialFocusRef: {
      description: 'Ref zum Element, das den initialen Fokus erhalten soll',
    },
    finalFocusRef: {
      description: 'Ref zum Element, das den Fokus erhalten soll, wenn der Drawer geschlossen wird',
    },
    allowPinchZoom: {
      control: 'boolean',
      description: 'Gibt an, ob Pinch-Zoom erlaubt sein soll',
    },
    preserveScrollBarGap: {
      control: 'boolean',
      description: 'Gibt an, ob der Scrollbar-Gap beibehalten werden soll',
    },
    motionPreset: {
      control: {
        type: 'select',
        options: ['slide', 'scale', 'fade'],
      },
      description: 'Die Animations-Voreinstellung für den Drawer',
    },
    children: {
      description: 'Der Inhalt des Drawers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer öffnen</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Beispiel-Drawer"
        >
          <div className="p-6">
            <p className="mb-4">
              Dies ist ein einfacher Drawer mit einem Titel und einem Schließen-Button.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<'left' | 'right' | 'top' | 'bottom'>('right');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setPlacement('left'); setIsOpen(true); }}>
            Links
          </Button>
          <Button onClick={() => { setPlacement('right'); setIsOpen(true); }}>
            Rechts
          </Button>
          <Button onClick={() => { setPlacement('top'); setIsOpen(true); }}>
            Oben
          </Button>
          <Button onClick={() => { setPlacement('bottom'); setIsOpen(true); }}>
            Unten
          </Button>
        </div>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement={placement}
          title={`Drawer (${placement})`}
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer wird von {placement === 'left' ? 'links' : 
                placement === 'right' ? 'rechts' : 
                placement === 'top' ? 'oben' : 'unten'} eingeblendet.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [size, setSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setSize('xs'); setIsOpen(true); }}>XS</Button>
          <Button onClick={() => { setSize('sm'); setIsOpen(true); }}>SM</Button>
          <Button onClick={() => { setSize('md'); setIsOpen(true); }}>MD</Button>
          <Button onClick={() => { setSize('lg'); setIsOpen(true); }}>LG</Button>
          <Button onClick={() => { setSize('xl'); setIsOpen(true); }}>XL</Button>
          <Button onClick={() => { setSize('full'); setIsOpen(true); }}>Full</Button>
        </div>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={size}
          title={`Drawer (${size.toUpperCase()})`}
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer hat die Größe {size.toUpperCase()}.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const WithoutCloseOnOverlayClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer öffnen</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={false}
          title="Overlay-Klick deaktiviert"
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer kann nicht durch Klicken auf den Overlay geschlossen werden.
              Sie müssen den Schließen-Button verwenden.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithoutCloseOnEsc: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer öffnen</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnEsc={false}
          title="ESC-Taste deaktiviert"
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer kann nicht durch Drücken der ESC-Taste geschlossen werden.
              Sie müssen den Schließen-Button verwenden.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithCustomHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer mit benutzerdefiniertem Header</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          headerComponent={
            <div className="bg-blue-500 text-white p-4">
              <h2 className="text-xl font-bold">Benutzerdefinierter Header</h2>
              <p className="text-sm opacity-80">Mit zusätzlichem Text</p>
            </div>
          }
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer hat einen benutzerdefinierten Header.
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithCustomFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer mit benutzerdefiniertem Footer</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Benutzerdefinierter Footer"
          footerComponent={
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Letzte Aktualisierung: Heute
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  Speichern
                </Button>
              </div>
            </div>
          }
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer hat einen benutzerdefinierten Footer.
            </p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const initialRef = React.useRef<HTMLInputElement>(null);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Formular-Drawer</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Neuen Benutzer erstellen"
          initialFocusRef={initialRef}
        >
          <div className="p-6">
            <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  ref={initialRef}
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name eingeben"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E-Mail eingeben"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                  Abbrechen
                </Button>
                <Button type="submit">
                  Speichern
                </Button>
              </div>
            </form>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithAnimations: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [motionPreset, setMotionPreset] = React.useState<'slide' | 'scale' | 'fade'>('slide');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setMotionPreset('slide'); setIsOpen(true); }}>
            Slide
          </Button>
          <Button onClick={() => { setMotionPreset('scale'); setIsOpen(true); }}>
            Scale
          </Button>
          <Button onClick={() => { setMotionPreset('fade'); setIsOpen(true); }}>
            Fade
          </Button>
        </div>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          motionPreset={motionPreset}
          title={`Animation: ${motionPreset}`}
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer verwendet die Animation "{motionPreset}".
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const NestedDrawers: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = React.useState(false);
    const [isSecondOpen, setIsSecondOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Ersten Drawer öffnen</Button>
        
        <Drawer
          isOpen={isFirstOpen}
          onClose={() => setIsFirstOpen(false)}
          title="Erster Drawer"
        >
          <div className="p-6">
            <p className="mb-4">
              Dies ist der erste Drawer. Sie können einen weiteren Drawer öffnen.
            </p>
            <div className="flex justify-between">
              <Button onClick={() => setIsSecondOpen(true)}>
                Zweiten Drawer öffnen
              </Button>
              <Button variant="ghost" onClick={() => setIsFirstOpen(false)}>
                Schließen
              </Button>
            </div>
          </div>
        </Drawer>
        
        <Drawer
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Zweiter Drawer"
        >
          <div className="p-6">
            <p className="mb-4">
              Dies ist der zweite Drawer, der über dem ersten Drawer geöffnet wurde.
            </p>
            <Button onClick={() => setIsSecondOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Benutzerdefinierten Drawer öffnen
        </Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          headerComponent={
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
              <h2 className="text-xl font-bold">Benutzerdefinierter Drawer</h2>
            </div>
          }
          className="bg-gray-50 dark:bg-gray-900"
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer verwendet benutzerdefiniertes Styling.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Drawer mit langem Inhalt</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer mit Scroll"
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Drawer hat einen langen Inhalt, der gescrollt werden muss.
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="mb-4">
                Absatz {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
            <Button onClick={() => setIsOpen(false)}>
              Schließen
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};