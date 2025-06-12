import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../../FormControl';
import { FormLabel } from '../FormLabel';

describe('FormLabel', () => {
  it('renders label from children', () => {
    render(
      <FormControl id="test" required>
        <FormLabel>Username</FormLabel>
        <input id="test" />
      </FormControl>
    );
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test');
    expect(screen.getByText('(erforderlich)')).toHaveClass('sr-only');
  });
});
