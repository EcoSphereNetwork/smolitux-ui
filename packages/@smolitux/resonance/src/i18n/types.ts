/**
 * Typen für das Internationalisierungssystem
 */

export type Locale = string;

export type TranslationNamespace = string;

export type TranslationKey = string;

export type TranslationValue = string | number | boolean | null | undefined;

export type TranslationValues = Record<string, TranslationValue>;

export type TranslationOptions = {
  /**
   * Die Werte für die Interpolation
   */
  values?: TranslationValues;

  /**
   * Der Namespace für die Übersetzung
   */
  ns?: TranslationNamespace;

  /**
   * Die Sprache für die Übersetzung
   */
  lng?: Locale;

  /**
   * Der Standardwert, falls keine Übersetzung gefunden wird
   */
  defaultValue?: string;

  /**
   * Ob die Übersetzung als HTML gerendert werden soll
   */
  renderHTML?: boolean;

  /**
   * Ob die Übersetzung als JSX gerendert werden soll
   */
  renderJSX?: boolean;

  /**
   * Ob die Übersetzung als Markdown gerendert werden soll
   */
  renderMarkdown?: boolean;

  /**
   * Ob die Übersetzung als Pluralform gerendert werden soll
   */
  count?: number;

  /**
   * Ob die Übersetzung als Kontext gerendert werden soll
   */
  context?: string;

  /**
   * Ob die Übersetzung als Ordinalzahl gerendert werden soll
   */
  ordinal?: boolean;

  /**
   * Ob die Übersetzung als Kardinalzahl gerendert werden soll
   */
  cardinal?: boolean;
};

export type TranslationResources = Record<
  Locale,
  Record<TranslationNamespace, Record<TranslationKey, string>>
>;

export type I18nOptions = {
  /**
   * Die Standardsprache
   */
  defaultLocale?: Locale;

  /**
   * Die unterstützten Sprachen
   */
  supportedLocales?: Locale[];

  /**
   * Die Ressourcen für die Übersetzungen
   */
  resources?: TranslationResources;

  /**
   * Die Standardnamespaces
   */
  defaultNamespaces?: TranslationNamespace[];

  /**
   * Ob die Sprache automatisch erkannt werden soll
   */
  detectLocale?: boolean;

  /**
   * Ob die Übersetzungen aus dem Backend geladen werden sollen
   */
  loadFromBackend?: boolean;

  /**
   * Die URL für das Backend
   */
  backendUrl?: string;

  /**
   * Ob die Übersetzungen im LocalStorage gespeichert werden sollen
   */
  cacheInLocalStorage?: boolean;

  /**
   * Der Schlüssel für den LocalStorage
   */
  localStorageKey?: string;

  /**
   * Ob die Übersetzungen im Debug-Modus angezeigt werden sollen
   */
  debug?: boolean;

  /**
   * Ob die fehlenden Übersetzungen protokolliert werden sollen
   */
  logMissingTranslations?: boolean;

  /**
   * Ob die Übersetzungen im Fallback-Modus angezeigt werden sollen
   */
  fallback?: boolean;

  /**
   * Die Fallback-Sprache
   */
  fallbackLocale?: Locale;

  /**
   * Die Fallback-Namespaces
   */
  fallbackNamespaces?: TranslationNamespace[];

  /**
   * Ob die Übersetzungen im Interpolations-Modus angezeigt werden sollen
   */
  interpolation?: boolean;

  /**
   * Die Interpolations-Optionen
   */
  interpolationPrefix?: string;

  /**
   * Das Interpolations-Suffix
   */
  interpolationSuffix?: string;

  /**
   * Der Interpolations-Separator
   */
  interpolationSeparator?: string;

  /**
   * Ob die Übersetzungen im Pluralisierungs-Modus angezeigt werden sollen
   */
  pluralization?: boolean;

  /**
   * Die Pluralisierungs-Regeln
   */
  pluralRules?: Record<Locale, (n: number) => number>;

  /**
   * Die Pluralisierungs-Suffixe
   */
  pluralSuffixes?: string[];
};

export type I18nContextValue = {
  /**
   * Die aktuelle Sprache
   */
  locale: Locale;

  /**
   * Die unterstützten Sprachen
   */
  supportedLocales: Locale[];

  /**
   * Die Standardsprache
   */
  defaultLocale: Locale;

  /**
   * Die Fallback-Sprache
   */
  fallbackLocale: Locale;

  /**
   * Die Standardnamespaces
   */
  defaultNamespaces: TranslationNamespace[];

  /**
   * Die Fallback-Namespaces
   */
  fallbackNamespaces: TranslationNamespace[];

  /**
   * Ändert die aktuelle Sprache
   */
  changeLocale: (locale: Locale) => void;

  /**
   * Übersetzt einen Schlüssel
   */
  t: (key: TranslationKey, options?: TranslationOptions) => string;

  /**
   * Übersetzt einen Schlüssel mit Pluralisierung
   */
  p: (key: TranslationKey, count: number, options?: TranslationOptions) => string;

  /**
   * Übersetzt einen Schlüssel mit Kontext
   */
  c: (key: TranslationKey, context: string, options?: TranslationOptions) => string;

  /**
   * Übersetzt einen Schlüssel mit Pluralisierung und Kontext
   */
  pc: (key: TranslationKey, count: number, context: string, options?: TranslationOptions) => string;

  /**
   * Prüft, ob ein Schlüssel existiert
   */
  exists: (key: TranslationKey, options?: TranslationOptions) => boolean;

  /**
   * Lädt einen Namespace
   */
  loadNamespace: (namespace: TranslationNamespace) => Promise<void>;

  /**
   * Lädt mehrere Namespaces
   */
  loadNamespaces: (namespaces: TranslationNamespace[]) => Promise<void>;

  /**
   * Lädt eine Sprache
   */
  loadLocale: (locale: Locale) => Promise<void>;

  /**
   * Lädt mehrere Sprachen
   */
  loadLocales: (locales: Locale[]) => Promise<void>;

  /**
   * Fügt Ressourcen hinzu
   */
  addResources: (
    locale: Locale,
    namespace: TranslationNamespace,
    resources: Record<TranslationKey, string>
  ) => void;

  /**
   * Fügt eine Übersetzung hinzu
   */
  addTranslation: (
    locale: Locale,
    namespace: TranslationNamespace,
    key: TranslationKey,
    value: string
  ) => void;

  /**
   * Formatiert ein Datum
   */
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;

  /**
   * Formatiert eine Zahl
   */
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;

  /**
   * Formatiert eine Währung
   */
  formatCurrency: (number: number, currency: string, options?: Intl.NumberFormatOptions) => string;

  /**
   * Formatiert eine relative Zeit
   */
  formatRelativeTime: (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions
  ) => string;

  /**
   * Formatiert eine Liste
   */
  formatList: (list: string[], options?: Intl.ListFormatOptions) => string;
};
