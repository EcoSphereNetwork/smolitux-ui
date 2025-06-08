import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedView } from './FeedView';

describe('FeedView', () => {
  it('renders without crashing', () => {
    render(<FeedView />);
    expect(screen.getByRole('button', { name: /FeedView/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FeedView className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FeedView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
