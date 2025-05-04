import React, { useId } from 'react';
import { Drawer, DrawerProps } from './Drawer';

/**
 * Erweiterte Barrierefreiheits-Props für den Drawer
 */
export interface A11yDrawerProps extends DrawerProps {
  /**
   * Beschreibender Text für den Drawer (wird als aria-label verwendet)
   * Besonders wichtig für Drawer ohne sichtbaren Titel
   */
  accessibleLabel?: string;
  
  /**
   * Zusätzliche Beschreibung für Screenreader
   * Wird als aria-describedby verwendet
   */
  accessibleDescription?: string;
  
  /**
   * Ob der Drawer eine Live-Region aktualisiert
   * Setzt aria-live
   */
  live?: 'off' | 'polite' | 'assertive';
  
  /**
   * Ob Änderungen in der Live-Region atomar sind
   * Setzt aria-atomic
   */
  atomic?: boolean;
  
  /**
   * Ob der Drawer relevant ist
   * Setzt aria-relevant
   */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  
  /**
   * Benutzerdefinierte Texte für Screenreader
   */
  a11yTexts?: {
    /** Text für den Schließen-Button */
    closeButtonLabel?: string;
    /** Text für den Drawer-Titel */
    drawerTitleLabel?: string;
    /** Text für die Drawer-Beschreibung */
    drawerDescriptionLabel?: string;
    /** Text für den Overlay */
    overlayLabel?: string;
  };
  
  /**
   * Test-ID für automatisierte Tests
   */
  testId?: string;
  
  /**
   * Ob der Drawer den Fokus einfangen soll (Fokus bleibt im Drawer)
   */
  trapFocus?: boolean;
  
  /**
   * Ob der Drawer eine Rolle als Navigation haben soll
   */
  isNavigation?: boolean;
  
  /**
   * Ob der Drawer eine Rolle als Komplementär-Bereich haben soll
   */
  isComplementary?: boolean;
  
  /**
   * Ob der Drawer eine Rolle als Formular haben soll
   */
  isForm?: boolean;
  
  /**
   * Ob der Drawer eine Rolle als Suche haben soll
   */
  isSearch?: boolean;
}

/**
 * Drawer-Komponente mit verbesserten Barrierefreiheits-Funktionen
 * 
 * Diese Komponente erweitert die Standard-Drawer-Komponente um zusätzliche
 * Barrierefreiheits-Funktionen wie verbesserte ARIA-Attribute und anpassbare
 * Screenreader-Texte.
 * 
 * @example
 * ```tsx
 * <Drawer.A11y
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Seitenmenü"
 *   accessibleLabel="Hauptnavigation"
 *   accessibleDescription="Enthält die Hauptnavigationspunkte der Anwendung"
 *   isNavigation={true}
 *   trapFocus={true}
 * >
 *   <nav>
 *     <ul>
 *       <li><a href="/">Startseite</a></li>
 *       <li><a href="/profile">Profil</a></li>
 *       <li><a href="/settings">Einstellungen</a></li>
 *     </ul>
 *   </nav>
 * </Drawer.A11y>
 * ```
 */
export const A11yDrawer: React.FC<A11yDrawerProps> = (props) => {
  const {
    accessibleLabel,
    accessibleDescription,
    live,
    atomic,
    relevant,
    a11yTexts = {},
    testId,
    trapFocus = true,
    isNavigation = false,
    isComplementary = false,
    isForm = false,
    isSearch = false,
    ...rest
  } = props;
  
  // Generiere eindeutige IDs für Komponenten
  const uniqueId = useId();
  const descriptionId = `${uniqueId}-a11y-description`;
  
  // Bestimme die Rolle des Drawers
  let role: string | undefined;
  if (isNavigation) {
    role = 'navigation';
  } else if (isComplementary) {
    role = 'complementary';
  } else if (isForm) {
    role = 'form';
  } else if (isSearch) {
    role = 'search';
  }
  
  // Standard-Texte für Screenreader
  const defaultA11yTexts = {
    closeButtonLabel: 'Schließen',
    drawerTitleLabel: 'Drawer',
    drawerDescriptionLabel: 'Drawer-Inhalt',
    overlayLabel: 'Klicken zum Schließen'
  };
  
  // Kombiniere Standard-Texte mit benutzerdefinierten Texten
  const mergedA11yTexts = { ...defaultA11yTexts, ...a11yTexts };
  
  return (
    <>
      <Drawer
        role={role}
        ariaLabel={accessibleLabel}
        ariaDescription={accessibleDescription || (accessibleDescription ? descriptionId : undefined)}
        aria-live={live}
        aria-atomic={atomic ? 'true' : undefined}
        aria-relevant={relevant}
        data-testid={testId || 'a11y-drawer'}
        returnFocusToElement={trapFocus ? document.activeElement as HTMLElement : undefined}
        {...rest}
      />
      
      {/* Versteckte Beschreibung für bessere Screenreader-Unterstützung */}
      {accessibleDescription && (
        <span id={descriptionId} className="sr-only">
          {accessibleDescription}
        </span>
      )}
    </>
  );
};

A11yDrawer.displayName = 'Drawer.A11y';

export default A11yDrawer;