// packages/@smolitux/core/src/components/ColorPicker/ColorPicker.tsx
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useFormControl } from '../FormControl/FormControl';

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Aktueller Farbwert im HEX-Format (#RRGGBB) */
  value?: string;
  /** Standard-Farbwert, wenn kein Wert gesetzt ist */
  defaultValue?: string;
  /** Callback bei Farbänderungen */
  onChange?: (color: string, format: ColorFormat) => void;
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Format des Farbwerts in der Ausgabe */
  format?: ColorFormat;
  /** Vorausgewählte Farben anzeigen */
  presetColors?: string[];
  /** Alpha-Kanal (Transparenz) erlauben */
  allowAlpha?: boolean;
  /** Größe des ColorPickers */
  size?: 'sm' | 'md' | 'lg';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Popup-Position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Farbfeld anzeigen */
  showColorField?: boolean;
  /** RGB-Slider anzeigen */
  showRgbSliders?: boolean;
  /** Hex-Input anzeigen */
  showHexInput?: boolean;
  /** Vorschau anzeigen */
  showPreview?: boolean;
}

/**
 * ColorPicker-Komponente für Farbauswahl
 * 
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Hintergrundfarbe"
 *   value="#3B82F6"
 *   onChange={(color) => console.log(color)}
 *   showPreview
 * />
 * ```
 */
