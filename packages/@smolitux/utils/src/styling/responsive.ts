// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Media query creator
export const createMediaQuery = (breakpoint: keyof typeof breakpoints | string) => {
  const minWidth = breakpoints[breakpoint as keyof typeof breakpoints] || breakpoint;
  return `@media (min-width: ${minWidth})`;
};

// Responsive style creator
export const responsive = <T extends Record<string, unknown>>(
  styles: T,
  breakpoint: keyof typeof breakpoints | string
) => {
  const mediaQuery = createMediaQuery(breakpoint);
  return { [mediaQuery]: styles };
};

// Responsive utilities
export const sm = <T extends Record<string, unknown>>(styles: T) => responsive(styles, 'sm');
export const md = <T extends Record<string, unknown>>(styles: T) => responsive(styles, 'md');
export const lg = <T extends Record<string, unknown>>(styles: T) => responsive(styles, 'lg');
export const xl = <T extends Record<string, unknown>>(styles: T) => responsive(styles, 'xl');
export const xxl = <T extends Record<string, unknown>>(styles: T) => responsive(styles, '2xl');

// Create responsive object with all breakpoints
export const createResponsiveStyles = <T>(
  property: string,
  values: { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }
) => {
  const styles: Record<string, unknown> = {};
  
  if (values.base !== undefined) {
    styles[property] = values.base;
  }
  
  if (values.sm !== undefined) {
    styles[createMediaQuery('sm')] = { [property]: values.sm };
  }
  
  if (values.md !== undefined) {
    styles[createMediaQuery('md')] = { [property]: values.md };
  }
  
  if (values.lg !== undefined) {
    styles[createMediaQuery('lg')] = { [property]: values.lg };
  }
  
  if (values.xl !== undefined) {
    styles[createMediaQuery('xl')] = { [property]: values.xl };
  }
  
  if (values['2xl'] !== undefined) {
    styles[createMediaQuery('2xl')] = { [property]: values['2xl'] };
  }
  
  return styles;
};