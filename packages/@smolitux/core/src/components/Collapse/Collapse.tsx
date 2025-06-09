// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useRef, useEffect, useState } from 'react';
import { useTransition } from '../../animations/useTransition';
import { TransitionPresetName, TransitionPreset } from '../../animations/transitions';

export type CollapseProps = {
  /**
   * Ob das Element ausgeklappt sein soll
   */
  in?: boolean;

  /**
   * Die Richtung, in die das Element kollabieren soll
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Die Dauer des Übergangs in Millisekunden
   */
  timeout?: number;

  /**
   * Das Übergangs-Preset
   */
  transition?: TransitionPresetName | TransitionPreset;

  /**
   * Die minimale Größe im kollabierten Zustand
   */
  collapsedSize?: number | string;

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
   * Callback, wenn das Element vollständig ausgeklappt ist
   */
  onEntered?: () => void;

  /**
   * Callback, wenn das Element vollständig eingeklappt ist
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
   * ARIA-Attribute für Barrierefreiheit
   */
  ariaProps?: {
    /**
     * ID des Elements, das den Collapse-Inhalt beschreibt
     */
    'aria-labelledby'?: string;

    /**
     * ID des Elements, das den Collapse-Inhalt beschreibt
     */
    'aria-describedby'?: string;

    /**
     * Ob der Collapse-Inhalt aktuell sichtbar ist
     */
    'aria-expanded'?: boolean;

    /**
     * Ob der Collapse-Inhalt versteckt ist
     */
    'aria-hidden'?: boolean;

    /**
     * Rolle des Elements für Screenreader
     */
    role?: string;

    /**
     * ID des Elements
     */
    id?: string;
  };
};

/**
 * Collapse-Komponente für Ein- und Ausklappeffekte
 */
export const Collapse: React.FC<CollapseProps> = ({
  in: inProp = false,
  orientation = 'vertical',
  timeout = 300,
  transition = 'collapse',
  collapsedSize = '0px',
  appear = false,
  mountOnEnter = false,
  unmountOnExit = false,
  onEntered,
  onExited,
  children,
  className,
  style,
  ariaProps,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(0);
  const isHorizontal = orientation === 'horizontal';
  const sizeProp = isHorizontal ? 'width' : 'height';

  // Größe des Inhalts messen
  useEffect(() => {
    if (contentRef.current) {
      const contentSize = isHorizontal
        ? contentRef.current.scrollWidth
        : contentRef.current.scrollHeight;
      setSize(contentSize);
    }
  }, [isHorizontal, children]);

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

  // Größe basierend auf dem Zustand
  const getSize = (): string | number => {
    if (state === 'entering' || state === 'entered') {
      return 'auto';
    }
    return typeof collapsedSize === 'number' ? `${collapsedSize}px` : collapsedSize;
  };

  const collapseStyle: React.CSSProperties = {
    ...transitionStyle,
    overflow: 'hidden',
    [sizeProp]: getSize(),
    // Wenn die Größe 'auto' ist, setzen wir eine maximale Größe, um die Animation zu ermöglichen
    ...(getSize() === 'auto' && { [`max-${sizeProp}`]: `${size}px` }),
  };

  // Generiere eine eindeutige ID für ARIA-Attribute, wenn keine angegeben wurde
  const collapseId = ariaProps?.id || `collapse-${Math.random().toString(36).substr(2, 9)}`;

  // Bestimme die ARIA-Attribute
  const getAriaAttributes = () => {
    const defaultAriaProps = {
      role: 'region',
      'aria-expanded': inProp,
      'aria-hidden': !inProp,
      id: collapseId,
    };

    return {
      ...defaultAriaProps,
      ...ariaProps,
    };
  };

  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={className}
      style={{ ...collapseStyle, ...style }}
      data-state={state}
      data-orientation={orientation}
      data-testid="collapse"
      {...getAriaAttributes()}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default Collapse;
