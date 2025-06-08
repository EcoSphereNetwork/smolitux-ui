// Font families
export const fontFamily = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

// Font sizes
export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

// Font weights
export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Line heights
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  3: '.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
};

// Letter spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// Text utilities
export const createFontSize = (size: keyof typeof fontSize | string) => ({
  fontSize: fontSize[size as keyof typeof fontSize] || size,
});

export const createFontWeight = (weight: keyof typeof fontWeight | number) => ({
  fontWeight: fontWeight[weight as keyof typeof fontWeight] || weight,
});

export const createLineHeight = (height: keyof typeof lineHeight | string | number) => ({
  lineHeight: lineHeight[height as keyof typeof lineHeight] || height,
});

export const createLetterSpacing = (spacing: keyof typeof letterSpacing | string) => ({
  letterSpacing: letterSpacing[spacing as keyof typeof letterSpacing] || spacing,
});

// Text truncation
export const truncate = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

// Text alignment
export const textAlign = {
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
};

// Text transformation
export const textTransform = {
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
  normalCase: { textTransform: 'none' },
};
