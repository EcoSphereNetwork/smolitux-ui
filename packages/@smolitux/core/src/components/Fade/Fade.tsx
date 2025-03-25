import React, { forwardRef, ElementType, ComponentPropsWithRef } from 'react';
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
} & Omit<ComponentPropsWithRef<C>, 'as' | 'children' | 'style' | 'className'>;

/**
 * Fade-Komponente für Ein- und Ausblendeffekte
 */
export const Fade = forwardRef(function Fade<C extends ElementType = 'div'>(
  props: FadeProps<C>,
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
    ...rest
  } = props;

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

  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: handleRef,
      style: {
        ...transitionStyle,
        ...style,
        ...children.props.style,
      },
      className: className ? `${className} ${children.props.className || ''}` : children.props.className,
      'data-state': state,
      ...rest
    });
  }
  
  // Ansonsten wrappen wir die Kinder in einem Element
  const Component = as || 'div';
  return (
    <Component
      ref={handleRef}
      className={className}
      style={{ ...transitionStyle, ...style }}
      data-state={state}
      {...rest}
    >
      {children}
    </Component>
  );
});

Fade.displayName = 'Fade';

export default Fade;