import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge />);
    expect(screen.getByRole('button', { name: /Badge/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Badge ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
