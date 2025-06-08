import React, { useId, forwardRef } from 'react';
import { ColorPicker, ColorPickerProps } from './ColorPicker';

/**
 * Erweiterte Barrierefreiheits-Props für den ColorPicker
 */
export interface A11yColorPickerProps extends ColorPickerProps {
  /**
   * Beschreibender Text für den ColorPicker (wird als aria-label verwendet)
   * Besonders wichtig für Screenreader
   */
  accessibleLabel?: string;

  /**
   * Zusätzliche Beschreibung für Screenreader
   * Wird als aria-describedby verwendet
   */
  accessibleDescription?: string;

  /**
   * Ob der ColorPicker eine Live-Region aktualisiert
   * Setzt aria-live
   */
  live?: 'off' | 'polite' | 'assertive';

  /**
   * Ob Änderungen in der Live-Region atomar sind
   * Setzt aria-atomic
   */
  atomic?: boolean;

  /**
   * Ob der ColorPicker relevant ist
   * Setzt aria-relevant
   */
  relevant?: 'additions' | 'removals' | 'text' | 'all';

  /**
   * Benutzerdefinierte Texte für Screenreader
   */
  a11yTexts?: {
    /** Text für den Dialog-Titel */
    dialogTitle?: string;
    /** Text für den Farbwähler */
    colorInputLabel?: string;
    /** Text für den Transparenz-Slider */
    alphaSliderLabel?: string;
    /** Text für die Voreingestellten Farben */
    presetColorsLabel?: string;
    /** Text für den Schließen-Button */
    closeButtonLabel?: string;
    /** Text für die aktuelle Farbe */
    currentColorLabel?: string;
    /** Text für den Farbwert */
    colorValueLabel?: string;
    /** Text für den Fehler */
    errorLabel?: string;
    /** Text für das Erforderlich-Label */
    requiredLabel?: string;
  };

  /**
   * Test-ID für automatisierte Tests
   */
  testId?: string;
}

/**
 * ColorPicker-Komponente mit verbesserten Barrierefreiheits-Funktionen
 *
 * Diese Komponente erweitert die Standard-ColorPicker-Komponente um zusätzliche
 * Barrierefreiheits-Funktionen wie verbesserte ARIA-Attribute und anpassbare
 * Screenreader-Texte.
 *
 * @example
 * ```tsx
 * <ColorPicker.A11y
 *   label="Wähle eine Farbe"
 *   accessibleLabel="Farbauswahl für den Hintergrund"
 *   accessibleDescription="Klicken Sie, um den Farbwähler zu öffnen"
 *   value="#ff0000"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
export const A11yColorPicker = forwardRef<HTMLInputElement, A11yColorPickerProps>((props, ref) => {
  const {
    accessibleLabel,
    accessibleDescription,
    live,
    atomic,
    relevant,
    a11yTexts = {},
    testId,
    ...rest
  } = props;

  // Generiere eindeutige IDs für Komponenten
  const uniqueId = useId();
  const descriptionId = `${uniqueId}-a11y-description`;

  // Standard-Texte für Screenreader
  const defaultA11yTexts = {
    dialogTitle: 'Farbwähler',
    colorInputLabel: 'Farbe',
    alphaSliderLabel: 'Transparenz',
    presetColorsLabel: 'Voreingestellte Farben',
    closeButtonLabel: 'Schließen',
    currentColorLabel: 'Aktuelle Farbe',
    colorValueLabel: 'Farbwert',
    errorLabel: 'Fehler',
    requiredLabel: 'Erforderlich',
  };

  // Kombiniere Standard-Texte mit benutzerdefinierten Texten
  const mergedA11yTexts = { ...defaultA11yTexts, ...a11yTexts };

  return (
    <>
      <ColorPicker
        ref={ref}
        aria-label={accessibleLabel}
        ariaLabel={accessibleLabel}
        ariaDescription={accessibleDescription}
        aria-describedby={accessibleDescription ? descriptionId : undefined}
        aria-live={live}
        aria-atomic={atomic ? 'true' : undefined}
        aria-relevant={relevant}
        data-testid={testId || 'a11y-color-picker'}
        {...rest}
      />

      {/* Versteckte Beschreibung für bessere Screenreader-Unterstützung */}
      {accessibleDescription && (
        <span id={descriptionId} className="sr-only">
          {accessibleDescription}
        </span>
      )}
    </>
  );
});

A11yColorPicker.displayName = 'ColorPicker.A11y';

export default A11yColorPicker;
