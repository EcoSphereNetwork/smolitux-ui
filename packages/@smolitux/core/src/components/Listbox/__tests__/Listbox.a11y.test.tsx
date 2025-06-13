import React from 'react';
import { a11y } from '@smolitux/testing';
import { Listbox } from '../Listbox';

const options = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
];

describe('Listbox a11y', () => {
  it('has no violations', async () => {
    const { violations } = await a11y.testA11y(
      <Listbox value="1" onChange={() => {}} options={options} aria-label="lb" />,
    );
    expect(violations).toHaveLength(0);
  });
});
