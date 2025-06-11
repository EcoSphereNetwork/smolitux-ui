import { useState, useCallback, useRef, useEffect } from 'react';
import { FormOptions, FormState, FieldOptions, ValidationOptions } from './types';

/**
 * Hook für die Verwaltung eines Formulars
 */
export const useForm = (options: FormOptions = {}) => {
  const {
    initialValues = {},
    onSubmit,
    onChange,
    onError,
    validateOnChange = true,
    validateOnBlur = true,
    validateOnSubmit = true,
    validateOnMount = false,
    validateOnlyTouched = true,
    validateOnlyDirty = false,
  } = options;

  // Formularstatus
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Referenzen für Felder und Validierungsregeln
  const fieldsRef = useRef<Record<string, FieldOptions>>({});
  const initialValuesRef = useRef(initialValues);

  // Formularstatus
  const formState: FormState = {
    isValid,
    isValidating,
    isSubmitting,
    isSubmitted,
    values,
    errors,
    touched,
    dirty,
  };

  // Validierungsoptionen
  const validationOptions: ValidationOptions = {
    validateOnChange,
    validateOnBlur,
    validateOnSubmit,
    validateOnMount,
    validateOnlyTouched,
    validateOnlyDirty,
  };

  // Feld registrieren
  const registerField = useCallback(
    (name: string, options: FieldOptions = {}) => {
      fieldsRef.current[name] = options;

      // Initialen Wert setzen, falls vorhanden
      if (options.initialValue !== undefined && !(name in values)) {
        setValues((prev) => ({
          ...prev,
          [name]: options.initialValue,
        }));
        initialValuesRef.current[name] = options.initialValue;
      }
    },
    [values]
  );

  // Feld entfernen
  const unregisterField = useCallback((name: string) => {
    delete fieldsRef.current[name];
  }, []);

  // Feld validieren - moved before usage in other callbacks
  const validateField = useCallback(
    async (name: string): Promise<boolean> => {
      const field = fieldsRef.current[name];
      if (!field || !field.validationRules || field.validationRules.length === 0) {
        // Keine Validierungsregeln, Feld ist gültig
        setErrors((prev) => ({
          ...prev,
          [name]: [],
        }));
        return true;
      }

      setIsValidating(true);
      const fieldValue = values[name];
      const fieldErrors: string[] = [];

      // Validiere jede Regel
      for (const rule of field.validationRules) {
        const isEmpty = fieldValue === undefined || fieldValue === null || fieldValue === '';

        // Überspringe die Validierung, wenn das Feld leer ist und validateEmpty nicht gesetzt ist
        if (isEmpty && !rule.validateEmpty) {
          continue;
        }

        // Führe die Validierung aus
        const isValid = rule.validator(fieldValue, values);

        if (!isValid) {
          fieldErrors.push(rule.message);
        }
      }

      // Aktualisiere die Fehler
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors,
      }));

      // Aktualisiere den Validierungsstatus
      setIsValidating(false);

      // Rufe den Fehler-Callback auf, falls vorhanden
      if (fieldErrors.length > 0) {
        if (field.onError) {
          field.onError(fieldErrors, {
            value: fieldValue,
            touched: touched[name] || false,
            dirty: dirty[name] || false,
            validating: false,
            valid: fieldErrors.length === 0,
            errors: fieldErrors,
          });
        }

        if (onError) {
          onError(
            {
              ...errors,
              [name]: fieldErrors,
            },
            {
              ...formState,
              errors: {
                ...errors,
                [name]: fieldErrors,
              },
            }
          );
        }
      }

      return fieldErrors.length === 0;
    },
    [values, touched, dirty, errors, formState, onError]
  );

  // Feldwert setzen
  const setFieldValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Feld als schmutzig markieren, wenn der Wert sich geändert hat
      const initialValue = initialValuesRef.current[name];
      const isDirty = value !== initialValue;

      setDirty((prev) => ({
        ...prev,
        [name]: isDirty,
      }));

      // Validieren, falls erforderlich
      if (
        validateOnChange &&
        (!validateOnlyTouched || touched[name]) &&
        (!validateOnlyDirty || isDirty)
      ) {
        validateField(name);
      }
    },
    [validateOnChange, validateOnlyTouched, validateOnlyDirty, touched, validateField]
  );

  // Feld als berührt markieren
  const setFieldTouched = useCallback(
    (name: string, isTouched = true) => {
      setTouched((prev) => ({
        ...prev,
        [name]: isTouched,
      }));

      // Validieren, falls erforderlich
      if (validateOnBlur && isTouched && (!validateOnlyDirty || dirty[name])) {
        validateField(name);
      }
    },
    [validateOnBlur, validateOnlyDirty, dirty, validateField]
  );

  // Formular validieren
  const validateForm = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);

    const fieldNames = Object.keys(fieldsRef.current);
    const validationResults = await Promise.all(fieldNames.map((name) => validateField(name)));

    const isFormValid = validationResults.every((isValid) => isValid);

    setIsValid(isFormValid);
    setIsValidating(false);

    return isFormValid;
  }, [validateField]);

  // Formular zurücksetzen
  const resetForm = useCallback((newValues?: Record<string, unknown>) => {
    const resetValues = newValues || initialValuesRef.current;

    setValues(resetValues);
    setErrors({});
    setTouched({});
    setDirty({});
    setIsSubmitted(false);
    setIsValid(true);
  }, []);

  // Formular absenden
  const submitForm = useCallback(async (): Promise<void> => {
    setIsSubmitting(true);
    setIsSubmitted(true);

    // Validiere das Formular, falls erforderlich
    let isFormValid = true;
    if (validateOnSubmit) {
      isFormValid = await validateForm();
    }

    if (isFormValid) {
      // Rufe den Submit-Callback auf, falls vorhanden
      if (onSubmit) {
        await onSubmit(values, formState);
      }
    } else {
      // Rufe den Fehler-Callback auf, falls vorhanden
      if (onError) {
        onError(errors, formState);
      }
    }

    setIsSubmitting(false);
  }, [validateOnSubmit, validateForm, onSubmit, values, formState, onError, errors]);

  // Formularstatus aktualisieren
  useEffect(() => {
    // Prüfe, ob das Formular gültig ist
    const hasErrors = Object.values(errors).some((fieldErrors) => fieldErrors.length > 0);
    setIsValid(!hasErrors);

    // Rufe den Change-Callback auf, falls vorhanden
    if (onChange) {
      onChange(formState);
    }
  }, [values, errors, touched, dirty, isSubmitting, isSubmitted, onChange, formState]);

  // Validiere beim ersten Rendern, falls erforderlich
  useEffect(() => {
    if (validateOnMount) {
      validateForm();
    }
  }, []);

  return {
    formState,
    registerField,
    unregisterField,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm,
    validationOptions,
  };
};

export default useForm;
