// packages/@smolitux/core/src/components/List/List.tsx
import React, { forwardRef } from 'react';
import './List.css';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Variante der Liste */
  variant?: 'default' | 'ordered' | 'unordered' | 'description' | 'custom';
  /** Größe der Liste */
  size?: 'sm' | 'md' | 'lg';
  /** Dichte der Liste */
  density?: 'compact' | 'default' | 'comfortable';
  /** Ausrichtung der Listenelemente */
  align?: 'start' | 'center' | 'end';
  /** Trennlinien zwischen Listenelementen anzeigen */
  dividers?: boolean;
  /** Horizontale Liste */
  horizontal?: boolean;
  /** Benutzerdefiniertes Icon für Listenelemente */
  icon?: React.ReactNode;
  /** Benutzerdefiniertes Marker-Symbol für ungeordnete Listen */
  marker?: 'disc' | 'circle' | 'square' | 'none' | string;
  /** Einrückung der Liste */
  indent?: boolean;
  /** Listenelemente können ausgewählt werden */
  selectable?: boolean;
  /** Ausgewähltes Listenelement (kontrollierter Modus) */
  selectedItem?: string | number | null;
  /** Callback bei Auswahl eines Listenelements */
  onSelectItem?: (id: string | number) => void;
}

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Eindeutige ID des Listenelements */
  id?: string | number;
  /** Primärer Text */
  primary?: React.ReactNode;
  /** Sekundärer Text */
  secondary?: React.ReactNode;
  /** Icon links vom Text */
  icon?: React.ReactNode;
  /** Element rechts vom Text */
  action?: React.ReactNode;
  /** Ist das Element ausgewählt? */
  selected?: boolean;
  /** Ist das Element deaktiviert? */
  disabled?: boolean;
  /** Callback bei Klick auf das Listenelement */
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primärer Text */
  primary: React.ReactNode;
  /** Sekundärer Text */
  secondary?: React.ReactNode;
}

export interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon-Element */
  children: React.ReactNode;
}

export interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aktions-Element */
  children: React.ReactNode;
}

export interface ListContextType {
  variant: ListProps['variant'];
  size: ListProps['size'];
  density: ListProps['density'];
  align: ListProps['align'];
  dividers: ListProps['dividers'];
  horizontal: ListProps['horizontal'];
  icon: ListProps['icon'];
  marker: ListProps['marker'];
  selectable: ListProps['selectable'];
  selectedItem: ListProps['selectedItem'];
  onSelectItem: ListProps['onSelectItem'];
}

export const ListContext = React.createContext<ListContextType>({
  variant: 'default',
  size: 'md',
  density: 'default',
  align: 'start',
  dividers: false,
  horizontal: false,
  icon: undefined,
  marker: undefined,
  selectable: false,
  selectedItem: null,
  onSelectItem: undefined,
});

/**
 * List-Komponente für die Anzeige von Daten in Listenform
 * 
 * @example
 * ```tsx
 * <List>
 *   <ListItem primary="Item 1" />
 *   <ListItem primary="Item 2" />
 * </List>
 * ```
 */
export const List = forwardRef<HTMLUListElement, ListProps>(({
  variant = 'default',
  size = 'md',
  density = 'default',
  align = 'start',
  dividers = false,
  horizontal = false,
  icon,
  marker,
  indent = true,
  selectable = false,
  selectedItem = null,
  onSelectItem,
  className = '',
  children,
  ...rest
}, ref) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: '',
    ordered: 'smolitux-list--ordered',
    unordered: 'smolitux-list--unordered',
    description: 'smolitux-list--description',
    custom: 'smolitux-list--custom'
  };

  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'smolitux-list--sm',
    md: 'smolitux-list--md',
    lg: 'smolitux-list--lg'
  };

  // Dichte-spezifische Klassen
  const densityClasses = {
    compact: 'smolitux-list--compact',
    default: '',
    comfortable: 'smolitux-list--comfortable'
  };

  // Ausrichtungs-spezifische Klassen
  const alignClasses = {
    start: 'smolitux-list--align-start',
    center: 'smolitux-list--align-center',
    end: 'smolitux-list--align-end'
  };

  // Benutzerdefiniertes Marker-Symbol
  const markerStyle = marker && variant === 'unordered' ? {
    '--list-marker': typeof marker === 'string' && ['disc', 'circle', 'square', 'none'].includes(marker)
      ? marker
      : `"${marker}"`
  } as React.CSSProperties : undefined;

  // Zusammengesetzte Klassen
  const classes = [
    'smolitux-list',
    variantClasses[variant],
    sizeClasses[size],
    densityClasses[density],
    alignClasses[align],
    dividers && 'smolitux-list--dividers',
    horizontal && 'smolitux-list--horizontal',
    !indent && 'smolitux-list--no-indent',
    selectable && 'smolitux-list--selectable',
    className
  ].filter(Boolean).join(' ');

  // Element-Typ basierend auf der Variante
  const Component = variant === 'ordered' ? 'ol' : 'ul';

  return (
    <ListContext.Provider
      value={{
        variant,
        size,
        density,
        align,
        dividers,
        horizontal,
        icon,
        marker,
        selectable,
        selectedItem,
        onSelectItem
      }}
    >
      <Component
        ref={ref}
        className={classes}
        style={markerStyle}
        {...rest}
      >
        {children}
      </Component>
    </ListContext.Provider>
  );
});

