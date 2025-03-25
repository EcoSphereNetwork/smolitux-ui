// packages/@smolitux/core/src/components/FormControl/FormControl.tsx
import React, { forwardRef, createContext, useContext, useMemo } from 'react';

// Context für FormControl
interface FormControlContextType {
  /** Ist das Formularfeld deaktiviert? */
  disabled?: boolean;
  /** Ist das Formularfeld erforderlich? */
  required?: boolean;
  /** Hat das Formularfeld einen Fehler? */
  hasError?: boolean;
  /** Eindeutige ID für das Formularfeld */
  id?: string;
  /** Label für das Formularfeld */
  label?: string;
  /** Name des Formularfelds */
  name?: string;
}

const FormControlContext = createContext<FormControlContextType | undefined>(undefined);

// Hook zum Zugriff auf den FormControl-Context
export const useFormControl = () => {
  const context = useContext(FormControlContext);
  if (!context) {
    return {
      disabled: false,
      required: false,
      hasError: false,
      id: undefined,
      label: undefined,
      name: undefined
    };
  }
  return context;
};

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ist das Formularfeld deaktiviert? */
  disabled?: boolean;
  /** Ist das Formularfeld erforderlich? */
  required?: boolean;
  /** Hilfetexzt */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Label für das Formularfeld */
  label?: React.ReactNode;
  /** Eindeutige ID für das Formularfeld */
  id?: string;
  /** Name des Formularfelds */
  name?: string;
  /** Horizontal statt vertikal angeordnet */
  horizontal?: boolean;
  /** Volle Breite */
  fullWidth?: boolean;
  /** Label-Breite bei horizontaler Anordnung */
  labelWidth?: number | string;
}

/**
 * FormControl-Komponente als Container für Formularelemente
 * 
 * @example
 * ```tsx
 * <FormControl 
 *   label="Email" 
 *   helperText="Ihre geschäftliche Email-Adresse" 
 *   error="Ungültiges Email-Format"
 * >
 *   <Input type="email" />
 * </FormControl>
 * ```
 */
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(({
  disabled = false,
  required = false,
  helperText,
  error,
  label,
  id,
  name,
  horizontal = false,
  fullWidth = false,
  labelWidth = '33%',
  className = '',
  children,
  ...rest
}, ref) => {
  // Eindeutige ID generieren, falls keine angegeben wurde
  const uniqueId = useMemo(() => {
    return id || `form-control-${Math.random().toString(36).substring(2, 9)}`;
  }, [id]);
  
  // Context-Wert für untergeordnete Komponenten
  const formControlContextValue = useMemo(() => ({
    disabled,
    required,
    hasError: Boolean(error),
    id: uniqueId,
    label: label?.toString(),
    name
  }), [disabled, required, error, uniqueId, label, name]);
  
  // Label-Style für horizontale Anordnung
  const labelStyle = horizontal ? { 
    width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
  } : {};
  
  return (
    <FormControlContext.Provider value={formControlContextValue}>
      <div 
        ref={ref}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${horizontal ? 'flex items-start' : ''}
          ${className}
        `}
        {...rest}
      >
        {/* Label */}
        {label && (
          <label 
            htmlFor={uniqueId}
            className={`
              block text-sm font-medium 
              ${disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}
              ${horizontal ? 'pt-2 pr-4' : 'mb-1'}
            `}
            style={labelStyle}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        {/* Formularfeld-Container */}
        <div className={`${horizontal ? 'flex-1' : ''}`}>
          {/* Formularfeld (untergeordnete Komponente) */}
          {children}
          
          {/* Hilfetext oder Fehlermeldung */}
          {(error || helperText) && (
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
        </div>
      </div>
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
