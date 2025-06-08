import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Core/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Die aktuelle Seite',
    },
    totalPages: {
      control: 'number',
      description: 'Die Gesamtzahl der Seiten',
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Callback, der aufgerufen wird, wenn sich die Seite ändert',
    },
    pageSize: {
      control: 'number',
      description: 'Die Anzahl der Elemente pro Seite',
    },
    totalItems: {
      control: 'number',
      description: 'Die Gesamtzahl der Elemente',
    },
    siblingCount: {
      control: 'number',
      description: 'Die Anzahl der Geschwisterseiten, die angezeigt werden sollen',
    },
    boundaryCount: {
      control: 'number',
      description: 'Die Anzahl der Randseiten, die angezeigt werden sollen',
    },
    showFirstButton: {
      control: 'boolean',
      description: 'Gibt an, ob der Button für die erste Seite angezeigt werden soll',
    },
    showLastButton: {
      control: 'boolean',
      description: 'Gibt an, ob der Button für die letzte Seite angezeigt werden soll',
    },
    showPrevButton: {
      control: 'boolean',
      description: 'Gibt an, ob der Button für die vorherige Seite angezeigt werden soll',
    },
    showNextButton: {
      control: 'boolean',
      description: 'Gibt an, ob der Button für die nächste Seite angezeigt werden soll',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob die Pagination deaktiviert ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Pagination',
    },
    variant: {
      control: {
        type: 'select',
        options: ['outline', 'solid', 'ghost'],
      },
      description: 'Die Variante der Pagination',
    },
    shape: {
      control: {
        type: 'select',
        options: ['rounded', 'circular'],
      },
      description: 'Die Form der Pagination-Buttons',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema der Pagination',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 10;

    return (
      <div className="space-y-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div className="text-center">
          Aktuelle Seite: {currentPage} von {totalPages}
        </div>
      </div>
    );
  },
};

export const WithTotalItems: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10;
    const totalItems = 87;

    return (
      <div className="space-y-4">
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
        <div className="text-center">
          Aktuelle Seite: {currentPage} von {Math.ceil(totalItems / pageSize)}
          <br />
          Elemente {(currentPage - 1) * pageSize + 1} bis{' '}
          {Math.min(currentPage * pageSize, totalItems)} von {totalItems}
        </div>
      </div>
    );
  },
};

export const WithSiblingAndBoundaryCount: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 20;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Standard (siblingCount=1, boundaryCount=1)</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={1}
            boundaryCount={1}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">
            Mehr Geschwister (siblingCount=2, boundaryCount=1)
          </h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={2}
            boundaryCount={1}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">
            Mehr Randseiten (siblingCount=1, boundaryCount=2)
          </h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={1}
            boundaryCount={2}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">
            Alle Seiten (siblingCount=8, boundaryCount=0)
          </h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={8}
            boundaryCount={0}
          />
        </div>
      </div>
    );
  },
};

export const WithoutNavigationButtons: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Ohne Erste/Letzte-Buttons</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showFirstButton={false}
            showLastButton={false}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Ohne Vorherige/Nächste-Buttons</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showPrevButton={false}
            showNextButton={false}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Nur Seitenzahlen</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showFirstButton={false}
            showLastButton={false}
            showPrevButton={false}
            showNextButton={false}
          />
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Small</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="sm"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="md"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Large</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="lg"
          />
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Outline (Standard)</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="outline"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Solid</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="solid"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Ghost</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="ghost"
          />
        </div>
      </div>
    );
  },
};

export const Shapes: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Rounded (Standard)</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            shape="rounded"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Circular</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            shape="circular"
          />
        </div>
      </div>
    );
  },
};

export const ColorSchemes: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Primary (Standard)</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="primary"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Secondary</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="secondary"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Success</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="success"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Danger</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="danger"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Warning</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="warning"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Info</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorScheme="info"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} disabled />,
};

export const WithCustomStyling: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 10;

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg"
        buttonClassName="text-white hover:bg-white hover:bg-opacity-20"
        activeButtonClassName="bg-white text-purple-500 hover:bg-white hover:text-purple-600"
      />
    );
  },
};

export const WithDataTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 5;
    const totalItems = 23;

    // Beispieldaten für eine Tabelle
    const allData = [
      { id: 1, name: 'Max Mustermann', email: 'max@example.com', role: 'Admin' },
      { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', role: 'User' },
      { id: 3, name: 'Tom Müller', email: 'tom@example.com', role: 'Editor' },
      { id: 4, name: 'Lisa Weber', email: 'lisa@example.com', role: 'User' },
      { id: 5, name: 'Jan Becker', email: 'jan@example.com', role: 'Admin' },
      { id: 6, name: 'Sarah Krause', email: 'sarah@example.com', role: 'User' },
      { id: 7, name: 'Tim Hoffmann', email: 'tim@example.com', role: 'Editor' },
      { id: 8, name: 'Laura Meyer', email: 'laura@example.com', role: 'User' },
      { id: 9, name: 'Felix Schulz', email: 'felix@example.com', role: 'Admin' },
      { id: 10, name: 'Nina Fischer', email: 'nina@example.com', role: 'User' },
      { id: 11, name: 'David Wagner', email: 'david@example.com', role: 'Editor' },
      { id: 12, name: 'Julia Bauer', email: 'julia@example.com', role: 'User' },
      { id: 13, name: 'Markus Keller', email: 'markus@example.com', role: 'Admin' },
      { id: 14, name: 'Sophie Richter', email: 'sophie@example.com', role: 'User' },
      { id: 15, name: 'Lukas Wolf', email: 'lukas@example.com', role: 'Editor' },
      { id: 16, name: 'Lena Schäfer', email: 'lena@example.com', role: 'User' },
      { id: 17, name: 'Philipp Neumann', email: 'philipp@example.com', role: 'Admin' },
      { id: 18, name: 'Mia Schwarz', email: 'mia@example.com', role: 'User' },
      { id: 19, name: 'Jonas Zimmermann', email: 'jonas@example.com', role: 'Editor' },
      { id: 20, name: 'Hannah König', email: 'hannah@example.com', role: 'User' },
      { id: 21, name: 'Simon Lang', email: 'simon@example.com', role: 'Admin' },
      { id: 22, name: 'Emma Huber', email: 'emma@example.com', role: 'User' },
      { id: 23, name: 'Paul Braun', email: 'paul@example.com', role: 'Editor' },
    ];

    // Berechne die aktuellen Daten basierend auf der Seite
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentData = allData.slice(startIndex, endIndex);

    return (
      <div className="w-[700px] space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rolle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Zeige {startIndex + 1} bis {endIndex} von {totalItems} Einträgen
          </div>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            size="sm"
          />
        </div>
      </div>
    );
  },
};
