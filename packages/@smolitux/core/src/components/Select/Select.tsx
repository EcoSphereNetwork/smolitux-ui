import React, { forwardRef, useState, useEffect, useRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
}

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outlined' | 'unstyled';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Options für das Dropdown */
  options: SelectOption[];
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe des Selects */
  size?: SelectSize;
  /** Variante des Selects */
  variant?: SelectVariant;
  /** Volle Breite */
  fullWidth?: boolean;
  /** Links ausgerichtetes Icon */
  leftIcon?: React.ReactNode;
  /** Rechts ausgerichtetes Icon (ersetzt den Standard-Pfeil) */
  rightIcon?: React.ReactNode;
  /** Platzhaltertext */
  placeholder?: string;
  /** Ob das Select erforderlich ist */
  required?: boolean;
  /** Ob das Select deaktiviert ist */
  disabled?: boolean;
  /** Ob das Select schreibgeschützt ist */
  readOnly?: boolean;
  /** Ob das Select abgerundet sein soll */
  rounded?: boolean;
  /** Ob das Select einen Schatten haben soll */
  shadow?: boolean;
  /** Ob das Select animiert werden soll */
  animated?: boolean;
  /** Ob das Select gruppierte Optionen unterstützen soll */
  groupOptions?: boolean;
  /** Zusätzliche CSS-Klassen für das Label */
  labelClassName?: string;
  /** Zusätzliche CSS-Klassen für den Hilfetext */
  helperTextClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fehlermeldung */
  errorClassName?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Callback, wenn sich der Fokus ändert */
  onFocusChange?: (isFocused: boolean) => void;
  /** Callback, wenn sich der Wert ändert */
  onValueChange?: (value: string) => void;
  /** Ob das Select automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob das Select einen Rand haben soll */
  bordered?: boolean;
  /** Ob das Select einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob das Select einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob das Select einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob das Select einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob das Select einen Tooltip haben soll */
  tooltip?: string;
  /** Ob das Select eine Beschreibung anzeigen soll */
  showOptionDescription?: boolean;
  /** Ob das Select Icons anzeigen soll */
  showOptionIcons?: boolean;
}