export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(({
  value,
  defaultValue = '#3B82F6',
  onChange,
  label,
  helperText,
  error,
  format = 'hex',
  presetColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'],
  allowAlpha = false,
  size = 'md',
  fullWidth = false,
  position = 'bottom',
  showColorField = true,
  showRgbSliders = true,
  showHexInput = true,
  showPreview = true,
  className = '',
  ...rest
}, ref) => {
  // Aus dem FormControl-Context importierte Werte
  const formControl = useFormControl();
  
  // Lokaler State für Farbwert
  const [color, setColor] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHsv] = useState<{h: number, s: number, v: number}>(() => hexToHsv(value || defaultValue));
  const [rgbValues, setRgbValues] = useState<{r: number, g: number, b: number}>(() => hexToRgb(value || defaultValue));
  const [selectedPoint, setSelectedPoint] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [alpha, setAlpha] = useState(1);
  
  // Refs
  const colorFieldRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Kombinierte Props aus eigenem und FormControl
  const combinedProps = {
    id: rest.id || formControl.id,
    disabled: rest.disabled || formControl.disabled,
    required: rest.required || formControl.required,
    'aria-invalid': error ? true : formControl.hasError || undefined,
    'aria-describedby': error || formControl.hasError 
      ? `${formControl.id}-error` 
      : helperText 
        ? `${formControl.id}-helper` 
        : undefined,
  };
  
  // Farbe aktualisieren, wenn sich der Wert von außen ändert
  useEffect(() => {
    if (value) {
      setColor(value);
      setHsv(hexToHsv(value));
      setRgbValues(hexToRgb(value));
    }
  }, [value]);
  
  // Farbe im gewünschten Format ausgeben
  const getOutputColor = (inputColor: string): string => {
    if (format === 'hex') {
      return inputColor;
    } else if (format === 'rgb') {
      const rgb = hexToRgb(inputColor);
      return allowAlpha
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (format === 'hsl') {
      const hslValues = rgbToHsl(hexToRgb(inputColor));
      return allowAlpha
        ? `hsla(${Math.round(hslValues.h)}, ${Math.round(hslValues.s)}%, ${Math.round(hslValues.l)}%, ${alpha})`
        : `hsl(${Math.round(hslValues.h)}, ${Math.round(hslValues.s)}%, ${Math.round(hslValues.l)}%)`;
    }
    
    return inputColor;
  };
  
  // Klick außerhalb schließt das Popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen && 
        popoverRef.current && 
        triggerRef.current && 
        !popoverRef.current.contains(e.target as Node) && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  // ESC-Taste schließt das Popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  // Farbe ändern und Callback aufrufen
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHsv(hexToHsv(newColor));
    setRgbValues(hexToRgb(newColor));
    
    if (onChange) {
      onChange(getOutputColor(newColor), format);
    }
  };
  
  // RGB-Slider ändern
  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbValues, [component]: value };
    setRgbValues(newRgb);
    
    const newColor = rgbToHex(newRgb);
    setColor(newColor);
    setHsv(hexToHsv(newColor));
    
    if (onChange) {
      onChange(getOutputColor(newColor), format);
    }
  };
  
  // Alpha-Wert ändern
  const handleAlphaChange = (value: number) => {
    setAlpha(value);
    
    if (onChange) {
      onChange(getOutputColor(color), format);
    }
  };
  
  // Hex-Wert direkt ändern
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
    
    // Prüfen, ob es eine gültige Hex-Farbe ist
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(newColor)) {
      handleColorChange(newColor);
    }
  };
  
  // Farbfeld-Klick
  const handleColorFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorFieldRef.current) {
      const rect = colorFieldRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      setSelectedPoint({ x, y });
      
      // HSV-Farbe berechnen und aktualisieren
      const newHsv = { 
        ...hsv, 
        s: x * 100, 
        v: 100 - y * 100 
      };
      
      setHsv(newHsv);
      
      const newRgb = hsvToRgb(newHsv);
      setRgbValues(newRgb);
      
      const newColor = rgbToHex(newRgb);
      setColor(newColor);
      
      if (onChange) {
        onChange(getOutputColor(newColor), format);
      }
    }
  };
  
  // Farbton (Hue) ändern
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    const newHsv = { ...hsv, h: hue };
    
    setHsv(newHsv);
    
    const newRgb = hsvToRgb(newHsv);
    setRgbValues(newRgb);
    
    const newColor = rgbToHex(newRgb);
    setColor(newColor);
    
    if (onChange) {
      onChange(getOutputColor(newColor), format);
    }
  };
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };
  
  // Popover-Position
  const getPopoverPosition = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      case 'bottom':
      default:
        return 'top-full mt-2';
    }
  };
  
  // Hilfsfunktionen für Farb-Konvertierungen
  function hexToRgb(hex: string): {r: number, g: number, b: number} {
    // Default fallback wenn invalid
    if (!hex || !/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      return { r: 0, g: 0, b: 0 };
    }
    
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  }
  
  function rgbToHex(rgb: {r: number, g: number, b: number}): string {
    const toHex = (value: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(value))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }
  
  function hexToHsv(hex: string): {h: number, s: number, v: number} {
    const rgb = hexToRgb(hex);
    return rgbToHsv(rgb);
  }
  
  function rgbToHsv(rgb: {r: number, g: number, b: number}): {h: number, s: number, v: number} {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    
    if (max !== min) {
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
      v: Math.round(v * 100)
    };
  }
  
  function hsvToRgb(hsv: {h: number, s: number, v: number}): {r: number, g: number, b: number} {
    const h = hsv.h / 360;
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    
    let r = 0, g = 0, b = 0;
    
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    
    switch (i % 6) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
  
  function rgbToHsl(rgb: {r: number, g: number, b: number}): {h: number, s: number, l: number} {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
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
      h: h * 360,
      s: s * 100,
      l: l * 100
    };
  }
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} relative`}>
      {/* Label (falls außerhalb eines FormControl) */}
      {label && !formControl.label && (
        <label 
          htmlFor={combinedProps.id} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {combinedProps.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Farbvorschau und Trigger */}
      <div
        ref={triggerRef}
        className={`
          inline-flex items-center border border-gray-300 dark:border-gray-600 rounded-md 
          bg-white dark:bg-gray-700 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500
          ${fullWidth ? 'w-full' : ''} ${className}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${sizeClasses[size]} rounded-l-md inline-block mr-1 flex-shrink-0`}
          style={{ backgroundColor: color }}
        />
        
        <div className="px-2 py-1 flex-grow">
          <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
            {color}
          </span>
        </div>
        
        {/* Verstecktes Input-Feld für Formular-Integration */}
        <input
          ref={ref}
          type="text"
          value={color}
          onChange={handleHexChange}
          className="sr-only"
          {...combinedProps}
          {...rest}
        />
        
        {/* Pfeil-Icon */}
        <div className="px-2">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </div>
      </div>
      
      {/* Hilfetexzt oder Fehlermeldung (falls außerhalb eines FormControl) */}
      {((helperText && !formControl.hasError) || (error && !formControl.hasError)) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
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
          {/* Farbfeld */}
          {showColorField && (
            <div className="mb-4">
              <div
                ref={colorFieldRef}
                className="relative w-full h-40 rounded-md cursor-crosshair"
                style={{
                  backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                  backgroundImage: 'linear-gradient(to right, #fff 0%, transparent 100%), linear-gradient(to top, #000 0%, transparent 100%)'
                }}
                onClick={handleColorFieldClick}
              >
                {/* Farbwähler-Punkt */}
                <div
                  className="absolute h-4 w-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-md"
                  style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Farbton-Slider (Hue) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Farbton
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="360"
                value={hsv.h}
                onChange={handleHueChange}
                className="w-full h-4 rounded cursor-pointer appearance-none"
                style={{
                  background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                }}
              />
            </div>
          </div>
          
          {/* RGB-Sliders */}
          {showRgbSliders && (
            <div className="mb-4 space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  R
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.r}
                    onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                    className="flex-grow h-2 rounded cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(0, ${rgbValues.g}, ${rgbValues.b}) 0%, rgb(255, ${rgbValues.g}, ${rgbValues.b}) 100%)`
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 w-9 text-right">
                    {rgbValues.r}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  G
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.g}
                    onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                    className="flex-grow h-2 rounded cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(${rgbValues.r}, 0, ${rgbValues.b}) 0%, rgb(${rgbValues.r}, 255, ${rgbValues.b}) 100%)`
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 w-9 text-right">
                    {rgbValues.g}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  B
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.b}
                    onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                    className="flex-grow h-2 rounded cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(${rgbValues.r}, ${rgbValues.g}, 0) 0%, rgb(${rgbValues.r}, ${rgbValues.g}, 255) 100%)`
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 w-9 text-right">
                    {rgbValues.b}
                  </span>
                </div>
              </div>
              
              {/* Alpha-Slider (wenn erlaubt) */}
              {allowAlpha && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Alpha
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="flex-grow h-2 rounded relative"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, #ccc 25%, transparent 25%),
                          linear-gradient(-45deg, #ccc 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #ccc 75%),
                          linear-gradient(-45deg, transparent 75%, #ccc 75%)
                        `,
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                      }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={alpha}
                        onChange={(e) => handleAlphaChange(parseFloat(e.target.value))}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div 
                        className="absolute inset-0 h-full rounded"
                        style={{
                          background: `linear-gradient(to right, rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 0) 0%, rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, 1) 100%)`,
                          width: `${alpha * 100}%`
                        }}
                      />
                    </div>
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 w-9 text-right">
                      {Math.round(alpha * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Hex-Input */}
          {showHexInput && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hex
              </label>
              <input
                type="text"
                value={color}
                onChange={handleHexChange}
                className="w-full px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}
          
          {/* Farbvorschau */}
          {showPreview && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vorschau
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format.toUpperCase()}
                </div>
              </div>
              <div className="mt-1 flex">
                <div 
                  className="w-full h-10 rounded-md"
                  style={{
                    backgroundImage: allowAlpha ? `
                      linear-gradient(45deg, #ccc 25%, transparent 25%),
                      linear-gradient(-45deg, #ccc 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #ccc 75%),
                      linear-gradient(-45deg, transparent 75%, #ccc 75%)
                    ` : 'none',
                    backgroundSize: '8px 8px',
                    backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                  }}
                >
                  <div 
                    className="w-full h-full rounded-md"
                    style={{ 
                      backgroundColor: allowAlpha 
                        ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})` 
                        : color 
                    }}
                  />
                </div>
              </div>
            </div>
          )}
