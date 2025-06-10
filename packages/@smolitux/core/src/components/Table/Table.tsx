// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useEffect, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = unknown> {
  /** Eindeutige ID der Spalte */
  id: string;
  /** Anzeigename der Spalte */
  header: React.ReactNode;
  /** Funktion zum Rendern der Zelle */
  cell: (row: T, rowIndex: number) => React.ReactNode;
  /** Ob die Spalte sortierbar ist */
  sortable?: boolean;
  /** Funktion zum Sortieren der Spalte */
  sortFn?: (a: T, b: T, direction: SortDirection) => number;
  /** Breite der Spalte */
  width?: string | number;
  /** Ausrichtung des Inhalts */
  align?: 'left' | 'center' | 'right';
  /** Ob die Spalte fixiert ist */
  fixed?: boolean;
  /** Ob die Spalte ausgeblendet ist */
  hidden?: boolean;
  /** Zusätzliche CSS-Klassen für die Spalte */
  className?: string;
  /** Zusätzliche CSS-Klassen für den Header */
  headerClassName?: string;
  /** Zusätzliche CSS-Klassen für die Zellen */
  cellClassName?: string;
}

// Typ für Filteroptionen
export interface TableFilterOption {
  value: string;
  label: string;
}

// Typ für Filterkriterien
export interface TableFilterCriteria<T = unknown> {
  columnId: string;
  value: string | string[];
  operator?:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'in'
    | 'notIn'
    | 'greaterThan'
    | 'lessThan';
  customFilter?: (row: T, value: string | string[]) => boolean;
}

