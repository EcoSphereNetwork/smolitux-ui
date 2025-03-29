// packages/@smolitux/core/src/components/DatePicker/DatePicker.tsx
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormControl } from '../FormControl/FormControl';

// Typen für Datum und Datumsformatierung
type DateValue = Date | null;
type DateFormat = 'yyyy-MM-dd' | 'dd.MM.yyyy' | 'MM/dd/yyyy' | string;

// Hilfsfunktionen für Datumsmanipulation
const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthMatrix = (year: number, month: number): number[][] => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysCount = daysInMonth(year, month);
  const matrix: number[][] = [];
  
  // Adjusting for Sunday as the first day of the week
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  let dayCounter = 1;
  for (let row = 0; row < 6; row++) {
    const week: number[] = [];
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < adjustedFirstDay) {
        week.push(0); // Padding days
      } else if (dayCounter > daysCount) {
        week.push(0); // Padding days
      } else {
        week.push(dayCounter++);
      }
    }
    matrix.push(week);
    if (dayCounter > daysCount) break;
  }
  
  return matrix;
};

const formatDate = (date: Date | null, format: DateFormat): string => {
  if (!date) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  
  switch (format) {
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'dd.MM.yyyy':
      return `${day}.${month}.${year}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    default:
      // Handle custom formats
      return format
        .replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', day);
  }
};

const parseDate = (dateString: string, format: DateFormat): Date | null => {
  if (!dateString) return null;
  
  try {
    let day: number, month: number, year: number;
    
    switch (format) {
      case 'yyyy-MM-dd':
        [year, month, day] = dateString.split('-').map(Number);
        break;
      case 'dd.MM.yyyy':
        [day, month, year] = dateString.split('.').map(Number);
        break;
      case 'MM/dd/yyyy':
        [month, day, year] = dateString.split('/').map(Number);
        break;
      default:
        // For custom formats, use a fallback method
        return new Date(dateString);
    }
    
    // Month is 0-indexed in JavaScript Date
    return new Date(year, month - 1, day);
  } catch (e) {
    console.error('Invalid date format', e);
    return null;
  }
};

const monthNames = [
  'Januar', 'Februar', 'März', 'April', 
  'Mai', 'Juni', 'Juli', 'August', 
  'September', 'Oktober', 'November', 'Dezember'
];

const weekdayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue' | 'size'> {
  /** Ausgewähltes Datum */
  value?: DateValue;
  /** Standard-Ausgewähltes Datum */
  defaultValue?: DateValue;
  /** Callback bei Auswahl eines Datums */
  onChange?: (date: DateValue) => void;
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Format des Datums */
  format?: DateFormat;
  /** Mindestdatum */
  minDate?: Date;
  /** Maximaldatum */
  maxDate?: Date;
  /** Platzhaltertext */
  placeholder?: string;
  /** Anpassbare Wochentagsbezeichnungen */
  weekDayLabels?: string[];
  /** Anpassbare Monatsbezeichnungen */
  monthLabels?: string[];
  /** Größe des DatePickers */
  size?: 'sm' | 'md' | 'lg';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Tastatureingaben erlauben */
  allowKeyboardInput?: boolean;
  /** Manuelle Eingaben erlauben */
  allowManualInput?: boolean;
  /** Icons vor dem Input anzeigen */
  leftIcon?: React.ReactNode;
  /** Portierung des Kalender-Popups */
  portalTarget?: HTMLElement | null;
  /** Automatisches Schließen nach Auswahl */
  closeOnSelect?: boolean;
  /** Z-Index für den Popup */
  zIndex?: number;
  /** Erste Tag der Woche (0 = Sonntag, 1 = Montag, etc.) */
  firstDayOfWeek?: 0 | 1;
  /** Aktuelle Position des Popups */
  popupPosition?: 'bottom' | 'top' | 'auto';
  /** Lokalisierungsobjekt */
  i18n?: {
    /** Text für den Monat-Zurück-Button */
    prevMonth?: string;
    /** Text für den Monat-Vor-Button */
    nextMonth?: string;
    /** Text für den Heute-Button */
    today?: string;
    /** Text für den Löschen-Button */
    clear?: string;
    /** Text für Screenreader, wenn ein Datum ausgewählt wird */
    dateSelected?: string;
    /** Text für Screenreader, wenn ein Datum nicht verfügbar ist */
    dateDisabled?: string;
    /** Text für Screenreader, wenn der Kalender geöffnet wird */
    calendarOpened?: string;
    /** Text für Screenreader, wenn der Kalender geschlossen wird */
    calendarClosed?: string;
  };
  /** Heute-Button anzeigen */
  showTodayButton?: boolean;
  /** Löschen-Button anzeigen */
  showClearButton?: boolean;
  /** Automatische Fokussierung des Kalenders beim Öffnen */
  autoFocus?: boolean;
  /** Callback beim Öffnen des Kalenders */
  onOpen?: () => void;
  /** Callback beim Schließen des Kalenders */
  onClose?: () => void;
  /** Benutzerdefinierte Klasse für den Kalender */
  calendarClassName?: string;
  /** Benutzerdefinierte Klasse für den Header */
  headerClassName?: string;
  /** Benutzerdefinierte Klasse für die Wochentage */
  weekdayClassName?: string;
  /** Benutzerdefinierte Klasse für die Tage */
  dayClassName?: string;
  /** Benutzerdefinierte Klasse für die Fußzeile */
  footerClassName?: string;
}

/**
 * DatePicker-Komponente für Datumsauswahl
 * 
 * @example
 * ```tsx
 * <DatePicker 
 *   label="Geburtsdatum"
 *   value={date}
 *   onChange={setDate}
 *   format="dd.MM.yyyy"
 * />
 * ```
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error,
  format = 'yyyy-MM-dd',
  minDate,
  maxDate,
  placeholder = 'YYYY-MM-DD',
  weekDayLabels = weekdayNames,
  monthLabels = monthNames,
  size = 'md',
  fullWidth = false,
  allowKeyboardInput = true,
  allowManualInput = true,
  leftIcon,
  portalTarget = null,
  closeOnSelect = true,
  zIndex = 50,
  firstDayOfWeek = 1,
  popupPosition = 'bottom',
  className = '',
  disabled = false,
  readOnly = false,
  id,
  i18n = {
    prevMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    today: 'Heute',
    clear: 'Löschen',
    dateSelected: 'Datum ausgewählt',
    dateDisabled: 'Datum nicht verfügbar',
    calendarOpened: 'Kalender geöffnet',
    calendarClosed: 'Kalender geschlossen'
  },
  showTodayButton = false,
  showClearButton = false,
  autoFocus = true,
  onOpen,
  onClose,
  calendarClassName = '',
  headerClassName = '',
  weekdayClassName = '',
  dayClassName = '',
  footerClassName = '',
  ...rest
}, ref) => {
  // Aus dem FormControl-Context importierte Werte
  const formControl = useFormControl();
  
  // Kontrolliert vs. unkontrolliert
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DateValue>(defaultValue || null);
  const [inputValue, setInputValue] = useState<string>('');
  
  // Aktuelles Datum
  const currentDate = isControlled ? value : internalValue;
  
  // Popup-Zustand
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    return currentDate || new Date();
  });
  
  // Referenz auf Input und Picker-Container
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Generiere eine eindeutige ID
  const uniqueId = id || formControl.id || `datepicker-${Math.random().toString(36).substring(2, 9)}`;
  
  // Kombinierte Props aus eigenem und FormControl
  const combinedProps = {
    id: uniqueId,
    disabled: disabled || formControl.disabled,
    required: rest.required,
    'aria-invalid': error ? true : formControl.hasError || undefined,
    'aria-describedby': error || formControl.hasError 
      ? `${uniqueId}-error` 
      : helperText 
        ? `${uniqueId}-helper` 
        : undefined,
  };
  
  // Aktualisiere das Input-Feld, wenn sich der Wert ändert
  useEffect(() => {
    if (isControlled) {
      setInputValue(formatDate(value, format));
      setViewDate(value || new Date());
    }
  }, [value, format, isControlled]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = (error || formControl.hasError)
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Zusätzliches Padding für Icons
  const iconPadding = leftIcon ? 'pl-10' : '';
  
  // Basis-Klassen für den Input
  const inputClasses = [
    'block rounded-md focus:outline-none focus:ring-2',
    'transition duration-150 ease-in-out',
    'appearance-none',
    'w-full',
    'text-gray-900 dark:text-white',
    'placeholder-gray-400 dark:placeholder-gray-500',
    'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
    sizeClasses[size],
    stateClasses,
    iconPadding,
    (disabled || readOnly) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ].join(' ');
  
  // Aktueller Monat und Jahr des Kalenders
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  
  // Kalendertage als Matrix generieren
  const daysMatrix = getMonthMatrix(currentYear, currentMonth);
  
  // Position des Popups berechnen
  const calculatePopupPosition = () => {
    if (!inputRef.current) return { top: 0, left: 0 };
    
    const rect = inputRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Standard-Position (unter dem Input)
    let top = rect.bottom + scrollTop;
    const left = rect.left + scrollLeft;
    
    // Wenn auto oder top gewählt ist, prüfen, ob genug Platz vorhanden ist
    if (popupPosition === 'top' || popupPosition === 'auto') {
      const pickerHeight = 320; // Geschätzte Höhe des Popups
      const viewportHeight = window.innerHeight;
      
      if (popupPosition === 'top' || (rect.bottom + pickerHeight > viewportHeight)) {
        top = rect.top + scrollTop - pickerHeight;
      }
    }
    
    return { top, left };
  };
  
  // Popup öffnen/schließen
  const togglePicker = () => {
    if (!disabled && !readOnly) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      
      // Callbacks aufrufen
      if (newIsOpen) {
        if (onOpen) onOpen();
      } else {
        if (onClose) onClose();
      }
      
      // Screenreader-Ankündigung
      if (newIsOpen) {
        announceToScreenReader(i18n.calendarOpened);
      } else {
        announceToScreenReader(i18n.calendarClosed);
      }
    }
  };
  
  // Ankündigung für Screenreader
  const [announcement, setAnnouncement] = useState<string | null>(null);
  
  const announceToScreenReader = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(null), 1000);
  };
  
  // Datum auswählen
  const selectDate = (day: number) => {
    if (day === 0) return; // Skip padding days
    
    const newDate = new Date(currentYear, currentMonth, day);
    
    // Prüfen, ob das Datum im gültigen Bereich liegt
    if (minDate && newDate < minDate) {
      announceToScreenReader(i18n.dateDisabled);
      return;
    }
    if (maxDate && newDate > maxDate) {
      announceToScreenReader(i18n.dateDisabled);
      return;
    }
    
    // Internes Datum aktualisieren (wenn nicht kontrolliert)
    if (!isControlled) {
      setInternalValue(newDate);
    }
    
    // Input-Wert aktualisieren
    setInputValue(formatDate(newDate, format));
    
    // Callback aufrufen
    if (onChange) {
      onChange(newDate);
    }
    
    // Screenreader-Ankündigung
    announceToScreenReader(i18n.dateSelected + ': ' + formatDate(newDate, format));
    
    // Popup schließen, wenn closeOnSelect
    if (closeOnSelect) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };
  
  // Heute-Datum auswählen
  const selectToday = () => {
    const today = new Date();
    setViewDate(today);
    selectDate(today.getDate());
  };
  
  // Datum löschen
  const clearDate = () => {
    // Internes Datum aktualisieren (wenn nicht kontrolliert)
    if (!isControlled) {
      setInternalValue(null);
    }
    
    // Input-Wert aktualisieren
    setInputValue('');
    
    // Callback aufrufen
    if (onChange) {
      onChange(null);
    }
    
    // Popup schließen
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  // Monat ändern
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setViewDate(newDate);
  };
  
  // Input-Änderungen behandeln
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowManualInput) return;
    
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Versuchen, das Datum zu parsen
    const parsedDate = parseDate(newValue, format);
    
    if (parsedDate) {
      // Internes Datum aktualisieren (wenn nicht kontrolliert)
      if (!isControlled) {
        setInternalValue(parsedDate);
      }
      
      // Ansichtsdatum aktualisieren
      setViewDate(parsedDate);
      
      // Callback aufrufen
      if (onChange) {
        onChange(parsedDate);
      }
    } else {
      // Wenn kein gültiges Datum, internes Datum auf null setzen
      if (!isControlled) {
        setInternalValue(null);
      }
      
      // Callback aufrufen
      if (onChange) {
        onChange(null);
      }
    }
  };
  
  // Keybord-Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!allowKeyboardInput || !isOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        // Einen Tag zurück
        if (currentDate) {
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() - 1);
          if (!isControlled) setInternalValue(newDate);
          setViewDate(newDate);
          setInputValue(formatDate(newDate, format));
          if (onChange) onChange(newDate);
        }
        break;
      case 'ArrowRight':
        // Einen Tag vor
        if (currentDate) {
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 1);
          if (!isControlled) setInternalValue(newDate);
          setViewDate(newDate);
          setInputValue(formatDate(newDate, format));
          if (onChange) onChange(newDate);
        }
        break;
      case 'ArrowUp':
        // Eine Woche zurück
        if (currentDate) {
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() - 7);
          if (!isControlled) setInternalValue(newDate);
          setViewDate(newDate);
          setInputValue(formatDate(newDate, format));
          if (onChange) onChange(newDate);
        }
        break;
      case 'ArrowDown':
        // Eine Woche vor
        if (currentDate) {
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 7);
          if (!isControlled) setInternalValue(newDate);
          setViewDate(newDate);
          setInputValue(formatDate(newDate, format));
          if (onChange) onChange(newDate);
        }
        break;
      case 'Escape':
        // Schließen
        setIsOpen(false);
        break;
      case 'Enter':
      case ' ':
        // Auswählen/Bestätigen
        if (currentDate) {
          selectDate(currentDate.getDate());
        }
        break;
      default:
        break;
    }
  };
  
  // Klick außerhalb schließt das Popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        pickerRef.current &&
        inputRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
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
  
  // Picker-Element generieren
  const calculatedPosition = calculatePopupPosition();
  
  // Kalender-Icon für den Input
  const CalendarIcon = () => (
    <svg
      className="w-5 h-5 text-gray-400 dark:text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
  
  // Render-Funktion für das DatePicker-Dropdown
  const renderPicker = () => {
    return (
      <div
        ref={pickerRef}
        className={`absolute z-${zIndex} bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 w-64 ${calendarClassName}`}
        data-testid="date-picker-calendar"
        role="dialog"
        aria-modal="true"
        aria-label="Datumsauswahl"
        style={{
          top: calculatedPosition.top,
          left: calculatedPosition.left,
        }}
        tabIndex={-1}
      >
        {/* Header mit Monat/Jahr und Navigation */}
        <div className={`flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
          <button
            type="button"
            className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => changeMonth(-1)}
            aria-label={i18n.prevMonth}
          >
            <svg
              className="w-5 h-5"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          
          <div className="text-gray-800 dark:text-gray-200 font-medium" role="heading" aria-level={2}>
            {monthLabels[currentMonth]} {currentYear}
          </div>
          
          <button
            type="button"
            className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => changeMonth(1)}
            aria-label={i18n.nextMonth}
          >
            <svg
              className="w-5 h-5"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        
        {/* Wochentage */}
        <div className={`grid grid-cols-7 gap-0 text-center text-xs text-gray-500 dark:text-gray-400 p-2 ${weekdayClassName}`} role="row">
          {weekDayLabels.map((day, i) => (
            <div key={i} className="p-1" role="columnheader" aria-label={day}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Kalendertage */}
        <div className="p-2">
          {daysMatrix.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-0">
              {week.map((day, dayIndex) => {
                // Bestimme, ob dieser Tag selektiert ist
                const isSelected = currentDate && 
                  currentDate.getDate() === day && 
                  currentDate.getMonth() === currentMonth && 
                  currentDate.getFullYear() === currentYear;
                
                // Bestimme, ob dieser Tag im gültigen Bereich liegt
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const cellDate = day !== 0 ? new Date(currentYear, currentMonth, day) : null;
                const isDisabled = (minDate && cellDate && cellDate < minDate) || 
                                   (maxDate && cellDate && cellDate > maxDate);
                
                const isToday = cellDate && cellDate.getTime() === today.getTime();
                
                return (
                  <div
                    key={dayIndex}
                    className={`
                      p-1 text-center text-sm
                      ${day === 0 ? 'invisible' : 'cursor-pointer'}
                      ${isSelected ? 'bg-primary-600 text-white rounded' : ''}
                      ${isToday && !isSelected ? 'border border-primary-500 rounded' : ''}
                      ${isDisabled ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                    onClick={() => !isDisabled && day !== 0 && selectDate(day)}
                  >
                    {day !== 0 ? day : ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Footer mit Heute-Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center">
          <button
            type="button"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            onClick={() => {
              const today = new Date();
              if (!isControlled) setInternalValue(today);
              setViewDate(today);
              setInputValue(formatDate(today, format));
              if (onChange) onChange(today);
              if (closeOnSelect) setIsOpen(false);
            }}
          >
            Heute
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label (falls außerhalb eines FormControl) */}
      {label && !formControl.label && (
        <label 
          htmlFor={uniqueId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {combinedProps.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Input-Container */}
      <div className="relative">
        {/* Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input-Feld */}
        <input
          ref={(el) => {
            // Ref kombinieren
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }
            if (inputRef) {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }
          }}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={togglePicker}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={!allowManualInput || readOnly}
          className={inputClasses}
          {...combinedProps}
          {...rest}
        />
        
        {/* Kalender-Icon rechts */}
        <div 
          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${disabled || readOnly ? '' : 'cursor-pointer'}`}
          onClick={togglePicker}
        >
          <CalendarIcon />
        </div>
      </div>
      
      {/* Hilfetexzt oder Fehlermeldung (falls außerhalb eines FormControl) */}
      {((helperText && !formControl.hasError) || (error && !formControl.hasError)) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
      
      {/* Popup-Kalender */}
      {isOpen && (
        portalTarget ? (
          // Mit Portal für besseres Stacking
          ReactDOM.createPortal(renderPicker(), portalTarget)
        ) : (
          // Direkt ohne Portal
          renderPicker()
        )
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
