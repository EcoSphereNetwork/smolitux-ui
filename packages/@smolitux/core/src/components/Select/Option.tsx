// TODO: forwardRef hinzufügen
import React from 'react';

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  /** Wert der Option */
  value: string;
  /** Anzeigetext */
  children: React.ReactNode;
  /** Ob die Option deaktiviert ist */
  disabled?: boolean;
  /** Beschreibung der Option */
  description?: string;
  /** Icon der Option */
  icon?: React.ReactNode;
  /** Gruppe der Option */
  group?: string;
}

/**
 * Option-Komponente für Select
 *
 * @example
 * ```tsx
 * <Option value="option1">Option 1</Option>
 * <Option value="option2" disabled>Option 2 (deaktiviert)</Option>
 * <Option value="option3" description="Beschreibung für Option 3">Option 3</Option>
 * ```
 */
export const Option: React.FC<OptionProps> = ({
  value,
  children,
  disabled,
  description,
  icon,
  group,
  ...props
}) => {
  return (
    <option
      value={value}
      disabled={disabled}
      title={description}
      data-icon={icon ? 'true' : undefined}
      data-description={description}
      data-group={group}
      {...props}
    >
      {children}
      {disabled && <span className="sr-only"> (nicht verfügbar)</span>}
    </option>
  );
};

export default Option;
