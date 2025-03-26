// packages/@smolitux/core/src/components/Breadcrumb/Breadcrumb.tsx
import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';

export interface BreadcrumbItemProps {
  /** Link-Text */
  children: React.ReactNode;
  /** Link-Ziel (wenn nicht angegeben, wird kein Link dargestellt) */
  href?: string;
  /** Icon vor dem Label */
  icon?: React.ReactNode;
  /** Zusätzliche Eigenschaften für das Link-Element */
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  /** Ist das Element aktiv/aktuell? */
  isCurrentPage?: boolean;
  /** Benutzerdefinierte Klasse */
  className?: string;
}

export interface BreadcrumbItemData {
  /** Link-Text */
  label: React.ReactNode;
  /** Link-Ziel (wenn nicht angegeben, wird kein Link dargestellt) */
  href?: string;
  /** Icon vor dem Label */
  icon?: React.ReactNode;
  /** Zusätzliche Eigenschaften für das Link-Element */
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  /** Ist das Element aktiv/aktuell? */
  active?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Array von Breadcrumb-Items (alternativ zu children) */
  items?: BreadcrumbItemData[];
  /** Kinder-Elemente (BreadcrumbItem-Komponenten) */
  children?: React.ReactNode;
  /** Benutzerdefiniertes Trennzeichen */
  separator?: React.ReactNode;
  /** Abstand zwischen den Elementen */
  spacing?: string;
  /** Maximal anzuzeigende Items (bei Überschreitung wird ein "..." angezeigt) */
  maxItems?: number;
  /** Anzahl der letzten Items, die immer angezeigt werden */
  itemsAfterCollapse?: number;
  /** Anzahl der ersten Items, die immer angezeigt werden */
  itemsBeforeCollapse?: number;
  /** Benutzerdefiniertes "..." Element */
  expandIcon?: React.ReactNode;
  /** Home-Element hinzufügen */
  showHomeIcon?: boolean;
  /** Home-Icon */
  homeIcon?: React.ReactNode;
  /** Home-Link */
  homeHref?: string;
  /** Benutzerdefinierte Klasse für ein Element */
  itemClassName?: string;
  /** Benutzerdefinierte Klasse für aktives Element */
  activeItemClassName?: string;
  /** Benutzerdefinierte Link-Komponente (z.B. von React Router) */
  LinkComponent?: React.ElementType;
}

/**
 * Breadcrumb-Komponente für die Navigation
 * 
 * @example
 * ```tsx
 * // Mit items-Array
 * <Breadcrumb 
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Produkte', href: '/products' },
 *     { label: 'Kategorie', href: '/products/category' },
 *     { label: 'Produkt', active: true }
 *   ]}
 * />
 * 
 * // Mit Komponenten
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/products">Produkte</BreadcrumbItem>
 *   <BreadcrumbItem href="/products/category">Kategorie</BreadcrumbItem>
 *   <BreadcrumbItem isCurrentPage>Produkt</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items = [],
  children,
  separator = '/',
  spacing,
  maxItems,
  itemsAfterCollapse = 1,
  itemsBeforeCollapse = 1,
  expandIcon = '...',
  showHomeIcon = false,
  homeIcon,
  homeHref = '/',
  itemClassName = '',
  activeItemClassName = '',
  LinkComponent,
  className = '',
  ...rest
}, ref) => {
  // Default Home-Icon
  const defaultHomeIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
  
  // Verarbeite children zu items, wenn vorhanden
  const childrenItems = children ? Children.toArray(children)
    .filter(child => isValidElement(child))
    .map((child) => {
      if (isValidElement(child)) {
        const { children: label, href, icon, isCurrentPage, ...rest } = child.props;
        return {
          label,
          href,
          icon,
          active: isCurrentPage,
          linkProps: rest
        };
      }
      return null;
    }).filter(Boolean) : [];

  // Verwende entweder die übergebenen items oder die aus children erstellten
  const itemsToUse = children ? childrenItems : items;
  
  // Wenn Home-Icon angezeigt werden soll und noch nicht in den Items enthalten ist
  const allItems = showHomeIcon 
    ? [{ label: 'Home', href: homeHref, icon: homeIcon || defaultHomeIcon }, ...itemsToUse]
    : itemsToUse;
  
  // Sollen Items wegen maxItems zusammengefasst werden?
  const needsCollapse = maxItems !== undefined && allItems.length > maxItems;
  
  // Anzuzeigende Items berechnen
  const displayedItems = needsCollapse
    ? [
      ...allItems.slice(0, itemsBeforeCollapse),
      // Collapse-Element (...)
      { label: expandIcon } as BreadcrumbItemData,
      ...allItems.slice(allItems.length - itemsAfterCollapse)
    ]
    : allItems;
  
  // Link-Komponente (HTML-a oder benutzerdefiniert)
  const Link = LinkComponent || 'a';
  
  return (
    <nav 
      ref={ref}
      aria-label="Breadcrumb"
      className={`flex ${className}`}
      {...rest}
    >
      <ol className={`inline-flex items-center ${spacing ? spacing : 'space-x-1 md:space-x-2'}`}>
        {displayedItems.map((item, index) => {
          // Letztes Element?
          const isLast = index === displayedItems.length - 1;
          // Collapse-Element (...)
          const isExpandIcon = needsCollapse && index === itemsBeforeCollapse;
          
          // Basis-Klassen für alle Items
          const baseClasses = [
            'inline-flex items-center',
            isLast || isExpandIcon ? '' : 'hover:text-gray-900 dark:hover:text-gray-100',
            (item as BreadcrumbItemData).active || isLast 
              ? `font-medium text-gray-800 dark:text-gray-100 ${activeItemClassName}` 
              : 'text-gray-500 dark:text-gray-400',
            (!isLast && !isExpandIcon) ? '' : '',
            itemClassName
          ].filter(Boolean).join(' ');
          
          // Bestimme, ob das Element das aktuelle ist
          const isCurrentPage = (item as BreadcrumbItemData).active || isLast;
          
          // Bestimme die Klasse für das li-Element
          const liClassName = [
            "inline-flex items-center",
            (item as BreadcrumbItemData).linkProps?.className || ""
          ].filter(Boolean).join(' ');
          
          return (
            <li 
              key={index} 
              className={liClassName}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {/* Trennzeichen (außer beim ersten Element) */}
              {index > 0 && (
                <span className="mx-2 text-gray-400 dark:text-gray-500">
                  {separator}
                </span>
              )}
              
              {/* Item-Inhalt */}
              {(item as BreadcrumbItemData).href && !isCurrentPage && !isExpandIcon ? (
                <Link
                  href={(item as BreadcrumbItemData).href || ''}
                  className={baseClasses}
                  {...(item as BreadcrumbItemData).linkProps}
                >
                  {item?.icon && <span className="mr-1">{item.icon}</span>}
                  {item?.label}
                </Link>
              ) : (
                <span className={baseClasses}>
                  {item?.icon && <span className="mr-1">{item.icon}</span>}
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
