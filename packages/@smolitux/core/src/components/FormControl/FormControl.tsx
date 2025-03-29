import React, { forwardRef, createContext, useContext, useMemo } from 'react';

// Context für FormControl
export interface FormControlContextType {
  /** Ist das Formularfeld deaktiviert? */
  disabled?: boolean;
  /** Ist das Formularfeld erforderlich? */
  required?: boolean;
  /** Hat das Formularfeld einen Fehler? */
  hasError?: boolean;
  /** Eindeutige ID für das Formularfeld */
  id?: string;
  /** Label für das Formularfeld */
  label?: string;
  /** Name des Formularfelds */
  name?: string;
  /** Größe des Formularfelds */
  size?: FormControlSize;
  /** Ist das Formularfeld schreibgeschützt? */
  readOnly?: boolean;
  /** Ist das Formularfeld im Fokus? */
  isFocused?: boolean;
  /** Ist das Formularfeld gültig? */
  isValid?: boolean;
  /** Ist das Formularfeld ungültig? */
  isInvalid?: boolean;
  /** Ist das Formularfeld erfolgreich validiert? */
  isSuccess?: boolean;
  /** Ist das Formularfeld im Ladezustand? */
  isLoading?: boolean;
}

export type FormControlSize = 'xs' | 'sm' | 'md' | 'lg';
export type FormControlVariant = 'default' | 'filled' | 'outlined' | 'unstyled';
export type FormControlLabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'floating';

const FormControlContext = createContext<FormControlContextType | undefined>(undefined);

/**
 * Hook zum Zugriff auf den FormControl-Context
 * 
 * @example
 * ```tsx
 * const CustomInput = () => {
 *   const { disabled, required, hasError, id } = useFormControl();
 *   
 *   return (
 *     <input 
 *       id={id}
 *       disabled={disabled}
 *       required={required}
 *       aria-invalid={hasError}
 *     />
 *   );
 * };
 * ```
 */
export const useFormControl = () => {
  const context = useContext(FormControlContext);
  if (!context) {
    return {
      disabled: false,
      required: false,
      hasError: false,
      id: undefined,
      label: undefined,
      name: undefined,
      size: 'md' as FormControlSize,
      readOnly: false,
      isFocused: false,
      isValid: false,
      isInvalid: false,
      isSuccess: false,
      isLoading: false
    };
  }
  return context;
};

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ist das Formularfeld deaktiviert? */
  disabled?: boolean;
  /** Ist das Formularfeld erforderlich? */
  required?: boolean;
  /** Hilfetexzt */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Label für das Formularfeld */
  label?: React.ReactNode;
  /** Eindeutige ID für das Formularfeld */
  id?: string;
  /** Name des Formularfelds */
  name?: string;
  /** Position des Labels */
  labelPosition?: FormControlLabelPosition;
  /** Volle Breite */
  fullWidth?: boolean;
  /** Label-Breite bei horizontaler Anordnung */
  labelWidth?: number | string;
  /** Größe des Formularfelds */
  size?: FormControlSize;
  /** Variante des Formularfelds */
  variant?: FormControlVariant;
  /** Ist das Formularfeld schreibgeschützt? */
  readOnly?: boolean;
  /** Ist das Formularfeld im Ladezustand? */
  isLoading?: boolean;
  /** Ist das Formularfeld gültig? */
  isValid?: boolean;
  /** Ist das Formularfeld ungültig? */
  isInvalid?: boolean;
  /** Ist das Formularfeld erfolgreich validiert? */
  isSuccess?: boolean;
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
  /** Zusätzliche CSS-Klassen für den Formularfeld-Container */
  fieldContainerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für das Formularfeld */
  fieldTooltip?: string;
  /** Beschreibung für das Formularfeld (für Screenreader) */
  description?: string;
  /** Ob das Label ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideLabel?: boolean;
  /** Ob der Hilfetext ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideHelperText?: boolean;
  /** Ob die Fehlermeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideError?: boolean;
  /** Ob die Erfolgsmeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideSuccessMessage?: boolean;
  /** Ob das Formularfeld einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob das Formularfeld abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob das Formularfeld einen Schatten haben soll */
  shadow?: boolean;
  /** Ob das Formularfeld einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob das Formularfeld einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob das Formularfeld einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob das Formularfeld einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob das Formularfeld einen Tooltip haben soll */
  tooltip?: string;
  /** Ob das Formularfeld einen Asterisk für erforderliche Felder anzeigen soll */
  showRequiredIndicator?: boolean;
  /** Ob das Formularfeld einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob das Formularfeld einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob das Formularfeld einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob das Formularfeld einen Validierungsindikator anzeigen soll */
  showValidationIndicator?: boolean;
  /** Ob das Formularfeld einen Zähler anzeigen soll */
  showCounter?: boolean;
  /** Aktueller Wert für den Zähler */
  counterValue?: number;
  /** Maximaler Wert für den Zähler */
  counterMax?: number;
  /** Ob das Formularfeld einen Fortschrittsbalken anzeigen soll */
  showProgressBar?: boolean;
  /** Aktueller Wert für den Fortschrittsbalken */
  progressValue?: number;
  /** Maximaler Wert für den Fortschrittsbalken */
  progressMax?: number;
}

