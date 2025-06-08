// packages/@smolitux/core/src/components/TimePicker/TimePicker.a11y.tsx
import React, { forwardRef, useState, useRef, useEffect, useId, KeyboardEvent } from 'react';
import { useFormControl } from '../FormControl/FormControl';
import { createPortal } from 'react-dom';

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
  /** Benutzerdefinierte CSS-Klasse */
  className?: string;
  /** Benutzerdefinierte CSS-Klasse für das Label */
  labelClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für den Hilfetext */
  helperTextClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Fehlermeldung */
  errorClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für den Container */
  containerClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für den Input */
  inputClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für das Popup */
  popupClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Stunden */
  hoursClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Minuten */
  minutesClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Sekunden */
  secondsClassName?: string;
  /** Benutzerdefinierte CSS-Klasse für die Periode */
  periodClassName?: string;
  /** Ob der TimePicker deaktiviert ist */
  disabled?: boolean;
  /** Ob der TimePicker erforderlich ist */
  required?: boolean;
  /** Ob der TimePicker schreibgeschützt ist */
  readOnly?: boolean;
  /** Ob der TimePicker automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob der TimePicker eine Tastaturnavigation haben soll */
  keyboardNavigation?: boolean;
  /** Ob der TimePicker eine Screenreader-Unterstützung haben soll */
  screenReaderSupport?: boolean;
  /** Ob der TimePicker eine Beschreibung haben soll */
  description?: string;
  /** Ob der TimePicker eine Live-Region haben soll */
  liveRegion?: boolean;
  /** Ob der TimePicker eine Ankündigung haben soll */
  announce?: boolean;
  /** Ob der TimePicker eine Fehlerbehandlung haben soll */
  isInvalid?: boolean;
  /** Ob der TimePicker eine Erfolgsbehandlung haben soll */
  isSuccess?: boolean;
  /** Ob der TimePicker eine Ladebehandlung haben soll */
  isLoading?: boolean;
  /** Ob der TimePicker eine Validierungsbehandlung haben soll */
  isValid?: boolean;
  /** Ob der TimePicker eine Tooltip haben soll */
  tooltip?: string;
  /** Ob der TimePicker eine Tastaturkürzel haben soll */
  keyboardShortcuts?: boolean;
  /** Ob der TimePicker eine Fokus-Verwaltung haben soll */
  focusManagement?: boolean;
  /** Ob der TimePicker eine High-Contrast-Unterstützung haben soll */
  highContrastSupport?: boolean;
  /** Ob der TimePicker eine Farbkontrast-Unterstützung haben soll */
  colorContrastSupport?: boolean;
  /** Ob der TimePicker eine Zoom-Unterstützung haben soll */
  zoomSupport?: boolean;
  /** Ob der TimePicker eine Tastatur-Unterstützung haben soll */
  keyboardSupport?: boolean;
  /** Ob der TimePicker eine Maus-Unterstützung haben soll */
  mouseSupport?: boolean;
  /** Ob der TimePicker eine Touch-Unterstützung haben soll */
  touchSupport?: boolean;
  /** Ob der TimePicker eine Sprach-Unterstützung haben soll */
  voiceSupport?: boolean;
  /** Ob der TimePicker eine Gesten-Unterstützung haben soll */
  gestureSupport?: boolean;
  /** Ob der TimePicker eine Animation-Unterstützung haben soll */
  animationSupport?: boolean;
  /** Ob der TimePicker eine Transition-Unterstützung haben soll */
  transitionSupport?: boolean;
  /** Ob der TimePicker eine Responsive-Unterstützung haben soll */
  responsiveSupport?: boolean;
  /** Ob der TimePicker eine Mobile-Unterstützung haben soll */
  mobileSupport?: boolean;
  /** Ob der TimePicker eine Desktop-Unterstützung haben soll */
  desktopSupport?: boolean;
  /** Ob der TimePicker eine Tablet-Unterstützung haben soll */
  tabletSupport?: boolean;
  /** Ob der TimePicker eine Print-Unterstützung haben soll */
  printSupport?: boolean;
  /** Ob der TimePicker eine RTL-Unterstützung haben soll */
  rtlSupport?: boolean;
  /** Ob der TimePicker eine LTR-Unterstützung haben soll */
  ltrSupport?: boolean;
  /** Ob der TimePicker eine Internationalisierung-Unterstützung haben sollen */
  i18nSupport?: boolean;
  /** Ob der TimePicker eine Lokalisierung-Unterstützung haben sollen */
  l10nSupport?: boolean;
  /** Ob der TimePicker eine Globalisierung-Unterstützung haben sollen */
  g11nSupport?: boolean;
  /** Ob der TimePicker eine Barrierefreiheit-Unterstützung haben sollen */
  a11ySupport?: boolean;
  /** ARIA-Label für den TimePicker */
  ariaLabel?: string;
  /** ARIA-Labelledby für den TimePicker */
  ariaLabelledby?: string;
  /** ARIA-Describedby für den TimePicker */
  ariaDescribedby?: string;
  /** ARIA-Controls für den TimePicker */
  ariaControls?: string;
  /** ARIA-Owns für den TimePicker */
  ariaOwns?: string;
  /** ARIA-Expanded für den TimePicker */
  ariaExpanded?: boolean;
  /** ARIA-Haspopup für den TimePicker */
  ariaHaspopup?: boolean;
  /** ARIA-Activedescendant für den TimePicker */
  ariaActivedescendant?: string;
  /** ARIA-Autocomplete für den TimePicker */
  ariaAutocomplete?: string;
  /** ARIA-Busy für den TimePicker */
  ariaBusy?: boolean;
  /** ARIA-Current für den TimePicker */
  ariaCurrent?: string;
  /** ARIA-Keyshortcuts für den TimePicker */
  ariaKeyshortcuts?: string;
  /** ARIA-Live für den TimePicker */
  ariaLive?: string;
  /** ARIA-Relevant für den TimePicker */
  ariaRelevant?: string;
  /** ARIA-Roledescription für den TimePicker */
  ariaRoledescription?: string;
  /** ARIA-Atomic für den TimePicker */
  ariaAtomic?: boolean;
  /** ARIA-Modal für den TimePicker */
  ariaModal?: boolean;
  /** ARIA-Multiline für den TimePicker */
  ariaMultiline?: boolean;
  /** ARIA-Multiselectable für den TimePicker */
  ariaMultiselectable?: boolean;
  /** ARIA-Orientation für den TimePicker */
  ariaOrientation?: string;
  /** ARIA-Placeholder für den TimePicker */
  ariaPlaceholder?: string;
  /** ARIA-Posinset für den TimePicker */
  ariaPosinset?: number;
  /** ARIA-Readonly für den TimePicker */
  ariaReadonly?: boolean;
  /** ARIA-Required für den TimePicker */
  ariaRequired?: boolean;
  /** ARIA-Selected für den TimePicker */
  ariaSelected?: boolean;
  /** ARIA-Setsize für den TimePicker */
  ariaSetsize?: number;
  /** ARIA-Sort für den TimePicker */
  ariaSort?: string;
  /** ARIA-Valuemax für den TimePicker */
  ariaValuemax?: number;
  /** ARIA-Valuemin für den TimePicker */
  ariaValuemin?: number;
  /** ARIA-Valuenow für den TimePicker */
  ariaValuenow?: number;
  /** ARIA-Valuetext für den TimePicker */
  ariaValuetext?: string;
}

