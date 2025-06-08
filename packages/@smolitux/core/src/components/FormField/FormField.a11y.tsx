import React, { useId } from 'react';
import {
  FormField as ValidationFormField,
  FormFieldProps as ValidationFormFieldProps,
} from '../../validation/FormField';

export type FormFieldProps<T = any> = ValidationFormFieldProps<T> & {
  /**
   * Die Größe des Formularfelds
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Die Variante des Formularfelds
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';

  /**
   * Die Ausrichtung des Labels
   */
  labelPlacement?: 'top' | 'left' | 'right';

  /**
   * Die Breite des Labels (nur für labelPlacement="left" oder "right")
   */
  labelWidth?: string | number;

  /**
   * Ob das Label fett sein soll
   */
  labelBold?: boolean;

  /**
   * Ob das Label kursiv sein soll
   */
  labelItalic?: boolean;

  /**
   * Ob das Label unterstrichen sein soll
   */
  labelUnderline?: boolean;

  /**
   * Ob das Label durchgestrichen sein soll
   */
  labelStrikethrough?: boolean;

  /**
   * Ob das Label eine andere Farbe haben soll
   */
  labelColor?: string;

  /**
   * Ob das Label eine andere Schriftgröße haben soll
   */
  labelSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Ob das Label eine andere Schriftfamilie haben soll
   */
  labelFont?: string;

  /**
   * Ob das Label einen anderen Schriftstil haben soll
   */
  labelStyle?: React.CSSProperties;

  /**
   * Ob das Label eine andere CSS-Klasse haben soll
   */
  labelClassName?: string;

  /**
   * Ob das Formularfeld einen Hilfetext haben soll
   */
  helperText?: React.ReactNode;

  /**
   * Ob der Hilfetext eine andere Farbe haben soll
   */
  helperTextColor?: string;

  /**
   * Ob der Hilfetext eine andere Schriftgröße haben soll
   */
  helperTextSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Ob der Hilfetext einen anderen Schriftstil haben soll
   */
  helperTextStyle?: React.CSSProperties;

  /**
   * Ob der Hilfetext eine andere CSS-Klasse haben soll
   */
  helperTextClassName?: string;

  /**
   * Ob das Formularfeld einen Tooltip haben soll
   */
  tooltip?: string;

  /**
   * Ob das Formularfeld einen Hinweis haben soll
   */
  hint?: React.ReactNode;

  /**
   * Ob das Formularfeld einen Rahmen haben soll
   */
  bordered?: boolean;

  /**
   * Ob das Formularfeld einen Schatten haben soll
   */
  shadow?: boolean;

  /**
   * Ob das Formularfeld abgerundete Ecken haben soll
   */
  rounded?: boolean;

  /**
   * Ob das Formularfeld einen Hintergrund haben soll
   */
  background?: boolean;

  /**
   * Ob das Formularfeld gepolstert sein soll
   */
  padding?: boolean;

  /**
   * Ob das Formularfeld die volle Breite einnehmen soll
   */
  fullWidth?: boolean;

  /**
   * Ob das Formularfeld deaktiviert sein soll
   */
  disabled?: boolean;

  /**
   * Ob das Formularfeld schreibgeschützt sein soll
   */
  readOnly?: boolean;

  /**
   * Ob das Formularfeld erforderlich sein soll
   */
  required?: boolean;

  /**
   * Ob das Formularfeld im Ladezustand sein soll
   */
  loading?: boolean;

  /**
   * Ob das Formularfeld einen Ladeindikator anzeigen soll
   */
  showLoadingIndicator?: boolean;

  /**
   * Ob das Formularfeld einen Erfolgsindikator anzeigen soll
   */
  showSuccessIndicator?: boolean;

  /**
   * Ob das Formularfeld einen Fehlerindikator anzeigen soll
   */
  showErrorIndicator?: boolean;

  /**
   * Ob das Formularfeld einen Zähler anzeigen soll
   */
  showCounter?: boolean;

  /**
   * Die maximale Länge des Formularfelds
   */
  maxLength?: number;

  /**
   * Ob das Formularfeld einen Fortschrittsbalken anzeigen soll
   */
  showProgressBar?: boolean;

  /**
   * Der aktuelle Fortschritt des Formularfelds
   */
  progress?: number;

  /**
   * Der maximale Fortschritt des Formularfelds
   */
  progressMax?: number;

  /**
   * Beschreibung des Formularfelds (für Screenreader)
   */
  description?: string;

  /**
   * Ob das Label ausgeblendet werden soll (nur für Screenreader sichtbar)
   */
  hideLabel?: boolean;

  /**
   * Ob der Hilfetext ausgeblendet werden soll (nur für Screenreader sichtbar)
   */
  hideHelperText?: boolean;

  /**
   * Ob die Fehlermeldung ausgeblendet werden soll (nur für Screenreader sichtbar)
   */
  hideError?: boolean;
};

