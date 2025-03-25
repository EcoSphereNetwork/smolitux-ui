import React from 'react';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type ZoomProps = {
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
 * Zoom-Komponente für Skalierungseffekte
 */
export const Zoom: React.FC<ZoomProps> = ({
  in: inProp = false,
  timeout = 300,
  transition = 'scale',
  scale = 0.75,
  appear = false,
  mountOnEnter = false,
  unmountOnExit = true,
  onEntered,
  onExited,
  children,
  className,
  style,
}) => {
  const { state, isVisible, ref, style: transitionStyle } = useTransition({
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
  
  // Transformations-Werte basierend auf dem Zustand
  const getScale = (): number => {
    return state === 'entering' || state === 'entered' ? 1 : scale;
  };
  
  const zoomStyle: React.CSSProperties = {
    ...transitionStyle,
    transform: `scale(${getScale()})`,
    transformOrigin: 'center',
  };
  
  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      style: {
        ...zoomStyle,
        ...style,
        ...children.props.style,
      },
      className: className ? `${className} ${children.props.className || ''}` : children.props.className,
      'data-state': state,
    });
  }
  
  // Ansonsten wrappen wir die Kinder in einem div
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...zoomStyle, ...style }}
      data-state={state}
    >
      {children}
    </div>
  );
};

export default Zoom;