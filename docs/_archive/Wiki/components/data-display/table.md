# Table

Die Table-Komponente bietet eine leistungsstarke und flexible Möglichkeit, tabellarische Daten anzuzeigen. Sie unterstützt Sortierung, Filterung, Paginierung und benutzerdefinierte Zellendarstellung.

## Import

```jsx
import { Table } from '@smolitux/core';
```

## Verwendung

### Einfache Tabelle

```jsx
const data = [
  { id: 1, name: 'Max Mustermann', email: 'max@example.com', role: 'Admin' },
  { id: 2, name: 'Erika Musterfrau', email: 'erika@example.com', role: 'User' },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Editor' },
];

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
  },
  {
    id: 'email',
    header: 'E-Mail',
    accessor: (row) => row.email,
  },
  {
    id: 'role',
    header: 'Rolle',
    accessor: (row) => row.role,
  },
];

<Table 
  data={data} 
  columns={columns} 
  rowKey={(row) => row.id.toString()} 
/>
```

### Tabelle mit benutzerdefinierten Zellen

```jsx
const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
  },
  {
    id: 'email',
    header: 'E-Mail',
    accessor: (row) => row.email,
    cell: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
  {
    id: 'role',
    header: 'Rolle',
    accessor: (row) => row.role,
    cell: (value) => {
      const badgeColor = {
        'Admin': 'danger',
        'User': 'primary',
        'Editor': 'success',
      }[value] || 'default';
      
      return <Badge variant={badgeColor}>{value}</Badge>;
    },
  },
  {
    id: 'actions',
    header: 'Aktionen',
    accessor: (row) => row.id,
    cell: (value, row) => (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
          Bearbeiten
        </Button>
        <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
          Löschen
        </Button>
      </div>
    ),
  },
];
```

### Sortierbare Tabelle

```jsx
const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

const handleSort = (columnId) => {
  setSortConfig((prevSortConfig) => {
    if (prevSortConfig.key === columnId) {
      return {
        key: columnId,
        direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
      };
    }
    return { key: columnId, direction: 'asc' };
  });
};

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: 'email',
    header: 'E-Mail',
    accessor: (row) => row.email,
    sortable: true,
  },
  {
    id: 'role',
    header: 'Rolle',
    accessor: (row) => row.role,
    sortable: true,
  },
];

// Sortiere die Daten basierend auf der Konfiguration
const sortedData = useMemo(() => {
  if (!sortConfig.key) return data;
  
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}, [data, sortConfig]);

<Table 
  data={sortedData} 
  columns={columns} 
  rowKey={(row) => row.id.toString()} 
  sortConfig={sortConfig}
  onSort={handleSort}
/>
```

### Tabelle mit Paginierung

```jsx
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

// Berechne die anzuzeigenden Daten basierend auf der aktuellen Seite
const paginatedData = useMemo(() => {
  const startIndex = (currentPage - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}, [data, currentPage, pageSize]);

// Berechne die Gesamtzahl der Seiten
const totalPages = Math.ceil(data.length / pageSize);

<>
  <Table 
    data={paginatedData} 
    columns={columns} 
    rowKey={(row) => row.id.toString()} 
  />
  
  <div className="flex justify-between items-center mt-4">
    <div>
      Zeige {(currentPage - 1) * pageSize + 1} bis {Math.min(currentPage * pageSize, data.length)} von {data.length} Einträgen
    </div>
    
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Zurück
      </Button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button 
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button 
        variant="outline" 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Weiter
      </Button>
    </div>
  </div>
</>
```

### Tabelle mit Filterung

