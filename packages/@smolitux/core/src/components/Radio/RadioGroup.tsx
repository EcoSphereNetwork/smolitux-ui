import React, { createContext, forwardRef, useMemo } from 'react';
import { useFormControl } from '../FormControl';

export interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: React.ReactNode;
  isInvalid?: boolean;
  isValid?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  getRadioId?: (value: string) => string;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
  /** Name für alle Radio-Buttons in der Gruppe */
  name: string;
  /** Aktuell ausgewählter Wert */
  value?: string;
  /** Callback bei Änderung der Auswahl */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Ob die Gruppe deaktiviert ist */
  disabled?: boolean;
  /** Ob die Gruppe erforderlich ist */
  required?: boolean;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Label für die Gruppe */
  label?: React.ReactNode;
  /** Größe der Radio-Buttons */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Layout der Gruppe */
  layout?: 'vertical' | 'horizontal';
  /** Kinder-Komponenten */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ob die Gruppe gültig ist */
  isValid?: boolean;
  /** Ob die Gruppe ungültig ist */
  isInvalid?: boolean;
  /** Ob die Gruppe erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob die Gruppe im Ladezustand ist */
  isLoading?: boolean;
  /** Ob die Gruppe als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob die Gruppe als Button angezeigt werden soll */
  isButton?: boolean;
  /** Farbe der Radio-Buttons */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  /** Ob das Label ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideLabel?: boolean;
  /** Ob der Hilfetext ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideHelperText?: boolean;
  /** Ob die Fehlermeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideError?: boolean;
  /** Ob die Erfolgsmeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideSuccessMessage?: boolean;
  /** Zusätzliche CSS-Klassen für das Label */
  labelClassName?: string;
  /** Zusätzliche CSS-Klassen für den Hilfetext */
  helperTextClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fehlermeldung */
  errorClassName?: string;
  /** Zusätzliche CSS-Klassen für die Erfolgsmeldung */
  successClassName?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Beschreibung für die Gruppe (für Screenreader) */
  description?: string;
  /** ID für die Gruppe */
  id?: string;
}

/**
 * RadioGroup-Komponente für die Gruppierung von Radio-Buttons
 * 
 * @example
 * ```tsx
 * <RadioGroup 
 *   name="options" 
 *   label="Wählen Sie eine Option"
 *   value={selectedOption}
 *   onChange={(e) => setSelectedOption(e.target.value)}
 * >
 *   <Radio value="option1" label="Option 1" />
 *   <Radio value="option2" label="Option 2" />
 *   <Radio value="option3" label="Option 3" />
 * </RadioGroup>
 * 
 * <RadioGroup 
 *   name="layout" 
 *   label="Layout-Optionen"
 *   layout="horizontal"
 *   isCard
 * >
 *   <Radio value="grid" label="Grid" />
 *   <Radio value="list" label="Liste" />
 *   <Radio value="table" label="Tabelle" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  name,
  value,
  onChange,
  disabled,
  required,
  error,
  helperText,
  successMessage,
  label,
  size = 'md',
  layout = 'vertical',
  children,
  className = '',
  isValid = false,
  isInvalid = false,
  isSuccess = false,
  isLoading = false,
  isCard = false,
  isButton = false,
  colorScheme = 'primary',
  hideLabel = false,
  hideHelperText = false,
  hideError = false,
  hideSuccessMessage = false,
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  containerClassName = '',
  labelTooltip,
  description,
  id,
}, ref) => {
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Kombiniere Props mit FormControl-Context
  const _id = id || formControl.id || `radio-group-${Math.random().toString(36).substring(2, 9)}`;
  const _disabled = disabled ?? formControl.disabled;
  const _required = required ?? formControl.required;
  const _error = error || (formControl.hasError ? 'Ungültige Eingabe' : undefined);
  const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
  const _isValid = isValid || formControl.isValid;
  const _isSuccess = isSuccess || formControl.isSuccess;
  const _isLoading = isLoading || formControl.isLoading;
  
  // Generiere eindeutige IDs für Radio-Buttons
  const getRadioId = (radioValue: string) => `${_id}-${radioValue}`;
  
  // Context-Wert für RadioGroup
  const contextValue = useMemo(() => ({
    name,
    value,
    onChange,
    disabled: _disabled,
    required: _required,
    error: _error,
    isInvalid: _isInvalid,
    isValid: _isValid,
    isSuccess: _isSuccess,
    isLoading: _isLoading,
    size,
    getRadioId
  }), [name, value, onChange, _disabled, _required, _error, _isInvalid, _isValid, _isSuccess, _isLoading, size, _id]);
  
  // Bestimme die ARIA-Attribute für die RadioGroup
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};
    
    if (description) {
      attributes['aria-describedby'] = `${_id}-description`;
    }
    
    if (_error) {
      attributes['aria-errormessage'] = `${_id}-error`;
      attributes['aria-invalid'] = 'true';
    }
    
    if (helperText && !_error) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${_id}-helper` : `${_id}-helper`);
    }
    
    if (successMessage) {
      attributes['aria-describedby'] = (attributes['aria-describedby'] ? `${attributes['aria-describedby']} ${_id}-success` : `${_id}-success`);
    }
    
    return attributes;
  };
  
  // Rendere das Label
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <div className={`${hideLabel ? 'sr-only' : ''} mb-2`}>
        <div 
          id={`${_id}-label`}
          className={`text-base font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
          title={labelTooltip}
        >
          {label}
          {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          {_required && <span className="sr-only">(Erforderlich)</span>}
        </div>
      </div>
    );
  };
  
  // Rendere Hilfetext, Fehlermeldung oder Erfolgsmeldung
  const renderHelperText = () => {
    if (!_error && !helperText && !successMessage) return null;
    
    return (
      <div className="mt-2 text-sm">
        {_error && !hideError ? (
          <p 
            id={`${_id}-error`} 
            className={`text-red-600 dark:text-red-400 ${errorClassName}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {_error}
          </p>
        ) : successMessage && !hideSuccessMessage ? (
          <p 
            id={`${_id}-success`} 
            className={`text-green-600 dark:text-green-400 ${successClassName}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {successMessage}
          </p>
        ) : helperText && !hideHelperText ? (
          <p 
            id={`${_id}-helper`} 
            className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            aria-live="polite"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  };
  
  // Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div 
        id={`${_id}-description`} 
        className="sr-only"
        aria-hidden="false"
      >
        {description}
      </div>
    );
  };
  
  return (
    <div 
      ref={ref}
      className={`${containerClassName} ${className}`}
      role="radiogroup"
      id={_id}
      aria-labelledby={label ? `${_id}-label` : undefined}
      {...getAriaAttributes()}
    >
      {renderDescription()}
      {renderLabel()}
      
      <div className={`${layout === 'horizontal' ? 'flex flex-row space-x-4' : 'flex flex-col space-y-2'}`}>
        <RadioGroupContext.Provider value={contextValue}>
          {children}
        </RadioGroupContext.Provider>
      </div>
      
      {renderHelperText()}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';