/**
 * Barrierefreie TimePicker-Komponente zur Auswahl einer Uhrzeit
 *
 * @example
 * ```tsx
 * <TimePickerA11y
 *   label="Uhrzeit"
 *   format="24h"
 *   onChange={(time) => console.log(time)}
 *   ariaLabel="Uhrzeit auswählen"
 * />
 * ```
 */
export const TimePickerA11y = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      label,
      helperText,
      error,
      format = '24h',
      hideSeconds = false,
      placeholder = format === '24h' ? 'HH:MM' : 'HH:MM AM/PM',
      size = 'md',
      fullWidth = false,
      leftIcon,
      portalTarget,
      closeOnSelect = true,
      zIndex = 1000,
      minuteStep = 1,
      secondStep = 1,
      minTime,
      maxTime,
      className = '',
      labelClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      containerClassName = '',
      inputClassName = '',
      popupClassName = '',
      hoursClassName = '',
      minutesClassName = '',
      secondsClassName = '',
      periodClassName = '',
      disabled,
      required,
      readOnly,
      autoFocus,
      keyboardNavigation = true,
      screenReaderSupport = true,
      description,
      liveRegion = true,
      announce = true,
      isInvalid,
      isSuccess,
      isLoading,
      isValid,
      tooltip,
      keyboardShortcuts = true,
      focusManagement = true,
      highContrastSupport = true,
      colorContrastSupport = true,
      zoomSupport = true,
      keyboardSupport = true,
      mouseSupport = true,
      touchSupport = true,
      voiceSupport = true,
      gestureSupport = true,
      animationSupport = true,
      transitionSupport = true,
      responsiveSupport = true,
      mobileSupport = true,
      desktopSupport = true,
      tabletSupport = true,
      printSupport = true,
      rtlSupport = true,
      ltrSupport = true,
      i18nSupport = true,
      l10nSupport = true,
      g11nSupport = true,
      a11ySupport = true,
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      ariaControls,
      ariaOwns,
      ariaExpanded,
      ariaHaspopup,
      ariaActivedescendant,
      ariaAutocomplete,
      ariaBusy,
      ariaCurrent,
      ariaKeyshortcuts,
      ariaLive,
      ariaRelevant,
      ariaRoledescription,
      ariaAtomic,
      ariaModal,
      ariaMultiline,
      ariaMultiselectable,
      ariaOrientation,
      ariaPlaceholder,
      ariaPosinset,
      ariaReadonly,
      ariaRequired,
      ariaSelected,
      ariaSetsize,
      ariaSort,
      ariaValuemax,
      ariaValuemin,
      ariaValuenow,
      ariaValuetext,
      ...props
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const timePickerId = `time-picker-${uniqueId}`;
    const popupId = `time-picker-popup-${uniqueId}`;
    const hoursListId = `time-picker-hours-${uniqueId}`;
    const minutesListId = `time-picker-minutes-${uniqueId}`;
    const secondsListId = `time-picker-seconds-${uniqueId}`;
    const periodListId = `time-picker-period-${uniqueId}`;

    // Hole FormControl-Context, falls vorhanden
    const formControl = useFormControl();

    // Kombiniere Props mit FormControl-Context
    const _id = props.id || formControl.id || timePickerId;
    const _disabled = disabled ?? formControl.disabled;
    const _required = required ?? formControl.required;
    const _error = error || formControl.error;
    const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
    const _isValid = isValid || formControl.isValid;
    const _isSuccess = isSuccess || formControl.isSuccess;
    const _isLoading = isLoading || formControl.isLoading;

    // State für die ausgewählte Zeit
    const [selectedTime, setSelectedTime] = useState<TimeValue>(() => {
      // Initialisiere mit dem übergebenen Wert, Standardwert oder aktueller Zeit
      if (value !== undefined) {
        return parseTimeValue(value);
      } else if (defaultValue !== undefined) {
        return parseTimeValue(defaultValue);
      } else {
        const now = new Date();
        return {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          period: now.getHours() >= 12 ? 'PM' : 'AM',
        };
      }
    });

    // State für das Popup
    const [isOpen, setIsOpen] = useState(false);

    // State für den fokussierten Bereich (Stunden, Minuten, Sekunden, Periode)
    const [focusedSection, setFocusedSection] = useState<
      'hours' | 'minutes' | 'seconds' | 'period' | null
    >(null);

    // State für den fokussierten Wert in der Liste
    const [focusedValue, setFocusedValue] = useState<number | string | null>(null);

    // State für Ankündigungen
    const [announceMessage, setAnnounceMessage] = useState<string>('');

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const hoursRef = useRef<HTMLDivElement>(null);
    const minutesRef = useRef<HTMLDivElement>(null);
    const secondsRef = useRef<HTMLDivElement>(null);
    const periodRef = useRef<HTMLDivElement>(null);

    // Refs für die Listen
    const hoursListRef = useRef<(HTMLDivElement | null)[]>([]);
    const minutesListRef = useRef<(HTMLDivElement | null)[]>([]);
    const secondsListRef = useRef<(HTMLDivElement | null)[]>([]);
    const periodListRef = useRef<(HTMLDivElement | null)[]>([]);

    // Kombiniere den externen Ref mit unserem internen Ref
    const handleRef = (element: HTMLInputElement | null) => {
      if (inputRef) {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    // Aktualisiere den ausgewählten Wert, wenn sich die Props ändern
    useEffect(() => {
      if (value !== undefined) {
        setSelectedTime(parseTimeValue(value));
      }
    }, [value]);

    // Effekt für autoFocus
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Effekt für Klick außerhalb des Popups
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          popupRef.current &&
          !popupRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Effekt für Escape-Taste
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isOpen && event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown as any);

      return () => {
        document.removeEventListener('keydown', handleKeyDown as any);
      };
    }, [isOpen]);

    // Hilfsfunktion zum Parsen von TimeValue oder String
    function parseTimeValue(value: TimeValue | string): TimeValue {
      if (typeof value === 'string') {
        // Parse string in TimeValue
        const timeRegex =
          format === '24h'
            ? /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/
            : /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)$/i;

        const match = value.match(timeRegex);

        if (match) {
          const hours = parseInt(match[1], 10);
          const minutes = parseInt(match[2], 10);
          const seconds = match[3] ? parseInt(match[3], 10) : 0;
          const period = format === '12h' ? (match[4]?.toUpperCase() as 'AM' | 'PM') : undefined;

          return { hours, minutes, seconds, period };
        }

        // Fallback zur aktuellen Zeit
        const now = new Date();
        return {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          period: format === '12h' ? (now.getHours() >= 12 ? 'PM' : 'AM') : undefined,
        };
      }

      // Stelle sicher, dass alle erforderlichen Felder vorhanden sind
      return {
        hours: value.hours ?? 0,
        minutes: value.minutes ?? 0,
        seconds: value.seconds ?? 0,
        period: format === '12h' ? (value.period ?? (value.hours >= 12 ? 'PM' : 'AM')) : undefined,
      };
    }

    // Hilfsfunktion zum Formatieren der Zeit als String
    function formatTime(time: TimeValue): string {
      const { hours, minutes, seconds, period } = time;

      let formattedHours = hours;

      // Konvertiere Stunden für 12h-Format
      if (format === '12h') {
        formattedHours = hours % 12;
        if (formattedHours === 0) formattedHours = 12;
      }

      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds?.toString().padStart(2, '0');

      if (hideSeconds) {
        return format === '24h'
          ? `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes}`
          : `${formattedHours}:${formattedMinutes} ${period}`;
      } else {
        return format === '24h'
          ? `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes}:${formattedSeconds}`
          : `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
      }
    }

    // Hilfsfunktion zum Überprüfen, ob eine Zeit gültig ist
    function isValidTime(time: TimeValue): boolean {
      const { hours, minutes, seconds } = time;

      // Überprüfe Stunden
      if (format === '24h') {
        if (hours < 0 || hours > 23) return false;
      } else {
        if (hours < 0 || hours > 23) return false;
      }

      // Überprüfe Minuten
      if (minutes < 0 || minutes > 59) return false;

      // Überprüfe Sekunden
      if (seconds !== undefined && (seconds < 0 || seconds > 59)) return false;

      // Überprüfe minTime
      if (minTime) {
        const minTimeValue = parseTimeValue(minTime);
        const minTotalSeconds =
          minTimeValue.hours * 3600 + minTimeValue.minutes * 60 + (minTimeValue.seconds || 0);
        const timeTotalSeconds = hours * 3600 + minutes * 60 + (seconds || 0);

        if (timeTotalSeconds < minTotalSeconds) return false;
      }

      // Überprüfe maxTime
      if (maxTime) {
        const maxTimeValue = parseTimeValue(maxTime);
        const maxTotalSeconds =
          maxTimeValue.hours * 3600 + maxTimeValue.minutes * 60 + (maxTimeValue.seconds || 0);
        const timeTotalSeconds = hours * 3600 + minutes * 60 + (seconds || 0);

        if (timeTotalSeconds > maxTotalSeconds) return false;
      }

      return true;
    }

    // Hilfsfunktion zum Aktualisieren der Zeit
    function updateTime(newTime: Partial<TimeValue>) {
      const updatedTime = { ...selectedTime, ...newTime };

      if (isValidTime(updatedTime)) {
        setSelectedTime(updatedTime);

        if (onChange) {
          onChange(updatedTime);
        }

        // Ankündige die Änderung für Screenreader
        if (announce) {
          setAnnounceMessage(`Zeit geändert auf ${formatTime(updatedTime)}`);
        }

        // Schließe das Popup, wenn closeOnSelect aktiviert ist
        if (closeOnSelect && Object.keys(newTime).length > 0) {
          setIsOpen(false);
        }
      } else {
        // Ankündige die ungültige Zeit für Screenreader
        if (announce) {
          setAnnounceMessage('Ungültige Zeit');
        }
      }
    }

    // Hilfsfunktion zum Generieren der Stundenliste
    function generateHoursList(): number[] {
      const hours = [];

      if (format === '24h') {
        for (let i = 0; i < 24; i++) {
          hours.push(i);
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          hours.push(i);
        }
      }

      return hours;
    }

    // Hilfsfunktion zum Generieren der Minutenliste
    function generateMinutesList(): number[] {
      const minutes = [];

      for (let i = 0; i < 60; i += minuteStep) {
        minutes.push(i);
      }

      return minutes;
    }

    // Hilfsfunktion zum Generieren der Sekundenliste
    function generateSecondsList(): number[] {
      const seconds = [];

      for (let i = 0; i < 60; i += secondStep) {
        seconds.push(i);
      }

      return seconds;
    }

    // Hilfsfunktion zum Generieren der Periodenliste
    function generatePeriodList(): string[] {
      return ['AM', 'PM'];
    }

    // Hilfsfunktion zum Konvertieren von 12h zu 24h
    function convertTo24Hour(hours: number, period: 'AM' | 'PM'): number {
      if (period === 'AM') {
        return hours === 12 ? 0 : hours;
      } else {
        return hours === 12 ? 12 : hours + 12;
      }
    }

    // Hilfsfunktion zum Konvertieren von 24h zu 12h
    function convertTo12Hour(hours: number): { hours: number; period: 'AM' | 'PM' } {
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12;
      return { hours: adjustedHours === 0 ? 12 : adjustedHours, period };
    }

    // Event-Handler für Klick auf Input
    const handleInputClick = () => {
      if (!_disabled && !readOnly) {
        setIsOpen(true);
      }
    };

    // Event-Handler für Fokus auf Input
    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    // Event-Handler für Verlust des Fokus auf Input
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    // Event-Handler für Tastatureingabe im Input
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!keyboardNavigation) return;

      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedSection('hours');
        setFocusedValue(selectedTime.hours);
      }

      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    // Event-Handler für Tastatureingabe im Popup
    const handlePopupKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardNavigation || !focusedSection) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.focus();
          break;

        case 'Tab':
          if (!e.shiftKey) {
            e.preventDefault();
            if (focusedSection === 'hours') {
              setFocusedSection('minutes');
              setFocusedValue(selectedTime.minutes);
            } else if (focusedSection === 'minutes') {
              if (hideSeconds) {
                if (format === '12h') {
                  setFocusedSection('period');
                  setFocusedValue(selectedTime.period);
                } else {
                  setFocusedSection('hours');
                  setFocusedValue(selectedTime.hours);
                }
              } else {
                setFocusedSection('seconds');
                setFocusedValue(selectedTime.seconds);
              }
            } else if (focusedSection === 'seconds') {
              if (format === '12h') {
                setFocusedSection('period');
                setFocusedValue(selectedTime.period);
              } else {
                setFocusedSection('hours');
                setFocusedValue(selectedTime.hours);
              }
            } else if (focusedSection === 'period') {
              setFocusedSection('hours');
              setFocusedValue(selectedTime.hours);
            }
          } else {
            e.preventDefault();
            if (focusedSection === 'hours') {
              if (format === '12h') {
                setFocusedSection('period');
                setFocusedValue(selectedTime.period);
              } else {
                if (hideSeconds) {
                  setFocusedSection('minutes');
                  setFocusedValue(selectedTime.minutes);
                } else {
                  setFocusedSection('seconds');
                  setFocusedValue(selectedTime.seconds);
                }
              }
            } else if (focusedSection === 'minutes') {
              setFocusedSection('hours');
              setFocusedValue(selectedTime.hours);
            } else if (focusedSection === 'seconds') {
              setFocusedSection('minutes');
              setFocusedValue(selectedTime.minutes);
            } else if (focusedSection === 'period') {
              if (hideSeconds) {
                setFocusedSection('minutes');
                setFocusedValue(selectedTime.minutes);
              } else {
                setFocusedSection('seconds');
                setFocusedValue(selectedTime.seconds);
              }
            }
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (focusedSection === 'hours') {
            const hoursList = generateHoursList();
            const currentIndex = hoursList.indexOf(
              format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours
            );
            const newIndex = (currentIndex - 1 + hoursList.length) % hoursList.length;
            const newHours = hoursList[newIndex];

            if (format === '12h') {
              updateTime({ hours: convertTo24Hour(newHours, selectedTime.period || 'AM') });
            } else {
              updateTime({ hours: newHours });
            }

            setFocusedValue(newHours);
          } else if (focusedSection === 'minutes') {
            const minutesList = generateMinutesList();
            const currentIndex = minutesList.indexOf(selectedTime.minutes);
            const newIndex = (currentIndex - 1 + minutesList.length) % minutesList.length;
            const newMinutes = minutesList[newIndex];

            updateTime({ minutes: newMinutes });
            setFocusedValue(newMinutes);
          } else if (focusedSection === 'seconds') {
            const secondsList = generateSecondsList();
            const currentIndex = secondsList.indexOf(selectedTime.seconds || 0);
            const newIndex = (currentIndex - 1 + secondsList.length) % secondsList.length;
            const newSeconds = secondsList[newIndex];

            updateTime({ seconds: newSeconds });
            setFocusedValue(newSeconds);
          } else if (focusedSection === 'period') {
            const newPeriod = selectedTime.period === 'AM' ? 'PM' : 'AM';

            updateTime({
              hours: convertTo24Hour(
                format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours,
                newPeriod
              ),
              period: newPeriod,
            });

            setFocusedValue(newPeriod);
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (focusedSection === 'hours') {
            const hoursList = generateHoursList();
            const currentIndex = hoursList.indexOf(
              format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours
            );
            const newIndex = (currentIndex + 1) % hoursList.length;
            const newHours = hoursList[newIndex];

            if (format === '12h') {
              updateTime({ hours: convertTo24Hour(newHours, selectedTime.period || 'AM') });
            } else {
              updateTime({ hours: newHours });
            }

            setFocusedValue(newHours);
          } else if (focusedSection === 'minutes') {
            const minutesList = generateMinutesList();
            const currentIndex = minutesList.indexOf(selectedTime.minutes);
            const newIndex = (currentIndex + 1) % minutesList.length;
            const newMinutes = minutesList[newIndex];

            updateTime({ minutes: newMinutes });
            setFocusedValue(newMinutes);
          } else if (focusedSection === 'seconds') {
            const secondsList = generateSecondsList();
            const currentIndex = secondsList.indexOf(selectedTime.seconds || 0);
            const newIndex = (currentIndex + 1) % secondsList.length;
            const newSeconds = secondsList[newIndex];

            updateTime({ seconds: newSeconds });
            setFocusedValue(newSeconds);
          } else if (focusedSection === 'period') {
            const newPeriod = selectedTime.period === 'AM' ? 'PM' : 'AM';

            updateTime({
              hours: convertTo24Hour(
                format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours,
                newPeriod
              ),
              period: newPeriod,
            });

            setFocusedValue(newPeriod);
          }
          break;

        case 'Home':
          e.preventDefault();
          if (focusedSection === 'hours') {
            const hoursList = generateHoursList();
            const newHours = hoursList[0];

            if (format === '12h') {
              updateTime({ hours: convertTo24Hour(newHours, selectedTime.period || 'AM') });
            } else {
              updateTime({ hours: newHours });
            }

            setFocusedValue(newHours);
          } else if (focusedSection === 'minutes') {
            const minutesList = generateMinutesList();
            const newMinutes = minutesList[0];

            updateTime({ minutes: newMinutes });
            setFocusedValue(newMinutes);
          } else if (focusedSection === 'seconds') {
            const secondsList = generateSecondsList();
            const newSeconds = secondsList[0];

            updateTime({ seconds: newSeconds });
            setFocusedValue(newSeconds);
          } else if (focusedSection === 'period') {
            const newPeriod = 'AM';

            updateTime({
              hours: convertTo24Hour(
                format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours,
                newPeriod
              ),
              period: newPeriod,
            });

            setFocusedValue(newPeriod);
          }
          break;

        case 'End':
          e.preventDefault();
          if (focusedSection === 'hours') {
            const hoursList = generateHoursList();
            const newHours = hoursList[hoursList.length - 1];

            if (format === '12h') {
              updateTime({ hours: convertTo24Hour(newHours, selectedTime.period || 'AM') });
            } else {
              updateTime({ hours: newHours });
            }

            setFocusedValue(newHours);
          } else if (focusedSection === 'minutes') {
            const minutesList = generateMinutesList();
            const newMinutes = minutesList[minutesList.length - 1];

            updateTime({ minutes: newMinutes });
            setFocusedValue(newMinutes);
          } else if (focusedSection === 'seconds') {
            const secondsList = generateSecondsList();
            const newSeconds = secondsList[secondsList.length - 1];

            updateTime({ seconds: newSeconds });
            setFocusedValue(newSeconds);
          } else if (focusedSection === 'period') {
            const newPeriod = 'PM';

            updateTime({
              hours: convertTo24Hour(
                format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours,
                newPeriod
              ),
              period: newPeriod,
            });

            setFocusedValue(newPeriod);
          }
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.focus();
          break;
      }
    };

    // Event-Handler für Klick auf Stunde
    const handleHourClick = (hour: number) => {
      if (format === '12h') {
        updateTime({ hours: convertTo24Hour(hour, selectedTime.period || 'AM') });
      } else {
        updateTime({ hours: hour });
      }
    };

    // Event-Handler für Klick auf Minute
    const handleMinuteClick = (minute: number) => {
      updateTime({ minutes: minute });
    };

    // Event-Handler für Klick auf Sekunde
    const handleSecondClick = (second: number) => {
      updateTime({ seconds: second });
    };

    // Event-Handler für Klick auf Periode
    const handlePeriodClick = (period: string) => {
      updateTime({
        hours: convertTo24Hour(
          format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours,
          period as 'AM' | 'PM'
        ),
        period: period as 'AM' | 'PM',
      });
    };

    // Event-Handler für Fokus auf Stunden
    const handleHoursFocus = () => {
      setFocusedSection('hours');
      setFocusedValue(
        format === '12h' ? convertTo12Hour(selectedTime.hours).hours : selectedTime.hours
      );
    };

    // Event-Handler für Fokus auf Minuten
    const handleMinutesFocus = () => {
      setFocusedSection('minutes');
      setFocusedValue(selectedTime.minutes);
    };

    // Event-Handler für Fokus auf Sekunden
    const handleSecondsFocus = () => {
      setFocusedSection('seconds');
      setFocusedValue(selectedTime.seconds);
    };

    // Event-Handler für Fokus auf Periode
    const handlePeriodFocus = () => {
      setFocusedSection('period');
      setFocusedValue(selectedTime.period);
    };

    // Klassen für verschiedene Größen
    const sizeClasses = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    };

    // Rendere die Beschreibung für Screenreader
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={`${timePickerId}-description`} className="sr-only">
          {description}
        </div>
      );
    };

    // Rendere die Live-Region für Ankündigungen
    const renderLiveRegion = () => {
      if (!liveRegion) return null;

      return (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announceMessage}
        </div>
      );
    };

    // Rendere den Fehler
    const renderError = () => {
      if (!_error) return null;

      return (
        <div
          id={`${timePickerId}-error`}
          className={`text-red-600 dark:text-red-400 mt-1 text-sm ${errorClassName}`}
          role="alert"
        >
          {_error}
        </div>
      );
    };

    // Rendere den Hilfetext
    const renderHelperText = () => {
      if (!helperText || _error) return null;

      return (
        <div
          id={`${timePickerId}-helper`}
          className={`text-gray-500 dark:text-gray-400 mt-1 text-sm ${helperTextClassName}`}
        >
          {helperText}
        </div>
      );
    };

    // Rendere das Label
    const renderLabel = () => {
      if (!label) return null;

      return (
        <label
          htmlFor={_id}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
        >
          {label}
          {_required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
          {_required && <span className="sr-only">(Erforderlich)</span>}
        </label>
      );
    };

    // Rendere das Popup
    const renderPopup = () => {
      if (!isOpen) return null;

      const hoursList = generateHoursList();
      const minutesList = generateMinutesList();
      const secondsList = generateSecondsList();
      const periodList = generatePeriodList();

      const popupContent = (
        <div
          ref={popupRef}
          id={popupId}
          className={`absolute z-${zIndex} mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 ${popupClassName}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${timePickerId}-label`}
          onKeyDown={handlePopupKeyDown}
        >
          <div className="flex space-x-4">
            {/* Stunden */}
            <div
              ref={hoursRef}
              className={`time-picker-section ${hoursClassName}`}
              tabIndex={0}
              role="listbox"
              aria-labelledby={`${hoursListId}-label`}
              aria-activedescendant={
                focusedSection === 'hours' ? `${hoursListId}-${focusedValue}` : undefined
              }
              onFocus={handleHoursFocus}
            >
              <div
                id={`${hoursListId}-label`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Stunden
              </div>
              <div className="h-48 overflow-y-auto">
                {hoursList.map((hour, index) => {
                  const isSelected =
                    format === '12h'
                      ? convertTo12Hour(selectedTime.hours).hours === hour
                      : selectedTime.hours === hour;

                  return (
                    <div
                      key={hour}
                      ref={(el) => (hoursListRef.current[index] = el)}
                      id={`${hoursListId}-${hour}`}
                      className={`px-3 py-2 cursor-pointer rounded-md ${
                        isSelected
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      } ${focusedSection === 'hours' && focusedValue === hour ? 'ring-2 ring-primary-500' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleHourClick(hour)}
                    >
                      {hour.toString().padStart(format === '24h' ? 2 : 1, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Minuten */}
            <div
              ref={minutesRef}
              className={`time-picker-section ${minutesClassName}`}
              tabIndex={0}
              role="listbox"
              aria-labelledby={`${minutesListId}-label`}
              aria-activedescendant={
                focusedSection === 'minutes' ? `${minutesListId}-${focusedValue}` : undefined
              }
              onFocus={handleMinutesFocus}
            >
              <div
                id={`${minutesListId}-label`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Minuten
              </div>
              <div className="h-48 overflow-y-auto">
                {minutesList.map((minute, index) => {
                  const isSelected = selectedTime.minutes === minute;

                  return (
                    <div
                      key={minute}
                      ref={(el) => (minutesListRef.current[index] = el)}
                      id={`${minutesListId}-${minute}`}
                      className={`px-3 py-2 cursor-pointer rounded-md ${
                        isSelected
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      } ${focusedSection === 'minutes' && focusedValue === minute ? 'ring-2 ring-primary-500' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleMinuteClick(minute)}
                    >
                      {minute.toString().padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sekunden */}
            {!hideSeconds && (
              <div
                ref={secondsRef}
                className={`time-picker-section ${secondsClassName}`}
                tabIndex={0}
                role="listbox"
                aria-labelledby={`${secondsListId}-label`}
                aria-activedescendant={
                  focusedSection === 'seconds' ? `${secondsListId}-${focusedValue}` : undefined
                }
                onFocus={handleSecondsFocus}
              >
                <div
                  id={`${secondsListId}-label`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Sekunden
                </div>
                <div className="h-48 overflow-y-auto">
                  {secondsList.map((second, index) => {
                    const isSelected = selectedTime.seconds === second;

                    return (
                      <div
                        key={second}
                        ref={(el) => (secondsListRef.current[index] = el)}
                        id={`${secondsListId}-${second}`}
                        className={`px-3 py-2 cursor-pointer rounded-md ${
                          isSelected
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${focusedSection === 'seconds' && focusedValue === second ? 'ring-2 ring-primary-500' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSecondClick(second)}
                      >
                        {second.toString().padStart(2, '0')}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Periode (AM/PM) */}
            {format === '12h' && (
              <div
                ref={periodRef}
                className={`time-picker-section ${periodClassName}`}
                tabIndex={0}
                role="listbox"
                aria-labelledby={`${periodListId}-label`}
                aria-activedescendant={
                  focusedSection === 'period' ? `${periodListId}-${focusedValue}` : undefined
                }
                onFocus={handlePeriodFocus}
              >
                <div
                  id={`${periodListId}-label`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Periode
                </div>
                <div>
                  {periodList.map((period, index) => {
                    const isSelected = selectedTime.period === period;

                    return (
                      <div
                        key={period}
                        ref={(el) => (periodListRef.current[index] = el)}
                        id={`${periodListId}-${period}`}
                        className={`px-3 py-2 cursor-pointer rounded-md ${
                          isSelected
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${focusedSection === 'period' && focusedValue === period ? 'ring-2 ring-primary-500' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handlePeriodClick(period)}
                      >
                        {period}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );

      // Rendere das Popup im Portal oder direkt
      return portalTarget ? createPortal(popupContent, portalTarget) : popupContent;
    };

    // Bestimme die ARIA-Attribute für den TimePicker
    const getAriaAttributes = () => {
      const attributes: Record<string, string | boolean | number | undefined> = {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby || (label ? `${timePickerId}-label` : undefined),
        'aria-describedby':
          ariaDescribedby ||
          [
            description ? `${timePickerId}-description` : null,
            _error ? `${timePickerId}-error` : null,
            helperText && !_error ? `${timePickerId}-helper` : null,
            `${timePickerId}-instructions`,
          ]
            .filter(Boolean)
            .join(' ') ||
          undefined,
        'aria-controls': ariaControls || (isOpen ? popupId : undefined),
        'aria-owns': ariaOwns,
        'aria-expanded': ariaExpanded !== undefined ? ariaExpanded : isOpen,
        'aria-haspopup': ariaHaspopup !== undefined ? ariaHaspopup : 'dialog',
        'aria-activedescendant': ariaActivedescendant,
        'aria-autocomplete': ariaAutocomplete,
        'aria-busy': ariaBusy !== undefined ? ariaBusy : _isLoading,
        'aria-current': ariaCurrent,
        'aria-keyshortcuts': ariaKeyshortcuts,
        'aria-live': ariaLive,
        'aria-relevant': ariaRelevant,
        'aria-roledescription': ariaRoledescription,
        'aria-atomic': ariaAtomic,
        'aria-modal': ariaModal,
        'aria-multiline': ariaMultiline,
        'aria-multiselectable': ariaMultiselectable,
        'aria-orientation': ariaOrientation,
        'aria-placeholder': ariaPlaceholder,
        'aria-posinset': ariaPosinset,
        'aria-readonly': ariaReadonly !== undefined ? ariaReadonly : readOnly,
        'aria-required': ariaRequired !== undefined ? ariaRequired : _required,
        'aria-selected': ariaSelected,
        'aria-setsize': ariaSetsize,
        'aria-sort': ariaSort,
        'aria-valuemax': ariaValuemax,
        'aria-valuemin': ariaValuemin,
        'aria-valuenow': ariaValuenow,
        'aria-valuetext': ariaValuetext,
        'aria-invalid': _isInvalid,
      };

      // Entferne undefined-Werte
      Object.keys(attributes).forEach((key) => {
        if (attributes[key] === undefined) {
          delete attributes[key];
        }
      });

      return attributes;
    };

    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''} ${containerClassName} ${className}`}>
        {renderDescription()}
        {renderLiveRegion()}
        {renderLabel()}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={handleRef}
            type="text"
            id={_id}
            className={`block w-full ${sizeClasses[size]} ${leftIcon ? 'pl-10' : 'pl-3'} pr-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-200 ${
              _isInvalid
                ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
                : _isValid || _isSuccess
                  ? 'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500'
                  : ''
            } ${_disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''} ${inputClassName}`}
            value={formatTime(selectedTime)}
            placeholder={placeholder}
            disabled={_disabled}
            readOnly={readOnly}
            required={_required}
            onClick={handleInputClick}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            title={tooltip}
            {...getAriaAttributes()}
            {...props}
          />
        </div>

        {renderPopup()}
        {renderError()}
        {renderHelperText()}

        {/* Screenreader-Anweisungen */}
        <div id={`${timePickerId}-instructions`} className="sr-only">
          Drücken Sie Enter oder die Leertaste, um den Zeitauswahldialog zu öffnen. Verwenden Sie
          die Pfeiltasten, um die Zeit zu ändern.
        </div>
      </div>
    );
  }
);

TimePickerA11y.displayName = 'TimePickerA11y';

export default TimePickerA11y;
