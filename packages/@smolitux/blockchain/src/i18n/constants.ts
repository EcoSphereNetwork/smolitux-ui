/**
 * Konstanten für das Internationalisierungssystem
 */

import { Locale, TranslationNamespace } from './types';

/**
 * Die Standardsprache
 */
export const DEFAULT_LOCALE: Locale = 'de';

/**
 * Die unterstützten Sprachen
 */
export const SUPPORTED_LOCALES: Locale[] = ['de', 'en', 'fr', 'es', 'it'];

/**
 * Die Fallback-Sprache
 */
export const FALLBACK_LOCALE: Locale = 'en';

/**
 * Die Standardnamespaces
 */
export const DEFAULT_NAMESPACES: TranslationNamespace[] = ['common', 'validation', 'components'];

/**
 * Die Fallback-Namespaces
 */
export const FALLBACK_NAMESPACES: TranslationNamespace[] = ['common'];

/**
 * Der Schlüssel für den LocalStorage
 */
export const LOCAL_STORAGE_KEY = 'smolitux-ui-locale';

/**
 * Die URL für das Backend
 */
export const BACKEND_URL = '/locales/{{lng}}/{{ns}}.json';

/**
 * Die Interpolations-Optionen
 */
export const INTERPOLATION_PREFIX = '{{';

/**
 * Das Interpolations-Suffix
 */
export const INTERPOLATION_SUFFIX = '}}';

/**
 * Der Interpolations-Separator
 */
export const INTERPOLATION_SEPARATOR = ',';

/**
 * Die Pluralisierungs-Suffixe
 */
export const PLURAL_SUFFIXES = ['zero', 'one', 'two', 'few', 'many', 'other'];

/**
 * Die Pluralisierungs-Regeln
 */
export const PLURAL_RULES: Record<Locale, (n: number) => number> = {
  de: (n: number) => (n === 1 ? 1 : 5),
  en: (n: number) => (n === 1 ? 1 : 5),
  fr: (n: number) => (n === 0 || n === 1 ? 1 : 5),
  es: (n: number) => (n === 1 ? 1 : 5),
  it: (n: number) => (n === 1 ? 1 : 5),
};

/**
 * Die Sprachnamen
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
};

/**
 * Die Sprachcodes nach ISO 639-1
 */
export const LOCALE_CODES: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT',
};

/**
 * Die Sprachrichtungen
 */
export const LOCALE_DIRECTIONS: Record<Locale, 'ltr' | 'rtl'> = {
  de: 'ltr',
  en: 'ltr',
  fr: 'ltr',
  es: 'ltr',
  it: 'ltr',
};
