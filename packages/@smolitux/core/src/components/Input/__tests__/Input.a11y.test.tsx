import React from 'react';
import { a11y } from '@smolitux/testing';
import { Input } from '../Input';

describe('Input a11y', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <Input value="" onChange={() => {}} aria-label="name" />,
    );
    expect(violations).toHaveLength(0);
  });
});
