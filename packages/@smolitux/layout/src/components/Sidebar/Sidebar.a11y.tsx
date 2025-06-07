// packages/@smolitux/layout/src/components/Sidebar/Sidebar.a11y.tsx
import React, { useState, useEffect, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';
import { breakpoints } from '@smolitux/utils/styling';
import { SidebarProps, SidebarItem } from './Sidebar';

export interface SidebarA11yProps extends SidebarProps {
  /**
   * ARIA-Label für die Sidebar
   */
  ariaLabel?: string;

  /**
   * ARIA-Labelledby für die Sidebar
   */
  ariaLabelledby?: string;

  /**
   * ARIA-Describedby für die Sidebar
   */
  ariaDescribedby?: string;

  /**
   * ARIA-Rolle für die Sidebar
   */
  role?: string;

  /**
   * Ob die Sidebar eine Navigation ist
   */
  isNavigation?: boolean;

  /**
   * Ob die Sidebar eine Landmark ist
   */
  isLandmark?: boolean;

  /**
   * Ob die Sidebar eine Region ist
   */
  isRegion?: boolean;

  /**
   * Ob die Sidebar eine Complementary ist
   */
  isComplementary?: boolean;

  /**
   * Ob die Sidebar ein Menu ist
   */
  isMenu?: boolean;

  /**
   * Ob die Sidebar eine Toolbar ist
   */
  isToolbar?: boolean;

  /**
   * Ob die Sidebar eine Tablist ist
   */
  isTablist?: boolean;

  /**
   * Ob die Sidebar eine Tree ist
   */
  isTree?: boolean;

  /**
   * Ob die Sidebar eine Listbox ist
   */
  isListbox?: boolean;

  /**
   * Ob die Sidebar eine Menubar ist
   */
  isMenubar?: boolean;

  /**
   * Ob die Sidebar eine Radiogroup ist
   */
  isRadiogroup?: boolean;

  /**
   * Ob die Sidebar eine Tabpanel ist
   */
  isTabpanel?: boolean;

  /**
   * Ob die Sidebar eine Dialog ist
   */
  isDialog?: boolean;

  /**
   * Ob die Sidebar eine Alert ist
   */
  isAlert?: boolean;

  /**
   * Ob die Sidebar eine Status ist
   */
  isStatus?: boolean;

  /**
   * Ob die Sidebar eine Live-Region ist
   */
  isLiveRegion?: boolean;

  /**
   * Politeness-Level für Live-Region
   */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';

  /**
   * Ob die Sidebar atomar ist
   */
  isAtomic?: boolean;

  /**
   * Ob die Sidebar relevant ist
   */
  isRelevant?: boolean;

  /**
   * Relevanz-Typ für die Sidebar
   */
  relevantType?: 'additions' | 'removals' | 'text' | 'all';

  /**
   * Ob die Sidebar busy ist
   */
  isBusy?: boolean;

  /**
   * Ob die Sidebar fokussierbar ist
   */
  isFocusable?: boolean;

  /**
   * Tab-Index für die Sidebar
   */
  tabIndex?: number;

  /**
   * Ob die Sidebar eine Orientation hat
   */
  hasOrientation?: boolean;

  /**
   * Orientation der Sidebar
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Ob die Sidebar eine Multiselectable ist
   */
  isMultiselectable?: boolean;

  /**
   * Ob die Sidebar eine Required ist
   */
  isRequired?: boolean;

  /**
   * Ob die Sidebar eine Expanded ist
   */
  isExpanded?: boolean;

  /**
   * Ob die Sidebar eine Haspopup ist
   */
  hasPopup?: boolean;

  /**
   * Popup-Typ der Sidebar
   */
  popupType?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

  /**
   * Ob die Sidebar eine Controls hat
   */
  hasControls?: boolean;

  /**
   * Controls-ID der Sidebar
   */
  controlsId?: string;

  /**
   * Ob die Sidebar eine Owns hat
   */
  hasOwns?: boolean;

  /**
   * Owns-ID der Sidebar
   */
  ownsId?: string;

  /**
   * Ob die Sidebar eine Flowto hat
   */
  hasFlowto?: boolean;

  /**
   * Flowto-ID der Sidebar
   */
  flowtoId?: string;

  /**
   * Ob die Sidebar eine Keyshortcuts hat
   */
  hasKeyshortcuts?: boolean;

  /**
   * Keyshortcuts der Sidebar
   */
  keyshortcuts?: string;

  /**
   * Ob die Sidebar eine Roledescription hat
   */
  hasRoledescription?: boolean;

  /**
   * Roledescription der Sidebar
   */
  roledescription?: string;

  /**
   * Ob die Sidebar eine Activedescendant hat
   */
  hasActivedescendant?: boolean;

  /**
   * Activedescendant-ID der Sidebar
   */
  activedescendantId?: string;

  /**
   * Ob die Sidebar eine Colindex hat
   */
  hasColindex?: boolean;

  /**
   * Colindex der Sidebar
   */
  colindex?: number;

  /**
   * Ob die Sidebar eine Rowindex hat
   */
  hasRowindex?: boolean;

  /**
   * Rowindex der Sidebar
   */
  rowindex?: number;

  /**
   * Ob die Sidebar eine Colcount hat
   */
  hasColcount?: boolean;

  /**
   * Colcount der Sidebar
   */
  colcount?: number;

  /**
   * Ob die Sidebar eine Rowcount hat
   */
  hasRowcount?: boolean;

  /**
   * Rowcount der Sidebar
   */
  rowcount?: number;

  /**
   * Ob die Sidebar eine Posinset hat
   */
  hasPosinset?: boolean;

  /**
   * Posinset der Sidebar
   */
  posinset?: number;

  /**
   * Ob die Sidebar eine Setsize hat
   */
  hasSetsize?: boolean;

  /**
   * Setsize der Sidebar
   */
  setsize?: number;

  /**
   * Ob die Sidebar eine Level hat
   */
  hasLevel?: boolean;

  /**
   * Level der Sidebar
   */
  level?: number;

  /**
   * Ob die Sidebar eine Valuemin hat
   */
  hasValuemin?: boolean;

  /**
   * Valuemin der Sidebar
   */
  valuemin?: number;

  /**
   * Ob die Sidebar eine Valuemax hat
   */
  hasValuemax?: boolean;

  /**
   * Valuemax der Sidebar
   */
  valuemax?: number;

  /**
   * Ob die Sidebar eine Valuenow hat
   */
  hasValuenow?: boolean;

  /**
   * Valuenow der Sidebar
   */
  valuenow?: number;

  /**
   * Ob die Sidebar eine Valuetext hat
   */
  hasValuetext?: boolean;

  /**
   * Valuetext der Sidebar
   */
  valuetext?: string;

  /**
   * Ob die Sidebar eine Checked hat
   */
  hasChecked?: boolean;

  /**
   * Checked-Status der Sidebar
   */
  checked?: boolean | 'mixed';

  /**
   * Ob die Sidebar eine Selected hat
   */
  hasSelected?: boolean;

  /**
   * Selected-Status der Sidebar
   */
  selected?: boolean;

  /**
   * Ob die Sidebar eine Current hat
   */
  hasCurrent?: boolean;

  /**
   * Current-Status der Sidebar
   */
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';

  /**
   * Ob die Sidebar eine Sort hat
   */
  hasSort?: boolean;

  /**
   * Sort-Status der Sidebar
   */
  sort?: 'ascending' | 'descending' | 'other' | 'none';

  /**
   * Ob die Sidebar eine Dropeffect hat
   */
  hasDropeffect?: boolean;

  /**
   * Dropeffect der Sidebar
   */
  dropeffect?: 'copy' | 'move' | 'link' | 'execute' | 'popup' | 'none';

  /**
   * Ob die Sidebar eine Grabbed hat
   */
  hasGrabbed?: boolean;

  /**
   * Grabbed-Status der Sidebar
   */
  grabbed?: boolean;

  /**
   * Ob die Sidebar eine Hidden hat
   */
  hasHidden?: boolean;

  /**
   * Hidden-Status der Sidebar
   */
  hidden?: boolean;

  /**
   * Ob die Sidebar eine Invalid hat
   */
  hasInvalid?: boolean;

  /**
   * Invalid-Status der Sidebar
   */
  invalid?: boolean | 'grammar' | 'spelling';

  /**
   * Ob die Sidebar eine Pressed hat
   */
  hasPressed?: boolean;

  /**
   * Pressed-Status der Sidebar
   */
  pressed?: boolean | 'mixed';

  /**
   * Ob die Sidebar eine Readonly hat
   */
  hasReadonly?: boolean;

  /**
   * Readonly-Status der Sidebar
   */
  readonly?: boolean;

  /**
   * Ob die Sidebar eine Required hat
   */
  hasRequired?: boolean;

  /**
   * Required-Status der Sidebar
   */
  required?: boolean;

  /**
   * Ob die Sidebar eine Disabled hat
   */
  hasDisabled?: boolean;

  /**
   * Disabled-Status der Sidebar
   */
  disabled?: boolean;

  /**
   * Ob die Sidebar eine Errormessage hat
   */
  hasErrormessage?: boolean;

  /**
   * Errormessage-ID der Sidebar
   */
  errormessageId?: string;

  /**
   * Ob die Sidebar eine Keyboardshortcut hat
   */
  hasKeyboardshortcut?: boolean;

  /**
   * Keyboardshortcut der Sidebar
   */
  keyboardshortcut?: string;
}

/**
 * Barrierefreie Sidebar-Komponente für Navigation und Menüs
 *
 * @example
 * ```tsx
 * <SidebarA11y
 *   items={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
 *   ]}
 *   ariaLabel="Hauptnavigation"
 *   isNavigation={true}
 * />
 * ```
 */
export const SidebarA11y = forwardRef<HTMLDivElement, SidebarA11yProps>(
  (
    {
      items,
      title,
      logo,
      collapsed = false,
      onCollapseChange,
      htmlProps = {},
      onSelect,
      position = 'left',
      fixed = false,
      variant = 'default',
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      role,
      isNavigation = false,
      isLandmark = false,
      isRegion = false,
      isComplementary = false,
      isMenu = false,
      isToolbar = false,
      isTablist = false,
      isTree = false,
      isListbox = false,
      isMenubar = false,
      isRadiogroup = false,
      isTabpanel = false,
      isDialog = false,
      isAlert = false,
      isStatus = false,
      isLiveRegion = false,
      liveRegionPoliteness = 'polite',
      isAtomic = false,
      isRelevant = false,
      relevantType = 'additions',
      isBusy = false,
      isFocusable = false,
      tabIndex,
      responsive = false,
      collapseBreakpoint = 'md',
      hasOrientation = false,
      orientation = 'vertical',
      isMultiselectable = false,
      isRequired = false,
      isExpanded = false,
      hasPopup = false,
      popupType = 'menu',
      hasControls = false,
      controlsId,
      hasOwns = false,
      ownsId,
      hasFlowto = false,
      flowtoId,
      hasKeyshortcuts = false,
      keyshortcuts,
      hasRoledescription = false,
      roledescription,
      hasActivedescendant = false,
      activedescendantId,
      hasColindex = false,
      colindex,
      hasRowindex = false,
      rowindex,
      hasColcount = false,
      colcount,
      hasRowcount = false,
      rowcount,
      hasPosinset = false,
      posinset,
      hasSetsize = false,
      setsize,
      hasLevel = false,
      level,
      hasValuemin = false,
      valuemin,
      hasValuemax = false,
      valuemax,
      hasValuenow = false,
      valuenow,
      hasValuetext = false,
      valuetext,
      hasChecked = false,
      checked,
      hasSelected = false,
      selected,
      hasCurrent = false,
      current,
      hasSort = false,
      sort,
      hasDropeffect = false,
      dropeffect,
      hasGrabbed = false,
      grabbed,
      hasHidden = false,
      hidden,
      hasInvalid = false,
      invalid,
      hasPressed = false,
      pressed,
      hasReadonly = false,
      readonly,
      hasRequired = false,
      required,
      hasDisabled = false,
      disabled,
      hasErrormessage = false,
      errormessageId,
      hasKeyboardshortcut = false,
      keyboardshortcut,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    // Aktualisiere den Collapse-Status, wenn sich die Prop ändert
    useEffect(() => {
      setIsCollapsed(collapsed);
    }, [collapsed]);

    useEffect(() => {
      if (!responsive) return;
      const bp =
        typeof collapseBreakpoint === 'number'
          ? collapseBreakpoint
          : parseInt(breakpoints[collapseBreakpoint], 10);
      const check = () => {
        const shouldCollapse = window.innerWidth < bp;
        setIsCollapsed(shouldCollapse ? true : collapsed);
      };
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, [responsive, collapseBreakpoint, collapsed]);

    // Behandle das Umschalten des Collapse-Status
    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);

      if (onCollapseChange) {
        onCollapseChange(newCollapsed);
      }
    };

    // Behandle die Auswahl eines Items
    const handleSelect = (item: SidebarItem) => {
      if (item.disabled) return;

      if (item.onClick) {
        item.onClick();
      }

      if (onSelect) {
        onSelect(item);
      }
    };

    // Bestimme die Rolle basierend auf den Eigenschaften
    const determineRole = () => {
      if (role) return role;
      if (isNavigation) return 'navigation';
      if (isLandmark) return 'landmark';
      if (isRegion) return 'region';
      if (isComplementary) return 'complementary';
      if (isMenu) return 'menu';
      if (isToolbar) return 'toolbar';
      if (isTablist) return 'tablist';
      if (isTree) return 'tree';
      if (isListbox) return 'listbox';
      if (isMenubar) return 'menubar';
      if (isRadiogroup) return 'radiogroup';
      if (isTabpanel) return 'tabpanel';
      if (isDialog) return 'dialog';
      if (isAlert) return 'alert';
      if (isStatus) return 'status';
      return undefined;
    };

    // Bestimme die ARIA-Live-Region-Eigenschaften
    const determineAriaLive = () => {
      if (!isLiveRegion) return undefined;
      return liveRegionPoliteness;
    };

    // Bestimme die ARIA-Relevant-Eigenschaft
    const determineAriaRelevant = () => {
      if (!isRelevant) return undefined;
      return relevantType;
    };

    // Rendere ein einzelnes Item
    const renderItem = (item: SidebarItem, index: number) => {
      const isActive = item.active;
      const isItemDisabled = item.disabled || disabled;

      // Bestimme die Klassen für das Item
      const itemClasses = [
        'sidebar-item',
        isActive ? 'sidebar-item-active' : '',
        isItemDisabled ? 'sidebar-item-disabled' : '',
        item.className || '',
      ]
        .filter(Boolean)
        .join(' ');

      // Bestimme die ARIA-Attribute für das Item
      const itemAriaProps: React.AriaAttributes = {
        'aria-disabled': isItemDisabled ? true : undefined,
        'aria-selected': hasSelected && isActive ? selected : undefined,
        'aria-current':
          hasCurrent && isActive ? (typeof current === 'boolean' ? 'page' : current) : undefined,
        'aria-haspopup': item.children && item.children.length > 0 ? 'true' : undefined,
        'aria-expanded': item.children && item.children.length > 0 ? String(!!isActive) : undefined,
        'aria-controls':
          item.children && item.children.length > 0 && isActive ? `${item.id}-submenu` : undefined,
        'aria-label': item.label,
      };

      // Rendere das Item als Link oder Button
      const itemContent = (
        <>
          {item.icon && (
            <span className="sidebar-item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="sidebar-item-label">{item.label}</span>
          {item.badge && (
            <span
              className={`sidebar-item-badge sidebar-item-badge-${item.badgeColor || 'primary'}`}
            >
              {item.badge}
            </span>
          )}
          {item.children && item.children.length > 0 && (
            <span className="sidebar-item-arrow" aria-hidden="true">
              {isActive ? '▼' : '▶'}
            </span>
          )}
        </>
      );

      // Rendere das Item
      return (
        <li key={item.id} className="sidebar-item-wrapper">
          {item.href ? (
            <a
              href={item.href}
              className={itemClasses}
              onClick={(e) => {
                if (isItemDisabled) {
                  e.preventDefault();
                  return;
                }
                handleSelect(item);
              }}
              {...itemAriaProps}
            >
              {itemContent}
            </a>
          ) : (
            <button
              type="button"
              className={itemClasses}
              onClick={() => handleSelect(item)}
              disabled={isItemDisabled}
              {...itemAriaProps}
            >
              {itemContent}
            </button>
          )}

          {/* Untermenü */}
          {item.children && item.children.length > 0 && isActive && (
            <ul
              id={`${item.id}-submenu`}
              className="sidebar-submenu"
              role="menu"
              aria-label={`${item.label} Untermenü`}
            >
              {item.children.map((child, childIndex) => renderItem(child, childIndex))}
            </ul>
          )}
        </li>
      );
    };

    // Bestimme die Klassen für die Sidebar
    const sidebarClasses = [
      'sidebar',
      `sidebar-${position}`,
      `sidebar-${variant}`,
      isCollapsed ? 'sidebar-collapsed' : '',
      fixed ? 'sidebar-fixed' : '',
      htmlProps.className || '',
    ]
      .filter(Boolean)
      .join(' ');

    // Bestimme die ARIA-Attribute für die Sidebar
    const sidebarAriaProps: React.AriaAttributes = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-orientation': hasOrientation ? orientation : undefined,
      'aria-multiselectable': isMultiselectable ? 'true' : undefined,
      'aria-required': hasRequired ? String(required) : undefined,
      'aria-expanded': isExpanded ? 'true' : undefined,
      'aria-haspopup': hasPopup ? popupType : undefined,
      'aria-controls': hasControls ? controlsId : undefined,
      'aria-owns': hasOwns ? ownsId : undefined,
      'aria-flowto': hasFlowto ? flowtoId : undefined,
      'aria-keyshortcuts': hasKeyshortcuts ? keyshortcuts : undefined,
      'aria-roledescription': hasRoledescription ? roledescription : undefined,
      'aria-activedescendant': hasActivedescendant ? activedescendantId : undefined,
      'aria-colindex': hasColindex ? String(colindex) : undefined,
      'aria-rowindex': hasRowindex ? String(rowindex) : undefined,
      'aria-colcount': hasColcount ? String(colcount) : undefined,
      'aria-rowcount': hasRowcount ? String(rowcount) : undefined,
      'aria-posinset': hasPosinset ? String(posinset) : undefined,
      'aria-setsize': hasSetsize ? String(setsize) : undefined,
      'aria-level': hasLevel ? String(level) : undefined,
      'aria-valuemin': hasValuemin ? String(valuemin) : undefined,
      'aria-valuemax': hasValuemax ? String(valuemax) : undefined,
      'aria-valuenow': hasValuenow ? String(valuenow) : undefined,
      'aria-valuetext': hasValuetext ? valuetext : undefined,
      'aria-checked': hasChecked ? String(checked) : undefined,
      'aria-selected': hasSelected ? String(selected) : undefined,
      'aria-current': hasCurrent ? String(current) : undefined,
      'aria-sort': hasSort ? sort : undefined,
      'aria-dropeffect': hasDropeffect ? dropeffect : undefined,
      'aria-grabbed': hasGrabbed ? String(grabbed) : undefined,
      'aria-hidden': hasHidden ? String(hidden) : undefined,
      'aria-invalid': hasInvalid ? String(invalid) : undefined,
      'aria-pressed': hasPressed ? String(pressed) : undefined,
      'aria-readonly': hasReadonly ? String(readonly) : undefined,
      'aria-required': hasRequired ? String(required) : undefined,
      'aria-disabled': hasDisabled ? String(disabled) : undefined,
      'aria-errormessage': hasErrormessage ? errormessageId : undefined,
      'aria-keyboardshortcut': hasKeyboardshortcut ? keyboardshortcut : undefined,
      'aria-live': determineAriaLive(),
      'aria-atomic': isLiveRegion && isAtomic ? 'true' : undefined,
      'aria-relevant': determineAriaRelevant(),
      'aria-busy': isBusy ? 'true' : undefined,
    };

    // Rendere die Sidebar
    return (
      <div
        ref={ref}
        className={sidebarClasses}
        role={determineRole()}
        tabIndex={isFocusable ? tabIndex || 0 : undefined}
        {...sidebarAriaProps}
        {...htmlProps}
      >
        {/* Header */}
        {(logo || title) && (
          <div className="sidebar-header">
            {logo && <div className="sidebar-logo">{logo}</div>}
            {title && !isCollapsed && <div className="sidebar-title">{title}</div>}

            {/* Collapse-Button */}
            <button
              type="button"
              className="sidebar-collapse-button"
              onClick={handleToggleCollapse}
              aria-label={isCollapsed ? 'Sidebar ausklappen' : 'Sidebar einklappen'}
              aria-expanded={!isCollapsed}
              aria-controls="sidebar-content"
            >
              <span aria-hidden="true">{isCollapsed ? '▶' : '◀'}</span>
            </button>
          </div>
        )}

        {/* Inhalt */}
        <div id="sidebar-content" className="sidebar-content">
          <ul
            className="sidebar-items"
            role={isNavigation ? 'menu' : isTree ? 'tree' : isListbox ? 'listbox' : undefined}
          >
            {items.map((item, index) => renderItem(item, index))}
          </ul>
        </div>
      </div>
    );
  }
);

SidebarA11y.displayName = 'SidebarA11y';

export default SidebarA11y;
