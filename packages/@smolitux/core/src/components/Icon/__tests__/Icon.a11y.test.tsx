import React from 'react';
import { a11y } from '@smolitux/testing';
import { Icon } from '../Icon';

describe('Icon a11y', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(<Icon name="check" title="check" />);
    expect(violations).toHaveLength(0);
  });
});
