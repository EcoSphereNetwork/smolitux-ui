import React, { forwardRef, ElementType, ComponentPropsWithRef, useId } from 'react';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type ZoomProps<C extends ElementType = 'div'> = {
  /**
   * Ob das Element sichtbar sein soll
   */
  in?: boolean;
  
  /**
   * Die Dauer des Übergangs in Millisekunden
   */
  timeout?: number;
  
  /**
   * Das Übergangs-Preset
   */
  transition?: TransitionPresetName | TransitionPreset;
  
  /**
   * Der Skalierungsfaktor im ausgeblendeten Zustand
   */
  scale?: number;
  
  /**
   * Ob das Element beim ersten Rendern animiert werden soll
   */
  appear?: boolean;
  
  /**
   * Ob das Element erst beim Einblenden in den DOM eingefügt werden soll
   */
  mountOnEnter?: boolean;
  
  /**
   * Ob das Element nach dem Ausblenden aus dem DOM entfernt werden soll
   */
  unmountOnExit?: boolean;
  
  /**
   * Callback, wenn das Element vollständig eingeblendet ist
   */
  onEntered?: () => void;
  
  /**
   * Callback, wenn das Element vollständig ausgeblendet ist
   */
  onExited?: () => void;
  
  /**
   * Callback, wenn das Element beginnt einzublenden
   */
  onEnter?: () => void;
  
  /**
   * Callback, wenn das Element beginnt auszublenden
   */
  onExit?: () => void;
  
  /**
   * Kinder-Elemente
   */
  children?: React.ReactNode;
  
  /**
   * Zusätzliche CSS-Klasse
   */
  className?: string;
  
  /**
   * Zusätzliche Inline-Styles
   */
  style?: React.CSSProperties;
  
  /**
   * Das HTML-Element, das gerendert werden soll
   */
  as?: C;
  
  /**
   * ARIA-Attribute für Barrierefreiheit
   */
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaHidden?: boolean;
  ariaLive?: 'polite' | 'assertive' | 'off';
  ariaAtomic?: boolean;
  ariaRelevant?: string;
  ariaBusy?: boolean;
  ariaRoledescription?: string;
  
  /**
   * Ob die Animation für Benutzer mit reduzierter Bewegung deaktiviert werden soll
   */
  respectReducedMotion?: boolean;
  
  /**
   * Ob die Animation für Screenreader angekündigt werden soll
   */
  announceAnimation?: boolean;
  
  /**
   * Benutzerdefinierte Ankündigungen für Screenreader
   */
  enterAnnouncement?: string;
  exitAnnouncement?: string;
  
  /**
   * Ob die Animation für Benutzer mit Epilepsie sicher sein soll
   */
  epilepsySafe?: boolean;
} & Omit<ComponentPropsWithRef<C>, 'as' | 'scale'>;

/**
 * Barrierefreie Zoom-Komponente für Animationen
 * 
 * @example
 * ```tsx
 * <ZoomA11y 
 *   in={isVisible} 
 *   scale={0.5} 
 *   ariaLive="polite"
 *   announceAnimation
 * >
 *   <div>Animierter Inhalt</div>
 * </ZoomA11y>
 * ```
 */
