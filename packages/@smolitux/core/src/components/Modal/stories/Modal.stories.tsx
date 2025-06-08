import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../Modal';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Core/Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Kontrolliert, ob das Modal geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn das Modal geschlossen wird',
    },
    title: {
      control: 'text',
      description: 'Der Titel des Modals',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      },
      description: 'Die Größe des Modals',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Schließt das Modal, wenn die Escape-Taste gedrückt wird',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Schließt das Modal, wenn auf den Overlay geklickt wird',
    },
    animation: {
      control: {
        type: 'select',
        options: ['fade', 'scale', 'slide-up', 'slide-right', 'slide-down', 'slide-left', 'none'],
      },
      description: 'Die Animationsart des Modals',
    },
    overlayClassName: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen für den Overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Modal öffnen</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Beispiel-Modal">
          <p>Dies ist ein einfaches Modal mit einem Titel und Inhalt.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal>
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
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Modal`}
          size={size}
        >
          <p>Dies ist ein Modal mit der Größe {size.toUpperCase()}.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Modal mit Footer öffnen</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal mit Footer"
          footer={
            <div className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={() => setIsOpen(false)}>Speichern</Button>
            </div>
          }
        >
          <p>Dies ist ein Modal mit einem Footer, der Aktionsschaltflächen enthält.</p>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Formular-Modal öffnen</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Formular-Modal"
          footer={
            <div className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit" form="modal-form" onClick={() => setIsOpen(false)}>
                Absenden
              </Button>
            </div>
          }
        >
          <form id="modal-form" className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const WithScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrollable, setScrollable] = React.useState(true);

    return (
      <>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => {
              setScrollable(true);
              setIsOpen(true);
            }}
          >
            Scroll aktiviert
          </Button>
          <Button
            onClick={() => {
              setScrollable(false);
              setIsOpen(true);
            }}
          >
            Scroll deaktiviert
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal mit langem Inhalt"
          scrollable={scrollable}
        >
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
                nisl nisl eget nisl.
              </p>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithCustomAnimation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [animationType, setAnimationType] = React.useState<
      'fade' | 'scale' | 'slide-up' | 'slide-right' | 'none'
    >('fade');

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setAnimationType('fade');
              setIsOpen(true);
            }}
          >
            Fade
          </Button>
          <Button
            onClick={() => {
              setAnimationType('scale');
              setIsOpen(true);
            }}
          >
            Scale
          </Button>
          <Button
            onClick={() => {
              setAnimationType('slide-up');
              setIsOpen(true);
            }}
          >
            Slide Up
          </Button>
          <Button
            onClick={() => {
              setAnimationType('slide-right');
              setIsOpen(true);
            }}
          >
            Slide Right
          </Button>
          <Button
            onClick={() => {
              setAnimationType('none');
              setIsOpen(true);
            }}
          >
            No Animation
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`Modal mit ${animationType} Animation`}
          animation={animationType}
        >
          <p>Dies ist ein Modal mit einer benutzerdefinierten Animation.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const NestedModals: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = React.useState(false);
    const [isSecondOpen, setIsSecondOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Erstes Modal öffnen</Button>
        <Modal isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)} title="Erstes Modal">
          <p>Dies ist das erste Modal. Sie können ein weiteres Modal von hier aus öffnen.</p>
          <div className="mt-4 flex justify-between">
            <Button variant="outlined" onClick={() => setIsFirstOpen(false)}>
              Schließen
            </Button>
            <Button onClick={() => setIsSecondOpen(true)}>Zweites Modal öffnen</Button>
          </div>

          <Modal isOpen={isSecondOpen} onClose={() => setIsSecondOpen(false)} title="Zweites Modal">
            <p>Dies ist das zweite, verschachtelte Modal.</p>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setIsSecondOpen(false)}>Schließen</Button>
            </div>
          </Modal>
        </Modal>
      </>
    );
  },
};

export const WithCustomStyles: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Stilisiertes Modal öffnen</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Benutzerdefiniertes Modal"
          overlayClassName="bg-blue-900/70 backdrop-blur-sm"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl shadow-xl"
        >
          <p>Dies ist ein Modal mit benutzerdefinierten Stilen für den Overlay und den Inhalt.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Schließen</Button>
          </div>
        </Modal>
      </>
    );
  },
};
