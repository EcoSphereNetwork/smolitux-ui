import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Das Trennzeichen zwischen den Breadcrumb-Elementen',
    },
    spacing: {
      control: {
        type: 'select',
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'Der Abstand zwischen den Breadcrumb-Elementen',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Breadcrumb-Elemente',
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'filled', 'outline'],
      },
      description: 'Die Variante der Breadcrumb-Elemente',
    },
    maxItems: {
      control: 'number',
      description: 'Die maximale Anzahl der angezeigten Elemente (mit Ellipsis für überzählige Elemente)',
    },
    responsive: {
      control: 'boolean',
      description: 'Gibt an, ob die Breadcrumbs responsiv sein sollen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    children: [
      <BreadcrumbItem key="1" href="#">Home</BreadcrumbItem>,
      <BreadcrumbItem key="2" href="#">Kategorie</BreadcrumbItem>,
      <BreadcrumbItem key="3" href="#">Unterkategorie</BreadcrumbItem>,
      <BreadcrumbItem key="4" isCurrentPage>Aktueller Artikel</BreadcrumbItem>,
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    separator: '→',
    children: [
      <BreadcrumbItem key="1" href="#">Home</BreadcrumbItem>,
      <BreadcrumbItem key="2" href="#">Kategorie</BreadcrumbItem>,
      <BreadcrumbItem key="3" href="#">Unterkategorie</BreadcrumbItem>,
      <BreadcrumbItem key="4" isCurrentPage>Aktueller Artikel</BreadcrumbItem>,
    ],
  },
};

export const WithIconSeparator: Story = {
  args: {
    separator: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      </svg>
    ),
    children: [
      <BreadcrumbItem key="1" href="#">Home</BreadcrumbItem>,
      <BreadcrumbItem key="2" href="#">Kategorie</BreadcrumbItem>,
      <BreadcrumbItem key="3" href="#">Unterkategorie</BreadcrumbItem>,
      <BreadcrumbItem key="4" isCurrentPage>Aktueller Artikel</BreadcrumbItem>,
    ],
  },
};

export const WithIcons: Story = {
  args: {
    children: [
      <BreadcrumbItem 
        key="1" 
        href="#"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>
        }
      >
        Home
      </BreadcrumbItem>,
      <BreadcrumbItem 
        key="2" 
        href="#"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z" />
          </svg>
        }
      >
        Kategorie
      </BreadcrumbItem>,
      <BreadcrumbItem 
        key="3" 
        href="#"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
          </svg>
        }
      >
        Unterkategorie
      </BreadcrumbItem>,
      <BreadcrumbItem 
        key="4" 
        isCurrentPage
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 002 4.5v10A2.5 2.5 0 004.5 17h10a2.5 2.5 0 002.5-2.5v-10A2.5 2.5 0 0014.5 2h-10zm1 1.5a1 1 0 00-1 1V15a1 1 0 001 1h8a1 1 0 001-1V4.5a1 1 0 00-1-1h-8z" clipRule="evenodd" />
          </svg>
        }
      >
        Aktueller Artikel
      </BreadcrumbItem>,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <Breadcrumb size="sm">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <Breadcrumb size="md">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <Breadcrumb size="lg">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Default</h3>
        <Breadcrumb variant="default">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Filled</h3>
        <Breadcrumb variant="filled">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Outline</h3>
        <Breadcrumb variant="outline">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const WithMaxItems: Story = {
  args: {
    maxItems: 3,
    children: [
      <BreadcrumbItem key="1" href="#">Home</BreadcrumbItem>,
      <BreadcrumbItem key="2" href="#">Kategorie</BreadcrumbItem>,
      <BreadcrumbItem key="3" href="#">Unterkategorie</BreadcrumbItem>,
      <BreadcrumbItem key="4" href="#">Produkte</BreadcrumbItem>,
      <BreadcrumbItem key="5" href="#">Elektronik</BreadcrumbItem>,
      <BreadcrumbItem key="6" isCurrentPage>Smartphones</BreadcrumbItem>,
    ],
  },
};

export const Responsive: Story = {
  args: {
    responsive: true,
    children: [
      <BreadcrumbItem key="1" href="#">Home</BreadcrumbItem>,
      <BreadcrumbItem key="2" href="#">Kategorie</BreadcrumbItem>,
      <BreadcrumbItem key="3" href="#">Unterkategorie</BreadcrumbItem>,
      <BreadcrumbItem key="4" href="#">Produkte</BreadcrumbItem>,
      <BreadcrumbItem key="5" isCurrentPage>Aktueller Artikel mit einem sehr langen Namen</BreadcrumbItem>,
    ],
  },
};

export const WithCustomSpacing: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">No Spacing</h3>
        <Breadcrumb spacing="none">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Small Spacing</h3>
        <Breadcrumb spacing="sm">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Large Spacing</h3>
        <Breadcrumb spacing="lg">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Kategorie</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Artikel</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Breadcrumb
      className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg"
      separator="/"
    >
      <BreadcrumbItem 
        href="#"
        className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbItem 
        href="#"
        className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
      >
        Kategorie
      </BreadcrumbItem>
      <BreadcrumbItem 
        isCurrentPage
        className="font-bold text-blue-800 dark:text-blue-100"
      >
        Artikel
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};