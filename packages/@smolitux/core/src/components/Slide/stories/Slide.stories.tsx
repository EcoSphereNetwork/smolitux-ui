import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Slide } from '../Slide';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Slide> = {
  title: 'Core/Animation/Slide',
  component: Slide,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Gibt an, ob das Element eingeblendet werden soll',
    },
    direction: {
      control: {
        type: 'select',
        options: ['up', 'down', 'left', 'right'],
      },
      description: 'Die Richtung der Slide-Animation',
    },
    timeout: {
      control: 'number',
      description: 'Die Dauer der Animation in Millisekunden',
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'Gibt an, ob das Element aus dem DOM entfernt werden soll, wenn es ausgeblendet ist',
    },
    mountOnEnter: {
      control: 'boolean',
      description: 'Gibt an, ob das Element erst in das DOM eingefügt werden soll, wenn es eingeblendet wird',
    },
    appear: {
      control: 'boolean',
      description: 'Gibt an, ob die Animation beim ersten Rendern ausgeführt werden soll',
    },
    easing: {
      control: 'text',
      description: 'Die Beschleunigungsfunktion der Animation',
    },
    onEnter: {
      action: 'onEnter',
      description: 'Callback, der aufgerufen wird, wenn die Einblendanimation beginnt',
    },
    onEntering: {
      action: 'onEntering',
      description: 'Callback, der aufgerufen wird, während die Einblendanimation läuft',
    },
    onEntered: {
      action: 'onEntered',
      description: 'Callback, der aufgerufen wird, wenn die Einblendanimation abgeschlossen ist',
    },
    onExit: {
      action: 'onExit',
      description: 'Callback, der aufgerufen wird, wenn die Ausblendanimation beginnt',
    },
    onExiting: {
      action: 'onExiting',
      description: 'Callback, der aufgerufen wird, während die Ausblendanimation läuft',
    },
    onExited: {
      action: 'onExited',
      description: 'Callback, der aufgerufen wird, wenn die Ausblendanimation abgeschlossen ist',
    },
    children: {
      description: 'Der Inhalt, der ein- und ausgeblendet werden soll',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slide>;

export const Basic: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction="right">
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Slide-Animation</h3>
              <p>
                Dieser Inhalt wird mit einer Slide-Animation ein- und ausgeblendet.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const Directions: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [direction, setDirection] = React.useState<'up' | 'down' | 'left' | 'right'>('right');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setDirection('up'); setIsVisible(true); }}>
            Nach oben
          </Button>
          <Button onClick={() => { setDirection('down'); setIsVisible(true); }}>
            Nach unten
          </Button>
          <Button onClick={() => { setDirection('left'); setIsVisible(true); }}>
            Nach links
          </Button>
          <Button onClick={() => { setDirection('right'); setIsVisible(true); }}>
            Nach rechts
          </Button>
          <Button onClick={() => setIsVisible(!isVisible)} variant="outline">
            {isVisible ? 'Ausblenden' : 'Einblenden'}
          </Button>
        </div>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction={direction}>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Richtung: {direction}</h3>
              <p>
                Diese Slide-Animation verwendet die Richtung "{direction}".
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithCustomDuration: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction="right" timeout={2000}>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Langsame Animation</h3>
              <p>
                Diese Slide-Animation dauert 2 Sekunden (2000ms).
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithUnmountOnExit: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction="right" unmountOnExit>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Unmount bei Exit</h3>
              <p>
                Dieser Inhalt wird aus dem DOM entfernt, wenn er ausgeblendet ist.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithMountOnEnter: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction="right" mountOnEnter>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Mount bei Enter</h3>
              <p>
                Dieser Inhalt wird erst in das DOM eingefügt, wenn er eingeblendet wird.
                Anfangs ist er nicht im DOM vorhanden.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [status, setStatus] = React.useState('Sichtbar');
    
    const handleEnter = () => setStatus('Wird eingeblendet...');
    const handleEntered = () => setStatus('Sichtbar');
    const handleExit = () => setStatus('Wird ausgeblendet...');
    const handleExited = () => setStatus('Unsichtbar');
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Ausblenden' : 'Einblenden'}
          </Button>
          <div className="ml-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            Status: {status}
          </div>
        </div>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide
            in={isVisible}
            direction="right"
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExited={handleExited}
          >
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Mit Callbacks</h3>
              <p>
                Dieser Inhalt verwendet Callbacks, um den Status der Animation anzuzeigen.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithCustomEasing: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide
            in={isVisible}
            direction="right"
            easing="cubic-bezier(0.68, -0.55, 0.27, 1.55)"
          >
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
              <h3 className="text-lg font-medium mb-2">Benutzerdefinierte Beschleunigung</h3>
              <p>
                Diese Slide-Animation verwendet eine benutzerdefinierte Beschleunigungsfunktion.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const WithInitialAnimation: Story = {
  render: () => {
    return (
      <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
        <Slide in={true} direction="right" appear={true} timeout={2000}>
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md absolute top-0 left-0 right-0 bottom-0">
            <h3 className="text-lg font-medium mb-2">Initiale Animation</h3>
            <p>
              Dieser Inhalt wird mit einer Slide-Animation eingeblendet, wenn die Komponente
              zum ersten Mal gerendert wird.
            </p>
          </div>
        </Slide>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>
        
        <div className="relative h-[200px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Slide in={isVisible} direction="right">
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md absolute top-0 left-0 right-0 bottom-0 shadow-lg">
              <h3 className="text-lg font-bold mb-2">Benutzerdefiniertes Styling</h3>
              <p>
                Dieser Inhalt verwendet benutzerdefiniertes Styling mit Farbverläufen und Schatten.
              </p>
              <button className="mt-4 px-4 py-2 bg-white text-purple-500 rounded-full font-medium">
                Aktion
              </button>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const SlideMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Menü schließen' : 'Menü öffnen'}
        </Button>
        
        <div className="relative h-[300px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <div className="p-6 bg-white dark:bg-gray-800 absolute top-0 left-0 right-0 bottom-0">
            <h3 className="text-lg font-medium mb-4">Hauptinhalt</h3>
            <p>
              Dies ist der Hauptinhalt der Seite. Klicken Sie auf den Button, um das Menü zu öffnen.
            </p>
          </div>
          
          <Slide in={isOpen} direction="right" unmountOnExit>
            <div className="p-6 bg-gray-100 dark:bg-gray-700 absolute top-0 left-0 w-[200px] bottom-0 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Menü</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block py-2 hover:text-blue-500">Startseite</a>
                </li>
                <li>
                  <a href="#" className="block py-2 hover:text-blue-500">Über uns</a>
                </li>
                <li>
                  <a href="#" className="block py-2 hover:text-blue-500">Dienstleistungen</a>
                </li>
                <li>
                  <a href="#" className="block py-2 hover:text-blue-500">Kontakt</a>
                </li>
              </ul>
            </div>
          </Slide>
        </div>
      </div>
    );
  },
};

export const SlideNotification: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState<{ id: number; message: string }[]>([]);
    const nextId = React.useRef(1);
    
    const addNotification = () => {
      const id = nextId.current++;
      const message = `Benachrichtigung ${id}`;
      setNotifications((prev) => [...prev, { id, message }]);
      
      // Automatisch nach 3 Sekunden entfernen
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    };
    
    return (
      <div className="space-y-4">
        <Button onClick={addNotification}>
          Benachrichtigung hinzufügen
        </Button>
        
        <div className="relative h-[300px] w-[300px] border border-dashed border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <div className="p-6 bg-white dark:bg-gray-800 absolute top-0 left-0 right-0 bottom-0">
            <h3 className="text-lg font-medium mb-4">Benachrichtigungen</h3>
            <p>
              Klicken Sie auf den Button, um eine Benachrichtigung hinzuzufügen.
              Die Benachrichtigungen werden automatisch nach 3 Sekunden ausgeblendet.
            </p>
            
            <div className="absolute bottom-0 right-0 p-4 space-y-2">
              {notifications.map((notification) => (
                <Slide
                  key={notification.id}
                  in={true}
                  direction="left"
                  unmountOnExit
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-md shadow-md">
                    {notification.message}
                  </div>
                </Slide>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};