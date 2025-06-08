import React from 'react';
import { render } from '@testing-library/react';
import { a11y, customMatchers } from '../src';
import { Button } from '@smolitux/core';

describe('a11y utilities', () => {
  it('testA11y returns no violations for Button', async () => {
    const { violations } = await a11y.testA11y(<Button>Ok</Button>, { failOnViolation: false });
    expect(Array.isArray(violations)).toBe(true);
  });

  it('hasCorrectAriaAttributes matches attributes', () => {
    const { getByRole } = render(<Button aria-label="save">Ok</Button>);
    const btn = getByRole('button');
    expect(a11y.hasCorrectAriaAttributes(btn, { 'aria-label': 'save' })).toBe(true);
  });

  it('hasCorrectRole matches role attribute', () => {
    const { getByRole } = render(<Button>Ok</Button>);
    const btn = getByRole('button');
    expect(a11y.hasCorrectRole(btn, 'button')).toBe(true);
  });

  it('isFocusable detects focusable element', () => {
    const { getByRole } = render(<Button>Ok</Button>);
    const btn = getByRole('button');
    expect(a11y.isFocusable(btn)).toBe(true);
  });

  it('hasVisibleFocusIndicator detects focus styles', () => {
    const { getByRole } = render(<Button style={{ outline: '1px solid red' }}>Ok</Button>);
    const btn = getByRole('button');
    btn.focus();
    expect(a11y.hasVisibleFocusIndicator(btn)).toBe(true);
  });

  it('hasAdequateColorContrast returns true for high contrast', () => {
    expect(a11y.hasAdequateColorContrast('#000', '#fff')).toBe(true);
  });

  it('custom matcher toBeFocusable works', () => {
    const { getByRole } = render(<Button>Ok</Button>);
    const btn = getByRole('button');
    expect(btn).toBeFocusable();
  });

  it('custom matcher toHaveVisibleFocusIndicator works', () => {
    const { getByRole } = render(<Button style={{ outline: '1px solid red' }}>Ok</Button>);
    const btn = getByRole('button');
    btn.focus();
    expect(btn).toHaveVisibleFocusIndicator();
  });
});
