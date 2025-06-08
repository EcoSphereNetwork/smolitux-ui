import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommentSection } from './CommentSection';

describe('CommentSection', () => {
  it('renders without crashing', () => {
    render(<CommentSection />);
    expect(screen.getByRole('button', { name: /CommentSection/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CommentSection className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<CommentSection ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
