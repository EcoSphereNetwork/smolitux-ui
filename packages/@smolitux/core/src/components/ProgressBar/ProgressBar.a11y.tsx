// packages/@smolitux/core/src/components/ProgressBar/ProgressBar.a11y.tsx
import React, { forwardRef, useId } from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aktueller Wert (0-100) */
  value: number;
  /** Maximaler Wert (Default: 100) */
  max?: number;
  /** Minimaler Wert (Default: 0) */
  min?: number;
  /** Label anzeigen */
  showLabel?: boolean;
  /** Label-Format */
  labelFormat?: 'percentage' | 'value' | 'valueAndMax';
  /** Benutzerdefiniertes Label */
  label?: React.ReactNode;
  /** Variante des ProgressBars */
  variant?: 'default' | 'striped' | 'animated';
  /** Größe des ProgressBars */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Farbe des ProgressBars */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Radius des ProgressBars */
  rounded?: boolean;
  /** ProgressBar-Stil */
  appearance?: 'solid' | 'gradient';
  /** Invertierter Fortschritt (von rechts nach links) */
  inverted?: boolean;
  /** Indeterminate-Status (für unbekannten Fortschritt) */
  indeterminate?: boolean;
  /** ARIA-Label für den ProgressBar */
  ariaLabel?: string;
  /** Custom ARIA valuetext */
  ariaValuetext?: string;
  /** Beschreibung für den ProgressBar (für Screenreader) */
  description?: string;
  /** Ob der Fortschritt live aktualisiert wird */
  liveUpdate?: boolean;
  /** Ob der Fortschritt als Text für Screenreader angezeigt werden soll */
  showTextValue?: boolean;
  /** Benutzerdefiniertes Textformat für Screenreader */
  textValueFormat?: string;
  /** Ob Fortschritt angekündigt werden soll */
  announceProgress?: boolean;
  /** Format für Fortschrittsankündigungen */
  announceFormat?: string;
}

/**
 * Barrierefreie ProgressBar-Komponente zum Anzeigen von Fortschritten
 *
 * @example
 * ```tsx
 * <ProgressBarA11y
 *   value={75}
 *   ariaLabel="Ladefortschritt"
 *   description="Datei wird hochgeladen"
 * />
 * ```
 */
