import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeUtilities } from './ThemeUtilities';

describe('ThemeUtilities', () => {
  it('renders without crashing', () => {
    render(<ThemeUtilities />);
    expect(screen.getByRole('button', { name: /ThemeUtilities/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ThemeUtilities className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ThemeUtilities ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
