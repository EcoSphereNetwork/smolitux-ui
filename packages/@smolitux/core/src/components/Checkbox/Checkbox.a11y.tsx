import React, { forwardRef, useRef, useEffect, useState, useId } from 'react';
import { useFormControl } from '../FormControl';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CheckboxVariant = 'solid' | 'outline' | 'filled' | 'minimal';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxDisplayType = 'checkbox' | 'switch' | 'radio' | 'toggle' | 'button';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Text-Label */
  label?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Größe der Checkbox */
  size?: CheckboxSize;
  /** Visuelle Variante */
  variant?: CheckboxVariant;
  /** Indeterminierter Zustand */
  indeterminate?: boolean;
  /** Farbe der Checkbox */
  colorScheme?: CheckboxColorScheme;
  /** Ob die Checkbox einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob die Checkbox abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob die Checkbox einen Schatten haben soll */
  shadow?: boolean;
  /** Ob die Checkbox einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob die Checkbox einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob die Checkbox einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob die Checkbox einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob die Checkbox einen Tooltip haben soll */
  tooltip?: string;
  /** Ob die Checkbox im Ladezustand ist */
  isLoading?: boolean;
  /** Ob die Checkbox gültig ist */
  isValid?: boolean;
  /** Ob die Checkbox ungültig ist */
  isInvalid?: boolean;
  /** Ob die Checkbox erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob die Checkbox deaktiviert ist */
  isDisabled?: boolean;
  /** Ob die Checkbox erforderlich ist */
  isRequired?: boolean;
  /** Ob die Checkbox schreibgeschützt ist */
  isReadOnly?: boolean;
  /** Ob die Checkbox als Switch dargestellt werden soll */
  isSwitch?: boolean;
  /** Ob die Checkbox als Toggle dargestellt werden soll */
  isToggle?: boolean;
  /** Ob die Checkbox als Button dargestellt werden soll */
  isButton?: boolean;
  /** Position des Labels */
  labelPosition?: CheckboxLabelPosition;
  /** Ob das Label versteckt werden soll (nur für Screenreader sichtbar) */
  hideLabel?: boolean;
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
  /** Zusätzliche CSS-Klassen für die Checkbox */
  checkboxClassName?: string;
  /** Zusätzliche CSS-Klassen für den Wrapper */
  wrapperClassName?: string;
  /** ARIA-Label für die Checkbox */
  ariaLabel?: string;
  /** Beschreibung für die Checkbox (für Screenreader) */
  description?: string;
  /** Ob die Checkbox als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob die Checkbox als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob die Checkbox als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob die Checkbox als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Testid für automatisierte Tests */
  testId?: string;
}

/**
 * Barrierefreie Checkbox-Komponente für Formulare
 * 
 * @example
 * ```tsx
 * <CheckboxA11y 
 *   label="Ich stimme den AGB zu" 
 *   isRequired
 *   description="Bitte bestätigen Sie, dass Sie unsere Allgemeinen Geschäftsbedingungen gelesen haben und ihnen zustimmen."
 * />
 * 
 * <CheckboxA11y 
 *   label="Newsletter abonnieren" 
 *   helperText="Sie können sich jederzeit wieder abmelden."
 *   isSwitch
 * />
 * ```
 */
