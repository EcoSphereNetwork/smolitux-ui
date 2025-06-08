import React from 'react';
import { render, screen } from '@testing-library/react';
import { WalletConnect } from './WalletConnect';

describe('WalletConnect', () => {
  it('renders without crashing', () => {
    render(<WalletConnect />);
    expect(screen.getByRole('button', { name: /WalletConnect/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<WalletConnect className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<WalletConnect ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
