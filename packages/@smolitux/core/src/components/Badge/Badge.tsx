import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Anzeigetext */
  children: React.ReactNode;
  /** Variante der Badge */
  variant?: BadgeVariant;
  /** Größe der Badge */
  size?: BadgeSize;
  /** Abgerundeter Stil */
  rounded?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Optional Icon */
  icon?: React.ReactNode;
  /** Ob die Badge als Zähler angezeigt werden soll (z.B. für Benachrichtigungen) */
  isCounter?: boolean;
  /** Maximaler Wert für Zähler (z.B. 99+) */
  maxCount?: number;
  /** Ob die Badge als Punkt ohne Text angezeigt werden soll */
  isDot?: boolean;
  /** Ob die Badge als Outline angezeigt werden soll */
  outline?: boolean;
  /** Zusätzliche HTML-Attribute */
  htmlProps?: React.HTMLAttributes<HTMLSpanElement>;
  /** ID für Barrierefreiheit */
  id?: string;
}

/**
 * Badge-Komponente zum Anzeigen von Status oder Kennzeichnungen
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success" icon={<CheckIcon />}>Success</Badge>
 * <Badge variant="error" rounded>Error</Badge>
 * <Badge isCounter maxCount={99}>100</Badge>
 * <Badge isDot variant="warning" />
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  icon,
  isCounter = false,
  maxCount,
  isDot = false,
  outline = false,
  htmlProps = {},
  id,
}) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: outline
      ? 'bg-transparent border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-300'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: outline
      ? 'bg-transparent border border-primary-500 text-primary-700 dark:border-primary-400 dark:text-primary-300'
      : 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    success: outline
      ? 'bg-transparent border border-green-500 text-green-700 dark:border-green-400 dark:text-green-300'
      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: outline
      ? 'bg-transparent border border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    error: outline
      ? 'bg-transparent border border-red-500 text-red-700 dark:border-red-400 dark:text-red-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: outline
      ? 'bg-transparent border border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  };

  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: isDot ? 'h-1.5 w-1.5' : 'text-xs px-1 py-0.5 min-w-[1rem]',
    sm: isDot ? 'h-2 w-2' : 'text-xs px-1.5 py-0.5 min-w-[1.25rem]',
    md: isDot ? 'h-2.5 w-2.5' : 'text-xs px-2.5 py-0.5 min-w-[1.5rem]',
    lg: isDot ? 'h-3 w-3' : 'text-sm px-3 py-1 min-w-[1.75rem]',
  };

  // Form-Klassen
  const roundedClass = isDot ? 'rounded-full' : rounded ? 'rounded-full' : 'rounded-md';

  // Zähler-Formatierung
  let displayContent = children;
  if ((isCounter && typeof children === 'string') || typeof children === 'number') {
    const count = Number(children);
    if (!isNaN(count) && maxCount && count > maxCount) {
      displayContent = `${maxCount}+`;
    }
  }

  // Kombinierte Klassen
  const badgeClasses = [
    isDot ? '' : 'inline-flex items-center justify-center font-medium',
    variantClasses[variant],
    sizeClasses[size],
    roundedClass,
    isCounter && !isDot ? 'text-center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Generiere eine eindeutige ID für ARIA-Attribute, wenn keine angegeben wurde
  const badgeId = id || `badge-${Math.random().toString(36).substr(2, 9)}`;

  // Bestimme den richtigen ARIA-Label-Text
  const getAriaLabel = () => {
    // Wenn es ein Zähler ist, füge Kontext hinzu
    if (isCounter) {
      return `${children} ${typeof children === 'number' && children === 1 ? 'Benachrichtigung' : 'Benachrichtigungen'}`;
    }

    // Wenn es ein Punkt ist, beschreibe den Status basierend auf der Variante
    if (isDot) {
      const statusMap: Record<string, string> = {
        default: 'Status',
        primary: 'Primärer Status',
        success: 'Erfolgsstatus',
        warning: 'Warnstatus',
        error: 'Fehlerstatus',
        info: 'Informationsstatus',
      };
      return statusMap[variant];
    }

    // Standardfall: Verwende den Inhalt
    return typeof children === 'string' ? children : undefined;
  };

  // Bestimme die richtige ARIA-Rolle
  const getAriaRole = () => {
    if (isCounter) return 'status';
    if (isDot) return 'status';
    return 'status'; // Standardrolle
  };

  // Barrierefreiheits-Attribute
  const ariaProps = {
    role: getAriaRole(),
    id: badgeId,
    'aria-label': getAriaLabel(),
    'data-variant': variant,
    'data-size': size,
    'data-testid': 'badge',
    ...(isCounter ? { 'data-counter': 'true' } : {}),
    ...(isDot ? { 'data-dot': 'true', 'aria-hidden': 'true' } : {}),
    ...htmlProps,
  };

  if (isDot) {
    return <span className={badgeClasses} {...ariaProps} />;
  }

  return (
    <span className={badgeClasses} {...ariaProps}>
      {icon && (
        <span className="mr-1" aria-hidden="true">
          {icon}
        </span>
      )}
      {displayContent}
    </span>
  );
};

export default Badge;
