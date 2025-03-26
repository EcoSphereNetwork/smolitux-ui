import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';

describe('TransactionHistory', () => {
  const mockTransactions = [
    {
      hash: '0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1',
      type: 'send',
      from: '0x1234567890123456789012345678901234567890',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      amount: '1.5',
      token: 'ETH',
      timestamp: '2023-06-15T10:30:00Z',
      status: 'confirmed',
      blockNumber: 12345678,
      gasUsed: '21000',
      gasPrice: '20',
      fee: '0.00042',
      value: 3000 // USD value
    },
    {
      hash: '0xdef456abc123def456abc123def456abc123def456abc123def456abc123def4',
      type: 'receive',
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
      to: '0x1234567890123456789012345678901234567890',
      amount: '500',
      token: 'USDT',
      timestamp: '2023-06-14T15:45:00Z',
      status: 'confirmed',
      blockNumber: 12345670,
      gasUsed: '65000',
      gasPrice: '18',
      fee: '0.00117',
      value: 500 // USD value
    },
    {
      hash: '0xghi789jkl012ghi789jkl012ghi789jkl012ghi789jkl012ghi789jkl012ghi7',
      type: 'swap',
      from: '0x1234567890123456789012345678901234567890',
      to: '0x1234567890123456789012345678901234567890',
      amount: '10',
      token: 'LINK',
      timestamp: '2023-06-13T09:15:00Z',
      status: 'pending',
      value: 100 // USD value
    }
  ];

  const mockOnViewTransaction = jest.fn();
  const mockOnFilterChange = jest.fn();
  const mockOnExport = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with transactions data', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('0xabc1...abc1')).toBeInTheDocument(); // Shortened hash
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
    expect(screen.getByText('500 USDT')).toBeInTheDocument();
    expect(screen.getByText('Swap')).toBeInTheDocument();
    expect(screen.getByText('10 LINK')).toBeInTheDocument();
  });

  it('displays transaction status with appropriate styling', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    const confirmedStatus = screen.getAllByText('Confirmed');
    expect(confirmedStatus[0]).toHaveClass('status-confirmed');
    
    const pendingStatus = screen.getByText('Pending');
    expect(pendingStatus).toHaveClass('status-pending');
  });

  it('formats transaction timestamps correctly', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/jun 15, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/jun 14, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/jun 13, 2023/i)).toBeInTheDocument();
  });

  it('calls onViewTransaction when a transaction is clicked', () => {
    render(
      <TransactionHistory 
        transactions={mockTransactions} 
        onViewTransaction={mockOnViewTransaction} 
      />
    );
    
    const transaction = screen.getByText('0xabc1...abc1');
    fireEvent.click(transaction);
    
    expect(mockOnViewTransaction).toHaveBeenCalledWith(mockTransactions[0]);
  });

  it('calls onFilterChange when filter is changed', () => {
    render(
      <TransactionHistory 
        transactions={mockTransactions} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const typeFilter = screen.getByLabelText(/type/i);
    fireEvent.change(typeFilter, { target: { value: 'send' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      type: 'send'
    }));
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <TransactionHistory 
        transactions={mockTransactions} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockTransactions, expect.any(Object));
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <TransactionHistory 
        transactions={mockTransactions} 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays transaction details when a transaction is expanded', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    // Initially, details should not be visible
    expect(screen.queryByText(/block number/i)).not.toBeInTheDocument();
    
    // Expand the first transaction
    const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
    fireEvent.click(expandButton);
    
    // Now details should be visible
    expect(screen.getByText(/block number/i)).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText(/gas used/i)).toBeInTheDocument();
    expect(screen.getByText('21,000')).toBeInTheDocument();
    expect(screen.getByText(/gas price/i)).toBeInTheDocument();
    expect(screen.getByText('20 Gwei')).toBeInTheDocument();
    expect(screen.getByText(/fee/i)).toBeInTheDocument();
    expect(screen.getByText('0.00042 ETH')).toBeInTheDocument();
  });

  it('displays transaction addresses with copy buttons', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    // Expand the first transaction
    const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
    fireEvent.click(expandButton);
    
    expect(screen.getByText(/from/i)).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument(); // Shortened from address
    expect(screen.getByText(/to/i)).toBeInTheDocument();
    expect(screen.getByText('0xabcd...ef12')).toBeInTheDocument(); // Shortened to address
    
    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('displays USD values when showUsdValue is true', () => {
    render(<TransactionHistory transactions={mockTransactions} showUsdValue={true} />);
    
    expect(screen.getByText('$3,000')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('does not display USD values when showUsdValue is false', () => {
    render(<TransactionHistory transactions={mockTransactions} showUsdValue={false} />);
    
    expect(screen.queryByText('$3,000')).not.toBeInTheDocument();
    expect(screen.queryByText('$500')).not.toBeInTheDocument();
    expect(screen.queryByText('$100')).not.toBeInTheDocument();
  });

  it('displays pagination controls when there are many transactions', () => {
    // Create a large number of transactions
    const manyTransactions = Array(25).fill(null).map((_, index) => ({
      ...mockTransactions[0],
      hash: `0xabc${index}`,
      timestamp: `2023-06-${15 - index}T10:30:00Z`
    }));
    
    render(
      <TransactionHistory 
        transactions={manyTransactions} 
        pageSize={10}
      />
    );
    
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<TransactionHistory isLoading={true} />);
    
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load transactions';
    render(<TransactionHistory error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays empty state when no transactions are available', () => {
    render(<TransactionHistory transactions={[]} />);
    
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it('allows filtering transactions by date range', async () => {
    render(
      <TransactionHistory 
        transactions={mockTransactions} 
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const dateRangeButton = screen.getByRole('button', { name: /date range/i });
    fireEvent.click(dateRangeButton);
    
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);
    
    fireEvent.change(startDateInput, { target: { value: '2023-06-13' } });
    fireEvent.change(endDateInput, { target: { value: '2023-06-15' } });
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
        dateRange: {
          start: '2023-06-13',
          end: '2023-06-15'
        }
      }));
    });
  });
});