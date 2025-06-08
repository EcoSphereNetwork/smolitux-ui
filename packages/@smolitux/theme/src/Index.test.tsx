import React from 'react';
import { render, screen } from '@testing-library/react';
import { Index } from './Index';

describe('Index', () => {
  it('renders without crashing', () => {
    render(<Index />);
    expect(screen.getByRole('button', { name: /Index/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Index className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Index ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
