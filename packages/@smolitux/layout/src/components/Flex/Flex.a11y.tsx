import React, { forwardRef } from 'react';
import { Flex, type FlexProps } from './Flex';

export interface FlexA11yProps extends FlexProps {
  as?:
    | 'div'
    | 'section'
    | 'article'
    | 'main'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav'
    | 'form'
    | 'fieldset';
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaOwns?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean;
  ariaHidden?: boolean;
  ariaLive?: 'polite' | 'assertive' | 'off';
  ariaRelevant?: string;
  ariaAtomic?: boolean;
  ariaBusy?: boolean;
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  ariaRoledescription?: string;
  ariaKeyshortcuts?: string;
  ariaSetsize?: number;
  ariaPosinset?: number;
  ariaLevel?: number;
  tabIndex?: number;
}

export const FlexA11y = forwardRef<HTMLDivElement, FlexA11yProps>(
  (
    {
      as = 'div',
      role,
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      ariaOwns,
      ariaControls,
      ariaExpanded,
      ariaHaspopup,
      ariaHidden,
      ariaLive,
      ariaRelevant,
      ariaAtomic,
      ariaBusy,
      ariaCurrent,
      ariaRoledescription,
      ariaKeyshortcuts,
      ariaSetsize,
      ariaPosinset,
      ariaLevel,
      tabIndex,
      ...flexProps
    },
    ref
  ) => {
    const Component = as as keyof JSX.IntrinsicElements;

    const ariaProps = {
      role,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-owns': ariaOwns,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-hidden': ariaHidden,
      'aria-live': ariaLive,
      'aria-relevant': ariaRelevant,
      'aria-atomic': ariaAtomic,
      'aria-busy': ariaBusy,
      'aria-current': ariaCurrent,
      'aria-roledescription': ariaRoledescription,
      'aria-keyshortcuts': ariaKeyshortcuts,
      'aria-setsize': ariaSetsize,
      'aria-posinset': ariaPosinset,
      'aria-level': ariaLevel,
      tabIndex,
    } as Record<string, unknown>;

    Object.keys(ariaProps).forEach((key) => ariaProps[key] === undefined && delete ariaProps[key]);

    return (
      <Component ref={ref} {...ariaProps}>
        <Flex {...flexProps} />
      </Component>
    );
  }
);

FlexA11y.displayName = 'FlexA11y';

export default FlexA11y;
