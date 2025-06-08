import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders without crashing', () => {
    render(<UserProfile />);
    expect(screen.getByRole('button', { name: /UserProfile/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<UserProfile className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<UserProfile ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
