// packages/@smolitux/core/src/components/Skeleton/Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Card } from '../Card/Card';

const meta: Meta<typeof Skeleton> = {
  title: 'Core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Die Form des Skeletons'
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Art der Animation'
    },
    width: {
      control: 'text',
      description: 'Breite des Skeletons'
    },
    height: {
      control: 'text',
      description: 'Höhe des Skeletons'
    },
    count: {
      control: 'number',
      description: 'Anzahl der zu wiederholenden Elemente'
    },
    gap: {
      control: 'number',
      description: 'Abstand zwischen wiederholten Elementen in Pixeln'
    }
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basis-Story
export const Default: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    width: 200,
    height: 20
  },
};

// Verschiedene Varianten
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="text" width={300} height={20} />
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rectangular" width={300} height={100} />
      <Skeleton variant="rounded" width={300} height={100} />
    </div>
  ),
};

// Animationsbeispiele
export const Animations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Pulse Animation</h3>
        <Skeleton variant="text" animation="pulse" width={300} height={20} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Wave Animation</h3>
        <Skeleton variant="text" animation="wave" width={300} height={20} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Keine Animation</h3>
        <Skeleton variant="text" animation="none" width={300} height={20} />
      </div>
    </div>
  ),
};

// Mehrere Zeilen
export const MultiLine: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: 15,
    count: 5,
    gap: 8
  },
};

// Typografie-Beispiel
export const Typography: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton variant="text" width={300} height={32} /> {/* Überschrift */}
      <Skeleton variant="text" width={150} height={16} /> {/* Untertitel */}
      <div className="pt-2">
        <Skeleton variant="text" width="100%" height={14} count={4} gap={6} /> {/* Paragraph */}
      </div>
    </div>
  ),
};

// Karten-Beispiel
export const CardExample: Story = {
  render: () => (
    <Card className="w-72">
      <Skeleton variant="rectangular" height={140} /> {/* Bild */}
      <div className="p-4">
        <Skeleton variant="text" width="80%" height={24} /> {/* Titel */}
        <div className="mt-2">
          <Skeleton variant="text" width="100%" height={16} count={3} gap={6} /> {/* Text */}
        </div>
        <div className="mt-4 flex justify-between">
          <Skeleton variant="text" width={80} height={36} /> {/* Button */}
          <Skeleton variant="circular" width={36} height={36} /> {/* Icon */}
        </div>
      </div>
    </Card>
  ),
};

// Benutzerprofil-Beispiel
export const ProfileExample: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" width={50} height={50} /> {/* Avatar */}
      <div className="space-y-2">
        <Skeleton variant="text" width={150} height={20} /> {/* Name */}
        <Skeleton variant="text" width={100} height={16} /> {/* Titel */}
      </div>
    </div>
  ),
};
