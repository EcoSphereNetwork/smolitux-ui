import React from 'react';
import { render, screen } from '@testing-library/react';
import { Carousel.original } from './Carousel.original';

describe('Carousel.original', () => {
  it('renders without crashing', () => {
    render(<Carousel.original />);
    expect(screen.getByRole('button', { name: /Carousel.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Carousel.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Carousel.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
