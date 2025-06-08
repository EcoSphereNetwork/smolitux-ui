import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('button', { name: /Input/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
