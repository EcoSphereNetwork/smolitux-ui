// packages/@smolitux/core/src/components/RadioGroup/Radio.tsx
import React, { forwardRef } from 'react';
import { RadioProps } from './RadioProps';

/**
 * Radio-Komponente für Formulare
 * 
 * @example
 * ```tsx
 * <Radio
 *   name="example"
 *   value="option1"
 *   label="Option 1"
 *   checked={selectedValue === 'option1'}
 *   onChange={handleChange}
 * />
 * ```
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  size = 'md',
  className = '',
  children,
  ...rest
}, ref) => {
  // Wenn children vorhanden ist, verwende es als Label
  const displayLabel = children || label;
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // Label-Größen
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <label className={`inline-flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          type="radio"
          ref={ref}
          className={`
            form-radio
            ${sizeClasses[size]}
            text-primary-600
            border-gray-300
            focus:ring-primary-500
            focus:ring-2
            focus:ring-offset-2
            transition
            duration-150
            ease-in-out
            ${rest.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...rest}
        />
      </div>
      {displayLabel && (
        <span className={`ml-2 ${labelSizeClasses[size]} ${rest.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {displayLabel}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

export default Radio;