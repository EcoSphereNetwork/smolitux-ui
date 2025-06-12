import React from 'react';
import { FormControl } from '../../FormControl';
import { FormSuccess } from '../FormSuccess';
import { a11y } from '@smolitux/testing';

describe('FormSuccess Accessibility', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="suc" successMessage="ok" isSuccess hideSuccessMessage>
        <FormSuccess />
        <input id="suc" aria-label="username" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
