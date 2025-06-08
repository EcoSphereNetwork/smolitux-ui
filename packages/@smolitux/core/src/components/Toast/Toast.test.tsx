import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders without crashing', () => {
    render(<Toast />);
    expect(screen.getByRole('button', { name: /Toast/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toast className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Toast ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
