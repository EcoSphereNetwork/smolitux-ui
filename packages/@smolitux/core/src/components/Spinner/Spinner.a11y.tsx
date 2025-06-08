// packages/@smolitux/core/src/components/Spinner/Spinner.a11y.tsx
import React, { forwardRef, useId } from 'react';
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
  /** ARIA-Label für den Spinner */
  ariaLabel?: string;
  /** Beschreibung für den Spinner (für Screenreader) */
  description?: string;
  /** Ob der Spinner als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob der Spinner als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob der Spinner als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob der Spinner als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

/**
 * Barrierefreie Spinner-Komponente für Ladezustände
 *
 * @example
 * ```tsx
 * <SpinnerA11y
 *   size="md"
 *   variant="border"
 *   color="primary"
 *   ariaLabel="Daten werden geladen"
 * />
 * ```
 */
export const SpinnerA11y = forwardRef<HTMLDivElement, SpinnerProps>(
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
      ariaLabel,
      description,
      busy = true,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      ...rest
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const spinnerId = rest.id || `spinner-${uniqueId}`;
    const labelId = `label-${spinnerId}`;
    const descriptionId = description ? `description-${spinnerId}` : undefined;
    const textId = text ? `text-${spinnerId}` : undefined;

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

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    return (
      <>
        {renderDescription()}
        <div
          ref={ref}
          id={spinnerId}
          className={containerClasses}
          role="status"
          aria-label={ariaLabel || label}
          aria-busy={busy}
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic}
          aria-relevant={relevant}
          aria-describedby={descriptionId}
          {...rest}
        >
          {renderSpinner()}

          {text && (
            <div id={textId} className="smolitux-spinner-text">
              {text}
            </div>
          )}

          <span id={labelId} className="smolitux-spinner-sr-only">
            {label}
          </span>
        </div>
      </>
    );
  }
);

SpinnerA11y.displayName = 'SpinnerA11y';

export default SpinnerA11y;
