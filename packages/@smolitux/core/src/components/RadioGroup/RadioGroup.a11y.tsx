// packages/@smolitux/core/src/components/RadioGroup/RadioGroup.a11y.tsx
import React, { useState, useEffect, useId } from 'react';
import { RadioProps } from './RadioProps';
import Radio from './Radio';
import './RadioGroup.css';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupA11yProps {
  /** Die verfügbaren Optionen */
  options: RadioOption[];
  /** Der aktuell ausgewählte Wert */
  value?: string;
  /** Der Standardwert (wenn nicht kontrolliert) */
  defaultValue?: string;
  /** Callback bei Änderung der Auswahl */
  onChange?: (value: string) => void;
  /** Name für die Radiogruppe */
  name?: string;
  /** Größe der Radiobuttons */
  size?: 'sm' | 'md' | 'lg';
  /** Farbe der Radiobuttons */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  /** Ausrichtung der Radiobuttons */
  orientation?: 'horizontal' | 'vertical';
  /** Abstand zwischen den Radiobuttons */
  spacing?: 'sm' | 'md' | 'lg';
  /** Deaktiviert alle Radiobuttons */
  isDisabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** ID für die Radiogruppe */
  id?: string;
  /** ARIA-Label für die Radiogruppe */
  ariaLabel?: string;
  /** ARIA-Labelledby für die Radiogruppe */
  ariaLabelledby?: string;
  /** ARIA-Describedby für die Radiogruppe */
  ariaDescribedby?: string;
  /** Beschreibung für die Radiogruppe (für Screenreader) */
  description?: string;
  /** Ob die Beschreibung sichtbar sein soll */
  showDescription?: boolean;
  /** Ob die Radiogruppe eine Live-Region haben soll */
  liveRegion?: boolean;
  /** Politeness der Live-Region */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob Änderungen angekündigt werden sollen */
  announceChanges?: boolean;
  /** Format der Ankündigung */
  announceFormat?: string;
  /** Ob die Radiogruppe eine Tastaturnavigation haben soll */
  keyboardNavigation?: boolean;
  /** Ob der Fokus automatisch auf den ersten Radiobutton gesetzt werden soll */
  autoFocus?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf das Label ausgewählt werden können */
  clickableLabels?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf die Beschreibung ausgewählt werden können */
  clickableDescriptions?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Container ausgewählt werden können */
  clickableContainer?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Text ausgewählt werden können */
  clickableText?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf das Icon ausgewählt werden können */
  clickableIcon?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf das Bild ausgewählt werden können */
  clickableImage?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Hintergrund ausgewählt werden können */
  clickableBackground?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Rand ausgewählt werden können */
  clickableBorder?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Schatten ausgewählt werden können */
  clickableShadow?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Hover-Effekt ausgewählt werden können */
  clickableHover?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Fokus-Effekt ausgewählt werden können */
  clickableFocus?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Aktiv-Effekt ausgewählt werden können */
  clickableActive?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Disabled-Effekt ausgewählt werden können */
  clickableDisabled?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Checked-Effekt ausgewählt werden können */
  clickableChecked?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Unchecked-Effekt ausgewählt werden können */
  clickableUnchecked?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Indeterminate-Effekt ausgewählt werden können */
  clickableIndeterminate?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Error-Effekt ausgewählt werden können */
  clickableError?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Success-Effekt ausgewählt werden können */
  clickableSuccess?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Warning-Effekt ausgewählt werden können */
  clickableWarning?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Info-Effekt ausgewählt werden können */
  clickableInfo?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Neutral-Effekt ausgewählt werden können */
  clickableNeutral?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Primary-Effekt ausgewählt werden können */
  clickablePrimary?: boolean;
  /** Ob die Radiobuttons mit einem Klick auf den Secondary-Effekt ausgewählt werden können */
  clickableSecondary?: boolean;
}

/**
 * Barrierefreie RadioGroup-Komponente für die Auswahl einer Option aus mehreren Möglichkeiten
 * 
 * @example
 * ```tsx
 * <RadioGroupA11y
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3', disabled: true }
 *   ]}
 *   defaultValue="option1"
 *   onChange={(value) => console.log(value)}
 *   ariaLabel="Auswahloptionen"
 * />
 * ```
 */
