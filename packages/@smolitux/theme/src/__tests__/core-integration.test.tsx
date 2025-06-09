import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../providers/ThemeProvider';
import Button from '../../../core/src/components/Button';

describe('core integration', () => {
  test('Button renders inside ThemeProvider', () => {
    render(
      <ThemeProvider>
        <Button>click</Button>
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('click');
  });
});
