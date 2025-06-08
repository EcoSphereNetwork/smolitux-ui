import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast.original } from './Toast.original';

describe('Toast.original', () => {
  it('renders without crashing', () => {
    render(<Toast.original />);
    expect(screen.getByRole('button', { name: /Toast.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toast.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Toast.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
