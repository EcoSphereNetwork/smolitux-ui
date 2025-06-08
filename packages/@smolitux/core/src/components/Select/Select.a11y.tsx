import React, { forwardRef, useState, useEffect, useRef, useId, KeyboardEvent } from 'react';

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
  /** Ob das Select Mehrfachauswahl unterstützen soll */
  isMulti?: boolean;
  /** Maximale Anzahl an Auswahlmöglichkeiten (nur bei isMulti=true) */
  maxSelections?: number;
  /** Ob das Select einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob das Select einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob das Select einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Tooltip für das Select */
  tooltip?: string;
  /** Zusätzliche CSS-Klassen für das Label */
  labelClassName?: string;
  /** Zusätzliche CSS-Klassen für den Hilfetext */
  helperTextClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fehlermeldung */
  errorClassName?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Zusätzliche CSS-Klassen für das Select */
  selectClassName?: string;
  /** ARIA-Label für das Select */
  ariaLabel?: string;
  /** Beschreibung für das Select (für Screenreader) */
  description?: string;
  /** Ob das Select als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob das Select als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob das Select als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob das Select als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Ob das Select als "expanded" angekündigt werden soll */
  expanded?: boolean;
  /** Ob das Select als "collapsed" angekündigt werden soll */
  collapsed?: boolean;
  /** Ob das Select als "selected" angekündigt werden soll */
  selected?: boolean;
  /** Ob das Select als "checked" angekündigt werden soll */
  checked?: boolean;
  /** Ob das Select als "pressed" angekündigt werden soll */
  pressed?: boolean;
  /** Ob das Select als "hidden" angekündigt werden soll */
  hidden?: boolean;
  /** Ob das Select als "disabled" angekündigt werden soll */
  isDisabled?: boolean;
  /** Ob das Select als "required" angekündigt werden soll */
  isRequired?: boolean;
  /** Ob das Select als "readonly" angekündigt werden soll */
  isReadOnly?: boolean;
  /** Ob das Select als "invalid" angekündigt werden soll */
  isInvalid?: boolean;
  /** Ob das Select als "valid" angekündigt werden soll */
  isValid?: boolean;
  /** Ob das Select als "loading" angekündigt werden soll */
  isLoading?: boolean;
  /** Ob das Select als "success" angekündigt werden soll */
  isSuccess?: boolean;
  /** Ob das Select als "error" angekündigt werden soll */
  isError?: boolean;
  /** Ob das Select als "warning" angekündigt werden soll */
  isWarning?: boolean;
  /** Ob das Select als "info" angekündigt werden soll */
  isInfo?: boolean;
  /** Ob das Select als "primary" angekündigt werden soll */
  isPrimary?: boolean;
  /** Ob das Select als "secondary" angekündigt werden soll */
  isSecondary?: boolean;
  /** Ob das Select als "tertiary" angekündigt werden soll */
  isTertiary?: boolean;
  /** Ob das Select als "ghost" angekündigt werden soll */
  isGhost?: boolean;
  /** Ob das Select als "link" angekündigt werden soll */
  isLink?: boolean;
  /** Ob das Select als "outline" angekündigt werden soll */
  isOutline?: boolean;
  /** Ob das Select als "solid" angekündigt werden soll */
  isSolid?: boolean;
  /** Ob das Select als "subtle" angekündigt werden soll */
  isSubtle?: boolean;
  /** Ob das Select als "unstyled" angekündigt werden soll */
  isUnstyled?: boolean;
  /** Ob das Select als "default" angekündigt werden soll */
  isDefault?: boolean;
  /** Ob das Select als "filled" angekündigt werden soll */
  isFilled?: boolean;
  /** Ob das Select als "outlined" angekündigt werden soll */
  isOutlined?: boolean;
  /** Ob das Select als "text" angekündigt werden soll */
  isText?: boolean;
  /** Ob das Select als "icon" angekündigt werden soll */
  isIcon?: boolean;
  /** Ob das Select als "iconButton" angekündigt werden soll */
  isIconButton?: boolean;
  /** Ob das Select als "button" angekündigt werden soll */
  isButton?: boolean;
  /** Ob das Select als "input" angekündigt werden soll */
  isInput?: boolean;
  /** Ob das Select als "textarea" angekündigt werden soll */
  isTextarea?: boolean;
  /** Ob das Select als "checkbox" angekündigt werden soll */
  isCheckbox?: boolean;
  /** Ob das Select als "radio" angekündigt werden soll */
  isRadio?: boolean;
  /** Ob das Select als "switch" angekündigt werden soll */
  isSwitch?: boolean;
  /** Ob das Select als "slider" angekündigt werden soll */
  isSlider?: boolean;
  /** Ob das Select als "range" angekündigt werden soll */
  isRange?: boolean;
  /** Ob das Select als "file" angekündigt werden soll */
  isFile?: boolean;
  /** Ob das Select als "color" angekündigt werden soll */
  isColor?: boolean;
  /** Ob das Select als "date" angekündigt werden soll */
  isDate?: boolean;
  /** Ob das Select als "time" angekündigt werden soll */
  isTime?: boolean;
  /** Ob das Select als "datetime" angekündigt werden soll */
  isDatetime?: boolean;
  /** Ob das Select als "month" angekündigt werden soll */
  isMonth?: boolean;
  /** Ob das Select als "week" angekündigt werden soll */
  isWeek?: boolean;
  /** Ob das Select als "number" angekündigt werden soll */
  isNumber?: boolean;
  /** Ob das Select als "password" angekündigt werden soll */
  isPassword?: boolean;
  /** Ob das Select als "email" angekündigt werden soll */
  isEmail?: boolean;
  /** Ob das Select als "url" angekündigt werden soll */
  isUrl?: boolean;
  /** Ob das Select als "tel" angekündigt werden soll */
  isTel?: boolean;
  /** Ob das Select als "search" angekündigt werden soll */
  isSearch?: boolean;
  /** Ob das Select als "hidden" angekündigt werden soll */
  isHidden?: boolean;
  /** Ob das Select als "submit" angekündigt werden soll */
  isSubmit?: boolean;
  /** Ob das Select als "reset" angekündigt werden soll */
  isReset?: boolean;
  /** Ob das Select als "image" angekündigt werden soll */
  isImage?: boolean;
  /** Ob das Select als "file" angekündigt werden soll */
  isFileInput?: boolean;
  /** Ob das Select als "button" angekündigt werden soll */
  isButtonInput?: boolean;
  /** Ob das Select als "submit" angekündigt werden soll */
  isSubmitInput?: boolean;
  /** Ob das Select als "reset" angekündigt werden soll */
  isResetInput?: boolean;
  /** Ob das Select als "image" angekündigt werden soll */
  isImageInput?: boolean;
  /** Ob das Select als "checkbox" angekündigt werden soll */
  isCheckboxInput?: boolean;
  /** Ob das Select als "radio" angekündigt werden soll */
  isRadioInput?: boolean;
  /** Ob das Select als "color" angekündigt werden soll */
  isColorInput?: boolean;
  /** Ob das Select als "date" angekündigt werden soll */
  isDateInput?: boolean;
  /** Ob das Select als "datetime-local" angekündigt werden soll */
  isDatetimeLocalInput?: boolean;
  /** Ob das Select als "email" angekündigt werden soll */
  isEmailInput?: boolean;
  /** Ob das Select als "file" angekündigt werden soll */
  isFileInputType?: boolean;
  /** Ob das Select als "hidden" angekündigt werden soll */
  isHiddenInput?: boolean;
  /** Ob das Select als "image" angekündigt werden soll */
  isImageInputType?: boolean;
  /** Ob das Select als "month" angekündigt werden soll */
  isMonthInput?: boolean;
  /** Ob das Select als "number" angekündigt werden soll */
  isNumberInput?: boolean;
  /** Ob das Select als "password" angekündigt werden soll */
  isPasswordInput?: boolean;
  /** Ob das Select als "radio" angekündigt werden soll */
  isRadioInputType?: boolean;
  /** Ob das Select als "range" angekündigt werden soll */
  isRangeInput?: boolean;
  /** Ob das Select als "reset" angekündigt werden soll */
  isResetInputType?: boolean;
  /** Ob das Select als "search" angekündigt werden soll */
  isSearchInput?: boolean;
  /** Ob das Select als "submit" angekündigt werden soll */
  isSubmitInputType?: boolean;
  /** Ob das Select als "tel" angekündigt werden soll */
  isTelInput?: boolean;
  /** Ob das Select als "text" angekündigt werden soll */
  isTextInput?: boolean;
  /** Ob das Select als "time" angekündigt werden soll */
  isTimeInput?: boolean;
  /** Ob das Select als "url" angekündigt werden soll */
  isUrlInput?: boolean;
  /** Ob das Select als "week" angekündigt werden soll */
  isWeekInput?: boolean;
}

