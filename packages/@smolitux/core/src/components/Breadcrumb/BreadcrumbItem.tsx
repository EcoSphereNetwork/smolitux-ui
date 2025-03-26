// packages/@smolitux/core/src/components/Breadcrumb/BreadcrumbItem.tsx
import React, { forwardRef } from 'react';
import { BreadcrumbItemProps } from './Breadcrumb';

/**
 * BreadcrumbItem-Komponente für die Verwendung innerhalb der Breadcrumb-Komponente
 * 
 * @example
 * ```tsx
 * <BreadcrumbItem href="/home">Home</BreadcrumbItem>
 * <BreadcrumbItem isCurrentPage>Current Page</BreadcrumbItem>
 * ```
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(({
  children,
  href,
  icon,
  isCurrentPage,
  className = '',
  ...rest
}, ref) => {
  // Diese Komponente wird nicht direkt gerendert, sondern von der Breadcrumb-Komponente verarbeitet
  return null;
});

BreadcrumbItem.displayName = 'BreadcrumbItem';