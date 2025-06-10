// packages/@smolitux/core/src/components/Skeleton/Skeleton.a11y.tsx
import React, { forwardRef, useId } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Die Breite des Skeletons */
  width?: string | number;
  /** Die Höhe des Skeletons */
  height?: string | number;
  /** Die Form des Skeletons */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Animation aktivieren */
  animation?: 'pulse' | 'wave' | 'none';
  /** Anzahl der zu wiederholenden Elemente */
  count?: number;
  /** Abstand zwischen wiederholten Elementen */
  gap?: number;
  /** ARIA-Label für den Skeleton */
  ariaLabel?: string;
  /** Beschreibung für den Skeleton (für Screenreader) */
  description?: string;
  /** Ob der Skeleton als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob der Skeleton als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob der Skeleton als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob der Skeleton als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Ob der Skeleton als "hidden" markiert werden soll, wenn er nicht mehr benötigt wird */
  hideWhenLoaded?: boolean;
  /** Ob der Inhalt geladen ist */
  isLoaded?: boolean;
  /** Der geladene Inhalt, der angezeigt werden soll, wenn isLoaded=true */
  children?: React.ReactNode;
}

/**
 * Barrierefreie Skeleton-Komponente für Ladezustände
 *
 * @example
 * ```tsx
 * <SkeletonA11y
 *   variant="text"
 *   width={200}
 *   height={20}
 *   ariaLabel="Lädt Text"
 * />
 * ```
 */
export const SkeletonA11y = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = 'text',
      animation = 'pulse',
      count = 1,
      gap = 8,
      className = '',
      ariaLabel = 'Lädt...',
      description,
      busy = true,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      hideWhenLoaded = true,
      isLoaded = false,
      children,
      ...rest
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const skeletonId = rest.id || `skeleton-${uniqueId}`;
    const descriptionId = description ? `description-${skeletonId}` : undefined;
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Kombiniere den externen Ref mit unserem internen Ref
    const combinedRef = (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
      containerRef.current = node;
    };

    // Bestimme die Varianten-spezifischen Klassen
    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: '',
      rounded: 'rounded-md',
    };

    // Bestimme die Animations-Klassen
    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-skeleton-wave',
      none: '',
    };

    // Generiere die Basis-Klassen für ein einzelnes Skeleton-Element
    const skeletonClasses = [
      'bg-gray-200 dark:bg-gray-700',
      variantClasses[variant],
      animationClasses[animation],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Stil-Eigenschaften für Breite und Höhe
    const baseStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    // Standard-Dimensionen basierend auf der Variante
    if (!width) {
      if (variant === 'text') {
        baseStyle.width = '100%';
      } else if (variant === 'circular') {
        baseStyle.width = '40px';
      } else {
        baseStyle.width = '100%';
      }
    }

    if (!height) {
      if (variant === 'text') {
        baseStyle.height = '1em';
      } else if (variant === 'circular') {
        baseStyle.height = '40px';
      } else {
        baseStyle.height = '100px';
      }
    }

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    // Renderfunktion für ein einzelnes Skeleton-Element
    const renderSkeleton = (index: number) => (
      <div
        key={index}
        className={skeletonClasses}
        style={{
          ...baseStyle,
          ...(index > 0 ? { marginTop: `${gap}px` } : {}),
        }}
        {...(index === 0
          ? {
              ...rest,
              id: `${skeletonId}-item-${index}`,
              'aria-hidden': 'true',
            }
          : {
              id: `${skeletonId}-item-${index}`,
              'aria-hidden': 'true',
            })}
      />
    );

    // Wenn der Inhalt geladen ist und wir ihn anzeigen sollen
    if (isLoaded && children) {
      return (
        <div ref={combinedRef} {...rest}>
          {children}
        </div>
      );
    }

    // Wenn der Inhalt geladen ist und wir den Skeleton ausblenden sollen
    if (isLoaded && hideWhenLoaded) {
      return null;
    }

    // Rendere mehrere Skeleton-Elemente, wenn count > 1
    return (
      <>
        {renderDescription()}
        <div
          ref={combinedRef}
          id={skeletonId}
          role="status"
          aria-label={ariaLabel}
          aria-busy={busy}
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic}
          aria-relevant={relevant}
          aria-describedby={descriptionId}
          className="skeleton-container"
        >
          {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
          <div className="sr-only">{ariaLabel}</div>
        </div>
      </>
    );
  }
);

SkeletonA11y.displayName = 'SkeletonA11y';

export default SkeletonA11y;
