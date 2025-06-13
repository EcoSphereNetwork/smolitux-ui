import React from 'react';
import { a11y } from '@smolitux/testing';
import { FormGroup } from '../FormGroup';

describe('FormGroup a11y', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <FormGroup label="Username" id="fg" labelFor="name">
        <input id="name" aria-label="Username" />
      </FormGroup>
    );
    expect(violations).toHaveLength(0);
  });
});
