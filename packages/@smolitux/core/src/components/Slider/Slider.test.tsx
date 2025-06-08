import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders without crashing', () => {
    render(<Slider />);
    expect(screen.getByRole('button', { name: /Slider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Slider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Slider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
