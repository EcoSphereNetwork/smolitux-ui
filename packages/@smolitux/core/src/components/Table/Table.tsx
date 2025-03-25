import React, { useState, useEffect, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Filter, ArrowLeft, ArrowRight, RefreshCw, Download } from 'lucide-react';
import { useTheme } from '../../../theme/src/theme-provider';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T> {
  /** Eindeutige ID der Spalte */
  id: string;
  /** Angezeigter Header-Text */
  header: React.ReactNode;
  /** Funktion zur Extraktion des Zellwerts aus einer Zeile */
  accessor: (row: T) => any;
  /** Benutzerdefinierte Render-Funktion für die Zelle */
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  /** Zusätzliche CSS-Klassen für die Spalte */
  className?: string;
  /** CSS-Klassen für den Header der Spalte */
  headerClassName?: string;
  /** Falls true, ist die Spalte sortierbar */
  sortable?: boolean;
  /** Falls true, ist die Spalte filterbar */
  filterable?: boolean;
  /** Breite der Spalte */
  width?: string;
  /** Minimale Breite der Spalte */
  minWidth?: string;
  /** Maximale Breite der Spalte */
  maxWidth?: string;
  /** Falls true, wird die Spalte ausgeblendet */
  hide?: boolean;
}

export interface TableProps<T> {
  /** Tabellendaten als Array von Objekten */
  data: T[];
  /** Spaltenkonfiguration */
  columns: TableColumn<T>[];
  /** Funktion zur Generierung eines eindeutigen Schlüssels für jede Zeile */
  rowKey?: (row: T) => string;
  /** Callback für Klick auf eine Zeile */
  onRowClick?: (row: T) => void;
  /** Zeigt einen Ladeindikator an */
  loading?: boolean;
  /** Nachricht, wenn keine Daten vorhanden sind */
  emptyMessage?: React.ReactNode;
  /** Zusätzliche CSS-Klassen für die Tabelle */
  className?: string;
  /** CSS-Klassen für den Tabellenkopf */
  headerClassName?: string;
  /** CSS-Klassen für die Zeilen */
  rowClassName?: string | ((row: T, index: number) => string);
  /** Ob die Tabelle Zebrastreifen haben soll */
  striped?: boolean;
  /** Ob die Tabelle Rahmen haben soll */
  bordered?: boolean;
  /** Ob die Tabelle responsiv sein soll */
  responsive?: boolean;
  /** Ob die Tabelle kompakt sein soll */
  compact?: boolean;
  /** Ob die Zeilen bei Hover hervorgehoben werden sollen */
  hoverable?: boolean;
  /** Initiale Sortierung */
  initialSortBy?: { id: string; direction: SortDirection };
  /** Ob die Tabelle Paginierung anzeigen soll */
  showPagination?: boolean;
  /** Anzahl der Elemente pro Seite */
  itemsPerPage?: number;
  /** Ob eine Suchfunktion angezeigt werden soll */
  showSearch?: boolean;
  /** Ob die Tabelle selektierbare Zeilen haben soll */
  selectable?: boolean;
  /** Callback für Refresh-Funktion */
  onRefresh?: () => Promise<void>;
  /** Callback für Export-Funktion */
  onExport?: () => void;
  /** Aktionen für die Tabelle */
  actions?: React.ReactNode;
  /** Titel der Tabelle */
  title?: string;
  /** Untertitel der Tabelle */
  subtitle?: string;
}

/**
 * Tabellen-Komponente für tabellarische Daten
 */