/**
 * Select-Komponente für Dropdown-Auswahl
 * 
 * @example
 * ```tsx
 * <Select 
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3', disabled: true }
 *   ]} 
 *   label="Auswahl" 
 * />
 * 
 * <Select 
 *   options={[
 *     { value: 'option1', label: 'Option 1', icon: <Icon />, description: 'Beschreibung 1' },
 *     { value: 'option2', label: 'Option 2', icon: <Icon />, description: 'Beschreibung 2' }
 *   ]} 
 *   label="Auswahl mit Icons und Beschreibungen" 
 *   showOptionIcons
 *   showOptionDescription
 * />
 * 
 * <Select 
 *   options={[
 *     { value: 'option1', label: 'Option 1', group: 'Gruppe 1' },
 *     { value: 'option2', label: 'Option 2', group: 'Gruppe 1' },
 *     { value: 'option3', label: 'Option 3', group: 'Gruppe 2' }
 *   ]} 
 *   label="Gruppierte Auswahl" 
 *   groupOptions
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  helperText,
  error,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className = '',
  disabled = false,
  readOnly = false,
  id,
  leftIcon,
  rightIcon,
  placeholder,
  required = false,
  rounded = true,
  shadow = false,
  animated = true,
  groupOptions = false,
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  containerClassName = '',
  onFocusChange,
  onValueChange,
  autoFocus = false,
  bordered = true,
  transparent = false,
  hoverable = true,
  focusable = true,
  transition = true,
  tooltip,
  showOptionDescription = false,
  showOptionIcons = false,
  onChange,
  ...props
}, ref) => {
  // Generiere eine eindeutige ID, falls keine angegeben wurde
  const uniqueId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = (element: HTMLSelectElement | null) => {
    selectRef.current = element;
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  
  // Autofokus
  useEffect(() => {
    if (autoFocus && selectRef.current && !disabled && !readOnly) {
      selectRef.current.focus();
    }
  }, [autoFocus, disabled, readOnly]);
  
  // Fokus-Handler
  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    if (onFocusChange) onFocusChange(true);
    if (props.onFocus) props.onFocus(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (onFocusChange) onFocusChange(false);
    if (props.onBlur) props.onBlur(e);
  };
  
  // Änderungs-Handler
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) onValueChange(e.target.value);
    if (onChange) onChange(e);
  };
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    default: `bg-white dark:bg-gray-700 ${bordered ? 'border border-gray-300 dark:border-gray-600' : ''}`,
    filled: 'bg-gray-100 dark:bg-gray-800 border-transparent',
    outlined: 'bg-transparent border border-gray-300 dark:border-gray-600',
    unstyled: 'bg-transparent border-0 p-0'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = error
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : focusable 
      ? 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400'
      : '';
  
  // Hover-Klassen
  const hoverClasses = hoverable && !disabled && !readOnly
    ? 'hover:border-gray-400 dark:hover:border-gray-500'
    : '';
  
  // Transitions-Klassen
  const transitionClasses = transition
    ? 'transition duration-150 ease-in-out'
    : '';
  
  // Schatten-Klassen
  const shadowClasses = shadow
    ? 'shadow-sm'
    : '';
  
  // Abgerundete Ecken
  const roundedClasses = rounded
    ? 'rounded-md'
    : '';
  
  // Zusätzlicher Padding für Icons
  const iconPadding = leftIcon ? 'pl-10' : '';
  
  // Basis-Klassen für den Select
  const selectClasses = [
    'block focus:outline-none',
    focusable ? 'focus:ring-2' : '',
    transitionClasses,
    'appearance-none',
    'w-full',
    transparent ? 'bg-transparent' : '',
    'text-gray-900 dark:text-white',
    variantClasses[variant],
    'pr-8', // Platz für den Pfeil
    sizeClasses[size],
    stateClasses,
    hoverClasses,
    iconPadding,
    roundedClasses,
    shadowClasses,
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    readOnly ? 'opacity-70 cursor-default' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Gruppiere Optionen, wenn aktiviert
  const groupedOptions = groupOptions
    ? options.reduce((acc, option) => {
        const group = option.group || '';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, SelectOption[]>)
    : {};
  
  // Rendere die Optionen
  const renderOptions = () => {
    if (groupOptions) {
      return Object.entries(groupedOptions).map(([group, groupOptions]) => (
        <optgroup key={group} label={group || 'Andere'}>
          {groupOptions.map(renderOption)}
        </optgroup>
      ));
    }
    
    return options.map(renderOption);
  };
  
  // Rendere eine einzelne Option
  const renderOption = (option: SelectOption) => (
    <option 
      key={option.value} 
      value={option.value} 
      disabled={option.disabled}
      title={option.description}
      data-icon={showOptionIcons && option.icon ? 'true' : undefined}
      data-description={showOptionDescription && option.description ? option.description : undefined}
    >
      {option.label}
    </option>
  );
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`} title={tooltip}>
      {label && (
        <label 
          htmlFor={uniqueId} 
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <select
          ref={handleRef}
          id={uniqueId}
          disabled={disabled}
          readOnly={readOnly}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${uniqueId}-error` 
              : helperText 
                ? `${uniqueId}-helper` 
                : undefined
          }
          aria-required={required}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required} hidden={required}>
              {placeholder}
            </option>
          )}
          {renderOptions()}
        </select>
        
        {/* Dropdown-Pfeil oder benutzerdefiniertes Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          {rightIcon || (
            <svg 
              className="h-4 w-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          )}
        </div>
      </div>
      
      {(error || helperText) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p 
              id={`${uniqueId}-error`} 
              className={`text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
            >
              {error}
            </p>
          ) : helperText ? (
            <p 
              id={`${uniqueId}-helper`} 
              className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            >
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';
