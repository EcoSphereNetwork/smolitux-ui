import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Zoom } from '../Zoom';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Zoom> = {
  title: 'Core/Animation/Zoom',
  component: Zoom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Gibt an, ob das Element eingeblendet werden soll',
    },
    timeout: {
      control: 'number',
      description: 'Die Dauer der Animation in Millisekunden',
    },
    unmountOnExit: {
      control: 'boolean',
      description:
        'Gibt an, ob das Element aus dem DOM entfernt werden soll, wenn es ausgeblendet ist',
    },
    mountOnEnter: {
      control: 'boolean',
      description:
        'Gibt an, ob das Element erst in das DOM eingefügt werden soll, wenn es eingeblendet wird',
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
type Story = StoryObj<typeof Zoom>;

export const Basic: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible}>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Zoom-Animation</h3>
              <p>Dieser Inhalt wird mit einer Zoom-Animation ein- und ausgeblendet.</p>
            </div>
          </Zoom>
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

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible} timeout={2000}>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Langsame Zoom-Animation</h3>
              <p>Diese Zoom-Animation dauert 2 Sekunden (2000ms).</p>
            </div>
          </Zoom>
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

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible} unmountOnExit>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Unmount bei Exit</h3>
              <p>
                Dieser Inhalt wird aus dem DOM entfernt, wenn er ausgeblendet ist. Der umgebende
                Rahmen bleibt sichtbar.
              </p>
            </div>
          </Zoom>
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

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible} mountOnEnter>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Mount bei Enter</h3>
              <p>
                Dieser Inhalt wird erst in das DOM eingefügt, wenn er eingeblendet wird. Anfangs ist
                er nicht im DOM vorhanden.
              </p>
            </div>
          </Zoom>
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
          <div className="ml-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">Status: {status}</div>
        </div>

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom
            in={isVisible}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExited={handleExited}
          >
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Mit Callbacks</h3>
              <p>Dieser Inhalt verwendet Callbacks, um den Status der Animation anzuzeigen.</p>
            </div>
          </Zoom>
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

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible} easing="cubic-bezier(0.68, -0.55, 0.27, 1.55)">
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Benutzerdefinierte Beschleunigung</h3>
              <p>Diese Zoom-Animation verwendet eine benutzerdefinierte Beschleunigungsfunktion.</p>
            </div>
          </Zoom>
        </div>
      </div>
    );
  },
};

export const WithInitialAnimation: Story = {
  render: () => {
    return (
      <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
        <Zoom in={true} appear={true} timeout={2000}>
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Initiale Animation</h3>
            <p>
              Dieser Inhalt wird mit einer Zoom-Animation eingeblendet, wenn die Komponente zum
              ersten Mal gerendert wird.
            </p>
          </div>
        </Zoom>
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

        <div className="p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <Zoom in={isVisible}>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-lg">
              <h3 className="text-lg font-bold mb-2">Benutzerdefiniertes Styling</h3>
              <p>
                Dieser Inhalt verwendet benutzerdefiniertes Styling mit Farbverläufen und Schatten.
              </p>
              <button className="mt-4 px-4 py-2 bg-white text-purple-500 rounded-full font-medium">
                Aktion
              </button>
            </div>
          </Zoom>
        </div>
      </div>
    );
  },
};

export const MultipleElements: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Zoom in={isVisible} timeout={500}>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 1</h3>
              <p>Schnelle Animation (500ms)</p>
            </div>
          </Zoom>

          <Zoom in={isVisible} timeout={1000}>
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 2</h3>
              <p>Mittlere Animation (1000ms)</p>
            </div>
          </Zoom>

          <Zoom in={isVisible} timeout={1500}>
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 3</h3>
              <p>Langsame Animation (1500ms)</p>
            </div>
          </Zoom>

          <Zoom in={isVisible} timeout={2000}>
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 4</h3>
              <p>Sehr langsame Animation (2000ms)</p>
            </div>
          </Zoom>
        </div>
      </div>
    );
  },
};

export const ImageGallery: Story = {
  render: () => {
    const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

    const images = [
      'https://via.placeholder.com/150/3498db/ffffff?text=Bild+1',
      'https://via.placeholder.com/150/e74c3c/ffffff?text=Bild+2',
      'https://via.placeholder.com/150/2ecc71/ffffff?text=Bild+3',
      'https://via.placeholder.com/150/f39c12/ffffff?text=Bild+4',
      'https://via.placeholder.com/150/9b59b6/ffffff?text=Bild+5',
      'https://via.placeholder.com/150/1abc9c/ffffff?text=Bild+6',
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Bild ${index + 1}`}
              className="w-full h-auto cursor-pointer rounded"
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <Zoom in={true}>
              <div onClick={(e) => e.stopPropagation()}>
                <img
                  src={images[selectedImage].replace('150', '400')}
                  alt={`Bild ${selectedImage + 1}`}
                  className="max-w-full max-h-[80vh] rounded shadow-lg"
                />
              </div>
            </Zoom>
          </div>
        )}
      </div>
    );
  },
};

export const ZoomOnHover: Story = {
  render: () => {
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const cards = [
      {
        title: 'Karte 1',
        description: 'Beschreibung für Karte 1',
        color: 'bg-blue-100 dark:bg-blue-900',
      },
      {
        title: 'Karte 2',
        description: 'Beschreibung für Karte 2',
        color: 'bg-green-100 dark:bg-green-900',
      },
      {
        title: 'Karte 3',
        description: 'Beschreibung für Karte 3',
        color: 'bg-yellow-100 dark:bg-yellow-900',
      },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`p-4 ${card.color}`}>
              <h3 className="text-lg font-medium mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </div>

            <Zoom in={hoveredCard === index}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium">
                  Mehr erfahren
                </button>
              </div>
            </Zoom>
          </div>
        ))}
      </div>
    );
  },
};
