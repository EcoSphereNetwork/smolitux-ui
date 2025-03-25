// packages/@smolitux/core/src/components/Switch/Switch.tsx
import React, { forwardRef, useEffect, useState } from 'react';
import { useFormControl } from '../FormControl/FormControl';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Text-Label (alternativ zu label im FormControl) */
  label?: React.ReactNode;
  /** Hilfetexzt (alternativ zu helperText im FormControl) */
  helperText?: React.ReactNode;
  /** Fehlermeldung (alternativ zu error im FormControl) */
  error?: React.ReactNode;
  /** Größe des Switches */
  size?: 'sm' | 'md' | 'lg';
  /** Farbe des Switches */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Position des Labels */
  labelPosition?: 'left' | 'right';
  /** Label-Ausrichtung wenn labelPosition="left" */
  labelAlign?: 'start' | 'center' | 'end';
  /** Checked/Unchecked-Icons anzeigen */
  icons?: boolean;
  /** An/Aus-Beschriftung */
  labels?: {on?: string; off?: string};
}

/**
 * Switch-Komponente für Toggle-Steuerelemente
 * 
 * @example
 * ```tsx
 * <Switch 
 *   label="Benachrichtigungen aktivieren" 
 *   checked={notifications} 
 *   onChange={e => setNotifications(e.target.checked)} 
 * />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  helperText,
  error,
  size = 'md',
  color = 'primary',
  labelPosition = 'right',
  labelAlign = 'start',
  icons = false,
  labels,
  className = '',
  checked,
  defaultChecked,
  onChange,
  ...rest
}, ref) => {
  // Aus dem FormControl-Context importierte Werte
  const formControl = useFormControl();
  
  // Lokaler Zustand für controlled/uncontrolled Komponente
  const [isChecked, setIsChecked] = useState(() => {
    if (checked !== undefined) return checked;
    if (defaultChecked !== undefined) return defaultChecked;
    return false;
  });
  
  // Kombinierte Props aus eigenem und FormControl
  const combinedProps = {
    id: rest.id || formControl.id,
    disabled: rest.disabled || formControl.disabled,
    required: rest.required || formControl.required,
    'aria-invalid': error ? true : formControl.hasError || undefined,
    'aria-describedby': error || formControl.hasError 
      ? `${formControl.id}-error` 
      : helperText 
        ? `${formControl.id}-helper` 
        : undefined,
  };
  
  // Aktualisiere lokalen Zustand, wenn sich checked von außen ändert
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);
  
  // Event-Handler für Änderungen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Wenn es eine kontrollierte Komponente ist, erfolgt die Änderung über onChange
    if (checked === undefined) {
      setIsChecked(e.target.checked);
    }
    
    if (onChange) {
      onChange(e);
    }
  };
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: {
      track: 'w-7 h-4',
      thumb: 'w-3 h-3',
      thumbChecked: 'translate-x-3',
      text: 'text-xs',
      labelGap: 'gap-1.5'
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbChecked: 'translate-x-5',
      text: 'text-sm',
      labelGap: 'gap-2'
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbChecked: 'translate-x-6',
      text: 'text-base',
      labelGap: 'gap-3'
    }
  };
  
  // Farben-spezifische Klassen
  const colorClasses = {
    primary: {
      bg: 'bg-primary-600',
      bgDark: 'dark:bg-primary-500'
    },
    secondary: {
      bg: 'bg-secondary-600',
      bgDark: 'dark:bg-secondary-500'
    },
    success: {
      bg: 'bg-green-600',
      bgDark: 'dark:bg-green-500'
    },
    warning: {
      bg: 'bg-yellow-600',
      bgDark: 'dark:bg-yellow-500'
    },
    error: {
      bg: 'bg-red-600',
      bgDark: 'dark:bg-red-500'
    }
  };
  
  // Icon-Komponenten für checked/unchecked
  const CheckedIcon = () => (
    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  
  const UncheckedIcon = () => (
    <svg className="h-3 w-3 text-gray-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L8 8M8 4L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  
  // Label-Ausrichtung
  const labelAlignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };
  
  // Render-Komponente - nur Switch ohne FormControl-Wrapper
  const renderSwitch = () => (
    <>
      {/* Verstecktes Input-Element für tatsächlichen Wert */}
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        {...combinedProps}
        {...rest}
      />
      
      {/* Visueller Switch */}
      <div
        className={`
          relative inline-flex items-center 
          ${combinedProps.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={combinedProps.disabled ? undefined : () => {
          // Manueller Click-Handler um Label-Klicks zu unterstützen
          const newChecked = !isChecked;
          if (checked === undefined) {
            setIsChecked(newChecked);
          }
          
          if (onChange) {
            const syntheticEvent = {
              target: { checked: newChecked },
              currentTarget: { checked: newChecked },
              preventDefault: () => {},
              stopPropagation: () => {}
            } as React.ChangeEvent<HTMLInputElement>;
            
            onChange(syntheticEvent);
          }
        }}
      >
        {/* Track (Hintergrund) */}
        <div
          className={`
            ${sizeClasses[size].track}
            rounded-full transition-colors duration-200 ease-in-out
            ${isChecked 
              ? `${colorClasses[color].bg} ${colorClasses[color].bgDark}` 
              : 'bg-gray-300 dark:bg-gray-600'}
          `}
        >
          {/* Thumb (Knopf) */}
          <div
            className={`
              ${sizeClasses[size].thumb}
              absolute top-0.5 left-0.5
              bg-white rounded-full shadow
              transform transition-transform duration-200 ease-in-out
              ${isChecked ? sizeClasses[size].thumbChecked : ''}
              flex items-center justify-center
            `}
          >
            {/* Optionale Icons innerhalb des Thumbs */}
            {icons && (isChecked ? <CheckedIcon /> : <UncheckedIcon />)}
          </div>
        </div>
        
        {/* Optionale An/Aus-Beschriftung neben dem Switch */}
        {labels && (
          <span 
            className={`
              ml-1.5 
              ${sizeClasses[size].text} 
              ${isChecked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            {isChecked ? labels.on : labels.off}
          </span>
        )}
      </div>
    </>
  );
  
  // Wenn kein Label, nur den Switch zurückgeben
  if (!label && !formControl.label) {
    return renderSwitch();
  }
  
  // Mit Label
  return (
    <div 
      className={`
        inline-flex ${labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'}
        ${labelAlignClasses[labelAlign]}
        ${sizeClasses[size].labelGap}
        ${className}
      `}
    >
      {renderSwitch()}
      
      {/* Label (wenn nicht im FormControl) */}
      {(label || formControl.label) && (
        <label 
          htmlFor={combinedProps.id}
          className={`
            ${sizeClasses[size].text}
            ${combinedProps.disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}
            ${combinedProps.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {label || formControl.label}
          {combinedProps.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Hilfetexzt oder Fehlermeldung (falls außerhalb eines FormControl) */}
      {((helperText && !formControl.hasError) || (error && !formControl.hasError)) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p id={`${combinedProps.id}-error`} className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p id={`${combinedProps.id}-helper`} className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
