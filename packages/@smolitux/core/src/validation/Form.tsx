import React, { createContext, useContext, FormEvent } from 'react';
import { FormContextValue, FormOptions } from './types';
import { useForm } from './useForm';

// Formularkontext
const FormContext = createContext<FormContextValue | null>(null);

/**
 * Hook für den Zugriff auf den Formularkontext
 */
export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext muss innerhalb eines FormProvider verwendet werden');
  }

  return context;
};

export type FormProps = FormOptions & {
  /**
   * Die Kinder des Formulars
   */
  children: React.ReactNode;

  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;

  /**
   * Zusätzliche CSS-Eigenschaften
   */
  style?: React.CSSProperties;

  /**
   * Die ID des Formulars
   */
  id?: string;

  /**
   * Der Name des Formulars
   */
  name?: string;

  /**
   * Ob das Formular automatisch validiert werden soll
   */
  noValidate?: boolean;
};

/**
 * Formular-Komponente
 */
export const Form: React.FC<FormProps> = ({
  children,
  className,
  style,
  id,
  name,
  noValidate = true,
  onSubmit,
  ...formOptions
}) => {
  const form = useForm({
    ...formOptions,
    onSubmit,
  });

  // Formular absenden
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.submitForm();
  };

  return (
    <FormContext.Provider value={form}>
      <form
        className={className}
        style={style}
        id={id}
        name={name}
        noValidate={noValidate}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
