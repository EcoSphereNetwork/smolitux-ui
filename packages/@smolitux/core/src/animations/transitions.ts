/**
 * Vordefinierte Übergänge für die Verwendung in Komponenten
 */

export type TransitionPreset = {
  duration: number;
  easing: string;
  delay?: number;
};

export type TransitionVariant = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export const transitions = {
  // Basis-Übergänge
  default: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Standard Material Design Easing
    delay: 0,
  },
  linear: {
    duration: 300,
    easing: 'linear',
    delay: 0,
  },
  
  // Geschwindigkeits-Varianten
  fast: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slow: {
    duration: 500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Easing-Varianten
  easeIn: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 1, 1)', // Material Design Ease In
  },
  easeOut: {
    duration: 300,
    easing: 'cubic-bezier(0, 0, 0.2, 1)', // Material Design Ease Out
  },
  easeInOut: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design Standard
  },
  
  // Spezielle Übergänge
  bounce: {
    duration: 500,
    easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },
  elastic: {
    duration: 600,
    easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  spring: {
    duration: 500,
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  // Verzögerte Übergänge
  delayed: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 150,
  },
  
  // Komponenten-spezifische Übergänge
  modal: {
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  drawer: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  tooltip: {
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  dropdown: {
    duration: 200,
    easing: 'cubic-bezier(0, 0, 0.2, 1)', // Ease Out für Dropdowns
  },
  collapse: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fade: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  scale: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slide: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type TransitionPresetName = keyof typeof transitions;

/**
 * Erstellt einen CSS-Transition-String aus einem Übergangs-Preset
 */
export const createTransition = (
  properties: string | string[] = 'all',
  preset: TransitionPresetName | TransitionPreset = 'default'
): string => {
  const config = typeof preset === 'string' ? transitions[preset] : preset;
  const { duration, easing } = config;
  const delay = (config as any).delay || 0;
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  
  return `${props} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ''}`;
};

/**
 * Erstellt einen CSS-Transition-String für mehrere Eigenschaften mit unterschiedlichen Presets
 */
export const createMultiTransition = (
  propertyPresets: Record<string, TransitionPresetName | TransitionPreset>
): string => {
  return Object.entries(propertyPresets)
    .map(([property, preset]) => createTransition(property, preset))
    .join(', ');
};

export default transitions;