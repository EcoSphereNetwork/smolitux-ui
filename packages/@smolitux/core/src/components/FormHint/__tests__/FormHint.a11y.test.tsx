import React from 'react';
import { FormControl } from '../../FormControl';
import { FormHint } from '../FormHint';
import { a11y } from '@smolitux/testing';

describe('FormHint Accessibility', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="hint" helperText="help" hideHelperText>
        <FormHint>help</FormHint>
        <input id="hint" aria-label="hint" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
