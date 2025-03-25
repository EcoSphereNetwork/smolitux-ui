import React, { forwardRef, useRef, useEffect, useState, useContext } from 'react';
import { useFormControl } from '../FormControl';
import { RadioGroupContext } from './RadioGroup';

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioVariant = 'solid' | 'outline' | 'filled';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Text-Label */
  label?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Größe der Radio */
  size?: RadioSize;
  /** Visuelle Variante */
  variant?: RadioVariant;
  /** Farbe der Radio */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  /** Ob die Radio einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob die Radio abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob die Radio einen Schatten haben soll */
  shadow?: boolean;
  /** Ob die Radio einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob die Radio einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob die Radio einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob die Radio einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob die Radio einen Tooltip haben soll */
  tooltip?: string;
  /** Ob die Radio im Ladezustand ist */
  isLoading?: boolean;
  /** Ob die Radio gültig ist */
  isValid?: boolean;
  /** Ob die Radio ungültig ist */
  isInvalid?: boolean;
  /** Ob die Radio erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob die Radio deaktiviert ist */
  isDisabled?: boolean;
  /** Ob die Radio erforderlich ist */
  isRequired?: boolean;
  /** Ob die Radio einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob die Radio einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob die Radio einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob die Radio einen Validierungsindikator anzeigen soll */
  showValidationIndicator?: boolean;
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
  /** Zusätzliche CSS-Klassen für den Radio-Container */
  radioContainerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für die Radio */
  radioTooltip?: string;
  /** Beschreibung für die Radio (für Screenreader) */
  description?: string;
  /** Ob die Radio automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob die Radio ein Icon haben soll */
  icon?: React.ReactNode;
  /** Ob die Radio ein Icon für den ausgewählten Zustand haben soll */
  checkedIcon?: React.ReactNode;
  /** Ob die Radio ein Icon für den nicht ausgewählten Zustand haben soll */
  uncheckedIcon?: React.ReactNode;
  /** Ob die Radio ein Ripple-Effekt haben soll */
  ripple?: boolean;
  /** Ob die Radio links vom Label angezeigt werden soll */
  labelPosition?: 'left' | 'right';
  /** Ob die Radio vertikal ausgerichtet werden soll */
  isVertical?: boolean;
  /** Ob die Radio als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob die Radio als Button angezeigt werden soll */
  isButton?: boolean;
}

