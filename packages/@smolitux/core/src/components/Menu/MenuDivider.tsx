// packages/@smolitux/core/src/components/Menu/MenuDivider.tsx
import React from 'react';

export interface MenuDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Text im Divider (optional) */
  label?: string;
  /** Variante des Dividers */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Padding des Dividers */
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * MenuDivider-Komponente zur Trennung von MenuItems
 * 
 * @example
 * ```tsx
 * <Menu>
 *   <MenuItem id="item1">Item 1</MenuItem>
 *   <MenuDivider />
 *   <MenuItem id="item2">Item 2</MenuItem>
 * </Menu>
 * ```
 */
export const MenuDivider = React.forwardRef<HTMLHRElement, MenuDividerProps>(({
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
        className={`flex items-center ${paddingClasses[padding]}`}
        role="separator"
        aria-orientation="horizontal"
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
    <hr
      ref={ref}
      className={baseClasses}
      role="separator"
      aria-orientation="horizontal"
      {...rest}
    />
  );
});

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
