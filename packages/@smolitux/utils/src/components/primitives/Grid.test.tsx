import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders without crashing', () => {
    render(<Grid />);
    expect(screen.getByRole('button', { name: /Grid/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Grid className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