export const RadioGroupA11y: React.FC<RadioGroupA11yProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  name: nameProp,
  size = 'md',
  color = 'primary',
  orientation = 'vertical',
  spacing = 'md',
  isDisabled = false,
  className = '',
  id: idProp,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  description,
  showDescription = false,
  liveRegion = true,
  liveRegionPoliteness = 'polite',
  announceChanges = true,
  announceFormat = 'Option {label} ausgewählt',
  keyboardNavigation = true,
  autoFocus = false,
  clickableLabels = true,
  clickableDescriptions = true,
  clickableContainer = false,
  clickableText = true,
  clickableIcon = true,
  clickableImage = true,
  clickableBackground = false,
  clickableBorder = false,
  clickableShadow = false,
  clickableHover = false,
  clickableFocus = false,
  clickableActive = false,
  clickableDisabled = false,
  clickableChecked = false,
  clickableUnchecked = false,
  clickableIndeterminate = false,
  clickableError = false,
  clickableSuccess = false,
  clickableWarning = false,
  clickableInfo = false,
  clickableNeutral = false,
  clickablePrimary = false,
  clickableSecondary = false,
}) => {
  // Generiere eindeutige IDs
  const uniqueId = useId();
  const id = idProp || `radio-group-${uniqueId}`;
  const name = nameProp || `radio-group-${uniqueId}`;
  const descriptionId = `${id}-description`;
  const liveRegionId = `${id}-live-region`;
  
  // State für den ausgewählten Wert
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const [announcement, setAnnouncement] = useState<string>('');
  
  // Verwende den kontrollierten Wert, wenn er vorhanden ist
  const currentValue = controlledValue !== undefined ? controlledValue : selectedValue;
  
  // Aktualisiere den State, wenn sich der kontrollierte Wert ändert
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);
  
  // Behandle Änderungen
  const handleChange = (value: string) => {
    setSelectedValue(value);
    
    if (onChange) {
      onChange(value);
    }
    
    // Ankündigung für Screenreader
    if (announceChanges) {
      const selectedOption = options.find(option => option.value === value);
      if (selectedOption) {
        const announcement = announceFormat.replace('{label}', selectedOption.label as string);
        setAnnouncement(announcement);
      }
    }
  };
  
  // Berechne CSS-Klassen
  const groupClasses = [
    'radio-group',
    `radio-group-${orientation}`,
    `radio-group-spacing-${spacing}`,
    isDisabled ? 'radio-group-disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Rendere die Beschreibung
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div 
        id={descriptionId}
        className={showDescription ? 'radio-group-description' : 'sr-only'}
      >
        {description}
      </div>
    );
  };
  
  // Rendere die Live-Region
  const renderLiveRegion = () => {
    if (!liveRegion) return null;
    
    return (
      <div 
        id={liveRegionId}
        aria-live={liveRegionPoliteness}
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    );
  };
  
  // Rendere die Radiobuttons
  const renderRadioButtons = () => {
    return options.map((option, index) => {
      const isChecked = currentValue === option.value;
      const isOptionDisabled = isDisabled || option.disabled;
      const radioId = `${id}-${option.value}`;
      
      return (
        <div 
          key={option.value}
          className="radio-option"
        >
          <Radio
            id={radioId}
            name={name}
            value={option.value}
            checked={isChecked}
            disabled={isOptionDisabled}
            onChange={() => handleChange(option.value)}
            size={size}
            color={color}
            aria-describedby={option.description ? `${radioId}-description` : undefined}
            autoFocus={autoFocus && index === 0}
          />
          <label 
            htmlFor={radioId}
            className={`radio-label ${isOptionDisabled ? 'radio-label-disabled' : ''}`}
            onClick={clickableLabels ? undefined : (e) => e.preventDefault()}
          >
            {option.label}
          </label>
          {option.description && (
            <div 
              id={`${radioId}-description`}
              className="radio-description"
              onClick={clickableDescriptions ? () => !isOptionDisabled && handleChange(option.value) : undefined}
            >
              {option.description}
            </div>
          )}
        </div>
      );
    });
  };
  
  return (
    <div 
      id={id}
      className={groupClasses}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={description ? descriptionId : ariaDescribedby}
    >
      {renderDescription()}
      {renderRadioButtons()}
      {renderLiveRegion()}
    </div>
  );
};

export default RadioGroupA11y;