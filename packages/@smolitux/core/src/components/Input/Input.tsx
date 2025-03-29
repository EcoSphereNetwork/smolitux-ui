import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { useFormControl } from '../FormControl';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type InputType = 
  | 'text' 
  | 'password' 
  | 'email' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search' 
  | 'date' 
  | 'time' 
  | 'datetime-local' 
  | 'month' 
  | 'week' 
  | 'color';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Text-Label */
  label?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Links ausgerichtetes Icon */
  leftIcon?: React.ReactNode;
  /** Rechts ausgerichtetes Icon */
  rightIcon?: React.ReactNode;
  /** Größe des Inputs */
  size?: InputSize;
  /** Visuelle Variante */
  variant?: InputVariant;
  /** Volle Breite */
  fullWidth?: boolean;
  /** Ob das Input einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob das Input abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob das Input einen Schatten haben soll */
  shadow?: boolean;
  /** Ob das Input einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob das Input einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob das Input einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob das Input einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob das Input einen Tooltip haben soll */
  tooltip?: string;
  /** Ob das Input einen Zähler anzeigen soll */
  showCounter?: boolean;
  /** Maximaler Wert für den Zähler */
  maxLength?: number;
  /** Ob das Input einen Fortschrittsbalken anzeigen soll */
  showProgressBar?: boolean;
  /** Aktueller Wert für den Fortschrittsbalken */
  progressValue?: number;
  /** Maximaler Wert für den Fortschrittsbalken */
  progressMax?: number;
  /** Ob das Input im Ladezustand ist */
  isLoading?: boolean;
  /** Ob das Input gültig ist */
  isValid?: boolean;
  /** Ob das Input ungültig ist */
  isInvalid?: boolean;
  /** Ob das Input erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob das Input schreibgeschützt ist */
  isReadOnly?: boolean;
  /** Ob das Input deaktiviert ist */
  isDisabled?: boolean;
  /** Ob das Input erforderlich ist */
  isRequired?: boolean;
  /** Ob das Input einen Erfolgsindikator anzeigen soll */
  showSuccessIndicator?: boolean;
  /** Ob das Input einen Fehlerindikator anzeigen soll */
  showErrorIndicator?: boolean;
  /** Ob das Input einen Ladeindikator anzeigen soll */
  showLoadingIndicator?: boolean;
  /** Ob das Input einen Validierungsindikator anzeigen soll */
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
  /** Zusätzliche CSS-Klassen für den Input-Container */
  inputContainerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Tooltip für das Input */
  inputTooltip?: string;
  /** Beschreibung für das Input (für Screenreader) */
  description?: string;
  /** Ob das rechte Icon klickbar sein soll */
  isRightIconClickable?: boolean;
  /** Ob das linke Icon klickbar sein soll */
  isLeftIconClickable?: boolean;
  /** Callback für Klick auf das rechte Icon */
  onRightIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Callback für Klick auf das linke Icon */
  onLeftIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Ob das Input automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob das Input automatisch selektiert werden soll */
  autoSelect?: boolean;
  /** Ob das Input automatisch wachsen soll (für Textarea) */
  autoGrow?: boolean;
  /** Ob das Input ein Passwort-Toggle haben soll */
  showPasswordToggle?: boolean;
  /** Ob das Input ein Clearable-Button haben soll */
  isClearable?: boolean;
  /** Callback für das Löschen des Inputs */
  onClear?: () => void;
  /** Ob das Input ein Prefix haben soll */
  prefix?: React.ReactNode;
  /** Ob das Input ein Suffix haben soll */
  suffix?: React.ReactNode;
  /** Ob das Input eine Einheit haben soll */
  unit?: React.ReactNode;
  /** Ob das Input eine Währung haben soll */
  currency?: string;
  /** Ob das Input formatiert werden soll */
  formatValue?: (value: string) => string;
  /** Ob das Input beim Verlassen formatiert werden soll */
  formatOnBlur?: boolean;
  /** Ob das Input beim Tippen formatiert werden soll */
  formatOnType?: boolean;
  /** Ob das Input beim Fokussieren entformatiert werden soll */
  unformatOnFocus?: boolean;
  /** Ob das Input ein Autokomplettieren haben soll */
  autocomplete?: string;
  /** Ob das Input ein Spellcheck haben soll */
  spellCheck?: boolean;
  /** Ob das Input ein Autocorrect haben soll */
  autoCorrect?: string;
  /** Ob das Input ein Autocapitalize haben soll */
  autoCapitalize?: string;
  /** Ob das Input ein Inputmode haben soll */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  /** Ob das Input ein Pattern haben soll */
  pattern?: string;
  /** Ob das Input ein Min haben soll */
  min?: number | string;
  /** Ob das Input ein Max haben soll */
  max?: number | string;
  /** Ob das Input ein Step haben soll */
  step?: number | string;
  /** Ob das Input ein List haben soll */
  list?: string;
  /** Ob das Input ein Datalist haben soll */
  datalist?: string[];
  /** Ob das Input ein Mask haben soll */
  mask?: string;
  /** Ob das Input ein Maskchar haben soll */
  maskChar?: string;
  /** Ob das Input ein Alwaysshowmask haben soll */
  alwaysShowMask?: boolean;
  /** Ob das Input ein Beforemaskedvaluechange haben soll */
  beforeMaskedValueChange?: (newValue: string, oldValue: string) => string;
  /** Ob das Input ein Validationrule haben soll */
  validationRule?: RegExp;
  /** Ob das Input ein Validationmessage haben soll */
  validationMessage?: string;
  /** Ob das Input ein Validationfunc haben soll */
  validationFunc?: (value: string) => boolean;
  /** Ob das Input ein Onvalidate haben soll */
  onValidate?: (isValid: boolean) => void;
  /** Ob das Input ein Onchange haben soll */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onblur haben soll */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onfocus haben soll */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onkeydown haben soll */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onkeyup haben soll */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onkeypress haben soll */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** Ob das Input ein Oninput haben soll */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /** Ob das Input ein Oninvalid haben soll */
  onInvalid?: React.FormEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onselect haben soll */
  onSelect?: React.ReactEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onreset haben soll */
  onReset?: React.FormEventHandler<HTMLInputElement>;
  /** Ob das Input ein Onsubmit haben soll */
  onSubmit?: React.FormEventHandler<HTMLInputElement>;
}

