import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WalletConnect } from './WalletConnect';

describe('WalletConnect', () => {
  const mockWalletData = {
    address: '0x1234567890123456789012345678901234567890',
    balance: '1.5',
    network: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      isSupported: true
    },
    isConnected: true,
    tokens: [
      { symbol: 'ETH', balance: '1.5', value: 3000 },
      { symbol: 'USDT', balance: '500', value: 500 },
      { symbol: 'LINK', balance: '25', value: 250 }
    ]
  };

  const mockOnConnect = jest.fn();
  const mockOnDisconnect = jest.fn();
  const mockOnNetworkChange = jest.fn();
  const mockOnSendTransaction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<WalletConnect />);
    
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument();
  });

  it('renders connected wallet information when wallet is connected', () => {
    render(<WalletConnect walletData={mockWalletData} />);
    
    expect(screen.getByText(/connected/i)).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument(); // Shortened address
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument();
    expect(screen.getByText('Ethereum Mainnet')).toBeInTheDocument();
  });

  it('calls onConnect when connect button is clicked', async () => {
    render(<WalletConnect onConnect={mockOnConnect} />);
    
    const connectButton = screen.getByRole('button', { name: /connect/i });
    fireEvent.click(connectButton);
    
    await waitFor(() => {
      expect(mockOnConnect).toHaveBeenCalled();
    });
  });

  it('calls onDisconnect when disconnect button is clicked', async () => {
    render(
      <WalletConnect 
        walletData={mockWalletData} 
        onDisconnect={mockOnDisconnect} 
      />
    );
    
    const disconnectButton = screen.getByRole('button', { name: /disconnect/i });
    fireEvent.click(disconnectButton);
    
    await waitFor(() => {
      expect(mockOnDisconnect).toHaveBeenCalled();
    });
  });

  it('displays wallet dropdown menu when wallet button is clicked', () => {
    render(<WalletConnect walletData={mockWalletData} />);
    
    const walletButton = screen.getByRole('button', { name: /0x1234...7890/i });
    fireEvent.click(walletButton);
    
    expect(screen.getByText(/view on explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/copy address/i)).toBeInTheDocument();
    expect(screen.getByText(/disconnect/i)).toBeInTheDocument();
  });

  it('displays token balances when wallet is connected', () => {
    render(<WalletConnect walletData={mockWalletData} />);
    
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('$3,000')).toBeInTheDocument();
    
    expect(screen.getByText('USDT')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    
    expect(screen.getByText('LINK')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('displays network selector when multiple networks are available', () => {
    const networks = [
      { name: 'Ethereum Mainnet', chainId: 1, isSupported: true },
      { name: 'Polygon', chainId: 137, isSupported: true },
      { name: 'Arbitrum', chainId: 42161, isSupported: true }
    ];
    
    render(
      <WalletConnect 
        walletData={mockWalletData} 
        availableNetworks={networks}
        onNetworkChange={mockOnNetworkChange}
      />
    );
    
    const networkSelector = screen.getByRole('combobox', { name: /network/i });
    expect(networkSelector).toBeInTheDocument();
    
    fireEvent.change(networkSelector, { target: { value: '137' } });
    
    expect(mockOnNetworkChange).toHaveBeenCalledWith(137);
  });

  it('displays send transaction form when send button is clicked', () => {
    render(
      <WalletConnect 
        walletData={mockWalletData} 
        onSendTransaction={mockOnSendTransaction}
      />
    );
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    expect(screen.getByText(/send transaction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/recipient address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('calls onSendTransaction when send transaction form is submitted', async () => {
    render(
      <WalletConnect 
        walletData={mockWalletData} 
        onSendTransaction={mockOnSendTransaction}
      />
    );
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    const recipientInput = screen.getByLabelText(/recipient address/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    
    fireEvent.change(recipientInput, { target: { value: '0xabcdef1234567890abcdef1234567890abcdef12' } });
    fireEvent.change(amountInput, { target: { value: '0.5' } });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(mockOnSendTransaction).toHaveBeenCalledWith({
        to: '0xabcdef1234567890abcdef1234567890abcdef12',
        value: '0.5',
        token: 'ETH'
      });
    });
  });

  it('displays wallet connection options when multiple wallets are available', () => {
    const walletOptions = [
      { id: 'metamask', name: 'MetaMask', icon: 'metamask-icon.png' },
      { id: 'walletconnect', name: 'WalletConnect', icon: 'walletconnect-icon.png' },
      { id: 'coinbase', name: 'Coinbase Wallet', icon: 'coinbase-icon.png' }
    ];
    
    render(<WalletConnect walletOptions={walletOptions} onConnect={mockOnConnect} />);
    
    const connectButton = screen.getByRole('button', { name: /connect/i });
    fireEvent.click(connectButton);
    
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('WalletConnect')).toBeInTheDocument();
    expect(screen.getByText('Coinbase Wallet')).toBeInTheDocument();
    
    const metamaskOption = screen.getByText('MetaMask');
    fireEvent.click(metamaskOption);
    
    expect(mockOnConnect).toHaveBeenCalledWith('metamask');
  });

  it('displays error message when there is a connection error', () => {
    const errorMessage = 'Failed to connect wallet';
    render(<WalletConnect error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<WalletConnect isLoading={true} />);
    
    expect(screen.getByText(/connecting/i)).toBeInTheDocument();
  });

  it('displays unsupported network warning when network is not supported', () => {
    const unsupportedWalletData = {
      ...mockWalletData,
      network: {
        name: 'Unsupported Network',
        chainId: 999,
        isSupported: false
      }
    };
    
    render(<WalletConnect walletData={unsupportedWalletData} />);
    
    expect(screen.getByText(/unsupported network/i)).toBeInTheDocument();
    expect(screen.getByText(/please switch to a supported network/i)).toBeInTheDocument();
  });

  it('displays transaction history when available', () => {
    const walletDataWithTransactions = {
      ...mockWalletData,
      transactions: [
        { hash: '0xabc...123', type: 'send', amount: '0.5', token: 'ETH', timestamp: '2023-06-15T10:30:00Z', status: 'confirmed' },
        { hash: '0xdef...456', type: 'receive', amount: '100', token: 'USDT', timestamp: '2023-06-14T15:45:00Z', status: 'confirmed' },
        { hash: '0xghi...789', type: 'swap', amount: '10', token: 'LINK', timestamp: '2023-06-13T09:15:00Z', status: 'pending' }
      ]
    };
    
    render(<WalletConnect walletData={walletDataWithTransactions} />);
    
    const transactionsTab = screen.getByRole('tab', { name: /transactions/i });
    fireEvent.click(transactionsTab);
    
    expect(screen.getByText(/transaction history/i)).toBeInTheDocument();
    expect(screen.getByText(/0xabc...123/i)).toBeInTheDocument();
    expect(screen.getByText(/send/i)).toBeInTheDocument();
    expect(screen.getByText(/0.5 ETH/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });
});