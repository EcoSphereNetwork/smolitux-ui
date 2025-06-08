import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaCarousel } from './MediaCarousel';

describe('MediaCarousel', () => {
  it('renders without crashing', () => {
    render(<MediaCarousel />);
    expect(screen.getByRole('button', { name: /MediaCarousel/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MediaCarousel className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MediaCarousel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
