import React, { forwardRef, Children, cloneElement } from 'react';
import type { ResponsiveProp } from '../../types';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Anordnung der Elemente */
  direction?: ResponsiveProp<'vertical' | 'horizontal'>;
  /** Abstand zwischen den Elementen */
  spacing?: ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  /** Trenn-Element zwischen den Kindern */
  divider?: React.ReactElement;
}

const getClasses = <T extends string | number>(
  prop: ResponsiveProp<T> | undefined,
  prefix: string,
  map?: Record<string, string>
) => {
  if (prop === undefined) return '';
  const convert = (value: any) => (map ? map[value] || value : value);
  if (typeof prop === 'object') {
    return Object.entries(prop)
      .map(([bp, val]) => `${bp}:${prefix}-${convert(val)}`)
      .join(' ');
  }
  return `${prefix}-${convert(prop)}`;
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      spacing = 0,
      divider,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const directionClasses = getClasses(direction, 'flex', {
      vertical: 'col',
      horizontal: 'row',
    });
    const gapClasses = getClasses(spacing, 'gap');

    const classes = ['flex', directionClasses, gapClasses, className]
      .filter(Boolean)
      .join(' ');

    const content = divider
      ? Children.toArray(children).flatMap((child, index, arr) =>
          index < arr.length - 1
            ? [child, cloneElement(divider, { key: `divider-${index}` })]
            : [child]
        )
      : children;

    return (
      <div ref={ref} className={classes} {...rest}>
        {content}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

export default Stack;
