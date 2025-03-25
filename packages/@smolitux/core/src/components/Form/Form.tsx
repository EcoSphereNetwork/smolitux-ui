import React from 'react';
import { Form as ValidationForm, FormProps as ValidationFormProps } from '../../validation/Form';

export type FormProps = ValidationFormProps & {
  /**
   * Die Ausrichtung der Formularelemente
   */
  layout?: 'vertical' | 'horizontal' | 'inline';
  
  /**
   * Der Abstand zwischen den Formularelementen
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Die Größe der Formularelemente
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Die Variante der Formularelemente
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  
  /**
   * Ob das Formular eine Legende haben soll
   */
  legend?: React.ReactNode;
  
  /**
   * Ob das Formular einen Rahmen haben soll
   */
  bordered?: boolean;
  
  /**
   * Ob das Formular einen Schatten haben soll
   */
  shadow?: boolean;
  
  /**
   * Ob das Formular abgerundete Ecken haben soll
   */
  rounded?: boolean;
  
  /**
   * Ob das Formular einen Hintergrund haben soll
   */
  background?: boolean;
  
  /**
   * Ob das Formular gepolstert sein soll
   */
  padding?: boolean;
  
  /**
   * Ob das Formular die volle Breite einnehmen soll
   */
  fullWidth?: boolean;
  
  /**
   * Ob das Formular deaktiviert sein soll
   */
  disabled?: boolean;
  
  /**
   * Ob das Formular schreibgeschützt sein soll
   */
  readOnly?: boolean;
  
  /**
   * Ob das Formular im Ladezustand sein soll
   */
  loading?: boolean;
  
  /**
   * Ob das Formular einen Ladeindikator anzeigen soll
   */
  showLoadingIndicator?: boolean;
  
  /**
   * Ob das Formular einen Erfolgsindikator anzeigen soll
   */
  showSuccessIndicator?: boolean;
  
  /**
   * Ob das Formular einen Fehlerindikator anzeigen soll
   */
  showErrorIndicator?: boolean;
  
  /**
   * Ob das Formular einen Fortschrittsbalken anzeigen soll
   */
  showProgressBar?: boolean;
  
  /**
   * Der aktuelle Fortschritt des Formulars
   */
  progress?: number;
  
  /**
   * Der maximale Fortschritt des Formulars
   */
  progressMax?: number;
  
  /**
   * Ob das Formular einen Zurücksetzen-Button anzeigen soll
   */
  showResetButton?: boolean;
  
  /**
   * Ob das Formular einen Abbrechen-Button anzeigen soll
   */
  showCancelButton?: boolean;
  
  /**
   * Ob das Formular einen Absenden-Button anzeigen soll
   */
  showSubmitButton?: boolean;
  
  /**
   * Der Text des Zurücksetzen-Buttons
   */
  resetButtonText?: string;
  
  /**
   * Der Text des Abbrechen-Buttons
   */
  cancelButtonText?: string;
  
  /**
   * Der Text des Absenden-Buttons
   */
  submitButtonText?: string;
  
  /**
   * Callback, wenn das Formular zurückgesetzt wird
   */
  onReset?: () => void;
  
  /**
   * Callback, wenn das Formular abgebrochen wird
   */
  onCancel?: () => void;
};

/**
 * Formular-Komponente
 */
export const Form: React.FC<FormProps> = ({
  layout = 'vertical',
  spacing = 'md',
  size = 'md',
  variant = 'outline',
  legend,
  bordered = false,
  shadow = false,
  rounded = true,
  background = false,
  padding = true,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  loading = false,
  showLoadingIndicator = true,
  showSuccessIndicator = true,
  showErrorIndicator = true,
  showProgressBar = false,
  progress = 0,
  progressMax = 100,
  showResetButton = false,
  showCancelButton = false,
  showSubmitButton = true,
  resetButtonText = 'Zurücksetzen',
  cancelButtonText = 'Abbrechen',
  submitButtonText = 'Absenden',
  onReset,
  onCancel,
  className = '',
  style,
  children,
  ...props
}) => {
  // CSS-Klassen für das Layout
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'sm:flex sm:flex-row sm:items-start',
    inline: 'flex flex-row items-center',
  };
  
  // CSS-Klassen für den Abstand
  const spacingClasses = {
    xs: 'space-y-1 sm:space-x-1',
    sm: 'space-y-2 sm:space-x-2',
    md: 'space-y-4 sm:space-x-4',
    lg: 'space-y-6 sm:space-x-6',
    xl: 'space-y-8 sm:space-x-8',
  };
  
  // Basis-Klassen für das Formular
  const formClasses = [
    layoutClasses[layout],
    layout === 'vertical' ? spacingClasses[spacing].split(' ')[0] : '',
    layout === 'horizontal' ? spacingClasses[spacing].split(' ')[1] : '',
    layout === 'inline' ? 'space-x-2' : '',
    bordered ? 'border border-gray-300 dark:border-gray-600' : '',
    shadow ? 'shadow-md' : '',
    rounded ? 'rounded-lg' : '',
    background ? 'bg-white dark:bg-gray-800' : '',
    padding ? 'p-4' : '',
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-60 pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ');
  
  // Zurücksetzen-Handler
  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onReset?.();
    props.resetForm?.();
  };
  
  // Abbrechen-Handler
  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onCancel?.();
  };
  
  return (
    <ValidationForm
      className={formClasses}
      style={style}
      disabled={disabled}
      {...props}
    >
      {legend && (
        <legend className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {legend}
        </legend>
      )}
      
      {showProgressBar && (
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
          <div
            className="h-2 bg-primary-500 dark:bg-primary-400 rounded-full"
            style={{ width: `${Math.min(100, (progress / progressMax) * 100)}%` }}
          />
        </div>
      )}
      
      {/* Formularinhalt */}
      <div className={layout === 'vertical' ? 'space-y-4' : ''}>
        {children}
      </div>
      
      {/* Formular-Buttons */}
      {(showResetButton || showCancelButton || showSubmitButton) && (
        <div className="flex justify-end space-x-2 mt-6">
          {showResetButton && (
            <button
              type="reset"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              onClick={handleReset}
            >
              {resetButtonText}
            </button>
          )}
          
          {showCancelButton && (
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              onClick={handleCancel}
            >
              {cancelButtonText}
            </button>
          )}
          
          {showSubmitButton && (
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-500 border border-transparent rounded-md shadow-sm hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              disabled={loading || disabled || readOnly}
            >
              {loading && showLoadingIndicator ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {submitButtonText}
                </span>
              ) : (
                submitButtonText
              )}
            </button>
          )}
        </div>
      )}
    </ValidationForm>
  );
};

export default Form;