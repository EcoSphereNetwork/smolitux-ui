import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileWallet } from './ProfileWallet';

describe('ProfileWallet', () => {
  const mockWallet = {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    balance: '1250.75',
    currency: 'SMX',
    transactions: [
      {
        id: 'tx1',
        type: 'receive',
        amount: '500',
        from: '0xabcdef',
        to: '0x1234',
        timestamp: '2025-03-15T10:30:00Z',
        status: 'completed',
      },
      {
        id: 'tx2',
        type: 'send',
        amount: '200',
        from: '0x1234',
        to: '0xabcdef',
        timestamp: '2025-03-14T14:20:00Z',
        status: 'completed',
      },
      {
        id: 'tx3',
        type: 'stake',
        amount: '300',
        from: '0x1234',
        timestamp: '2025-03-13T09:15:00Z',
        status: 'completed',
      },
    ],
    rewards: [
      { id: 'r1', type: 'post', amount: '10', timestamp: '2025-03-15T08:30:00Z' },
      { id: 'r2', type: 'comment', amount: '5', timestamp: '2025-03-14T16:45:00Z' },
    ],
  };

  it('renders correctly with default props', () => {
    render(<ProfileWallet wallet={mockWallet} />);

    expect(screen.getByText('1250.75 SMX')).toBeInTheDocument();
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument();
  });

  it('displays transaction history', () => {
    render(<ProfileWallet wallet={mockWallet} />);

    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('500 SMX')).toBeInTheDocument();
    expect(screen.getByText('200 SMX')).toBeInTheDocument();
    expect(screen.getByText('300 SMX')).toBeInTheDocument();
  });

  it('displays reward history', () => {
    render(<ProfileWallet wallet={mockWallet} showRewards />);

    expect(screen.getByText('Reward History')).toBeInTheDocument();
    expect(screen.getByText('10 SMX')).toBeInTheDocument();
    expect(screen.getByText('5 SMX')).toBeInTheDocument();
  });

  it('calls onSend when send button is clicked', () => {
    const handleSend = jest.fn();
    render(<ProfileWallet wallet={mockWallet} onSend={handleSend} />);

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    expect(handleSend).toHaveBeenCalled();
  });

  it('calls onReceive when receive button is clicked', () => {
    const handleReceive = jest.fn();
    render(<ProfileWallet wallet={mockWallet} onReceive={handleReceive} />);

    const receiveButton = screen.getByText('Receive');
    fireEvent.click(receiveButton);

    expect(handleReceive).toHaveBeenCalled();
  });

  it('calls onStake when stake button is clicked', () => {
    const handleStake = jest.fn();
    render(<ProfileWallet wallet={mockWallet} onStake={handleStake} />);

    const stakeButton = screen.getByText('Stake');
    fireEvent.click(stakeButton);

    expect(handleStake).toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(
      <ProfileWallet wallet={mockWallet} className="custom-wallet" data-testid="profile-wallet" />
    );

    const profileWallet = screen.getByTestId('profile-wallet');
    expect(profileWallet).toHaveClass('custom-wallet');
  });

  it('renders with custom style', () => {
    render(
      <ProfileWallet
        wallet={mockWallet}
        style={{ backgroundColor: 'lightblue' }}
        data-testid="profile-wallet"
      />
    );

    const profileWallet = screen.getByTestId('profile-wallet');
    expect(profileWallet).toHaveStyle('background-color: lightblue');
  });

  it('renders with different view modes', () => {
    const { rerender } = render(
      <ProfileWallet wallet={mockWallet} viewMode="compact" data-testid="profile-wallet" />
    );

    let profileWallet = screen.getByTestId('profile-wallet');
    expect(profileWallet).toHaveClass('view-compact');

    rerender(
      <ProfileWallet wallet={mockWallet} viewMode="detailed" data-testid="profile-wallet" />
    );

    profileWallet = screen.getByTestId('profile-wallet');
    expect(profileWallet).toHaveClass('view-detailed');
  });

  it('renders QR code when showQR is true', () => {
    render(<ProfileWallet wallet={mockWallet} showQR />);

    expect(screen.getByTestId('wallet-qr-code')).toBeInTheDocument();
  });

  it('renders with transaction filtering', () => {
    render(<ProfileWallet wallet={mockWallet} />);

    const filterDropdown = screen.getByLabelText('Filter transactions');
    fireEvent.change(filterDropdown, { target: { value: 'receive' } });

    expect(screen.getByText('500 SMX')).toBeInTheDocument();
    expect(screen.queryByText('200 SMX')).not.toBeInTheDocument();
  });

  it('renders with transaction sorting', () => {
    render(<ProfileWallet wallet={mockWallet} />);

    const sortDropdown = screen.getByLabelText('Sort transactions');
    fireEvent.change(sortDropdown, { target: { value: 'amount' } });

    const transactions = screen.getAllByTestId('transaction-item');
    expect(transactions[0]).toHaveTextContent('500 SMX');
    expect(transactions[1]).toHaveTextContent('300 SMX');
    expect(transactions[2]).toHaveTextContent('200 SMX');
  });
});
