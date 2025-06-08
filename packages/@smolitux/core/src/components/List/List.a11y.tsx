// packages/@smolitux/core/src/components/List/List.a11y.tsx
import React, {
  forwardRef,
  useId,
  useCallback,
  useState,
  useRef,
  createContext,
  useContext,
} from 'react';
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
  /** ARIA-Label für die Liste */
  ariaLabel?: string;
  /** Beschreibung für die Liste (für Screenreader) */
  description?: string;
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
  /** Beschreibung für das Listenelement (für Screenreader) */
  description?: string;
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
  /** ARIA-Label für das Icon */
  ariaLabel?: string;
}

export interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aktions-Element */
  children: React.ReactNode;
  /** ARIA-Label für die Aktion */
  ariaLabel?: string;
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
  listId: string;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  registerItem: (id: string | number | undefined) => number;
}

export const ListContext = createContext<ListContextType>({
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
  listId: '',
  activeIndex: null,
  setActiveIndex: () => {},
  registerItem: () => 0,
});

/**
 * Barrierefreie List-Komponente für die Anzeige von Daten in Listenform
 *
 * @example
 * ```tsx
 * <ListA11y ariaLabel="Meine Liste">
 *   <ListItemA11y primary="Item 1" />
 *   <ListItemA11y primary="Item 2" />
 * </ListA11y>
 * ```
 */
export const ListA11y = forwardRef<HTMLUListElement, ListProps>(
  (
    {
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
      ariaLabel,
      description,
      ...rest
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const listId = rest.id || `list-${uniqueId}`;
    const descriptionId = description ? `description-${listId}` : undefined;

    // State für Tastaturnavigation
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const itemsMap = useRef(new Map<string | number | undefined, number>());
    const itemsCounter = useRef(0);
    const listRef = useRef<HTMLUListElement | null>(null);

    // Registrieren eines neuen Items
    const registerItem = useCallback((id: string | number | undefined) => {
      const itemKey = id !== undefined ? id.toString() : `item-${itemsCounter.current}`;
      if (!itemsMap.current.has(itemKey)) {
        itemsMap.current.set(itemKey, itemsCounter.current);
        return itemsCounter.current++;
      }
      return itemsMap.current.get(itemKey)!;
    }, []);

    // Varianten-spezifische Klassen
    const variantClasses = {
      default: '',
      ordered: 'smolitux-list--ordered',
      unordered: 'smolitux-list--unordered',
      description: 'smolitux-list--description',
      custom: 'smolitux-list--custom',
    };

    // Größen-spezifische Klassen
    const sizeClasses = {
      sm: 'smolitux-list--sm',
      md: 'smolitux-list--md',
      lg: 'smolitux-list--lg',
    };

    // Dichte-spezifische Klassen
    const densityClasses = {
      compact: 'smolitux-list--compact',
      default: '',
      comfortable: 'smolitux-list--comfortable',
    };

    // Ausrichtungs-spezifische Klassen
    const alignClasses = {
      start: 'smolitux-list--align-start',
      center: 'smolitux-list--align-center',
      end: 'smolitux-list--align-end',
    };

    // Benutzerdefiniertes Marker-Symbol
    const markerStyle =
      marker && variant === 'unordered'
        ? ({
            '--list-marker':
              typeof marker === 'string' && ['disc', 'circle', 'square', 'none'].includes(marker)
                ? marker
                : `"${marker}"`,
          } as React.CSSProperties)
        : undefined;

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
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Element-Typ basierend auf der Variante
    const Component = variant === 'ordered' ? 'ol' : 'ul';

    // Tastaturnavigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const itemCount = itemsCounter.current;
        if (itemCount === 0) return;

        let newIndex = activeIndex;
        const isHorizontal = horizontal;

        switch (event.key) {
          case 'ArrowDown':
            if (isHorizontal) {
              // Keine Aktion bei horizontaler Liste
            } else {
              // Nächstes Item
              newIndex = activeIndex === null ? 0 : (activeIndex + 1) % itemCount;
              event.preventDefault();
            }
            break;
          case 'ArrowUp':
            if (isHorizontal) {
              // Keine Aktion bei horizontaler Liste
            } else {
              // Vorheriges Item
              newIndex =
                activeIndex === null ? itemCount - 1 : (activeIndex - 1 + itemCount) % itemCount;
              event.preventDefault();
            }
            break;
          case 'ArrowRight':
            if (isHorizontal) {
              // Nächstes Item
              newIndex = activeIndex === null ? 0 : (activeIndex + 1) % itemCount;
              event.preventDefault();
            }
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              // Vorheriges Item
              newIndex =
                activeIndex === null ? itemCount - 1 : (activeIndex - 1 + itemCount) % itemCount;
              event.preventDefault();
            }
            break;
          case 'Home':
            newIndex = 0;
            event.preventDefault();
            break;
          case 'End':
            newIndex = itemCount - 1;
            event.preventDefault();
            break;
          case 'Enter':
          case ' ':
            if (activeIndex !== null && selectable) {
              // Finde das Item mit diesem Index
              const selectedId = [...itemsMap.current.entries()].find(
                ([_, index]) => index === activeIndex
              )?.[0];

              if (selectedId !== undefined && onSelectItem) {
                onSelectItem(selectedId);
                event.preventDefault();
              }
            }
            break;
        }

        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);

          // Fokussiere das Item
          const listElement = listRef.current;
          if (listElement) {
            const items = listElement.querySelectorAll('[role="listitem"]');
            if (newIndex !== null && newIndex >= 0 && newIndex < items.length) {
              (items[newIndex] as HTMLElement).focus();
            }
          }
        }
      },
      [activeIndex, horizontal, selectable, onSelectItem]
    );

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    return (
      <>
        {renderDescription()}
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
            onSelectItem,
            listId,
            activeIndex,
            setActiveIndex,
            registerItem,
          }}
        >
          <Component
            ref={(node) => {
              // Kombiniere den externen Ref mit unserem internen Ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
              }
              listRef.current = node;
            }}
            id={listId}
            className={classes}
            style={markerStyle}
            role={variant === 'description' ? 'list' : undefined}
            aria-label={ariaLabel}
            aria-describedby={descriptionId}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            {...rest}
          >
            {children}
          </Component>
        </ListContext.Provider>
      </>
    );
  }
);

