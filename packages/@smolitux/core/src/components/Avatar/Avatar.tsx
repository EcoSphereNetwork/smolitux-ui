// packages/@smolitux/core/src/components/Avatar/Avatar.tsx
import React, { useState } from 'react';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Bildquelle URL */
  src?: string;
  /** Ausweichtext, wenn Bild nicht geladen werden kann */
  alt?: string;
  /** Größe des Avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Platzhaltername (für Avatar ohne Bild) */
  name?: string;
  /** Rahmen hinzufügen */
  bordered?: boolean;
  /** Rahmenfarbe */
  borderColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' | string;
  /** Status */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Benutzerdefinierte Komponente */
  customComponent?: React.ReactNode;
  /** Form des Avatars */
  shape?: 'circle' | 'square' | 'rounded';
  /** Gruppe von Avataren */
  group?: boolean;
  /** Position im Stack (für Gruppen) */
  stackIndex?: number;
}

/**
 * Avatar-Komponente für Benutzer oder Profilbilder
 * 
 * @example
 * ```tsx
 * <Avatar src="/images/profile.jpg" alt="Profilbild" size="md" status="online" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  name,
  bordered = false,
  borderColor = 'gray',
  status,
  customComponent,
  shape = 'circle',
  group = false,
  stackIndex = 0,
  className = '',
  ...rest
}) => {
  // State für Bildladefehler
  const [imgError, setImgError] = useState(false);
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-20 w-20 text-xl'
  };
  
  // Status-spezifische Klassen
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  // Form-spezifische Klassen
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md'
  };
  
  // Gruppen-spezifische Klassen und Stile
  const groupStyles = group ? {
    marginLeft: stackIndex > 0 ? `-${stackIndex * 8}px` : '0',
    zIndex: 10 - stackIndex
  } : {};
  
  // Border-Farben
  const getBorderColorClass = () => {
    // Predefined colors
    const colorMap: Record<string, string> = {
      primary: 'border-primary-500 dark:border-primary-600',
      secondary: 'border-secondary-500 dark:border-secondary-600',
      success: 'border-green-500 dark:border-green-600',
      warning: 'border-yellow-500 dark:border-yellow-600',
      error: 'border-red-500 dark:border-red-600',
      info: 'border-blue-500 dark:border-blue-600',
      gray: 'border-gray-200 dark:border-gray-700'
    };
    
    return colorMap[borderColor] || `border-${borderColor}`;
  };
  
  // Generiere Initialen aus dem Namen
  const getInitials = () => {
    if (!name) return '';
    
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  // Bestimme Hintergrundfarbe für Platzhalter basierend auf dem Namen
  const getBackgroundColor = () => {
    if (!name) return 'bg-gray-300 dark:bg-gray-600';
    
    // Einfache Hash-Funktion für Namen
    const hash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Liste von Farben
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-teal-500'
    ];
    
    return colors[hash % colors.length];
  };
  
  // Basis-Klassen für den Avatar
  const avatarClasses = [
    'relative inline-flex items-center justify-center overflow-hidden',
    sizeClasses[size],
    shapeClasses[shape],
    bordered ? `border-2 ${getBorderColorClass()}` : '',
    'bg-gray-200 dark:bg-gray-700',
    group ? 'ring-2 ring-white dark:ring-gray-800' : '',
    className
  ].join(' ');
  
  return (
    <div className={avatarClasses} style={groupStyles} {...rest}>
      {/* Custom Component */}
      {customComponent && (
        <div className="w-full h-full">{customComponent}</div>
      )}
      
      {/* Bild */}
      {!customComponent && src && !imgError && (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover" 
          onError={() => setImgError(true)}
        />
      )}
      
      {/* Fallback: Initialen oder Platzhalter */}
      {(!src || imgError) && !customComponent && (
        <div className={`h-full w-full flex items-center justify-center text-white ${getBackgroundColor()}`}>
          {name ? getInitials() : (
            <svg className="h-1/2 w-1/2 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      )}
      
      {/* Status-Indikator */}
      {status && (
        <span className={`absolute bottom-0 right-0 block h-${size === 'xs' || size === 'sm' ? '2' : '3'} w-${size === 'xs' || size === 'sm' ? '2' : '3'} rounded-full ring-2 ring-white dark:ring-gray-800 ${statusClasses[status]}`} />
      )}
    </div>
  );
};

export default Avatar;
