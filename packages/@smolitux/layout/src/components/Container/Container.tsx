// packages/@smolitux/layout/src/components/Container/Container.tsx
import React, { forwardRef } from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveProp<T> = T | { [key in Breakpoint]?: T };

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximale Breite des Containers */
  maxWidth?: ResponsiveProp<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none'>;
  /** Horizontales Padding deaktivieren */
  disableGutters?: boolean;
  /** Container auf Bildschirmhöhe setzen */
  fullHeight?: boolean;
  /** Content innerhalb des Containers zentrieren */
  centerContent?: boolean;
}

/**
 * Container-Komponente für konsistentes Layout in verschiedenen Breakpoints
 * 
 * @example
 * ```tsx
 * <Container maxWidth="lg">
 *   <h1>Meine Seite</h1>
 *   <p>Inhalt, der auf verschiedenen Bildschirmgrößen konsistent angezeigt wird</p>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(({
  maxWidth = 'lg',
  disableGutters = false,
  fullHeight = false,
  centerContent = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const getResponsiveClass = <T extends string | number>(
    prop: ResponsiveProp<T> | undefined,
    map: Record<string, string>
  ) => {
    if (prop === undefined) return '';
    if (typeof prop === 'object') {
      return Object.entries(prop)
        .map(([bp, val]) => `${bp}:${map[val as string]}`)
        .join(' ');
    }
    return map[prop as string];
  };
  // Maximale Breiten-Klassen entsprechend der maxWidth-Prop
  const maxWidthClasses = {
    xs: 'max-w-sm', // 640px
    sm: 'max-w-md', // 768px
    md: 'max-w-lg', // 1024px
    lg: 'max-w-3xl', // 1280px
    xl: 'max-w-5xl', // 1536px
    '2xl': 'max-w-7xl', // 1920px
    full: 'max-w-full',
    none: ''
  };

  // Basis-Klassen
  const containerClasses = [
    // Basis-Container-Klassen
    'w-full mx-auto',

    // Max-Width basierend auf der Prop
    getResponsiveClass(maxWidth, maxWidthClasses),
    
    // Gutters (horizontales Padding)
    disableGutters ? '' : 'px-4 sm:px-6 md:px-8',
    
    // Vollständige Höhe
    fullHeight ? 'h-full' : '',
    
    // Content zentrieren (flexbox)
    centerContent ? 'flex flex-col items-center justify-center' : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={containerClasses}
      {...rest}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;
