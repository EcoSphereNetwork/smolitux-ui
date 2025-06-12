import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../../FormControl';
import { FormError } from '../FormError';

describe('FormError', () => {
  it('renders error when context has error', () => {
    render(
      <FormControl id="err" error="Required field">
        <FormError />
        <input id="err" />
      </FormControl>
    );
    const err = screen.getByRole('alert');
    expect(err).toHaveTextContent('Required field');
    expect(err).toHaveAttribute('id', 'err-error');
  });
});
