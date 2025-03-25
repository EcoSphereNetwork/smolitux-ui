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
  PLURAL_RULES
} from './constants';
import { I18nOptions, TranslationResources } from './types';

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
    interpolation = true,
    interpolationPrefix = INTERPOLATION_PREFIX,
    interpolationSuffix = INTERPOLATION_SUFFIX,
    interpolationSeparator = INTERPOLATION_SEPARATOR,
    pluralization = true,
    pluralRules = PLURAL_RULES,
  } = options;

  // Konfiguriere i18next
  const i18nInstance = i18n.createInstance();

  // Füge Plugins hinzu
  if (detectLocale) {
    i18nInstance.use(LanguageDetector);
  }

  if (loadFromBackend) {
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
    backend: loadFromBackend ? {
      loadPath: backendUrl,
    } : undefined,
    
    // Spracherkennung
    detection: detectLocale ? {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: localStorageKey,
      caches: cacheInLocalStorage ? ['localStorage'] : [],
    } : undefined,
    
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
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
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
  if (pluralization && pluralRules) {
    Object.entries(pluralRules).forEach(([locale, rule]) => {
      i18nInstance.services.pluralResolver.addRule(locale, rule);
    });
  }

  return i18nInstance;
};

// Exportiere die Standardinstanz
export default initI18n();