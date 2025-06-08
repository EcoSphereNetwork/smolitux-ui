/**
 * Smolitux Testing Utilities
 *
 * Diese Bibliothek enthält Hilfsfunktionen für das Testen von Smolitux UI Komponenten.
 */

import a11y, { A11yTestOptions, A11yTestResult } from './a11y';
export { registerA11yMatchers, a11yMatchers } from './a11y/matchers';

export { a11y, A11yTestOptions, A11yTestResult };

export default {
  a11y,
  registerA11yMatchers,
  a11yMatchers,
};