/**
 * Barrierefreie Select-Komponente für Formulare
 *
 * @example
 * ```tsx
 * <SelectA11y
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3' }
 *   ]}
 *   label="Wählen Sie eine Option"
 *   ariaLabel="Optionsauswahl"
 * />
 * ```
 */
export const SelectA11y = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      leftIcon,
      rightIcon,
      placeholder,
      required = false,
      disabled = false,
      readOnly = false,
      rounded = true,
      shadow = false,
      animated = true,
      groupOptions = false,
      isMulti = false,
      maxSelections,
      hoverable = true,
      focusable = true,
      transition = true,
      tooltip,
      labelClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      containerClassName = '',
      selectClassName = '',
      ariaLabel,
      description,
      busy = false,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      expanded,
      isDisabled,
      isRequired,
      isReadOnly,
      isInvalid,
      ...props
    },
    ref
  ) => {
    // Generiere eindeutige ID für das Select
    const uniqueIdFromHook = useId();
    const uniqueId = props.id || `select-${uniqueIdFromHook}`;

    // State für Fokus und ausgewählte Optionen
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeDescendant, setActiveDescendant] = useState<string | undefined>(undefined);
    const [announceMessage, setAnnounceMessage] = useState<string>('');

    // Refs
    const selectRef = useRef<HTMLSelectElement>(null);

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

    // Kombiniere Props
    const _disabled = isDisabled ?? disabled;
    const _required = isRequired ?? required;
    const _readOnly = isReadOnly ?? readOnly;
    const _isInvalid = isInvalid ?? Boolean(error);

    // Effekt für die Initialisierung der ausgewählten Optionen
    useEffect(() => {
      if (props.value !== undefined) {
        if (isMulti && Array.isArray(props.value)) {
          setSelectedOptions(props.value as string[]);
        } else if (typeof props.value === 'string') {
          setSelectedOptions([props.value]);
        }
      } else if (props.defaultValue !== undefined) {
        if (isMulti && Array.isArray(props.defaultValue)) {
          setSelectedOptions(props.defaultValue as string[]);
        } else if (typeof props.defaultValue === 'string') {
          setSelectedOptions([props.defaultValue]);
        }
      }
    }, [props.value, props.defaultValue, isMulti]);

    // Klassen für verschiedene Größen
    const sizeClasses = {
      xs: 'text-xs h-7 px-2',
      sm: 'text-sm h-8 px-3',
      md: 'text-base h-10 px-4',
      lg: 'text-lg h-12 px-5',
    };

    // Klassen für verschiedene Varianten
    const variantClasses = {
      default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
      filled: 'bg-gray-100 dark:bg-gray-700 border border-transparent',
      outlined: 'bg-transparent border border-gray-300 dark:border-gray-600',
      unstyled: 'bg-transparent border-0',
    };

    // Effekt-spezifische Klassen
    const effectClasses = {
      rounded: rounded ? 'rounded-md' : '',
      shadow: shadow ? 'shadow-sm' : '',
      hover: hoverable && !_disabled ? 'hover:border-gray-400 dark:hover:border-gray-500' : '',
      focus:
        focusable && !_disabled
          ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400'
          : '',
      transition: transition ? 'transition-all duration-200' : '',
      error: _isInvalid
        ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400'
        : '',
      disabled: _disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : '',
      readOnly: _readOnly ? 'cursor-default' : '',
      animated: animated ? 'transition-all duration-200' : '',
      leftPadding: leftIcon ? 'pl-10' : '',
      rightPadding: 'pr-10', // Immer Platz für den Pfeil oder das rechte Icon
    };

    // Kombiniere alle Klassen für das Select
    const selectClasses = [
      'block w-full appearance-none',
      sizeClasses[size],
      variantClasses[variant],
      effectClasses.rounded,
      effectClasses.shadow,
      effectClasses.hover,
      effectClasses.focus,
      effectClasses.transition,
      effectClasses.error,
      effectClasses.disabled,
      effectClasses.readOnly,
      effectClasses.animated,
      effectClasses.leftPadding,
      effectClasses.rightPadding,
      selectClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // Event-Handler
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      setIsOpen(true);

      if (props.onFocus) {
        props.onFocus(e);
      }

      // Ankündige für Screenreader
      setAnnounceMessage(
        'Dropdown geöffnet. Verwenden Sie die Pfeiltasten, um durch die Optionen zu navigieren.'
      );
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      setIsOpen(false);

      if (props.onBlur) {
        props.onBlur(e);
      }

      // Ankündige für Screenreader
      setAnnounceMessage('Dropdown geschlossen.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValues = Array.from(e.target.selectedOptions).map((option) => option.value);

      if (isMulti) {
        // Prüfe, ob die maximale Anzahl an Auswahlmöglichkeiten überschritten wurde
        if (maxSelections && selectedValues.length > maxSelections) {
          // Verhindere die Auswahl und kündige an
          e.preventDefault();
          setAnnounceMessage(`Sie können maximal ${maxSelections} Optionen auswählen.`);
          return;
        }

        setSelectedOptions(selectedValues);
      } else {
        setSelectedOptions([e.target.value]);
      }

      if (props.onChange) {
        props.onChange(e);
      }

      // Ankündige für Screenreader
      const selectedLabels = options
        .filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label)
        .join(', ');

      setAnnounceMessage(`Ausgewählt: ${selectedLabels}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLSelectElement>) => {
      // Tastaturnavigation für bessere Barrierefreiheit
      if (e.key === 'Escape') {
        setIsOpen(false);
        setAnnounceMessage('Dropdown geschlossen.');
      } else if (e.key === 'Enter' || e.key === ' ') {
        setIsOpen(!isOpen);
        setAnnounceMessage(isOpen ? 'Dropdown geschlossen.' : 'Dropdown geöffnet.');
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Diese Tasten werden vom nativen Select-Element verarbeitet
        // Wir können hier zusätzliche Funktionalität hinzufügen, wenn nötig
      }

      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    // Rendere die Optionen
    const renderOptions = () => {
      if (groupOptions) {
        // Gruppiere die Optionen nach der Gruppe
        const groups: Record<string, SelectOption[]> = {};

        options.forEach((option) => {
          const group = option.group || 'Andere';
          if (!groups[group]) {
            groups[group] = [];
          }
          groups[group].push(option);
        });

        return Object.entries(groups).map(([groupName, groupOptions]) => (
          <optgroup key={groupName} label={groupName}>
            {groupOptions.map(renderOption)}
          </optgroup>
        ));
      }

      return options.map(renderOption);
    };

    // Rendere eine einzelne Option
    const renderOption = (option: SelectOption, index: number) => {
      const optionId = `${uniqueId}-option-${option.value}`;

      return (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          id={optionId}
          aria-selected={selectedOptions.includes(option.value)}
          aria-disabled={option.disabled}
          aria-describedby={option.description ? `${optionId}-desc` : undefined}
          data-description={option.description}
        >
          {option.label}
        </option>
      );
    };

    // Rendere die Beschreibung für Screenreader
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
      if (liveRegionPoliteness === 'off') return null;

      return (
        <div
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic ? 'true' : 'false'}
          aria-relevant={relevant}
          className="sr-only"
        >
          {announceMessage}
        </div>
      );
    };

    // Rendere die Optionsbeschreibungen für Screenreader
    const renderOptionDescriptions = () => {
      return options
        .filter((option) => option.description)
        .map((option) => (
          <div
            key={option.value}
            id={`${uniqueId}-option-${option.value}-desc`}
            className="sr-only"
          >
            {option.description}
          </div>
        ));
    };

    return (
      <div
        className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}
        title={tooltip}
        data-testid="select-container"
      >
        {renderDescription()}
        {renderLiveRegion()}
        {renderOptionDescriptions()}

        {label && (
          <label
            id={`${uniqueId}-label`}
            htmlFor={uniqueId}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
          >
            {label}
            {_required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
            {_required && <span className="sr-only">(Erforderlich)</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <select
            ref={handleRef}
            id={uniqueId}
            disabled={_disabled}
            {...(_readOnly ? { 'aria-readonly': 'true' } : {})}
            className={selectClasses}
            aria-invalid={_isInvalid ? 'true' : 'false'}
            aria-describedby={
              [
                _isInvalid ? `${uniqueId}-error` : null,
                helperText && !_isInvalid ? `${uniqueId}-helper` : null,
                description ? `${uniqueId}-description` : null,
                `${uniqueId}-instructions`,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={_required}
            aria-disabled={_disabled}
            aria-readonly={_readOnly}
            aria-label={!label ? ariaLabel || 'Select' : undefined}
            aria-labelledby={label ? `${uniqueId}-label` : undefined}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-busy={busy}
            aria-activedescendant={activeDescendant}
            role="combobox"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            data-testid="select-element"
            multiple={isMulti}
            size={isMulti ? 5 : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled={_required} hidden={_required}>
                {placeholder}
              </option>
            )}
            {renderOptions()}
          </select>

          {/* Dropdown-Pfeil oder benutzerdefiniertes Icon */}
          <div
            className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            aria-hidden="true"
          >
            {rightIcon || (
              <svg
                className="h-4 w-4 text-gray-400"
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
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            )}
          </div>
        </div>

        {(_isInvalid || helperText) && (
          <div className="mt-1 text-sm">
            {_isInvalid ? (
              <p
                id={`${uniqueId}-error`}
                className={`text-red-600 dark:text-red-400 ${errorClassName}`}
                role="alert"
                aria-live="assertive"
              >
                {error}
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
            : 'Drücken Sie die Pfeiltasten, um durch die Optionen zu navigieren, und Enter, um eine Option auszuwählen.'}
          {maxSelections && isMulti && ` Sie können maximal ${maxSelections} Optionen auswählen.`}
        </div>
      </div>
    );
  }
);

SelectA11y.displayName = 'SelectA11y';

export default SelectA11y;
