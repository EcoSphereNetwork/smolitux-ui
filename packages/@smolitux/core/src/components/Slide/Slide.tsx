// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useRef } from 'react';
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
};

/**
 * Slide-Komponente für Gleiteffekte
 */
export const Slide: React.FC<SlideProps> = ({
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
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

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
  } = useTransition({
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

  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      style: {
        ...slideStyle,
        ...style,
        ...(children.props.style || {}),
      },
      className: className
        ? `${className} ${children.props.className || ''}`
        : children.props.className,
      'data-state': state,
    });
  }

  // Ansonsten wrappen wir die Kinder in einem div
  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={className}
      style={{ ...slideStyle, ...style }}
      data-state={state}
    >
      {children}
    </div>
  );
};

export default Slide;
