import React from 'react';
import { a11y } from '@smolitux/testing';
import { Label } from '../Label';

describe('Label a11y', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <Label htmlFor="x">Label</Label>,
    );
    expect(violations).toHaveLength(0);
  });
});
