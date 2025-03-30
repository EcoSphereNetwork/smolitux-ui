import React, { useId } from 'react';
import { Button, ButtonProps } from './Button';

/**
 * Button-Komponente mit verbesserten Barrierefreiheits-Funktionen
 * 
 * Diese Komponente erweitert die Standard-Button-Komponente um zusätzliche
 * Barrierefreiheits-Funktionen wie automatische ARIA-Attribute und verbesserte
 * Tastaturunterstützung.
 * 
 * @example
 * ```tsx
 * <Button.A11y>Klick mich</Button.A11y>
 * <Button.A11y variant="primary" isLoading>Laden...</Button.A11y>
 * <Button.A11y isIconButton leftIcon={<Icon />} label="Menü öffnen" />
 * ```
 */
export interface A11yButtonProps extends Omit<ButtonProps, 'aria-label'> {
  /**
   * Beschreibender Text für den Button (wird als aria-label verwendet)
   * Besonders wichtig für Icon-Buttons ohne sichtbaren Text
   */
  label?: string;
  
  /**
   * ID für den Button
   * Wenn nicht angegeben, wird automatisch eine eindeutige ID generiert
   */
  id?: string;
  
  /**
   * Ob der Button als "current" markiert werden soll (z.B. für Navigation)
   */
  isCurrent?: boolean;
  
  /**
   * Zusätzliche Beschreibung für Screenreader
   * Wird als aria-describedby verwendet
   */
  description?: string;
  
  /**
   * ID des Elements, das den Button beschreibt
   * Alternative zu description, wenn die Beschreibung bereits im DOM existiert
   */
  describedBy?: string;
  
  /**
   * Ob der Button eine Popup-Funktion hat
   * Setzt aria-haspopup auf "true"
   */
  hasPopup?: boolean;
  
  /**
   * Ob der Button ein Menü öffnet
   * Setzt aria-haspopup auf "menu"
   */
  hasMenu?: boolean;
  
  /**
   * Ob der Button ein Dialog öffnet
   * Setzt aria-haspopup auf "dialog"
   */
  hasDialog?: boolean;
  
  /**
   * Ob der Button ein Listbox öffnet
   * Setzt aria-haspopup auf "listbox"
   */
  hasListbox?: boolean;
  
  /**
   * Ob der Button ein Tree öffnet
   * Setzt aria-haspopup auf "tree"
   */
  hasTree?: boolean;
  
  /**
   * Ob der Button ein Grid öffnet
   * Setzt aria-haspopup auf "grid"
   */
  hasGrid?: boolean;
  
  /**
   * Ob der Button erweitert ist (z.B. für Dropdown-Menüs)
   * Setzt aria-expanded
   */
  isExpanded?: boolean;
  
  /**
   * Ob der Button ausgewählt ist
   * Setzt aria-selected
   */
  isSelected?: boolean;
  
  /**
   * Ob der Button gedrückt ist (für Toggle-Buttons)
   * Setzt aria-pressed
   */
  isPressed?: boolean;
  
  /**
   * Ob der Button gerade aktiv ist
   * Setzt aria-current
   */
  isCurrent?: boolean;
  
  /**
   * Ob der Button eine Aktion ausführt, die Zeit benötigt
   * Setzt aria-busy
   */
  isBusy?: boolean;
  
  /**
   * Ob der Button deaktiviert ist
   * Setzt aria-disabled
   */
  isDisabled?: boolean;
  
  /**
   * ID des Elements, das der Button steuert
   * Setzt aria-controls
   */
  controls?: string;
  
  /**
   * ID des Elements, das den Button besitzt
   * Setzt aria-owns
   */
  owns?: string;
  
  /**
   * Tastenkombination für den Button
   * Setzt aria-keyshortcuts
   */
  keyShortcuts?: string;
  
  /**
   * Rolle des Buttons
   * Überschreibt die Standard-Rolle "button"
   */
  role?: string;
  
  /**
   * Ob der Button eine Live-Region aktualisiert
   * Setzt aria-live
   */
  live?: 'off' | 'polite' | 'assertive';
  
  /**
   * Ob Änderungen in der Live-Region atomar sind
   * Setzt aria-atomic
   */
  atomic?: boolean;
  
  /**
   * Ob der Button relevant ist
   * Setzt aria-relevant
   */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  
  /**
   * Test-ID für automatisierte Tests
   * Setzt data-testid
   */
  testId?: string;
}

/**
 * Button-Komponente mit verbesserten Barrierefreiheits-Funktionen
 */
export const A11yButton = React.forwardRef<HTMLButtonElement, A11yButtonProps>(({
  label,
  id: providedId,
  isCurrent,
  description,
  describedBy,
  hasPopup,
  hasMenu,
  hasDialog,
  hasListbox,
  hasTree,
  hasGrid,
  isExpanded,
  isSelected,
  isPressed,
  isBusy,
  isDisabled,
  controls,
  owns,
  keyShortcuts,
  role = 'button',
  live,
  atomic,
  relevant,
  testId,
  isIconButton,
  children,
  ...props
}, ref) => {
  // Generiere eine eindeutige ID, wenn keine angegeben wurde
  const uniqueId = useId();
  const id = providedId || uniqueId;
  const descriptionId = description ? `${id}-description` : undefined;
  
  // Bestimme den Wert für aria-haspopup
  let ariaHasPopup: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
  if (hasPopup) ariaHasPopup = true;
  else if (hasMenu) ariaHasPopup = 'menu';
  else if (hasDialog) ariaHasPopup = 'dialog';
  else if (hasListbox) ariaHasPopup = 'listbox';
  else if (hasTree) ariaHasPopup = 'tree';
  else if (hasGrid) ariaHasPopup = 'grid';
  
  // Bestimme den Wert für aria-current
  const ariaCurrent = isCurrent ? 'page' : undefined;
  
  // Bestimme den Wert für aria-describedby
  const ariaDescribedBy = descriptionId || describedBy;
  
  return (
    <>
      <Button
        ref={ref}
        id={id}
        role={role}
        aria-label={isIconButton || !children ? label : undefined}
        aria-labelledby={!isIconButton && children && label ? `${id}-label` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-haspopup={ariaHasPopup}
        aria-expanded={isExpanded}
        aria-selected={isSelected}
        aria-pressed={isPressed}
        aria-current={ariaCurrent}
        aria-busy={isBusy || props.loading || props.isLoading}
        aria-disabled={isDisabled || props.disabled}
        aria-controls={controls}
        aria-owns={owns}
        aria-keyshortcuts={keyShortcuts}
        aria-live={live}
        aria-atomic={atomic ? 'true' : undefined}
        aria-relevant={relevant}
        data-testid={testId}
        isIconButton={isIconButton}
        disabled={isDisabled || props.disabled}
        {...props}
      >
        {children}
      </Button>
      
      {/* Versteckte Label-Elemente für bessere Screenreader-Unterstützung */}
      {!isIconButton && children && label && (
        <span id={`${id}-label`} hidden>
          {label}
        </span>
      )}
      
      {/* Versteckte Beschreibung für bessere Screenreader-Unterstützung */}
      {description && (
        <span id={descriptionId} hidden>
          {description}
        </span>
      )}
    </>
  );
});

A11yButton.displayName = 'Button.A11y';

export default A11yButton;