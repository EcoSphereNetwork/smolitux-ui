# Smolitux UI Bibliothek - Komponenten-Entwicklungsplan

## 1. Grundlegende Komponenten

### 1.1 Button-Komponente

#### Aktueller Status
Die Button-Komponente ist bereits implementiert, aber es gibt Verbesserungsmöglichkeiten in Bezug auf Barrierefreiheit und Konsistenz.

#### Zu implementierende Verbesserungen
- Überprüfung der ARIA-Attribute für bessere Barrierefreiheit
- Konsistente Styling-Varianten (primary, secondary, ghost, link, solid, outline)
- Verbesserte Hover- und Fokus-Zustände
- Optimierte Loading-Animation
- Verbesserte TypeScript-Typisierung

#### Implementierungsbeispiel
```tsx
// Button.tsx
import React, { forwardRef } from 'react';
import { Spinner } from '../Spinner';
import { classNames } from '../../utils';

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost'
  | 'link'
  | 'solid'
  | 'outline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visuelle Variante des Buttons */
  variant?: ButtonVariant;
  /** Größe des Buttons */
  size?: ButtonSize;
  /** Button auf volle Breite */
  fullWidth?: boolean;
  /** Icon vor dem Text */
  leftIcon?: React.ReactNode;
  /** Icon nach dem Text */
  rightIcon?: React.ReactNode;
  /** Loading-Zustand */
  loading?: boolean;
  /** Alias für loading (für Kompatibilität) */
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      isLoading = false,
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading || isLoading;
    const showLoading = loading || isLoading;

    const buttonClasses = classNames(
      'smx-button',
      `smx-button--${variant}`,
      `smx-button--${size}`,
      fullWidth && 'smx-button--full-width',
      isDisabled && 'smx-button--disabled',
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={showLoading}
        {...rest}
      >
        {showLoading && (
          <span className="smx-button__spinner">
            <Spinner size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} />
          </span>
        )}
        {leftIcon && <span className="smx-button__left-icon">{leftIcon}</span>}
        <span className="smx-button__text">{children}</span>
        {rightIcon && <span className="smx-button__right-icon">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 1.2 Input-Komponente

#### Aktueller Status
Die Input-Komponente ist teilweise implementiert, aber es fehlen einige Funktionen und die Barrierefreiheit muss verbessert werden.

#### Zu implementierende Verbesserungen
- Vollständige Unterstützung für verschiedene Input-Typen
- Verbesserte Fehlerbehandlung und Validierung
- Integrierte Label- und Hilfetextunterstützung
- Barrierefreiheitsverbesserungen (ARIA-Attribute)
- Unterstützung für Präfix- und Suffix-Elemente

#### Implementierungsbeispiel
```tsx
// Input.tsx
import React, { forwardRef } from 'react';
import { classNames } from '../../utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label für das Input-Feld */
  label?: string;
  /** Hilfetext unter dem Input-Feld */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe des Input-Felds */
  size?: 'sm' | 'md' | 'lg';
  /** Element vor dem Input-Feld */
  prefix?: React.ReactNode;
  /** Element nach dem Input-Feld */
  suffix?: React.ReactNode;
  /** Ob das Input-Feld die volle Breite einnehmen soll */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      prefix,
      suffix,
      fullWidth = false,
      id,
      className = '',
      disabled = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const inputClasses = classNames(
      'smx-input',
      `smx-input--${size}`,
      hasError && 'smx-input--error',
      disabled && 'smx-input--disabled',
      fullWidth && 'smx-input--full-width',
      className
    );

    return (
      <div className="smx-input-container">
        {label && (
          <label htmlFor={inputId} className="smx-input__label">
            {label}
            {required && <span className="smx-input__required">*</span>}
          </label>
        )}
        <div className="smx-input__wrapper">
          {prefix && <div className="smx-input__prefix">{prefix}</div>}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            required={required}
            {...rest}
          />
          {suffix && <div className="smx-input__suffix">{suffix}</div>}
        </div>
        {helperText && !hasError && (
          <div id={helperId} className="smx-input__helper-text">
            {helperText}
          </div>
        )}
        {hasError && (
          <div id={errorId} className="smx-input__error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### 1.3 Select-Komponente

#### Aktueller Status
Die Select-Komponente ist teilweise implementiert, aber es fehlen erweiterte Funktionen wie Mehrfachauswahl und Gruppierung.

#### Zu implementierende Verbesserungen
- Unterstützung für Mehrfachauswahl
- Optionsgruppierung
- Suchfunktion für große Optionslisten
- Verbesserte Tastaturnavigation
- Barrierefreiheitsverbesserungen

#### Implementierungsbeispiel
```tsx
// Select.tsx
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
  /** Label für das Select-Feld */
  label?: string;
  /** Hilfetext unter dem Select-Feld */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe des Select-Felds */
  size?: 'sm' | 'md' | 'lg';
  /** Ob mehrere Optionen ausgewählt werden können */
  isMulti?: boolean;
  /** Ob eine Suchfunktion aktiviert werden soll */
  isSearchable?: boolean;
  /** Optionen für das Select-Feld */
  options: SelectOption[];
  /** Ob das Select-Feld die volle Breite einnehmen soll */
  fullWidth?: boolean;
  /** Platzhaltertext */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      isMulti = false,
      isSearchable = false,
      options = [],
      fullWidth = false,
      placeholder,
      id,
      className = '',
      disabled = false,
      required = false,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    // Gruppierte Optionen
    const groupedOptions = options.reduce((acc, option) => {
      const group = option.group || '';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);

    const selectClasses = classNames(
      'smx-select',
      `smx-select--${size}`,
      hasError && 'smx-select--error',
      disabled && 'smx-select--disabled',
      fullWidth && 'smx-select--full-width',
      className
    );

    return (
      <div className="smx-select-container">
        {label && (
          <label htmlFor={selectId} className="smx-select__label">
            {label}
            {required && <span className="smx-select__required">*</span>}
          </label>
        )}
        <div className="smx-select__wrapper">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            required={required}
            multiple={isMulti}
            value={value}
            onChange={onChange}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {Object.keys(groupedOptions).length === 0 && 
              options.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            }
            {Object.keys(groupedOptions).length > 0 &&
              Object.entries(groupedOptions).map(([group, groupOptions]) => (
                group ? (
                  <optgroup key={group} label={group}>
                    {groupOptions.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  groupOptions.map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))
                )
              ))
            }
          </select>
          <div className="smx-select__arrow">▼</div>
        </div>
        {helperText && !hasError && (
          <div id={helperId} className="smx-select__helper-text">
            {helperText}
          </div>
        )}
        {hasError && (
          <div id={errorId} className="smx-select__error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
```

## 2. Layout-Komponenten

### 2.1 Grid-Komponente

#### Aktueller Status
Die Grid-Komponente ist vorhanden, aber könnte verbessert werden, um mehr Flexibilität und Responsivität zu bieten.

#### Zu implementierende Verbesserungen
- Verbesserte Unterstützung für verschiedene Bildschirmgrößen
- Automatische Anpassung der Spaltenanzahl
- Unterstützung für Abstände zwischen Elementen
- Verbesserte TypeScript-Typisierung

#### Implementierungsbeispiel
```tsx
// Grid.tsx
import React, { forwardRef } from 'react';
import { classNames } from '../../utils';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Anzahl der Spalten */
  columns?: GridColumns | { [key: string]: GridColumns };
  /** Abstand zwischen den Elementen */
  gap?: GridGap | { [key: string]: GridGap };
  /** Ob die Elemente auf die gleiche Höhe gestreckt werden sollen */
  equalHeight?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      columns = 12,
      gap = 'md',
      equalHeight = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const gridClasses = classNames(
      'smx-grid',
      typeof columns === 'object'
        ? Object.entries(columns).map(([breakpoint, cols]) => 
            `smx-grid--${breakpoint}-${cols}`
          )
        : `smx-grid--cols-${columns}`,
      typeof gap === 'object'
        ? Object.entries(gap).map(([breakpoint, gapSize]) => 
            `smx-grid--${breakpoint}-gap-${gapSize}`
          )
        : `smx-grid--gap-${gap}`,
      equalHeight && 'smx-grid--equal-height',
      className
    );

    return (
      <div ref={ref} className={gridClasses} {...rest}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
```

### 2.2 Container-Komponente

#### Aktueller Status
Die Container-Komponente ist vorhanden, aber könnte verbessert werden, um mehr Flexibilität zu bieten.

#### Zu implementierende Verbesserungen
- Unterstützung für verschiedene Breiten
- Verbesserte Responsivität
- Optionale Padding-Einstellungen

#### Implementierungsbeispiel
```tsx
// Container.tsx
import React, { forwardRef } from 'react';
import { classNames } from '../../utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximale Breite des Containers */
  size?: ContainerSize;
  /** Innenabstand des Containers */
  padding?: ContainerPadding;
  /** Ob der Container zentriert werden soll */
  centered?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'lg',
      padding = 'md',
      centered = true,
      className = '',
      ...rest
    },
    ref
  ) => {
    const containerClasses = classNames(
      'smx-container',
      `smx-container--${size}`,
      `smx-container--padding-${padding}`,
      centered && 'smx-container--centered',
      className
    );

    return (
      <div ref={ref} className={containerClasses} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
```

## 3. Formular-Komponenten

### 3.1 Form-Komponente

#### Aktueller Status
Die Form-Komponente ist teilweise implementiert, aber es fehlen erweiterte Funktionen für Validierung und Fehlerbehandlung.

#### Zu implementierende Verbesserungen
- Integrierte Formularvalidierung
- Unterstützung für Formularfelder-Gruppierung
- Verbesserte Fehlerbehandlung
- Unterstützung für Formular-Reset und -Submission

#### Implementierungsbeispiel
```tsx
// Form.tsx
import React, { forwardRef, useState, useCallback } from 'react';
import { classNames } from '../../utils';

export interface FormValues {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Initiale Werte des Formulars */
  initialValues?: FormValues;
  /** Validierungsfunktion */
  validate?: (values: FormValues) => FormErrors;
  /** Callback bei erfolgreicher Validierung */
  onValidSubmit?: (values: FormValues) => void;
  /** Callback bei Änderung der Formularwerte */
  onChange?: (values: FormValues) => void;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      initialValues = {},
      validate,
      onValidSubmit,
      onChange,
      className = '',
      onSubmit,
      ...rest
    },
    ref
  ) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value;
        
        const newValues = {
          ...values,
          [name]: newValue
        };
        
        setValues(newValues);
        setTouched({ ...touched, [name]: true });
        
        if (onChange) {
          onChange(newValues);
        }
        
        if (validate) {
          const newErrors = validate(newValues);
          setErrors(newErrors);
        }
      },
      [values, touched, onChange, validate]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        
        if (validate) {
          const newErrors = validate(values);
          setErrors(newErrors);
        }
      },
      [values, touched, validate]
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        );
        setTouched(allTouched);
        
        if (validate) {
          const newErrors = validate(values);
          setErrors(newErrors);
          
          if (Object.keys(newErrors).length === 0 && onValidSubmit) {
            onValidSubmit(values);
          }
        } else if (onValidSubmit) {
          onValidSubmit(values);
        }
        
        if (onSubmit) {
          onSubmit(e);
        }
      },
      [values, onValidSubmit, onSubmit, validate]
    );

    const formContext = {
      values,
      errors,
      touched,
      handleChange,
      handleBlur
    };

    const formClasses = classNames('smx-form', className);

    return (
      <form
        ref={ref}
        className={formClasses}
        onSubmit={handleSubmit}
        noValidate
        {...rest}
      >
        {typeof children === 'function'
          ? children(formContext)
          : React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return child;
              
              return React.cloneElement(child as React.ReactElement<any>, {
                ...formContext,
                ...child.props
              });
            })}
      </form>
    );
  }
);

Form.displayName = 'Form';
```

### 3.2 DatePicker-Komponente

#### Aktueller Status
Die DatePicker-Komponente ist teilweise implementiert, aber es fehlen erweiterte Funktionen und Barrierefreiheitsverbesserungen.

#### Zu implementierende Verbesserungen
- Verbesserte Kalenderansicht
- Unterstützung für Datumsbereichsauswahl
- Verbesserte Tastaturnavigation
- Internationalisierung
- Barrierefreiheitsverbesserungen

#### Implementierungsbeispiel
```tsx
// DatePicker.tsx
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Label für das DatePicker-Feld */
  label?: string;
  /** Hilfetext unter dem DatePicker-Feld */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe des DatePicker-Felds */
  size?: 'sm' | 'md' | 'lg';
  /** Ausgewähltes Datum */
  value?: Date | null;
  /** Callback bei Änderung des Datums */
  onChange?: (date: Date | null) => void;
  /** Minimales Datum */
  minDate?: Date;
  /** Maximales Datum */
  maxDate?: Date;
  /** Datumsformat */
  dateFormat?: string;
  /** Platzhaltertext */
  placeholder?: string;
  /** Ob das DatePicker-Feld die volle Breite einnehmen soll */
  fullWidth?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      value,
      onChange,
      minDate,
      maxDate,
      dateFormat = 'yyyy-MM-dd',
      placeholder = 'YYYY-MM-DD',
      fullWidth = false,
      id,
      className = '',
      disabled = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const datePickerId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const helperId = `${datePickerId}-helper`;
    const errorId = `${datePickerId}-error`;
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Formatiere das Datum für die Anzeige
    const formatDate = (date: Date | null): string => {
      if (!date) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };

    // Parse ein Datum aus einem String
    const parseDate = (dateString: string): Date | null => {
      if (!dateString) return null;
      
      const parts = dateString.split('-');
      if (parts.length !== 3) return null;
      
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      
      if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
      
      return new Date(year, month, day);
    };

    // Generiere die Tage für den aktuellen Monat
    const generateDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const days = [];
      
      // Füge leere Tage für den Anfang des Monats hinzu
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Füge die Tage des Monats hinzu
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push(date);
      }
      
      return days;
    };

    // Behandle Klick auf einen Tag
    const handleDayClick = (day: Date | null) => {
      if (!day) return;
      
      if (onChange) {
        onChange(day);
      }
      
      setIsOpen(false);
    };

    // Behandle Änderung des Input-Felds
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = e.target.value;
      const date = parseDate(dateString);
      
      if (onChange) {
        onChange(date);
      }
      
      if (date) {
        setCurrentMonth(date);
      }
    };

    // Behandle Klick auf den Vormonat-Button
    const handlePrevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    // Behandle Klick auf den Nächstmonat-Button
    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Schließe den Kalender, wenn außerhalb geklickt wird
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(e.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const datePickerClasses = classNames(
      'smx-datepicker',
      `smx-datepicker--${size}`,
      hasError && 'smx-datepicker--error',
      disabled && 'smx-datepicker--disabled',
      fullWidth && 'smx-datepicker--full-width',
      className
    );

    return (
      <div className="smx-datepicker-container">
        {label && (
          <label htmlFor={datePickerId} className="smx-datepicker__label">
            {label}
            {required && <span className="smx-datepicker__required">*</span>}
          </label>
        )}
        <div className="smx-datepicker__wrapper">
          <input
            ref={(node) => {
              // Setze beide Refs
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            id={datePickerId}
            className={datePickerClasses}
            type="text"
            value={formatDate(value)}
            onChange={handleInputChange}
            onClick={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            required={required}
            {...rest}
          />
          <button
            type="button"
            className="smx-datepicker__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Kalender öffnen"
            tabIndex={-1}
          >
            📅
          </button>
        </div>
        {isOpen && (
          <div ref={calendarRef} className="smx-datepicker__calendar">
            <div className="smx-datepicker__header">
              <button
                type="button"
                className="smx-datepicker__nav-button"
                onClick={handlePrevMonth}
                aria-label="Vorheriger Monat"
              >
                &lt;
              </button>
              <div className="smx-datepicker__month-year">
                {currentMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </div>
              <button
                type="button"
                className="smx-datepicker__nav-button"
                onClick={handleNextMonth}
                aria-label="Nächster Monat"
              >
                &gt;
              </button>
            </div>
            <div className="smx-datepicker__weekdays">
              {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="smx-datepicker__weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="smx-datepicker__days">
              {generateDays().map((day, index) => (
                <div
                  key={index}
                  className={classNames(
                    'smx-datepicker__day',
                    !day && 'smx-datepicker__day--empty',
                    day &&
                      value &&
                      day.getDate() === value.getDate() &&
                      day.getMonth() === value.getMonth() &&
                      day.getFullYear() === value.getFullYear() &&
                      'smx-datepicker__day--selected',
                    day &&
                      minDate &&
                      day < minDate &&
                      'smx-datepicker__day--disabled',
                    day &&
                      maxDate &&
                      day > maxDate &&
                      'smx-datepicker__day--disabled'
                  )}
                  onClick={() => handleDayClick(day)}
                >
                  {day && day.getDate()}
                </div>
              ))}
            </div>
          </div>
        )}
        {helperText && !hasError && (
          <div id={helperId} className="smx-datepicker__helper-text">
            {helperText}
          </div>
        )}
        {hasError && (
          <div id={errorId} className="smx-datepicker__error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
```

## 4. Diagramm-Komponenten

### 4.1 LineChart-Komponente

#### Aktueller Status
Die LineChart-Komponente ist angelegt, aber möglicherweise nicht vollständig implementiert.

#### Zu implementierende Verbesserungen
- Vollständige Implementierung mit Achsenbeschriftungen
- Unterstützung für mehrere Datenreihen
- Interaktive Tooltips
- Responsives Design
- Barrierefreiheitsverbesserungen

#### Implementierungsbeispiel
```tsx
// LineChart.tsx
import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { classNames } from '../../utils';

export interface LineChartDataPoint {
  x: number | string;
  y: number;
}

export interface LineChartSeries {
  name: string;
  data: LineChartDataPoint[];
  color?: string;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Datenreihen für das Liniendiagramm */
  series: LineChartSeries[];
  /** Höhe des Diagramms */
  height?: number | string;
  /** Breite des Diagramms */
  width?: number | string;
  /** Titel des Diagramms */
  title?: string;
  /** Beschriftung der X-Achse */
  xAxisLabel?: string;
  /** Beschriftung der Y-Achse */
  yAxisLabel?: string;
  /** Ob das Diagramm eine Legende haben soll */
  showLegend?: boolean;
  /** Ob das Diagramm Tooltips anzeigen soll */
  showTooltips?: boolean;
  /** Ob das Diagramm Gitterlinien anzeigen soll */
  showGrid?: boolean;
}

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      series,
      height = 300,
      width = '100%',
      title,
      xAxisLabel,
      yAxisLabel,
      showLegend = true,
      showTooltips = true,
      showGrid = true,
      className = '',
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tooltip, setTooltip] = useState<{
      visible: boolean;
      x: number;
      y: number;
      series: string;
      value: number | string;
    }>({
      visible: false,
      x: 0,
      y: 0,
      series: '',
      value: 0
    });

    // Zeichne das Diagramm
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Setze die Canvas-Größe
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Lösche den Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Definiere Ränder
      const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
      };

      // Definiere den Zeichenbereich
      const chartWidth = canvas.width - margin.left - margin.right;
      const chartHeight = canvas.height - margin.top - margin.bottom;

      // Finde die Minimum- und Maximum-Werte für die Y-Achse
      let minY = Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      series.forEach((s) => {
        s.data.forEach((d) => {
          minY = Math.min(minY, d.y);
          maxY = Math.max(maxY, d.y);
        });
      });

      // Füge etwas Abstand hinzu
      minY = Math.floor(minY * 0.9);
      maxY = Math.ceil(maxY * 1.1);

      // Zeichne die Achsen
      ctx.beginPath();
      ctx.moveTo(margin.left, margin.top);
      ctx.lineTo(margin.left, canvas.height - margin.bottom);
      ctx.lineTo(canvas.width - margin.right, canvas.height - margin.bottom);
      ctx.stroke();

      // Zeichne die Y-Achsen-Beschriftungen
      const yTickCount = 5;
      const yTickStep = (maxY - minY) / (yTickCount - 1);

      for (let i = 0; i < yTickCount; i++) {
        const y = maxY - i * yTickStep;
        const yPos = margin.top + (i * chartHeight) / (yTickCount - 1);

        // Zeichne die Tick-Linie
        ctx.beginPath();
        ctx.moveTo(margin.left - 5, yPos);
        ctx.lineTo(margin.left, yPos);
        ctx.stroke();

        // Zeichne die Beschriftung
        ctx.fillText(y.toFixed(1), margin.left - 30, yPos + 5);

        // Zeichne die Gitterlinie
        if (showGrid && i > 0 && i < yTickCount - 1) {
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(margin.left, yPos);
          ctx.lineTo(canvas.width - margin.right, yPos);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Zeichne die X-Achsen-Beschriftungen
      const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
      const uniqueXValues = [...new Set(allXValues)];
      const xTickCount = Math.min(10, uniqueXValues.length);
      const xTickStep = Math.ceil(uniqueXValues.length / xTickCount);

      for (let i = 0; i < uniqueXValues.length; i += xTickStep) {
        const x = uniqueXValues[i];
        const xPos = margin.left + (i * chartWidth) / (uniqueXValues.length - 1);

        // Zeichne die Tick-Linie
        ctx.beginPath();
        ctx.moveTo(xPos, canvas.height - margin.bottom);
        ctx.lineTo(xPos, canvas.height - margin.bottom + 5);
        ctx.stroke();

        // Zeichne die Beschriftung
        ctx.fillText(
          String(x),
          xPos - 10,
          canvas.height - margin.bottom + 20
        );

        // Zeichne die Gitterlinie
        if (showGrid && i > 0) {
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(xPos, margin.top);
          ctx.lineTo(xPos, canvas.height - margin.bottom);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Zeichne die Datenreihen
      series.forEach((s, seriesIndex) => {
        const color = s.color || getDefaultColor(seriesIndex);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();

        s.data.forEach((d, i) => {
          const xIndex = uniqueXValues.indexOf(d.x);
          const xPos = margin.left + (xIndex * chartWidth) / (uniqueXValues.length - 1);
          const yPos = margin.top + chartHeight - ((d.y - minY) / (maxY - minY)) * chartHeight;

          if (i === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            ctx.lineTo(xPos, yPos);
          }
        });

        ctx.stroke();

        // Zeichne die Datenpunkte
        ctx.fillStyle = color;
        s.data.forEach((d) => {
          const xIndex = uniqueXValues.indexOf(d.x);
          const xPos = margin.left + (xIndex * chartWidth) / (uniqueXValues.length - 1);
          const yPos = margin.top + chartHeight - ((d.y - minY) / (maxY - minY)) * chartHeight;

          ctx.beginPath();
          ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      });

      // Zeichne die Legende
      if (showLegend) {
        const legendX = canvas.width - margin.right - 150;
        const legendY = margin.top;

        series.forEach((s, i) => {
          const color = s.color || getDefaultColor(i);
          const y = legendY + i * 20;

          // Zeichne den Farbindikator
          ctx.fillStyle = color;
          ctx.fillRect(legendX, y, 15, 10);

          // Zeichne den Namen
          ctx.fillStyle = 'black';
          ctx.fillText(s.name, legendX + 20, y + 8);
        });
      }

      // Zeichne die Achsenbeschriftungen
      if (xAxisLabel) {
        ctx.fillStyle = 'black';
        ctx.fillText(
          xAxisLabel,
          canvas.width / 2,
          canvas.height - 5
        );
      }

      if (yAxisLabel) {
        ctx.save();
        ctx.translate(10, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(yAxisLabel, 0, 0);
        ctx.restore();
      }

      // Zeichne den Titel
      if (title) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(title, canvas.width / 2 - 50, margin.top - 5);
      }
    }, [series, showGrid, showLegend, title, xAxisLabel, yAxisLabel]);

    // Behandle Mausbewegungen für Tooltips
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!showTooltips || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Definiere Ränder
      const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
      };

      // Definiere den Zeichenbereich
      const chartWidth = canvas.width - margin.left - margin.right;
      const chartHeight = canvas.height - margin.top - margin.bottom;

      // Finde die Minimum- und Maximum-Werte für die Y-Achse
      let minY = Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      series.forEach((s) => {
        s.data.forEach((d) => {
          minY = Math.min(minY, d.y);
          maxY = Math.max(maxY, d.y);
        });
      });

      // Füge etwas Abstand hinzu
      minY = Math.floor(minY * 0.9);
      maxY = Math.ceil(maxY * 1.1);

      // Finde den nächsten Datenpunkt
      const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
      const uniqueXValues = [...new Set(allXValues)];

      let closestPoint = {
        distance: Number.MAX_VALUE,
        series: '',
        x: 0,
        y: 0,
        value: 0
      };

      series.forEach((s) => {
        s.data.forEach((d) => {
          const xIndex = uniqueXValues.indexOf(d.x);
          const xPos = margin.left + (xIndex * chartWidth) / (uniqueXValues.length - 1);
          const yPos = margin.top + chartHeight - ((d.y - minY) / (maxY - minY)) * chartHeight;

          const distance = Math.sqrt(Math.pow(x - xPos, 2) + Math.pow(y - yPos, 2));

          if (distance < closestPoint.distance && distance < 20) {
            closestPoint = {
              distance,
              series: s.name,
              x: xPos,
              y: yPos,
              value: d.y
            };
          }
        });
      });

      if (closestPoint.distance < Number.MAX_VALUE) {
        setTooltip({
          visible: true,
          x: closestPoint.x,
          y: closestPoint.y,
          series: closestPoint.series,
          value: closestPoint.value
        });
      } else {
        setTooltip({
          visible: false,
          x: 0,
          y: 0,
          series: '',
          value: 0
        });
      }
    };

    // Behandle Maus-Verlassen für Tooltips
    const handleMouseLeave = () => {
      setTooltip({
        visible: false,
        x: 0,
        y: 0,
        series: '',
        value: 0
      });
    };

    // Hilfsfunktion für Standardfarben
    const getDefaultColor = (index: number) => {
      const colors = [
        '#4285F4', // Blau
        '#EA4335', // Rot
        '#FBBC05', // Gelb
        '#34A853', // Grün
        '#8F00FF', // Lila
        '#FF6D01', // Orange
        '#00ACC1', // Türkis
        '#AB47BC', // Violett
        '#26A69A', // Grün-Blau
        '#EC407A'  // Pink
      ];

      return colors[index % colors.length];
    };

    const lineChartClasses = classNames('smx-line-chart', className);

    return (
      <div
        ref={ref}
        className={lineChartClasses}
        style={{ height, width }}
        {...rest}
      >
        <canvas
          ref={canvasRef}
          className="smx-line-chart__canvas"
          style={{ width: '100%', height: '100%' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip.visible && (
          <div
            className="smx-line-chart__tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x + 10,
              top: tooltip.y - 30,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              pointerEvents: 'none'
            }}
          >
            <div>{tooltip.series}</div>
            <div>{tooltip.value}</div>
          </div>
        )}
      </div>
    );
  }
);

LineChart.displayName = 'LineChart';
```

## 5. Implementierungsplan

### Phase 1: Grundlegende Komponenten (Woche 1-2)
- Button-Komponente verbessern
- Input-Komponente vervollständigen
- Select-Komponente erweitern
- Card-Komponente verbessern
- Alert-Komponente verbessern

### Phase 2: Layout-Komponenten (Woche 3)
- Grid-Komponente verbessern
- Container-Komponente verbessern
- Flex-Komponente verbessern
- Sidebar-Komponente vervollständigen

### Phase 3: Formular-Komponenten (Woche 4-5)
- Form-Komponente vervollständigen
- DatePicker-Komponente implementieren
- TimePicker-Komponente implementieren
- FileUpload-Komponente implementieren
- Checkbox und Radio verbessern

### Phase 4: Komplexe Komponenten (Woche 6-7)
- Modal-Komponente verbessern
- TabView-Komponente verbessern
- Table-Komponente vervollständigen
- Pagination-Komponente vervollständigen
- Toast-Komponente verbessern

### Phase 5: Diagramm-Komponenten (Woche 8)
- LineChart-Komponente implementieren
- BarChart-Komponente implementieren
- PieChart-Komponente implementieren
- AreaChart-Komponente implementieren

### Phase 6: Finalisierung (Woche 9-10)
- Barrierefreiheit überprüfen und verbessern
- Theming-System verbessern
- Dokumentation aktualisieren
- Beispiel-App erweitern