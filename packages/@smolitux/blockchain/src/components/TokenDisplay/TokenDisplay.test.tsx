import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenDisplay } from './TokenDisplay';

describe('TokenDisplay', () => {
  const mockTokenData = {
    symbol: 'ECO',
    name: 'EcoSphere Token',
    balance: '1500.75',
    value: 3001.5, // USD value
    price: 2.0, // USD per token
    priceChange24h: 5.2, // Percentage
    imageUrl: 'https://example.com/eco-token.png',
    contractAddress: '0x1234567890123456789012345678901234567890',
    decimals: 18,
    network: {
      name: 'Ethereum Mainnet',
      chainId: 1
    },
    history: [
      { timestamp: '2023-06-01T00:00:00Z', price: 1.8 },
      { timestamp: '2023-06-02T00:00:00Z', price: 1.85 },
      { timestamp: '2023-06-03T00:00:00Z', price: 1.9 },
      { timestamp: '2023-06-04T00:00:00Z', price: 1.95 },
      { timestamp: '2023-06-05T00:00:00Z', price: 2.0 }
    ]
  };

  const mockOnSend = jest.fn();
  const mockOnReceive = jest.fn();
  const mockOnSwap = jest.fn();
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with token data', () => {
    render(<TokenDisplay tokenData={mockTokenData} />);
    
    expect(screen.getByText('ECO')).toBeInTheDocument();
    expect(screen.getByText('EcoSphere Token')).toBeInTheDocument();
    expect(screen.getByText('1,500.75')).toBeInTheDocument(); // Formatted balance
    expect(screen.getByText('$3,001.50')).toBeInTheDocument(); // Formatted value
    expect(screen.getByText('$2.00')).toBeInTheDocument(); // Formatted price
    expect(screen.getByText('+5.2%')).toBeInTheDocument(); // Price change
  });

  it('displays token image when provided', () => {
    render(<TokenDisplay tokenData={mockTokenData} />);
    
    const tokenImage = screen.getByAltText('ECO');
    expect(tokenImage).toBeInTheDocument();
    expect(tokenImage).toHaveAttribute('src', 'https://example.com/eco-token.png');
  });

  it('displays placeholder image when no image URL is provided', () => {
    const tokenDataWithoutImage = { ...mockTokenData, imageUrl: undefined };
    render(<TokenDisplay tokenData={tokenDataWithoutImage} />);
    
    const placeholderImage = screen.getByAltText('ECO');
    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderImage).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });

  it('displays positive price change in green', () => {
    render(<TokenDisplay tokenData={mockTokenData} />);
    
    const priceChange = screen.getByText('+5.2%');
    expect(priceChange).toHaveClass('price-up');
  });

  it('displays negative price change in red', () => {
    const tokenDataWithNegativeChange = { ...mockTokenData, priceChange24h: -3.5 };
    render(<TokenDisplay tokenData={tokenDataWithNegativeChange} />);
    
    const priceChange = screen.getByText('-3.5%');
    expect(priceChange).toHaveClass('price-down');
  });

  it('calls onSend when send button is clicked', () => {
    render(<TokenDisplay tokenData={mockTokenData} onSend={mockOnSend} />);
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith(mockTokenData);
  });

  it('calls onReceive when receive button is clicked', () => {
    render(<TokenDisplay tokenData={mockTokenData} onReceive={mockOnReceive} />);
    
    const receiveButton = screen.getByRole('button', { name: /receive/i });
    fireEvent.click(receiveButton);
    
    expect(mockOnReceive).toHaveBeenCalledWith(mockTokenData);
  });

  it('calls onSwap when swap button is clicked', () => {
    render(<TokenDisplay tokenData={mockTokenData} onSwap={mockOnSwap} />);
    
    const swapButton = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(swapButton);
    
    expect(mockOnSwap).toHaveBeenCalledWith(mockTokenData);
  });

  it('calls onViewDetails when view details button is clicked', () => {
    render(<TokenDisplay tokenData={mockTokenData} onViewDetails={mockOnViewDetails} />);
    
    const viewDetailsButton = screen.getByRole('button', { name: /details/i });
    fireEvent.click(viewDetailsButton);
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockTokenData);
  });

  it('displays price history chart when showChart is true', () => {
    render(<TokenDisplay tokenData={mockTokenData} showChart={true} />);
    
    expect(screen.getByText(/price history/i)).toBeInTheDocument();
    expect(screen.getByTestId('price-chart')).toBeInTheDocument();
  });

  it('does not display price history chart when showChart is false', () => {
    render(<TokenDisplay tokenData={mockTokenData} showChart={false} />);
    
    expect(screen.queryByText(/price history/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-chart')).not.toBeInTheDocument();
  });

  it('displays contract address when showDetails is true', () => {
    render(<TokenDisplay tokenData={mockTokenData} showDetails={true} />);
    
    expect(screen.getByText(/contract address/i)).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument(); // Shortened address
  });

  it('does not display contract address when showDetails is false', () => {
    render(<TokenDisplay tokenData={mockTokenData} showDetails={false} />);
    
    expect(screen.queryByText(/contract address/i)).not.toBeInTheDocument();
  });

  it('displays network information when showNetwork is true', () => {
    render(<TokenDisplay tokenData={mockTokenData} showNetwork={true} />);
    
    expect(screen.getByText(/network/i)).toBeInTheDocument();
    expect(screen.getByText('Ethereum Mainnet')).toBeInTheDocument();
  });

  it('does not display network information when showNetwork is false', () => {
    render(<TokenDisplay tokenData={mockTokenData} showNetwork={false} />);
    
    expect(screen.queryByText(/network/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Ethereum Mainnet')).not.toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<TokenDisplay isLoading={true} />);
    
    expect(screen.getByText(/loading token data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load token data';
    render(<TokenDisplay error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays token actions based on provided props', () => {
    // With all actions
    const { rerender } = render(
      <TokenDisplay 
        tokenData={mockTokenData} 
        onSend={mockOnSend}
        onReceive={mockOnReceive}
        onSwap={mockOnSwap}
      />
    );
    
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /receive/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /swap/i })).toBeInTheDocument();
    
    // With only send action
    rerender(<TokenDisplay tokenData={mockTokenData} onSend={mockOnSend} />);
    
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /receive/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /swap/i })).not.toBeInTheDocument();
  });

  it('displays token balance in different formats based on props', () => {
    // Default format (with USD value)
    const { rerender } = render(<TokenDisplay tokenData={mockTokenData} />);
    
    expect(screen.getByText('1,500.75')).toBeInTheDocument();
    expect(screen.getByText('$3,001.50')).toBeInTheDocument();
    
    // Without USD value
    rerender(<TokenDisplay tokenData={mockTokenData} showUsdValue={false} />);
    
    expect(screen.getByText('1,500.75')).toBeInTheDocument();
    expect(screen.queryByText('$3,001.50')).not.toBeInTheDocument();
    
    // With compact format
    rerender(<TokenDisplay tokenData={mockTokenData} compactMode={true} />);
    
    expect(screen.getByText('1.5K')).toBeInTheDocument(); // Compact balance format
  });
});