// Typ für Paginierungsoptionen
export interface PaginationOptions {
  /** Anzahl der Einträge pro Seite */
  itemsPerPage: number;
  /** Aktuelle Seite */
  currentPage: number;
  /** Gesamtzahl der Einträge */
  totalItems: number;
  /** Anzahl der angezeigten Seitenzahlen */
  pageRangeDisplayed?: number;
  /** Anzahl der Einträge pro Seite Optionen */
  itemsPerPageOptions?: number[];
  /** Callback bei Änderung der Einträge pro Seite */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export interface TableProps<T = unknown> {
  /** Daten für die Tabelle */
  data: T[];
  /** Spaltendefinitionen */
  columns: TableColumn<T>[];
  /** Ob die Tabelle gestreift sein soll */
  striped?: boolean;
  /** Ob die Tabelle einen Hover-Effekt haben soll */
  hover?: boolean;
  /** Ob die Tabelle einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob die Tabelle kompakt sein soll */
  compact?: boolean;
  /** Ob die Tabelle einen Schatten haben soll */
  shadow?: boolean;
  /** Ob die Tabelle abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob die Tabelle responsive sein soll */
  responsive?: boolean;
  /** Ob die Tabelle einen Header haben soll */
  showHeader?: boolean;
  /** Ob die Tabelle eine Fußzeile haben soll */
  showFooter?: boolean;
  /** Ob die Tabelle sortierbar sein soll */
  sortable?: boolean;
  /** Standardsortierung */
  defaultSort?: { id: string; direction: SortDirection };
  /** Callback bei Sortierungsänderung */
  onSort?: (id: string, direction: SortDirection) => void;
  /** Ob die Tabelle paginiert sein soll */
  paginated?: boolean;
  /** Anzahl der Einträge pro Seite */
  itemsPerPage?: number;
  /** Aktuelle Seite */
  currentPage?: number;
  /** Callback bei Seitenänderung */
  onPageChange?: (page: number) => void;
  /** Callback bei Klick auf eine Zeile */
  onRowClick?: (row: T, index: number) => void;
  /** Funktion zum Rendern einer leeren Tabelle */
  emptyState?: React.ReactNode;
  /** Funktion zum Rendern einer Ladeanimation */
  loading?: boolean;
  /** Funktion zum Rendern eines Ladezustands */
  loadingState?: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Header */
  headerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Body */
  bodyClassName?: string;
  /** Zusätzliche CSS-Klassen für die Zeilen */
  rowClassName?: string | ((row: T, index: number) => string);
  /** Zusätzliche CSS-Klassen für die Zellen */
  cellClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fußzeile */
  footerClassName?: string;
  /** Zusätzliche CSS-Klassen für die Paginierung */
  paginationClassName?: string;
  /** ID für die Tabelle */
  id?: string;
  /** ARIA-Label für die Tabelle */
  ariaLabel?: string;
  /** Ob die Tabelle eine Zusammenfassung haben soll */
  summary?: string;
  /** Ob die Tabelle einen Titel haben soll */
  caption?: React.ReactNode;
  /** Position des Titels */
  captionPosition?: 'top' | 'bottom';
  /** Ob die Tabelle filterbar sein soll */
  filterable?: boolean;
  /** Standardfilter */
  defaultFilters?: TableFilterCriteria<T>[];
  /** Callback bei Filteränderung */
  onFilter?: (filters: TableFilterCriteria<T>[]) => void;
  /** Ob die Tabelle eine Suchfunktion haben soll */
  searchable?: boolean;
  /** Suchbegriff */
  searchTerm?: string;
  /** Callback bei Suchbegriffsänderung */
  onSearch?: (searchTerm: string) => void;
  /** Spalten, die durchsucht werden sollen */
  searchColumns?: string[];
  /** Ob die Tabelle Zeilenauswahl unterstützen soll */
  selectable?: boolean;
  /** Ausgewählte Zeilen */
  selectedRows?: T[];
  /** Callback bei Zeilenauswahländerung */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Ob mehrere Zeilen ausgewählt werden können */
  multiSelect?: boolean;
  /** Ob alle Zeilen ausgewählt werden können */
  selectAll?: boolean;
  /** Callback bei Auswahl aller Zeilen */
  onSelectAll?: (selected: boolean) => void;
  /** Erweiterte Paginierungsoptionen */
  paginationOptions?: Partial<PaginationOptions>;
  /** Ob die Tabelle exportierbar sein soll */
  exportable?: boolean;
  /** Exportformate */
  exportFormats?: ('csv' | 'excel' | 'pdf')[];
  /** Callback bei Export */
  onExport?: (format: 'csv' | 'excel' | 'pdf') => void;
}

const Table = <T extends Record<string, unknown>>({
  data = [],
  columns = [],
  striped = false,
  hover = true,
  bordered = false,
  compact = false,
  shadow = false,
  rounded = true,
  responsive = true,
  showHeader = true,
  showFooter = false,
  sortable = true,
  defaultSort,
  onSort,
  paginated = false,
  itemsPerPage = 10,
  currentPage: controlledCurrentPage,
  onPageChange,
  onRowClick,
  emptyState = (
    <div
      className="p-4 text-center text-gray-500 dark:text-gray-400"
      role="status"
      aria-live="polite"
    >
      Keine Daten vorhanden
    </div>
  ),
  loading = false,
  loadingState = (
    <div
      className="p-4 text-center text-gray-500 dark:text-gray-400"
      role="status"
      aria-live="polite"
    >
      Laden...
    </div>
  ),
  className = '',
  containerClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
  footerClassName = '',
  paginationClassName = '',
  id,
  ariaLabel = 'Datentabelle',
  summary,
  caption,
  captionPosition = 'top',
  filterable = false,
  defaultFilters = [],
  onFilter,
  searchable = false,
  searchTerm = '',
  onSearch,
  searchColumns = [],
  selectable = false,
  selectedRows = [],
  onRowSelect,
  multiSelect = true,
  selectAll = false,
  onSelectAll,
  paginationOptions,
  exportable = false,
  exportFormats = ['csv', 'excel', 'pdf'],
  onExport,
}: TableProps<T>) => {
  // Zustand für Sortierung
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSort?.id || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction || null);

  // Zustand für Paginierung
  const [currentPage, setCurrentPage] = useState(controlledCurrentPage || 1);
  const [itemsPerPageState, setItemsPerPageState] = useState(
    paginationOptions?.itemsPerPage || itemsPerPage
  );

