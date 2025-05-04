import React, { forwardRef } from 'react';
import { Grid, GridProps } from './Grid';

export interface GridA11yProps extends GridProps {
  /**
   * ARIA-Label für das Grid
   */
  ariaLabel?: string;
  
  /**
   * ARIA-Labelledby für das Grid
   */
  ariaLabelledby?: string;
  
  /**
   * ARIA-Describedby für das Grid
   */
  ariaDescribedby?: string;
  
  /**
   * ARIA-Rolle für das Grid
   */
  role?: string;
  
  /**
   * Ob das Grid eine Region ist
   */
  isRegion?: boolean;
  
  /**
   * Ob das Grid eine Landmark ist
   */
  isLandmark?: boolean;
  
  /**
   * Ob das Grid eine Tabelle ist
   */
  isTable?: boolean;
  
  /**
   * Ob das Grid ein Formular ist
   */
  isForm?: boolean;
  
  /**
   * Ob das Grid eine Navigation ist
   */
  isNavigation?: boolean;
  
  /**
   * Ob das Grid eine Liste ist
   */
  isList?: boolean;
  
  /**
   * Ob das Grid ein Menü ist
   */
  isMenu?: boolean;
  
  /**
   * Ob das Grid ein Dialog ist
   */
  isDialog?: boolean;
  
  /**
   * Ob das Grid ein Alert ist
   */
  isAlert?: boolean;
  
  /**
   * Ob das Grid ein Status ist
   */
  isStatus?: boolean;
  
  /**
   * Ob das Grid ein Live-Region ist
   */
  isLiveRegion?: boolean;
  
  /**
   * Politeness-Level für Live-Region
   */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  
  /**
   * Ob das Grid atomar ist
   */
  isAtomic?: boolean;
  
  /**
   * Ob das Grid relevant ist
   */
  isRelevant?: boolean;
  
  /**
   * Relevanz-Typ für das Grid
   */
  relevantType?: 'additions' | 'removals' | 'text' | 'all';
  
  /**
   * Ob das Grid busy ist
   */
  isBusy?: boolean;
  
  /**
   * Ob das Grid fokussierbar ist
   */
  isFocusable?: boolean;
  
  /**
   * Tab-Index für das Grid
   */
  tabIndex?: number;
  
  /**
   * Ob das Grid eine Tabelle ist
   */
  isTable2?: boolean;
  
  /**
   * Ob das Grid eine Tabellen-Kopfzeile hat
   */
  hasTableHeader?: boolean;
  
  /**
   * Ob das Grid eine Tabellen-Fußzeile hat
   */
  hasTableFooter?: boolean;
  
  /**
   * Ob das Grid eine Tabellen-Beschreibung hat
   */
  hasTableCaption?: boolean;
  
  /**
   * Tabellen-Beschreibung
   */
  tableCaption?: string;
  
  /**
   * Ob das Grid eine Tabellen-Zusammenfassung hat
   */
  hasTableSummary?: boolean;
  
  /**
   * Tabellen-Zusammenfassung
   */
  tableSummary?: string;
}

/**
 * Barrierefreie Grid-Komponente für Layouts
 * 
 * @example
 * ```tsx
 * <GridA11y columns={2} gap="md" ariaLabel="Beispiel-Grid">
 *   <div>Element 1</div>
 *   <div>Element 2</div>
 * </GridA11y>
 * ```
 */
export const GridA11y = forwardRef<HTMLDivElement, GridA11yProps>(({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role,
  isRegion = false,
  isLandmark = false,
  isTable = false,
  isForm = false,
  isNavigation = false,
  isList = false,
  isMenu = false,
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
  isTable2 = false,
  hasTableHeader = false,
  hasTableFooter = false,
  hasTableCaption = false,
  tableCaption,
  hasTableSummary = false,
  tableSummary,
  ...props
}, ref) => {
  // Bestimme die Rolle basierend auf den Eigenschaften
  const determineRole = () => {
    if (role) return role;
    if (isRegion) return 'region';
    if (isLandmark) return 'landmark';
    if (isTable || isTable2) return 'table';
    if (isForm) return 'form';
    if (isNavigation) return 'navigation';
    if (isList) return 'list';
    if (isMenu) return 'menu';
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
  
  // Rendere das Grid mit den entsprechenden ARIA-Attributen
  return (
    <>
      {/* Tabellen-Beschreibung */}
      {(isTable || isTable2) && hasTableCaption && tableCaption && (
        <div className="sr-only" id={`${props.id || 'grid'}-caption`}>
          {tableCaption}
        </div>
      )}
      
      {/* Tabellen-Zusammenfassung */}
      {(isTable || isTable2) && hasTableSummary && tableSummary && (
        <div className="sr-only" id={`${props.id || 'grid'}-summary`}>
          {tableSummary}
        </div>
      )}
      
      <Grid
        ref={ref}
        role={determineRole()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby || ((isTable || isTable2) && hasTableCaption ? `${props.id || 'grid'}-caption` : undefined)}
        aria-describedby={ariaDescribedby || ((isTable || isTable2) && hasTableSummary ? `${props.id || 'grid'}-summary` : undefined)}
        aria-live={determineAriaLive()}
        aria-atomic={isLiveRegion && isAtomic ? true : undefined}
        aria-relevant={determineAriaRelevant()}
        aria-busy={isBusy ? true : undefined}
        tabIndex={isFocusable ? (tabIndex || 0) : undefined}
        {...props}
      />
    </>
  );
});

GridA11y.displayName = 'GridA11y';

export default GridA11y;