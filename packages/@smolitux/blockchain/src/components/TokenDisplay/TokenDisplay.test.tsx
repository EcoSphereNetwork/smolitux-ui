import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenDisplay } from './TokenDisplay';

describe('TokenDisplay', () => {
  it('renders without crashing', () => {
    render(<TokenDisplay />);
    expect(screen.getByRole('button', { name: /TokenDisplay/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TokenDisplay className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TokenDisplay ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
