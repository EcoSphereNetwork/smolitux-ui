import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Fade } from '../Fade';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Fade> = {
  title: 'Core/Animation/Fade',
  component: Fade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    in: {
      control: 'boolean',
      description: 'Gibt an, ob das Element eingeblendet werden soll',
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
    timeout: {
      control: 'number',
      description: 'Die Dauer der Animation in Millisekunden',
    },
    appear: {
      control: 'boolean',
      description: 'Gibt an, ob die Animation beim ersten Rendern ausgeführt werden soll',
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
type Story = StoryObj<typeof Fade>;

export const Basic: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Ausblenden' : 'Einblenden'}
        </Button>

        <Fade in={isVisible}>
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Fade-Animation</h3>
            <p>Dieser Inhalt wird mit einer Fade-Animation ein- und ausgeblendet.</p>
          </div>
        </Fade>
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

        <Fade in={isVisible} timeout={2000}>
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Langsame Fade-Animation</h3>
            <p>
              Dieser Inhalt wird mit einer langsameren Fade-Animation (2 Sekunden) ein- und
              ausgeblendet.
            </p>
          </div>
        </Fade>
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
          <Fade in={isVisible} unmountOnExit>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Unmount bei Exit</h3>
              <p>
                Dieser Inhalt wird aus dem DOM entfernt, wenn er ausgeblendet ist. Der umgebende
                Rahmen bleibt sichtbar.
              </p>
            </div>
          </Fade>
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
          <Fade in={isVisible} mountOnEnter>
            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-lg font-medium mb-2">Mount bei Enter</h3>
              <p>
                Dieser Inhalt wird erst in das DOM eingefügt, wenn er eingeblendet wird. Anfangs ist
                er nicht im DOM vorhanden.
              </p>
            </div>
          </Fade>
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

        <Fade
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
        </Fade>
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
          <Fade in={isVisible} timeout={500}>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 1</h3>
              <p>Schnelle Animation (500ms)</p>
            </div>
          </Fade>

          <Fade in={isVisible} timeout={1000}>
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 2</h3>
              <p>Mittlere Animation (1000ms)</p>
            </div>
          </Fade>

          <Fade in={isVisible} timeout={1500}>
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 3</h3>
              <p>Langsame Animation (1500ms)</p>
            </div>
          </Fade>

          <Fade in={isVisible} timeout={2000}>
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md">
              <h3 className="text-md font-medium mb-2">Element 4</h3>
              <p>Sehr langsame Animation (2000ms)</p>
            </div>
          </Fade>
        </div>
      </div>
    );
  },
};

export const WithInitialAnimation: Story = {
  render: () => {
    return (
      <Fade in={true} appear={true} timeout={2000}>
        <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-md">
          <h3 className="text-lg font-medium mb-2">Initiale Animation</h3>
          <p>
            Dieser Inhalt wird mit einer Fade-Animation eingeblendet, wenn die Komponente zum ersten
            Mal gerendert wird.
          </p>
        </div>
      </Fade>
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

        <Fade in={isVisible}>
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-2">Benutzerdefiniertes Styling</h3>
            <p>
              Dieser Inhalt verwendet benutzerdefiniertes Styling mit Farbverläufen und Schatten.
            </p>
            <button className="mt-4 px-4 py-2 bg-white text-purple-500 rounded-full font-medium">
              Aktion
            </button>
          </div>
        </Fade>
      </div>
    );
  },
};

export const SequentialFades: Story = {
  render: () => {
    const [step, setStep] = React.useState(0);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={step === 0}>
            Zurück
          </Button>
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            Schritt {step + 1} von 4
          </div>
          <Button onClick={nextStep} disabled={step === 3}>
            Weiter
          </Button>
        </div>

        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-6">
          <Fade in={step >= 0} unmountOnExit>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Schritt 1: Einführung</h3>
              <p>Dies ist der erste Schritt einer sequentiellen Fade-Animation.</p>
            </div>
          </Fade>

          <Fade in={step >= 1} unmountOnExit>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Schritt 2: Details</h3>
              <p>Im zweiten Schritt werden weitere Details angezeigt.</p>
            </div>
          </Fade>

          <Fade in={step >= 2} unmountOnExit>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Schritt 3: Optionen</h3>
              <p>Der dritte Schritt zeigt verschiedene Optionen an.</p>
            </div>
          </Fade>

          <Fade in={step >= 3} unmountOnExit>
            <div>
              <h3 className="text-lg font-medium mb-2">Schritt 4: Abschluss</h3>
              <p>Der letzte Schritt schließt den Prozess ab.</p>
            </div>
          </Fade>
        </div>
      </div>
    );
  },
};
