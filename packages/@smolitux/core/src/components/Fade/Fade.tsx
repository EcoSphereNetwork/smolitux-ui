import React from 'react';
import { AnimatePresence } from '../../animations/AnimatePresence';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type FadeProps = {
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
};

/**
 * Fade-Komponente für Ein- und Ausblendeffekte
 */
export const Fade: React.FC<FadeProps> = ({
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
  
  // Wenn es ein einzelnes Kind ist, klonen wir es und fügen die Transition-Props hinzu
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      // Wir müssen den Ref explizit als any casten, da TypeScript sonst Probleme hat
      ref: ref as any,
      style: {
        ...transitionStyle,
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
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ ...transitionStyle, ...style }}
      data-state={state}
    >
      {children}
    </div>
  );
};

export default Fade;