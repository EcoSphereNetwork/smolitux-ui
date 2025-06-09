// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { LOCALE_NAMES, LOCALE_CODES, LOCALE_DIRECTIONS } from '../../i18n/constants';
import { Locale } from '../../i18n/types';

export type LanguageSwitcherProps = {
  /**
   * Die Variante des Sprachumschalters
   */
  variant?: 'dropdown' | 'select' | 'buttons' | 'flags' | 'minimal';

  /**
   * Die Größe des Sprachumschalters
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Die Sprachen, die angezeigt werden sollen
   */
  locales?: Locale[];

  /**
   * Ob der Name der Sprache angezeigt werden soll
   */
  showName?: boolean;

  /**
   * Ob der Code der Sprache angezeigt werden soll
   */
  showCode?: boolean;

  /**
   * Ob die Flagge der Sprache angezeigt werden soll
   */
  showFlag?: boolean;

  /**
   * Ob die aktuelle Sprache hervorgehoben werden soll
   */
  highlightCurrent?: boolean;

  /**
   * Ob der Sprachumschalter deaktiviert sein soll
   */
  disabled?: boolean;

  /**
   * Callback, wenn die Sprache geändert wird
   */
  onChange?: (locale: Locale) => void;

  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;

  /**
   * Zusätzliche CSS-Eigenschaften
   */
  style?: React.CSSProperties;
};

/**
 * Sprachumschalter-Komponente
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  size = 'md',
  locales,
  showName = true,
  showCode = false,
  showFlag = true,
  highlightCurrent = true,
  disabled = false,
  onChange,
  className = '',
  style,
}) => {
  const { locale: currentLocale, supportedLocales, changeLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  // Verwende die übergebenen Sprachen oder die unterstützten Sprachen
  const availableLocales = locales || supportedLocales;

  // Ändere die Sprache
  const handleLocaleChange = (locale: Locale) => {
    if (locale !== currentLocale && !disabled) {
      changeLocale(locale);
      onChange?.(locale);
      setIsOpen(false);
    }
  };

  // Schließe das Dropdown, wenn außerhalb geklickt wird
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Größenklassen
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  // Flaggen-Komponente
  const Flag = ({ locale }: { locale: Locale }) => {
    return <span className="language-switcher-flag mr-2">{locale.toUpperCase()}</span>;
  };

  // Rendere den Sprachumschalter basierend auf der Variante
  const renderSwitcher = () => {
    switch (variant) {
      case 'dropdown':
        return (
          <div className="language-switcher-dropdown relative">
            <button
              className={`language-switcher-dropdown-button flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600'
              } ${sizeClasses[size]}`}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
            >
              {showFlag && <Flag locale={currentLocale} />}
              {showName && (
                <span className="language-switcher-name">{LOCALE_NAMES[currentLocale]}</span>
              )}
              {showCode && (
                <span className="language-switcher-code ml-1 text-gray-500">
                  ({LOCALE_CODES[currentLocale]})
                </span>
              )}
              <span className="language-switcher-arrow ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="language-switcher-dropdown-menu absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                {availableLocales.map((locale) => (
                  <button
                    key={locale}
                    className={`language-switcher-dropdown-item flex items-center w-full px-3 py-2 text-left ${
                      locale === currentLocale && highlightCurrent
                        ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                    } ${sizeClasses[size]}`}
                    onClick={() => handleLocaleChange(locale)}
                  >
                    {showFlag && <Flag locale={locale} />}
                    {showName && (
                      <span className="language-switcher-name">{LOCALE_NAMES[locale]}</span>
                    )}
                    {showCode && (
                      <span className="language-switcher-code ml-1 text-gray-500">
                        ({LOCALE_CODES[locale]})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <select
            className={`language-switcher-select px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${sizeClasses[size]}`}
            value={currentLocale}
            onChange={(e) => handleLocaleChange(e.target.value as Locale)}
            disabled={disabled}
          >
            {availableLocales.map((locale) => (
              <option key={locale} value={locale}>
                {showFlag && `${locale.toUpperCase()} `}
                {showName && LOCALE_NAMES[locale]}
                {showCode && ` (${LOCALE_CODES[locale]})`}
              </option>
            ))}
          </select>
        );

      case 'buttons':
        return (
          <div className="language-switcher-buttons flex space-x-2">
            {availableLocales.map((locale) => (
              <button
                key={locale}
                className={`language-switcher-button px-3 py-2 border rounded-md ${
                  locale === currentLocale && highlightCurrent
                    ? 'bg-primary-500 dark:bg-primary-600 text-white border-primary-500 dark:border-primary-600'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${sizeClasses[size]}`}
                onClick={() => handleLocaleChange(locale)}
                disabled={disabled}
              >
                {showFlag && <Flag locale={locale} />}
                {showName && <span className="language-switcher-name">{LOCALE_NAMES[locale]}</span>}
                {showCode && (
                  <span className="language-switcher-code ml-1 text-gray-500">
                    ({LOCALE_CODES[locale]})
                  </span>
                )}
              </button>
            ))}
          </div>
        );

      case 'flags':
        return (
          <div className="language-switcher-flags flex space-x-2">
            {availableLocales.map((locale) => (
              <button
                key={locale}
                className={`language-switcher-flag-button p-2 rounded-full ${
                  locale === currentLocale && highlightCurrent
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 ring-2 ring-primary-500 dark:ring-primary-400'
                    : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${sizeClasses[size]}`}
                onClick={() => handleLocaleChange(locale)}
                disabled={disabled}
                title={LOCALE_NAMES[locale]}
              >
                <Flag locale={locale} />
              </button>
            ))}
          </div>
        );

      case 'minimal':
        return (
          <div className="language-switcher-minimal flex">
            {availableLocales.map((locale) => (
              <button
                key={locale}
                className={`language-switcher-minimal-button px-2 py-1 ${
                  locale === currentLocale && highlightCurrent
                    ? 'font-bold text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${sizeClasses[size]}`}
                onClick={() => handleLocaleChange(locale)}
                disabled={disabled}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`language-switcher language-switcher-${variant} ${className}`}
      style={{ ...style, direction: LOCALE_DIRECTIONS[currentLocale] }}
    >
      {renderSwitcher()}
    </div>
  );
};

export default LanguageSwitcher;
