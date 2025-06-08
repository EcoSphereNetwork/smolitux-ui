import React, { useState, useEffect, useRef, cloneElement, Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';

export type AnimatePresenceProps = {
  /**
   * Ob die Kinder angezeigt werden sollen
   */
  in?: boolean;

  /**
   * Ob die Kinder beim ersten Rendern animiert werden sollen
   */
  initial?: boolean;

  /**
   * Ob die Kinder in einem Portal gerendert werden sollen
   */
  portal?: boolean | HTMLElement;

  /**
   * Verzögerung vor dem Entfernen der Kinder aus dem DOM (in ms)
   */
  exitTimeout?: number;

  /**
   * Callback, wenn alle Kinder den DOM verlassen haben
   */
  onExitComplete?: () => void;

  /**
   * Die zu animierenden Kinder
   */
  children: React.ReactNode;
};

/**
 * Komponente zum Animieren des Ein- und Ausblendens von Elementen
 */
export const AnimatePresence: React.FC<AnimatePresenceProps> = ({
  in: inProp = true,
  initial = false,
  portal = false,
  exitTimeout = 300,
  onExitComplete,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(inProp);
  const [shouldRender, setShouldRender] = useState(inProp || initial);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialRender = useRef(true);

  // Zustandsübergänge verwalten
  useEffect(() => {
    // Beim ersten Rendern nichts tun, wenn initial=false
    if (initialRender.current && !initial) {
      initialRender.current = false;
      return;
    }

    // Timeout löschen, wenn die Komponente unmountet
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (inProp) {
      // Element einblenden
      setShouldRender(true);
      setIsVisible(true);
    } else {
      // Element ausblenden
      setIsVisible(false);

      // Nach der Ausblendanimation aus dem DOM entfernen
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        onExitComplete?.();
      }, exitTimeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inProp, exitTimeout, initial, onExitComplete]);

  // Wenn nichts gerendert werden soll, null zurückgeben
  if (!shouldRender) {
    return null;
  }

  // Kinder mit Animation-Props erweitern
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        'data-animate-presence': isVisible ? 'enter' : 'exit',
      });
    }
    return child;
  });

  // In Portal rendern, wenn gewünscht
  if (portal) {
    const portalElement = portal === true ? document.body : (portal as HTMLElement);
    return createPortal(childrenWithProps, portalElement);
  }

  return <>{childrenWithProps}</>;
};

export default AnimatePresence;
