// packages/@smolitux/core/src/components/Table/Table.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import { useState } from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Core/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Beispieldaten
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

const users: User[] = Array.from({ length: 20 }).map((_, index) => ({
  id: index + 1,
  name: `Benutzer ${index + 1}`,
  email: `benutzer${index + 1}@example.com`,
  role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'Benutzer',
  status: index % 4 === 0 ? 'inactive' : index % 5 === 0 ? 'pending' : 'active',
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
}));

// Standard-Tabelle
export const Default: Story = {
  args: {
    data: users,
    columns: [
      {
        id: 'id',
        header: 'ID',
        accessor: (user) => user.id,
        width: '70px',
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (user) => user.name,
        sortable: true,
      },
      {
        id: 'email',
        header: 'E-Mail',
        accessor: (user) => user.email,
      },
      {
        id: 'role',
        header: 'Rolle',
        accessor: (user) => user.role,
        sortable: true,
        filterable: true,
      },
      {
        id: 'status',
        header: 'Status',
        accessor: (user) => user.status,
        cell: (value) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              value === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : value === 'inactive'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            }`}
          >
            {value === 'active' ? 'Aktiv' : value === 'inactive' ? 'Inaktiv' : 'Ausstehend'}
          </span>
        ),
        sortable: true,
        filterable: true,
      },
      {
        id: 'lastLogin',
        header: 'Letzter Login',
        accessor: (user) => user.lastLogin,
        cell: (value) => value.toLocaleDateString('de-DE'),
        sortable: true,
      },
    ],
    title: 'Benutzerverwaltung',
    subtitle: 'Liste aller registrierten Benutzer',
    emptyMessage: 'Keine Benutzer gefunden',
    showSearch: true,
    showPagination: true,
    itemsPerPage: 5,
  },
};

// Tabelle mit Aktionen
export const WithActions: Story = {
  args: {
    ...Default.args,
    columns: [
      ...(Default.args?.columns || []),
      {
        id: 'actions',
        header: 'Aktionen',
        accessor: () => null,
        cell: (_, user) => (
          <div className="flex space-x-2">
            <button
              className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Benutzer bearbeiten: ${user.name}`);
              }}
            >
              <Edit size={16} />
            </button>
            <button
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Benutzer löschen: ${user.name}`);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
        width: '100px',
      },
    ],
    onRowClick: (user) => alert(`Benutzer ausgewählt: ${user.name}`),
  },
};

// Tabelle mit Zebrastreifen
export const Striped: Story = {
  args: {
    ...Default.args,
    striped: true,
  },
};

// Tabelle mit Rahmen
export const Bordered: Story = {
  args: {
    ...Default.args,
    bordered: true,
  },
};

// Kompakte Tabelle
export const Compact: Story = {
  args: {
    ...Default.args,
    compact: true,
  },
};

// Tabelle mit Vorab-Sortierung
export const PreSorted: Story = {
  args: {
    ...Default.args,
    initialSortBy: { id: 'role', direction: 'asc' },
  },
};

// Tabelle mit Zeilen-Selektion
export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
  },
};

// Tabelle mit Aktualisierungsfunktion
export const WithRefresh: Story = {
  args: {
    ...Default.args,
    onRefresh: async () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    },
  },
};

// Interaktive Tabelle (mit allen Funktionen)
export const Interactive: Story = {
  render: () => {
    const [tableData, setTableData] = useState<User[]>(users);

    const columns = [
      {
        id: 'id',
        header: 'ID',
        accessor: (user: User) => user.id,
        width: '70px',
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (user: User) => user.name,
        sortable: true,
        filterable: true,
      },
      {
        id: 'email',
        header: 'E-Mail',
        accessor: (user: User) => user.email,
        cell: (value: string) => (
          <div className="flex items-center">
            <span>{value}</span>
            <a
              href={`mailto:${value}`}
              className="ml-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        ),
      },
      {
        id: 'role',
        header: 'Rolle',
        accessor: (user: User) => user.role,
        sortable: true,
        filterable: true,
      },
      {
        id: 'status',
        header: 'Status',
        accessor: (user: User) => user.status,
        cell: (value: string) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              value === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : value === 'inactive'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            }`}
          >
            {value === 'active' ? 'Aktiv' : value === 'inactive' ? 'Inaktiv' : 'Ausstehend'}
          </span>
        ),
        sortable: true,
        filterable: true,
      },
      {
        id: 'lastLogin',
        header: 'Letzter Login',
        accessor: (user: User) => user.lastLogin,
        cell: (value: Date) => value.toLocaleDateString('de-DE'),
        sortable: true,
      },
      {
        id: 'actions',
        header: 'Aktionen',
        accessor: () => null,
        cell: (_: null, user: User) => (
          <div className="flex space-x-2">
            <button
              className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Benutzer bearbeiten: ${user.name}`);
              }}
            >
              <Edit size={16} />
            </button>
            <button
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                const newData = tableData.filter((u) => u.id !== user.id);
                setTableData(newData);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
        width: '100px',
      },
    ];

    const handleRefresh = async () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          // Simulieren eines API-Aufrufs, der neue Daten zurückgibt
          const newRandomUsers = Array.from({ length: 20 }).map((_, index) => ({
            id: index + 1,
            name: `Benutzer ${index + 1}`,
            email: `benutzer${index + 1}@example.com`,
            role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'Benutzer',
            status: index % 4 === 0 ? 'inactive' : index % 5 === 0 ? 'pending' : 'active',
            lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          }));
          setTableData(newRandomUsers);
          resolve();
        }, 1000);
      });
    };

    return (
      <Table
        data={tableData}
        columns={columns}
        title="Interaktive Benutzerverwaltung"
        subtitle="Vollständig interaktive Tabelle mit allen Funktionen"
        striped
        hoverable
        showSearch
        showPagination
        itemsPerPage={5}
        onRefresh={handleRefresh}
        onExport={() => alert('Export-Funktion würde hier ausgeführt werden')}
        selectable
        onRowClick={(user) => alert(`Benutzer ausgewählt: ${user.name}`)}
        actions={
          <button
            className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 flex items-center"
            onClick={() => alert('Neuen Benutzer anlegen')}
          >
            <span className="text-lg mr-1">+</span> Benutzer
          </button>
        }
      />
    );
  },
};

// Tabelle ohne Daten
export const EmptyTable: Story = {
  args: {
    ...Default.args,
    data: [],
    emptyMessage: 'Keine Daten gefunden. Bitte fügen Sie neue Benutzer hinzu.',
  },
};

// Tabelle in Ladezustand
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
