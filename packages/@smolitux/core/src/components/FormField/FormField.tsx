import React from 'react';
import {
  FormField as ValidationFormField,
  FormFieldProps as ValidationFormFieldProps,
} from '../../validation/FormField';

export type FormFieldProps<T = unknown> = ValidationFormFieldProps<T> & {
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
export const FormField = <T,>({
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
  const EnhancedComponent = (componentProps: Record<string, unknown>) => {
    const {
      name,
      value,
      onChange,
      onBlur,
      hasError,
      errorMessages,
      touched,
      ...restProps
    } = componentProps as ValidationFormFieldProps<T> & Record<string, unknown>;

    const inputProps = { ...restProps } as Record<string, unknown>;
    delete inputProps.labelPlacement;
    delete inputProps.labelWidth;
    delete inputProps.labelBold;
    delete inputProps.labelItalic;
    delete inputProps.labelUnderline;
    delete inputProps.labelStrikethrough;
    delete inputProps.labelColor;
    delete inputProps.labelSize;
    delete inputProps.labelStyle;
    delete inputProps.labelClassName;
    delete inputProps.helperText;
    delete inputProps.helperTextColor;
    delete inputProps.helperTextSize;
    delete inputProps.helperTextStyle;
    delete inputProps.helperTextClassName;
    delete inputProps.hint;
    delete inputProps.bordered;
    delete inputProps.shadow;
    delete inputProps.rounded;
    delete inputProps.background;
    delete inputProps.padding;
    delete inputProps.fullWidth;
    delete inputProps.className;
    delete inputProps.style;
    delete inputProps.component;
    delete inputProps.children;

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

    const helperTextClasses = [
      'mt-1',
      helperTextColor ? `text-${helperTextColor}` : 'text-gray-500 dark:text-gray-400',
      helperTextSize ? `text-${helperTextSize}` : 'text-xs',
      helperTextClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const errorTextClasses = ['mt-1 text-xs text-red-500 dark:text-red-400'].join(' ');

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

    const labelStyles = {
      ...labelStyle,
      ...(labelPlacement !== 'top' && labelWidth
        ? { width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth }
        : {}),
    } as React.CSSProperties;

    const enhancedProps = {
      ...inputProps,
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
      <div className={containerClasses} style={style} data-testid="form-field">
        {props.label && (
          <label htmlFor={props.id || name} className={labelClasses} style={labelStyles} data-testid="label">
            {props.label as React.ReactNode}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
            {tooltip && (
              <span className="ml-1 text-gray-400 cursor-help" title={tooltip} aria-hidden="true">
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

        <div className={labelPlacement !== 'top' ? 'sm:flex-1' : ''}>
          {React.createElement(component, enhancedProps, children)}

          {(helperText || hasError) && (
            <div
              className={hasError ? errorTextClasses : helperTextClasses}
              style={helperTextStyle}
              data-testid={hasError ? 'error-message' : 'helper-text'}
            >
              {hasError && errorMessages && errorMessages.length > 0 ? errorMessages[0] : helperText}
            </div>
          )}

          {hint && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</div>}

          {showCounter && maxLength && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
              {value ? String(value).length : 0} / {maxLength}
            </div>
          )}

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
