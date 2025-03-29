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
  options?: SelectOption[];
  /** Text-Label */
  label?: string;
  /** Fehlermeldung (als Text) */
  errorText?: string;
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
  /** Ob das Select Mehrfachauswahl unterstützen soll */
  isMulti?: boolean;
  /** Maximale Anzahl der auswählbaren Optionen (nur bei isMulti=true) */
  maxSelections?: number;
  /** Callback, wenn die maximale Anzahl der Auswahlen erreicht ist */
  onMaxSelectionsReached?: () => void;
  /** Ob das Select eine Suchfunktion haben soll */
  isSearchable?: boolean;
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
  errorText,
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
  isMulti = false,
  maxSelections,
  onMaxSelectionsReached,
  isSearchable = false,
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
    if (selectRef) {
      (selectRef as React.MutableRefObject<HTMLSelectElement | null>).current = element;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLSelectElement | null>).current = element;
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
    if (isMulti && maxSelections) {
      // Bei Mehrfachauswahl mit maximaler Anzahl
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      
      if (selectedOptions.length > maxSelections) {
        // Wenn die maximale Anzahl überschritten wird, Auswahl zurücksetzen
        e.preventDefault();
        
        if (onMaxSelectionsReached) {
          onMaxSelectionsReached();
        }
        
        // Wir könnten hier auch eine Fehlermeldung anzeigen
        return;
      }
    }
    
    if (onValueChange) {
      if (isMulti) {
        // Bei Mehrfachauswahl ein Array von Werten zurückgeben
        const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
        onValueChange(selectedValues.join(','));
      } else {
        // Bei Einfachauswahl den Wert zurückgeben
        onValueChange(e.target.value);
      }
    }
    
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
  const stateClasses = error || errorText
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
  const groupedOptions = groupOptions && options && Array.isArray(options)
    ? options.reduce((acc, option) => {
        const group = option.group || '';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, SelectOption[]>)
    : {};
  
  // Rendere die Optionen
  const renderOptions = () => {
    // Wenn children vorhanden sind, verwende diese direkt
    if (props.children) {
      return props.children;
    }
    
    // Wenn keine options vorhanden sind, gib ein leeres Array zurück
    if (!options || !Array.isArray(options)) {
      return [];
    }
    
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
      aria-selected={props.value === option.value}
      role="option"
    >
      {option.label}
      {option.disabled && <span className="sr-only"> (nicht verfügbar)</span>}
    </option>
  );
  
  // Größenklassen für den Container
  const containerSizeClasses = {
    xs: 'select-xs',
    sm: 'select-sm',
    md: 'select-md',
    lg: 'select-lg'
  };

  // Fehlerklasse für den Container
  const errorClass = error || errorText ? 'select-error' : '';

  return (
    <div 
      className={`${fullWidth ? 'w-full' : ''} ${containerSizeClasses[size]} ${errorClass} ${containerClassName} ${className}`} 
      title={tooltip} 
      data-testid="select-container"
      style={props.style}
    >
      {label && (
        <label 
          id={`${uniqueId}-label`}
          htmlFor={uniqueId} 
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          {required && <span className="sr-only">(Erforderlich)</span>}
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
          {...(readOnly ? { 'aria-readonly': 'true' } : {})}
          className={selectClasses}
          aria-invalid={error || errorText ? 'true' : 'false'}
          aria-describedby={
            [
              (error || errorText) ? `${uniqueId}-error` : null,
              helperText && !(error || errorText) ? `${uniqueId}-helper` : null,
              `${uniqueId}-instructions`
            ].filter(Boolean).join(' ') || undefined
          }
          aria-required={required}
          required={required}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          aria-label={!label ? props['aria-label'] || 'Select' : undefined}
          aria-labelledby={label ? uniqueId + '-label' : undefined}
          aria-expanded={isFocused}
          aria-haspopup="listbox"
          role="combobox"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          data-testid="select-element"
          multiple={isMulti}
          size={isMulti ? 5 : undefined}
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
      
      {(error || errorText || helperText) && (
        <div className="mt-1 text-sm">
          {error || errorText ? (
            <p 
              id={`${uniqueId}-error`} 
              className={`text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
              aria-live="assertive"
            >
              {error || errorText}
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
      
      {/* Screenreader-Anweisungen für bessere Barrierefreiheit */}
      <div className="sr-only" aria-live="polite" id={`${uniqueId}-instructions`}>
        {isMulti 
          ? 'Drücken Sie die Pfeiltasten, um durch die Optionen zu navigieren. Drücken Sie die Leertaste, um eine Option auszuwählen oder abzuwählen. Sie können mehrere Optionen auswählen.'
          : 'Drücken Sie die Pfeiltasten, um durch die Optionen zu navigieren, und Enter, um eine Option auszuwählen.'
        }
        {maxSelections && isMulti && ` Sie können maximal ${maxSelections} Optionen auswählen.`}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
