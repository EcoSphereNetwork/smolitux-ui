/**
 * Smolitux Testing Utilities
 *
 * Diese Bibliothek enthält Hilfsfunktionen für das Testen von Smolitux UI Komponenten.
 */

import a11y, { A11yTestOptions, A11yTestResult } from './a11y';
import { registerA11yMatchers, a11yMatchers } from './a11y/matchers';
import { customMatchers } from './customMatchers';
import render from './render';
import * as mocks from './mocks';
import * as helpers from './helpers';
import * as generators from './generators';
import userEvent from './user-events';

// Register custom Jest matchers on import
expect.extend(customMatchers);

export {
  a11y,
  A11yTestOptions,
  A11yTestResult,
  registerA11yMatchers,
  a11yMatchers,
  customMatchers,
  render,
  mocks,
  helpers,
  generators,
  userEvent,
};

export default {
  a11y,
  registerA11yMatchers,
  a11yMatchers,
  render,
  mocks,
  helpers,
  generators,
  userEvent,
};
