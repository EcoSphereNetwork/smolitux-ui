import React, { useRef, useId } from 'react';
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
  children: React.ReactNode;

  /**
   * Zusätzliche CSS-Klasse
   */
  className?: string;

  /**
   * Zusätzliche Inline-Styles
   */
  style?: React.CSSProperties;

  /**
   * Ref für das Root-Element
   */
  ref?: React.Ref<HTMLElement>;

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
   * Semantisches HTML-Element, das gerendert werden soll
   */
  as?: React.ElementType;
};

/**
 * Barrierefreie Slide-Komponente für Animationen
 *
 * @example
 * ```tsx
 * <SlideA11y
 *   in={isVisible}
 *   direction="up"
 *   ariaLive="polite"
 *   announceAnimation
 * >
 *   <div>Animierter Inhalt</div>
 * </SlideA11y>
 * ```
 */
export const SlideA11y: React.FC<SlideProps> = ({
  in: inProp = false,
  direction = 'down',
  timeout = 300,
  transition = 'slide',
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
  ref,
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
  as: Component = 'div',
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const announcementId = `slide-announcement-${uniqueId}`;

  // Prüfe, ob der Benutzer reduzierte Bewegung bevorzugt
  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Verwende useTransition für die Animation
  const { state, style: transitionStyle } = useTransition({
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

  // Berechne die Slide-Styles basierend auf der Richtung
  const getSlideStyles = () => {
    const translateMap = {
      up: { enter: 'translateY(100%)', exit: 'translateY(-100%)' },
      down: { enter: 'translateY(-100%)', exit: 'translateY(100%)' },
      left: { enter: 'translateX(100%)', exit: 'translateX(-100%)' },
      right: { enter: 'translateX(-100%)', exit: 'translateX(100%)' },
    };

    const translate = translateMap[direction];

    const slideStyles = {
      entering: { transform: 'translate(0)' },
      entered: { transform: 'translate(0)' },
      exiting: { transform: translate.exit },
      exited: { transform: translate.enter },
    };

    return slideStyles[state];
  };

  // Kombiniere die Transition-Styles mit den Slide-Styles
  const slideStyle = {
    ...transitionStyle,
    ...getSlideStyles(),
    ...style,
  };

  // Wenn reduzierte Bewegung bevorzugt wird, entferne die Transition
  if (prefersReducedMotion) {
    slideStyle.transition = 'none';
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

    const announcement =
      state === 'entering' || state === 'entered' ? enterAnnouncement : exitAnnouncement;

    return (
      <div id={announcementId} className="sr-only" aria-live={ariaLive} aria-atomic={ariaAtomic}>
        {announcement}
      </div>
    );
  };

  // Ansonsten wrappen wir die Kinder in einem div
  return (
    <>
      {renderAnnouncement()}
      <Component
        ref={ref || nodeRef}
        className={className}
        style={slideStyle}
        data-state={state}
        {...filteredAriaAttributes}
      >
        {children}
      </Component>
    </>
  );
};

export default SlideA11y;
