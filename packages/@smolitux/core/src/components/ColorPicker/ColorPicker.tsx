import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef } from 'react';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, unknown> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl';
export type ColorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Aktueller Farbwert (hex, rgb, rgba) */
  value?: string;
  /** Callback bei Farbänderung */
  onChange?: (color: string, format?: ColorFormat) => void;
  /** Ob Alpha-Kanal (Transparenz) erlaubt ist */
  allowAlpha?: boolean;
  /** Ob der Picker deaktiviert ist */
  disabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Platzierung des Popups */
  popupPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Ob der Picker als Button angezeigt werden soll */
  showAsButton?: boolean;
  /** Ob der Picker initial geöffnet sein soll */
  defaultOpen?: boolean;
  /** Ob der Picker kontrolliert geöffnet/geschlossen wird */
  isOpen?: boolean;
  /** Callback beim Öffnen/Schließen */
  onOpenChange?: (isOpen: boolean) => void;
  /** Voreingestellte Farben */
  presetColors?: string[];
  /** Label für den Picker */
  label?: string;
  /** Hilfetexte */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Ob der Picker erforderlich ist */
  required?: boolean;
  /** ID für das Formular-Element */
  id?: string;
  /** Name für das Formular-Element */
  name?: string;
  /** ARIA-Label für den ColorPicker */
  ariaLabel?: string;
  /** ARIA-Beschreibung für den ColorPicker */
  ariaDescription?: string;
  /** Farbformat (hex, rgb, hsl) */
  format?: ColorFormat;
  /** Größe des Pickers */
  size?: ColorSize;
  /** Ob der Picker die volle Breite einnehmen soll */
  fullWidth?: boolean;
  /** Ob der Picker schreibgeschützt ist */
  readOnly?: boolean;
  /** Platzhaltertext für das Eingabefeld */
  placeholder?: string;
}

/**
 * ColorPicker-Komponente für die Auswahl von Farben
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Wähle eine Farbe"
 *   value="#ff0000"
 *   onChange={(color) => console.log(color)}
 *   allowAlpha={true}
 *   format="hex"
 * />
 * ```
 */
