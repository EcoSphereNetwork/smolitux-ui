import React from 'react';
import { FieldOptions } from './types';
import { useField } from './useField';

export type FormFieldProps<T = unknown> = FieldOptions<T> & {
  /**
   * Die Komponente, die gerendert werden soll
   */
  component: React.ComponentType<Record<string, unknown>>;
  
  /**
   * Die Kinder der Komponente
   */
  children?: React.ReactNode;
  
  /**
   * Zusätzliche Props für die Komponente
   */
  [key: string]: unknown;
};

/**
 * Komponente für die Verbindung eines Formularfelds mit einer Eingabekomponente
 */
export const FormField = <T>({
  component: Component,
  children,
  name,
  initialValue,
  validationRules,
  validateOnChange,
  validateOnBlur,
  validateOnMount,
  validateOnlyTouched,
  validateOnlyDirty,
  onChange,
  onBlur,
  onError,
  disabled,
  readOnly,
  required,
  ...props
}: FormFieldProps<T>) => {
  const {
    value,
    handleChange,
    handleBlur,
    errors,
    touched,
    dirty,
  } = useField<T>({
    name,
    initialValue,
    validationRules,
    validateOnChange,
    validateOnBlur,
    validateOnMount,
    validateOnlyTouched,
    validateOnlyDirty,
    onChange,
    onBlur,
    onError,
    disabled,
    readOnly,
    required,
  });
  
  // Bestimme, ob Fehler angezeigt werden sollen
  const showError = touched && errors.length > 0;
  
  return (
    <Component
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      hasError={showError}
      errorMessages={showError ? errors : []}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      touched={touched}
      dirty={dirty}
      {...props}
    >
      {children}
    </Component>
  );
};

export default FormField;