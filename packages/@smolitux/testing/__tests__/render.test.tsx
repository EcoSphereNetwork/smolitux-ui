import React from 'react';
import { screen } from '@testing-library/react';
import render from '../src/render';
import { MockButton } from '../src/mocks';

describe('render utility', () => {
  it('renders component with ThemeProvider', () => {
    render(<MockButton>Ok</MockButton>);
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
  });
});
