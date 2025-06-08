import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Collapse } from '../Collapse';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Collapse> = {
  title: 'Core/Layout/Collapse',
  component: Collapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob der Collapse geöffnet ist',
    },
    animateOpacity: {
      control: 'boolean',
      description: 'Gibt an, ob die Opazität animiert werden soll',
    },
    duration: {
      control: 'number',
      description: 'Die Dauer der Animation in Millisekunden',
    },
    startingHeight: {
      control: 'number',
      description: 'Die Starthöhe des Collapse',
    },
    endingHeight: {
      control: 'text',
      description: 'Die Endhöhe des Collapse',
    },
    onAnimationStart: {
      action: 'animationStarted',
      description: 'Callback, der aufgerufen wird, wenn die Animation startet',
    },
    onAnimationEnd: {
      action: 'animationEnded',
      description: 'Callback, der aufgerufen wird, wenn die Animation endet',
    },
    children: {
      description: 'Der Inhalt des Collapse',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Überschrift</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
              euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc
              quis nisl.
            </p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithoutAnimation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen} duration={0}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Ohne Animation</h3>
            <p>Dieser Collapse hat keine Animation. Er öffnet und schließt sich sofort.</p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithCustomDuration: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen} duration={2000}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Langsame Animation</h3>
            <p>Dieser Collapse hat eine längere Animationsdauer von 2 Sekunden.</p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithStartingHeight: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen} startingHeight={50}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Mit Starthöhe</h3>
            <p>
              Dieser Collapse hat eine Starthöhe von 50px, sodass ein Teil des Inhalts immer
              sichtbar ist.
            </p>
            <p className="mt-2">
              Weitere Inhalte werden nur angezeigt, wenn der Collapse geöffnet ist.
            </p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithoutOpacityAnimation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen} animateOpacity={false}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Ohne Opazitätsanimation</h3>
            <p>Dieser Collapse animiert nur die Höhe, nicht die Opazität.</p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const NestedCollapses: Story = {
  render: () => {
    const [isOuterOpen, setIsOuterOpen] = React.useState(false);
    const [isInnerOpen, setIsInnerOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button onClick={() => setIsOuterOpen(!isOuterOpen)} className="mb-4">
          {isOuterOpen ? 'Äußeren schließen' : 'Äußeren öffnen'}
        </Button>

        <Collapse isOpen={isOuterOpen}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Äußerer Collapse</h3>
            <p className="mb-4">
              Dies ist der äußere Collapse. Er enthält einen weiteren Collapse.
            </p>

            <Button onClick={() => setIsInnerOpen(!isInnerOpen)} size="sm" className="mb-4">
              {isInnerOpen ? 'Inneren schließen' : 'Inneren öffnen'}
            </Button>

            <Collapse isOpen={isInnerOpen}>
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
                <h4 className="text-md font-medium mb-2">Innerer Collapse</h4>
                <p>Dies ist der innere Collapse. Er ist in den äußeren Collapse eingebettet.</p>
              </div>
            </Collapse>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithAnimationCallbacks: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [animationState, setAnimationState] = React.useState('Bereit');

    const handleAnimationStart = () => {
      setAnimationState(isOpen ? 'Schließt...' : 'Öffnet...');
    };

    const handleAnimationEnd = () => {
      setAnimationState(isOpen ? 'Geöffnet' : 'Geschlossen');
    };

    return (
      <div className="w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Schließen' : 'Öffnen'}</Button>
          <div className="ml-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            Status: {animationState}
          </div>
        </div>

        <Collapse
          isOpen={isOpen}
          onAnimationStart={handleAnimationStart}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            <h3 className="text-lg font-medium mb-2">Mit Animation-Callbacks</h3>
            <p>Dieser Collapse ruft Callbacks auf, wenn die Animation startet und endet.</p>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[500px]">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isOpen ? 'Schließen' : 'Öffnen'}
        </Button>

        <Collapse isOpen={isOpen} className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
            <h3 className="text-xl font-bold mb-3">Benutzerdefiniertes Styling</h3>
            <p className="mb-4">
              Dieser Collapse verwendet benutzerdefiniertes Styling mit Farbverläufen und Schatten.
            </p>
            <button className="bg-white text-purple-500 px-4 py-2 rounded-full font-medium">
              Aktion
            </button>
          </div>
        </Collapse>
      </div>
    );
  },
};

export const AccordionExample: Story = {
  render: () => {
    const [openSection, setOpenSection] = React.useState<number | null>(null);

    const toggleSection = (sectionIndex: number) => {
      setOpenSection(openSection === sectionIndex ? null : sectionIndex);
    };

    const sections = [
      {
        title: 'Abschnitt 1',
        content:
          'Inhalt des ersten Abschnitts. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Abschnitt 2',
        content:
          'Inhalt des zweiten Abschnitts. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        title: 'Abschnitt 3',
        content:
          'Inhalt des dritten Abschnitts. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      },
    ];

    return (
      <div className="w-[500px] border rounded-md overflow-hidden">
        {sections.map((section, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => toggleSection(index)}
            >
              {section.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${openSection === index ? 'transform rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Collapse isOpen={openSection === index}>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">{section.content}</div>
            </Collapse>
          </div>
        ))}
      </div>
    );
  },
};