/**
 * FormControl-Komponente als Container für Formularelemente
 * 
 * @example
 * ```tsx
 * <FormControl 
 *   label="Email" 
 *   helperText="Ihre geschäftliche Email-Adresse" 
 *   error="Ungültiges Email-Format"
 * >
 *   <Input type="email" />
 * </FormControl>
 * 
 * <FormControl 
 *   label="Passwort"
 *   required
 *   labelPosition="floating"
 *   showCounter
 *   counterValue={password.length}
 *   counterMax={20}
 * >
 *   <Input type="password" />
 * </FormControl>
 * 
 * <FormControl 
 *   label="Profilbild"
 *   isLoading={uploading}
 *   showProgressBar
 *   progressValue={uploadProgress}
 *   progressMax={100}
 * >
 *   <FileUpload />
 * </FormControl>
 * ```
 */
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(({
  disabled = false,
  required = false,
  helperText,
  error,
  successMessage,
  label,
  id,
  name,
  labelPosition = 'top',
  fullWidth = false,
  labelWidth = '33%',
  size = 'md',
  variant = 'default',
  readOnly = false,
  isLoading = false,
  isValid = false,
  isInvalid = false,
  isSuccess = false,
  className = '',
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  containerClassName = '',
  fieldContainerClassName = '',
  labelTooltip,
  fieldTooltip,
  description,
  hideLabel = false,
  hideHelperText = false,
  hideError = false,
  hideSuccessMessage = false,
  bordered = true,
  rounded = true,
  shadow = false,
  hoverable = true,
  focusable = true,
  transition = true,
  transparent = false,
  tooltip,
  showRequiredIndicator = true,
  showSuccessIndicator = true,
  showErrorIndicator = true,
  showLoadingIndicator = true,
  showValidationIndicator = true,
  showCounter = false,
  counterValue,
  counterMax,
  showProgressBar = false,
  progressValue,
  progressMax = 100,
  children,
  ...rest
}, ref) => {
  // Eindeutige ID generieren, falls keine angegeben wurde
  const uniqueId = useMemo(() => {
    return id || `form-control-${Math.random().toString(36).substring(2, 9)}`;
  }, [id]);
  
  // IDs für Hilfetext, Fehlermeldung und Erfolgsmeldung
  const helperId = `${uniqueId}-helper`;
  const errorId = `${uniqueId}-error`;
  const successId = `${uniqueId}-success`;
  const descriptionId = `${uniqueId}-description`;
  
  // Context-Wert für untergeordnete Komponenten
  const formControlContextValue = useMemo(() => ({
    disabled,
    required,
    hasError: Boolean(error),
    id: uniqueId,
    label: label?.toString(),
    name,
    size,
    readOnly,
    isFocused: false,
    isValid,
    isInvalid: Boolean(error) || isInvalid,
    isSuccess,
    isLoading
  }), [
    disabled, 
    required, 
    error, 
    uniqueId, 
    label, 
    name, 
    size, 
    readOnly, 
    isValid, 
    isInvalid, 
    isSuccess, 
    isLoading
  ]);
  
  // Label-Style für horizontale Anordnung
  const labelStyle = (labelPosition === 'left' || labelPosition === 'right') ? { 
    width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
  } : {};
  
  // Bestimme die Klassen für die Anordnung
  const layoutClasses = {
    top: '',
    left: 'flex items-start',
    right: 'flex flex-row-reverse items-start',
    bottom: 'flex flex-col-reverse',
    floating: 'relative'
  };
  
  // Bestimme die Klassen für das Label
  const getLabelClasses = () => {
    const baseClasses = [
      'text-sm font-medium',
      disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300',
      hideLabel ? 'sr-only' : 'block',
      labelClassName
    ];
    
    switch (labelPosition) {
      case 'left':
        return [...baseClasses, 'pt-2 pr-4'].join(' ');
      case 'right':
        return [...baseClasses, 'pt-2 pl-4'].join(' ');
      case 'bottom':
        return [...baseClasses, 'mt-1'].join(' ');
      case 'floating':
        return [...baseClasses, 'absolute left-2 top-0 px-1 bg-white dark:bg-gray-800 text-xs transform -translate-y-1/2 pointer-events-none transition-all duration-200'].join(' ');
      default: // top
        return [...baseClasses, 'mb-1'].join(' ');
    }
  };
  
  // Bestimme die Klassen für den Formularfeld-Container
  const getFieldContainerClasses = () => {
    const baseClasses = [
      (labelPosition === 'left' || labelPosition === 'right') ? 'flex-1' : '',
      fieldContainerClassName
    ];
    
    return baseClasses.filter(Boolean).join(' ');
  };
  
  // Rendere den Zähler
  const renderCounter = () => {
    if (!showCounter) return null;
    
    const count = counterValue !== undefined ? counterValue : 0;
    const max = counterMax !== undefined ? counterMax : 0;
    const isOverLimit = counterMax !== undefined && counterValue !== undefined && counterValue > counterMax;
    const percent = counterMax ? Math.min(100, Math.round((count / max) * 100)) : 0;
    const counterId = `${uniqueId}-counter`;
    
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
              ? `Zeichenlimit überschritten: ${count} von maximal ${max} Zeichen eingegeben` 
              : `${count} von maximal ${max} Zeichen eingegeben (${percent}%)`}
          </span>
          <span aria-hidden="true">
            {count}
            {counterMax !== undefined && `/${counterMax}`}
          </span>
        </span>
      </div>
    );
  };
  
  // Rendere den Fortschrittsbalken
  const renderProgressBar = () => {
    if (!showProgressBar) return null;
    
    const percent = progressValue !== undefined 
      ? Math.min(Math.max(0, (progressValue / (progressMax || 100)) * 100), 100) 
      : 0;
    
    // Bestimme die Farbe basierend auf dem Prozentsatz
    let barColor = 'bg-primary-500';
    if (percent < 30) {
      barColor = 'bg-red-500';
    } else if (percent < 70) {
      barColor = 'bg-yellow-500';
    } else {
      barColor = 'bg-green-500';
    }
    
    const progressId = `${uniqueId}-progress`;
    const progressLabelId = `${uniqueId}-progress-label`;
    
    return (
      <div 
        className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        id={progressId}
      >
        <div 
          className={`h-full ${barColor} transition-all duration-300 ease-in-out`}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={progressMax}
          aria-labelledby={progressLabelId}
        />
        <span id={progressLabelId} className="sr-only">
          {`Fortschritt: ${Math.round(percent)}%`}
        </span>
      </div>
    );
  };
  
  // Rendere Indikatoren (Erfolg, Fehler, Laden)
  const renderIndicators = () => {
    if (!showSuccessIndicator && !showErrorIndicator && !showLoadingIndicator && !showValidationIndicator) {
      return null;
    }
    
    // Bestimme, welcher Indikator angezeigt werden soll
    let indicator = null;
    let statusText = '';
    
    if (isLoading && showLoadingIndicator) {
      statusText = 'Lädt...';
      indicator = (
        <svg 
          className="animate-spin h-5 w-5 text-primary-500" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-testid="loading-indicator"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (error && showErrorIndicator) {
      statusText = 'Fehler';
      indicator = (
        <svg 
          className="h-5 w-5 text-red-500" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
          data-testid="error-indicator"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    } else if (isSuccess && showSuccessIndicator) {
      statusText = 'Erfolgreich';
      indicator = (
        <svg 
          className="h-5 w-5 text-green-500" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
          data-testid="success-indicator"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (isValid && showValidationIndicator) {
      statusText = 'Gültig';
      indicator = (
        <svg 
          className="h-5 w-5 text-green-500" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
          data-testid="valid-indicator"
        >
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (!indicator) return null;
    
    return (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {indicator}
        <span className="sr-only">{statusText}</span>
      </div>
    );
  };
  
  // Bestimme die ARIA-Attribute für das Formularfeld
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};
    
    // Sammle alle IDs für aria-describedby
    const describedByIds: string[] = [];
    
    if (description) {
      describedByIds.push(descriptionId);
    }
    
    if (helperText && !error && !hideHelperText) {
      describedByIds.push(helperId);
    }
    
    if (successMessage && !hideSuccessMessage) {
      describedByIds.push(successId);
    }
    
    if (showCounter && counterMax !== undefined) {
      describedByIds.push(`${uniqueId}-counter`);
    }
    
    if (showProgressBar) {
      describedByIds.push(`${uniqueId}-progress-label`);
    }
    
    // Setze aria-describedby, wenn IDs vorhanden sind
    if (describedByIds.length > 0) {
      attributes['aria-describedby'] = describedByIds.join(' ');
    }
    
    // Fehlerbehandlung
    if (error) {
      attributes['aria-errormessage'] = errorId;
      attributes['aria-invalid'] = 'true';
    }
    
    // Weitere ARIA-Attribute
    if (isLoading) {
      attributes['aria-busy'] = 'true';
    }
    
    if (required) {
      attributes['aria-required'] = 'true';
    }
    
    return attributes;
  };
  
  return (
    <FormControlContext.Provider value={formControlContextValue}>
      <div 
        ref={ref}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${layoutClasses[labelPosition]}
          ${className}
          ${containerClassName}
        `}
        title={tooltip}
        {...rest}
      >
        {/* Label */}
        {label && (
          <label 
            htmlFor={uniqueId}
            className={getLabelClasses()}
            style={labelStyle}
            title={labelTooltip}
          >
            <span>{label}</span>
            {required && showRequiredIndicator && (
              <>
                <span className="ml-1 text-red-500" aria-hidden="true">*</span>
                <span className="sr-only">(erforderlich)</span>
              </>
            )}
          </label>
        )}
        
        {/* Formularfeld-Container */}
        <div className={getFieldContainerClasses()}>
          {/* Beschreibung für Screenreader */}
          {description && (
            <div id={descriptionId} className="sr-only">
              {description}
            </div>
          )}
          
          {/* Formularfeld (untergeordnete Komponente) */}
          <div className={`relative ${labelPosition === 'floating' ? 'pt-2' : ''}`}>
            {children}
            {renderIndicators()}
          </div>
          
          {/* Zähler */}
          {renderCounter()}
          
          {/* Fortschrittsbalken */}
          {renderProgressBar()}
          
          {/* Hilfetext, Fehlermeldung oder Erfolgsmeldung */}
          {(error || helperText || successMessage) && (
            <div className="mt-1 text-sm">
              {error && !hideError ? (
                <p 
                  id={errorId} 
                  className={`text-red-600 dark:text-red-400 ${errorClassName}`}
                  role="alert"
                >
                  {error}
                </p>
              ) : successMessage && !hideSuccessMessage ? (
                <p 
                  id={successId} 
                  className={`text-green-600 dark:text-green-400 ${successClassName}`}
                >
                  {successMessage}
                </p>
              ) : helperText && !hideHelperText ? (
                <p 
                  id={helperId} 
                  className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
                >
                  {helperText}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
