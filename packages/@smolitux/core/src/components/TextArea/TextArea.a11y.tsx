// packages/@smolitux/core/src/components/TextArea/TextArea.a11y.tsx
import React, { forwardRef, useCallback, useEffect, useRef, useState, useId } from 'react';
import { useFormControl } from '../FormControl/FormControl';
import { TextAreaProps } from './TextArea';

/**
 * TextArea-Komponente für Mehrzeileneingaben mit verbesserter Barrierefreiheit
 * 
 * @example
 * ```tsx
 * <TextAreaA11y 
 *   label="Beschreibung" 
 *   placeholder="Geben Sie eine Beschreibung ein..." 
 *   rows={4}
 *   maxLength={200}
 *   showCount
 * />
 * ```
 */
export const TextAreaA11y = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  helperText,
  error,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  autoResize = false,
  rows = 3,
  maxLength,
  showCount = false,
  placeholder,
  className = '',
  onChange,
  onInput,
  value,
  defaultValue,
  ...rest
}, ref) => {
  // Aus dem FormControl-Context importierte Werte
  const formControl = useFormControl();
  
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const textareaId = rest.id || formControl.id || `textarea-${uniqueId}`;
  const labelId = `label-${textareaId}`;
  const helperId = `helper-${textareaId}`;
  const errorId = `error-${textareaId}`;
  const counterId = `counter-${textareaId}`;
  
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
  const isDisabled = rest.disabled || formControl.disabled;
  const isRequired = rest.required || formControl.required;
  const isReadOnly = rest.readOnly || formControl.readOnly;
  const hasError = Boolean(error) || formControl.hasError;
  const errorMessage = error || (formControl.hasError ? formControl.errorMessage || 'Ungültige Eingabe' : undefined);
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
    filled: 'border-0 bg-gray-100 dark:bg-gray-800',
    unstyled: 'border-0 bg-transparent px-0 py-0'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = hasError
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Basis-Klassen für den TextArea
  const inputClasses = [
    'block rounded-md focus:outline-none focus:ring-2',
    'transition duration-150 ease-in-out',
    'appearance-none',
    'w-full',
    'text-gray-900 dark:text-white',
    'placeholder-gray-400 dark:placeholder-gray-500',
    sizeClasses[size],
    variantClasses[variant],
    stateClasses,
    isDisabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].join(' ');
  
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
  
  // Berechne die verbleibenden Zeichen
  const remainingChars = maxLength ? maxLength - textLength : undefined;
  
  // Erstelle eine Liste der IDs für die ARIA-Attribute
  const ariaDescribedBy = [
    helperText && !hasError ? helperId : null,
    errorMessage ? errorId : null,
    showCount && maxLength ? counterId : null
  ].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`} data-testid="textarea-container">
      {/* Label (falls außerhalb eines FormControl) */}
      {(label || formControl.label) && (
        <label 
          id={labelId}
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label || formControl.label}
          {isRequired && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          {isRequired && <span className="sr-only">(Erforderlich)</span>}
        </label>
      )}
      
      {/* Textarea Element */}
      <textarea
        ref={assignRefs}
        id={textareaId}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        onInput={handleInput}
        value={value}
        defaultValue={defaultValue}
        className={inputClasses}
        data-testid="textarea"
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={label || formControl.label ? labelId : undefined}
        aria-required={isRequired}
        aria-readonly={isReadOnly}
        aria-disabled={isDisabled}
        {...rest}
      />
      
      {/* Zeichenzähler und/oder Hilfetexzt/Fehler */}
      <div className="mt-1 flex justify-between text-sm">
        {/* Hilfetexzt */}
        {helperText && !hasError && (
          <p 
            id={helperId}
            className="text-gray-500 dark:text-gray-400"
            data-testid="textarea-helper"
          >
            {helperText}
          </p>
        )}
        
        {/* Fehlermeldung */}
        {errorMessage && (
          <p 
            id={errorId}
            className="text-red-600 dark:text-red-400"
            data-testid="textarea-error"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        
        {/* Zeichenzähler */}
        {showCount && (
          <p 
            id={counterId}
            className={`text-gray-500 dark:text-gray-400 ${!helperText && !errorMessage ? 'ml-auto' : ''}`} 
            data-testid="textarea-counter"
            aria-live="polite"
          >
            {textLength}{maxLength ? `/${maxLength}` : ''}
            {remainingChars !== undefined && (
              <span className="sr-only">
                {remainingChars >= 0 
                  ? `${remainingChars} Zeichen verbleibend` 
                  : `${Math.abs(remainingChars)} Zeichen zu viel`}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
});

TextAreaA11y.displayName = 'TextAreaA11y';

export default TextAreaA11y;