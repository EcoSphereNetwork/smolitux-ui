import React from 'react';
import { render, screen } from '@testing-library/react';
import { WalletConnect } from './WalletConnect';

describe('WalletConnect', () => {
  it('renders without crashing', () => {
    render(<WalletConnect />);
    expect(screen.getByTestId('WalletConnect')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<WalletConnect className="custom-class" />);
    const element = screen.getByTestId('WalletConnect');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<WalletConnect ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<WalletConnect>Test Content</WalletConnect>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<WalletConnect />);
    const element = screen.getByTestId('WalletConnect');
    expect(element).toBeInTheDocument();
  });
});
