import React, { forwardRef, useState, useEffect, useRef, useCallback, useId } from 'react';
import { useFormControl } from '../FormControl';
import { InputProps } from './Input';

/**
 * Input-Komponente für Textfelder mit verbesserter Barrierefreiheit
 *
 * @example
 * ```tsx
 * <InputA11y
 *   label="Email"
 *   placeholder="name@example.com"
 *   type="email"
 *   helperText="Wir werden Ihre Email niemals teilen."
 * />
 *
 * <InputA11y
 *   label="Passwort"
 *   type="password"
 *   showPasswordToggle
 *   showCounter
 *   maxLength={20}
 * />
 *
 * <InputA11y
 *   label="Benutzername"
 *   leftIcon={<UserIcon />}
 *   rightIcon={<CheckIcon />}
 *   isValid
 *   successMessage="Benutzername ist verfügbar"
 * />
 * ```
 */
export const InputA11y = forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
    },
    ref
  ) => {
    // Hole FormControl-Context, falls vorhanden
    const formControl = useFormControl();

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const inputId = id || formControl?.id || `input-${uniqueId}`;
    const labelId = `label-${inputId}`;
    const helperId = `helper-${inputId}`;
    const errorId = `error-${inputId}`;
    const successId = `success-${inputId}`;
    const counterId = `counter-${inputId}`;
    const progressId = `progress-${inputId}`;
    const descriptionId = `description-${inputId}`;

    // Kombiniere Props mit FormControl-Context
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
      (value !== undefined
        ? String(value)
        : defaultValue !== undefined
          ? String(defaultValue)
          : '') as string
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
    const handleRef = useCallback(
      (element: HTMLInputElement | null) => {
        if (inputRef) {
          (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
        }

        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
        }
      },
      [ref]
    );

    // Klassen für verschiedene Größen
    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-4 text-xl',
    };

    // Klassen für verschiedene Varianten
    const variantClasses = {
      outline: bordered
        ? 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
        : 'bg-white dark:bg-gray-700',
      filled: 'border-0 bg-gray-100 dark:bg-gray-800',
      flushed:
        'border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none bg-transparent px-0',
      unstyled: 'border-0 bg-transparent px-0 py-0',
    };

    // Zustandsabhängige Klassen
    const stateClasses = _isInvalid
      ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
      : _isValid || _isSuccess
        ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
        : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';

    // Zusätzlicher Padding für Icons, Prefix und Suffix
    const leftPadding = leftIcon || prefix ? 'pl-10' : '';
    const rightPadding = rightIcon || suffix || showPasswordToggle || isClearable ? 'pr-10' : '';

    // Effekt-spezifische Klassen
    const effectClasses = {
      shadow: shadow ? 'shadow-md' : '',
      rounded: rounded && variant !== 'flushed' ? 'rounded-md' : '',
      hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
      focus: focusable && !_disabled ? 'focus:outline-none focus:ring-2' : '',
      transition: transition ? 'transition duration-150 ease-in-out' : '',
      transparent: transparent ? 'bg-transparent' : '',
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
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Bestimme den tatsächlichen Typ des Inputs
    const actualType =
      showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

    // Formatiere den Wert, wenn nötig
    const formatInputValue = useCallback(
      (val: string) => {
        if (formatValue && (formatOnType || (formatOnBlur && !isFocused))) {
          return formatValue(val);
        }
        return val;
      },
      [formatValue, formatOnType, formatOnBlur, isFocused]
    );

    // Entformatiere den Wert, wenn nötig
    const unformatInputValue = useCallback(
      (val: string) => {
        if (formatValue && unformatOnFocus && isFocused) {
          // Hier müsste eine Entformatierungsfunktion implementiert werden
          // Da wir keine haben, geben wir den Wert unverändert zurück
          return val;
        }
        return val;
      },
      [formatValue, unformatOnFocus, isFocused]
    );

    // Validiere den Wert
    const validateInput = useCallback(
      (val: string): { isValid: boolean; message?: string } => {
        // Wenn keine Validierung erforderlich ist, ist der Wert gültig
        if (!props.validationRule && !props.validationFunc && !pattern && !required) {
          return { isValid: true };
        }

        // Prüfe, ob der Wert leer ist und ob er erforderlich ist
        if ((!val || val.trim() === '') && _required) {
          return { isValid: false, message: 'Dieses Feld ist erforderlich.' };
        }

        // Prüfe, ob der Wert dem Pattern entspricht
        if (pattern && val && !new RegExp(pattern).test(val)) {
          return { isValid: false, message: props.validationMessage || 'Ungültiges Format.' };
        }

        // Prüfe, ob der Wert der Validierungsregel entspricht
        if (props.validationRule && val && !props.validationRule.test(val)) {
          return { isValid: false, message: props.validationMessage || 'Ungültiges Format.' };
        }

        // Prüfe, ob der Wert der Validierungsfunktion entspricht
        if (props.validationFunc && val && !props.validationFunc(val)) {
          return { isValid: false, message: props.validationMessage || 'Ungültige Eingabe.' };
        }

        return { isValid: true };
      },
      [_required, pattern, props.validationRule, props.validationFunc, props.validationMessage]
    );

    // Berechne die aktuelle Länge und den Fortschritt
    const currentLength = currentValue.length;
    const currentProgress =
      progressValue !== undefined
        ? progressValue
        : maxLength
          ? Math.min(Math.round((currentLength / maxLength) * 100), 100)
          : 0;

    // Berechne die verbleibenden Zeichen
    const remainingChars = maxLength ? maxLength - currentLength : undefined;

    // Behandle Änderungen am Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Aktualisiere den internen Wert
      setCurrentValue(newValue);

      // Formatiere den Wert, wenn nötig
      const formattedValue = formatInputValue(newValue);

      // Validiere den Wert
      const validation = validateInput(formattedValue);

      // Rufe die Validierungsfunktion auf, wenn vorhanden
      if (props.onValidate) {
        props.onValidate(validation.isValid);
      }

      // Rufe die onChange-Funktion auf, wenn vorhanden
      if (onChange) {
        // Wenn der Wert formatiert wurde, aktualisiere das Event-Objekt
        if (formattedValue !== newValue) {
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              value: formattedValue,
            },
          };
          onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        } else {
          onChange(e);
        }
      }
    };

    // Behandle Fokus auf dem Input
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);

      // Entformatiere den Wert, wenn nötig
      if (unformatOnFocus && formatValue) {
        const unformattedValue = unformatInputValue(e.target.value);

        // Aktualisiere den Wert im Input
        if (unformattedValue !== e.target.value) {
          e.target.value = unformattedValue;
        }
      }

      // Rufe die onFocus-Funktion auf, wenn vorhanden
      if (onFocus) {
        onFocus(e);
      }
    };

    // Behandle Verlassen des Fokus
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      // Formatiere den Wert, wenn nötig
      if (formatOnBlur && formatValue) {
        const formattedValue = formatInputValue(e.target.value);

        // Aktualisiere den Wert im Input
        if (formattedValue !== e.target.value) {
          e.target.value = formattedValue;
          setCurrentValue(formattedValue);
        }
      }

      // Rufe die onBlur-Funktion auf, wenn vorhanden
      if (onBlur) {
        onBlur(e);
      }
    };

    // Behandle Klick auf das rechte Icon
    const handleRightIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Wenn es ein Passwort-Toggle ist
      if (showPasswordToggle && type === 'password') {
        setShowPassword(!showPassword);
        return;
      }

      // Wenn es ein Clearable-Button ist
      if (isClearable && currentValue) {
        setCurrentValue('');

        // Rufe die onClear-Funktion auf, wenn vorhanden
        if (onClear) {
          onClear();
        }

        // Fokussiere den Input
        if (inputRef.current) {
          inputRef.current.focus();
        }

        return;
      }

      // Rufe die onRightIconClick-Funktion auf, wenn vorhanden
      if (isRightIconClickable && onRightIconClick) {
        onRightIconClick(e);
      }
    };

    // Behandle Klick auf das linke Icon
    const handleLeftIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isLeftIconClickable && onLeftIconClick) {
        onLeftIconClick(e);
      }
    };

    // Behandle Tastatureingaben
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Wenn Escape gedrückt wird und der Input einen Wert hat, leere ihn
      if (e.key === 'Escape' && isClearable && currentValue) {
        setCurrentValue('');

        // Rufe die onClear-Funktion auf, wenn vorhanden
        if (onClear) {
          onClear();
        }

        // Verhindere das Standardverhalten (z.B. Dialog schließen)
        e.preventDefault();
        e.stopPropagation();

        return;
      }

      // Rufe die onKeyDown-Funktion auf, wenn vorhanden
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    // Erstelle eine Liste der IDs für die ARIA-Attribute
    const ariaDescribedBy =
      [
        helperText && !hideHelperText ? helperId : null,
        _error && !hideError ? errorId : null,
        successMessage && !hideSuccessMessage && _isSuccess ? successId : null,
        showCounter && maxLength ? counterId : null,
        showProgressBar ? progressId : null,
        description ? descriptionId : null,
      ]
        .filter(Boolean)
        .join(' ') || undefined;

    // Erstelle eine Liste der IDs für die ARIA-Labelledby-Attribute
    const ariaLabelledBy =
      [label && !hideLabel ? labelId : null].filter(Boolean).join(' ') || undefined;

    // Erstelle eine Liste der IDs für die ARIA-Errormessage-Attribute
    const ariaErrorMessage = _error && !hideError ? errorId : undefined;

    // Erstelle eine Liste der IDs für die ARIA-Describedby-Attribute für den Tooltip
    const ariaDescribedByTooltip = tooltip ? `tooltip-${inputId}` : undefined;

    // Rendere das Passwort-Toggle-Icon
    const renderPasswordToggleIcon = () => {
      if (!showPasswordToggle || type !== 'password') return null;

      return (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={handleRightIconClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRightIconClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </div>
      );
    };

    // Rendere das Clearable-Icon
    const renderClearableIcon = () => {
      if (!isClearable || !currentValue) return null;

      return (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={handleRightIconClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRightIconClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Eingabe löschen"
        >
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    };

    // Rendere das rechte Icon
    const renderRightIcon = () => {
      if (!rightIcon) return null;

      return (
        <div
          className={`absolute inset-y-0 right-0 flex items-center pr-3 ${isRightIconClickable ? 'cursor-pointer' : ''}`}
          onClick={isRightIconClickable ? handleRightIconClick : undefined}
          onKeyDown={
            isRightIconClickable
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRightIconClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                  }
                }
              : undefined
          }
          tabIndex={isRightIconClickable ? 0 : -1}
          role={isRightIconClickable ? 'button' : undefined}
          aria-label={isRightIconClickable ? 'Icon-Aktion ausführen' : undefined}
        >
          {rightIcon}
        </div>
      );
    };

    // Rendere das linke Icon
    const renderLeftIcon = () => {
      if (!leftIcon) return null;

      return (
        <div
          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isLeftIconClickable ? 'cursor-pointer' : ''}`}
          onClick={isLeftIconClickable ? handleLeftIconClick : undefined}
          onKeyDown={
            isLeftIconClickable
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLeftIconClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                  }
                }
              : undefined
          }
          tabIndex={isLeftIconClickable ? 0 : -1}
          role={isLeftIconClickable ? 'button' : undefined}
          aria-label={isLeftIconClickable ? 'Icon-Aktion ausführen' : undefined}
        >
          {leftIcon}
        </div>
      );
    };

    // Rendere das Prefix
    const renderPrefix = () => {
      if (!prefix) return null;

      return (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{prefix}</span>
        </div>
      );
    };

    // Rendere das Suffix
    const renderSuffix = () => {
      if (!suffix) return null;

      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500">{suffix}</span>
        </div>
      );
    };

    // Rendere die Einheit
    const renderUnit = () => {
      if (!unit) return null;

      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500">{unit}</span>
        </div>
      );
    };

    // Rendere die Währung
    const renderCurrency = () => {
      if (!currency) return null;

      return (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{currency}</span>
        </div>
      );
    };

    // Rendere den Fortschrittsbalken
    const renderProgressBar = () => {
      if (!showProgressBar) return null;

      return (
        <div
          id={progressId}
          className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentProgress}
          aria-valuemin={0}
          aria-valuemax={progressMax}
          aria-label="Fortschritt"
        >
          <div
            className={`h-full ${_isInvalid ? 'bg-red-500' : _isValid || _isSuccess ? 'bg-green-500' : 'bg-primary-500'}`}
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      );
    };

    // Rendere den Zähler
    const renderCounter = () => {
      if (!showCounter || maxLength === undefined) return null;

      return (
        <div
          id={counterId}
          className={`text-xs mt-1 text-right ${remainingChars && remainingChars < 0 ? 'text-red-500' : 'text-gray-500'}`}
          aria-live="polite"
        >
          {currentLength}/{maxLength} Zeichen
          {remainingChars !== undefined && (
            <span className="sr-only">
              {remainingChars >= 0
                ? `${remainingChars} Zeichen verbleibend`
                : `${Math.abs(remainingChars)} Zeichen zu viel`}
            </span>
          )}
        </div>
      );
    };

    // Rendere die Datalist
    const renderDatalist = () => {
      if (!datalist || !datalist.length) return null;

      return (
        <datalist id={list || `datalist-${inputId}`}>
          {datalist.map((item, index) => (
            <option key={`${item}-${index}`} value={item} />
          ))}
        </datalist>
      );
    };

    // Rendere den Tooltip
    const renderTooltip = () => {
      if (!tooltip) return null;

      return (
        <div id={`tooltip-${inputId}`} className="sr-only">
          {tooltip}
        </div>
      );
    };

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      );
    };

    // Rendere die Komponente
    return (
      <div className={`w-full ${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {/* Label */}
        {(label || formControl?.label) && !hideLabel && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
            title={labelTooltip}
          >
            {label || formControl?.label}
            {_required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
            {_required && <span className="sr-only">(Erforderlich)</span>}
          </label>
        )}

        {/* Verstecktes Label für Screenreader */}
        {(label || formControl?.label) && hideLabel && (
          <label id={labelId} htmlFor={inputId} className="sr-only">
            {label || formControl?.label}
            {_required && <span>(Erforderlich)</span>}
          </label>
        )}

        {/* Input-Container */}
        <div className={`relative ${inputContainerClassName}`}>
          {/* Input */}
          <input
            ref={handleRef}
            id={inputId}
            type={actualType}
            className={inputClasses}
            placeholder={placeholder}
            value={value !== undefined ? value : undefined}
            defaultValue={defaultValue !== undefined ? defaultValue : undefined}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            onInput={onInput}
            onInvalid={onInvalid}
            onSelect={onSelect}
            onReset={onReset}
            onSubmit={onSubmit}
            disabled={_disabled}
            readOnly={_readOnly}
            required={_required}
            name={_name}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            list={list || (datalist && datalist.length > 0 ? `datalist-${inputId}` : undefined)}
            inputMode={inputMode}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            spellCheck={spellCheck}
            autoComplete={autocomplete}
            aria-invalid={_isInvalid}
            aria-required={_required}
            aria-disabled={_disabled}
            aria-readonly={_readOnly}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={ariaLabelledBy}
            aria-errormessage={ariaErrorMessage}
            title={inputTooltip}
            {...props}
          />

          {/* Icons und Addons */}
          {renderLeftIcon()}
          {renderPrefix()}
          {renderCurrency()}
          {renderRightIcon()}
          {renderSuffix()}
          {renderUnit()}
          {renderPasswordToggleIcon()}
          {renderClearableIcon()}

          {/* Datalist */}
          {renderDatalist()}

          {/* Tooltip */}
          {renderTooltip()}

          {/* Beschreibung */}
          {renderDescription()}
        </div>

        {/* Fortschrittsbalken */}
        {renderProgressBar()}

        {/* Zähler */}
        {renderCounter()}

        {/* Hilfetext */}
        {(helperText || formControl?.helperText) && !hideHelperText && !_error && !_isInvalid && (
          <p
            id={helperId}
            className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
          >
            {helperText || formControl?.helperText}
          </p>
        )}

        {/* Versteckter Hilfetext für Screenreader */}
        {(helperText || formControl?.helperText) && hideHelperText && !_error && !_isInvalid && (
          <p id={helperId} className="sr-only">
            {helperText || formControl?.helperText}
          </p>
        )}

        {/* Fehlermeldung */}
        {(_error || _isInvalid) && !hideError && (
          <p id={errorId} className={`mt-1 text-sm text-red-500 ${errorClassName}`} role="alert">
            {_error || 'Ungültige Eingabe'}
          </p>
        )}

        {/* Versteckte Fehlermeldung für Screenreader */}
        {(_error || _isInvalid) && hideError && (
          <p id={errorId} className="sr-only" role="alert">
            {_error || 'Ungültige Eingabe'}
          </p>
        )}

        {/* Erfolgsmeldung */}
        {successMessage && _isSuccess && !hideSuccessMessage && (
          <p
            id={successId}
            className={`mt-1 text-sm text-green-500 ${successClassName}`}
            role="status"
          >
            {successMessage}
          </p>
        )}

        {/* Versteckte Erfolgsmeldung für Screenreader */}
        {successMessage && _isSuccess && hideSuccessMessage && (
          <p id={successId} className="sr-only" role="status">
            {successMessage}
          </p>
        )}
      </div>
    );
  }
);

InputA11y.displayName = 'InputA11y';

export default InputA11y;
