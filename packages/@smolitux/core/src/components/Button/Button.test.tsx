import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
    expect(screen.getByRole('button', { name: /Button/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