export const ProgressBarA11y = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      min = 0,
      showLabel = false,
      labelFormat = 'percentage',
      label,
      variant = 'default',
      size = 'md',
      color = 'primary',
      rounded = true,
      appearance = 'solid',
      inverted = false,
      indeterminate = false,
      className = '',
      ariaLabel,
      ariaValuetext,
      description,
      liveUpdate = true,
      showTextValue = true,
      textValueFormat = '{value}%',
      announceProgress = false,
      announceFormat,
      ...rest
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const progressId = rest.id || `progressbar-${uniqueId}`;
    const labelId = `label-${progressId}`;
    const descriptionId = description ? `description-${progressId}` : undefined;
    const valueTextId = (showTextValue || announceProgress) ? `value-text-${progressId}` : undefined;

    // Berechnung des Prozentsatzes
    const calculatePercentage = () => {
      if (indeterminate) return 0;

      // Sicherstellen, dass der Wert im gültigen Bereich liegt
      const clampedValue = Math.max(min, Math.min(max, value));
      const range = max - min;
      if (range <= 0) return 0;

      return ((clampedValue - min) / range) * 100;
    };

    // Formatierung des Labels
    const getLabel = () => {
      if (label) return label;

      const percentage = calculatePercentage();

      switch (labelFormat) {
        case 'percentage':
          return `${Math.round(percentage)}%`;
        case 'value':
          return `${value}`;
        case 'valueAndMax':
          return `${value} / ${max}`;
        default:
          return `${Math.round(percentage)}%`;
      }
    };

    // Formatierung des Textwerts für Screenreader
    const getTextValue = () => {
      if (!showTextValue && !announceProgress) return null;

      const percentage = calculatePercentage();
      
      // Use announceFormat if provided and announceProgress is true
      if (announceProgress && announceFormat) {
        return announceFormat
          .replace('{value}', Math.round(percentage).toString())
          .replace('{rawValue}', value.toString())
          .replace('{min}', min.toString())
          .replace('{max}', max.toString());
      }

      return textValueFormat
        .replace('{value}', Math.round(percentage).toString())
        .replace('{rawValue}', value.toString())
        .replace('{min}', min.toString())
        .replace('{max}', max.toString());
    };

    // Get the aria-valuetext value
    const getAriaValueText = () => {
      if (ariaValuetext) return ariaValuetext;
      return getTextValue();
    };

    // Größen-spezifische Klassen
    const sizeClasses = {
      xs: 'h-1',
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    };

    // Farben-spezifische Klassen
    const colorClasses = {
      primary: 'bg-primary-500 dark:bg-primary-600',
      secondary: 'bg-secondary-500 dark:bg-secondary-600',
      success: 'bg-green-500 dark:bg-green-600',
      warning: 'bg-yellow-500 dark:bg-yellow-600',
      error: 'bg-red-500 dark:bg-red-600',
      info: 'bg-blue-500 dark:bg-blue-600',
    };

    // Aussehen-spezifische Klassen
    const appearanceClasses = {
      solid: '',
      gradient:
        color === 'primary'
          ? 'bg-gradient-to-r from-primary-400 to-primary-600'
          : color === 'secondary'
            ? 'bg-gradient-to-r from-secondary-400 to-secondary-600'
            : color === 'success'
              ? 'bg-gradient-to-r from-green-400 to-green-600'
              : color === 'warning'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                : color === 'error'
                  ? 'bg-gradient-to-r from-red-400 to-red-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-600',
    };

    // Varianten-spezifische Klassen und Stile
    const getVariantStyles = () => {
      switch (variant) {
        case 'striped':
          return 'bg-stripes';
        case 'animated':
          return 'bg-stripes animate-progress-stripes';
        default:
          return '';
      }
    };

    // Container-Klassen
    const containerClasses = [
      'w-full overflow-hidden bg-gray-200 dark:bg-gray-700',
      sizeClasses[size],
      rounded ? 'rounded-full' : 'rounded',
      className,
    ].join(' ');

    // Progress-Klassen
    const progressClasses = [
      colorClasses[color],
      appearanceClasses[appearance],
      getVariantStyles(),
      indeterminate ? 'animate-progress-indeterminate' : '',
      'h-full transition-all duration-300 ease-in-out',
    ].join(' ');

    // Fortschritt-Stil berechnen
    const progressStyle = {
      width: indeterminate ? '50%' : `${calculatePercentage()}%`,
      ...(inverted ? { marginLeft: 'auto' } : {}),
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

    // Rendere den versteckten Textwert für Screenreader
    const renderTextValue = () => {
      if (!showTextValue && !announceProgress) return null;

      return (
        <div
          id={valueTextId}
          className="sr-only"
          aria-live={liveUpdate ? 'polite' : 'off'}
          aria-atomic="true"
        >
          {getTextValue()}
        </div>
      );
    };

    // The rest props are already filtered since we destructured all custom props above
    const domProps = rest;

    return (
      <div className="w-full">
        {renderDescription()}
        {renderTextValue()}

        {/* Label über der Fortschrittsleiste, wenn showLabel=true */}
        {showLabel && (
          <div id={labelId} className="flex justify-between mb-1 text-xs font-medium">
            <span>{getLabel()}</span>
          </div>
        )}

        {/* Fortschrittsleiste */}
        <div
          ref={ref}
          id={progressId}
          className={containerClasses}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : Math.max(min, Math.min(max, value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={getAriaValueText() || undefined}
          aria-label={ariaLabel}
          aria-labelledby={showLabel ? labelId : undefined}
          aria-describedby={[descriptionId, valueTextId].filter(Boolean).join(' ') || undefined}
          data-testid="progressbar"
          {...domProps}
        >
          <div data-testid="progress-fill" className={progressClasses} style={progressStyle}></div>
        </div>

        {/* Animation-Stile */}
        <style>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
        
        @keyframes progress-stripes {
          0% { background-position: 1rem 0; }
          100% { background-position: 0 0; }
        }
        
        .animate-progress-stripes {
          animation: progress-stripes 1s linear infinite;
        }
        
        @keyframes progress-indeterminate {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        
        .animate-progress-indeterminate {
          position: relative;
          animation: progress-indeterminate 1.5s ease infinite;
        }
      `}</style>
      </div>
    );
  }
);

ProgressBarA11y.displayName = 'ProgressBarA11y';

export default ProgressBarA11y;
