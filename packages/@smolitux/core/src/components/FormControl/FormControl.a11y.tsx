import React, { forwardRef, createContext, useContext, useMemo, useId } from 'react';

// Context für FormControl
export interface FormControlContextType {
  /** Ist das Formularfeld deaktiviert? */
  disabled?: boolean;
  /** Ist das Formularfeld erforderlich? */
  required?: boolean;
  /** Hat das Formularfeld einen Fehler? */
  hasError?: boolean;
  /** Fehlermeldung */
  errorMessage?: string;
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
  /** Hilfetext für das Formularfeld */
  helperText?: string;
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
      errorMessage: undefined,
      id: undefined,
      label: undefined,
      name: undefined,
      size: 'md' as FormControlSize,
      readOnly: false,
      isFocused: false,
      isValid: false,
      isInvalid: false,
      isSuccess: false,
      isLoading: false,
      helperText: undefined
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
 * Barrierefreie FormControl-Komponente als Container für Formularelemente
 * 
 * @example
 * ```tsx
 * <FormControlA11y 
 *   label="Email" 
 *   helperText="Ihre geschäftliche Email-Adresse" 
 *   error="Ungültiges Email-Format"
 * >
 *   <Input type="email" />
 * </FormControlA11y>
 * 
 * <FormControlA11y 
 *   label="Passwort"
 *   required
 *   labelPosition="floating"
 *   showCounter
 *   counterValue={password.length}
 *   counterMax={20}
 * >
 *   <Input type="password" />
 * </FormControlA11y>
 * 
 * <FormControlA11y 
 *   label="Profilbild"
 *   isLoading={uploading}
 *   showProgressBar
 *   progressValue={uploadProgress}
 *   progressMax={100}
 * >
 *   <FileUpload />
 * </FormControlA11y>
 * ```
 */
export const FormControlA11y = forwardRef<HTMLDivElement, FormControlProps>(({
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
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const formControlId = id || `form-control-${uniqueId}`;
  const labelId = `label-${formControlId}`;
  const helperId = `helper-${formControlId}`;
  const errorId = `error-${formControlId}`;
  const successId = `success-${formControlId}`;
  const descriptionId = `description-${formControlId}`;
  const counterId = `counter-${formControlId}`;
  const progressId = `progress-${formControlId}`;
  
  // Context-Wert für untergeordnete Komponenten
  const formControlContextValue = useMemo(() => ({
    disabled,
    required,
    hasError: Boolean(error),
    errorMessage: error?.toString(),
    id: formControlId,
    label: label?.toString(),
    name,
    size,
    readOnly,
    isFocused: false,
    isValid,
    isInvalid: Boolean(error) || isInvalid,
    isSuccess,
    isLoading,
    helperText: helperText?.toString()
  }), [
    disabled, 
    required, 
    error, 
    formControlId, 
    label, 
    name, 
    size, 
    readOnly, 
    isValid, 
    isInvalid, 
    isSuccess, 
    isLoading,
    helperText
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
    
    const progressLabelId = `${progressId}-label`;
    
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
    
    // Verknüpfe Label und Hilfetext/Fehlermeldung mit dem Formularfeld
    const describedByIds = [];
    
    if (helperText && !hideHelperText && !error) {
      describedByIds.push(helperId);
    }
    
    if (error && !hideError) {
      describedByIds.push(errorId);
    }
    
    if (successMessage && !hideSuccessMessage && isSuccess) {
      describedByIds.push(successId);
    }
    
    if (description) {
      describedByIds.push(descriptionId);
    }
    
    if (showCounter && counterMax) {
      describedByIds.push(counterId);
    }
    
    if (showProgressBar) {
      describedByIds.push(progressId);
    }
    
    if (describedByIds.length > 0) {
      attributes['aria-describedby'] = describedByIds.join(' ');
    }
    
    return attributes;
  };
  
  // Bestimme die CSS-Klassen für den Container
  const containerClasses = [
    'form-control',
    layoutClasses[labelPosition],
    fullWidth ? 'w-full' : '',
    containerClassName
  ].filter(Boolean).join(' ');
  
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
    <FormControlContext.Provider value={formControlContextValue}>
      <div 
        ref={ref} 
        className={containerClasses}
        {...rest}
        {...getAriaAttributes()}
      >
        {/* Label */}
        {label && (
          <label 
            id={labelId}
            htmlFor={formControlId}
            className={getLabelClasses()}
            style={labelStyle}
            title={labelTooltip}
          >
            {label}
            {required && showRequiredIndicator && (
              <>
                <span className="ml-1 text-red-500" aria-hidden="true">*</span>
                <span className="sr-only">(Erforderlich)</span>
              </>
            )}
            {tooltip && (
              <span 
                className="ml-1 text-gray-400 cursor-help" 
                title={tooltip}
                aria-label={`Tooltip: ${tooltip}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </label>
        )}
        
        {/* Formularfeld-Container */}
        <div className={getFieldContainerClasses()}>
          {/* Formularfeld */}
          <div className="relative">
            {children}
            {renderIndicators()}
          </div>
          
          {/* Fortschrittsbalken */}
          {renderProgressBar()}
          
          {/* Zähler */}
          {renderCounter()}
          
          {/* Hilfetext */}
          {helperText && !hideHelperText && !error && (
            <p 
              id={helperId}
              className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            >
              {helperText}
            </p>
          )}
          
          {/* Versteckter Hilfetext für Screenreader */}
          {helperText && hideHelperText && !error && (
            <p id={helperId} className="sr-only">
              {helperText}
            </p>
          )}
          
          {/* Fehlermeldung */}
          {error && !hideError && (
            <p 
              id={errorId}
              className={`mt-1 text-sm text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
            >
              {error}
            </p>
          )}
          
          {/* Versteckte Fehlermeldung für Screenreader */}
          {error && hideError && (
            <p id={errorId} className="sr-only" role="alert">
              {error}
            </p>
          )}
          
          {/* Erfolgsmeldung */}
          {successMessage && isSuccess && !hideSuccessMessage && (
            <p 
              id={successId}
              className={`mt-1 text-sm text-green-600 dark:text-green-400 ${successClassName}`}
              role="status"
            >
              {successMessage}
            </p>
          )}
          
          {/* Versteckte Erfolgsmeldung für Screenreader */}
          {successMessage && isSuccess && hideSuccessMessage && (
            <p id={successId} className="sr-only" role="status">
              {successMessage}
            </p>
          )}
          
          {/* Versteckte Beschreibung */}
          {renderDescription()}
        </div>
      </div>
    </FormControlContext.Provider>
  );
});

FormControlA11y.displayName = 'FormControlA11y';

export default FormControlA11y;