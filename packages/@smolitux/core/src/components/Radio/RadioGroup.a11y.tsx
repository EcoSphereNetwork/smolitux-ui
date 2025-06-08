import React, { createContext, forwardRef, useMemo, useId } from 'react';
import { useFormControl } from '../FormControl';
import { RadioGroupContext } from './RadioGroup';

export interface RadioGroupA11yProps {
  /** Name für alle Radio-Buttons in der Gruppe */
  name: string;
  /** Aktuell ausgewählter Wert */
  value?: string;
  /** Callback bei Änderung der Auswahl */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Ob die Gruppe deaktiviert ist */
  disabled?: boolean;
  /** Ob die Gruppe erforderlich ist */
  required?: boolean;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Erfolgsmeldung */
  successMessage?: React.ReactNode;
  /** Label für die Gruppe */
  label?: React.ReactNode;
  /** Größe der Radio-Buttons */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Layout der Gruppe */
  layout?: 'vertical' | 'horizontal';
  /** Kinder-Komponenten */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ob die Gruppe gültig ist */
  isValid?: boolean;
  /** Ob die Gruppe ungültig ist */
  isInvalid?: boolean;
  /** Ob die Gruppe erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob die Gruppe im Ladezustand ist */
  isLoading?: boolean;
  /** Ob die Gruppe als Card angezeigt werden soll */
  isCard?: boolean;
  /** Ob die Gruppe als Button angezeigt werden soll */
  isButton?: boolean;
  /** Farbe der Radio-Buttons */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  /** Ob das Label ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideLabel?: boolean;
  /** Ob der Hilfetext ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideHelperText?: boolean;
  /** Ob die Fehlermeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideError?: boolean;
  /** Ob die Erfolgsmeldung ausgeblendet werden soll (nur für Screenreader sichtbar) */
  hideSuccessMessage?: boolean;
  /** Zusätzliche CSS-Klassen für das Label */
  labelClassName?: string;
  /** Zusätzliche CSS-Klassen für den Hilfetext */
  helperTextClassName?: string;
  /** Zusätzliche CSS-Klassen für die Fehlermeldung */
  errorClassName?: string;
  /** Zusätzliche CSS-Klassen für die Erfolgsmeldung */
  successClassName?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Tooltip für das Label */
  labelTooltip?: string;
  /** Beschreibung für die Gruppe (für Screenreader) */
  description?: string;
  /** ID für die Gruppe */
  id?: string;
  /** ARIA-Label für die Gruppe */
  ariaLabel?: string;
  /** ARIA-Labelledby für die Gruppe */
  ariaLabelledby?: string;
  /** Ob die Gruppe als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob die Gruppe als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob die Gruppe als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob die Gruppe als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Ob die Gruppe als "roving tabindex" implementiert werden soll */
  rovingTabindex?: boolean;
  /** Ob die Gruppe als "single select" implementiert werden soll */
  singleSelect?: boolean;
  /** Ob die Gruppe als "multi select" implementiert werden soll */
  multiSelect?: boolean;
  /** Ob die Gruppe als "required" markiert werden soll */
  isRequired?: boolean;
}

/**
 * Barrierefreie RadioGroup-Komponente für die Gruppierung von Radio-Buttons
 *
 * @example
 * ```tsx
 * <RadioGroupA11y
 *   name="options"
 *   label="Wählen Sie eine Option"
 *   value={selectedOption}
 *   onChange={(e) => setSelectedOption(e.target.value)}
 *   ariaLabel="Optionsauswahl"
 * >
 *   <RadioA11y value="option1" label="Option 1" />
 *   <RadioA11y value="option2" label="Option 2" />
 *   <RadioA11y value="option3" label="Option 3" />
 * </RadioGroupA11y>
 * ```
 */
