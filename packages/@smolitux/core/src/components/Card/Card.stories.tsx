import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'flat'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    title: { control: 'text' },
    footer: { control: 'text' },
    noPadding: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    bordered: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <p>Dies ist eine einfache Karte mit Standardeinstellungen.</p>,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Kartentitel',
    children: <p>Dies ist eine Karte mit einem Titel.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Kartentitel',
    children: <p>Dies ist eine Karte mit einem Footer.</p>,
    footer: <div className="flex justify-end"><button className="px-4 py-2 bg-blue-500 text-white rounded">Aktion</button></div>,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Erhöhte Karte',
    children: <p>Diese Karte hat einen Schatten und wirkt erhöht.</p>,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Umrandete Karte',
    children: <p>Diese Karte hat eine deutliche Umrandung.</p>,
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    title: 'Flache Karte',
    children: <p>Diese Karte ist flach ohne Schatten oder Umrandung.</p>,
    bordered: false,
  },
};

export const Hoverable: Story = {
  args: {
    title: 'Interaktive Karte',
    children: <p>Bewegen Sie den Mauszeiger über diese Karte, um einen Hover-Effekt zu sehen.</p>,
    hoverable: true,
  },
};

export const CustomPadding: Story = {
  args: {
    title: 'Großes Padding',
    children: <p>Diese Karte hat ein großes Padding.</p>,
    padding: 'large',
  },
};

export const NoPadding: Story = {
  args: {
    title: 'Kein Padding',
    children: <div className="bg-gray-100 p-4">Diese Karte hat kein Padding im Inhaltsbereich.</div>,
    noPadding: true,
  },
};

export const CustomBorderRadius: Story = {
  args: {
    title: 'Abgerundete Ecken',
    children: <p>Diese Karte hat stark abgerundete Ecken.</p>,
    borderRadius: 'large',
  },
};

export const CustomSizing: Story = {
  args: {
    title: 'Benutzerdefinierte Größe',
    children: <p>Diese Karte hat eine benutzerdefinierte Breite und Höhe.</p>,
    width: '300px',
    height: '200px',
  },
};

export const CustomColors: Story = {
  args: {
    title: 'Benutzerdefinierte Farben',
    children: <p className="text-white">Diese Karte hat benutzerdefinierte Hintergrund- und Randfarben.</p>,
    backgroundColor: '#4a5568',
    borderColor: '#2d3748',
  },
};

export const WithHeaderAction: Story = {
  args: {
    title: 'Mit Header-Aktion',
    children: <p>Diese Karte hat eine Aktion im Header-Bereich.</p>,
    headerAction: (
      <button className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    title: 'Komplexer Inhalt',
    children: (
      <div>
        <div className="flex items-center mb-4">
          <img 
            src="https://via.placeholder.com/50" 
            alt="Avatar" 
            className="rounded-full mr-3"
          />
          <div>
            <h4 className="font-medium">Max Mustermann</h4>
            <p className="text-sm text-gray-500">Produktmanager</p>
          </div>
        </div>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
          Vivamus hendrerit arcu sed erat molestie vehicula.
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Vor 2 Stunden</span>
          <span>5 Kommentare</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex justify-between">
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </button>
      </div>
    ),
  },
};