import { isFocusable, hasVisibleFocusIndicator } from './a11y';

export const customMatchers = {
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
  toHaveVisibleFocusIndicator(received: Element) {
    const pass = hasVisibleFocusIndicator(received);
    return {
      pass,
      message: () =>
        pass
          ? 'expected element not to have a visible focus indicator'
          : 'expected element to have a visible focus indicator',
    };
  },
};
