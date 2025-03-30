import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RevenueModel } from '../RevenueModel';

describe('RevenueModel', () => {
  const mockRevenueData = {
    totalRevenue: 15000,
    currency: 'USD',
    period: 'monthly',
    breakdown: [
      { source: 'subscriptions', amount: 8500, percentage: 56.67 },
      { source: 'tips', amount: 3200, percentage: 21.33 },
      { source: 'content sales', amount: 2100, percentage: 14.00 },
      { source: 'advertising', amount: 1200, percentage: 8.00 }
    ],
    history: [
      { period: 'Jan 2023', amount: 12000 },
      { period: 'Feb 2023', amount: 12500 },
      { period: 'Mar 2023', amount: 13200 },
      { period: 'Apr 2023', amount: 14100 },
      { period: 'May 2023', amount: 14800 },
      { period: 'Jun 2023', amount: 15000 }
    ],
    projections: {
      nextMonth: 15500,
      threeMonths: 17000,
      sixMonths: 20000,
      yearly: 25000
    },
    fees: {
      platform: 10,
      payment: 2.5,
      tax: 15
    }
  };

  const mockOnPeriodChange = jest.fn();
  const mockOnCurrencyChange = jest.fn();
  const mockOnExport = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with revenue data', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText('Revenue Model')).toBeInTheDocument();
    expect(screen.getByText('$15,000')).toBeInTheDocument();
    expect(screen.getByText(/monthly revenue/i)).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('$8,500')).toBeInTheDocument();
    expect(screen.getByText('56.67%')).toBeInTheDocument();
  });

  it('displays revenue breakdown chart', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/revenue breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Tips')).toBeInTheDocument();
    expect(screen.getByText('Content Sales')).toBeInTheDocument();
    expect(screen.getByText('Advertising')).toBeInTheDocument();
  });

  it('displays revenue history chart', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/revenue history/i)).toBeInTheDocument();
    expect(screen.getByText('Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('Feb 2023')).toBeInTheDocument();
    expect(screen.getByText('Mar 2023')).toBeInTheDocument();
    expect(screen.getByText('Apr 2023')).toBeInTheDocument();
    expect(screen.getByText('May 2023')).toBeInTheDocument();
    expect(screen.getByText('Jun 2023')).toBeInTheDocument();
  });

  it('displays revenue projections', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/revenue projections/i)).toBeInTheDocument();
    expect(screen.getByText(/next month/i)).toBeInTheDocument();
    expect(screen.getByText('$15,500')).toBeInTheDocument();
    expect(screen.getByText(/three months/i)).toBeInTheDocument();
    expect(screen.getByText('$17,000')).toBeInTheDocument();
    expect(screen.getByText(/six months/i)).toBeInTheDocument();
    expect(screen.getByText('$20,000')).toBeInTheDocument();
    expect(screen.getByText(/yearly/i)).toBeInTheDocument();
    expect(screen.getByText('$25,000')).toBeInTheDocument();
  });

  it('displays fee breakdown', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/fee breakdown/i)).toBeInTheDocument();
    expect(screen.getByText(/platform fee/i)).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText(/payment processing/i)).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('calls onPeriodChange when period is changed', () => {
    render(
      <RevenueModel 
        revenueData={mockRevenueData} 
        onPeriodChange={mockOnPeriodChange} 
      />
    );
    
    const periodSelect = screen.getByLabelText(/period/i);
    fireEvent.change(periodSelect, { target: { value: 'yearly' } });
    
    expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly');
  });

  it('calls onCurrencyChange when currency is changed', () => {
    render(
      <RevenueModel 
        revenueData={mockRevenueData} 
        onCurrencyChange={mockOnCurrencyChange} 
      />
    );
    
    const currencySelect = screen.getByLabelText(/currency/i);
    fireEvent.change(currencySelect, { target: { value: 'EUR' } });
    
    expect(mockOnCurrencyChange).toHaveBeenCalledWith('EUR');
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <RevenueModel 
        revenueData={mockRevenueData} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockRevenueData, expect.any(Object));
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <RevenueModel 
        revenueData={mockRevenueData} 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays net revenue after fees', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/net revenue/i)).toBeInTheDocument();
    // Calculate expected net revenue: $15,000 - 10% platform fee - 2.5% payment fee - 15% tax
    // $15,000 * (1 - 0.10 - 0.025 - 0.15) = $15,000 * 0.725 = $10,875
    expect(screen.getByText('$10,875')).toBeInTheDocument();
  });

  it('displays revenue growth rate', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/growth rate/i)).toBeInTheDocument();
    // Calculate expected growth rate from last month: (15000 - 14800) / 14800 * 100 = 1.35%
    expect(screen.getByText('1.35%')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<RevenueModel isLoading={true} />);
    
    expect(screen.getByText(/loading revenue data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load revenue data';
    render(<RevenueModel error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows toggling between chart and table view', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);
    
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays revenue comparison with previous period', () => {
    render(<RevenueModel revenueData={mockRevenueData} />);
    
    expect(screen.getByText(/comparison with previous period/i)).toBeInTheDocument();
    expect(screen.getByText(/\+\$200/i)).toBeInTheDocument(); // $15,000 - $14,800 = $200
  });
});