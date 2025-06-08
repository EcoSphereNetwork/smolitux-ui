import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActivityStream } from './ActivityStream';

describe('ActivityStream', () => {
  it('renders without crashing', () => {
    render(<ActivityStream />);
    expect(screen.getByRole('button', { name: /ActivityStream/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ActivityStream className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ActivityStream ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
