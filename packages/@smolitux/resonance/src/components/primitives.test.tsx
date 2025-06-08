import React from 'react';
import { render, screen } from '@testing-library/react';
import { primitives } from './primitives';

describe('primitives', () => {
  it('renders without crashing', () => {
    render(<primitives />);
    expect(screen.getByRole('button', { name: /primitives/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<primitives className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<primitives ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
