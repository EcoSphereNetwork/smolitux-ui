import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../../FormControl';
import { FormHint } from '../FormHint';

describe('FormHint', () => {
  it('renders hint from children', () => {
    render(
      <FormControl id="hint" helperText="use at least 8 chars">
        <FormHint>Custom hint</FormHint>
        <input id="hint" />
      </FormControl>
    );
    expect(screen.getByText('Custom hint')).toBeInTheDocument();
  });
});