```jsx
const [filters, setFilters] = useState({});

const handleFilterChange = (columnId, value) => {
  setFilters(prev => ({
    ...prev,
    [columnId]: value,
  }));
};

// Filtere die Daten basierend auf den aktiven Filtern
const filteredData = useMemo(() => {
  return data.filter(row => {
    return Object.entries(filters).every(([columnId, filterValue]) => {
      if (!filterValue) return true;
      
      const column = columns.find(col => col.id === columnId);
      if (!column) return true;
      
      const cellValue = column.accessor(row);
      return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
    });
  });
}, [data, filters, columns]);

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    filterable: true,
  },
  {
    id: 'email',
    header: 'E-Mail',
    accessor: (row) => row.email,
    filterable: true,
  },
  {
    id: 'role',
    header: 'Rolle',
    accessor: (row) => row.role,
    filterable: true,
  },
];

<Table 
  data={filteredData} 
  columns={columns} 
  rowKey={(row) => row.id.toString()} 
  filters={filters}
  onFilterChange={handleFilterChange}
/>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `data` | `T[]` | - | Tabellendaten als Array von Objekten |
| `columns` | `TableColumn<T>[]` | - | Spaltenkonfiguration |
| `rowKey` | `(row: T) => string` | `(_, index) => index.toString()` | Funktion zur Generierung eines eindeutigen Schlüssels für jede Zeile |
| `onRowClick` | `(row: T) => void` | - | Callback für Klick auf eine Zeile |
| `loading` | `boolean` | `false` | Zeigt einen Ladeindikator an |
| `emptyMessage` | `ReactNode` | `'Keine Daten vorhanden'` | Nachricht, wenn keine Daten vorhanden sind |
| `className` | `string` | - | Zusätzliche CSS-Klassen für die Tabelle |
| `headerClassName` | `string` | - | CSS-Klassen für den Tabellenkopf |
| `bodyClassName` | `string` | - | CSS-Klassen für den Tabellenkörper |
| `rowClassName` | `string \| (row: T, index: number) => string` | - | CSS-Klassen für Tabellenzeilen |
| `cellClassName` | `string \| (value: any, row: T, index: number) => string` | - | CSS-Klassen für Tabellenzellen |
| `striped` | `boolean` | `false` | Zeigt abwechselnd gefärbte Zeilen an |
| `hoverable` | `boolean` | `false` | Hebt Zeilen beim Darüberfahren hervor |
| `bordered` | `boolean` | `false` | Zeigt Rahmen um die Tabelle und Zellen an |
| `compact` | `boolean` | `false` | Reduziert den Abstand in der Tabelle |
| `sortable` | `boolean` | `false` | Aktiviert die Sortierung für alle Spalten |
| `sortConfig` | `{ key: string; direction: 'asc' \| 'desc' }` | - | Aktuelle Sortierkonfiguration |
| `onSort` | `(columnId: string) => void` | - | Callback für Sortieränderungen |
| `filterable` | `boolean` | `false` | Aktiviert die Filterung für alle Spalten |
| `filters` | `Record<string, any>` | - | Aktuelle Filterkonfiguration |
| `onFilterChange` | `(columnId: string, value: any) => void` | - | Callback für Filteränderungen |
| `pagination` | `boolean` | `false` | Aktiviert die Paginierung |
| `pageSize` | `number` | `10` | Anzahl der Zeilen pro Seite |
| `currentPage` | `number` | `1` | Aktuelle Seite |
| `totalPages` | `number` | - | Gesamtzahl der Seiten |
| `onPageChange` | `(page: number) => void` | - | Callback für Seitenänderungen |
| `showPageSizeSelector` | `boolean` | `false` | Zeigt einen Selektor für die Seitengröße an |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Optionen für die Seitengröße |
| `onPageSizeChange` | `(pageSize: number) => void` | - | Callback für Änderungen der Seitengröße |
| `showPaginationInfo` | `boolean` | `true` | Zeigt Informationen zur Paginierung an |
| `showSearch` | `boolean` | `false` | Zeigt ein Suchfeld an |
| `searchValue` | `string` | - | Aktueller Suchwert |
| `onSearchChange` | `(value: string) => void` | - | Callback für Suchänderungen |
| `searchPlaceholder` | `string` | `'Suchen...'` | Platzhaltertext für das Suchfeld |
| `showToolbar` | `boolean` | `false` | Zeigt eine Toolbar über der Tabelle an |
| `toolbarContent` | `ReactNode` | - | Benutzerdefinierter Inhalt für die Toolbar |
| `showColumnSelector` | `boolean` | `false` | Zeigt einen Spaltenauswahl-Dialog an |
| `onColumnVisibilityChange` | `(columnId: string, visible: boolean) => void` | - | Callback für Änderungen der Spaltensichtbarkeit |
| `stickyHeader` | `boolean` | `false` | Fixiert den Tabellenkopf beim Scrollen |
| `stickyFirstColumn` | `boolean` | `false` | Fixiert die erste Spalte beim Scrollen |
| `height` | `string \| number` | - | Höhe der Tabelle |
| `maxHeight` | `string \| number` | - | Maximale Höhe der Tabelle |
| `resizable` | `boolean` | `false` | Ermöglicht das Ändern der Spaltenbreite |
| `onColumnResize` | `(columnId: string, width: number) => void` | - | Callback für Änderungen der Spaltenbreite |
| `selectable` | `boolean` | `false` | Ermöglicht die Auswahl von Zeilen |
| `selectedRows` | `string[]` | - | Array von ausgewählten Zeilen-IDs |
| `onSelectionChange` | `(selectedRows: string[]) => void` | - | Callback für Änderungen der Zeilenauswahl |
| `selectAllRows` | `boolean` | `false` | Ermöglicht die Auswahl aller Zeilen |

### TableColumn Interface

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|-------------|
| `id` | `string` | - | Eindeutige ID der Spalte |
| `header` | `ReactNode` | - | Angezeigter Header-Text |
| `accessor` | `(row: T) => any` | - | Funktion zur Extraktion des Zellwerts aus einer Zeile |
| `cell` | `(value: any, row: T, index: number) => ReactNode` | - | Benutzerdefinierte Render-Funktion für die Zelle |
| `className` | `string` | - | Zusätzliche CSS-Klassen für die Spalte |
| `headerClassName` | `string` | - | CSS-Klassen für den Header der Spalte |
| `sortable` | `boolean` | `false` | Falls true, ist die Spalte sortierbar |
| `filterable` | `boolean` | `false` | Falls true, ist die Spalte filterbar |
| `width` | `string` | - | Breite der Spalte |
| `minWidth` | `string` | - | Minimale Breite der Spalte |
| `maxWidth` | `string` | - | Maximale Breite der Spalte |
| `hide` | `boolean` | `false` | Falls true, wird die Spalte ausgeblendet |

## Barrierefreiheit

Die Table-Komponente ist für Barrierefreiheit optimiert:

- Verwendet semantische HTML-Tabellen-Tags (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- Korrekte ARIA-Attribute für sortierbare und filterbare Spalten
- Tastaturnavigation für Paginierung und Sortierung
- Screenreader-Unterstützung für Tabellendaten

## Beispiele

### Tabelle mit Zeilenauswahl

```jsx
const [selectedRows, setSelectedRows] = useState([]);

