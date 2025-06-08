// packages/@smolitux/core/src/components/TimePicker/TimePicker.improved.tsx
import React, { forwardRef, useState, useRef, useEffect, useId } from 'react';
import ReactDOM from 'react-dom';
import { useFormControl } from '../FormControl/FormControl';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, any> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

type TimeFormat = '12h' | '24h';
type TimeValue = {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: 'AM' | 'PM';
};

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Ausgewählte Zeit */
  value?: TimeValue | string;
  /** Standard-Ausgewählte Zeit */
  defaultValue?: TimeValue | string;
  /** Callback bei Auswahl einer Zeit */
  onChange?: (time: TimeValue) => void;
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Format der Zeit (12h oder 24h) */
  format?: TimeFormat;
  /** Nur Stunden und Minuten anzeigen, keine Sekunden */
  hideSeconds?: boolean;
  /** Platzhaltertext */
  placeholder?: string;
  /** Größe des TimePickers */
  size?: 'sm' | 'md' | 'lg';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Icons vor dem Input anzeigen */
  leftIcon?: React.ReactNode;
  /** Portierung des Popups */
  portalTarget?: HTMLElement | null;
  /** Automatisches Schließen nach Auswahl */
  closeOnSelect?: boolean;
  /** Z-Index für den Popup */
  zIndex?: number;
  /** Zeitintervall in Minuten */
  minuteStep?: number;
  /** Zeitintervall in Sekunden */
  secondStep?: number;
  /** Minimale wählbare Zeit */
  minTime?: TimeValue | string;
  /** Maximale wählbare Zeit */
  maxTime?: TimeValue | string;
  /** Ist TimePicker deaktiviert? */
  disabled?: boolean;
  /** Ist TimePicker schreibgeschützt? */
  readOnly?: boolean;
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * TimePicker-Komponente für Zeitauswahl
 *
 * @example
 * ```tsx
 * <TimePicker
 *   label="Meeting Time"
 *   value={time}
 *   onChange={setTime}
 *   format="24h"
 * />
 * ```
 */
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      label,
      helperText,
      error,
      format = '24h',
      hideSeconds = true,
      placeholder = 'Select time',
      size = 'md',
      fullWidth = false,
      leftIcon,
      portalTarget = null,
      closeOnSelect = true,
      zIndex = 50,
      minuteStep = 5,
      secondStep = 15,
      minTime,
      maxTime,
      disabled = false,
      readOnly = false,
      className = '',
      id,
      'data-testid': dataTestId = 'time-picker',
      ...rest
    },
    ref
  ) => {
    // Theme-Werte
    const { themeMode } = useTheme();
    const isDarkMode = themeMode === 'dark';

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const timePickerId = id || `time-picker-${uniqueId}`;
    const helperId = `${timePickerId}-helper`;
    const errorId = `${timePickerId}-error`;
    const dropdownId = `${timePickerId}-dropdown`;

    // FormControl context
    const formControl = useFormControl();

    // Parse initial time value
    const parseTimeValue = (val: TimeValue | string | undefined): TimeValue => {
      if (!val) {
        return { hours: 12, minutes: 0, seconds: 0, period: 'AM' };
      }

      if (typeof val === 'string') {
        const parseTimeString = (timeStr: string): TimeValue => {
          // Handle various time formats
          // HH:MM
          const timeRegex24h = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
          // HH:MM:SS
          const timeRegex24hWithSeconds = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
          // HH:MM AM/PM
          const timeRegex12h = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s*(AM|PM)$/i;
          // HH:MM:SS AM/PM
          const timeRegex12hWithSeconds = /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9])\s*(AM|PM)$/i;

          let hours = 0;
          let minutes = 0;
          let seconds = 0;
          let period: 'AM' | 'PM' = 'AM';

          let match;

          if ((match = timeStr.match(timeRegex24h))) {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
            period = hours >= 12 ? 'PM' : 'AM';
            if (format === '12h') {
              hours = hours % 12 || 12;
            }
          } else if ((match = timeStr.match(timeRegex24hWithSeconds))) {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
            seconds = parseInt(match[3], 10);
            period = hours >= 12 ? 'PM' : 'AM';
            if (format === '12h') {
              hours = hours % 12 || 12;
            }
          } else if ((match = timeStr.match(timeRegex12h))) {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
            period = match[3].toUpperCase() as 'AM' | 'PM';
          } else if ((match = timeStr.match(timeRegex12hWithSeconds))) {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
            seconds = parseInt(match[3], 10);
            period = match[4].toUpperCase() as 'AM' | 'PM';
          } else {
            // Default to current time if format is invalid
            const now = new Date();
            hours = format === '24h' ? now.getHours() : now.getHours() % 12 || 12;
            minutes = now.getMinutes();
            seconds = now.getSeconds();
            period = now.getHours() >= 12 ? 'PM' : 'AM';
          }

          return { hours, minutes, seconds, period };
        };

        return parseTimeString(val);
      }

      // Ensure all properties exist
      return {
        hours: val.hours || 0,
        minutes: val.minutes || 0,
        seconds: val.seconds || 0,
        period: val.period || (val.hours >= 12 ? 'PM' : 'AM'),
      };
    };

    // States for controlled/uncontrolled component
    const isControlled = value !== undefined;
    const [timeValue, setTimeValue] = useState<TimeValue>(() =>
      parseTimeValue(defaultValue || value)
    );
    const [inputValue, setInputValue] = useState<string>(() =>
      formatTimeValue(parseTimeValue(defaultValue || value))
    );
    const [isOpen, setIsOpen] = useState(false);

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Combine props from component and FormControl
    const combinedProps = {
      id: timePickerId,
      disabled: disabled || formControl.disabled,
      required: rest.required || formControl.required,
      'aria-invalid': error || formControl.hasError ? true : undefined,
      'aria-describedby':
        [
          error || formControl.hasError ? errorId : undefined,
          helperText && !error && !formControl.hasError ? helperId : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
      'aria-controls': isOpen ? dropdownId : undefined,
    };

    // Format time value to string
    function formatTimeValue(time: TimeValue): string {
      const { hours, minutes, seconds = 0, period = 'AM' } = time;

      if (format === '12h') {
        return hideSeconds
          ? `${hours}:${minutes.toString().padStart(2, '0')} ${period}`
          : `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
      } else {
        // Convert to 24-hour format
        let hours24 = hours;
        if (period === 'PM' && hours < 12) {
          hours24 = hours + 12;
        } else if (period === 'AM' && hours === 12) {
          hours24 = 0;
        }

        return hideSeconds
          ? `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          : `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }

    // Update value when controlled value changes
    useEffect(() => {
      if (isControlled && value) {
        const parsed = parseTimeValue(value);
        setTimeValue(parsed);
        setInputValue(formatTimeValue(parsed));
      }
    }, [value, isControlled, format, hideSeconds]);

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    // State classes for styling
    const stateClasses =
      error || formControl.hasError
        ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
        : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';

    // Additional padding for icons
    const iconPadding = leftIcon ? 'pl-10' : '';

    // Base classes for the input
    const inputClasses = [
      'block rounded-md focus:outline-none focus:ring-2',
      'transition duration-150 ease-in-out',
      'appearance-none',
      'w-full',
      'text-gray-900 dark:text-white',
      'placeholder-gray-400 dark:placeholder-gray-500',
      'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
      'pr-10', // Space for the clock icon
      sizeClasses[size],
      stateClasses,
      iconPadding,
      disabled || readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ].join(' ');

    // Toggle the dropdown
    const toggleDropdown = () => {
      if (!disabled && !readOnly) {
        setIsOpen(!isOpen);
      }
    };

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          isOpen &&
          popupRef.current &&
          inputRef.current &&
          !popupRef.current.contains(e.target as Node) &&
          !inputRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    // Generate time ranges
    const generateTimeOptions = () => {
      // Generate hours
      const hours = Array.from({ length: format === '24h' ? 24 : 12 }, (_, i) =>
        format === '24h' ? i : i + 1
      );

      // Generate minutes
      const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

      // Generate seconds
      const seconds = hideSeconds
        ? []
        : Array.from({ length: 60 / secondStep }, (_, i) => i * secondStep);

      return { hours, minutes, seconds };
    };

    // Update time value
    const updateTime = (
      type: 'hours' | 'minutes' | 'seconds' | 'period',
      newValue: number | 'AM' | 'PM'
    ) => {
      const newTime = { ...timeValue, [type]: newValue };

      if (!isControlled) {
        setTimeValue(newTime);
      }

      setInputValue(formatTimeValue(newTime));

      if (onChange) {
        onChange(newTime);
      }

      if (closeOnSelect && type !== 'period') {
        setIsOpen(false);
      }
    };

    // Calculate popup position
    const calculatePopupPosition = () => {
      if (!inputRef.current) return { top: 0, left: 0 };

      const rect = inputRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // Default position (below input)
      let top = rect.bottom + scrollTop;
      const left = rect.left + scrollLeft;

      // Check if there's enough space below
      const viewportHeight = window.innerHeight;
      const popupHeight = 320; // Estimated height

      if (rect.bottom + popupHeight > viewportHeight && rect.top > popupHeight) {
        // Not enough space below, but enough space above
        top = rect.top + scrollTop - popupHeight;
      }

      return { top, left };
    };

    // Is time option currently selected
    const isSelected = (
      type: 'hours' | 'minutes' | 'seconds' | 'period',
      value: number | 'AM' | 'PM'
    ) => {
      return timeValue[type] === value;
    };

    // Clock icon component
    const ClockIcon = () => (
      <svg
        className="w-5 h-5 text-gray-400 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-testid={`${dataTestId}-clock-icon`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

    // Render time picker dropdown
    const renderTimePicker = () => {
      const options = generateTimeOptions();
      const popupPosition = calculatePopupPosition();

      return (
        <div
          ref={popupRef}
          id={dropdownId}
          role="listbox"
          aria-labelledby={timePickerId}
          className="absolute z-50 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 w-64"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex,
          }}
          data-testid={`${dataTestId}-dropdown`}
        >
          <div className="p-4 flex flex-col">
            {/* Time selection grid */}
            <div className="flex gap-2">
              {/* Hours column */}
              <div className="flex-1 overflow-y-auto max-h-48 border-r border-gray-200 dark:border-gray-700 pr-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  Hours
                </div>
                <div className="space-y-1" role="group" aria-label="Hours">
                  {options.hours.map((hour) => (
                    <div
                      key={`hour-${hour}`}
                      role="option"
                      aria-selected={isSelected('hours', hour)}
                      className={`px-2 py-1 text-sm rounded cursor-pointer ${
                        isSelected('hours', hour)
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => updateTime('hours', hour)}
                      data-testid={`${dataTestId}-hour-${hour}`}
                    >
                      {hour.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Minutes column */}
              <div
                className={`flex-1 overflow-y-auto max-h-48 ${!hideSeconds ? 'border-r border-gray-200 dark:border-gray-700 pr-2' : ''}`}
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  Minutes
                </div>
                <div className="space-y-1" role="group" aria-label="Minutes">
                  {options.minutes.map((minute) => (
                    <div
                      key={`minute-${minute}`}
                      role="option"
                      aria-selected={isSelected('minutes', minute)}
                      className={`px-2 py-1 text-sm rounded cursor-pointer ${
                        isSelected('minutes', minute)
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => updateTime('minutes', minute)}
                      data-testid={`${dataTestId}-minute-${minute}`}
                    >
                      {minute.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Seconds column (optional) */}
              {!hideSeconds && (
                <div className="flex-1 overflow-y-auto max-h-48">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                    Seconds
                  </div>
                  <div className="space-y-1" role="group" aria-label="Seconds">
                    {options.seconds.map((second) => (
                      <div
                        key={`second-${second}`}
                        role="option"
                        aria-selected={isSelected('seconds', second)}
                        className={`px-2 py-1 text-sm rounded cursor-pointer ${
                          isSelected('seconds', second)
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => updateTime('seconds', second)}
                        data-testid={`${dataTestId}-second-${second}`}
                      >
                        {second.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AM/PM selector (for 12h format) */}
            {format === '12h' && (
              <div className="flex mt-4 border-t border-gray-200 dark:border-gray-700 pt-2">
                <div
                  role="option"
                  aria-selected={isSelected('period', 'AM')}
                  className={`flex-1 text-center py-2 rounded cursor-pointer ${
                    isSelected('period', 'AM')
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => updateTime('period', 'AM')}
                  data-testid={`${dataTestId}-period-am`}
                >
                  AM
                </div>
                <div
                  role="option"
                  aria-selected={isSelected('period', 'PM')}
                  className={`flex-1 text-center py-2 rounded cursor-pointer ${
                    isSelected('period', 'PM')
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => updateTime('period', 'PM')}
                  data-testid={`${dataTestId}-period-pm`}
                >
                  PM
                </div>
              </div>
            )}

            {/* Footer with buttons */}
            <div className="flex justify-between mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
              <button
                type="button"
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setIsOpen(false)}
                data-testid={`${dataTestId}-cancel-btn`}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 text-sm bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded"
                onClick={() => {
                  // Apply current selection and close
                  if (!isControlled) {
                    setTimeValue(timeValue);
                  }
                  setInputValue(formatTimeValue(timeValue));
                  if (onChange) {
                    onChange(timeValue);
                  }
                  setIsOpen(false);
                }}
                data-testid={`${dataTestId}-apply-btn`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`} data-testid={`${dataTestId}-container`}>
        {/* Label (if not in a FormControl) */}
        {label && !formControl.label && (
          <label
            htmlFor={combinedProps.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            data-testid={`${dataTestId}-label`}
          >
            {label}
            {combinedProps.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon (if provided) */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Time input */}
          <input
            ref={(el) => {
              // Combine refs
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
              inputRef.current = el;
            }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              try {
                const parsedTime = parseTimeValue(inputValue);
                if (!isControlled) {
                  setTimeValue(parsedTime);
                }
                setInputValue(formatTimeValue(parsedTime));

                if (onChange) {
                  onChange(parsedTime);
                }
              } catch (error) {
                // Invalid time format, revert to previous value
                setInputValue(formatTimeValue(timeValue));
              }
            }}
            onClick={toggleDropdown}
            placeholder={placeholder}
            readOnly={readOnly}
            className={inputClasses}
            data-testid={dataTestId}
            {...combinedProps}
            {...rest}
          />

          {/* Clock icon */}
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${disabled || readOnly ? '' : 'cursor-pointer'}`}
            onClick={toggleDropdown}
          >
            <ClockIcon />
          </div>
        </div>

        {/* Helper text or error message (if not in a FormControl) */}
        {((helperText && !formControl.hasError) || (error && !formControl.hasError)) && (
          <div className="mt-1 text-sm">
            {error ? (
              <p
                id={errorId}
                className="text-red-600 dark:text-red-400"
                data-testid={`${dataTestId}-error`}
              >
                {error}
              </p>
            ) : helperText ? (
              <p
                id={helperId}
                className="text-gray-500 dark:text-gray-400"
                data-testid={`${dataTestId}-helper`}
              >
                {helperText}
              </p>
            ) : null}
          </div>
        )}

        {/* Time picker dropdown */}
        {isOpen &&
          (portalTarget
            ? ReactDOM.createPortal(renderTimePicker(), portalTarget)
            : renderTimePicker())}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