/**
 * Barrierefreie ListItem-Komponente für einzelne Listeneinträge
 *
 * @example
 * ```tsx
 * <ListItemA11y primary="Item 1" secondary="Beschreibung" />
 * ```
 */
export const ListItemA11y = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
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
      description,
      ...rest
    },
    ref
  ) => {
    const {
      variant,
      dividers,
      horizontal,
      icon: listIcon,
      selectable,
      selectedItem,
      onSelectItem,
      listId,
      activeIndex,
      setActiveIndex,
      registerItem,
    } = useContext(ListContext);

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const itemId = `listitem-${id || uniqueId}`;
    const descriptionId = description ? `description-${itemId}` : undefined;
    const primaryId = primary ? `primary-${itemId}` : undefined;
    const secondaryId = secondary ? `secondary-${itemId}` : undefined;

    // Registriere das Item für die Tastaturnavigation
    const itemIndex = registerItem(id);

    // Behandle Klick-Events
    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return;

      if (selectable && id !== undefined && onSelectItem) {
        onSelectItem(id);
      }

      if (onClick) {
        onClick(event);
      }

      // Setze den aktiven Index
      setActiveIndex(itemIndex);
    };

    // Bestimme, ob das Element ausgewählt ist
    const isSelected =
      selected !== undefined ? selected : selectable && id !== undefined && id === selectedItem;
    const isActive = activeIndex === itemIndex;

    // Zusammengesetzte Klassen
    const classes = [
      'smolitux-list-item',
      dividers && 'smolitux-list-item--divider',
      horizontal && 'smolitux-list-item--horizontal',
      isSelected && 'smolitux-list-item--selected',
      disabled && 'smolitux-list-item--disabled',
      (onClick || selectable) && !disabled && 'smolitux-list-item--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

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
            {primary && (
              <dt id={primaryId} className="smolitux-list-item-term">
                {primary}
              </dt>
            )}
            {secondary && (
              <dd id={secondaryId} className="smolitux-list-item-description">
                {secondary}
              </dd>
            )}
          </>
        );
      }

      // Standard-Darstellung
      return (
        <>
          {displayIcon && (
            <div className="smolitux-list-item-icon" aria-hidden="true">
              {displayIcon}
            </div>
          )}
          <div className="smolitux-list-item-content">
            {primary && (
              <div id={primaryId} className="smolitux-list-item-primary">
                {primary}
              </div>
            )}
            {secondary && (
              <div id={secondaryId} className="smolitux-list-item-secondary">
                {secondary}
              </div>
            )}
          </div>
          {action && <div className="smolitux-list-item-action">{action}</div>}
        </>
      );
    };

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    // Für description-Listen
    if (variant === 'description') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={classes}
          role="listitem"
          aria-describedby={descriptionId}
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
          {renderDescription()}
          {renderContent()}
        </div>
      );
    }

    return (
      <>
        {renderDescription()}
        <li
          ref={ref}
          id={itemId}
          className={classes}
          role="listitem"
          tabIndex={isActive ? 0 : -1}
          onClick={handleClick}
          aria-disabled={disabled}
          aria-selected={isSelected}
          aria-describedby={descriptionId}
          {...rest}
        >
          {renderContent()}
        </li>
      </>
    );
  }
);

