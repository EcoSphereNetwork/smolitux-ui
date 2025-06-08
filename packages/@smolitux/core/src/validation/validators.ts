import { ValidationRule } from './types';

/**
 * Vordefinierte Validierungsregeln
 */

/**
 * Prüft, ob ein Wert vorhanden ist (nicht undefined, null oder leerer String)
 */
export const required = (message = 'Dieses Feld ist erforderlich'): ValidationRule => ({
  validator: (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  message,
  validateEmpty: true,
});

/**
 * Prüft, ob ein Wert eine gültige E-Mail-Adresse ist
 */
export const email = (
  message = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert eine Mindestlänge hat
 */
export const minLength = (
  min: number,
  message = `Mindestens ${min} Zeichen erforderlich`
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    return value.length >= min;
  },
  message,
});

/**
 * Prüft, ob ein Wert eine Maximallänge hat
 */
export const maxLength = (
  max: number,
  message = `Maximal ${max} Zeichen erlaubt`
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    return value.length <= max;
  },
  message,
});

/**
 * Prüft, ob ein Wert eine bestimmte Länge hat
 */
export const length = (
  exactLength: number,
  message = `Genau ${exactLength} Zeichen erforderlich`
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    return value.length === exactLength;
  },
  message,
});

/**
 * Prüft, ob ein Wert eine Zahl ist
 */
export const number = (message = 'Bitte geben Sie eine Zahl ein'): ValidationRule => ({
  validator: (value) => {
    if (!value && value !== 0) return true;
    return !isNaN(Number(value));
  },
  message,
});

/**
 * Prüft, ob ein Wert eine Ganzzahl ist
 */
export const integer = (message = 'Bitte geben Sie eine Ganzzahl ein'): ValidationRule => ({
  validator: (value) => {
    if (!value && value !== 0) return true;
    return Number.isInteger(Number(value));
  },
  message,
});

/**
 * Prüft, ob ein Wert größer als ein Mindestwert ist
 */
export const min = (
  minValue: number,
  message = `Muss mindestens ${minValue} sein`
): ValidationRule<number> => ({
  validator: (value) => {
    if (value === undefined || value === null) return true;
    return Number(value) >= minValue;
  },
  message,
});

/**
 * Prüft, ob ein Wert kleiner als ein Maximalwert ist
 */
export const max = (
  maxValue: number,
  message = `Darf höchstens ${maxValue} sein`
): ValidationRule<number> => ({
  validator: (value) => {
    if (value === undefined || value === null) return true;
    return Number(value) <= maxValue;
  },
  message,
});

/**
 * Prüft, ob ein Wert zwischen einem Minimal- und Maximalwert liegt
 */
export const range = (
  minValue: number,
  maxValue: number,
  message = `Muss zwischen ${minValue} und ${maxValue} liegen`
): ValidationRule<number> => ({
  validator: (value) => {
    if (value === undefined || value === null) return true;
    const numValue = Number(value);
    return numValue >= minValue && numValue <= maxValue;
  },
  message,
});

/**
 * Prüft, ob ein Wert einem regulären Ausdruck entspricht
 */
export const pattern = (
  regex: RegExp,
  message = 'Bitte geben Sie einen gültigen Wert ein'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    return regex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert eine gültige URL ist
 */
export const url = (message = 'Bitte geben Sie eine gültige URL ein'): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  message,
});

/**
 * Prüft, ob ein Wert ein gültiges Datum ist
 */
export const date = (message = 'Bitte geben Sie ein gültiges Datum ein'): ValidationRule => ({
  validator: (value) => {
    if (!value) return true;
    const date = new Date(value);
    return !isNaN(date.getTime());
  },
  message,
});

/**
 * Prüft, ob ein Wert nach einem bestimmten Datum liegt
 */
export const dateAfter = (
  minDate: Date | string,
  message = `Datum muss nach ${minDate instanceof Date ? minDate.toLocaleDateString() : minDate} liegen`
): ValidationRule => ({
  validator: (value) => {
    if (!value) return true;
    const date = new Date(value);
    const min = minDate instanceof Date ? minDate : new Date(minDate);
    return date > min;
  },
  message,
});

/**
 * Prüft, ob ein Wert vor einem bestimmten Datum liegt
 */
export const dateBefore = (
  maxDate: Date | string,
  message = `Datum muss vor ${maxDate instanceof Date ? maxDate.toLocaleDateString() : maxDate} liegen`
): ValidationRule => ({
  validator: (value) => {
    if (!value) return true;
    const date = new Date(value);
    const max = maxDate instanceof Date ? maxDate : new Date(maxDate);
    return date < max;
  },
  message,
});

/**
 * Prüft, ob ein Wert mit einem anderen Feld übereinstimmt
 */
export const matches = (
  fieldName: string,
  message = `Muss mit dem Feld ${fieldName} übereinstimmen`
): ValidationRule => ({
  validator: (value, formValues) => {
    if (!value || !formValues) return true;
    return value === formValues[fieldName];
  },
  message,
});

/**
 * Prüft, ob ein Wert eine gültige Telefonnummer ist
 */
export const phone = (
  message = 'Bitte geben Sie eine gültige Telefonnummer ein'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    // Einfache Telefonvalidierung: mindestens 6 Ziffern, kann +, -, Leerzeichen und Klammern enthalten
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert eine gültige Postleitzahl ist (deutsches Format)
 */
export const zipCode = (
  message = 'Bitte geben Sie eine gültige Postleitzahl ein'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    // Deutsches PLZ-Format: 5 Ziffern
    const zipRegex = /^[0-9]{5}$/;
    return zipRegex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert alphanumerisch ist (nur Buchstaben und Zahlen)
 */
export const alphanumeric = (
  message = 'Bitte verwenden Sie nur Buchstaben und Zahlen'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert ein gültiger Benutzername ist (Buchstaben, Zahlen, Unterstrich, Bindestrich)
 */
export const username = (
  message = 'Benutzername darf nur Buchstaben, Zahlen, Unterstriche und Bindestriche enthalten'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    return usernameRegex.test(value);
  },
  message,
});

/**
 * Prüft, ob ein Wert ein starkes Passwort ist
 */
export const strongPassword = (
  message = 'Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
): ValidationRule<string> => ({
  validator: (value) => {
    if (!value) return true;
    // Mindestens 8 Zeichen, ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordRegex.test(value);
  },
  message,
});

/**
 * Erstellt eine benutzerdefinierte Validierungsregel
 */
export const custom = (
  validatorFn: (value: unknown, formValues?: Record<string, unknown>) => boolean,
  message = 'Ungültiger Wert'
): ValidationRule => ({
  validator: validatorFn,
  message,
});

/**
 * Kombiniert mehrere Validierungsregeln zu einer
 */
export const compose = (rules: ValidationRule[]): ValidationRule => ({
  validator: (value, formValues) => {
    for (const rule of rules) {
      if (!rule.validator(value, formValues)) {
        return false;
      }
    }
    return true;
  },
  message: '', // Die Nachricht wird nie angezeigt, da die einzelnen Regeln ihre eigenen Nachrichten haben
  validateEmpty: rules.some((rule) => rule.validateEmpty),
});
