// packages/@smolitux/core/src/components/Spinner/Spinner.tsx
import React, { forwardRef } from 'react';
import './Spinner.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Größe des Spinners */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Variante des Spinners */
  variant?: 'border' | 'grow' | 'dots' | 'ring';
  /** Farbe des Spinners */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  /** Geschwindigkeit der Animation (in Sekunden) */
  speed?: number;
  /** Label für Screenreader */
  label?: string;
  /** Zentriert den Spinner im Container */
  centered?: boolean;
  /** Zeigt einen Text unter dem Spinner an */
  text?: string;
  /** Volle Breite des Containers */
  fullWidth?: boolean;
}

/**
 * Spinner-Komponente für Ladezustände
 *
 * @example
 * ```tsx
 * <Spinner size="md" variant="border" color="primary" />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'border',
      color = 'primary',
      speed,
      label = 'Wird geladen...',
      centered = false,
      text,
      fullWidth = false,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    // Größen-spezifische Klassen
    const sizeClasses = {
      xs: 'smolitux-spinner--xs',
      sm: 'smolitux-spinner--sm',
      md: 'smolitux-spinner--md',
      lg: 'smolitux-spinner--lg',
      xl: 'smolitux-spinner--xl',
    };

    // Varianten-spezifische Klassen
    const variantClasses = {
      border: 'smolitux-spinner--border',
      grow: 'smolitux-spinner--grow',
      dots: 'smolitux-spinner--dots',
      ring: 'smolitux-spinner--ring',
    };

    // Farb-spezifische Klassen
    const colorClasses = {
      primary: 'smolitux-spinner--primary',
      secondary: 'smolitux-spinner--secondary',
      success: 'smolitux-spinner--success',
      danger: 'smolitux-spinner--danger',
      warning: 'smolitux-spinner--warning',
      info: 'smolitux-spinner--info',
      light: 'smolitux-spinner--light',
      dark: 'smolitux-spinner--dark',
    };

    // Benutzerdefinierte Animation-Geschwindigkeit
    const customStyle = {
      ...style,
      ...(speed ? ({ '--spinner-animation-duration': `${speed}s` } as React.CSSProperties) : {}),
    };

    // Container-Klassen
    const containerClasses = [
      'smolitux-spinner-container',
      centered && 'smolitux-spinner-container--centered',
      fullWidth && 'smolitux-spinner-container--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Spinner-Klassen
    const spinnerClasses = [
      'smolitux-spinner',
      sizeClasses[size],
      variantClasses[variant],
      colorClasses[color],
    ]
      .filter(Boolean)
      .join(' ');

    // Render-Logik für verschiedene Varianten
    const renderSpinner = () => {
      switch (variant) {
        case 'dots':
          return (
            <div className={spinnerClasses} style={customStyle} aria-hidden="true">
              <div className="smolitux-spinner-dot"></div>
              <div className="smolitux-spinner-dot"></div>
              <div className="smolitux-spinner-dot"></div>
            </div>
          );
        case 'ring':
          return (
            <div className={spinnerClasses} style={customStyle} aria-hidden="true">
              <div className="smolitux-spinner-ring"></div>
            </div>
          );
        default:
          return <div className={spinnerClasses} style={customStyle} aria-hidden="true"></div>;
      }
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...rest}
      >
        {renderSpinner()}
        {text && (
          <div className="smolitux-spinner-text" aria-hidden="true">
            {text}
          </div>
        )}
        <span className="smolitux-spinner-sr-only" aria-atomic="true">
          {label}
        </span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
