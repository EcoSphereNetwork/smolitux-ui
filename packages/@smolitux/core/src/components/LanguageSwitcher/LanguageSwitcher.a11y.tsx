import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
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
   * Zusätzliche CSS-Klasse
   */
  className?: string;

  /**
   * Zusätzliche Inline-Styles
   */
  style?: React.CSSProperties;

  /**
   * ARIA-Label für den Sprachumschalter
   */
  ariaLabel?: string;

  /**
   * ARIA-Labelledby für den Sprachumschalter
   */
  ariaLabelledby?: string;

  /**
   * ARIA-Describedby für den Sprachumschalter
   */
  ariaDescribedby?: string;

  /**
   * ARIA-Controls für den Sprachumschalter
   */
  ariaControls?: string;

  /**
   * ARIA-Expanded für den Sprachumschalter
   */
  ariaExpanded?: boolean;

  /**
   * ARIA-Haspopup für den Sprachumschalter
   */
  ariaHaspopup?: boolean;

  /**
   * ARIA-Live für den Sprachumschalter
   */
  ariaLive?: 'polite' | 'assertive' | 'off';

  /**
   * ARIA-Atomic für den Sprachumschalter
   */
  ariaAtomic?: boolean;

  /**
   * ARIA-Current für den Sprachumschalter
   */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

  /**
   * ARIA-Busy für den Sprachumschalter
   */
  ariaBusy?: boolean;

  /**
   * ARIA-Keyshortcuts für den Sprachumschalter
   */
  ariaKeyshortcuts?: string;

  /**
   * Ob der Sprachumschalter eine Tastaturnavigation haben soll
   */
  keyboardNavigation?: boolean;

  /**
   * Ob der Sprachumschalter eine Screenreader-Unterstützung haben soll
   */
  screenReaderSupport?: boolean;

  /**
   * Ob der Sprachumschalter eine Beschreibung haben soll
   */
  description?: string;

  /**
   * Ob der Sprachumschalter eine Live-Region haben soll
   */
  liveRegion?: boolean;

  /**
   * Ob der Sprachumschalter eine Ankündigung haben soll
   */
  announce?: boolean;
};

/**
 * Barrierefreie LanguageSwitcher-Komponente zum Umschalten der Sprache
 *
 * @example
 * ```tsx
 * <LanguageSwitcherA11y
 *   variant="dropdown"
 *   locales={['de', 'en', 'fr']}
 *   showName
 *   ariaLabel="Sprache auswählen"
 * />
 * ```
 */
