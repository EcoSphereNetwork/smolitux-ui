import React, { useId } from 'react';
import { Dialog, DialogProps } from './Dialog';

/**
 * Erweiterte Barrierefreiheits-Props für den Dialog
 */
export interface A11yDialogProps extends DialogProps {
  /**
   * Beschreibender Text für den Dialog (wird als aria-label verwendet)
   * Besonders wichtig für Dialoge ohne sichtbaren Titel
   */
  accessibleLabel?: string;

  /**
   * Zusätzliche Beschreibung für Screenreader
   * Wird als aria-describedby verwendet
   */
  accessibleDescription?: string;

  /**
   * Ob der Dialog eine Live-Region aktualisiert
   * Setzt aria-live
   */
  live?: 'off' | 'polite' | 'assertive';

  /**
   * Ob Änderungen in der Live-Region atomar sind
   * Setzt aria-atomic
   */
  atomic?: boolean;

  /**
   * Ob der Dialog relevant ist
   * Setzt aria-relevant
   */
  relevant?: 'additions' | 'removals' | 'text' | 'all';

  /**
   * Benutzerdefinierte Texte für Screenreader
   */
  a11yTexts?: {
    /** Text für den Schließen-Button */
    closeButtonLabel?: string;
    /** Text für den Bestätigen-Button */
    confirmButtonLabel?: string;
    /** Text für den Abbrechen-Button */
    cancelButtonLabel?: string;
    /** Text für den Dialog-Titel */
    dialogTitleLabel?: string;
    /** Text für die Dialog-Beschreibung */
    dialogDescriptionLabel?: string;
  };

  /**
   * Test-ID für automatisierte Tests
   */
  testId?: string;

  /**
   * Ob der Dialog automatisch den Fokus auf das erste interaktive Element setzen soll
   */
  autoFocus?: boolean;

  /**
   * Ob der Dialog den Fokus einfangen soll (Fokus bleibt im Dialog)
   */
  trapFocus?: boolean;

  /**
   * Ob der Dialog eine Rolle als Formular-Dialog haben soll
   */
  isFormDialog?: boolean;

  /**
   * Ob der Dialog eine Rolle als Such-Dialog haben soll
   */
  isSearchDialog?: boolean;
}

/**
 * Dialog-Komponente mit verbesserten Barrierefreiheits-Funktionen
 *
 * Diese Komponente erweitert die Standard-Dialog-Komponente um zusätzliche
 * Barrierefreiheits-Funktionen wie verbesserte ARIA-Attribute und anpassbare
 * Screenreader-Texte.
 *
 * @example
 * ```tsx
 * <Dialog.A11y
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Wichtige Information"
 *   accessibleLabel="Informations-Dialog"
 *   accessibleDescription="Dieser Dialog enthält wichtige Informationen"
 *   trapFocus={true}
 *   autoFocus={true}
 * >
 *   <p>Dialog-Inhalt</p>
 * </Dialog.A11y>
 * ```
 */
export const A11yDialog: React.FC<A11yDialogProps> = (props) => {
  const {
    accessibleLabel,
    accessibleDescription,
    live,
    atomic,
    relevant,
    a11yTexts = {},
    testId,
    autoFocus = true,
    trapFocus = true,
    isFormDialog = false,
    isSearchDialog = false,
    isAlertDialog,
    ...rest
  } = props;

  // Generiere eindeutige IDs für Komponenten
  const uniqueId = useId();
  const descriptionId = `${uniqueId}-a11y-description`;

  // Bestimme die Rolle des Dialogs
  let role: string | undefined;
  if (isAlertDialog) {
    role = 'alertdialog';
  } else if (isFormDialog) {
    role = 'form';
  } else if (isSearchDialog) {
    role = 'search';
  }

  // Standard-Texte für Screenreader
  const defaultA11yTexts = {
    closeButtonLabel: 'Schließen',
    confirmButtonLabel: 'Bestätigen',
    cancelButtonLabel: 'Abbrechen',
    dialogTitleLabel: 'Dialog',
    dialogDescriptionLabel: 'Dialog-Inhalt',
  };

  // Kombiniere Standard-Texte mit benutzerdefinierten Texten
  const mergedA11yTexts = { ...defaultA11yTexts, ...a11yTexts };

  return (
    <>
      <Dialog
        role={role}
        aria-label={accessibleLabel}
        aria-describedby={accessibleDescription ? descriptionId : undefined}
        aria-live={live}
        aria-atomic={atomic ? 'true' : undefined}
        aria-relevant={relevant}
        data-testid={testId || 'a11y-dialog'}
        confirmLabel={mergedA11yTexts.confirmButtonLabel}
        cancelLabel={mergedA11yTexts.cancelButtonLabel}
        initialFocus={autoFocus}
        returnFocus={trapFocus}
        isAlertDialog={isAlertDialog}
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
};

A11yDialog.displayName = 'Dialog.A11y';

export default A11yDialog;
