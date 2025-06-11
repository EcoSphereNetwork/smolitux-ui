import React, { forwardRef } from 'react';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export type SlideProps = {
  /**
   * Ob das Element sichtbar sein soll
   */
  in?: boolean;

  /**
   * Die Richtung, aus der das Element hereingleiten soll
   */
  direction?: SlideDirection;

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
   * Test-ID fuer das Wurzelelement
   */
  'data-testid'?: string;
};

/**
 * Slide-Komponente für Gleiteffekte
 */
export const Slide = forwardRef<HTMLDivElement, SlideProps>(({
  in: inProp = false,
  direction = 'right',
  timeout = 300,
  transition = 'slide',
  appear = false,
  mountOnEnter = false,
  unmountOnExit = true,
  onEntered,
  onExited,
  children,
  className,
  style,
  'data-testid': dataTestId = 'slide',
}, forwardedRef) => {

  // Transformations-Werte basierend auf der Richtung
  const getTransformValue = (state: 'entering' | 'entered' | 'exiting' | 'exited'): string => {
    const isEntering = state === 'entering' || state === 'entered';

    switch (direction) {
      case 'up':
        return `translateY(${isEntering ? '0' : '100%'})`;
      case 'down':
        return `translateY(${isEntering ? '0' : '-100%'})`;
      case 'left':
        return `translateX(${isEntering ? '0' : '100%'})`;
      case 'right':
        return `translateX(${isEntering ? '0' : '-100%'})`;
      default:
        return 'none';
    }
  };

  const {
    state,
    isVisible,
    ref,
    style: transitionStyle,
  } = useTransition<HTMLDivElement>({
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

  const slideStyle: React.CSSProperties = {
    ...transitionStyle,
    transform: getTransformValue(state),
    overflow: 'hidden',
  };

  const handleRef = (element: HTMLDivElement | null) => {
    if (ref && 'current' in ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }

    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef && 'current' in forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
      }
    }
  };

  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref: handleRef,
      style: {
        ...slideStyle,
        ...style,
        ...(children.props.style || {}),
      },
      className: className
        ? `${className} ${children.props.className || ''}`
        : children.props.className,
      'data-state': state,
      'data-testid': dataTestId,
    });
  }

  // Ansonsten wrappen wir die Kinder in einem div
  return (
    <div
      ref={handleRef}
      className={className}
      style={{ ...slideStyle, ...style }}
      data-state={state}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
});

Slide.displayName = 'Slide';

export default Slide;
