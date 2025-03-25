import React, { useState, useRef, useEffect } from 'react';

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
}) => {
  // Zustand für den Farbwert
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
  const [alpha, setAlpha] = useState(1);
  
  // Refs für DOM-Elemente
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
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
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    setRgbValues(hexToRgb(color));
  }, [color]);
  
  // Funktion zum Umschalten des Pickers
  const togglePicker = () => {
    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    }
  };
  
  // Funktion zum Aktualisieren der Farbe
  const updateColor = (newColor: string) => {
    setColor(newColor);
    onChange?.(allowAlpha ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` : newColor);
  };
  
  // Funktion zum Aktualisieren des Alpha-Werts
  const updateAlpha = (newAlpha: number) => {
    setAlpha(newAlpha);
    onChange?.(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${newAlpha})`);
  };
  
  // Funktion zum Berechnen der Popup-Position
  const getPopoverPosition = () => {
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
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Farbauswahl-Trigger */}
      <div
        onClick={togglePicker}
        className={`
          ${showAsButton ? 'px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 flex items-center' : ''}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${error ? 'border-red-500 dark:border-red-500' : ''}
        `}
      >
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 mr-2"
            style={{ 
              backgroundColor: allowAlpha 
                ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` 
                : color 
            }}
          />
          {showAsButton && (
            <span className="text-gray-700 dark:text-gray-300">
              {allowAlpha 
                ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` 
                : color}
            </span>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      
      {/* Color Picker Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`
            absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 
            dark:border-gray-700 p-4 w-64 ${getPopoverPosition()}
          `}
        >
          {/* Farbauswahl */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Farbe
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(e.target.value)}
              className="w-full h-10 p-0 border-0 rounded-md cursor-pointer"
            />
          </div>
          
          {/* Alpha-Regler */}
          {allowAlpha && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transparenz: {Math.round(alpha * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => updateAlpha(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}
          
          {/* Voreingestellte Farben */}
          {presetColors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Voreingestellte Farben
              </label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map((presetColor, index) => (
                  <div
                    key={index}
                    onClick={() => updateColor(presetColor)}
                    className="w-6 h-6 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: presetColor }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;