// packages/@smolitux/core/src/components/DatePicker/DatePicker.improved.tsx
import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, any> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

// Versuche den FormControl-Import, mit Fallback für Tests und Entwicklung
let useFormControl: () => {
  id?: string;
  disabled?: boolean;
  hasError?: boolean;
  required?: boolean;
  readOnly?: boolean;
};
try {
  useFormControl = require('../FormControl/FormControl').useFormControl;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useFormControl = () => ({
    id: undefined,
    disabled: false,
    hasError: false,
    required: false,
    readOnly: false
  });
}

// Typen für Datum und Datumsformatierung
type DateValue = Date | null;
type DateRangeValue = [DateValue, DateValue];
type DateFormat = 'yyyy-MM-dd' | 'dd.MM.yyyy' | 'MM/dd/yyyy' | string;

// Typ für den Auswahlmodus
type SelectionMode = 'single' | 'range';

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
  /** Ausgewähltes Datum (einzeln oder Bereich) */
  value?: DateValue | DateRangeValue;
  /** Standard-Ausgewähltes Datum (einzeln oder Bereich) */
  defaultValue?: DateValue | DateRangeValue;
  /** Callback bei Auswahl eines Datums */
  onChange?: (date: DateValue | DateRangeValue) => void;
  /** Auswahlmodus (einzeln oder Bereich) */
  selectionMode?: SelectionMode;
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
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    selectionMode = 'single',
    label,
    helperText,
    error,
    format = 'yyyy-MM-dd',
    minDate,
    maxDate,
    placeholder = selectionMode === 'single' ? 'YYYY-MM-DD' : 'YYYY-MM-DD - YYYY-MM-DD',
    weekDayLabels = weekdayNames,
    monthLabels = monthNames,
    size = 'md',
    fullWidth = false,
    allowKeyboardInput = true,
    allowManualInput = true,
    leftIcon,
    portalTarget = null,
    closeOnSelect = selectionMode === 'single',
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
  } = props;

  // Theme-Werte
  const { themeMode } = useTheme();
  
  // Aus dem FormControl-Context importierte Werte
  const formControl = useFormControl();
  
  // Kontrolliert vs. unkontrolliert
  const isControlled = value !== undefined;
  const isRangeMode = selectionMode === 'range';
  
  // Initialisiere den internen Zustand basierend auf dem Auswahlmodus
  const [internalValue, setInternalValue] = useState<DateValue | DateRangeValue>(() => {
    if (isRangeMode) {
      // Für Range-Modus
      if (Array.isArray(defaultValue) && defaultValue.length === 2) {
        return defaultValue;
      }
      return [null, null];
    } else {
      // Für Single-Modus
      return !Array.isArray(defaultValue) ? defaultValue || null : null;
    }
  });
  
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  
  // Aktuelles Datum oder Datumsbereich
  const currentDate = isControlled ? value : internalValue;
  
  // Hilfsvariablen für den Range-Modus
  const [rangeStart, rangeEnd] = isRangeMode && Array.isArray(currentDate) 
    ? currentDate 
    : [null, null];
  
  // Aktuelle Auswahlphase im Range-Modus (0 = Start, 1 = Ende)
  const [selectionPhase, setSelectionPhase] = useState<0 | 1>(0);
  
  // Popup-Zustand
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (isRangeMode && Array.isArray(currentDate)) {
      return currentDate[0] || currentDate[1] || new Date();
    }
    return !Array.isArray(currentDate) ? currentDate || new Date() : new Date();
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
    required: rest.required || formControl.required,
    'aria-invalid': error ? true : formControl.hasError || undefined,
    'aria-describedby': error || formControl.hasError 
      ? `${uniqueId}-error` 
      : helperText 
        ? `${uniqueId}-helper` 
        : undefined,
  };
  
  // Formatiere einen Datumsbereich als String
  const formatDateRange = (start: DateValue, end: DateValue, format: DateFormat): string => {
    if (!start && !end) return '';
    if (start && !end) return formatDate(start, format);
    if (!start && end) return formatDate(end, format);
    return `${formatDate(start, format)} - ${formatDate(end, format)}`;
  };
  
  // Parse einen Datumsbereich aus einem String
  const parseDateRange = (rangeString: string, format: DateFormat): DateRangeValue => {
    if (!rangeString) return [null, null];
    
    const parts = rangeString.split('-').map(part => part.trim());
    if (parts.length !== 2) return [parseDate(rangeString, format), null];
    
    return [parseDate(parts[0], format), parseDate(parts[1], format)];
  };
  
  // Aktualisiere das Input-Feld, wenn sich der Wert ändert
  useEffect(() => {
    if (isControlled) {
      if (isRangeMode && Array.isArray(value)) {
        setInputValue(formatDateRange(value[0], value[1], format));
        if (value[0] || value[1]) {
          setViewDate(value[0] || value[1] || new Date());
        }
      } else if (!isRangeMode && !Array.isArray(value)) {
        setInputValue(formatDate(value, format));
        if (value) {
          setViewDate(value);
        }
      }
    }
  }, [value, format, isControlled, isRangeMode]);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'h-8 px-3 py-1.5 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-5 py-3 text-lg'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = (error || formControl.hasError || inputError)
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Zusätzliches Padding für Icons
  const iconPadding = leftIcon ? 'pl-10' : '';
  
  // Basis-Klassen für den Input
  const inputClasses = [
    'block rounded-md focus:outline-none focus:ring-2 focus-visible:ring-2',
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
  const calculatePopupPosition = useCallback(() => {
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
  }, [popupPosition]);
  
  // Popup öffnen/schließen
  const togglePicker = useCallback(() => {
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
        announceToScreenReader(i18n.calendarOpened || 'Kalender geöffnet');
      } else {
        announceToScreenReader(i18n.calendarClosed || 'Kalender geschlossen');
      }
    }
  }, [disabled, i18n.calendarClosed, i18n.calendarOpened, isOpen, onClose, onOpen, readOnly]);
  
  // Ankündigung für Screenreader
  const [announcement, setAnnouncement] = useState<string | null>(null);
  
  const announceToScreenReader = useCallback((message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(null), 1000);
  }, []);
  
  // Datum auswählen
  const selectDate = useCallback((day: number) => {
    if (day === 0) return; // Skip padding days
    
    const newDate = new Date(currentYear, currentMonth, day);
    
    // Prüfen, ob das Datum im gültigen Bereich liegt
    if (minDate && newDate < minDate) {
      announceToScreenReader(i18n.dateDisabled || 'Datum nicht verfügbar');
      return;
    }
    if (maxDate && newDate > maxDate) {
      announceToScreenReader(i18n.dateDisabled || 'Datum nicht verfügbar');
      return;
    }
    
    if (isRangeMode) {
      // Bereichsauswahl-Logik
      let newRange: DateRangeValue = [null, null];
      
      if (selectionPhase === 0) {
        // Startdatum auswählen
        newRange = [newDate, null];
        setSelectionPhase(1);
        
        // Screenreader-Ankündigung
        announceToScreenReader('Startdatum ausgewählt: ' + formatDate(newDate, format));
      } else {
        // Enddatum auswählen
        const startDate = Array.isArray(currentDate) ? currentDate[0] : null;
        
        // Stellen Sie sicher, dass das Enddatum nach dem Startdatum liegt
        if (startDate && newDate < startDate) {
          newRange = [newDate, startDate]; // Tausche Start und Ende
        } else {
          newRange = [startDate, newDate];
        }
        
        setSelectionPhase(0);
        
        // Screenreader-Ankündigung
        announceToScreenReader('Datumsbereich ausgewählt: ' + formatDateRange(newRange[0], newRange[1], format));
      }
      
      // Internes Datum aktualisieren (wenn nicht kontrolliert)
      if (!isControlled) {
        setInternalValue(newRange);
      }
      
      // Input-Wert aktualisieren
      setInputValue(formatDateRange(newRange[0], newRange[1], format));
      
      // Callback aufrufen
      if (onChange) {
        onChange(newRange);
      }
      
      // Popup schließen, wenn closeOnSelect und Bereich vollständig ausgewählt
      if (closeOnSelect && selectionPhase === 1) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    } else {
      // Einzelauswahl-Logik
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
    }
  }, [announceToScreenReader, closeOnSelect, currentDate, currentMonth, currentYear, format, i18n.dateDisabled, i18n.dateSelected, isControlled, isRangeMode, maxDate, minDate, onChange, onClose, selectionPhase]);
  
  // Zum vorherigen Monat wechseln
  const goToPreviousMonth = useCallback(() => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);
  
  // Zum nächsten Monat wechseln
  const goToNextMonth = useCallback(() => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);
  
  // Zum heutigen Datum wechseln
  const goToToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    
    // Wenn heute im gültigen Bereich liegt, auswählen
    if ((!minDate || today >= minDate) && (!maxDate || today <= maxDate)) {
      if (isRangeMode) {
        if (selectionPhase === 0) {
          // Startdatum setzen
          const newRange: DateRangeValue = [today, null];
          
          // Internes Datum aktualisieren (wenn nicht kontrolliert)
          if (!isControlled) {
            setInternalValue(newRange);
          }
          
          // Input-Wert aktualisieren
          setInputValue(formatDateRange(newRange[0], newRange[1], format));
          
          // Callback aufrufen
          if (onChange) {
            onChange(newRange);
          }
          
          setSelectionPhase(1);
        } else {
          // Enddatum setzen
          const startDate = Array.isArray(currentDate) ? currentDate[0] : null;
          const newRange: DateRangeValue = [startDate, today];
          
          // Internes Datum aktualisieren (wenn nicht kontrolliert)
          if (!isControlled) {
            setInternalValue(newRange);
          }
          
          // Input-Wert aktualisieren
          setInputValue(formatDateRange(newRange[0], newRange[1], format));
          
          // Callback aufrufen
          if (onChange) {
            onChange(newRange);
          }
          
          setSelectionPhase(0);
          
          // Popup schließen, wenn closeOnSelect
          if (closeOnSelect) {
            setIsOpen(false);
            if (onClose) onClose();
          }
        }
      } else {
        // Einzelauswahl
        // Internes Datum aktualisieren (wenn nicht kontrolliert)
        if (!isControlled) {
          setInternalValue(today);
        }
        
        // Input-Wert aktualisieren
        setInputValue(formatDate(today, format));
        
        // Callback aufrufen
        if (onChange) {
          onChange(today);
        }
        
        // Popup schließen, wenn closeOnSelect
        if (closeOnSelect) {
          setIsOpen(false);
          if (onClose) onClose();
        }
      }
    }
  }, [closeOnSelect, currentDate, format, isControlled, isRangeMode, maxDate, minDate, onChange, onClose, selectionPhase]);
  
  // Auswahl löschen
  const clearSelection = useCallback(() => {
    // Internes Datum aktualisieren (wenn nicht kontrolliert)
    if (!isControlled) {
      setInternalValue(isRangeMode ? [null, null] : null);
    }
    
    // Input-Wert aktualisieren
    setInputValue('');
    
    // Callback aufrufen
    if (onChange) {
      onChange(isRangeMode ? [null, null] : null);
    }
    
    // Popup schließen
    setIsOpen(false);
    if (onClose) onClose();
  }, [isControlled, isRangeMode, onChange, onClose]);
  
  // Manuelle Eingabe verarbeiten
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowManualInput) return;
    
    const newValue = e.target.value;
    setInputValue(newValue);
    setInputError(null);
  }, [allowManualInput]);
  
  // Manuelle Eingabe validieren
  const validateInput = useCallback(() => {
    if (!allowManualInput || !inputValue) return;
    
    if (isRangeMode) {
      // Bereichseingabe validieren
      const range = parseDateRange(inputValue, format);
      
      if (!range[0] && !range[1]) {
        // Leere Eingabe oder ungültiges Format
        if (inputValue.trim() !== '') {
          setInputError('Invalid date format');
          return;
        }
      }
      
      // Prüfen, ob die Daten im gültigen Bereich liegen
      if (range[0] && minDate && range[0] < minDate) {
        setInputError('Date before minimum date');
        return;
      }
      
      if (range[1] && maxDate && range[1] > maxDate) {
        setInputError('Date after maximum date');
        return;
      }
      
      // Internes Datum aktualisieren (wenn nicht kontrolliert)
      if (!isControlled) {
        setInternalValue(range);
      }
      
      // Callback aufrufen
      if (onChange) {
        onChange(range);
      }
    } else {
      // Einzeleingabe validieren
      const date = parseDate(inputValue, format);
      
      if (!date || isNaN(date.getTime())) {
        // Leere Eingabe oder ungültiges Format
        if (inputValue.trim() !== '') {
          setInputError('Invalid date format');
          return;
        }
      } else {
        // Prüfen, ob das Datum im gültigen Bereich liegt
        if (minDate && date < minDate) {
          setInputError('Date before minimum date');
          return;
        }
        
        if (maxDate && date > maxDate) {
          setInputError('Date after maximum date');
          return;
        }
        
        // Internes Datum aktualisieren (wenn nicht kontrolliert)
        if (!isControlled) {
          setInternalValue(date);
        }
        
        // Callback aufrufen
        if (onChange) {
          onChange(date);
        }
      }
    }
  }, [allowManualInput, format, inputValue, isControlled, isRangeMode, maxDate, minDate, onChange]);
  
  // Tastatureingaben verarbeiten
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowKeyboardInput) return;
    
    switch (e.key) {
      case 'Enter':
        if (isOpen) {
          // Wenn der Kalender geöffnet ist, schließen
          setIsOpen(false);
          if (onClose) onClose();
        } else {
          // Wenn der Kalender geschlossen ist, öffnen
          setIsOpen(true);
          if (onOpen) onOpen();
        }
        break;
      case 'Escape':
        if (isOpen) {
          // Kalender schließen
          setIsOpen(false);
          if (onClose) onClose();
        }
        break;
      case 'ArrowDown':
        if (!isOpen) {
          // Kalender öffnen
          setIsOpen(true);
          if (onOpen) onOpen();
        }
        break;
      default:
        break;
    }
  }, [allowKeyboardInput, isOpen, onClose, onOpen]);
  
  // Außerhalb-Klick-Handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        inputRef.current &&
        pickerRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !pickerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Validiere Input beim Blur
  const handleInputBlur = useCallback(() => {
    validateInput();
  }, [validateInput]);
  
  // Prüfen, ob ein Tag deaktiviert ist
  const isDayDisabled = useCallback((day: number): boolean => {
    if (day === 0) return true; // Padding days are always disabled
    
    const date = new Date(currentYear, currentMonth, day);
    
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    
    return false;
  }, [currentMonth, currentYear, maxDate, minDate]);
  
  // Prüfen, ob ein Tag ausgewählt ist
  const isDaySelected = useCallback((day: number): boolean => {
    if (day === 0) return false;
    
    const date = new Date(currentYear, currentMonth, day);
    
    if (isRangeMode && Array.isArray(currentDate)) {
      // Bereichsauswahl
      const [start, end] = currentDate;
      
      if (!start && !end) return false;
      
      if (start && !end) {
        // Nur Startdatum ausgewählt
        return (
          date.getDate() === start.getDate() &&
          date.getMonth() === start.getMonth() &&
          date.getFullYear() === start.getFullYear()
        );
      }
      
      if (!start && end) {
        // Nur Enddatum ausgewählt
        return (
          date.getDate() === end.getDate() &&
          date.getMonth() === end.getMonth() &&
          date.getFullYear() === end.getFullYear()
        );
      }
      
      // Beide Daten ausgewählt
      return (
        (start && 
          date.getDate() === start.getDate() &&
          date.getMonth() === start.getMonth() &&
          date.getFullYear() === start.getFullYear()) ||
        (end && 
          date.getDate() === end.getDate() &&
          date.getMonth() === end.getMonth() &&
          date.getFullYear() === end.getFullYear())
      );
    } else if (!isRangeMode && !Array.isArray(currentDate) && currentDate) {
      // Einzelauswahl
      return (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    }
    
    return false;
  }, [currentDate, currentMonth, currentYear, isRangeMode]);
  
  // Prüfen, ob ein Tag im ausgewählten Bereich liegt
  const isDayInRange = useCallback((day: number): boolean => {
    if (day === 0 || !isRangeMode || !Array.isArray(currentDate)) return false;
    
    const [start, end] = currentDate;
    
    if (!start || !end) return false;
    
    const date = new Date(currentYear, currentMonth, day);
    
    return date > start && date < end;
  }, [currentDate, currentMonth, currentYear, isRangeMode]);
  
  // Kalender-Popup rendern
  const renderCalendarPopup = () => {
    if (!isOpen) return null;
    
    const { top, left } = calculatePopupPosition();
    
    const calendarContent = (
      <div
        ref={pickerRef}
        className={`absolute z-${zIndex} bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 p-4 w-72 ${calendarClassName}`}
        style={{ top, left }}
        role="dialog"
        aria-modal="true"
        aria-label="Datumsauswahl"
        data-testid="date-picker-calendar"
      >
        {/* Kalender-Header */}
        <div className={`flex justify-between items-center mb-4 ${headerClassName}`}>
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={i18n.prevMonth || 'Vorheriger Monat'}
          >
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            {monthLabels[currentMonth]} {currentYear}
          </div>
          
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={i18n.nextMonth || 'Nächster Monat'}
          >
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Wochentage */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDayLabels.map((day, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium text-gray-600 dark:text-gray-400 ${weekdayClassName}`}
              role="columnheader"
              aria-label={day}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Kalendertage */}
        <div className="grid grid-cols-7 gap-1" role="grid">
          {daysMatrix.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isDisabled = isDayDisabled(day);
                const isSelected = isDaySelected(day);
                const isInRange = isDayInRange(day);
                
                return (
                  <div
                    key={dayIndex}
                    role="gridcell"
                    aria-disabled={isDisabled}
                    aria-selected={isSelected}
                  >
                    {day !== 0 ? (
                      <button
                        type="button"
                        onClick={() => selectDate(day)}
                        disabled={isDisabled}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500
                          ${isDisabled ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'cursor-pointer'}
                          ${isSelected 
                            ? 'bg-primary-500 text-white' 
                            : isInRange 
                              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}
                          ${dayClassName}
                        `}
                        aria-label={
                          isDisabled 
                            ? `${day}. ${monthLabels[currentMonth]}, ${currentYear} - ${i18n.dateDisabled || 'Nicht verfügbar'}`
                            : `${day}. ${monthLabels[currentMonth]}, ${currentYear}`
                        }
                        tabIndex={isDisabled ? -1 : 0}
                      >
                        {day}
                      </button>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        
        {/* Footer mit Heute/Löschen-Buttons */}
        {(showTodayButton || showClearButton) && (
          <div className={`mt-4 flex justify-between ${footerClassName}`}>
            {showTodayButton && (
              <button
                type="button"
                onClick={goToToday}
                className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={i18n.today || 'Heute'}
              >
                {i18n.today || 'Heute'}
              </button>
            )}
            
            {showClearButton && (
              <button
                type="button"
                onClick={clearSelection}
                className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={i18n.clear || 'Löschen'}
              >
                {i18n.clear || 'Löschen'}
              </button>
            )}
          </div>
        )}
      </div>
    );
    
    // Wenn ein Portal-Target angegeben ist, rendern wir den Kalender dort
    if (portalTarget) {
      return ReactDOM.createPortal(calendarContent, portalTarget);
    }
    
    // Ansonsten rendern wir den Kalender direkt
    return calendarContent;
  };
  
  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''} ${className}`} data-testid="date-picker-container">
      {/* Label */}
      {label && (
        <label
          htmlFor={uniqueId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {combinedProps.required && (
            <>
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
              <span className="sr-only">(Erforderlich)</span>
            </>
          )}
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
        
        {/* Input */}
        <input
          ref={(node) => {
            // Setze die Referenz für das Input-Element
            inputRef.current = node;
            // Leite die Referenz an die übergebene Ref weiter
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onClick={togglePicker}
          onKeyDown={handleKeyDown}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly || !allowManualInput}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          {...combinedProps}
          {...rest}
        />
        
        {/* Kalender-Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={togglePicker}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full p-1"
            disabled={disabled || readOnly}
            aria-label="Kalender öffnen"
            tabIndex={-1}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Fehlermeldung */}
      {(error || inputError) && (
        <p
          id={`${uniqueId}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error || (inputError === 'Invalid date format' ? 'Invalid date format' : inputError)}
        </p>
      )}
      
      {/* Hilfetext */}
      {helperText && !error && !inputError && (
        <p
          id={`${uniqueId}-helper`}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      
      {/* Screenreader-Ankündigung */}
      {announcement && (
        <div className="sr-only" role="status" aria-live="polite">
          {announcement}
        </div>
      )}
      
      {/* Kalender-Popup */}
      {renderCalendarPopup()}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;