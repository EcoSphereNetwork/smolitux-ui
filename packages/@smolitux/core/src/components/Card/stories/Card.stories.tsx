import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Core/Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['elevated', 'outlined', 'filled', 'unstyled'],
      },
      description: 'Die Variante der Karte',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Karte',
    },
    title: {
      control: 'text',
      description: 'Der Titel der Karte',
    },
    subtitle: {
      control: 'text',
      description: 'Der Untertitel der Karte',
    },
    image: {
      control: 'text',
      description: 'Die URL des Bildes',
    },
    imagePosition: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
      description: 'Die Position des Bildes',
    },
    footer: {
      control: 'text',
      description: 'Der Inhalt des Footers',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Gibt an, ob die Karte die volle Breite einnehmen soll',
    },
    interactive: {
      control: 'boolean',
      description: 'Gibt an, ob die Karte interaktiv ist (Hover-Effekt)',
    },
    clickable: {
      control: 'boolean',
      description: 'Gibt an, ob die Karte klickbar ist',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback, der aufgerufen wird, wenn die Karte geklickt wird',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    title: 'Kartentitel',
    children: <p>Dies ist der Inhalt der Karte.</p>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Kartentitel',
    subtitle: 'Kartenuntertitel',
    children: <p>Dies ist der Inhalt der Karte mit einem Untertitel.</p>,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Kartentitel',
    image: 'https://via.placeholder.com/400x200',
    children: <p>Dies ist der Inhalt der Karte mit einem Bild.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Kartentitel',
    children: <p>Dies ist der Inhalt der Karte mit einem Footer.</p>,
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outlined">Abbrechen</Button>
        <Button>Speichern</Button>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Elevated</h3>
        <Card variant="elevated" title="Elevated Card">
          <p>Dies ist eine Karte mit Schatten.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Outlined</h3>
        <Card variant="outlined" title="Outlined Card">
          <p>Dies ist eine Karte mit Umrandung.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Filled</h3>
        <Card variant="filled" title="Filled Card">
          <p>Dies ist eine Karte mit Hintergrundfarbe.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Unstyled</h3>
        <Card variant="unstyled" title="Unstyled Card">
          <p>Dies ist eine Karte ohne Styling.</p>
        </Card>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <Card size="sm" title="Small Card">
          <p>Dies ist eine kleine Karte.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <Card size="md" title="Medium Card">
          <p>Dies ist eine mittelgroße Karte.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <Card size="lg" title="Large Card">
          <p>Dies ist eine große Karte.</p>
        </Card>
      </div>
    </div>
  ),
};

export const ImagePositions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Image Top</h3>
        <Card 
          title="Image Top" 
          image="https://via.placeholder.com/400x200" 
          imagePosition="top"
        >
          <p>Dies ist eine Karte mit einem Bild oben.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Image Bottom</h3>
        <Card 
          title="Image Bottom" 
          image="https://via.placeholder.com/400x200" 
          imagePosition="bottom"
        >
          <p>Dies ist eine Karte mit einem Bild unten.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Image Left</h3>
        <Card 
          title="Image Left" 
          image="https://via.placeholder.com/200x200" 
          imagePosition="left"
        >
          <p>Dies ist eine Karte mit einem Bild links.</p>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Image Right</h3>
        <Card 
          title="Image Right" 
          image="https://via.placeholder.com/200x200" 
          imagePosition="right"
        >
          <p>Dies ist eine Karte mit einem Bild rechts.</p>
        </Card>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    title: 'Interaktive Karte',
    children: <p>Bewegen Sie den Mauszeiger über diese Karte, um den Hover-Effekt zu sehen.</p>,
    interactive: true,
  },
};

export const Clickable: Story = {
  args: {
    title: 'Klickbare Karte',
    children: <p>Klicken Sie auf diese Karte, um eine Aktion auszulösen.</p>,
    clickable: true,
    onClick: () => alert('Karte wurde geklickt!'),
  },
};

export const FullWidth: Story = {
  args: {
    title: 'Karte mit voller Breite',
    children: <p>Diese Karte nimmt die volle Breite des Containers ein.</p>,
    fullWidth: true,
  },
};

export const ComplexCard: Story = {
  render: () => (
    <Card
      variant="elevated"
      image="https://via.placeholder.com/800x400"
      imagePosition="top"
      title="Komplexe Karte"
      subtitle="Mit vielen Funktionen"
      footer={
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">Letzte Aktualisierung: 01.04.2023</div>
          <div className="flex space-x-2">
            <Button variant="outlined" size="sm">Details</Button>
            <Button size="sm">Kaufen</Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          Dies ist eine komplexe Karte mit einem Bild, Titel, Untertitel und Footer.
          Sie demonstriert die verschiedenen Funktionen der Card-Komponente.
        </p>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Feature 1
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Feature 2
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            Feature 3
          </span>
        </div>
      </div>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          variant="elevated"
          title={`Karte ${index + 1}`}
          interactive
          clickable
        >
          <p>Dies ist der Inhalt der Karte {index + 1}.</p>
        </Card>
      ))}
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Card
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
      title="Benutzerdefinierte Karte"
      titleClassName="text-white border-b border-white/20"
    >
      <p>Diese Karte verwendet benutzerdefinierte Stile.</p>
    </Card>
  ),
};