# @smolitux/testing Status

This document tracks the progress of the testing utilities package.

## Coverage Overview

| Metric     | Value                |
|------------|----------------------|
| Utilities  | 10 modules           |
| Tests      | 11/11 (100%)         |
| Stories    | 1/1 (100%)           |

The package provides accessibility helpers and file mocks. All utilities are fully tested and have accompanying Storybook examples.

## Last Update
- 2025-06-12 – Custom Jest matchers added for ARIA attributes and focusability.
- 2025-06-16 – Added global config utility.

## Paketübersicht
Dieser Bericht fasst den aktuellen Stand des Pakets **@smolitux/testing** zusammen.

| Utility | Tests | Status |
| ------- | ----- | ------ |
| testA11y | ✅ | Ready |
| hasCorrectAriaAttributes | ✅ | Ready |
| hasCorrectRole | ✅ | Ready |
| isFocusable | ✅ | Ready |
| hasVisibleFocusIndicator | ✅ | Ready |
| hasAdequateColorContrast | ✅ | Ready |
| Custom Jest Matchers | ✅ | Ready |
| Global Config | ✅ | Ready |

Die Test-Utilities wurden mit Komponenten aus `@smolitux/core` validiert und können in allen Paketen verwendet werden.

*Letzte Aktualisierung: 2025-06-16*
