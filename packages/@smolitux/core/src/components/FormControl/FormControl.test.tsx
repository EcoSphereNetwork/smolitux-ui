import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from './FormControl';

describe('FormControl', () => {
  it('renders without crashing', () => {
    render(<FormControl />);
    expect(screen.getByRole('button', { name: /FormControl/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FormControl className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FormControl ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
