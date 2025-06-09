// TODO: forwardRef hinzufügen
import React from 'react';
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
};

/**
 * FormField-Komponente
 */
export const FormField = <T extends any>({
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
  ...props
}: FormFieldProps<T>) => {
  // Erstelle ein Wrapper-Komponente, die die Validierungs-FormField-Komponente umschließt
  const EnhancedComponent = (componentProps: any) => {
    const { name, value, onChange, onBlur, hasError, errorMessages, touched, dirty, ...restProps } =
      componentProps;

    // CSS-Klassen für das Label
    const labelClasses = [
      'block',
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
    };

    return (
      <div className={containerClasses} style={style}>
        {/* Label */}
        {props.label && (
          <label htmlFor={props.id || name} className={labelClasses} style={labelStyles}>
            {props.label}
            {required && <span className="text-red-500 ml-1">*</span>}
            {tooltip && (
              <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block w-4 h-4"
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
          {React.createElement(component, enhancedProps, children)}

          {/* Hilfetext oder Fehlertext */}
          {(helperText || hasError) && (
            <div
              className={hasError ? errorTextClasses : helperTextClasses}
              style={helperTextStyle}
            >
              {hasError && errorMessages && errorMessages.length > 0
                ? errorMessages[0]
                : helperText}
            </div>
          )}

          {/* Hinweis */}
          {hint && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</div>}

          {/* Zähler */}
          {showCounter && maxLength && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
              {value ? String(value).length : 0} / {maxLength}
            </div>
          )}

          {/* Fortschrittsbalken */}
          {showProgressBar && (
            <div className="mt-1 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-1 bg-primary-500 dark:bg-primary-400 rounded-full"
                style={{ width: `${Math.min(100, (progress / progressMax) * 100)}%` }}
              />
            </div>
          )}
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

export default FormField;