function Table<T>({
  data,
  columns,
  rowKey = (row: T) => JSON.stringify(row),
  onRowClick,
  loading = false,
  emptyMessage = 'Keine Daten verfügbar',
  className = '',
  headerClassName = '',
  rowClassName = '',
  striped = false,
  bordered = false,
  responsive = true,
  compact = false,
  hoverable = true,
  initialSortBy,
  showPagination = true,
  itemsPerPage = 10,
  showSearch = true,
  selectable = false,
  onRefresh,
  onExport,
  actions,
  title,
  subtitle
}: TableProps<T>) {
  const { themeMode } = useTheme();
  const [sortBy, setSortBy] = useState<{ id: string; direction: SortDirection }>(
    initialSortBy || { id: '', direction: null }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Reset zu erster Seite, wenn Suchbegriff sich ändert
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Markiere alle Zeilen als ausgewählt, wenn selectAll aktiviert ist
  useEffect(() => {
    if (selectAll) {
      setSelectedRows(filteredData);
    } else if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    }
  }, [selectAll]);

  // Suche und Filterung der Daten
  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Suche anwenden
      if (searchTerm) {
        const searchString = searchTerm.toLowerCase();
        const searchMatch = columns.some(column => {
          if (column.hide) return false;
          
          const value = column.accessor(row);
          return value !== null && value !== undefined &&
            String(value).toLowerCase().includes(searchString);
        });
        
        if (!searchMatch) return false;
      }
      
      // Filter anwenden
      for (const [columnId, filterValue] of Object.entries(filters)) {
        if (!filterValue) continue;
        
        const column = columns.find(col => col.id === columnId);
        if (!column) continue;
        
        const value = column.accessor(row);
        if (value === null || value === undefined) return false;
        
        const stringValue = String(value).toLowerCase();
        if (!stringValue.includes(filterValue.toLowerCase())) return false;
      }
      
      return true;
    });
  }, [data, columns, searchTerm, filters]);

  // Sortierung der Daten
  const sortedData = useMemo(() => {
    if (!sortBy.id || sortBy.direction === null) return filteredData;
    
    const column = columns.find(col => col.id === sortBy.id);
    if (!column) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);
      
      if (aValue === bValue) return 0;
      
      // Behandlung von null/undefined Werten
      if (aValue === null || aValue === undefined) return sortBy.direction === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortBy.direction === 'asc' ? 1 : -1;
      
      // Sortierung von Zahlen
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortBy.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Sortierung von Daten
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortBy.direction === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }
      
      // Sortierung von Strings
      const aString = String(aValue);
      const bString = String(bValue);
      
      return sortBy.direction === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }, [filteredData, sortBy, columns]);

  // Paginierung der sortierten Daten
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  // Berechnung der Gesamtseitenzahl
  const totalPages = useMemo(() => {
    if (!showPagination) return 1;
    return Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  }, [sortedData, itemsPerPage, showPagination]);

  // Sortierung verwalten
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column || column.sortable === false) return;
    
    if (sortBy.id === columnId) {
      // Zyklisch: asc -> desc -> null
      let newDirection: SortDirection = null;
      if (sortBy.direction === null) newDirection = 'asc';
      else if (sortBy.direction === 'asc') newDirection = 'desc';
      else newDirection = null;
      
      setSortBy({ id: columnId, direction: newDirection });
    } else {
      setSortBy({ id: columnId, direction: 'asc' });
    }
  };

  // Aktualisierung verwalten
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Seitenwechsel
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Zeilenauswahl
  const isRowSelected = (row: T) => {
    return selectedRows.some(selectedRow => 
      rowKey(selectedRow) === rowKey(row)
    );
  };

  const toggleRowSelection = (row: T) => {
    if (isRowSelected(row)) {
      setSelectedRows(selectedRows.filter(selectedRow => 
        rowKey(selectedRow) !== rowKey(row)
      ));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Filter-Klick behandeln
  const handleFilterClick = (columnId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const column = columns.find(col => col.id === columnId);
    if (!column || column.filterable === false) return;
    
    // Filter-Popup umschalten
    if (activeFilter === columnId) {
      setActiveFilter(null);
    } else {
      setActiveFilter(columnId);
      
      // Position des Filter-Popups setzen
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };

  // Filter anwenden
  const handleFilterApply = (columnId: string, value: string) => {
    if (value) {
      setFilters(prev => ({ ...prev, [columnId]: value }));
    } else {
      setFilters(prev => {
        const newFilters = { ...prev };
        delete newFilters[columnId];
        return newFilters;
      });
    }
    setActiveFilter(null);
  };

  // Alle Filter löschen
  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // Zellenwert formatieren
  const formatCellValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 dark:text-gray-600">—</span>;
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Ja' : 'Nein';
    }
    
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    
    return String(value);
  };

  // Seitenzahlen für Paginierung generieren
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Alle Seiten zeigen, wenn es wenige sind
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Eine Teilmenge von Seiten mit Ellipsen zeigen
      if (currentPage <= 3) {
        // Nahe dem Anfang
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Nahe dem Ende
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In der Mitte
        pages.push(1);
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
      {/* Tabellen-Header mit Suche und Aktionen */}
      {(title || subtitle || showSearch || onRefresh || onExport || actions) && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Titel */}
            {(title || subtitle) && (
              <div>
                {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
                {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
              </div>
            )}
            
            {/* Suche und Aktionen */}
            <div className="flex flex-wrap items-center gap-2">
              {showSearch && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Suchen..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                </div>
              )}
              
              {/* Filter-Indikatoren */}
              {Object.keys(filters).length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Filter:</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(filters).map(([columnId, value]) => {
                      const column = columns.find(col => col.id === columnId);
                      return (
                        <div 
                          key={columnId}
                          className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded"
                        >
                          <span>{column?.header || columnId}: {value}</span>
                          <button
                            className="ml-1 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100"
                            onClick={() => handleFilterApply(columnId, '')}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                    <button
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      onClick={handleClearFilters}
                    >
                      Alle löschen
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex ml-auto gap-2">
                {/* Aktualisieren-Button */}
                {onRefresh && (
                  <button
                    className="p-2 rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                  </button>
                )}
                
                {/* Export-Button */}
                {onExport && (
                  <button
                    className="p-2 rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onExport}
                  >
                    <Download size={18} />
                  </button>
                )}
                
                {/* Benutzerdefinierte Aktionen */}
                {actions}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabelle */}
      <div className={responsive ? 'overflow-x-auto' : ''}>
        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${bordered ? 'border-collapse border border-gray-200 dark:border-gray-700' : ''}`}>
          <thead className={`bg-gray-50 dark:bg-gray-800 ${headerClassName}`}>
            <tr>
              {/* Auswahlcheckbox */}
              {selectable && (
                <th className="px-3 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
              )}
              
              {/* Spaltenüberschriften */}
              {columns.filter(col => !col.hide).map(column => (
                <th 
                  key={column.id}
                  className={`${compact ? 'px-2 py-2' : 'px-3 py-3'} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.headerClassName || ''}`}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <button
                      className={`flex items-center font-medium ${column.sortable === false ? 'cursor-default' : 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300'}`}
                      onClick={() => handleSort(column.id)}
                      disabled={column.sortable === false}
                    >
                      <span>{column.header}</span>
                      {column.sortable !== false && (
                        <span className="ml-1">
                          {sortBy.id === column.id ? (
                            sortBy.direction === 'asc' ? (
                              <ChevronUp size={14} />
                            ) : sortBy.direction === 'desc' ? (
                              <ChevronDown size={14} />
                            ) : null
                          ) : null}
                        </span>
                      )}
                    </button>
                    
                    {/* Filter-Button */}
                    {column.filterable !== false && (
                      <button
                        className={`p-1 rounded ${
                          activeFilter === column.id 
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                            : filters[column.id] 
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                              : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                        onClick={(e) => handleFilterClick(column.id, e)}
                      >
                        <Filter size={14} />
                      </button>
                    )}
                  </div>
                  
                  {/* Filter-Popup */}
                  {activeFilter === column.id && (
                    <div 
                      className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 p-3 mt-1"
                      style={{
                        top: filterPosition.top,
                        left: filterPosition.left
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                        Filtern nach {column.header}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          className="form-input rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white text-sm mr-2"
                          placeholder="Filterwert..."
                          defaultValue={filters[column.id] || ''}
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleFilterApply(column.id, e.currentTarget.value);
                            } else if (e.key === 'Escape') {
                              setActiveFilter(null);
                            }
                          }}
                        />
                        <button
                          className="px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-sm"
                          onClick={e => {
                            const input = (e.currentTarget.previousSibling as HTMLInputElement);
                            handleFilterApply(column.id, input.value);
                          }}
                        >
                          Anwenden
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.filter(col => !col.hide).length + (selectable ? 1 : 0)}
                  className={`${compact ? 'px-2 py-2' : 'px-3 py-4'} text-center text-gray-500 dark:text-gray-400`}
                >
                  <div className="flex justify-center items-center">
                    <RefreshCw size={20} className="animate-spin mr-2" />
                    <span>Laden...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.filter(col => !col.hide).length + (selectable ? 1 : 0)}
                  className={`${compact ? 'px-2 py-2' : 'px-3 py-4'} text-center text-gray-500 dark:text-gray-400`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={rowKey(row)}
                  className={`
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                    ${hoverable && !onRowClick ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                    ${isRowSelected(row) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                    ${striped && index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                    ${typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {/* Auswahlcheckbox */}
                  {selectable && (
                    <td className={`${compact ? 'px-2 py-2' : 'px-3 py-4'}`} onClick={e => e.stopPropagation()}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                          checked={isRowSelected(row)}
                          onChange={() => toggleRowSelection(row)}
                        />
                      </div>
                    </td>
                  )}
                  
                  {/* Zellen */}
                  {columns.filter(col => !col.hide).map(column => (
                    <td
                      key={column.id}
                      className={`${compact ? 'px-2 py-2' : 'px-3 py-4'} whitespace-nowrap text-sm ${column.className || ''}`}
                    >
                      {column.cell
                        ? column.cell(column.accessor(row), row, index)
                        : formatCellValue(column.accessor(row))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginierung */}
      {showPagination && totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Zurück
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Weiter
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Zeige <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> bis{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, sortedData.length)}
                </span>