/**
 * ListItem-Komponente für einzelne Listeneinträge
 * 
 * @example
 * ```tsx
 * <ListItem primary="Item 1" secondary="Beschreibung" />
 * ```
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
  id,
  primary,
  secondary,
  icon: itemIcon,
  action,
  selected,
  disabled = false,
  onClick,
  className = '',
  children,
  ...rest
}, ref) => {
  const {
    variant,
    dividers,
    horizontal,
    icon: listIcon,
    selectable,
    selectedItem,
    onSelectItem
  } = React.useContext(ListContext);

  // Behandle Klick-Events
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;
    
    if (selectable && id !== undefined && onSelectItem) {
      onSelectItem(id);
    }
    
    if (onClick) {
      onClick(event);
    }
  };

  // Bestimme, ob das Element ausgewählt ist
  const isSelected = selected !== undefined ? selected : (selectable && id !== undefined && id === selectedItem);

  // Zusammengesetzte Klassen
  const classes = [
    'smolitux-list-item',
    dividers && 'smolitux-list-item--divider',
    horizontal && 'smolitux-list-item--horizontal',
    isSelected && 'smolitux-list-item--selected',
    disabled && 'smolitux-list-item--disabled',
    (onClick || selectable) && !disabled && 'smolitux-list-item--clickable',
    className
  ].filter(Boolean).join(' ');

  // Verwende das Icon vom ListItem oder von der List
  const displayIcon = itemIcon || listIcon;

  // Render-Logik für verschiedene Varianten
  const renderContent = () => {
    // Wenn children vorhanden sind, verwende diese
    if (children) {
      return children;
    }

    // Für description-Listen
    if (variant === 'description') {
      return (
        <>
          {primary && <dt className="smolitux-list-item-term">{primary}</dt>}
          {secondary && <dd className="smolitux-list-item-description">{secondary}</dd>}
        </>
      );
    }

    // Standard-Darstellung
    return (
      <>
        {displayIcon && (
          <div className="smolitux-list-item-icon">
            {displayIcon}
          </div>
        )}
        <div className="smolitux-list-item-content">
          {primary && <div className="smolitux-list-item-primary">{primary}</div>}
          {secondary && <div className="smolitux-list-item-secondary">{secondary}</div>}
        </div>
        {action && (
          <div className="smolitux-list-item-action">
            {action}
          </div>
        )}
      </>
    );
  };

  // Für description-Listen
  if (variant === 'description') {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...rest as any}>
        {renderContent()}
      </div>
    );
  }

  return (
    <li
      ref={ref}
      className={classes}
      onClick={handleClick}
      aria-disabled={disabled}
      aria-selected={isSelected}
      {...rest}
    >
      {renderContent()}
    </li>
  );
});

/**
 * ListItemText-Komponente für strukturierten Text in Listenelementen
 * 
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemText primary="Titel" secondary="Beschreibung" />
 * </ListItem>
 * ```
 */
export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(({
  primary,
  secondary,
  className = '',
  ...rest
}, ref) => {
  const classes = ['smolitux-list-item-content', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {primary && <div className="smolitux-list-item-primary">{primary}</div>}
      {secondary && <div className="smolitux-list-item-secondary">{secondary}</div>}
    </div>
  );
});

/**
 * ListItemIcon-Komponente für Icons in Listenelementen
 * 
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemIcon><UserIcon /></ListItemIcon>
 *   <ListItemText primary="Benutzer" />
 * </ListItem>
 * ```
 */
export const ListItemIcon = forwardRef<HTMLDivElement, ListItemIconProps>(({
  children,
  className = '',
  ...rest
}, ref) => {
  const classes = ['smolitux-list-item-icon', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

/**
 * ListItemAction-Komponente für Aktionen in Listenelementen
 * 
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemText primary="Eintrag" />
 *   <ListItemAction><Button>Bearbeiten</Button></ListItemAction>
 * </ListItem>
 * ```
 */
export const ListItemAction = forwardRef<HTMLDivElement, ListItemActionProps>(({
  children,
  className = '',
  ...rest
}, ref) => {
  const classes = ['smolitux-list-item-action', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

List.displayName = 'List';
ListItem.displayName = 'ListItem';
ListItemText.displayName = 'ListItemText';
ListItemIcon.displayName = 'ListItemIcon';
ListItemAction.displayName = 'ListItemAction';

export default List;