/**
 * Radio-Komponente für Formulare
 * 
 * @example
 * ```tsx
 * <Radio name="option" value="option1" label="Option 1" />
 * 
 * <Radio 
 *   name="option"
 *   value="option2"
 *   label="Option 2"
 *   helperText="Wählen Sie diese Option für mehr Funktionen"
 *   colorScheme="primary"
 *   size="md"
 * />
 * 
 * <Radio 
 *   name="option"
 *   value="option3"
 *   label={<span>Option mit <strong>formatiertem</strong> Text</span>}
 *   isRequired
 *   error={!isSelected ? "Bitte wählen Sie eine Option" : undefined}
 * />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  helperText,
  error,
  successMessage,
  size,
  variant = 'solid',
  colorScheme = 'primary',
  className = '',
  containerClassName = '',
  radioContainerClassName = '',
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  disabled,
  id,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  bordered = true,
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
  isDisabled,
  isRequired,
  showSuccessIndicator = true,
  showErrorIndicator = true,
  showLoadingIndicator = true,
  showValidationIndicator = true,
  hideLabel = false,
  hideHelperText = false,
  hideError = false,
  hideSuccessMessage = false,
  labelTooltip,
  radioTooltip,
  description,
  autoFocus = false,
  icon,
  checkedIcon,
  uncheckedIcon,
  ripple = false,
  labelPosition = 'right',
  isVertical = false,
  isCard = false,
  isButton = false,
  required,
  ...props
}, ref) => {
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Hole RadioGroup-Context, falls vorhanden
  const radioGroup = useContext(RadioGroupContext);
  
  // Kombiniere Props mit FormControl-Context und RadioGroup-Context
  const _id = id || radioGroup?.getRadioId?.(value as string) || formControl.id || `radio-${Math.random().toString(36).substring(2, 9)}`;
  const _disabled = isDisabled ?? disabled ?? radioGroup?.disabled ?? formControl.disabled;
  const _required = isRequired ?? required ?? radioGroup?.required ?? formControl.required;
  const _error = error || radioGroup?.error || (formControl.hasError ? 'Ungültige Eingabe' : undefined);
  const _isInvalid = isInvalid || Boolean(_error) || radioGroup?.isInvalid || formControl.isInvalid;
  const _isValid = isValid || radioGroup?.isValid || formControl.isValid;
  const _isSuccess = isSuccess || radioGroup?.isSuccess || formControl.isSuccess;
  const _isLoading = isLoading || radioGroup?.isLoading || formControl.isLoading;
  const _size = size || radioGroup?.size || formControl.size || 'md';
  const _name = name || radioGroup?.name || formControl.name;
  const _checked = radioGroup?.value !== undefined ? radioGroup.value === value : checked;
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (radioGroup?.onChange) {
      radioGroup.onChange(e);
    }
  };
  
  // State für Fokus und Hover
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [showRipple, setShowRipple] = useState(false);
  
  // Refs
  const radioRef = useRef<HTMLInputElement>(null);
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = (element: HTMLInputElement | null) => {
    radioRef.current = element;
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  
  // Effekt für autoFocus
  useEffect(() => {
    if (autoFocus && radioRef.current) {
      radioRef.current.focus();
    }
  }, [autoFocus]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  };
  
  // Klassen für verschiedene Label-Größen
  const labelSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    solid: 'bg-white dark:bg-gray-700',
    outline: bordered 
      ? 'border-2 border-gray-300 dark:border-gray-600 bg-transparent' 
      : 'bg-transparent',
    filled: 'bg-gray-100 dark:bg-gray-800'
  };
  
  // Klassen für verschiedene Farben
  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-500 focus:ring-secondary-500 dark:focus:ring-secondary-400',
    success: 'text-green-600 dark:text-green-500 focus:ring-green-500 dark:focus:ring-green-400',
    danger: 'text-red-600 dark:text-red-500 focus:ring-red-500 dark:focus:ring-red-400',
    warning: 'text-yellow-600 dark:text-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-400',
    info: 'text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = _isInvalid
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : _isValid || _isSuccess
      ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
      : colorClasses[colorScheme];
  
  // Effekt-spezifische Klassen
  const effectClasses = {
    shadow: shadow ? 'shadow-md' : '',
    rounded: rounded ? 'rounded-full' : '',
    hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
    focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2' : '',
    transition: transition ? 'transition duration-150 ease-in-out' : '',
    transparent: transparent ? 'bg-transparent' : ''
  };
  
  // Basis-Klassen für die Radio
  const radioClasses = [
    sizeClasses[_size],
    variantClasses[variant],
    stateClasses,
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.hover,
    effectClasses.focus,
    effectClasses.transition,
    effectClasses.transparent,
    _disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    radioContainerClassName
  ].filter(Boolean).join(' ');
  
  // Event-Handler
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPressed(true);
    
    // Ripple-Effekt
    if (ripple && radioRef.current) {
      const rect = radioRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`
      });
      
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(true);
    }
    
    onKeyDown?.(e);
  };
  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(false);
    }
  };
  
  // Rendere das passende Icon basierend auf dem Zustand
  const renderIcon = () => {
    if (_checked && checkedIcon) {
      return checkedIcon;
    }
    
    if (!_checked && uncheckedIcon) {
      return uncheckedIcon;
    }
    
    if (icon) {
      return icon;
    }
    
    return null;
  };
  
  // Rendere Indikatoren (Erfolg, Fehler, Laden)
  const renderIndicators = () => {
    if (!showSuccessIndicator && !showErrorIndicator && !showLoadingIndicator && !showValidationIndicator) {
      return null;
    }
    
    // Bestimme, welcher Indikator angezeigt werden soll
    let indicator = null;
    
    if (_isLoading && showLoadingIndicator) {
      indicator = (
        <span className="text-primary-500 animate-spin" aria-hidden="true">
          ⟳
        </span>
      );
    } else if (_isInvalid && showErrorIndicator) {
      indicator = (
        <span className="text-red-500" aria-hidden="true">
          ✕
        </span>
      );
    } else if (_isSuccess && showSuccessIndicator) {
      indicator = (
        <span className="text-green-500" aria-hidden="true">
          ✓
        </span>
      );
    } else if (_isValid && showValidationIndicator) {
      indicator = (
        <span className="text-green-500" aria-hidden="true">
          ✓
        </span>
      );
    }
    
    if (!indicator) return null;
    
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        {indicator}
      </div>
    );
  };
  
  // Bestimme die ARIA-Attribute für die Radio
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
  
  // Rendere die Radio basierend auf dem Typ
  const renderRadio = () => {
    if (isButton) {
      return (
        <button
          id={_id}
          disabled={_disabled}
          aria-pressed={_checked}
          onClick={() => {
            if (radioRef.current) {
              radioRef.current.click();
            }
          }}
          className={`
            px-4 py-2 rounded-md font-medium
            ${_checked 
              ? `bg-${colorScheme}-600 dark:bg-${colorScheme}-500 text-white` 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
            ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            transition-colors duration-200 ease-in-out
          `}
          title={radioTooltip || tooltip}
          {...getAriaAttributes()}
        >
          {label}
          <input
            ref={handleRef}
            type="radio"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={_checked}
            defaultChecked={defaultChecked}
            onChange={_onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="sr-only"
            {...props}
          />
        </button>
      );
    }
    
    if (isCard) {
      return (
        <div 
          className={`
            relative p-4 rounded-lg border-2 
            ${_checked 
              ? `border-${colorScheme}-500 bg-${colorScheme}-50 dark:bg-${colorScheme}-900 dark:bg-opacity-20` 
              : 'border-gray-200 dark:border-gray-700'}
            ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            transition-colors duration-200 ease-in-out
          `}
          onClick={() => {
            if (!_disabled && radioRef.current) {
              radioRef.current.click();
            }
          }}
        >
          <input
            ref={handleRef}
            id={_id}
            type="radio"
            disabled={_disabled}
            required={_required}
            name={_name}
            value={value}
            checked={_checked}
            defaultChecked={defaultChecked}
            onChange={_onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="sr-only"
            title={radioTooltip || tooltip}
            {...getAriaAttributes()}
            {...props}
          />
          
          <div className="flex items-center">
            <div className={`
              w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0
              ${_checked 
                ? `border-${colorScheme}-500 bg-${colorScheme}-500` 
                : 'border-gray-300 dark:border-gray-600'}
            `}>
              {_checked && (
                <div className="w-2 h-2 rounded-full bg-white m-auto" />
              )}
            </div>
            
            <div>
              {label && (
                <label 
                  htmlFor={_id} 
                  className={`
                    ${labelSizeClasses[_size]}
                    font-medium text-gray-700 dark:text-gray-300
                    ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    ${labelClassName}
                  `}
                  title={labelTooltip}
                >
                  {label}
                  {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
                </label>
              )}
              
              {helperText && !hideHelperText && (
                <p 
                  id={`${_id}-helper`} 
                  className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${helperTextClassName}`}
                >
                  {helperText}
                </p>
              )}
            </div>
          </div>
          
          {_checked && (
            <div className="absolute top-2 right-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      );
    }
    
    // Standard-Radio
    return (
      <div className="relative">
        <input
          ref={handleRef}
          id={_id}
          type="radio"
          disabled={_disabled}
          required={_required}
          name={_name}
          value={value}
          checked={_checked}
          defaultChecked={defaultChecked}
          onChange={_onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className={radioClasses}
          title={radioTooltip || tooltip}
          {...getAriaAttributes()}
          {...props}
        />
        
        {/* Ripple-Effekt */}
        {ripple && showRipple && (
          <span 
            className="absolute bg-current bg-opacity-30 rounded-full animate-ripple" 
            style={{
              width: '30px',
              height: '30px',
              transform: 'translate(-50%, -50%)',
              ...rippleStyle
            }}
          />
        )}
        
        {/* Icon */}
        {renderIcon()}
        
        {/* Indikatoren */}
        {renderIndicators()}
      </div>
    );
  };
  
  // Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div id={`${_id}-description`} className="sr-only">
        {description}
      </div>
    );
  };
  
  // Rendere das Label
  const renderLabel = () => {
    if (!label || isButton) return null;
    
    return (
      <div className={`${hideLabel ? 'sr-only' : ''}`}>
        <label 
          htmlFor={_id} 
          className={`
            ${labelSizeClasses[_size]}
            font-medium text-gray-700 dark:text-gray-300
            ${_disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${labelClassName}
          `}
          title={labelTooltip}
        >
          {label}
          {_required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
      </div>
    );
  };
  
  // Rendere Hilfetext, Fehlermeldung oder Erfolgsmeldung
  const renderHelperText = () => {
    if (isCard) return null;
    if (!_error && !helperText && !successMessage) return null;
    
    return (
      <div className="mt-1 text-sm">
        {_error && !hideError ? (
          <p 
            id={`${_id}-error`} 
            className={`text-red-600 dark:text-red-400 ${errorClassName}`}
            role="alert"
          >
            {_error}
          </p>
        ) : successMessage && !hideSuccessMessage ? (
          <p 
            id={`${_id}-success`} 
            className={`text-green-600 dark:text-green-400 ${successClassName}`}
          >
            {successMessage}
          </p>
        ) : helperText && !hideHelperText ? (
          <p 
            id={`${_id}-helper`} 
            className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  };
  
  // Rendere die gesamte Komponente
  if (isCard || isButton) {
    return (
      <div 
        className={`${containerClassName} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {renderDescription()}
        {renderRadio()}
        {!isCard && renderHelperText()}
      </div>
    );
  }
  
  return (
    <div 
      className={`${isVertical ? 'flex flex-col' : 'flex items-start'} ${containerClassName} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Beschreibung für Screenreader */}
      {renderDescription()}
      
      {/* Label links */}
      {labelPosition === 'left' && renderLabel()}
      
      {/* Radio */}
      <div className={`flex items-center ${isVertical ? 'mb-2' : ''}`}>
        {renderRadio()}
      </div>
      
      {/* Label rechts */}
      {labelPosition === 'right' && (
        <div className={`${isVertical ? '' : 'ml-2'}`}>
          {renderLabel()}
          {renderHelperText()}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';