/**
 * Barrierefreie ListItemText-Komponente für strukturierten Text in Listenelementen
 *
 * @example
 * ```tsx
 * <ListItemA11y>
 *   <ListItemTextA11y primary="Titel" secondary="Beschreibung" />
 * </ListItemA11y>
 * ```
 */
export const ListItemTextA11y = forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ primary, secondary, className = '', ...rest }, ref) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const primaryId = `primary-${uniqueId}`;
    const secondaryId = `secondary-${uniqueId}`;

    const classes = ['smolitux-list-item-content', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {primary && (
          <div id={primaryId} className="smolitux-list-item-primary">
            {primary}
          </div>
        )}
        {secondary && (
          <div id={secondaryId} className="smolitux-list-item-secondary">
            {secondary}
          </div>
        )}
      </div>
    );
  }
);

/**
 * Barrierefreie ListItemIcon-Komponente für Icons in Listenelementen
 *
 * @example
 * ```tsx
 * <ListItemA11y>
 *   <ListItemIconA11y ariaLabel="Benutzer"><UserIcon /></ListItemIconA11y>
 *   <ListItemTextA11y primary="Benutzer" />
 * </ListItemA11y>
 * ```
 */
export const ListItemIconA11y = forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ children, className = '', ariaLabel, ...rest }, ref) => {
    const classes = ['smolitux-list-item-icon', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/**
 * Barrierefreie ListItemAction-Komponente für Aktionen in Listenelementen
 *
 * @example
 * ```tsx
 * <ListItemA11y>
 *   <ListItemTextA11y primary="Eintrag" />
 *   <ListItemActionA11y ariaLabel="Bearbeiten"><Button>Bearbeiten</Button></ListItemActionA11y>
 * </ListItemA11y>
 * ```
 */
export const ListItemActionA11y = forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ children, className = '', ariaLabel, ...rest }, ref) => {
    const classes = ['smolitux-list-item-action', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        role={ariaLabel ? 'group' : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ListA11y.displayName = 'ListA11y';
ListItemA11y.displayName = 'ListItemA11y';
ListItemTextA11y.displayName = 'ListItemTextA11y';
ListItemIconA11y.displayName = 'ListItemIconA11y';
ListItemActionA11y.displayName = 'ListItemActionA11y';

export default ListA11y;
