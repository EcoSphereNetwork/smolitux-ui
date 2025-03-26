// Spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Get spacing value
export const getSpacing = (value: number | string): string => {
  if (typeof value === 'string') return value;
  return spacing[value as keyof typeof spacing] || `${value}px`;
};

// Create spacing utilities
export const createSpacing = (
  property: string,
  value: number | string
): Record<string, string> => {
  const spacingValue = getSpacing(value);
  return { [property]: spacingValue };
};

// Margin utilities
export const m = (value: number | string) => createSpacing('margin', value);
export const mt = (value: number | string) => createSpacing('marginTop', value);
export const mr = (value: number | string) => createSpacing('marginRight', value);
export const mb = (value: number | string) => createSpacing('marginBottom', value);
export const ml = (value: number | string) => createSpacing('marginLeft', value);
export const mx = (value: number | string) => ({
  marginLeft: getSpacing(value),
  marginRight: getSpacing(value),
});
export const my = (value: number | string) => ({
  marginTop: getSpacing(value),
  marginBottom: getSpacing(value),
});

// Padding utilities
export const p = (value: number | string) => createSpacing('padding', value);
export const pt = (value: number | string) => createSpacing('paddingTop', value);
export const pr = (value: number | string) => createSpacing('paddingRight', value);
export const pb = (value: number | string) => createSpacing('paddingBottom', value);
export const pl = (value: number | string) => createSpacing('paddingLeft', value);
export const px = (value: number | string) => ({
  paddingLeft: getSpacing(value),
  paddingRight: getSpacing(value),
});
export const py = (value: number | string) => ({
  paddingTop: getSpacing(value),
  paddingBottom: getSpacing(value),
});