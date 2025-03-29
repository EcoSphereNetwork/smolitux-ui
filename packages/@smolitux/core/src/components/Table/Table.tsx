import React, { useState, useEffect, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = any> {
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

export interface TableProps<T = any> {
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
}

const Table = <T extends Record<string, any>>({
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
  emptyState = <div className="p-4 text-center text-gray-500 dark:text-gray-400" role="status" aria-live="polite">Keine Daten vorhanden</div>,
  loading = false,
  loadingState = <div className="p-4 text-center text-gray-500 dark:text-gray-400" role="status" aria-live="polite">Laden...</div>,
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
}: TableProps<T>) => {
  // Zustand für Sortierung
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSort?.id || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction || null);
  
  // Zustand für Paginierung
  const [currentPage, setCurrentPage] = useState(controlledCurrentPage || 1);
  
  // Effekt für kontrollierte Paginierung
  useEffect(() => {
    if (controlledCurrentPage !== undefined) {
      setCurrentPage(controlledCurrentPage);
    }
  }, [controlledCurrentPage]);
  
  // Sortierte Daten
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;
    
    const column = columns.find(col => col.id === sortColumn);
    if (!column || !column.sortable) return data;
    
    return [...data].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b, sortDirection);
      }
      
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue === bValue) return 0;
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, columns, sortColumn, sortDirection]);
  
  // Paginierte Daten
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, paginated, currentPage, itemsPerPage]);
  
  // Funktion zum Ändern der Sortierung
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
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
  
  // Funktion zum Rendern des Sortierungssymbols
  const renderSortIcon = (columnId: string) => {
    if (sortColumn !== columnId) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
    className
  ].filter(Boolean).join(' ');
  
  // CSS-Klassen für den Container
  const wrapperClasses = [
    responsive ? 'overflow-x-auto' : '',
    shadow && !bordered ? 'shadow-md' : '',
    rounded && !bordered ? 'rounded-lg' : '',
    containerClassName
  ].filter(Boolean).join(' ');
  
  // CSS-Klassen für die Zeilen
  const getRowClasses = (row: T, index: number) => {
    const baseClasses = [
      hover ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : '',
      striped && index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800' : '',
      onRowClick ? 'cursor-pointer' : '',
      typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName
    ].filter(Boolean).join(' ');
    
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
      cellClassName
    ].filter(Boolean).join(' ');
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
      headerClassName
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div className={wrapperClasses}>
      {loading ? (
        loadingState
      ) : data.length === 0 ? (
        emptyState
      ) : (
        <div>
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
          >
            {caption && captionPosition === 'bottom' && (
              <caption className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium">
                {caption}
              </caption>
            )}
            
            {showHeader && (
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr role="row">
                  {columns.map((column) => (
                    !column.hidden && (
                      <th
                        key={column.id}
                        scope="col"
                        className={getHeaderClasses(column)}
                        style={{ width: column.width }}
                        onClick={() => column.sortable && sortable && handleSort(column.id)}
                        role="columnheader"
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
                          if (column.sortable && sortable && (e.key === 'Enter' || e.key === ' ')) {
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
                  ))}
                </tr>
              </thead>
            )}
            
            <tbody className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ${bodyClassName}`}>
              {paginatedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className={getRowClasses(row, rowIndex)}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                  role="row"
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onRowClick(row, rowIndex);
                    }
                  }}
                  aria-selected={false}
                >
                  {columns.map((column) => (
                    !column.hidden && (
                      <td
                        key={column.id}
                        className={getCellClasses(column)}
                        role="gridcell"
                      >
                        {column.cell(row, rowIndex)}
                      </td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
            
            {showFooter && (
              <tfoot className={`bg-gray-50 dark:bg-gray-800 ${footerClassName}`}>
                <tr>
                  {columns.map((column) => (
                    !column.hidden && (
                      <td
                        key={column.id}
                        className={getCellClasses(column)}
                        role="gridcell"
                      >
                        {/* Footer-Inhalt hier */}
                      </td>
                    )
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
          
          {paginated && (
            <div className={`bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 ${paginationClassName}`}>
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
                  onClick={() => handlePageChange(Math.min(Math.ceil(sortedData.length / itemsPerPage), currentPage + 1))}
                  disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPage)}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                    currentPage >= Math.ceil(sortedData.length / itemsPerPage)
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Nächste Seite"
                  aria-disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPage)}
                >
                  Weiter
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300" aria-live="polite">
                    Zeige <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> bis{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, sortedData.length)}
                    </span> von <span className="font-medium">{sortedData.length}</span> Einträgen
                  </p>
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