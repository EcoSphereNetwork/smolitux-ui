// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { createContext } from 'react';
import Radio from '../Radio/Radio';

// Kontext für die RadioGroup
export interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  getRadioId?: (value: string) => string;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Name für die Radio-Gruppe (wichtig für Formular-Handling) */
  name: string;
  /** Array von Radio-Optionen */
  options?: RadioOption[];
  /** Aktuell ausgewählter Wert */
  value?: string;
  /** Standard-Wert */
  defaultValue?: string;
  /** Callback bei Änderungen */
  onChange?: (value: string) => void;
  /** Label für die gesamte Gruppe */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe der Radios */
  size?: 'sm' | 'md' | 'lg';
  /** Ausrichtung der Optionen */
  layout?: 'horizontal' | 'vertical';
  /** Deaktiviert alle Optionen */
  disabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Kinder-Elemente (Radio-Komponenten) */
  children?: React.ReactNode;
}

/**
 * RadioGroup-Komponente für Formulare
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error,
  size = 'md',
  layout = 'vertical',
  disabled = false,
  className = '',
  children,
}) => {
  // Generiere eine eindeutige ID für die Gruppe
  const groupId = `radio-group-${Math.random().toString(36).substring(2, 9)}`;

  // State für uncontrolled mode
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  // Aktueller Wert (controlled oder uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;

  // Handler für Änderungen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Wenn das Radio disabled ist, nichts tun
    if (e.target.disabled) {
      return;
    }

    // Für uncontrolled mode
    if (value === undefined) {
      setInternalValue(e.target.value);
    }

    // Callback aufrufen
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Klonen der Kinder-Elemente mit den richtigen Props
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Typensichere Klonierung
        return React.cloneElement(child, {
          ...child.props,
          name,
          checked: currentValue === child.props.value,
          onChange: handleChange,
          size,
          disabled: disabled || child.props.disabled,
        });
      }
      return child;
    });
  };

  // Kontext-Wert für RadioGroup
  const contextValue: RadioGroupContextType = {
    name,
    value,
    onChange: (value: string) => {
      // Adapter-Funktion, die einen String-Wert akzeptiert
      const syntheticEvent = {
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(syntheticEvent);
    },
    disabled,
    required: false,
    error,
    isInvalid: Boolean(error),
    size,
    getRadioId: (val: string) => `${groupId}-${val}`,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={`${className}`}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined}
      >
        {label && (
          <div
            id={`${groupId}-label`}
            className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </div>
        )}

        <div className={`${layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'} gap-2`}>
          {options
            ? options.map((option) => (
                <Radio
                  key={option.value}
                  id={`${groupId}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value || defaultValue === option.value}
                  onChange={handleChange}
                  label={option.label}
                  size={size}
                  disabled={disabled || option.disabled}
                />
              ))
            : renderChildren()}
        </div>

        {(error || helperText) && (
          <div className="mt-1 text-sm">
            {error ? (
              <p id={`${groupId}-error`} className="text-red-600 dark:text-red-400">
                {error}
              </p>
            ) : helperText ? (
              <p id={`${groupId}-helper`} className="text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