/**
 * Input-Komponente für Textfelder
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   placeholder="name@example.com" 
 *   type="email" 
 *   helperText="Wir werden Ihre Email niemals teilen."
 * />
 * 
 * <Input 
 *   label="Passwort"
 *   type="password"
 *   showPasswordToggle
 *   showCounter
 *   maxLength={20}
 * />
 * 
 * <Input 
 *   label="Benutzername"
 *   leftIcon={<UserIcon />}
 *   rightIcon={<CheckIcon />}
 *   isValid
 *   successMessage="Benutzername ist verfügbar"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  successMessage,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  className = '',
  disabled,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onInput,
  onInvalid,
  onSelect,
  onReset,
  onSubmit,
  bordered = true,
  rounded = true,
  shadow = false,
  hoverable = true,
  focusable = true,
  transition = true,
  transparent = false,
  tooltip,
  showCounter = false,
  maxLength,
  showProgressBar = false,
  progressValue,
  progressMax = 100,
  isLoading = false,
  isValid = false,
  isInvalid = false,
  isSuccess = false,
  isReadOnly,
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
  labelClassName = '',
  helperTextClassName = '',
  errorClassName = '',
  successClassName = '',
  containerClassName = '',
  inputContainerClassName = '',
  labelTooltip,
  inputTooltip,
  description,
  isRightIconClickable = false,
  isLeftIconClickable = false,
  onRightIconClick,
  onLeftIconClick,
  autoFocus = false,
  autoSelect = false,
  showPasswordToggle = false,
  isClearable = false,
  onClear,
  prefix,
  suffix,
  unit,
  currency,
  formatValue,
  formatOnBlur = false,
  formatOnType = false,
  unformatOnFocus = false,
  required,
  readOnly,
  name,
  min,
  max,
  step,
  pattern,
  list,
  datalist,
  inputMode,
  autoCapitalize,
  autoCorrect,
  spellCheck,
  autocomplete,
  ...props
}, ref) => {
  // Hole FormControl-Context, falls vorhanden
  const formControl = useFormControl();
  
  // Kombiniere Props mit FormControl-Context
  const _id = id || formControl?.id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const _disabled = isDisabled ?? disabled ?? formControl?.disabled;
  const _required = isRequired ?? required ?? formControl?.required;
  const _readOnly = isReadOnly ?? readOnly ?? formControl?.readOnly;
  const _error = error || (formControl?.hasError ? 'Ungültige Eingabe' : undefined);
  const _isInvalid = isInvalid || Boolean(_error) || formControl?.isInvalid;
  const _isValid = isValid || formControl?.isValid;
  const _isSuccess = isSuccess || formControl?.isSuccess;
  const _isLoading = isLoading || formControl?.isLoading;
  const _size = size || formControl?.size || 'md';
  const _name = name || formControl?.name;
  
  // State für Passwort-Toggle
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState<string>(
    (value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : '') as string
  );
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Aktualisiere den internen Wert, wenn sich der externe Wert ändert
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(String(value));
    }
  }, [value]);
  
  // Effekt für autoFocus und autoSelect
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      
      if (autoSelect) {
        inputRef.current.select();
      }
    }
  }, [autoFocus, autoSelect]);
  
  // Kombiniere den externen Ref mit unserem internen Ref
  const handleRef = useCallback((element: HTMLInputElement | null) => {
    if (inputRef) {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
  }, [ref]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    xl: 'px-6 py-4 text-xl'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    outline: bordered 
      ? 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700' 
      : 'bg-white dark:bg-gray-700',
    filled: 'border-0 bg-gray-100 dark:bg-gray-800',
    flushed: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none bg-transparent px-0',
    unstyled: 'border-0 bg-transparent px-0 py-0'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = _isInvalid
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : _isValid || _isSuccess
      ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
      : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Zusätzlicher Padding für Icons, Prefix und Suffix
  const leftPadding = leftIcon || prefix ? 'pl-10' : '';
  const rightPadding = (rightIcon || suffix || showPasswordToggle || isClearable) ? 'pr-10' : '';
  
  // Effekt-spezifische Klassen
  const effectClasses = {
    shadow: shadow ? 'shadow-md' : '',
    rounded: rounded && variant !== 'flushed' ? 'rounded-md' : '',
    hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
    focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2' : '',
    transition: transition ? 'transition duration-150 ease-in-out' : '',
    transparent: transparent ? 'bg-transparent' : ''
  };
  
  // Basis-Klassen für den Input
  const inputClasses = [
    'block appearance-none w-full',
    'text-gray-900 dark:text-white',
    'placeholder-gray-400 dark:placeholder-gray-500',
    sizeClasses[_size],
    variantClasses[variant],
    stateClasses,
    leftPadding,
    rightPadding,
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.hover,
    effectClasses.focus,
    effectClasses.transition,
    effectClasses.transparent,
    _disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Bestimme den tatsächlichen Typ des Inputs
  const actualType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;
  
  // Formatiere den Wert, wenn nötig
  const formatInputValue = useCallback((val: string) => {
    if (formatValue && (formatOnType || (formatOnBlur && !isFocused))) {
      return formatValue(val);
    }
    return val;
  }, [formatValue, formatOnType, formatOnBlur, isFocused]);
  
  // Entformatiere den Wert, wenn nötig
  const unformatInputValue = useCallback((val: string) => {
    if (formatValue && unformatOnFocus && isFocused) {
      // Hier müsste eine Entformatierungsfunktion implementiert werden
      // Da wir keine haben, geben wir den Wert unverändert zurück
      return val;
    }
    return val;
  }, [formatValue, unformatOnFocus, isFocused]);
  
  // Validiere den Wert
  const validateInput = useCallback((val: string): { isValid: boolean; message?: string } => {
    // Wenn keine Validierung erforderlich ist, ist der Wert gültig
    if (!validationRule && !validationFunc && !pattern && !required) {
      return { isValid: true };
    }
    
    // Prüfe, ob der Wert leer ist und ob er erforderlich ist
    if ((!val || val.trim() === '') && required) {
      return { isValid: false, message: validationMessage || 'Dieses Feld ist erforderlich' };
    }
    
    // Wenn der Wert leer ist und nicht erforderlich, ist er gültig
    if (!val || val.trim() === '') {
      return { isValid: true };
    }
    
    // Prüfe gegen das Muster, wenn vorhanden
    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(val)) {
        return { isValid: false, message: validationMessage || 'Ungültiges Format' };
      }
    }
    
    // Prüfe gegen die Validierungsregel, wenn vorhanden
    if (validationRule && !validationRule.test(val)) {
      return { isValid: false, message: validationMessage || 'Ungültige Eingabe' };
    }
    
    // Prüfe mit der Validierungsfunktion, wenn vorhanden
    if (validationFunc && !validationFunc(val)) {
      return { isValid: false, message: validationMessage || 'Ungültige Eingabe' };
    }
    
    // Wenn alle Prüfungen bestanden wurden, ist der Wert gültig
    return { isValid: true };
  }, [validationRule, validationFunc, pattern, required, validationMessage]);
  
  // Event-Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    
    // Formatiere den Wert, wenn nötig
    if (formatOnType && formatValue) {
      const formattedValue = formatValue(newValue);
      e.target.value = formattedValue;
    }
    
    // Validiere den Wert
    const validationResult = validateInput(newValue);
    
    // Aktualisiere den Validierungsstatus
    if (onValidate) {
      onValidate(validationResult.isValid);
    }
    
    // Rufe den onChange-Handler auf
    onChange?.(e);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    if (unformatOnFocus && formatValue && e.target.value) {
      // Hier müsste eine Entformatierungsfunktion implementiert werden
      // Da wir keine haben, lassen wir den Wert unverändert
    }
    
    if (autoSelect) {
      e.target.select();
    }
    
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // Formatiere den Wert, wenn nötig
    if (formatOnBlur && formatValue && e.target.value) {
      const formattedValue = formatValue(e.target.value);
      e.target.value = formattedValue;
      setCurrentValue(formattedValue);
    }
    
    // Validiere den Wert
    const validationResult = validateInput(e.target.value);
    
    // Aktualisiere den Validierungsstatus
    if (onValidate) {
      onValidate(validationResult.isValid);
    }
    
    // Setze den Fehler, wenn die Validierung fehlschlägt
    if (!validationResult.isValid && validationResult.message) {
      // Hier könnten wir den Fehler setzen, aber da wir keinen lokalen Fehlerzustand haben,
      // müssten wir das über den FormControl-Context oder einen externen Handler tun
    }
    
    // Rufe den onBlur-Handler auf
    onBlur?.(e);
  };
  
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setCurrentValue('');
      
      // Erstelle ein synthetisches Event
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
      
      // Fokussiere das Input-Feld nach dem Löschen
      inputRef.current.focus();
      
      onClear?.();
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <div className="absolute inset-y-0 right-3 flex items-center">
        {indicator}
      </div>
    );
  };
  
  // Rendere den Zähler
  const renderCounter = () => {
    if (!showCounter || maxLength === undefined) return null;
    
    const count = currentValue.length;
    const isOverLimit = count > maxLength;
    
    return (
      <div className="mt-1 text-xs text-right">
        <span className={isOverLimit ? 'text-red-500' : 'text-gray-500'}>
          {count}/{maxLength}
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
    
    return (
      <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={progressMax}
        />
      </div>
    );
  };
  
  // Rendere die Datalist
  const renderDatalist = () => {
    if (!datalist || !datalist.length || !list) return null;
    
    return (
      <datalist id={list}>
        {datalist.map((option, index) => (
          <option key={`${option}-${index}`} value={option} />
        ))}
      </datalist>
    );
  };
  
  // Bestimme die ARIA-Attribute für das Input
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};
    const describedByIds: string[] = [];

    // Beschreibung
    if (description) {
      describedByIds.push(`${_id}-description`);
    }

    // Fehlermeldung
    if (_error) {
      attributes['aria-errormessage'] = `${_id}-error`;
      attributes['aria-invalid'] = 'true';
    } else if (_isInvalid) {
      attributes['aria-invalid'] = 'true';
    }

    // Erfolg
    if (_isValid || _isSuccess) {
      // Hinweis: 'aria-valid' ist kein Standard-ARIA-Attribut, wir verwenden stattdessen eine Klasse
      // und setzen aria-invalid auf 'false'
      attributes['aria-invalid'] = 'false';
    }

    // Deaktiviert
    if (_disabled) {
      attributes['aria-disabled'] = 'true';
    }

    // Erforderlich
    if (_required) {
      attributes['aria-required'] = 'true';
    }

    // Schreibgeschützt
    if (_readOnly) {
      attributes['aria-readonly'] = 'true';
    }

    // Ladezustand
    if (_isLoading) {
      attributes['aria-busy'] = 'true';
    }

    // Hilfetext
    if (helperText && !_error && !hideHelperText) {
      describedByIds.push(`${_id}-helper`);
    }

    // Erfolgsmeldung
    if (successMessage && !hideSuccessMessage) {
      describedByIds.push(`${_id}-success`);
    }

    // Tooltip
    if (tooltip || inputTooltip) {
      attributes['aria-label'] = tooltip || inputTooltip || '';
    }

    // Kombiniere alle IDs für aria-describedby
    if (describedByIds.length > 0) {
      attributes['aria-describedby'] = describedByIds.join(' ');
    }

    // Autocomplete
    if (autocomplete) {
      attributes['aria-autocomplete'] = autocomplete === 'on' ? 'both' : 'none';
    }

    return attributes;
  };
  
  return (
    <div className={`w-full ${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {/* Label */}
      {label && !hideLabel && (
        <label 
          htmlFor={_id} 
          className={`block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 ${_required ? 'required' : ''} ${labelClassName}`}
          title={labelTooltip}
        >
          {label}
          {_required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Input-Container */}
      <div className={`relative ${inputContainerClassName}`}>
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
            {prefix}
          </div>
        )}
        
        {/* Linkes Icon */}
        {leftIcon && (
          <div 
            className={`absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500 ${isLeftIconClickable ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={isLeftIconClickable ? onLeftIconClick : undefined}
          >
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={handleRef}
          id={_id}
          name={_name}
          type={actualType}
          disabled={_disabled}
          readOnly={_readOnly}
          required={_required}
          className={inputClasses}
          placeholder={placeholder}
          value={value !== undefined ? formatInputValue(String(value)) : undefined}
          defaultValue={defaultValue !== undefined ? formatInputValue(String(defaultValue)) : undefined}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onInput={onInput}
          onInvalid={onInvalid}
          onSelect={onSelect}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          list={list}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          autoComplete={autocomplete}
          title={inputTooltip || tooltip}
          {...getAriaAttributes()}
          {...props}
        />
        
        {/* Suffix */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
            {suffix}
          </div>
        )}
        
        {/* Rechtes Icon */}
        {rightIcon && (
          <div 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 ${isRightIconClickable ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={isRightIconClickable ? onRightIconClick : undefined}
          >
            {rightIcon}
          </div>
        )}
        
        {/* Passwort-Toggle */}
        {showPasswordToggle && type === 'password' && (
          <div 
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 dark:text-gray-500"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
            role="button"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </div>
        )}
        
        {/* Clearable-Button */}
        {isClearable && currentValue && (
          <div 
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 dark:text-gray-500"
            onClick={handleClear}
            aria-label="Eingabe löschen"
            role="button"
            tabIndex={-1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Indikatoren */}
        {renderIndicators()}
      </div>
      
      {/* Zähler */}
      {renderCounter()}
      
      {/* Fortschrittsbalken */}
      {renderProgressBar()}
      
      {/* Datalist */}
      {renderDatalist()}
      
      {/* Hilfetext, Fehlermeldung oder Erfolgsmeldung */}
      {(_error || helperText || successMessage) && (
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
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
