import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from '../Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Core/Disclosure/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: 'number',
      description: 'Der standardmäßig geöffnete Accordion-Index',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Erlaubt das Öffnen mehrerer Panels gleichzeitig',
    },
    allowToggle: {
      control: 'boolean',
      description: 'Erlaubt das Schließen aller Panels',
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'filled', 'flush'],
      },
      description: 'Die Variante des Accordions',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des Accordions',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    children: [
      <AccordionItem key="1" title="Was ist Smolitux UI?">
        <p>
          Smolitux UI ist eine React-basierte Komponentenbibliothek, die eine Vielzahl von
          wiederverwendbaren UI-Komponenten für moderne Webanwendungen bietet. Die Bibliothek ist
          mit TypeScript entwickelt und bietet eine umfassende Dokumentation.
        </p>
      </AccordionItem>,
      <AccordionItem key="2" title="Wie installiere ich Smolitux UI?">
        <p>Sie können Smolitux UI mit npm oder yarn installieren:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
          <code>npm install @smolitux/core</code>
        </pre>
        <p className="mt-2">oder</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
          <code>yarn add @smolitux/core</code>
        </pre>
      </AccordionItem>,
      <AccordionItem key="3" title="Welche Komponenten sind verfügbar?">
        <p>Smolitux UI bietet eine Vielzahl von Komponenten, darunter:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Basis-Komponenten (Button, Input, Select)</li>
          <li>Layout-Komponenten (Grid, Flex, Container)</li>
          <li>Feedback-Komponenten (Alert, Toast, Modal)</li>
          <li>Daten-Komponenten (Table, Pagination)</li>
          <li>Navigation (Tabs, Menu, Breadcrumb)</li>
          <li>und viele mehr!</li>
        </ul>
      </AccordionItem>,
    ],
  },
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
        <p className="mt-2">
          Dieser Abschnitt enthält mehrere Absätze, um zu demonstrieren, wie der Inhalt in einem
          Accordion-Panel dargestellt wird.
        </p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
        <p className="mt-2">
          Mit der Option <code>allowMultiple</code> können mehrere Panels gleichzeitig geöffnet
          sein.
        </p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const AllowToggle: Story = {
  args: {
    allowToggle: true,
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
        <p className="mt-2">
          Mit der Option <code>allowToggle</code> können alle Panels geschlossen werden. Klicken Sie
          auf ein geöffnetes Panel, um es zu schließen.
        </p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const DefaultIndex: Story = {
  args: {
    defaultIndex: 1,
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2 (standardmäßig geöffnet)">
        <p>Inhalt für Abschnitt 2</p>
        <p className="mt-2">
          Dieser Abschnitt ist standardmäßig geöffnet, da <code>defaultIndex={1}</code> gesetzt ist.
        </p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const FlushVariant: Story = {
  args: {
    variant: 'flush',
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: [
      <AccordionItem key="1" title="Abschnitt 1">
        <p>Inhalt für Abschnitt 1</p>
      </AccordionItem>,
      <AccordionItem key="2" title="Abschnitt 2">
        <p>Inhalt für Abschnitt 2</p>
      </AccordionItem>,
      <AccordionItem key="3" title="Abschnitt 3">
        <p>Inhalt für Abschnitt 3</p>
      </AccordionItem>,
    ],
  },
};

export const WithIcons: Story = {
  args: {
    children: [
      <AccordionItem
        key="1"
        title="Benutzereinstellungen"
        icon={
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
      >
        <p>Hier können Sie Ihre Benutzereinstellungen verwalten.</p>
      </AccordionItem>,
      <AccordionItem
        key="2"
        title="Benachrichtigungen"
        icon={
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        }
      >
        <p>Verwalten Sie Ihre Benachrichtigungseinstellungen.</p>
      </AccordionItem>,
      <AccordionItem
        key="3"
        title="Sicherheit"
        icon={
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        }
      >
        <p>Hier können Sie Ihre Sicherheitseinstellungen verwalten.</p>
      </AccordionItem>,
    ],
  },
};

export const Nested: Story = {
  args: {
    children: [
      <AccordionItem key="1" title="Kategorie 1">
        <p className="mb-4">Hauptinhalt für Kategorie 1</p>
        <Accordion>
          <AccordionItem key="1.1" title="Unterkategorie 1.1">
            <p>Inhalt für Unterkategorie 1.1</p>
          </AccordionItem>
          <AccordionItem key="1.2" title="Unterkategorie 1.2">
            <p>Inhalt für Unterkategorie 1.2</p>
          </AccordionItem>
        </Accordion>
      </AccordionItem>,
      <AccordionItem key="2" title="Kategorie 2">
        <p className="mb-4">Hauptinhalt für Kategorie 2</p>
        <Accordion>
          <AccordionItem key="2.1" title="Unterkategorie 2.1">
            <p>Inhalt für Unterkategorie 2.1</p>
          </AccordionItem>
          <AccordionItem key="2.2" title="Unterkategorie 2.2">
            <p>Inhalt für Unterkategorie 2.2</p>
          </AccordionItem>
        </Accordion>
      </AccordionItem>,
    ],
  },
};
