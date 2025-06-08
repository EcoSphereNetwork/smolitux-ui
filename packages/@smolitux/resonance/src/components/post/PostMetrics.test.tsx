import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostMetrics } from './PostMetrics';

describe('PostMetrics', () => {
  it('renders without crashing', () => {
    render(<PostMetrics />);
    expect(screen.getByRole('button', { name: /PostMetrics/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PostMetrics className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PostMetrics ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
