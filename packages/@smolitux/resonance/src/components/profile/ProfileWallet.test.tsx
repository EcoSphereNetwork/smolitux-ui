import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileWallet } from './ProfileWallet';

describe('ProfileWallet', () => {
  it('renders without crashing', () => {
    render(<ProfileWallet />);
    expect(screen.getByRole('button', { name: /ProfileWallet/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProfileWallet className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProfileWallet ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
