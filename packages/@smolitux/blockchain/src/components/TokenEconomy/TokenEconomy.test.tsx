import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TokenEconomy } from './TokenEconomy';

describe('TokenEconomy', () => {
  const mockTokenData = {
    name: 'EcoSphere Token',
    symbol: 'ECO',
    totalSupply: '1000000000',
    circulatingSupply: '750000000',
    marketCap: '15000000',
    price: '0.02',
    priceChange24h: '5.2',
    volume24h: '1200000',
    distribution: [
      { name: 'Community', value: 40 },
      { name: 'Team', value: 15 },
      { name: 'Foundation', value: 25 },
      { name: 'Investors', value: 20 }
    ],
    tokenomics: {
      inflation: '2.5',
      stakingRewards: '8.0',
      burnRate: '1.2',
      transactionFee: '0.5'
    }
  };

  const mockOnRefresh = jest.fn();
  const mockOnDistributionSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with token data', () => {
    render(<TokenEconomy tokenData={mockTokenData} />);
    
    expect(screen.getByText('EcoSphere Token (ECO)')).toBeInTheDocument();
    expect(screen.getByText('$0.02')).toBeInTheDocument();
    expect(screen.getByText('+5.2%')).toBeInTheDocument();
    expect(screen.getByText('Market Cap: $15,000,000')).toBeInTheDocument();
    expect(screen.getByText('Volume (24h): $1,200,000')).toBeInTheDocument();
    expect(screen.getByText('Circulating Supply: 750,000,000 ECO')).toBeInTheDocument();
    expect(screen.getByText('Total Supply: 1,000,000,000 ECO')).toBeInTheDocument();
  });

  it('renders loading state when no token data is provided', () => {
    render(<TokenEconomy />);
    
    expect(screen.getByText(/loading token data/i)).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', async () => {
    render(<TokenEconomy tokenData={mockTokenData} onRefresh={mockOnRefresh} />);
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays token distribution chart', () => {
    render(<TokenEconomy tokenData={mockTokenData} />);
    
    expect(screen.getByText(/token distribution/i)).toBeInTheDocument();
    expect(screen.getByText('Community: 40%')).toBeInTheDocument();
    expect(screen.getByText('Team: 15%')).toBeInTheDocument();
    expect(screen.getByText('Foundation: 25%')).toBeInTheDocument();
    expect(screen.getByText('Investors: 20%')).toBeInTheDocument();
  });

  it('calls onDistributionSelect when a distribution segment is clicked', () => {
    render(
      <TokenEconomy 
        tokenData={mockTokenData} 
        onDistributionSelect={mockOnDistributionSelect} 
      />
    );
    
    const communitySegment = screen.getByText('Community: 40%');
    fireEvent.click(communitySegment);
    
    expect(mockOnDistributionSelect).toHaveBeenCalledWith({
      name: 'Community',
      value: 40
    });
  });

  it('displays tokenomics information', () => {
    render(<TokenEconomy tokenData={mockTokenData} />);
    
    expect(screen.getByText(/tokenomics/i)).toBeInTheDocument();
    expect(screen.getByText(/inflation rate/i)).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
    expect(screen.getByText(/staking rewards/i)).toBeInTheDocument();
    expect(screen.getByText('8.0%')).toBeInTheDocument();
    expect(screen.getByText(/burn rate/i)).toBeInTheDocument();
    expect(screen.getByText('1.2%')).toBeInTheDocument();
    expect(screen.getByText(/transaction fee/i)).toBeInTheDocument();
    expect(screen.getByText('0.5%')).toBeInTheDocument();
  });

  it('toggles between chart and table view', () => {
    render(<TokenEconomy tokenData={mockTokenData} />);
    
    // Initially in chart view
    expect(screen.getByText(/token distribution/i)).toBeInTheDocument();
    
    // Switch to table view
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    expect(screen.getByText(/distribution table/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Switch back to chart view
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);
    
    expect(screen.getByText(/token distribution/i)).toBeInTheDocument();
  });

  it('displays error message when token data fails to load', () => {
    render(<TokenEconomy error="Failed to load token data" />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to load token data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('calls onRefresh when retry button is clicked after error', () => {
    render(
      <TokenEconomy 
        error="Failed to load token data" 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });
});