/**
 * Barrierefreie FormField-Komponente
 */
export const FormFieldA11y = <T extends any>({
  size = 'md',
  variant = 'outline',
  labelPlacement = 'top',
  labelWidth,
  labelBold = false,
  labelItalic = false,
  labelUnderline = false,
  labelStrikethrough = false,
  labelColor,
  labelSize,
  labelFont,
  labelStyle,
  labelClassName = '',
  helperText,
  helperTextColor,
  helperTextSize = 'sm',
  helperTextStyle,
  helperTextClassName = '',
  tooltip,
  hint,
  bordered = true,
  shadow = false,
  rounded = true,
  background = false,
  padding = false,
  fullWidth = true,
  disabled = false,
  readOnly = false,
  required = false,
  loading = false,
  showLoadingIndicator = true,
  showSuccessIndicator = true,
  showErrorIndicator = true,
  showCounter = false,
  maxLength,
  showProgressBar = false,
  progress = 0,
  progressMax = 100,
  className = '',
  style,
  component,
  children,
  description,
  hideLabel = false,
  hideHelperText = false,
  hideError = false,
  ...props
}: FormFieldProps<T>) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const fieldId = props.id || `form-field-${uniqueId}`;
  const labelId = `label-${fieldId}`;
  const helperId = `helper-${fieldId}`;
  const errorId = `error-${fieldId}`;
  const descriptionId = description ? `description-${fieldId}` : undefined;
  const counterId = showCounter ? `counter-${fieldId}` : undefined;
  const progressId = showProgressBar ? `progress-${fieldId}` : undefined;

  // Erstelle ein Wrapper-Komponente, die die Validierungs-FormField-Komponente umschließt
  const EnhancedComponent = (componentProps: any) => {
    const { name, value, onChange, onBlur, hasError, errorMessages, touched, dirty, ...restProps } =
      componentProps;

    // CSS-Klassen für das Label
    const labelClasses = [
      hideLabel ? 'sr-only' : 'block',
      labelBold ? 'font-bold' : 'font-medium',
      labelItalic ? 'italic' : '',
      labelUnderline ? 'underline' : '',
      labelStrikethrough ? 'line-through' : '',
      labelColor ? `text-${labelColor}` : 'text-gray-700 dark:text-gray-300',
      labelSize ? `text-${labelSize}` : 'text-sm',
      labelClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // CSS-Klassen für den Hilfetext
    const helperTextClasses = [
      'mt-1',
      helperTextColor ? `text-${helperTextColor}` : 'text-gray-500 dark:text-gray-400',
      helperTextSize ? `text-${helperTextSize}` : 'text-xs',
      helperTextClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // CSS-Klassen für den Fehlertext
    const errorTextClasses = ['mt-1 text-xs text-red-500 dark:text-red-400']
      .filter(Boolean)
      .join(' ');

    // CSS-Klassen für den Container
    const containerClasses = [
      'form-field',
      labelPlacement === 'left' ? 'sm:flex sm:items-start' : '',
      labelPlacement === 'right' ? 'sm:flex sm:flex-row-reverse sm:items-start' : '',
      bordered ? 'border border-gray-300 dark:border-gray-600' : '',
      shadow ? 'shadow-md' : '',
      rounded ? 'rounded-lg' : '',
      background ? 'bg-white dark:bg-gray-800' : '',
      padding ? 'p-4' : '',
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Stil für das Label bei horizontaler Ausrichtung
    const labelStyles = {
      ...labelStyle,
      ...(labelPlacement !== 'top' && labelWidth
        ? { width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth }
        : {}),
    };

    // Erstelle die Komponente mit den erweiterten Props
    const enhancedProps = {
      ...restProps,
      name,
      value,
      onChange,
      onBlur,
      hasError,
      errorMessages,
      size,
      variant,
      disabled: disabled || loading,
      readOnly,
      required,
      isLoading: loading,
      showLoadingIndicator,
      showSuccessIndicator,
      showErrorIndicator,
      showCounter,
      maxLength,
      showProgressBar,
      progress,
      progressMax,
      tooltip,
      isValid: !hasError && touched,
      isInvalid: hasError,
      id: fieldId,
      'aria-labelledby': labelId,
      'aria-describedby':
        [
          helperText && !hasError && !hideHelperText ? helperId : null,
          hasError && errorMessages && errorMessages.length > 0 && !hideError ? errorId : null,
          description ? descriptionId : null,
          showCounter && maxLength ? counterId : null,
          showProgressBar ? progressId : null,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
      'aria-invalid': hasError,
      'aria-required': required,
      'aria-disabled': disabled || loading,
      'aria-readonly': readOnly,
    };

    // Rendere den Zähler
    const renderCounter = () => {
      if (!showCounter || !maxLength) return null;

      const count = value ? String(value).length : 0;
      const isOverLimit = count > maxLength;
      const percent = Math.min(100, Math.round((count / maxLength) * 100));

      return (
        <div className="mt-1 text-xs text-right">
          <span
            id={counterId}
            className={isOverLimit ? 'text-red-500' : 'text-gray-500'}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">
              {isOverLimit
                ? `Zeichenlimit überschritten: ${count} von maximal ${maxLength} Zeichen eingegeben`
                : `${count} von maximal ${maxLength} Zeichen eingegeben (${percent}%)`}
            </span>
            <span aria-hidden="true">
              {count} / {maxLength}
            </span>
          </span>
        </div>
      );
    };

    // Rendere den Fortschrittsbalken
    const renderProgressBar = () => {
      if (!showProgressBar) return null;

      const percent = Math.min(100, (progress / progressMax) * 100);
      const progressLabelId = `${progressId}-label`;

      return (
        <div className="mt-1 w-full">
          <div
            id={progressId}
            className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={progressMax}
            aria-labelledby={progressLabelId}
          >
            <div
              className="h-1 bg-primary-500 dark:bg-primary-400 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span id={progressLabelId} className="sr-only">
            {`Fortschritt: ${Math.round(percent)}%`}
          </span>
        </div>
      );
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

    // Rendere den Ladeindikator
    const renderLoadingIndicator = () => {
      if (!loading || !showLoadingIndicator) return null;

      return (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="sr-only">Lädt...</span>
        </div>
      );
    };

    return (
      <div className={containerClasses} style={style}>
        {/* Label */}
        {props.label && (
          <label id={labelId} htmlFor={fieldId} className={labelClasses} style={labelStyles}>
            {props.label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
            {required && <span className="sr-only">(Erforderlich)</span>}
            {tooltip && (
              <span
                className="ml-1 text-gray-400 cursor-help"
                title={tooltip}
                aria-label={`Tooltip: ${tooltip}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block w-4 h-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </label>
        )}

        {/* Formularfeld */}
        <div className={labelPlacement !== 'top' ? 'sm:flex-1' : ''}>
          <div className="relative">
            {React.createElement(component, enhancedProps, children)}
            {renderLoadingIndicator()}
          </div>

          {/* Hilfetext oder Fehlertext */}
          {(helperText || (hasError && errorMessages && errorMessages.length > 0)) && (
            <div
              className={hasError ? errorTextClasses : helperTextClasses}
              style={helperTextStyle}
              id={hasError ? errorId : helperId}
              role={hasError ? 'alert' : undefined}
            >
              {hasError && errorMessages && errorMessages.length > 0
                ? errorMessages[0]
                : helperText}
            </div>
          )}

          {/* Versteckter Hilfetext oder Fehlertext für Screenreader */}
          {((helperText && hideHelperText && !hasError) ||
            (hasError && errorMessages && errorMessages.length > 0 && hideError)) && (
            <div
              className="sr-only"
              id={hasError ? errorId : helperId}
              role={hasError ? 'alert' : undefined}
            >
              {hasError && errorMessages && errorMessages.length > 0
                ? errorMessages[0]
                : helperText}
            </div>
          )}

          {/* Hinweis */}
          {hint && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</div>}

          {/* Zähler */}
          {renderCounter()}

          {/* Fortschrittsbalken */}
          {renderProgressBar()}

          {/* Versteckte Beschreibung */}
          {renderDescription()}
        </div>
      </div>
    );
  };

  return (
    <ValidationFormField
      component={EnhancedComponent}
      disabled={disabled || loading}
      readOnly={readOnly}
      required={required}
      {...props}
    >
      {children}
    </ValidationFormField>
  );
};

export default FormFieldA11y;
