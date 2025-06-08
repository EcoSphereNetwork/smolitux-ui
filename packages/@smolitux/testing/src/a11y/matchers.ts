import { hasCorrectAriaAttributes, isFocusable } from './index';

export const a11yMatchers = {
  toHaveAriaAttributes(received: Element, attributes: Record<string, string>) {
    const pass = hasCorrectAriaAttributes(received, attributes);
    return {
      pass,
      message: () =>
        pass
          ? `expected element not to have ARIA attributes ${JSON.stringify(attributes)}`
          : `expected element to have ARIA attributes ${JSON.stringify(attributes)}`,
    };
  },
  toBeFocusable(received: Element) {
    const pass = isFocusable(received);
    return {
      pass,
      message: () =>
        pass
          ? 'expected element not to be focusable'
          : 'expected element to be focusable',
    };
  },
};

export function registerA11yMatchers(): void {
  expect.extend(a11yMatchers);
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAriaAttributes(attributes: Record<string, string>): R;
      toBeFocusable(): R;
    }
  }
}
