import React from 'react';
import { render, screen } from '@testing-library/react';
import Providers from '../src/providers';
import { MockButton } from '../src/mocks';

describe('Providers wrapper', () => {
  it('wraps children', () => {
    render(
      <Providers>
        <MockButton>Text</MockButton>
      </Providers>
    );
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
  });
});
