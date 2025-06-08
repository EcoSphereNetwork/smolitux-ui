import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostInteractions } from './PostInteractions';

describe('PostInteractions', () => {
  it('renders without crashing', () => {
    render(<PostInteractions />);
    expect(screen.getByRole('button', { name: /PostInteractions/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PostInteractions className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PostInteractions ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
