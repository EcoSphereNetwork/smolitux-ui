import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slide } from './Slide';

describe('Slide', () => {
  it('renders without crashing', () => {
    render(<Slide />);
    expect(screen.getByRole('button', { name: /Slide/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Slide className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Slide ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
