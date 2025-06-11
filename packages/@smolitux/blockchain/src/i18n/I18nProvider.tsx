/**
 * Provider für die Internationalisierung
 */

import React, { createContext, useContext, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { initI18n } from './i18n';
import {
  I18nOptions,
  I18nContextValue,
  Locale,
  TranslationNamespace,
  TranslationKey,
} from './types';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  FALLBACK_LOCALE,
  DEFAULT_NAMESPACES,
  FALLBACK_NAMESPACES,
  LOCAL_STORAGE_KEY,
} from './constants';
import { useTranslation } from './useTranslation';

// Kontext für die Internationalisierung
const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Hook für den Zugriff auf den I18n-Kontext
 */
export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n muss innerhalb eines I18nProvider verwendet werden');
  }

  return context;
};

export type I18nProviderProps = {
  /**
   * Die Kinder des Providers
   */
  children: React.ReactNode;

  /**
   * Die Optionen für die Internationalisierung
   */
  options?: I18nOptions;

  /**
   * Die i18next-Instanz
   */
  i18nInstance?: typeof i18n;
};

/**
 * Provider für die Internationalisierung
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  options = {},
  i18nInstance = i18n,
}) => {
  // Initialisiere i18next, falls eine benutzerdefinierte Instanz übergeben wurde
  const instance = i18nInstance === i18n ? i18nInstance : initI18n(options);

  // Hole die Übersetzungsfunktionen
  const {
    t,
    p,
    c,
    pc,
    exists,
    changeLocale,
    loadNamespace,
    loadNamespaces,
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    formatList,
    locale,
    supportedLocales,
    defaultLocale,
    fallbackLocale,
    defaultNamespaces,
    fallbackNamespaces,
  } = useTranslation();

  // Füge Ressourcen hinzu
  const addResources = (
    locale: Locale,
    namespace: TranslationNamespace,
    resources: Record<TranslationKey, string>
  ) => {
    instance.addResourceBundle(locale, namespace, resources, true, true);
  };

  // Füge eine Übersetzung hinzu
  const addTranslation = (
    locale: Locale,
    namespace: TranslationNamespace,
    key: TranslationKey,
    value: string
  ) => {
    instance.addResource(locale, namespace, key, value);
  };

  // Lade eine Sprache
  const loadLocale = async (locale: Locale): Promise<void> => {
    await instance.loadLanguages(locale);
  };

  // Lade mehrere Sprachen
  const loadLocales = async (locales: Locale[]): Promise<void> => {
    await instance.loadLanguages(locales);
  };

  // Speichere die Sprache im LocalStorage
  useEffect(() => {
    if (options.cacheInLocalStorage !== false) {
      localStorage.setItem(options.localStorageKey || LOCAL_STORAGE_KEY, locale);
    }
  }, [locale, options.cacheInLocalStorage, options.localStorageKey]);

  // Kontextwert
  const contextValue: I18nContextValue = {
    locale,
    supportedLocales: supportedLocales || SUPPORTED_LOCALES,
    defaultLocale: defaultLocale || DEFAULT_LOCALE,
    fallbackLocale: fallbackLocale || FALLBACK_LOCALE,
    defaultNamespaces: defaultNamespaces || DEFAULT_NAMESPACES,
    fallbackNamespaces: fallbackNamespaces || FALLBACK_NAMESPACES,
    changeLocale,
    t,
    p,
    c,
    pc,
    exists,
    loadNamespace,
    loadNamespaces,
    loadLocale,
    loadLocales,
    addResources,
    addTranslation,
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    formatList,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      <I18nextProvider i18n={instance}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
};

export default I18nProvider;
