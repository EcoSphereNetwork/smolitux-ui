import React from 'react';
import { FormControl } from '../../FormControl';
import { FormSuccess } from '../FormSuccess';
import { a11y } from '@smolitux/testing';

describe('FormSuccess Accessibility', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="suc" successMessage="ok" isSuccess>
        <FormSuccess />
        <input id="suc" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