export const RadioGroupA11y = forwardRef<HTMLDivElement, RadioGroupA11yProps>(
  (
    {
      name,
      value,
      onChange,
      disabled,
      required,
      error,
      helperText,
      successMessage,
      label,
      size = 'md',
      layout = 'vertical',
      children,
      className = '',
      isValid = false,
      isInvalid = false,
      isSuccess = false,
      isLoading = false,
      isCard = false,
      isButton = false,
      colorScheme = 'primary',
      hideLabel = false,
      hideHelperText = false,
      hideError = false,
      hideSuccessMessage = false,
      labelClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      successClassName = '',
      containerClassName = '',
      labelTooltip,
      description,
      id,
      ariaLabel,
      ariaLabelledby,
      busy = false,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      rovingTabindex = false,
      singleSelect = true,
      multiSelect = false,
      isRequired,
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();

    // Hole FormControl-Context, falls vorhanden
    const formControl = useFormControl();

    // Kombiniere Props mit FormControl-Context
    const _id = id || formControl.id || `radio-group-${uniqueId}`;
    const _disabled = disabled ?? formControl.disabled;
    const _required = isRequired ?? required ?? formControl.required;
    const _error = error || (formControl.hasError ? 'Ungültige Eingabe' : undefined);
    const _isInvalid = isInvalid || Boolean(_error) || formControl.isInvalid;
    const _isValid = isValid || formControl.isValid;
    const _isSuccess = isSuccess || formControl.isSuccess;
    const _isLoading = isLoading || formControl.isLoading;

    // Generiere eindeutige IDs für Radio-Buttons
    const getRadioId = (radioValue: string) => `${_id}-${radioValue}`;

    // Context-Wert für RadioGroup
    const contextValue = useMemo(
      () => ({
        name,
        value,
        onChange,
        disabled: _disabled,
        required: _required,
        error: _error,
        isInvalid: _isInvalid,
        isValid: _isValid,
        isSuccess: _isSuccess,
        isLoading: _isLoading,
        size,
        getRadioId,
      }),
      [
        name,
        value,
        onChange,
        _disabled,
        _required,
        _error,
        _isInvalid,
        _isValid,
        _isSuccess,
        _isLoading,
        size,
        _id,
      ]
    );

    // Bestimme die ARIA-Attribute für die RadioGroup
    const getAriaAttributes = () => {
      const attributes: Record<string, string> = {};

      if (ariaLabel) {
        attributes['aria-label'] = ariaLabel;
      }

      if (ariaLabelledby) {
        attributes['aria-labelledby'] = ariaLabelledby;
      } else if (label && !hideLabel) {
        attributes['aria-labelledby'] = `${_id}-label`;
      }

      if (description) {
        attributes['aria-describedby'] = `${_id}-description`;
      }

      if (_error) {
        attributes['aria-errormessage'] = `${_id}-error`;
        attributes['aria-invalid'] = 'true';
      }

      if (helperText && !_error) {
        attributes['aria-describedby'] = attributes['aria-describedby']
          ? `${attributes['aria-describedby']} ${_id}-helper`
          : `${_id}-helper`;
      }

      if (successMessage) {
        attributes['aria-describedby'] = attributes['aria-describedby']
          ? `${attributes['aria-describedby']} ${_id}-success`
          : `${_id}-success`;
      }

      if (busy) {
        attributes['aria-busy'] = 'true';
      }

      if (_required) {
        attributes['aria-required'] = 'true';
      }

      return attributes;
    };

    // Rendere das Label
    const renderLabel = () => {
      if (!label) return null;

      return (
        <div className={`${hideLabel ? 'sr-only' : ''} mb-2`}>
          <div
            id={`${_id}-label`}
            className={`text-base font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
            title={labelTooltip}
          >
            {label}
            {_required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </div>
        </div>
      );
    };

    // Rendere Hilfetext, Fehlermeldung oder Erfolgsmeldung
    const renderHelperText = () => {
      if (!_error && !helperText && !successMessage) return null;

      return (
        <div className="mt-2 text-sm">
          {_error && !hideError ? (
            <p
              id={`${_id}-error`}
              className={`text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
            >
              {_error}
            </p>
          ) : successMessage && !hideSuccessMessage ? (
            <p
              id={`${_id}-success`}
              className={`text-green-600 dark:text-green-400 ${successClassName}`}
            >
              {successMessage}
            </p>
          ) : helperText && !hideHelperText ? (
            <p
              id={`${_id}-helper`}
              className={`text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            >
              {helperText}
            </p>
          ) : null}
        </div>
      );
    };

    // Beschreibung für Screenreader
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={`${_id}-description`} className="sr-only">
          {description}
        </div>
      );
    };

    // Live-Region für Ankündigungen
    const renderLiveRegion = () => {
      if (liveRegionPoliteness === 'off') return null;

      return (
        <div
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic ? 'true' : 'false'}
          aria-relevant={relevant}
          className="sr-only"
        >
          {value ? `Option ${value} ausgewählt` : 'Keine Option ausgewählt'}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={`${containerClassName} ${className}`}
        role="radiogroup"
        id={_id}
        {...getAriaAttributes()}
      >
        {renderDescription()}
        {renderLiveRegion()}
        {renderLabel()}

        <div
          className={`${layout === 'horizontal' ? 'flex flex-row space-x-4' : 'flex flex-col space-y-2'}`}
        >
          <RadioGroupContext.Provider value={contextValue}>{children}</RadioGroupContext.Provider>
        </div>

        {renderHelperText()}
      </div>
    );
  }
);

RadioGroupA11y.displayName = 'RadioGroupA11y';

export default RadioGroupA11y;
