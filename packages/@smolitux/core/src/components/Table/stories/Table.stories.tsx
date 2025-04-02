import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table } from '../Table';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Table> = {
  title: 'Core/Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Die Spalten der Tabelle',
    },
    data: {
      description: 'Die Daten der Tabelle',
    },
    variant: {
      control: {
        type: 'select',
        options: ['simple', 'striped', 'bordered', 'unstyled'],
      },
      description: 'Die Variante der Tabelle',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Tabelle',
    },
    sortable: {
      control: 'boolean',
      description: 'Gibt an, ob die Tabelle sortierbar ist',
    },
    onSort: {
      action: 'sorted',
      description: 'Callback, der aufgerufen wird, wenn eine Spalte sortiert wird',
    },
    selectable: {
      control: 'boolean',
      description: 'Gibt an, ob Zeilen auswählbar sind',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback, der aufgerufen wird, wenn eine Zeile ausgewählt wird',
    },
    pagination: {
      control: 'boolean',
      description: 'Gibt an, ob die Tabelle paginiert ist',
    },
    pageSize: {
      control: 'number',
      description: 'Die Anzahl der Zeilen pro Seite',
    },
    currentPage: {
      control: 'number',
      description: 'Die aktuelle Seite',
    },
    totalPages: {
      control: 'number',
      description: 'Die Gesamtzahl der Seiten',
    },
    onPageChange: {
      action: 'page changed',
      description: 'Callback, der aufgerufen wird, wenn die Seite geändert wird',
    },
    loading: {
      control: 'boolean',
      description: 'Gibt an, ob die Tabelle geladen wird',
    },
    emptyText: {
      control: 'text',
      description: 'Der Text, der angezeigt wird, wenn keine Daten vorhanden sind',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Gibt an, ob der Header fixiert ist',
    },
    stickyFirstColumn: {
      control: 'boolean',
      description: 'Gibt an, ob die erste Spalte fixiert ist',
    },
    highlightOnHover: {
      control: 'boolean',
      description: 'Hebt Zeilen beim Hover hervor',
    },
    responsive: {
      control: 'boolean',
      description: 'Macht die Tabelle responsiv',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Beispieldaten für die Tabelle
const columns = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'E-Mail', accessor: 'email' },
  { id: 'role', header: 'Rolle', accessor: 'role' },
  { id: 'status', header: 'Status', accessor: 'status' },
  { 
    id: 'actions', 
    header: 'Aktionen', 
    accessor: (row: any) => (
      <div className="flex space-x-2">
        <Button size="sm">Bearbeiten</Button>
        <Button size="sm" variant="outlined" color="danger">Löschen</Button>
      </div>
    ),
  },
];

const data = [
  { id: 1, name: 'Max Mustermann', email: 'max@example.com', role: 'Admin', status: 'Aktiv' },
  { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', role: 'Benutzer', status: 'Inaktiv' },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Benutzer', status: 'Aktiv' },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Aktiv' },
  { id: 5, name: 'Michael Johnson', email: 'michael@example.com', role: 'Benutzer', status: 'Inaktiv' },
];

export const Basic: Story = {
  args: {
    columns,
    data,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Simple</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="simple" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Striped</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="striped" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Bordered</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="bordered" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Unstyled</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="unstyled" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const Sortable: Story = {
  args: {
    columns,
    data,
    sortable: true,
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data,
    selectable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data,
    pagination: true,
    pageSize: 2,
    currentPage: 1,
    totalPages: 3,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyText: 'Keine Daten vorhanden',
  },
};

export const StickyHeader: Story = {
  args: {
    columns,
    data: [...data, ...data, ...data], // Mehr Daten für Scrolling
    stickyHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Eine Tabelle mit fixiertem Header. Scrollen Sie, um den Effekt zu sehen.',
      },
    },
  },
};

export const HighlightOnHover: Story = {
  args: {
    columns,
    data,
    highlightOnHover: true,
  },
};

export const Responsive: Story = {
  args: {
    columns,
    data,
    responsive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Eine responsive Tabelle. Ändern Sie die Größe des Fensters, um den Effekt zu sehen.',
      },
    },
  },
};

export const CustomCellRendering: Story = {
  render: () => {
    const customColumns = [
      { id: 'name', header: 'Name', accessor: 'name' },
      { id: 'email', header: 'E-Mail', accessor: 'email' },
      { 
        id: 'role', 
        header: 'Rolle', 
        accessor: (row: any) => {
          const roleStyles = {
            Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            Benutzer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            Editor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          };
          
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyles[row.role as keyof typeof roleStyles]}`}>
              {row.role}
            </span>
          );
        },
      },
      { 
        id: 'status', 
        header: 'Status', 
        accessor: (row: any) => {
          const statusStyles = {
            Aktiv: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            Inaktiv: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
          };
          
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[row.status as keyof typeof statusStyles]}`}>
              {row.status}
            </span>
          );
        },
      },
      { 
        id: 'actions', 
        header: 'Aktionen', 
        accessor: (row: any) => (
          <div className="flex space-x-2">
            <Button size="sm">Bearbeiten</Button>
            <Button size="sm" variant="outlined" color="danger">Löschen</Button>
          </div>
        ),
      },
    ];
    
    return <Table columns={customColumns} data={data} />;
  },
};

export const WithFooter: Story = {
  render: () => {
    const columnsWithFooter = [
      { id: 'name', header: 'Name', accessor: 'name', footer: 'Gesamt' },
      { id: 'email', header: 'E-Mail', accessor: 'email', footer: '5 Einträge' },
      { id: 'role', header: 'Rolle', accessor: 'role', footer: '3 Rollen' },
      { id: 'status', header: 'Status', accessor: 'status', footer: '2 Status' },
      { 
        id: 'actions', 
        header: 'Aktionen', 
        accessor: (row: any) => (
          <div className="flex space-x-2">
            <Button size="sm">Bearbeiten</Button>
            <Button size="sm" variant="outlined" color="danger">Löschen</Button>
          </div>
        ),
        footer: '',
      },
    ];
    
    return <Table columns={columnsWithFooter} data={data} />;
  },
};

export const WithNestedData: Story = {
  render: () => {
    const nestedData = [
      { 
        id: 1, 
        name: 'Max Mustermann', 
        email: 'max@example.com', 
        details: { 
          address: 'Musterstraße 1, 12345 Musterstadt',
          phone: '+49 123 456789',
          department: 'IT',
        },
      },
      { 
        id: 2, 
        name: 'Anna Schmidt', 
        email: 'anna@example.com', 
        details: { 
          address: 'Beispielweg 2, 54321 Beispielstadt',
          phone: '+49 987 654321',
          department: 'Marketing',
        },
      },
      { 
        id: 3, 
        name: 'John Doe', 
        email: 'john@example.com', 
        details: { 
          address: 'Teststraße 3, 67890 Teststadt',
          phone: '+49 456 123789',
          department: 'Vertrieb',
        },
      },
    ];
    
    const nestedColumns = [
      { id: 'name', header: 'Name', accessor: 'name' },
      { id: 'email', header: 'E-Mail', accessor: 'email' },
      { id: 'address', header: 'Adresse', accessor: (row: any) => row.details.address },
      { id: 'phone', header: 'Telefon', accessor: (row: any) => row.details.phone },
      { id: 'department', header: 'Abteilung', accessor: (row: any) => row.details.department },
    ];
    
    return <Table columns={nestedColumns} data={nestedData} />;
  },
};