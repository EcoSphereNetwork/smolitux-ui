import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockButton, MockInput } from '../src/mocks';

describe('mock components', () => {
  it('renders MockButton', () => {
    render(<MockButton>Click</MockButton>);
    expect(screen.getByTestId('mock-button')).toHaveTextContent('Click');
  });

  it('renders MockInput', () => {
    render(<MockInput placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });
});