export const CheckboxA11y = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  successMessage,
  size = 'md',
  variant = 'solid',
  indeterminate = false,
  colorScheme = 'primary',
  bordered = false,
  rounded = true,
  shadow = false,
  hoverable = true,
  focusable = true,
  transition = true,
  transparent = false,
  tooltip,
  isLoading = false,
  isValid = false,
  isInvalid = false,
  isSuccess = false,
  isDisabled = false,
  isRequired = false,
  isReadOnly = false,
  isSwitch = false,
  isToggle = false,
  isButton = false,
  labelPosition = 'right',
  hideLabel = false,
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  containerClassName = '',
  checkboxClassName = '',
  wrapperClassName = '',
  ariaLabel,
  description,
  busy = false,
  liveRegionPoliteness = 'polite',
  atomic = true,
  relevant,
  testId,
  ...props
}, ref) => {
  // Generiere eindeutige ID für die Checkbox
  const uniqueIdFromHook = useId();
  const uniqueId = props.id || `checkbox-${uniqueIdFromHook}`;
  
  // Refs
  const checkboxRef = useRef<HTMLInputElement>(null);
  
  // State
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(props.checked !== undefined ? Boolean(props.checked) : props.defaultChecked !== undefined ? Boolean(props.defaultChecked) : false);
  const [announceMessage, setAnnounceMessage] = useState<string>('');
  
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Kombiniere Props mit FormControl-Context
  const _disabled = isDisabled || formControl?.disabled || false;
  const _required = isRequired || formControl?.required || false;
  const _readOnly = isReadOnly || formControl?.readOnly || false;
  const _isInvalid = isInvalid || Boolean(error) || formControl?.isInvalid || false;
  const _isValid = isValid || formControl?.isValid || false;
  const _isSuccess = isSuccess || formControl?.isSuccess || false;
  const _isLoading = isLoading || formControl?.isLoading || false;
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = (element: HTMLInputElement | null) => {
    if (checkboxRef) {
      (checkboxRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
  };
  
  // Effekt für indeterminate-Zustand
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  // Effekt für checked-Zustand
  useEffect(() => {
    if (props.checked !== undefined) {
      setIsChecked(Boolean(props.checked));
    }
  }, [props.checked]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    solid: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
    outline: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    filled: 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent',
    minimal: 'bg-transparent border-0'
  };
  
  // Klassen für verschiedene Farbschemata
  const colorSchemeClasses = {
    primary: 'checked:bg-primary-500 checked:border-primary-500 dark:checked:bg-primary-400 dark:checked:border-primary-400',
    secondary: 'checked:bg-secondary-500 checked:border-secondary-500 dark:checked:bg-secondary-400 dark:checked:border-secondary-400',
    success: 'checked:bg-green-500 checked:border-green-500 dark:checked:bg-green-400 dark:checked:border-green-400',
    danger: 'checked:bg-red-500 checked:border-red-500 dark:checked:bg-red-400 dark:checked:border-red-400',
    warning: 'checked:bg-yellow-500 checked:border-yellow-500 dark:checked:bg-yellow-400 dark:checked:border-yellow-400',
    info: 'checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-blue-400 dark:checked:border-blue-400',
    neutral: 'checked:bg-gray-500 checked:border-gray-500 dark:checked:bg-gray-400 dark:checked:border-gray-400'
  };
  
  // Effekt-spezifische Klassen
  const effectClasses = {
    rounded: rounded ? 'rounded' : '',
    shadow: shadow ? 'shadow-sm' : '',
    hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
    focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400' : '',
    transition: transition ? 'transition-all duration-200' : '',
    error: _isInvalid ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400' : '',
    success: _isSuccess ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400' : '',
    disabled: _disabled ? 'opacity-50 cursor-not-allowed' : '',
    readOnly: _readOnly ? 'cursor-default' : '',
    transparent: transparent ? 'bg-transparent' : ''
  };
  
  // Kombiniere alle Klassen für die Checkbox
  const checkboxClasses = [
    'form-checkbox appearance-none',
    sizeClasses[size],
    variantClasses[variant],
    colorSchemeClasses[colorScheme],
    effectClasses.rounded,
    effectClasses.shadow,
    effectClasses.hover,
    effectClasses.focus,
    effectClasses.transition,
    effectClasses.error,
    effectClasses.success,
    effectClasses.disabled,
    effectClasses.readOnly,
    effectClasses.transparent,
    checkboxClassName
  ].filter(Boolean).join(' ');
  
  // Klassen für den Container
  const containerClasses = [
    'flex items-center',
    labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
    containerClassName
  ].filter(Boolean).join(' ');
  
  // Klassen für das Label
  const labelClasses = [
    'text-sm font-medium text-gray-700 dark:text-gray-300',
    labelPosition === 'left' ? 'mr-2' : 'ml-2',
    _disabled ? 'opacity-50 cursor-not-allowed' : '',
    hideLabel ? 'sr-only' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  // Event-Handler
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Wenn readonly oder disabled, verhindern wir die Änderung
    if (_readOnly || _disabled) {
      e.preventDefault();
      return;
    }
    
    setIsChecked(e.target.checked);
    
    if (props.onChange) {
      props.onChange(e);
    }
    
    // Ankündige für Screenreader
    setAnnounceMessage(e.target.checked ? 'Ausgewählt' : 'Nicht ausgewählt');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (_readOnly && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      return;
    }
    
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };
  
  // Rendere die Beschreibung (für Screenreader)
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div id={`${uniqueId}-description`} className="sr-only">
        {description}
      </div>
    );
  };
  
  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    return (
      <div 
        aria-live={liveRegionPoliteness} 
        aria-atomic={atomic} 
        aria-relevant={relevant}
        className="sr-only"
      >
        {announceMessage}
      </div>
    );
  };
  
  // Bestimme die Rolle basierend auf dem Typ
  const role = isSwitch || isToggle ? 'switch' : undefined;
  
  // Bestimme den aria-checked-Wert
  const ariaChecked = indeterminate ? 'mixed' : isChecked;
  
  // Bestimme die aria-describedby-Werte
  const ariaDescribedBy = [
    description ? `${uniqueId}-description` : null,
    helperText ? `${uniqueId}-helper` : null,
    error && _isInvalid ? `${uniqueId}-error` : null,
    successMessage && _isSuccess ? `${uniqueId}-success` : null
  ].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className={`${containerClasses}`} title={tooltip} data-testid={testId || "checkbox-container"}>
      {renderDescription()}
      {renderLiveRegion()}
      
      <input
        ref={handleRef}
        id={uniqueId}
        type="checkbox"
        className={checkboxClasses}
        disabled={_disabled}
        readOnly={_readOnly}
        checked={isChecked}
        aria-checked={ariaChecked}
        aria-invalid={_isInvalid}
        aria-required={_required}
        aria-disabled={_disabled}
        aria-readonly={_readOnly}
        aria-describedby={ariaDescribedBy}
        aria-label={!label ? ariaLabel : undefined}
        aria-labelledby={label ? `${uniqueId}-label` : undefined}
        aria-busy={busy || _isLoading}
        role={role}
        aria-roledescription={isSwitch || isToggle ? 'Schalter' : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-testid="checkbox-input"
        {...props}
      />
      
      {label && (
        <label 
          id={`${uniqueId}-label`}
          htmlFor={uniqueId} 
          className={labelClasses}
        >
          {label}
          {_required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          {_required && <span className="sr-only">(Erforderlich)</span>}
        </label>
      )}
      
      {(_isInvalid || helperText || _isSuccess) && (
        <div className="mt-1 text-sm w-full">
          {_isInvalid && error ? (
            <p 
              id={`${uniqueId}-error`} 
              className={`text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          ) : _isSuccess && successMessage ? (
            <p 
              id={`${uniqueId}-success`} 
              className={`text-green-600 dark:text-green-400 ${successClassName}`}
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </p>
          ) : helperText ? (
            <p 
              id={`${uniqueId}-helper`} 
              className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
              aria-live="polite"
            >
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

CheckboxA11y.displayName = 'CheckboxA11y';

export default CheckboxA11y;