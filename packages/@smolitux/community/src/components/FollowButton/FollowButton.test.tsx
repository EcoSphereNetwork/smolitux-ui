import React from 'react';
import { render, screen } from '@testing-library/react';
import { FollowButton } from './FollowButton';

describe('FollowButton', () => {
  it('renders without crashing', () => {
    render(<FollowButton />);
    expect(screen.getByRole('button', { name: /FollowButton/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FollowButton className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FollowButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
