import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../Dialog';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Core/Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob der Dialog geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn der Dialog geschlossen wird',
    },
    title: {
      control: 'text',
      description: 'Der Titel des Dialogs',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      },
      description: 'Die Größe des Dialogs',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description:
        'Gibt an, ob der Dialog geschlossen werden soll, wenn auf den Overlay geklickt wird',
    },
    closeOnEsc: {
      control: 'boolean',
      description:
        'Gibt an, ob der Dialog geschlossen werden soll, wenn die Escape-Taste gedrückt wird',
    },
    isCentered: {
      control: 'boolean',
      description: 'Gibt an, ob der Dialog zentriert werden soll',
    },
    scrollBehavior: {
      control: {
        type: 'select',
        options: ['inside', 'outside'],
      },
      description: 'Das Scroll-Verhalten des Dialogs',
    },
    returnFocusOnClose: {
      control: 'boolean',
      description:
        'Gibt an, ob der Fokus zurückgesetzt werden soll, wenn der Dialog geschlossen wird',
    },
    initialFocusRef: {
      description: 'Ref zum Element, das den initialen Fokus erhalten soll',
    },
    finalFocusRef: {
      description: 'Ref zum Element, das den Fokus erhalten soll, wenn der Dialog geschlossen wird',
    },
    blockScrollOnMount: {
      control: 'boolean',
      description: 'Gibt an, ob das Scrollen blockiert werden soll, wenn der Dialog geöffnet wird',
    },
    motionPreset: {
      control: {
        type: 'select',
        options: [
          'fade',
          'scale',
          'slide-from-top',
          'slide-from-bottom',
          'slide-from-left',
          'slide-from-right',
        ],
      },
      description: 'Die Animations-Voreinstellung für den Dialog',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Dialog öffnen</Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Beispiel-Dialog">
          <div className="p-6">
            <p className="mb-4">
              Dies ist ein einfacher Dialog mit einem Titel und einem Schließen-Button.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={() => setIsOpen(false)}>Bestätigen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setSize('xs');
              setIsOpen(true);
            }}
          >
            XS
          </Button>
          <Button
            onClick={() => {
              setSize('sm');
              setIsOpen(true);
            }}
          >
            SM
          </Button>
          <Button
            onClick={() => {
              setSize('md');
              setIsOpen(true);
            }}
          >
            MD
          </Button>
          <Button
            onClick={() => {
              setSize('lg');
              setIsOpen(true);
            }}
          >
            LG
          </Button>
          <Button
            onClick={() => {
              setSize('xl');
              setIsOpen(true);
            }}
          >
            XL
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

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Dialog`}
          size={size}
        >
          <div className="p-6">
            <p className="mb-4">Dies ist ein Dialog mit der Größe {size.toUpperCase()}.</p>
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Schließen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrollBehavior, setScrollBehavior] = React.useState<'inside' | 'outside'>('inside');

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setScrollBehavior('inside');
              setIsOpen(true);
            }}
          >
            Scroll Inside
          </Button>
          <Button
            onClick={() => {
              setScrollBehavior('outside');
              setIsOpen(true);
            }}
          >
            Scroll Outside
          </Button>
        </div>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Dialog mit langem Inhalt"
          scrollBehavior={scrollBehavior}
        >
          <div className="p-6">
            <p className="mb-4">
              Dieser Dialog hat einen langen Inhalt, der gescrollt werden muss. Scroll-Verhalten:{' '}
              {scrollBehavior}
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="mb-4">
                Absatz {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris.
              </p>
            ))}
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Schließen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithCustomHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Dialog mit benutzerdefiniertem Header</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          headerComponent={
            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Benutzerdefinierter Header</h2>
              <p className="text-sm opacity-80">Mit zusätzlichem Text</p>
            </div>
          }
        >
          <div className="p-6">
            <p className="mb-4">Dieser Dialog hat einen benutzerdefinierten Header.</p>
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Schließen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithCustomFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Dialog mit benutzerdefiniertem Footer</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Benutzerdefinierter Footer"
          footerComponent={
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Letzte Aktualisierung: Heute
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={() => setIsOpen(false)}>Speichern</Button>
              </div>
            </div>
          }
        >
          <div className="p-6">
            <p className="mb-4">Dieser Dialog hat einen benutzerdefinierten Footer.</p>
          </div>
        </Dialog>
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
        <Button onClick={() => setIsOpen(true)}>Formular-Dialog</Button>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Neuen Benutzer erstellen"
          initialFocusRef={initialRef}
        >
          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
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
                <Button type="submit">Speichern</Button>
              </div>
            </form>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithAnimations: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [motionPreset, setMotionPreset] = React.useState<string>('scale');

    return (
      <>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            onClick={() => {
              setMotionPreset('fade');
              setIsOpen(true);
            }}
          >
            Fade
          </Button>
          <Button
            onClick={() => {
              setMotionPreset('scale');
              setIsOpen(true);
            }}
          >
            Scale
          </Button>
          <Button
            onClick={() => {
              setMotionPreset('slide-from-top');
              setIsOpen(true);
            }}
          >
            Slide from Top
          </Button>
          <Button
            onClick={() => {
              setMotionPreset('slide-from-bottom');
              setIsOpen(true);
            }}
          >
            Slide from Bottom
          </Button>
          <Button
            onClick={() => {
              setMotionPreset('slide-from-left');
              setIsOpen(true);
            }}
          >
            Slide from Left
          </Button>
          <Button
            onClick={() => {
              setMotionPreset('slide-from-right');
              setIsOpen(true);
            }}
          >
            Slide from Right
          </Button>
        </div>

        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`Animation: ${motionPreset}`}
          motionPreset={motionPreset as any}
        >
          <div className="p-6">
            <p className="mb-4">Dieser Dialog verwendet die Animation "{motionPreset}".</p>
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Schließen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const NestedDialogs: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = React.useState(false);
    const [isSecondOpen, setIsSecondOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Ersten Dialog öffnen</Button>

        <Dialog isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)} title="Erster Dialog">
          <div className="p-6">
            <p className="mb-4">
              Dies ist der erste Dialog. Sie können einen weiteren Dialog öffnen.
            </p>
            <div className="flex justify-between">
              <Button onClick={() => setIsSecondOpen(true)}>Zweiten Dialog öffnen</Button>
              <Button variant="ghost" onClick={() => setIsFirstOpen(false)}>
                Schließen
              </Button>
            </div>
          </div>
        </Dialog>

        <Dialog isOpen={isSecondOpen} onClose={() => setIsSecondOpen(false)} title="Zweiter Dialog">
          <div className="p-6">
            <p className="mb-4">
              Dies ist der zweite Dialog, der über dem ersten Dialog geöffnet wurde.
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setIsSecondOpen(false)}>Schließen</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};
