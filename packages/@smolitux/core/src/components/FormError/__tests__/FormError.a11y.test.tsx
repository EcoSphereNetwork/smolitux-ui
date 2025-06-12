import React from 'react';
import { FormControl } from '../../FormControl';
import { FormError } from '../FormError';
import { a11y } from '@smolitux/testing';

describe('FormError Accessibility', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="err" error="oops" hideError>
        <FormError />
        <input id="err" aria-label="username" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
