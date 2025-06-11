import type { Tokens } from '../tokens';

export function createCssVariables(theme: Tokens): Record<string, string> {
  const vars: Record<string, string> = {};

  const walk = (obj: Record<string, unknown>, path: string[] = []): void => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        walk(value as Record<string, unknown>, [...path, key]);
      } else {
        vars[`--${[...path, key].join('-')}`] = String(value);
      }
    });
  };

  walk(theme);
  return vars;
}

export function applyCssVariables(vars: Record<string, string>, root: HTMLElement = document.documentElement): void {
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
