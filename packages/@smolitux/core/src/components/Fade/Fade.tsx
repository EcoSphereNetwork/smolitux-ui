import React, { forwardRef, ElementType, ComponentPropsWithRef, useId } from 'react';
import { AnimatePresence } from '../../animations/AnimatePresence';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type FadeProps<C extends ElementType = 'div'> = {
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
   * Die Kinder der Komponente
   */
  children: React.ReactNode;
  
  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;
  
  /**
   * Zusätzliche CSS-Eigenschaften
   */
  style?: React.CSSProperties;
  
  /**
   * Das zu verwendende Element, wenn kein Kind übergeben wird
   */
  as?: C;

  /**
   * ARIA-Label für die Animation
   */
  'aria-label'?: string;

  /**
   * ARIA-Live-Wert für die Animation
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';

  /**
   * ARIA-Atomic-Wert für die Animation
   */
  'aria-atomic'?: boolean;

  /**
   * ARIA-Relevant-Wert für die Animation
   */
  'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';

  /**
   * ARIA-Busy-Wert für die Animation
   */
  'aria-busy'?: boolean;

  /**
   * Beschreibung der Animation für Screenreader
   */
  animationDescription?: string;

  /**
   * Ob die Animation für Benutzer mit reduzierter Bewegung deaktiviert werden soll
   */
  respectReducedMotion?: boolean;
} & Omit<ComponentPropsWithRef<C>, 'as' | 'children' | 'style' | 'className'>;

/**
 * Fade-Komponente für Ein- und Ausblendeffekte mit verbesserter Barrierefreiheit
 * 
 * @example
 * ```tsx
 * <Fade in={isVisible} aria-label="Inhalt" animationDescription="Inhalt wird ein- oder ausgeblendet">
 *   <div>Inhalt, der ein- und ausgeblendet wird</div>
 * </Fade>
 * ```
 */
export const Fade = forwardRef(function Fade(
  props: FadeProps<'div'>,
  forwardedRef: React.Ref<Element>
) {
  const {
    in: inProp = false,
    timeout = 300,
    transition = 'fade',
    appear = false,
    mountOnEnter = false,
    unmountOnExit = true,
    onEntered,
    onExited,
    children,
    className,
    style,
    as,
    'aria-label': ariaLabel,
    'aria-live': ariaLive = 'polite',
    'aria-atomic': ariaAtomic = true,
    'aria-relevant': ariaRelevant,
    'aria-busy': ariaBusy,
    animationDescription,
    respectReducedMotion = true,
    ...rest
  } = props;

  // Generiere eine eindeutige ID für ARIA-Attribute
  const uniqueId = useId();
  const descriptionId = animationDescription ? `fade-desc-${uniqueId}` : undefined;

  // Wir verwenden einen generischen Typ für useTransition, um die Typsicherheit zu verbessern
  const { state, isVisible, ref, style: transitionStyle } = useTransition<HTMLElement>({
    in: inProp,
    timeout,
    transition,
    appear,
    mountOnEnter,
    unmountOnExit,
    onEntered,
    onExited,
  });
  
  if (!isVisible && unmountOnExit) {
    return null;
  }
  
  // Kombiniere den übergebenen Ref mit unserem internen Ref
  const handleRef = (element: HTMLElement | null) => {
    // Setze den internen Ref
    if (ref && 'current' in ref) {
      (ref as React.MutableRefObject<HTMLElement | null>).current = element;
    }
    
    // Setze den übergebenen Ref
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef && 'current' in forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = element;
      }
    }
  };

  // Respektiere die Einstellung für reduzierte Bewegung
  const prefersReducedMotion = respectReducedMotion && typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Angepasster Style für reduzierte Bewegung
  const accessibleStyle = prefersReducedMotion
    ? { ...transitionStyle, transition: 'none' }
    : transitionStyle;

  // ARIA-Attribute für die Animation
  const ariaProps = {
    'aria-label': ariaLabel,
    'aria-live': ariaLive,
    'aria-atomic': ariaAtomic,
    'aria-relevant': ariaRelevant,
    'aria-busy': ariaBusy || (state === 'entering' || state === 'exiting'),
    'aria-describedby': descriptionId,
  };

  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return (
      <>
        {animationDescription && (
          <div id={descriptionId} className="sr-only">
            {animationDescription}
          </div>
        )}
        {React.cloneElement(children, {
          ref: handleRef,
          style: {
            ...accessibleStyle,
            ...style,
            ...(children.props.style || {}),
          },
          className: className ? `${className} ${children.props.className || ''}` : children.props.className,
          'data-state': state,
          ...ariaProps,
          // Wir müssen die restlichen Props explizit übergeben, um TypeScript-Fehler zu vermeiden
        } as any)}
      </>
    );
  }
  
  // Ansonsten wrappen wir die Kinder in einem Element
  const Component = as || 'div';
  return (
    <>
      {animationDescription && (
        <div id={descriptionId} className="sr-only">
          {animationDescription}
        </div>
      )}
      <Component
        ref={handleRef}
        className={className}
        style={{ ...accessibleStyle, ...style }}
        data-state={state}
        {...ariaProps}
        {...rest}
      >
        {children}
      </Component>
    </>
  );
});

Fade.displayName = 'Fade';

export default Fade;