import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack data-testid="stack">
        <span>One</span>
        <span>Two</span>
      </Stack>
    );

    expect(screen.getByTestId('stack')).toBeInTheDocument();
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Stack className="custom" data-testid="stack" />);
    expect(screen.getByTestId('stack')).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stack ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
