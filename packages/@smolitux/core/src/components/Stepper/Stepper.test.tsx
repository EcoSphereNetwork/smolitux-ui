import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('renders without crashing', () => {
    render(<Stepper />);
    expect(screen.getByRole('button', { name: /Stepper/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Stepper className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Stepper ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
