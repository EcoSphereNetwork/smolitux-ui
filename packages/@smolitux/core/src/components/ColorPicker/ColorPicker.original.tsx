// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

export interface ColorPickerProps {
  /** Aktueller Farbwert (hex, rgb, rgba) */
  value?: string;
  /** Callback bei Farbänderung */
  onChange?: (color: string) => void;
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
}

const ColorPicker: React.FC<ColorPickerProps> = ({
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
}) => {
  // Generiere eindeutige IDs für Komponenten
  const uniqueId = useMemo(
    () => id || `color-picker-${Math.random().toString(36).substring(2, 11)}`,
    [id]
  );
  const colorInputId = `${uniqueId}-color-input`;
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

  // Refs für DOM-Elemente
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

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
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    setRgbValues(hexToRgb(color));
  }, [color]);

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
    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    }
  }, [disabled, isOpen, onOpenChange]);

  // Funktion zum Aktualisieren der Farbe
  const updateColor = useCallback(
    (newColor: string) => {
      setColor(newColor);
      onChange?.(
        allowAlpha ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` : newColor
      );
    },
    [allowAlpha, alpha, onChange, rgbValues]
  );

  // Funktion zum Aktualisieren des Alpha-Werts
  const updateAlpha = useCallback(
    (newAlpha: number) => {
      setAlpha(newAlpha);
      onChange?.(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${newAlpha})`);
    },
    [onChange, rgbValues]
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

  // Berechne den aktuellen Farbwert als Text
  const colorValueText = useMemo(() => {
    return allowAlpha ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` : color;
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

  return (
    <div
      ref={containerRef}
      className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={uniqueId}
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

      {/* Farbauswahl-Trigger */}
      <button
        ref={triggerRef}
        id={uniqueId}
        type="button"
        name={name}
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
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          focus:outline-none focus:ring-2 focus:ring-primary-500
        `}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={
          [
            ariaDescription ? descriptionId : null,
            error ? errorId : null,
            helperText && !error ? helperId : null,
          ]
            .filter(Boolean)
            .join(' ') || undefined
        }
        aria-invalid={error ? 'true' : undefined}
        aria-required={required ? 'true' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        disabled={disabled}
      >
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 mr-2"
            style={{
              backgroundColor: colorValueText,
            }}
            aria-hidden="true"
          />
          {showAsButton && (
            <span className="text-gray-700 dark:text-gray-300">{colorValueText}</span>
          )}
          <span className="sr-only">
            Aktuelle Farbe: {colorValueText}. Drücken Sie Enter, um den Farbwähler zu öffnen.
          </span>
        </div>
      </button>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
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
              value={color}
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
              />
            </div>
          )}

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
                        className="w-8 h-8 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-center"
                        style={{
                          backgroundColor: presetColor,
                          color: contrastColor,
                        }}
                        aria-label={`Farbe ${presetColor} auswählen`}
                        tabIndex={0}
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
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Farbwähler schließen"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
