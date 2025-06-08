import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileHeader } from './ProfileHeader';

describe('ProfileHeader', () => {
  it('renders without crashing', () => {
    render(<ProfileHeader />);
    expect(screen.getByRole('button', { name: /ProfileHeader/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProfileHeader className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProfileHeader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
