import React from 'react';
import { render, screen } from '@testing-library/react';
import { Motion } from './Motion';

describe('Motion', () => {
  it('renders without crashing', () => {
    render(<Motion />);
    expect(screen.getByRole('button', { name: /Motion/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Motion className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Motion ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
