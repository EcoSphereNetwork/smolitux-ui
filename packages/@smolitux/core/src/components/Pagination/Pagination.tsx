// packages/@smolitux/core/src/components/Pagination/Pagination.tsx
import React, { forwardRef, useMemo } from 'react';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Anzahl der Seiten insgesamt */
  pageCount: number;
  /** Aktuelle Seite (1-basiert) */
  currentPage: number;
  /** Callback bei Seitenwechsel */
  onChange: (page: number) => void;
  /** Anzahl der angezeigten Seiten */
  siblingCount?: number;
  /** Zeigt erste/letzte Seite */
  showFirstLast?: boolean;
  /** Zeigt Buttons für vorherige/nächste Seite */
  showPrevNext?: boolean;
  /** Größe der Pagination */
  size?: 'sm' | 'md' | 'lg';
  /** Variante der Pagination */
  variant?: 'outlined' | 'filled' | 'simple';
  /** Deaktiviert die Pagination */
  disabled?: boolean;
  /** Zeigt die Gesamtzahl der Seiten an */
  showPageCount?: boolean;
  /** Benutzerdefinierte Texte */
  labels?: {
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
    page?: string;
  };
  /** Benutzerdefinierte Icons */
  icons?: {
    previous?: React.ReactNode;
    next?: React.ReactNode;
    first?: React.ReactNode;
    last?: React.ReactNode;
  };
}

/**
 * Pagination-Komponente für Seitennavigation
 * 
 * @example
 * ```tsx
 * <Pagination
 *   pageCount={10}
 *   currentPage={1}
 *   onChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  pageCount,
  currentPage,
  onChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  size = 'md',
  variant = 'outlined',
  disabled = false,
  showPageCount = false,
  labels = {
    previous: 'Zurück',
    next: 'Weiter',
    first: 'Erste',
    last: 'Letzte',
    page: 'Seite'
  },
  icons,
  className = '',
  ...rest
}, ref) => {
  // Standardicons für Pagination
  const defaultIcons = {
    previous: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    ),
    next: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    ),
    first: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
    ),
    last: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    )
  };
  
  // Kombiniere Standard- und benutzerdefinierte Icons
  const mergedIcons = { ...defaultIcons, ...icons };
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'h-8 min-w-8 text-xs',
    md: 'h-10 min-w-10 text-sm',
    lg: 'h-12 min-w-12 text-base'
  };
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    outlined: {
      default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
      active: 'border border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
      disabled: 'border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
    },
    filled: {
      default: 'border border-transparent bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600',
      active: 'border border-transparent bg-primary-500 dark:bg-primary-600 text-white',
      disabled: 'border border-transparent bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
    },
    simple: {
      default: 'border-0 bg-transparent hover:text-primary-600 dark:hover:text-primary-400',
      active: 'border-0 bg-transparent text-primary-600 dark:text-primary-400 font-medium',
      disabled: 'border-0 bg-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'
    }
  };
  
  // Berechnung der angezeigten Seiten
  const paginationItems = useMemo(() => {
    const DOTS = 'dots';
    const totalPageNumbers = siblingCount * 2 + 3; // Anzahl der anzuzeigenden Seiten + erste & letzte
    
    // Wenn weniger Seiten als die anzuzeigenden Seiten vorhanden sind
    if (totalPageNumbers >= pageCount) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    
    // Berechnung des ersten und letzten Geschwister-Index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);
    
    // Ob Ellipsen angezeigt werden sollen
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 1;
    
    // Sonderfälle für erste und letzte Seite
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
      return [...leftRange, DOTS, pageCount];
    }
    
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightStart = pageCount - (2 + siblingCount * 2);
      const rightRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => rightStart + i + 1);
      return [1, DOTS, ...rightRange];
    }
    
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 }, 
        (_, i) => leftSiblingIndex + i
      );
      return [1, DOTS, ...middleRange, DOTS, pageCount];
    }
    
    return [];
  }, [currentPage, pageCount, siblingCount]);
  
  // Seitenwechsel-Handler
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > pageCount || disabled) {
      return;
    }
    
    onChange(page);
  };
  
  // Basis-Klassen für Pagination-Items
  const getItemClasses = (isActive: boolean) => [
    'flex items-center justify-center rounded-md',
    sizeClasses[size],
    'transition-colors duration-200 ease-in-out',
    isActive
      ? variantClasses[variant].active
      : disabled
        ? variantClasses[variant].disabled
        : variantClasses[variant].default
  ].join(' ');
  
  return (
    <div
      ref={ref}
      className={`flex items-center space-x-1 ${className}`}
      {...rest}
    >
      {/* Erste Seite */}
      {showFirstLast && (
        <button
          type="button"
          className={getItemClasses(false)}
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          aria-label={labels.first}
          title={labels.first}
        >
          {variant === 'simple' ? labels.first : mergedIcons.first}
        </button>
      )}
      
      {/* Vorherige Seite */}
      {showPrevNext && (
        <button
          type="button"
          className={getItemClasses(false)}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label={labels.previous}
          title={labels.previous}
        >
          {variant === 'simple' ? labels.previous : mergedIcons.previous}
        </button>
      )}
      
      {/* Seiten */}
      {paginationItems.map((item, index) => {
        if (item === 'dots') {
          return (
            <span
              key={`dots-${index}`}
              className={`flex items-center justify-center ${sizeClasses[size]} text-gray-500 dark:text-gray-400`}
            >
              &hellip;
            </span>
          );
        }
        
        const pageNumber = item as number;
        return (
          <button
            key={pageNumber}
            type="button"
            className={getItemClasses(pageNumber === currentPage)}
            onClick={() => handlePageChange(pageNumber)}
            disabled={disabled}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}
      
      {/* Nächste Seite */}
      {showPrevNext && (
        <button
          type="button"
          className={getItemClasses(false)}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === pageCount}
          aria-label={labels.next}
          title={labels.next}
        >
          {variant === 'simple' ? labels.next : mergedIcons.next}
        </button>
      )}
      
      {/* Letzte Seite */}
      {showFirstLast && (
        <button
          type="button"
          className={getItemClasses(false)}
          onClick={() => handlePageChange(pageCount)}
          disabled={disabled || currentPage === pageCount}
          aria-label={labels.last}
          title={labels.last}
        >
          {variant === 'simple' ? labels.last : mergedIcons.last}
        </button>
      )}
      
      {/* Anzeige der Gesamtseitenzahl */}
      {showPageCount && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {labels.page} {currentPage} / {pageCount}
        </span>
      )}
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
