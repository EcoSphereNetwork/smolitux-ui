import { useState, useCallback } from 'react';
import { FieldValidationRules } from './types';

/**
 * Hook für die Validierung von Werten
 */
export const useValidation = <T = unknown>(
  validationRules: FieldValidationRules<T> = []
) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  /**
   * Validiert einen Wert anhand der Validierungsregeln
   */
  const validate = useCallback(
    async (value: T, formValues?: Record<string, unknown>): Promise<boolean> => {
      if (validationRules.length === 0) {
        setErrors([]);
        setIsValid(true);
        return true;
      }

      setIsValidating(true);
      const newErrors: string[] = [];

      // Prüfe jede Validierungsregel
      for (const rule of validationRules) {
        const isEmpty = value === undefined || value === null || value === '';
        
        // Überspringe die Validierung, wenn das Feld leer ist und validateEmpty nicht gesetzt ist
        if (isEmpty && !rule.validateEmpty) {
          continue;
        }

        // Führe die Validierung aus
        const isValid = rule.validator(value, formValues);
        
        if (!isValid) {
          newErrors.push(rule.message);
        }
      }

      setErrors(newErrors);
      setIsValid(newErrors.length === 0);
      setIsValidating(false);
      
      return newErrors.length === 0;
    },
    [validationRules]
  );

  /**
   * Setzt den Validierungsstatus zurück
   */
  const resetValidation = useCallback(() => {
    setErrors([]);
    setIsValid(true);
    setIsValidating(false);
  }, []);

  return {
    validate,
    resetValidation,
    errors,
    isValidating,
    isValid,
  };
};

export default useValidation;