export const ZoomA11y = forwardRef(<C extends ElementType = 'div'>(
  {
    in: inProp = false,
    timeout = 300,
    transition = 'ease',
    scale = 0.75,
    appear = false,
    mountOnEnter = false,
    unmountOnExit = false,
    onEntered,
    onExited,
    onEnter,
    onExit,
    children,
    className = '',
    style = {},
    as,
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaHidden,
    ariaLive = 'polite',
    ariaAtomic = true,
    ariaRelevant,
    ariaBusy,
    ariaRoledescription,
    respectReducedMotion = true,
    announceAnimation = false,
    enterAnnouncement = 'Inhalt wird eingeblendet',
    exitAnnouncement = 'Inhalt wird ausgeblendet',
    epilepsySafe = false,
    ...rest
  }: ZoomProps<C>,
  ref: React.Ref<Element>
) => {
  const uniqueId = useId();
  const announcementId = `zoom-announcement-${uniqueId}`;
  
  // Prüfe, ob der Benutzer reduzierte Bewegung bevorzugt
  const prefersReducedMotion = respectReducedMotion && 
    typeof window !== 'undefined' && 
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  
  // Verwende useTransition für die Animation
  const { state, styles: transitionStyles } = useTransition({
    in: inProp,
    timeout: prefersReducedMotion ? 0 : timeout,
    transition,
    appear,
    mountOnEnter,
    unmountOnExit,
    onEntered,
    onExited,
    onEnter: () => {
      if (onEnter) onEnter();
    },
    onExit: () => {
      if (onExit) onExit();
    },
  });
  
  // Wenn das Element nicht gerendert werden soll, geben wir null zurück
  if (state === 'exited' && !inProp && unmountOnExit) {
    return null;
  }
  
  // Berechne die Zoom-Styles basierend auf dem Zustand
  const getZoomStyles = () => {
    const zoomStyles = {
      entering: { transform: 'scale(1)' },
      entered: { transform: 'scale(1)' },
      exiting: { transform: `scale(${scale})` },
      exited: { transform: `scale(${scale})` },
    };
    
    return zoomStyles[state];
  };
  
  // Kombiniere die Transition-Styles mit den Zoom-Styles
  const zoomStyle = {
    ...transitionStyles,
    ...getZoomStyles(),
    ...style,
  };
  
  // Wenn reduzierte Bewegung bevorzugt wird, entferne die Transition
  if (prefersReducedMotion) {
    zoomStyle.transition = 'none';
  }
  
  // Wenn epilepsySafe aktiviert ist, begrenzen wir die Geschwindigkeit der Animation
  if (epilepsySafe && !prefersReducedMotion) {
    const minTimeout = 300; // Mindestdauer für sichere Animationen
    if (timeout < minTimeout) {
      zoomStyle.transition = zoomStyle.transition?.replace(
        /(\d+)ms/,
        `${minTimeout}ms`
      );
    }
  }
  
  // Bestimme die ARIA-Attribute
  const ariaAttributes = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-hidden': ariaHidden,
    'aria-live': announceAnimation ? ariaLive : undefined,
    'aria-atomic': announceAnimation ? ariaAtomic : undefined,
    'aria-relevant': announceAnimation ? ariaRelevant : undefined,
    'aria-busy': ariaBusy,
    'aria-roledescription': ariaRoledescription,
  };
  
  // Filtere undefined-Werte aus den ARIA-Attributen
  const filteredAriaAttributes = Object.entries(ariaAttributes)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
  // Rendere die Ankündigung für Screenreader
  const renderAnnouncement = () => {
    if (!announceAnimation) return null;
    
    const announcement = state === 'entering' || state === 'entered'
      ? enterAnnouncement
      : exitAnnouncement;
    
    return (
      <div 
        id={announcementId}
        className="sr-only"
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
      >
        {announcement}
      </div>
    );
  };
  
  // Funktion zum Behandeln des Refs
  const handleRef = (instance: any) => {
    // Wenn ref eine Funktion ist, rufen wir sie mit der Instanz auf
    if (typeof ref === 'function') {
      ref(instance);
    } 
    // Wenn ref ein Objekt ist, setzen wir seine current-Eigenschaft
    else if (ref) {
      (ref as React.MutableRefObject<any>).current = instance;
    }
  };
  
  // Wenn das Kind ein einzelnes React-Element ist, klonen wir es und fügen unsere Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: handleRef,
      style: {
        ...zoomStyle,
        ...children.props.style,
      },
      className: className ? `${className} ${children.props.className || ''}` : children.props.className,
      'data-state': state,
      ...filteredAriaAttributes,
      // Wir müssen die restlichen Props explizit übergeben, um TypeScript-Fehler zu vermeiden
    } as any);
  }
  
  // Ansonsten wrappen wir die Kinder in einem Element
  const Component = as || 'div';
  return (
    <>
      {renderAnnouncement()}
      <Component
        ref={handleRef}
        className={className}
        style={zoomStyle}
        data-state={state}
        {...filteredAriaAttributes}
        {...rest}
      >
        {children}
      </Component>
    </>
  );
});

ZoomA11y.displayName = 'ZoomA11y';

export default ZoomA11y;