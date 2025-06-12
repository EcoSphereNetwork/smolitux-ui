import React from 'react';
import { FormControl } from '../../FormControl';
import { FormLabel } from '../FormLabel';
import { a11y } from '@smolitux/testing';

describe('FormLabel Accessibility', () => {
  it('should have no a11y violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormControl id="test" label="Name">
        <FormLabel>Username</FormLabel>
        <input id="test" />
      </FormControl>
    );
    expect(violations).toHaveLength(0);
  });
});
