import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Skeleton.A11y> = {
  title: 'Core/Skeleton/A11y',
  component: Skeleton.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Skeleton-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'rectangular', 'circular'],
      description: 'Variante des Skeletons',
    },
    width: {
      control: { type: 'text' },
      description: 'Breite des Skeletons',
    },
    height: {
      control: { type: 'text' },
      description: 'Höhe des Skeletons',
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
      description: 'Animation des Skeletons',
    },
    count: {
      control: { type: 'number' },
      description: 'Anzahl der Skeleton-Elemente',
    },
    gap: {
      control: { type: 'number' },
      description: 'Abstand zwischen den Skeleton-Elementen',
    },
    isLoaded: {
      control: { type: 'boolean' },
      description: 'Ist der Inhalt geladen?',
    },
    hideWhenLoaded: {
      control: { type: 'boolean' },
      description: 'Skeleton ausblenden, wenn geladen',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA-Label für den Skeleton',
    },
    description: {
      control: { type: 'text' },
      description: 'Beschreibung für Screenreader',
    },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Politeness der Live-Region',
    },
    relevant: {
      control: { type: 'text' },
      description: 'ARIA-Relevant für die Live-Region',
    },
    busy: {
      control: { type: 'boolean' },
      description: 'ARIA-Busy für den Skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton.A11y>;

export const Default: Story = {
  args: {
    ariaLabel: 'Lädt Text',
    width: 200,
    height: 20,
  },
};

export const WithDescription: Story = {
  args: {
    ariaLabel: 'Lädt Text',
    description: 'Bitte warten Sie, während der Text geladen wird',
    width: 200,
    height: 20,
  },
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Text</h3>
        <Skeleton.A11y variant="text" ariaLabel="Lädt Text" width={200} height={20} />
      </div>
      <div>
        <h3 className="mb-2">Rectangular</h3>
        <Skeleton.A11y variant="rectangular" ariaLabel="Lädt Bild" width={200} height={100} />
      </div>
      <div>
        <h3 className="mb-2">Circular</h3>
        <Skeleton.A11y variant="circular" ariaLabel="Lädt Avatar" width={50} height={50} />
      </div>
    </div>
  ),
};

export const DifferentAnimations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Pulse</h3>
        <Skeleton.A11y animation="pulse" ariaLabel="Lädt Text" width={200} height={20} />
      </div>
      <div>
        <h3 className="mb-2">Wave</h3>
        <Skeleton.A11y animation="wave" ariaLabel="Lädt Text" width={200} height={20} />
      </div>
      <div>
        <h3 className="mb-2">None</h3>
        <Skeleton.A11y animation="none" ariaLabel="Lädt Text" width={200} height={20} />
      </div>
    </div>
  ),
};

export const MultipleItems: Story = {
  args: {
    count: 3,
    gap: 10,
    ariaLabel: 'Lädt Liste',
    width: 200,
    height: 20,
  },
};

export const LoadedState: Story = {
  render: () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="space-y-4">
        <Skeleton.A11y isLoaded={isLoaded} ariaLabel="Lädt Text" width={200} height={20}>
          <p>Geladener Inhalt</p>
        </Skeleton.A11y>

        <div className="mt-4">
          <Button onClick={() => setIsLoaded(!isLoaded)}>
            {isLoaded ? 'Zurücksetzen' : 'Sofort laden'}
          </Button>
        </div>
      </div>
    );
  },
};

export const HideWhenLoaded: Story = {
  render: () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="mb-2">hideWhenLoaded = true</h3>
          <Skeleton.A11y
            isLoaded={isLoaded}
            hideWhenLoaded={true}
            ariaLabel="Lädt Text"
            width={200}
            height={20}
          />
        </div>

        <div>
          <h3 className="mb-2">hideWhenLoaded = false</h3>
          <Skeleton.A11y
            isLoaded={isLoaded}
            hideWhenLoaded={false}
            ariaLabel="Lädt Text"
            width={200}
            height={20}
          />
        </div>

        <div className="mt-4">
          <Button onClick={() => setIsLoaded(!isLoaded)}>
            {isLoaded ? 'Zurücksetzen' : 'Laden'}
          </Button>
        </div>
      </div>
    );
  },
};

export const DifferentLiveRegionPoliteness: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2">Polite</h3>
        <Skeleton.A11y
          liveRegionPoliteness="polite"
          ariaLabel="Lädt Text"
          width={200}
          height={20}
        />
      </div>
      <div>
        <h3 className="mb-2">Assertive</h3>
        <Skeleton.A11y
          liveRegionPoliteness="assertive"
          ariaLabel="Lädt Text"
          width={200}
          height={20}
        />
      </div>
      <div>
        <h3 className="mb-2">Off</h3>
        <Skeleton.A11y liveRegionPoliteness="off" ariaLabel="Lädt Text" width={200} height={20} />
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="space-y-4 w-96">
        <div className="flex items-center space-x-4">
          <Skeleton.A11y
            variant="circular"
            isLoaded={isLoaded}
            ariaLabel="Lädt Avatar"
            width={50}
            height={50}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
              JD
            </div>
          </Skeleton.A11y>

          <div className="flex-1">
            <Skeleton.A11y isLoaded={isLoaded} ariaLabel="Lädt Name" width={150} height={20}>
              <h3 className="font-bold">John Doe</h3>
            </Skeleton.A11y>

            <Skeleton.A11y
              isLoaded={isLoaded}
              ariaLabel="Lädt Titel"
              width={100}
              height={16}
              className="mt-2"
            >
              <p className="text-sm text-gray-500">Software Engineer</p>
            </Skeleton.A11y>
          </div>
        </div>

        <Skeleton.A11y
          isLoaded={isLoaded}
          ariaLabel="Lädt Beschreibung"
          count={3}
          gap={8}
          width="100%"
          height={16}
        >
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
            aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>
        </Skeleton.A11y>

        <div className="mt-4">
          <Button onClick={() => setIsLoaded(false)}>Neu laden</Button>
        </div>
      </div>
    );
  },
};
