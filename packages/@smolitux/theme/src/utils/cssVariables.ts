import type { Tokens } from '../tokens';

export function createCssVariables(theme: Tokens): Record<string, string> {
  const vars: Record<string, string> = {};

  const walk = (obj: Record<string, any>, path: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        walk(value, [...path, key]);
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
