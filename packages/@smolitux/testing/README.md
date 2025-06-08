# @smolitux/testing

<!-- truncated earlier content-->
```tsx
const hasContrast = a11y.hasAdequateColorContrast('#ffffff', '#2563eb', false);
```

### Custom Matchers

Richte optionale Jest-Matcher ein, um die Utilities komfortabler zu nutzen:

```tsx
import { registerA11yMatchers } from '@smolitux/testing';

// vor deinen Tests ausführen
registerA11yMatchers();

expect(element).toHaveAriaAttributes({ 'aria-label': 'save' });
expect(element).toBeFocusable();
```

### Custom Jest Matchers

Beim Import dieses Pakets werden zusätzliche Jest-Matcher registriert.

```tsx
import { render } from '@testing-library/react';
import { Button } from '@smolitux/core';
import '@smolitux/testing';

test('button is focusable with matcher', () => {
  const { getByRole } = render(<Button>Ok</Button>);
  expect(getByRole('button')).toBeFocusable();
});
```

## Lizenz

MIT
