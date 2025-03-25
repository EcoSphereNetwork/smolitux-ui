import React from 'react';
import Radio from './Radio';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Name für die Radio-Gruppe (wichtig für Formular-Handling) */
  name: string;
  /** Array von Radio-Optionen */
  options: RadioOption[];
  /** Aktuell ausgewählter Wert */
  value?: string;
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
  direction?: 'horizontal' | 'vertical';
  /** Deaktiviert alle Optionen */
  disabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * RadioGroup-Komponente für Formulare
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  helperText,
  error,
  size = 'md',
  direction = 'vertical',
  disabled = false,
  className = '',
}) => {
  // Generiere eine eindeutige ID für die Gruppe
  const groupId = `radio-group-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handler für Änderungen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div 
      className={`${className}`}
      role="radiogroup"
      aria-labelledby={label ? `${groupId}-label` : undefined}
      aria-describedby={
        error ? `${groupId}-error` : 
        helperText ? `${groupId}-helper` : 
        undefined
      }
    >
      {label && (
        <div id={`${groupId}-label`} className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      )}
      
      <div className={`${direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            id={`${groupId}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            label={option.label}
            size={size}
            disabled={disabled || option.disabled}
          />
        ))}
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
  );
};

export default RadioGroup;
