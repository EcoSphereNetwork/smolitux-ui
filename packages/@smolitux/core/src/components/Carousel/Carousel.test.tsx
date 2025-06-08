import React from 'react';
import { render, screen } from '@testing-library/react';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  it('renders without crashing', () => {
    render(<Carousel />);
    expect(screen.getByRole('button', { name: /Carousel/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Carousel className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Carousel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
