import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders as contentinfo element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Footer className="custom" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('custom');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Footer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('applies variant and color classes', () => {
    render(<Footer variant="colored" color="secondary" data-testid="footer" />);
    const footer = screen.getByTestId('footer');
    expect(footer.className).toMatch('bg-secondary-600');
  });

  it('renders fixed footer when fixed prop is true', () => {
    render(<Footer fixed data-testid="footer" />);
    expect(screen.getByTestId('footer').className).toMatch('fixed');
  });
});
