import { Theme, ThemeMode } from './types';

/**
 * Berechnet eine Farbe basierend auf dem aktuellen Theme
 */
export function getColorByTheme(
  theme: Theme,
  colorName: keyof Theme['colors'], 
  shade: keyof Theme['colors']['primary'],
  themeMode: ThemeMode
): string {
  const colorScale = theme.colors[colorName];
  if (!colorScale || typeof colorScale === 'string') {
    console.warn(`Color ${String(colorName)} not found in theme or is not a color scale`);
    return '';
  }
  
  return colorScale[shade];
}

/**
 * Funktion zum Ermitteln der Textfarbe für besten Kontrast
 */
export function getContrastColor(backgroundColor: string): string {
  // Einfache Implementierung - in der Praxis komplexer
  function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  const rgb = hexToRgb(backgroundColor);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

/**
 * Ermittelt eine Medien-Query für einen Breakpoint
 */
export function getBreakpointMediaQuery(theme: Theme, breakpoint: keyof Theme['breakpoints'], comparison: 'min' | 'max' = 'min'): string {
  const value = theme.breakpoints[breakpoint];
  const unit = 'px';
  
  if (comparison === 'min') {
    return `@media (min-width: ${value}${unit})`;
  } else {
    return `@media (max-width: ${value - 0.1}${unit})`;
  }
}

/**
 * Erzeugt einen CSS-Shadow-String basierend auf dem Theme
 */
export function getShadow(theme: Theme, size: keyof Theme['shadows']): string {
  return theme.shadows[size];
}

/**
 * Hilfsfunktion zum Abrufen eines bestimmten Spacing-Wertes
 */
export function getSpacing(theme: Theme, size: keyof Theme['spacing'] | number): string {
  if (typeof size === 'number') {
    // Wenn size eine Zahl ist, multipliziere den Basis-Spacing-Wert (rem)
    const baseSpacing = parseFloat(theme.spacing[4].replace('rem', ''));
    return `${baseSpacing * size}rem`;
  }
  
  // Wenn size ein Schlüssel ist, gib den entsprechenden Wert zurück
  return theme.spacing[size];
}

/**
 * Hilfsfunktion zum Abrufen einer Schriftgröße
 */
export function getFontSize(theme: Theme, size: keyof Theme['typography']['fontSize']): string {
  return theme.typography.fontSize[size];
}

/**
 * Generiert ein CSS-Objekt für responsives Design
 */
export function responsive<T>(theme: Theme, styles: Record<keyof Theme['breakpoints'], T>): Record<string, T> {
  const result: Record<string, T> = {};
  
  // Styles für alle Breakpoints hinzufügen
  Object.entries(styles).forEach(([breakpoint, style]) => {
    const mediaQuery = getBreakpointMediaQuery(theme, breakpoint as keyof Theme['breakpoints']);
    result[mediaQuery] = style;
  });
  
  return result;
}