export const LanguageSwitcherA11y: React.FC<LanguageSwitcherProps> = ({
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
  style = {},
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  ariaLive,
  ariaAtomic,
  ariaCurrent,
  ariaBusy,
  ariaKeyshortcuts,
  keyboardNavigation = true,
  screenReaderSupport = true,
  description,
  liveRegion = true,
  announce = true,
}) => {
  const { locale: currentLocale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [announceMessage, setAnnounceMessage] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Verfügbare Sprachen
  const availableLocales = locales || (Object.keys(LOCALE_NAMES) as Locale[]);

  // Initialisiere die Refs für die Buttons
  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, availableLocales.length);
  }, [availableLocales]);

  // Effekt für Klick außerhalb des Dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Effekt für Escape-Taste
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        containerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown as any);

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen]);

  // Sprache ändern
  const handleLocaleChange = (locale: Locale) => {
    if (locale !== currentLocale) {
      setLocale(locale);

      if (onChange) {
        onChange(locale);
      }

      // Ankündige die Sprachänderung für Screenreader
      if (announce) {
        setAnnounceMessage(`Sprache geändert zu ${LOCALE_NAMES[locale]}`);
      }

      // Schließe das Dropdown
      setIsOpen(false);
    }
  };

  // Dropdown öffnen/schließen
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Tastaturnavigation für Dropdown
  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavigation || disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prevIndex) => {
            const newIndex = prevIndex < availableLocales.length - 1 ? prevIndex + 1 : 0;
            buttonRefs.current[newIndex]?.focus();
            return newIndex;
          });
        } else {
          setIsOpen(true);
          setFocusedIndex(0);
          setTimeout(() => {
            buttonRefs.current[0]?.focus();
          }, 0);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : availableLocales.length - 1;
            buttonRefs.current[newIndex]?.focus();
            return newIndex;
          });
        } else {
          setIsOpen(true);
          setFocusedIndex(availableLocales.length - 1);
          setTimeout(() => {
            buttonRefs.current[availableLocales.length - 1]?.focus();
          }, 0);
        }
        break;

      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
          buttonRefs.current[0]?.focus();
        }
        break;

      case 'End':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(availableLocales.length - 1);
          buttonRefs.current[availableLocales.length - 1]?.focus();
        }
        break;

      case 'Enter':
      case ' ':
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          containerRef.current?.focus();
        }
        break;

      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  // Tastaturnavigation für Buttons
  const handleButtonKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    locale: Locale,
    index: number
  ) => {
    if (!keyboardNavigation || disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleLocaleChange(locale);
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        containerRef.current?.focus();
        break;

      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prevIndex) => {
          const newIndex = prevIndex < availableLocales.length - 1 ? prevIndex + 1 : 0;
          buttonRefs.current[newIndex]?.focus();
          return newIndex;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : availableLocales.length - 1;
          buttonRefs.current[newIndex]?.focus();
          return newIndex;
        });
        break;

      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        buttonRefs.current[0]?.focus();
        break;

      case 'End':
        event.preventDefault();
        setFocusedIndex(availableLocales.length - 1);
        buttonRefs.current[availableLocales.length - 1]?.focus();
        break;
    }
  };

  // Rendere die Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description || !screenReaderSupport) return null;

    return (
      <div className="sr-only" id="language-switcher-description">
        {description}
      </div>
    );
  };

  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    if (!liveRegion || !screenReaderSupport) return null;

    return (
      <div aria-live={ariaLive || 'polite'} aria-atomic={ariaAtomic || true} className="sr-only">
        {announceMessage}
      </div>
    );
  };

  // Rendere den Sprachumschalter
  const renderSwitcher = () => {
    switch (variant) {
      case 'dropdown':
        return (
          <div
            ref={containerRef}
            className={`language-switcher-dropdown size-${size} ${disabled ? 'disabled' : ''}`}
            tabIndex={disabled ? -1 : 0}
            onClick={toggleDropdown}
            onKeyDown={handleDropdownKeyDown}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            aria-controls="language-options"
            aria-label={ariaLabel || 'Sprache auswählen'}
            aria-labelledby={ariaLabelledby}
            aria-describedby={
              ariaDescribedby || (description ? 'language-switcher-description' : undefined)
            }
            aria-keyshortcuts={ariaKeyshortcuts}
            aria-busy={ariaBusy}
          >
            <div className="language-switcher-current">
              {showFlag && (
                <span className={`flag flag-${currentLocale}`} aria-hidden="true"></span>
              )}
              {showName && <span className="language-name">{LOCALE_NAMES[currentLocale]}</span>}
              {showCode && <span className="language-code">{LOCALE_CODES[currentLocale]}</span>}
              <span className="dropdown-arrow" aria-hidden="true"></span>
            </div>

            {isOpen && (
              <div
                ref={dropdownRef}
                id="language-options"
                className="language-switcher-options"
                role="listbox"
                aria-label={ariaLabel || 'Verfügbare Sprachen'}
              >
                {availableLocales.map((locale, index) => (
                  <button
                    key={locale}
                    ref={(el) => (buttonRefs.current[index] = el)}
                    className={`language-option ${locale === currentLocale && highlightCurrent ? 'active' : ''}`}
                    onClick={() => handleLocaleChange(locale)}
                    onKeyDown={(e) => handleButtonKeyDown(e, locale, index)}
                    role="option"
                    aria-selected={locale === currentLocale}
                    tabIndex={-1}
                  >
                    {showFlag && <span className={`flag flag-${locale}`} aria-hidden="true"></span>}
                    {showName && <span className="language-name">{LOCALE_NAMES[locale]}</span>}
                    {showCode && <span className="language-code">{LOCALE_CODES[locale]}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div className={`language-switcher-select size-${size} ${disabled ? 'disabled' : ''}`}>
            <label htmlFor="language-select" className="sr-only">
              {ariaLabel || 'Sprache auswählen'}
            </label>
            <select
              id="language-select"
              value={currentLocale}
              onChange={(e) => handleLocaleChange(e.target.value as Locale)}
              disabled={disabled}
              aria-label={ariaLabel || 'Sprache auswählen'}
              aria-labelledby={ariaLabelledby}
              aria-describedby={
                ariaDescribedby || (description ? 'language-switcher-description' : undefined)
              }
              aria-disabled={disabled}
              aria-busy={ariaBusy}
            >
              {availableLocales.map((locale) => (
                <option key={locale} value={locale}>
                  {showName && LOCALE_NAMES[locale]}
                  {showName && showCode && ' '}
                  {showCode && LOCALE_CODES[locale]}
                </option>
              ))}
            </select>
          </div>
        );

      case 'buttons':
        return (
          <div
            className={`language-switcher-buttons size-${size} ${disabled ? 'disabled' : ''}`}
            role="radiogroup"
            aria-label={ariaLabel || 'Sprache auswählen'}
            aria-labelledby={ariaLabelledby}
            aria-describedby={
              ariaDescribedby || (description ? 'language-switcher-description' : undefined)
            }
            aria-disabled={disabled}
            aria-busy={ariaBusy}
          >
            {availableLocales.map((locale, index) => (
              <button
                key={locale}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`language-button ${locale === currentLocale && highlightCurrent ? 'active' : ''}`}
                onClick={() => handleLocaleChange(locale)}
                disabled={disabled}
                role="radio"
                aria-checked={locale === currentLocale}
                aria-label={`${LOCALE_NAMES[locale]} ${locale === currentLocale ? '(ausgewählt)' : ''}`}
              >
                {showFlag && <span className={`flag flag-${locale}`} aria-hidden="true"></span>}
                {showName && <span className="language-name">{LOCALE_NAMES[locale]}</span>}
                {showCode && <span className="language-code">{LOCALE_CODES[locale]}</span>}
              </button>
            ))}
          </div>
        );

      case 'flags':
        return (
          <div
            className={`language-switcher-flags size-${size} ${disabled ? 'disabled' : ''}`}
            role="radiogroup"
            aria-label={ariaLabel || 'Sprache auswählen'}
            aria-labelledby={ariaLabelledby}
            aria-describedby={
              ariaDescribedby || (description ? 'language-switcher-description' : undefined)
            }
            aria-disabled={disabled}
            aria-busy={ariaBusy}
          >
            {availableLocales.map((locale, index) => (
              <button
                key={locale}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`language-flag ${locale === currentLocale && highlightCurrent ? 'active' : ''}`}
                onClick={() => handleLocaleChange(locale)}
                disabled={disabled}
                role="radio"
                aria-checked={locale === currentLocale}
                aria-label={LOCALE_NAMES[locale]}
              >
                <span className={`flag flag-${locale}`} aria-hidden="true"></span>
                {showName && <span className="sr-only">{LOCALE_NAMES[locale]}</span>}
              </button>
            ))}
          </div>
        );

      case 'minimal':
        return (
          <div
            ref={containerRef}
            className={`language-switcher-minimal size-${size} ${disabled ? 'disabled' : ''}`}
            tabIndex={disabled ? -1 : 0}
            onClick={toggleDropdown}
            onKeyDown={handleDropdownKeyDown}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            aria-controls="language-options-minimal"
            aria-label={ariaLabel || 'Sprache auswählen'}
            aria-labelledby={ariaLabelledby}
            aria-describedby={
              ariaDescribedby || (description ? 'language-switcher-description' : undefined)
            }
            aria-keyshortcuts={ariaKeyshortcuts}
            aria-busy={ariaBusy}
          >
            <div className="language-switcher-current">
              <span className="language-code">{LOCALE_CODES[currentLocale]}</span>
            </div>

            {isOpen && (
              <div
                ref={dropdownRef}
                id="language-options-minimal"
                className="language-switcher-options"
                role="listbox"
                aria-label={ariaLabel || 'Verfügbare Sprachen'}
              >
                {availableLocales.map((locale, index) => (
                  <button
                    key={locale}
                    ref={(el) => (buttonRefs.current[index] = el)}
                    className={`language-option ${locale === currentLocale && highlightCurrent ? 'active' : ''}`}
                    onClick={() => handleLocaleChange(locale)}
                    onKeyDown={(e) => handleButtonKeyDown(e, locale, index)}
                    role="option"
                    aria-selected={locale === currentLocale}
                    tabIndex={-1}
                  >
                    <span className="language-code">{LOCALE_CODES[locale]}</span>
                    <span className="sr-only">{LOCALE_NAMES[locale]}</span>
                  </button>
                ))}
              </div>
            )}
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
      {renderDescription()}
      {renderLiveRegion()}
      {renderSwitcher()}
    </div>
  );
};

export default LanguageSwitcherA11y;
