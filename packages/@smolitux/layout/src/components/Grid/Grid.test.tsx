import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders without crashing', () => {
    render(<Grid data-testid="grid" />);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Grid data-testid="grid" className="custom-class" />);
    expect(screen.getByTestId('grid')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