  // Zustand für Filterung
  const [filters, setFilters] = useState<TableFilterCriteria<T>[]>(defaultFilters);

  // Zustand für Suche
  const [searchTermState, setSearchTermState] = useState(searchTerm);

  // Zustand für Zeilenauswahl
  const [selectedRowsState, setSelectedRowsState] = useState<T[]>(selectedRows);
  const [selectAllState, setSelectAllState] = useState(selectAll);

  // Effekt für kontrollierte Paginierung
  useEffect(() => {
    if (controlledCurrentPage !== undefined) {
      setCurrentPage(controlledCurrentPage);
    }
  }, [controlledCurrentPage]);

  // Effekt für kontrollierte Filterung
  useEffect(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  // Effekt für kontrollierte Suche
  useEffect(() => {
    setSearchTermState(searchTerm);
  }, [searchTerm]);

  // Effekt für kontrollierte Zeilenauswahl
  useEffect(() => {
    setSelectedRowsState(selectedRows);
  }, [selectedRows]);

  // Effekt für kontrollierte Auswahl aller Zeilen
  useEffect(() => {
    setSelectAllState(selectAll);
  }, [selectAll]);

  // Hilfsfunktion zum Filtern der Daten
  const applyFilter = (row: T, filter: TableFilterCriteria<T>): boolean => {
    const { columnId, value, operator = 'equals', customFilter } = filter;

    // Verwende benutzerdefinierte Filterfunktion, wenn vorhanden
    if (customFilter) {
      return customFilter(row, value);
    }

    const cellValue = row[columnId];

    // Wenn der Zellenwert nicht existiert, kann er nicht gefiltert werden
    if (cellValue === undefined || cellValue === null) {
      return false;
    }

    // Konvertiere Zellenwert zu String für String-basierte Operationen
    const cellValueStr = String(cellValue).toLowerCase();

    // Behandle verschiedene Operatoren
    switch (operator) {
      case 'equals':
        return cellValueStr === String(value).toLowerCase();
      case 'contains':
        return cellValueStr.includes(String(value).toLowerCase());
      case 'startsWith':
        return cellValueStr.startsWith(String(value).toLowerCase());
      case 'endsWith':
        return cellValueStr.endsWith(String(value).toLowerCase());
      case 'in':
        return Array.isArray(value) && value.some((v) => String(v).toLowerCase() === cellValueStr);
      case 'notIn':
        return Array.isArray(value) && !value.some((v) => String(v).toLowerCase() === cellValueStr);
      case 'greaterThan':
        return cellValue > value;
      case 'lessThan':
        return cellValue < value;
      default:
        return false;
    }
  };

  // Hilfsfunktion zum Durchsuchen der Daten
  const applySearch = (row: T, term: string, columns: string[]): boolean => {
    if (!term) return true;

    const searchTerm = term.toLowerCase();

    // Wenn keine Spalten angegeben sind, durchsuche alle Spalten
    const columnsToSearch = columns.length > 0 ? columns : Object.keys(row);

    return columnsToSearch.some((columnId) => {
      const cellValue = row[columnId];

      if (cellValue === undefined || cellValue === null) {
        return false;
      }

      return String(cellValue).toLowerCase().includes(searchTerm);
    });
  };

  // Gefilterte Daten
  const filteredData = useMemo(() => {
    let result = [...data];

    // Wende Filter an
    if (filterable && filters.length > 0) {
      result = result.filter((row) => filters.every((filter) => applyFilter(row, filter)));
    }

    // Wende Suche an
    if (searchable && searchTermState) {
      result = result.filter((row) => applySearch(row, searchTermState, searchColumns));
    }

    return result;
  }, [data, filterable, filters, searchable, searchTermState, searchColumns]);

  // Sortierte Daten
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column || !column.sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b, sortDirection);
      }

      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      if (sortDirection === 'asc') {
        return String(aValue) < String(bValue) ? -1 : 1;
      } else {
        return String(aValue) > String(bValue) ? -1 : 1;
      }
    });
  }, [filteredData, columns, sortColumn, sortDirection]);

  // Paginierte Daten
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPageState;
    const endIndex = startIndex + itemsPerPageState;

    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, paginated, currentPage, itemsPerPageState]);

  // Funktion zum Ändern der Sortierung
  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column || !column.sortable) return;

    let newDirection: SortDirection = null;

    if (sortColumn !== columnId) {
      newDirection = 'asc';
    } else if (sortDirection === 'asc') {
      newDirection = 'desc';
    } else if (sortDirection === 'desc') {
      newDirection = null;
    } else {
      newDirection = 'asc';
    }

    setSortColumn(newDirection ? columnId : null);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(columnId, newDirection);
    }
  };

  // Funktion zum Ändern der Seite
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Funktion zum Ändern der Einträge pro Seite
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPageState(newItemsPerPage);
    setCurrentPage(1); // Zurück zur ersten Seite

    if (paginationOptions?.onItemsPerPageChange) {
      paginationOptions.onItemsPerPageChange(newItemsPerPage);
    }
  };

  // Funktion zum Ändern der Filter
  const handleFilterChange = (newFilters: TableFilterCriteria<T>[]) => {
    setFilters(newFilters);
    setCurrentPage(1); // Zurück zur ersten Seite

    if (onFilter) {
      onFilter(newFilters);
    }
  };

  // Funktion zum Ändern des Suchbegriffs
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTermState(newSearchTerm);
    setCurrentPage(1); // Zurück zur ersten Seite

    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  // Funktion zum Auswählen/Abwählen einer Zeile
  const handleRowSelection = (row: T) => {
    if (!selectable) return;

    let newSelectedRows: T[];

    if (multiSelect) {
      // Prüfe, ob die Zeile bereits ausgewählt ist
      const isSelected = selectedRowsState.some(
        (selectedRow) => JSON.stringify(selectedRow) === JSON.stringify(row)
      );

      if (isSelected) {
        // Entferne die Zeile aus der Auswahl
        newSelectedRows = selectedRowsState.filter(
          (selectedRow) => JSON.stringify(selectedRow) !== JSON.stringify(row)
        );
      } else {
        // Füge die Zeile zur Auswahl hinzu
        newSelectedRows = [...selectedRowsState, row];
      }
    } else {
      // Im Einzelauswahlmodus wird nur die aktuelle Zeile ausgewählt
      newSelectedRows = [row];
    }

    setSelectedRowsState(newSelectedRows);

    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  // Funktion zum Auswählen/Abwählen aller Zeilen
  const handleSelectAll = () => {
    if (!selectable || !multiSelect) return;

    const newSelectAll = !selectAllState;
    setSelectAllState(newSelectAll);

    const newSelectedRows = newSelectAll ? [...sortedData] : [];
    setSelectedRowsState(newSelectedRows);

    if (onSelectAll) {
      onSelectAll(newSelectAll);
    }

    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  // Funktion zum Exportieren der Daten
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    if (!exportable) return;

    if (onExport) {
      onExport(format);
    } else {
      // Standardimplementierung für CSV-Export
      if (format === 'csv') {
        const headers = columns.map((col) => col.id).join(',');
        const rows = sortedData
          .map((row) => columns.map((col) => String(row[col.id] || '')).join(','))
          .join('\n');

        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'table-export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  // Funktion zum Rendern des Sortierungssymbols
  const renderSortIcon = (columnId: string) => {
    if (sortColumn !== columnId) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg
          className="w-4 h-4 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // CSS-Klassen für die Tabelle
  const tableClasses = [
    'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
    striped ? 'table-striped' : '',
    bordered ? 'border border-gray-200 dark:border-gray-700' : '',
    rounded ? 'rounded-lg overflow-hidden' : '',
    shadow ? 'shadow-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // CSS-Klassen für den Container
  const wrapperClasses = [
    responsive ? 'overflow-x-auto' : '',
    shadow && !bordered ? 'shadow-md' : '',
    rounded && !bordered ? 'rounded-lg' : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // CSS-Klassen für die Zeilen
  const getRowClasses = (row: T, index: number) => {
    const baseClasses = [
      hover ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : '',
      striped && index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800' : '',
      onRowClick ? 'cursor-pointer' : '',
      typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return baseClasses;
  };

  // CSS-Klassen für die Zellen
  const getCellClasses = (column: TableColumn<T>) => {
    return [
      'px-6 py-4 whitespace-nowrap',
      compact ? 'px-3 py-2 text-sm' : '',
      column.align === 'center' ? 'text-center' : '',
      column.align === 'right' ? 'text-right' : '',
      column.className || '',
      cellClassName,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // CSS-Klassen für die Header-Zellen
  const getHeaderClasses = (column: TableColumn<T>) => {
    return [
      'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      compact ? 'px-3 py-2' : '',
      column.align === 'center' ? 'text-center' : '',
      column.align === 'right' ? 'text-right' : '',
      column.sortable && sortable ? 'cursor-pointer' : '',
      column.headerClassName || '',
      headerClassName,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Hilfsfunktion zum Prüfen, ob eine Zeile ausgewählt ist
  const isRowSelected = (row: T): boolean => {
    if (!selectable) return false;

    return selectedRowsState.some(
      (selectedRow) => JSON.stringify(selectedRow) === JSON.stringify(row)
    );
  };

  // Rendere Suchfeld
  const renderSearchField = () => {
    if (!searchable) return null;

    return (
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Suchen..."
            value={searchTermState}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label="Tabelle durchsuchen"
          />
        </div>
      </div>
    );
  };

  // Rendere Export-Buttons
  const renderExportButtons = () => {
    if (!exportable) return null;

    return (
      <div className="mb-4 flex space-x-2">
        {exportFormats.includes('csv') && (
          <button
            type="button"
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => handleExport('csv')}
          >
            CSV exportieren
          </button>
        )}
        {exportFormats.includes('excel') && (
          <button
            type="button"
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => handleExport('excel')}
          >
            Excel exportieren
          </button>
        )}
        {exportFormats.includes('pdf') && (
          <button
            type="button"
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => handleExport('pdf')}
          >
            PDF exportieren
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={wrapperClasses}>
      {loading ? (
        loadingState
      ) : data.length === 0 ? (
        emptyState
      ) : (
        <div>
          {/* Suchfeld und Export-Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {renderSearchField()}
            {renderExportButtons()}
          </div>

          {caption && captionPosition === 'top' && (
            <div className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium">
              {caption}
            </div>
          )}

          <table
            className={tableClasses}
            id={id}
            aria-label={ariaLabel}
            summary={summary}
            role="grid"
            aria-rowcount={paginatedData.length + 1} // +1 für Header-Zeile
            aria-colcount={columns.length}
          >
            {caption && captionPosition === 'bottom' && (
              <caption className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium">
                {caption}
              </caption>
            )}

            {showHeader && (
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr role="row" aria-rowindex={1}>
                  {/* Checkbox für "Alle auswählen" */}
                  {selectable && multiSelect && (
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                        compact ? 'px-3 py-2' : ''
                      }`}
                      style={{ width: 40 }}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          checked={selectAllState}
                          onChange={handleSelectAll}
                          aria-label="Alle Zeilen auswählen"
                        />
                      </div>
                    </th>
                  )}

                  {/* Einzelne Spaltenheader */}
                  {columns.map(
                    (column, index) =>
                      !column.hidden && (
                        <th
                          key={column.id}
                          scope="col"
                          className={getHeaderClasses(column)}
                          style={{ width: column.width }}
                          onClick={() => column.sortable && sortable && handleSort(column.id)}
                          role="columnheader"
                          aria-colindex={index + 1}
                          aria-sort={
                            sortColumn === column.id
                              ? sortDirection === 'asc'
                                ? 'ascending'
                                : sortDirection === 'desc'
                                  ? 'descending'
                                  : undefined
                              : undefined
                          }
                          tabIndex={column.sortable && sortable ? 0 : undefined}
                          onKeyDown={(e) => {
                            if (
                              column.sortable &&
                              sortable &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              handleSort(column.id);
                            }
                          }}
                          aria-label={
                            column.sortable && sortable
                              ? `${column.header}${sortColumn === column.id ? `, sortiert ${sortDirection === 'asc' ? 'aufsteigend' : 'absteigend'}` : ', klicken zum Sortieren'}`
                              : undefined
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>{column.header}</div>
                            {column.sortable && sortable && (
                              <div className="ml-2" aria-hidden="true">
                                {renderSortIcon(column.id)}
                              </div>
                            )}
                          </div>
                        </th>
                      )
                  )}
                </tr>

                {/* Filter-Zeile */}
                {filterable && (
                  <tr>
                    {/* Leere Zelle für Checkbox-Spalte */}
                    {selectable && multiSelect && <th></th>}

                    {/* Filter für jede Spalte */}
                    {columns.map(
                      (column) =>
                        !column.hidden && (
                          <th key={`filter-${column.id}`} className="px-6 py-2">
                            <input
                              type="text"
                              className="w-full p-1 text-xs border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder={`Filter...`}
                              onChange={(e) => {
                                const value = e.target.value;
                                const newFilters = [...filters];

                                // Finde den existierenden Filter für diese Spalte
                                const existingFilterIndex = newFilters.findIndex(
                                  (f) => f.columnId === column.id
                                );

                                if (value) {
                                  // Erstelle oder aktualisiere den Filter
                                  const newFilter: TableFilterCriteria<T> = {
                                    columnId: column.id,
                                    value,
                                    operator: 'contains',
                                  };

                                  if (existingFilterIndex >= 0) {
                                    newFilters[existingFilterIndex] = newFilter;
                                  } else {
                                    newFilters.push(newFilter);
                                  }
                                } else if (existingFilterIndex >= 0) {
                                  // Entferne den Filter, wenn das Feld leer ist
                                  newFilters.splice(existingFilterIndex, 1);
                                }

                                handleFilterChange(newFilters);
                              }}
                              value={
                                (filters.find((f) => f.columnId === column.id)?.value as string) ||
                                ''
                              }
                              aria-label={`Filter für ${column.header}`}
                            />
                          </th>
                        )
                    )}
                  </tr>
                )}
              </thead>
            )}

            <tbody
              className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ${bodyClassName}`}
            >
              {paginatedData.map((row, rowIndex) => {
                const isSelected = isRowSelected(row);

                return (
                  <tr
                    key={rowIndex}
                    className={`${getRowClasses(row, rowIndex)} ${isSelected ? 'bg-primary-50 dark:bg-primary-900' : ''}`}
                    onClick={(e) => {
                      // Wenn auf die Checkbox geklickt wurde, nicht die Zeile auswählen
                      if ((e.target as HTMLElement).tagName === 'INPUT') {
                        return;
                      }

                      // Wenn selectable, dann Zeile auswählen
                      if (selectable) {
                        handleRowSelection(row);
                      }

                      // Wenn onRowClick, dann Callback aufrufen
                      if (onRowClick) {
                        onRowClick(row, rowIndex);
                      }
                    }}
                    role="row"
                    tabIndex={onRowClick || selectable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if ((onRowClick || selectable) && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();

                        if (selectable) {
                          handleRowSelection(row);
                        }

                        if (onRowClick) {
                          onRowClick(row, rowIndex);
                        }
                      }
                    }}
                    aria-selected={isSelected}
                    aria-rowindex={rowIndex + 2} // +2 weil wir mit 1 beginnen und der Header die erste Zeile ist
                  >
                    {/* Checkbox für Zeilenauswahl */}
                    {selectable && (
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${compact ? 'px-3 py-2 text-sm' : ''}`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            checked={isSelected}
                            onChange={() => handleRowSelection(row)}
                            aria-label={`Zeile ${rowIndex + 1} auswählen`}
                            onClick={(e) => e.stopPropagation()} // Verhindere Bubbling
                          />
                        </div>
                      </td>
                    )}

                    {/* Zelleninhalte */}
                    {columns.map(
                      (column, index) =>
                        !column.hidden && (
                          <td
                            key={column.id}
                            className={getCellClasses(column)}
                            role="gridcell"
                            aria-colindex={index + 1}
                          >
                            {column.cell(row, rowIndex)}
                          </td>
                        )
                    )}
                  </tr>
                );
              })}
            </tbody>

            {showFooter && (
              <tfoot className={`bg-gray-50 dark:bg-gray-800 ${footerClassName}`}>
                <tr>
                  {columns.map(
                    (column, index) =>
                      !column.hidden && (
                        <td
                          key={column.id}
                          className={getCellClasses(column)}
                          role="gridcell"
                          aria-colindex={index + 1}
                        >
                          {/* Footer-Inhalt hier */}
                        </td>
                      )
                  )}
                </tr>
              </tfoot>
            )}
          </table>

          {paginated && (
            <div
              className={`bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 ${paginationClassName}`}
            >
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Vorherige Seite"
                  aria-disabled={currentPage === 1}
                >
                  Zurück
                </button>
                <button
                  onClick={() =>
                    handlePageChange(
                      Math.min(Math.ceil(sortedData.length / itemsPerPageState), currentPage + 1)
                    )
                  }
                  disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPageState)}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                    currentPage >= Math.ceil(sortedData.length / itemsPerPageState)
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Nächste Seite"
                  aria-disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPageState)}
                >
                  Weiter
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300" aria-live="polite">
                    Zeige{' '}
                    <span className="font-medium">
                      {sortedData.length > 0 ? (currentPage - 1) * itemsPerPageState + 1 : 0}
                    </span>{' '}
                    bis{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPageState, sortedData.length)}
                    </span>{' '}
                    von <span className="font-medium">{sortedData.length}</span> Einträgen
                  </p>
                </div>

                {/* Einträge pro Seite Auswahl */}
                {paginationOptions?.itemsPerPageOptions && (
                  <div className="flex items-center ml-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                      Einträge pro Seite:
                    </span>
                    <select
                      className="text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={itemsPerPageState}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      aria-label="Einträge pro Seite"
                    >
                      {paginationOptions.itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Seitenzahlen */}
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    {/* Zurück-Button */}
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                        currentPage === 1
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      aria-label="Vorherige Seite"
                      aria-disabled={currentPage === 1}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Seitenzahlen */}
                    {Array.from(
                      {
                        length: Math.min(
                          paginationOptions?.pageRangeDisplayed || 5,
                          Math.ceil(sortedData.length / itemsPerPageState)
                        ),
                      },
                      (_, i) => {
                        // Berechne die anzuzeigenden Seitenzahlen
                        const totalPages = Math.ceil(sortedData.length / itemsPerPageState);
                        const pageRangeDisplayed = paginationOptions?.pageRangeDisplayed || 5;

                        let startPage = Math.max(
                          1,
                          currentPage - Math.floor(pageRangeDisplayed / 2)
                        );
                        let endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

                        // Anpassen, wenn wir am Ende sind
                        if (endPage - startPage + 1 < pageRangeDisplayed) {
                          startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
                        }

                        const page = startPage + i;
                        if (page > endPage) return null;

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-primary-50 dark:bg-primary-900 border-primary-500 dark:border-primary-500 text-primary-600 dark:text-primary-300'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            aria-current={currentPage === page ? 'page' : undefined}
                            aria-label={`Seite ${page}`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}

                    {/* Weiter-Button */}
                    <button
                      onClick={() =>
                        handlePageChange(
                          Math.min(
                            Math.ceil(sortedData.length / itemsPerPageState),
                            currentPage + 1
                          )
                        )
                      }
                      disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPageState)}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                        currentPage >= Math.ceil(sortedData.length / itemsPerPageState)
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      aria-label="Nächste Seite"
                      aria-disabled={
                        currentPage >= Math.ceil(sortedData.length / itemsPerPageState)
                      }
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
