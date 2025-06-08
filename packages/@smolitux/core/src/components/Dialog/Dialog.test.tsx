import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders without crashing', () => {
    render(<Dialog />);
    expect(screen.getByRole('button', { name: /Dialog/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Dialog className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Dialog ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
