// Breakpoint names
export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Responsive object
export type ResponsiveObject<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

// Responsive value
export type ResponsiveValue<T> = T | ResponsiveObject<T>;

// Responsive styles
export type ResponsiveStyles<T> = {
  [K in keyof T]?: ResponsiveValue<T[K]>;
};
