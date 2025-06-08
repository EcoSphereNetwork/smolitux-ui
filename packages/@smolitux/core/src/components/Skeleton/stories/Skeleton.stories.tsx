import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Core/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'circular', 'rectangular', 'rounded'],
      },
      description: 'Die Variante des Skeletons',
    },
    width: {
      control: 'text',
      description: 'Die Breite des Skeletons',
    },
    height: {
      control: 'text',
      description: 'Die Höhe des Skeletons',
    },
    animation: {
      control: {
        type: 'select',
        options: ['pulse', 'wave', 'none'],
      },
      description: 'Die Animation des Skeletons',
    },
    count: {
      control: 'number',
      description: 'Die Anzahl der Skeleton-Elemente',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '40px',
    height: '40px',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '200px',
    height: '100px',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '200px',
    height: '100px',
  },
};

export const MultipleLines: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="space-y-8 w-[300px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Pulse (Standard)</h3>
        <Skeleton variant="rectangular" width="100%" height="100px" animation="pulse" />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Wave</h3>
        <Skeleton variant="rectangular" width="100%" height="100px" animation="wave" />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Keine Animation</h3>
        <Skeleton variant="rectangular" width="100%" height="100px" animation="none" />
      </div>
    </div>
  ),
};

export const WithCount: Story = {
  args: {
    variant: 'text',
    width: '200px',
    count: 3,
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Skeleton
      variant="rectangular"
      width="200px"
      height="100px"
      className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl"
    />
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[300px] border rounded-lg p-4 space-y-4">
      <Skeleton variant="rectangular" width="100%" height="150px" className="rounded-lg" />

      <div className="space-y-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>

      <div className="flex space-x-2">
        <Skeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="70%" />
        </div>
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width="64px" height="64px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>

      <Skeleton variant="rectangular" width="100%" height="120px" className="rounded-lg" />

      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
      </div>

      <div className="flex justify-between">
        <Skeleton variant="rounded" width="30%" height="36px" />
        <Skeleton variant="rounded" width="30%" height="36px" />
        <Skeleton variant="rounded" width="30%" height="36px" />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[600px] border rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-3">
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width="150px" />
          <Skeleton variant="rounded" width="100px" height="36px" />
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 flex items-center space-x-4">
            <Skeleton variant="circular" width="40px" height="40px" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
            <Skeleton variant="rounded" width="80px" height="32px" />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-3 flex justify-between items-center">
        <Skeleton variant="text" width="100px" />
        <div className="flex space-x-1">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="circular" width="32px" height="32px" />
        </div>
      </div>
    </div>
  ),
};

export const ContentLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="w-[400px] space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Artikel</h2>
          <button
            onClick={() => setIsLoading(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Neu laden
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton variant="text" width="90%" height="24px" />
              <Skeleton variant="text" width="70%" height="24px" />
            </div>

            <Skeleton variant="rectangular" width="100%" height="200px" className="rounded-lg" />

            <div className="space-y-2">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Die Zukunft der Web-Entwicklung</h3>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Web Development"
              className="w-full rounded-lg"
            />
            <p>
              Die Web-Entwicklung entwickelt sich ständig weiter. Neue Frameworks, Tools und
              Technologien entstehen, um die Entwicklung effizienter und die Benutzererfahrung
              besser zu machen.
            </p>
            <p>
              In diesem Artikel betrachten wir die neuesten Trends und wie sie die Zukunft der
              Web-Entwicklung beeinflussen werden.
            </p>
          </div>
        )}
      </div>
    );
  },
};
