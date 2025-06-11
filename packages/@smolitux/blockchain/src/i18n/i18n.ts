/**
 * Konfiguration und Initialisierung von i18next
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  FALLBACK_LOCALE,
  DEFAULT_NAMESPACES,
  FALLBACK_NAMESPACES,
  LOCAL_STORAGE_KEY,
  BACKEND_URL,
  INTERPOLATION_PREFIX,
  INTERPOLATION_SUFFIX,
  INTERPOLATION_SEPARATOR,
  PLURAL_RULES,
} from './constants';
import { I18nOptions } from './types';

/**
 * Initialisiert i18next mit den angegebenen Optionen
 */
export const initI18n = (options: I18nOptions = {}) => {
  const {
    defaultLocale = DEFAULT_LOCALE,
    supportedLocales = SUPPORTED_LOCALES,
    resources = {},
    defaultNamespaces = DEFAULT_NAMESPACES,
    detectLocale = true,
    loadFromBackend = true,
    backendUrl = BACKEND_URL,
    cacheInLocalStorage = true,
    localStorageKey = LOCAL_STORAGE_KEY,
    debug = false,
    logMissingTranslations = true,
    fallback = true,
    fallbackLocale = FALLBACK_LOCALE,
    fallbackNamespaces = FALLBACK_NAMESPACES,
    interpolationPrefix = INTERPOLATION_PREFIX,
    interpolationSuffix = INTERPOLATION_SUFFIX,
    interpolationSeparator = INTERPOLATION_SEPARATOR,
    pluralization = true,
    pluralRules = PLURAL_RULES,
  } = options;

  // Konfiguriere i18next
  const i18nInstance = i18n.createInstance();

  // Füge Plugins hinzu
  if (detectLocale && typeof window !== 'undefined') {
    i18nInstance.use(LanguageDetector);
  }

  if (loadFromBackend && typeof window !== 'undefined') {
    i18nInstance.use(Backend);
  }

  // Füge React-I18next hinzu
  i18nInstance.use(initReactI18next);

  // Initialisiere i18next
  i18nInstance.init({
    // Grundlegende Konfiguration
    lng: defaultLocale,
    fallbackLng: fallback ? fallbackLocale : false,
    supportedLngs: supportedLocales,
    ns: defaultNamespaces,
    defaultNS: defaultNamespaces[0],
    fallbackNS: fallback ? fallbackNamespaces : false,

    // Ressourcen
    resources,

    // Backend-Konfiguration
    backend:
      loadFromBackend && typeof window !== 'undefined'
        ? {
            loadPath: backendUrl,
          }
        : undefined,

    // Spracherkennung
    detection:
      detectLocale && typeof window !== 'undefined'
        ? {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: localStorageKey,
            caches: cacheInLocalStorage ? ['localStorage'] : [],
          }
        : undefined,

    // Interpolation
    interpolation: {
      escapeValue: true, // React escaped bereits
      prefix: interpolationPrefix,
      suffix: interpolationSuffix,
      separator: interpolationSeparator,
    },

    // Pluralisierung
    pluralSeparator: '_',

    // Debug
    debug,
    saveMissing: logMissingTranslations,
    missingKeyHandler: (lng, ns, key) => {
      if (debug) {
        console.warn(`Missing translation: ${key} (${ns}) in ${lng}`);
      }
    },

    // Reaktion auf Sprachänderungen
    react: {
      useSuspense: false,
    },
  });

  // Füge Pluralisierungsregeln hinzu
  if (
    pluralization &&
    pluralRules &&
    i18nInstance.services &&
    i18nInstance.services.pluralResolver
  ) {
    Object.entries(pluralRules).forEach(([locale, rule]) => {
      try {
        i18nInstance.services.pluralResolver.addRule(locale, rule);
      } catch (error) {
        console.warn(`Failed to add plural rule for ${locale}:`, error);
      }
    });
  }

  return i18nInstance;
};

// Exportiere die Standardinstanz, aber nur im Browser-Kontext
const isBrowser = typeof window !== 'undefined';
export default isBrowser ? initI18n() : i18n.createInstance();
