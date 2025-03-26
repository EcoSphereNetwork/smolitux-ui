import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnect } from '../WalletConnect';

describe('WalletConnect', () => {
  it('renders without crashing', () => {
    render(<WalletConnect />);
    
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('shows connect button when not connected', () => {
    render(<WalletConnect />);
    
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
  });

  it('shows wallet address when connected', () => {
    const mockAddress = '0x1234...5678';
    render(<WalletConnect isConnected={true} walletAddress={mockAddress} />);
    
    expect(screen.getByText(mockAddress)).toBeInTheDocument();
  });

  it('calls onConnect when connect button is clicked', () => {
    const mockOnConnect = jest.fn();
    render(<WalletConnect onConnect={mockOnConnect} />);
    
    fireEvent.click(screen.getByRole('button', { name: /connect wallet/i }));
    
    expect(mockOnConnect).toHaveBeenCalledTimes(1);
  });

  it('calls onDisconnect when disconnect button is clicked', () => {
    const mockOnDisconnect = jest.fn();
    render(
      <WalletConnect 
        isConnected={true} 
        walletAddress="0x1234...5678" 
        onDisconnect={mockOnDisconnect} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /disconnect/i }));
    
    expect(mockOnDisconnect).toHaveBeenCalledTimes(1);
  });
});