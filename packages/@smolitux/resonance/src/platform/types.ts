/**
 * Plattform-spezifische Daten- und Integrations-Typen
 */

export interface PlatformInfo {
  /** Der eindeutige Name der Plattform */
  name: string;
  /** Die Version der Plattform */
  version?: string;
  /** Gibt an, ob diese Plattform unterstützt wird */
  supported: boolean;
  /** Optionaler Hinweis oder Fehlermeldung */
  message?: string;
}
