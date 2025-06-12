import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../../FormControl';
import { FormSuccess } from '../FormSuccess';

describe('FormSuccess', () => {
  it('renders success message from context', () => {
    render(
      <FormControl id="suc" successMessage="Looks good" isSuccess>
        <FormSuccess />
        <input id="suc" />
      </FormControl>
    );
    const success = screen.getByRole('status');
    expect(success).toHaveTextContent('Looks good');
    expect(success).toHaveAttribute('id', 'suc-success');
  });
});
