import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeTypen from './ThemeTypen';

describe('ThemeTypen', () => {
  it('renders without crashing', () => {
    render(<ThemeTypen />);
    expect(screen.getByRole('button', { name: /ThemeTypen/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ThemeTypen className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ThemeTypen ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
