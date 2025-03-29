// packages/@smolitux/layout/src/components/Flex/Flex.a11y.tsx
import React, { forwardRef } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex-Richtung */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Abstand zwischen Flex-Items */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Ausrichtung der Items entlang der Hauptachse */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Ausrichtung der Items entlang der Kreuzachse */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Flex-Wrap-Verhalten */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Als Inline-Flex anzeigen */
  inline?: boolean;
  /** Volle Breite einnehmen */
  fullWidth?: boolean;
  /** Volle Höhe einnehmen */
  fullHeight?: boolean;
  /** Responsive Richtung für verschiedene Breakpoints */
  responsive?: boolean;
  /** Semantisches HTML-Element, das gerendert werden soll */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav' | 'form' | 'fieldset';
  /** ARIA-Rolle für das Element */
  role?: string;
  /** ARIA-Label für das Element */
  ariaLabel?: string;
  /** ARIA-Labelledby für das Element */
  ariaLabelledby?: string;
  /** ARIA-Describedby für das Element */
  ariaDescribedby?: string;
  /** ARIA-Owns für das Element */
  ariaOwns?: string;
  /** ARIA-Controls für das Element */
  ariaControls?: string;
  /** ARIA-Expanded für das Element */
  ariaExpanded?: boolean;
  /** ARIA-Haspopup für das Element */
  ariaHaspopup?: boolean;
  /** ARIA-Hidden für das Element */
  ariaHidden?: boolean;
  /** ARIA-Live für das Element */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** ARIA-Relevant für das Element */
  ariaRelevant?: string;
  /** ARIA-Atomic für das Element */
  ariaAtomic?: boolean;
  /** ARIA-Busy für das Element */
  ariaBusy?: boolean;
  /** ARIA-Current für das Element */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  /** ARIA-Roledescription für das Element */
  ariaRoledescription?: string;
  /** ARIA-Keyshortcuts für das Element */
  ariaKeyshortcuts?: string;
  /** ARIA-Setsize für das Element */
  ariaSetsize?: number;
  /** ARIA-Posinset für das Element */
  ariaPosinset?: number;
  /** ARIA-Level für das Element */
  ariaLevel?: number;
  /** Tabindex für das Element */
  tabIndex?: number;
}

/**
 * Barrierefreie Flexbox-Komponente für semantisch korrekte und zugängliche Layouts
 * 
 * @example
 * ```tsx
 * <FlexA11y 
 *   gap={4} 
 *   alignItems="center" 
 *   as="nav" 
 *   role="navigation" 
 *   ariaLabel="Hauptnavigation"
 * >
 *   <Icon name="user" aria-hidden="true" />
 *   <span>Benutzername</span>
 * </FlexA11y>
 * ```
 */
export const FlexA11y = forwardRef<HTMLDivElement, FlexProps>(({
  direction = 'row',
  gap = 0,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  wrap = 'nowrap',
  inline = false,
  fullWidth = false,
  fullHeight = false,
  responsive = false,
  className = '',
  children,
  as = 'div',
  role,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  ariaHidden,
  ariaLive,
  ariaRelevant,
  ariaAtomic,
  ariaBusy,
  ariaCurrent,
  ariaRoledescription,
  ariaKeyshortcuts,
  ariaSetsize,
  ariaPosinset,
  ariaLevel,
  tabIndex,
  ...rest
}, ref) => {
  // Responsive Richtung (z.B. column auf Mobilgeräten, row auf Desktop)
  const responsiveClasses = responsive
    ? direction === 'row'
      ? 'flex-col md:flex-row'
      : direction === 'column'
        ? 'flex-col'
        : direction === 'row-reverse'
          ? 'flex-col-reverse md:flex-row-reverse'
          : 'flex-col-reverse'
    : '';

  // Flex-Richtung
  const directionClasses = responsive
    ? ''
    : direction === 'row'
      ? 'flex-row'
      : direction === 'column'
        ? 'flex-col'
        : direction === 'row-reverse'
          ? 'flex-row-reverse'
          : 'flex-col-reverse';

  // Abstand zwischen Flex-Items
  const gapClasses = gap === 0 ? '' : `gap-${gap}`;

  // Ausrichtung der Items
  const justifyClasses = {
    'flex-start': 'justify-start',
    'center': 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly'
  }[justifyContent];

  const alignClasses = {
    'flex-start': 'items-start',
    'center': 'items-center',
    'flex-end': 'items-end',
    'stretch': 'items-stretch',
    'baseline': 'items-baseline'
  }[alignItems];

  // Flex-Wrap
  const wrapClasses = wrap === 'nowrap' ? 'flex-nowrap' : wrap === 'wrap' ? 'flex-wrap' : 'flex-wrap-reverse';

  // Kombiniere alle Klassen
  const classes = [
    // Basis-Flex-Klasse
    inline ? 'inline-flex' : 'flex',
    
    // Richtung
    directionClasses,
    
    // Responsive Klassen
    responsiveClasses,
    
    // Abstand
    gapClasses,
    
    // Ausrichtung
    justifyClasses,
    alignClasses,
    
    // Wrap
    wrapClasses,
    
    // Breite und Höhe
    fullWidth ? 'w-full' : '',
    fullHeight ? 'h-full' : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');

  // ARIA-Attribute
  const ariaAttributes = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-owns': ariaOwns,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHaspopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    'aria-relevant': ariaRelevant,
    'aria-atomic': ariaAtomic,
    'aria-busy': ariaBusy,
    'aria-current': ariaCurrent,
    'aria-roledescription': ariaRoledescription,
    'aria-keyshortcuts': ariaKeyshortcuts,
    'aria-setsize': ariaSetsize,
    'aria-posinset': ariaPosinset,
    'aria-level': ariaLevel,
    'role': role,
    'tabIndex': tabIndex
  };

  // Filtere undefined-Werte aus den ARIA-Attributen
  const filteredAriaAttributes = Object.entries(ariaAttributes)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  // Rendere das entsprechende Element basierend auf der 'as'-Prop
  const Component = as as keyof JSX.IntrinsicElements;

  // Kombiniere alle Props in einem Objekt
  const componentProps = {
    ref,
    className: classes,
    ...filteredAriaAttributes,
    ...rest
  };

  return React.createElement(
    Component,
    componentProps,
    children
  );
});

FlexA11y.displayName = 'FlexA11y';

export default FlexA11y;