export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>((props, forwardedRef) => {
  const {
    value = '#000000',
    onChange,
    allowAlpha = false,
    disabled = false,
    className = '',
    popupPosition = 'bottom',
    showAsButton = false,
    defaultOpen = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    presetColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    label,
    helperText,
    error,
    required = false,
    id,
    name,
    ariaLabel,
    ariaDescription,
    format = 'hex',
    size = 'md',
    fullWidth = false,
    readOnly = false,
    placeholder = 'Farbwert eingeben',
    ...rest
  } = props;
  // Theme-Werte
  const { themeMode, colors } = useTheme();

  // Generiere eindeutige IDs für Komponenten
  const uniqueId = useMemo(
    () => id || `color-picker-${Math.random().toString(36).substring(2, 11)}`,
    [id]
  );
  const colorInputId = `${uniqueId}-color-input`;
  const textInputId = `${uniqueId}-text-input`;
  const alphaInputId = `${uniqueId}-alpha-input`;
  const labelId = `${uniqueId}-label`;
  const descriptionId = `${uniqueId}-description`;
  const errorId = `${uniqueId}-error`;
  const helperId = `${uniqueId}-helper`;
  const presetColorsId = `${uniqueId}-presets`;

  // Zustand für den Farbwert
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
  const [alpha, setAlpha] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  // Refs für DOM-Elemente
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Effekt für kontrolliertes Öffnen/Schließen
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Effekt für Außerhalb-Klick
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Effekt für Hex-zu-RGB-Konvertierung
  useEffect(() => {
    const hexToRgb = (hex: string) => {
      // Entferne # wenn vorhanden
      hex = hex.replace(/^#/, '');

      // Konvertiere 3-stelligen Hex zu 6-stelligem
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      // Konvertiere zu RGB
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return { r, g, b };
    };

    try {
      if (color.startsWith('#')) {
        setRgbValues(hexToRgb(color));
      } else if (color.startsWith('rgb')) {
        // Extrahiere RGB-Werte aus rgb(r, g, b) oder rgba(r, g, b, a)
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
        if (match) {
          setRgbValues({
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
          });
          if (match[4]) {
            setAlpha(parseFloat(match[4]));
          }
        }
      }

      // Aktualisiere das Eingabefeld basierend auf dem Format
      updateInputValue();
    } catch (e) {
      console.error('Fehler bei der Farbkonvertierung:', e);
    }
  }, [color, format]);

  // Effekt für Fokus-Management
  useEffect(() => {
    if (isOpen && colorInputRef.current) {
      // Fokus auf das Farbeingabefeld setzen, wenn der Picker geöffnet wird
      colorInputRef.current.focus();
    }
  }, [isOpen]);

  // Effekt für Tastatur-Navigation (ESC zum Schließen)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        onOpenChange?.(false);
        // Fokus zurück auf den Trigger setzen
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  // Funktion zum Umschalten des Pickers
  const togglePicker = useCallback(() => {
    if (!disabled && !readOnly) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    }
  }, [disabled, isOpen, onOpenChange, readOnly]);

  // Funktion zum Aktualisieren der Farbe
  const updateColor = useCallback(
    (newColor: string) => {
      setColor(newColor);
      updateInputValue(newColor);

      if (onChange) {
        if (allowAlpha && alpha < 1) {
          onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`, 'rgb');
        } else {
          onChange(newColor, format);
        }
      }
    },
    [allowAlpha, alpha, format, onChange, rgbValues]
  );

  // Funktion zum Aktualisieren des Alpha-Werts
  const updateAlpha = useCallback(
    (newAlpha: number) => {
      setAlpha(newAlpha);

      if (onChange) {
        onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${newAlpha})`, 'rgb');
      }

      // Aktualisiere auch das Eingabefeld
      updateInputValue(color, newAlpha);
    },
    [color, onChange, rgbValues]
  );

  // Funktion zum Berechnen der Popup-Position
  const getPopoverPosition = useCallback(() => {
    switch (popupPosition) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'top-full mt-2';
    }
  }, [popupPosition]);

  // Funktion für Tastatur-Handling der Preset-Farben
  const handlePresetKeyDown = useCallback(
    (e: React.KeyboardEvent, presetColor: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateColor(presetColor);
      }
    },
    [updateColor]
  );

  // Funktion zum Konvertieren von RGB zu Hex
  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }, []);

  // Funktion zum Konvertieren von RGB zu HSL
  const rgbToHsl = useCallback((r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, []);

  // Funktion zum Aktualisieren des Eingabefelds basierend auf dem Format
  const updateInputValue = useCallback(
    (newColor?: string, newAlpha?: number, formatOverride: ColorFormat = format) => {
      const colorToUse = newColor || color;
      const alphaToUse = newAlpha !== undefined ? newAlpha : alpha;

      try {
        switch (formatOverride) {
          case 'hex':
            if (colorToUse.startsWith('#')) {
              setInputValue(colorToUse);
            } else if (colorToUse.startsWith('rgb')) {
              // Konvertiere RGB zu Hex
              const match = colorToUse.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
              if (match) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);
                setInputValue(rgbToHex(r, g, b));
              }
            }
            break;
          case 'rgb':
            if (colorToUse.startsWith('#')) {
              // Konvertiere Hex zu RGB
              const rgb = rgbValues;
              setInputValue(
                allowAlpha && alphaToUse < 1
                  ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaToUse})`
                  : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
              );
            } else if (colorToUse.startsWith('rgb')) {
              setInputValue(colorToUse);
            }
            break;
          case 'hsl':
            if (colorToUse.startsWith('#')) {
              // Konvertiere Hex zu HSL
              const rgb = rgbValues;
              const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
              setInputValue(
                allowAlpha && alphaToUse < 1
                  ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alphaToUse})`
                  : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
              );
            } else if (colorToUse.startsWith('rgb')) {
              // Konvertiere RGB zu HSL
              const match = colorToUse.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
              if (match) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);
                const hsl = rgbToHsl(r, g, b);
                setInputValue(
                  allowAlpha && alphaToUse < 1
                    ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alphaToUse})`
                    : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
                );
              }
            }
            break;
        }
      } catch (e) {
        console.error('Fehler bei der Formatkonvertierung:', e);
      }
    },
    [allowAlpha, alpha, color, format, rgbToHex, rgbToHsl, rgbValues]
  );

  // Funktion zum Validieren der Farbeingabe
  const validateColorInput = useCallback((input: string) => {
    // Hex-Validierung
    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
    // RGB-Validierung
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    // RGBA-Validierung
    const rgbaRegex =
      /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/;
    // HSL-Validierung
    const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    // HSLA-Validierung
    const hslaRegex =
      /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/;

    if (
      hexRegex.test(input) ||
      rgbRegex.test(input) ||
      rgbaRegex.test(input) ||
      hslRegex.test(input) ||
      hslaRegex.test(input)
    ) {
      return true;
    }

    return false;
  }, []);

  // Handler für Änderungen im Texteingabefeld
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setInputError(null);
  }, []);

  // Handler für Blur-Event des Texteingabefelds
  const handleInputBlur = useCallback(() => {
    if (inputValue.trim() === '') {
      // Wenn das Feld leer ist, setze auf den aktuellen Wert zurück
      updateInputValue();
      return;
    }

    if (validateColorInput(inputValue)) {
      // Gültiger Farbwert
      setInputError(null);
      updateColor(inputValue);
    } else {
      // Ungültiger Farbwert
      setInputError('Invalid color format');
      // Setze auf den aktuellen Wert zurück
      updateInputValue();
    }
  }, [inputValue, updateColor, updateInputValue, validateColorInput]);

  // Berechne den aktuellen Farbwert als Text
  const colorValueText = useMemo(() => {
    return allowAlpha && alpha < 1
      ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`
      : color;
  }, [allowAlpha, alpha, color, rgbValues]);

  // Berechne den Kontrast für die Textfarbe
  const getContrastColor = useCallback((hexColor: string) => {
    // Konvertiere Hex zu RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Berechne Helligkeit (YIQ-Formel)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Verwende weiß oder schwarz basierend auf der Helligkeit
    return yiq >= 128 ? '#000000' : '#ffffff';
  }, []);

  // Größen-Klassen für das Eingabefeld
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'h-6 text-xs';
      case 'sm':
        return 'h-8 text-sm';
      case 'md':
        return 'h-10 text-base';
      case 'lg':
        return 'h-12 text-lg';
      case 'xl':
        return 'h-14 text-xl';
      default:
        return 'h-10 text-base';
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
      data-testid="color-picker-container"
      {...rest}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={textInputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}{' '}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only">(Erforderlich)</span>}
        </label>
      )}

      <div className="flex items-center">
        {/* Farbvorschau und Trigger */}
        <button
          ref={triggerRef}
          id={uniqueId}
          type="button"
          onClick={togglePicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              togglePicker();
            }
          }}
          className={`
            ${showAsButton ? 'px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 flex items-center' : ''}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${error || inputError ? 'border-red-500 dark:border-red-500' : ''}
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500
          `}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={
            [
              ariaDescription ? descriptionId : null,
              error || inputError ? errorId : null,
              helperText && !error && !inputError ? helperId : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error || inputError ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
          disabled={disabled}
        >
          <div
            className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 mr-2"
            style={{
              backgroundColor: colorValueText,
            }}
            aria-hidden="true"
            data-testid="color-preview"
          />
          {showAsButton && (
            <span className="text-gray-700 dark:text-gray-300">{colorValueText}</span>
          )}
          <span className="sr-only">
            Aktuelle Farbe: {colorValueText}. Drücken Sie Enter, um den Farbwähler zu öffnen.
          </span>
        </button>

        {/* Texteingabefeld für Farbwert */}
        <input
          ref={forwardedRef}
          id={textInputId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onClick={!readOnly && !disabled ? togglePicker : undefined}
          className={`
            ml-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md 
            ${sizeClasses}
            ${error || inputError ? 'border-red-500 dark:border-red-500' : ''}
            ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}
            ${readOnly ? 'bg-gray-50 dark:bg-gray-900 cursor-default' : ''}
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500
            ${fullWidth ? 'flex-grow' : 'w-40'}
          `}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error || inputError ? 'true' : undefined}
          aria-describedby={
            [
              ariaDescription ? descriptionId : null,
              error || inputError ? errorId : null,
              helperText && !error && !inputError ? helperId : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          name={name}
        />
      </div>

      {(error || inputError) && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error || (inputError && 'Invalid color format')}
        </p>
      )}

      {helperText && !error && !inputError && (
        <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}

      {ariaDescription && (
        <p id={descriptionId} className="sr-only">
          {ariaDescription}
        </p>
      )}

      {/* Color Picker Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`
            absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 
            dark:border-gray-700 p-4 w-64 ${getPopoverPosition()}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Farbwähler"
          data-testid="color-picker-popup"
        >
          {/* Farbauswahl */}
          <div className="mb-4">
            <label
              htmlFor={colorInputId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Farbe
            </label>
            <input
              ref={colorInputRef}
              id={colorInputId}
              type="color"
              value={
                color.startsWith('#') ? color : rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b)
              }
              onChange={(e) => updateColor(e.target.value)}
              className="w-full h-10 p-0 border-0 rounded-md cursor-pointer"
              aria-describedby={`${uniqueId}-color-description`}
            />
            <p id={`${uniqueId}-color-description`} className="sr-only">
              Verwenden Sie die Pfeiltasten, um die Farbe anzupassen, oder geben Sie einen
              Hex-Farbwert ein.
            </p>
          </div>

          {/* Alpha-Regler */}
          {allowAlpha && (
            <div className="mb-4">
              <label
                htmlFor={alphaInputId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Transparenz: {Math.round(alpha * 100)}%
              </label>
              <input
                id={alphaInputId}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => updateAlpha(parseFloat(e.target.value))}
                className="w-full"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={alpha}
                aria-valuetext={`${Math.round(alpha * 100)}% Transparenz`}
                data-testid="alpha-slider"
              />
            </div>
          )}

          {/* Format-Auswahl */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format
            </label>
            <div className="flex space-x-2">
              {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    const newFormat = fmt as ColorFormat;
                    updateInputValue(undefined, undefined, newFormat);
                    onChange?.(color, newFormat);
                  }}
                  className={`
                    px-3 py-1 rounded-md text-sm
                    ${
                      format === fmt
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500
                  `}
                  aria-pressed={format === fmt}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Voreingestellte Farben */}
          {presetColors.length > 0 && (
            <div>
              <div
                id={presetColorsId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Voreingestellte Farben
              </div>
              <div className="flex flex-wrap gap-2" role="grid" aria-labelledby={presetColorsId}>
                {presetColors.map((presetColor, index) => {
                  const contrastColor = getContrastColor(presetColor);
                  return (
                    <div key={index} role="gridcell">
                      <button
                        type="button"
                        onClick={() => updateColor(presetColor)}
                        onKeyDown={(e) => handlePresetKeyDown(e, presetColor)}
                        className="w-8 h-8 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 flex items-center justify-center"
                        style={{
                          backgroundColor: presetColor,
                          color: contrastColor,
                        }}
                        aria-label={`Farbe ${presetColor} auswählen`}
                        tabIndex={0}
                        data-testid="preset-color"
                      >
                        {color === presetColor && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Schließen-Button */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenChange?.(false);
                if (triggerRef.current) {
                  triggerRef.current.focus();
                }
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Farbwähler schließen"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
