// packages/@smolitux/core/src/components/TextArea/TextArea.improved.tsx
import React, { forwardRef, useCallback, useEffect, useRef, useState, useId } from 'react';
import { useFormControl } from '../FormControl/FormControl';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, unknown> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Text-Label (alternativ zu label im FormControl) */
  label?: string;
  /** Hilfetexzt (alternativ zu helperText im FormControl) */
  helperText?: string;
  /** Fehlermeldung (alternativ zu error im FormControl) */
  error?: string;
  /** Größe des TextAreas */
  size?: 'sm' | 'md' | 'lg';
  /** Visuelle Variante */
  variant?: 'outline' | 'filled' | 'unstyled' | 'flushed';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Auto-Resize bei Eingabe */
  autoResize?: boolean;
  /** Zeilen */
  rows?: number;
  /** Spalten */
  cols?: number;
  /** Maximale Zeichen */
  maxLength?: number;
  /** Zähle Zeichen */
  showCount?: boolean;
  /** Platzhalter-Text */
  placeholder?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Benutzerdefinierte Breite */
  width?: string | number;
  /** Benutzerdefinierte Höhe */
  height?: string | number;
  /** Resize-Verhalten */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * TextArea-Komponente für Mehrzeileneingaben
 *
 * @example
 * ```tsx
 * <TextArea
 *   label="Beschreibung"
 *   placeholder="Geben Sie eine Beschreibung ein..."
 *   rows={4}
 *   maxLength={200}
 *   showCount
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      variant = 'outline',
      fullWidth = false,
      autoResize = false,
      rows = 3,
      cols,
      maxLength,
      showCount = false,
      placeholder,
      className = '',
      width,
      height,
      resize,
      onChange,
      onInput,
      value,
      defaultValue,
      'data-testid': dataTestId = 'textarea',
      ...rest
    },
    ref
  ) => {
    // Theme-Werte
    const { themeMode } = useTheme();
    const isDarkMode = themeMode === 'dark';

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const textareaId = rest.id || `textarea-${uniqueId}`;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const counterId = `${textareaId}-counter`;

    // Aus dem FormControl-Context importierte Werte
    const formControl = useFormControl();

    // Lokaler State für die Textlänge
    const [textLength, setTextLength] = useState(() => {
      if (value !== undefined) {
        return String(value).length;
      } else if (defaultValue !== undefined) {
        return String(defaultValue).length;
      }
      return 0;
    });

    // Ref für Auto-Resize
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Kombinierte Props aus eigenem und FormControl
    const combinedProps = {
      id: textareaId,
      disabled: rest.disabled || formControl.disabled,
      required: rest.required || formControl.required,
      'aria-invalid': error || formControl.hasError ? true : undefined,
      'aria-describedby':
        [
          error || formControl.hasError ? errorId : undefined,
          helperText && !error && !formControl.hasError ? helperId : undefined,
          showCount ? counterId : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
    };

    // Klassen für verschiedene Größen
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    // Klassen für verschiedene Varianten
    const variantClasses = {
      outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
      filled: 'border-0 bg-gray-100 dark:bg-gray-800',
      unstyled: 'border-0 bg-transparent px-0 py-0',
      flushed:
        'border-0 border-b border-gray-300 dark:border-gray-600 rounded-none px-0 focus:border-b-2',
    };

    // Zustandsabhängige Klassen
    const stateClasses =
      error || formControl.hasError
        ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
        : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';

    // Basis-Klassen für den TextArea
    const inputClasses = [
      'block rounded-md focus:outline-none focus:ring-2',
      'transition duration-150 ease-in-out',
      'appearance-none',
      fullWidth ? 'w-full' : '',
      'text-gray-900 dark:text-white',
      'placeholder-gray-400 dark:placeholder-gray-500',
      sizeClasses[size],
      variantClasses[variant as keyof typeof variantClasses],
      stateClasses,
      combinedProps.disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ].join(' ');

    // Inline-Styles für benutzerdefinierte Dimensionen und Resize
    const inlineStyles: React.CSSProperties = {
      ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
      ...(resize ? { resize } : {}),
    };

    // Auto-Resize-Funktion
    const adjustHeight = useCallback(() => {
      if (autoResize && textareaRef.current) {
        // Reset height to auto to get the correct scrollHeight
        textareaRef.current.style.height = 'auto';
        // Set the height to the scrollHeight
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    // Event-Handler für Änderungen
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }

      setTextLength(e.target.value.length);

      if (autoResize) {
        adjustHeight();
      }
    };

    // Event-Handler für Input
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (onInput) {
        onInput(e);
      }

      if (autoResize) {
        adjustHeight();
      }
    };

    // Effect für initiales Auto-Resize
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        adjustHeight();

        // Auch bei Fenstergrößenänderung anpassen
        window.addEventListener('resize', adjustHeight);

        return () => {
          window.removeEventListener('resize', adjustHeight);
        };
      }
    }, [autoResize, adjustHeight]);

    // Effekt für Aktualisierung der Textlänge, wenn sich der Value von außen ändert
    useEffect(() => {
      if (value !== undefined) {
        setTextLength(String(value).length);
      }
    }, [value]);

    // Kombiniere übergebene Ref mit lokaler Ref
    const assignRefs = (element: HTMLTextAreaElement | null) => {
      textareaRef.current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Prüfe, ob die Zeichenanzahl das Maximum überschreitet
    const isExceeded = maxLength !== undefined && textLength > maxLength;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`} data-testid={`${dataTestId}-container`}>
        {/* Label (falls außerhalb eines FormControl) */}
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

        {/* Textarea Element */}
        <textarea
          ref={assignRefs}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={handleChange}
          onInput={handleInput}
          value={value}
          defaultValue={defaultValue}
          className={inputClasses}
          style={inlineStyles}
          data-testid={dataTestId}
          {...combinedProps}
          {...rest}
        />

        {/* Zeichenzähler und/oder Hilfetexzt/Fehler (falls außerhalb eines FormControl) */}
        {(showCount ||
          (helperText && !formControl.hasError) ||
          (error && !formControl.hasError)) && (
          <div className="mt-1 flex justify-between text-sm">
            {/* Hilfetexzt oder Fehlermeldung */}
            {(helperText || error) && !formControl.hasError && (
              <p
                id={error ? errorId : helperId}
                className={
                  error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                }
                data-testid={error ? `${dataTestId}-error` : `${dataTestId}-helper`}
              >
                {error || helperText}
              </p>
            )}

            {/* Zeichenzähler */}
            {showCount && (
              <p
                id={counterId}
                className={`text-gray-500 dark:text-gray-400 ${!helperText && !error ? 'ml-auto' : ''} ${isExceeded ? 'text-red-600 dark:text-red-400' : ''}`}
                data-testid={`${dataTestId}-counter`}
              >
                {textLength}
                {maxLength ? `/${maxLength}` : ''}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
