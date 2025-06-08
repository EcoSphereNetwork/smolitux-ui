import React from 'react';
import { render } from '@testing-library/react';
import { registerA11yMatchers } from '../src';
import { Button } from '@smolitux/core';

// register custom matchers for this test suite
registerA11yMatchers();

describe('custom a11y matchers', () => {
  it('toHaveAriaAttributes works', () => {
    const { getByRole } = render(<Button aria-label="save">Ok</Button>);
    const button = getByRole('button');
    expect(button).toHaveAriaAttributes({ 'aria-label': 'save' });
  });

  it('toBeFocusable works', () => {
    const { getByRole } = render(<Button>Ok</Button>);
    const button = getByRole('button');
    expect(button).toBeFocusable();
  });
});
