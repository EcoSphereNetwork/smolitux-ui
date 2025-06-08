import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostView } from './PostView';

describe('PostView', () => {
  it('renders without crashing', () => {
    render(<PostView />);
    expect(screen.getByRole('button', { name: /PostView/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PostView className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PostView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
