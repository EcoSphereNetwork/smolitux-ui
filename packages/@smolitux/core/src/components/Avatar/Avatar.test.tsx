import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    render(<Avatar />);
    expect(screen.getByRole('button', { name: /Avatar/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Avatar className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
