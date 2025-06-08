import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme-Typen } from './Theme-Typen';

describe('Theme-Typen', () => {
  it('renders without crashing', () => {
    render(<Theme-Typen />);
    expect(screen.getByRole('button', { name: /Theme-Typen/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Theme-Typen className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Theme-Typen ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
