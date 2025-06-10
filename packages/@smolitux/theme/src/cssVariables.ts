import { Theme } from './theme-types';

export function createCssVariables(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};

  Object.entries(theme.colors).forEach(([name, value]) => {
    if (typeof value === 'string') {
      vars[`--color-${name}`] = value;
    } else {
      Object.entries(value).forEach(([shade, hex]) => {
        vars[`--color-${name}-${shade}`] = hex;
      });
    }
  });

  Object.entries(theme.spacing).forEach(([key, val]) => {
    vars[`--spacing-${key}`] = val;
  });

  return vars;
}

export function applyCssVariables(vars: Record<string, string>, root: HTMLElement = document.documentElement): void {
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