const handleSelectionChange = (selected) => {
  setSelectedRows(selected);
};

const handleBulkAction = () => {
  console.log('Ausgewählte Zeilen:', selectedRows);
  // Führe Aktionen mit den ausgewählten Zeilen durch
};

<>
  {selectedRows.length > 0 && (
    <div className="mb-4 p-2 bg-primary-50 rounded flex justify-between items-center">
      <span>{selectedRows.length} Einträge ausgewählt</span>
      <Button onClick={handleBulkAction}>Massenbearbeitung</Button>
    </div>
  )}
  
  <Table 
    data={data} 
    columns={columns} 
    rowKey={(row) => row.id.toString()} 
    selectable
    selectedRows={selectedRows}
    onSelectionChange={handleSelectionChange}
    selectAllRows
  />
</>
```

### Tabelle mit erweiterbaren Zeilen

```jsx
const [expandedRows, setExpandedRows] = useState({});

const toggleRowExpanded = (rowId) => {
  setExpandedRows(prev => ({
    ...prev,
    [rowId]: !prev[rowId],
  }));
};

const renderExpandedContent = (row) => (
  <div className="p-4 bg-gray-50">
    <h4 className="font-medium">Details für {row.name}</h4>
    <div className="grid grid-cols-2 gap-4 mt-2">
      <div>
        <p><strong>Adresse:</strong> {row.address}</p>
        <p><strong>Telefon:</strong> {row.phone}</p>
      </div>
      <div>
        <p><strong>Registriert am:</strong> {new Date(row.registeredAt).toLocaleDateString()}</p>
        <p><strong>Letzte Aktivität:</strong> {new Date(row.lastActivity).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

const columns = [
  {
    id: 'expander',
    header: '',
    accessor: (row) => row.id,
    cell: (value) => (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          toggleRowExpanded(value);
        }}
      >
        {expandedRows[value] ? '▼' : '►'}
      </Button>
    ),
    width: '40px',
  },
  // ... andere Spalten
];

<Table 
  data={data} 
  columns={columns} 
  rowKey={(row) => row.id.toString()} 
  expandedRows={expandedRows}
  renderExpandedContent={renderExpandedContent}
/>
```

### Tabelle mit Drag-and-Drop für Zeilen

```jsx
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableRow = ({ row, index, moveRow, ...props }) => {
  const [, ref] = useDrag({
    type: 'ROW',
    item: { index },
  });
  
  const [, drop] = useDrop({
    accept: 'ROW',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  
  return <tr ref={(node) => ref(drop(node))} {...props} />;
};

function DraggableTable() {
  const [rows, setRows] = useState(data);
  
  const moveRow = (fromIndex, toIndex) => {
    const updatedRows = [...rows];
    const [movedRow] = updatedRows.splice(fromIndex, 1);
    updatedRows.splice(toIndex, 0, movedRow);
    setRows(updatedRows);
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Table 
        data={rows} 
        columns={columns} 
        rowKey={(row) => row.id.toString()} 
        renderRow={(row, index, props) => (
          <DraggableRow 
            key={row.id} 
            row={row} 
            index={index} 
            moveRow={moveRow} 
            {...props} 
          />
        )}
      />
    </DndProvider>
  );
}
```