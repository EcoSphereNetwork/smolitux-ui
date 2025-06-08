/**
 * Hook für die Verwendung von Übersetzungen
 */

import { useTranslation as useReactI18nextTranslation } from 'react-i18next';
import { TranslationKey, TranslationOptions, TranslationNamespace } from './types';
import { DEFAULT_NAMESPACES } from './constants';

/**
 * Hook für die Verwendung von Übersetzungen
 */
export const useTranslation = (namespace?: TranslationNamespace | TranslationNamespace[]) => {
  const ns = namespace || DEFAULT_NAMESPACES[0];
  const { t, i18n } = useReactI18nextTranslation(ns);

  /**
   * Übersetzt einen Schlüssel
   */
  const translate = (key: TranslationKey, options?: TranslationOptions): string => {
    return t(key, options);
  };

  /**
   * Übersetzt einen Schlüssel mit Pluralisierung
   */
  const translatePlural = (
    key: TranslationKey,
    count: number,
    options?: TranslationOptions
  ): string => {
    return t(key, { ...options, count });
  };

  /**
   * Übersetzt einen Schlüssel mit Kontext
   */
  const translateContext = (
    key: TranslationKey,
    context: string,
    options?: TranslationOptions
  ): string => {
    return t(`${key}_${context}`, options);
  };

  /**
   * Übersetzt einen Schlüssel mit Pluralisierung und Kontext
   */
  const translatePluralContext = (
    key: TranslationKey,
    count: number,
    context: string,
    options?: TranslationOptions
  ): string => {
    return t(`${key}_${context}`, { ...options, count });
  };

  /**
   * Prüft, ob ein Schlüssel existiert
   */
  const exists = (key: TranslationKey, options?: TranslationOptions): boolean => {
    return i18n.exists(key, options);
  };

  /**
   * Ändert die aktuelle Sprache
   */
  const changeLocale = (locale: string): Promise<void> => {
    return i18n.changeLanguage(locale);
  };

  /**
   * Lädt einen Namespace
   */
  const loadNamespace = (namespace: TranslationNamespace): Promise<void> => {
    return i18n.loadNamespaces(namespace);
  };

  /**
   * Lädt mehrere Namespaces
   */
  const loadNamespaces = (namespaces: TranslationNamespace[]): Promise<void> => {
    return i18n.loadNamespaces(namespaces);
  };

  /**
   * Formatiert ein Datum
   */
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(i18n.language, options).format(date);
  };

  /**
   * Formatiert eine Zahl
   */
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(i18n.language, options).format(number);
  };

  /**
   * Formatiert eine Währung
   */
  const formatCurrency = (
    number: number,
    currency: string,
    options?: Intl.NumberFormatOptions
  ): string => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
      ...options,
    }).format(number);
  };

  /**
   * Formatiert eine relative Zeit
   */
  const formatRelativeTime = (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions
  ): string => {
    return new Intl.RelativeTimeFormat(i18n.language, options).format(value, unit);
  };

  /**
   * Formatiert eine Liste
   */
  const formatList = (list: string[], options?: Intl.ListFormatOptions): string => {
    return new Intl.ListFormat(i18n.language, options).format(list);
  };

  return {
    t: translate,
    p: translatePlural,
    c: translateContext,
    pc: translatePluralContext,
    exists,
    changeLocale,
    loadNamespace,
    loadNamespaces,
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    formatList,
    i18n,
    locale: i18n.language,
    supportedLocales: i18n.options.supportedLngs || [],
    defaultLocale: i18n.options.lng || '',
    fallbackLocale: i18n.options.fallbackLng as string,
    defaultNamespaces: i18n.options.ns as string[],
    fallbackNamespaces: i18n.options.fallbackNS as string[],
  };
};

export default useTranslation;
