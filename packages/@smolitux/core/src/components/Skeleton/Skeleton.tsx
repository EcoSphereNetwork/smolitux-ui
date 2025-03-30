// packages/@smolitux/core/src/components/Skeleton/Skeleton.tsx
import React, { forwardRef } from 'react';
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
}

/**
 * Skeleton-Komponente für Ladezustände
 * 
 * @example
 * ```tsx
 * <Skeleton variant="text" width={200} height={20} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  width,
  height,
  variant = 'text',
  animation = 'pulse',
  count = 1,
  gap = 8,
  className = '',
  ...rest
}, ref) => {
  // Bestimme die Varianten-spezifischen Klassen
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-md'
  };

  // Bestimme die Animations-Klassen
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-skeleton-wave',
    none: ''
  };

  // Generiere die Basis-Klassen für ein einzelnes Skeleton-Element
  const skeletonClasses = [
    'bg-gray-200 dark:bg-gray-700',
    variantClasses[variant],
    animationClasses[animation],
    className
  ].filter(Boolean).join(' ');

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

  // Renderfunktion für ein einzelnes Skeleton-Element
  const renderSkeleton = (index: number) => (
    <div
      key={index}
      className={skeletonClasses}
      style={{
        ...baseStyle,
        ...(index > 0 ? { marginTop: `${gap}px` } : {})
      }}
      {...(index === 0 ? rest : {})}
      ref={index === 0 ? ref : undefined}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={rest['aria-label'] || `Lädt Inhalt ${index + 1}${count > 1 ? ` von ${count}` : ''}`}
    />
  );

  // Rendere mehrere Skeleton-Elemente, wenn count > 1
  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
      </>
    );
  }

  // Rendere ein einzelnes Skeleton-Element
  return renderSkeleton(0);
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
