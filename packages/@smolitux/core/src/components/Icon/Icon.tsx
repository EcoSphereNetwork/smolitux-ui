import React, { forwardRef, useId } from 'react';
import { cn } from '@smolitux/utils';

export const iconPaths = {
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  info: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  alert: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.42 0z"
    />
  ),
  'arrow-left': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  ),
} as const;

export type IconName = keyof typeof iconPaths;

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'color'> {
  /** Icon name */
  name: IconName;
  /** Icon size */
  size?: number | string;
  /** Stroke color */
  color?: string;
  /** Hide from accessibility tree */
  ariaHidden?: boolean;
  /** Accessible title */
  title?: string;
  /** ARIA role */
  role?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 24,
      color = 'currentColor',
      ariaHidden = true,
      title,
      role,
      className,
      ...rest
    },
    ref,
  ) => {
    const Path = iconPaths[name];
    const id = useId();

    if (!Path) {
      return <span ref={ref as any} {...rest} />;
    }

    const titleId = title ? `${name}-title-${id}` : undefined;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        aria-hidden={title ? undefined : ariaHidden}
        aria-labelledby={title ? titleId : undefined}
        role={role || (title ? 'img' : 'presentation')}
        className={cn(className)}
        data-icon={name}
        data-testid="icon"
        {...rest}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        {Path}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
