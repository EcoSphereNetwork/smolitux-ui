import React from 'react';
import { FormControl } from '../../FormControl';
import { FormError } from '../FormError';
import { a11y } from '@smolitux/testing';

describe('FormError Accessibility', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="err" error="oops">
        <FormError />
        <input id="err" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
