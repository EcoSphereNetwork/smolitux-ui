// packages/@smolitux/core/src/components/Dropdown/DropdownDivider.tsx
import React from 'react';

export interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text im Divider (optional) */
  label?: string;
  /** Variante des Dividers */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Padding des Dividers */
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * DropdownDivider-Komponente zur Trennung von DropdownItems
 * 
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownItem value="item1">Item 1</DropdownItem>
 *   <DropdownDivider />
 *   <DropdownItem value="item2">Item 2</DropdownItem>
 * </DropdownMenu>
 * ```
 */
export const DropdownDivider = React.forwardRef<HTMLDivElement, DropdownDividerProps>(({
  label,
  variant = 'solid',
  padding = 'md',
  className = '',
  ...rest
}, ref) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    solid: 'border-0 border-t border-gray-200 dark:border-gray-700',
    dashed: 'border-0 border-t border-dashed border-gray-200 dark:border-gray-700',
    dotted: 'border-0 border-t border-dotted border-gray-200 dark:border-gray-700'
  };
  
  // Padding-spezifische Klassen
  const paddingClasses = {
    none: 'my-0',
    sm: 'my-1',
    md: 'my-2',
    lg: 'my-3'
  };
  
  const baseClasses = [
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');
  
  // Wenn ein Label vorhanden ist, verwenden wir ein anderes Layout
  if (label) {
    return (
      <div 
        ref={ref}
        className={`flex items-center ${paddingClasses[padding]}`}
        role="separator"
        aria-orientation="horizontal"
        data-testid="dropdown-divider"
        {...rest}
      >
        <hr className={`flex-grow ${variantClasses[variant]}`} />
        <span className="px-2 text-xs text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <hr className={`flex-grow ${variantClasses[variant]}`} />
      </div>
    );
  }
  
  // Standard-Divider ohne Label
  return (
    <div
      ref={ref}
      className={baseClasses}
      role="separator"
      aria-orientation="horizontal"
      data-testid="dropdown-divider"
      {...rest}
    />
  );
});

DropdownDivider.displayName = 'DropdownDivider';

export default DropdownDivider;