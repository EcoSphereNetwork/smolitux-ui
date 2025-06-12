import { useState, useEffect, useCallback, useRef } from 'react';
import { FieldOptions, FieldState } from './types';
import { useValidation } from './useValidation';
import { useFormContext } from './Form';

/**
 * Hook für die Verwaltung eines Formularfelds
 */
export const useField = <T = unknown>(options: FieldOptions<T> = {}) => {
  const {
    initialValue,
    validationRules = [],
    validateOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    validateOnlyTouched = true,
    validateOnlyDirty = false,
    onChange: onChangeCallback,
    onBlur: onBlurCallback,
    onError: onErrorCallback,
    disabled = false,
    readOnly = false,
    required = false,
    name,
  } = options;

  // Formularkontext, falls vorhanden
  const formContext = useFormContext();
  const isInForm = !!formContext && !!name;

  // Feldstatus
  const [value, setValue] = useState<T>(initialValue as T);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const initialValueRef = useRef(initialValue);

  // Validierung
  const { validate, errors, isValidating, isValid, resetValidation } =
    useValidation<T>(validationRules);

  // Feldstatus
  const fieldState: FieldState<T> = {
    value,
    touched,
    dirty,
    validating: isValidating,
    valid: isValid,
    errors,
  };

  // Registriere das Feld im Formular, falls vorhanden
  useEffect(() => {
    if (isInForm) {
      formContext.registerField(name, {
        initialValue,
        validationRules,
        validateOnChange,
        validateOnBlur,
        validateOnMount,
        validateOnlyTouched,
        validateOnlyDirty,
        onChange: onChangeCallback,
        onBlur: onBlurCallback,
        onError: onErrorCallback,
        disabled,
        readOnly,
        required,
      });

      return () => {
        formContext.unregisterField(name);
      };
    }
  }, [
    isInForm,
    name,
    formContext,
    initialValue,
    validationRules,
    validateOnChange,
    validateOnBlur,
    validateOnMount,
    validateOnlyTouched,
    validateOnlyDirty,
    onChangeCallback,
    onBlurCallback,
    onErrorCallback,
    disabled,
    readOnly,
    required,
  ]);

  // Validiere beim ersten Rendern, falls erforderlich
  useEffect(() => {
    if (validateOnMount) {
      validate(value, isInForm ? formContext.formState.values : undefined);
    }
  }, []);

  // Wert ändern
  const handleChange = useCallback(
    (newValue: T) => {
      // Wenn das Feld in einem Formular ist, aktualisiere den Wert im Formular
      if (isInForm) {
        formContext.setFieldValue(name, newValue);
      } else {
        setValue(newValue);
        setDirty(newValue !== initialValueRef.current);

        // Validiere, falls erforderlich
        if (
          validateOnChange &&
          (!validateOnlyTouched || touched) &&
          (!validateOnlyDirty || dirty)
        ) {
          validate(newValue);
        }

        // Callback aufrufen
        if (onChangeCallback) {
          onChangeCallback(newValue, {
            ...fieldState,
            value: newValue,
            dirty: newValue !== initialValueRef.current,
          });
        }
      }
    },
    [
      isInForm,
      name,
      formContext,
      setValue,
      setDirty,
      initialValueRef,
      validateOnChange,
      validateOnlyTouched,
      validateOnlyDirty,
      touched,
      dirty,
      validate,
      onChangeCallback,
      fieldState,
    ]
  );

  // Fokus verlieren
  const handleBlur = useCallback(() => {
    // Wenn das Feld in einem Formular ist, markiere es als berührt
    if (isInForm) {
      formContext.setFieldTouched(name, true);
    } else {
      setTouched(true);

      // Validiere, falls erforderlich
      if (validateOnBlur && (!validateOnlyDirty || dirty)) {
        validate(value);
      }

      // Callback aufrufen
      if (onBlurCallback) {
        onBlurCallback({
          ...fieldState,
          touched: true,
        });
      }
    }
  }, [
    isInForm,
    name,
    formContext,
    setTouched,
    validateOnBlur,
    validateOnlyDirty,
    dirty,
    validate,
    value,
    onBlurCallback,
    fieldState,
  ]);

  // Validiere das Feld
  const validateField = useCallback(async (): Promise<boolean> => {
    return validate(value, isInForm ? formContext.formState.values : undefined);
  }, [isInForm, formContext, validate, value]);

  // Setze das Feld zurück
  const resetField = useCallback(
    (newValue?: T) => {
      const resetValue = newValue !== undefined ? newValue : initialValueRef.current;

      if (isInForm) {
        formContext.setFieldValue(name, resetValue as T);
        formContext.setFieldTouched(name, false);
      } else {
        setValue(resetValue as T);
        setTouched(false);
        setDirty(false);
        resetValidation();
      }
    },
    [isInForm, name, formContext, setValue, setTouched, setDirty, resetValidation, initialValueRef]
  );

  // Fehler-Callback
  useEffect(() => {
    if (errors.length > 0 && onErrorCallback) {
      onErrorCallback(errors, fieldState);
    }
  }, [errors, onErrorCallback, fieldState]);

  // Wenn das Feld in einem Formular ist, synchronisiere den Wert mit dem Formular
  useEffect(() => {
    if (isInForm) {
      const formValues = formContext.formState.values;
      const formTouched = formContext.formState.touched;
      // const formErrors = formContext.formState.errors;

      // Synchronisiere den Wert
      if (name in formValues && formValues[name] !== value) {
        setValue(formValues[name]);
      }

      // Synchronisiere den berührt-Status
      if (name in formTouched && formTouched[name] !== touched) {
        setTouched(formTouched[name]);
      }

      // Synchronisiere den schmutzig-Status
      setDirty(formValues[name] !== initialValueRef.current);
    }
  }, [
    isInForm,
    formContext,
    name,
    value,
    touched,
    setTouched,
    setValue,
    setDirty,
    initialValueRef,
  ]);

  return {
    value,
    setValue: handleChange,
    touched,
    setTouched,
    dirty,
    errors,
    isValid,
    isValidating,
    validate: validateField,
    reset: resetField,
    handleChange,
    handleBlur,
    fieldState,
    disabled,
    readOnly,
    required,
    name,
  };
};

export default useField;
