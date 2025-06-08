import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders without crashing', () => {
    render(<Radio />);
    expect(screen.getByRole('button', { name: /Radio/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Radio className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Radio ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
