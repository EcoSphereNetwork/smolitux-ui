import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EngagementScore } from '../EngagementScore';

describe('EngagementScore', () => {
  const mockEngagementData = {
    score: 78, // Out of 100
    level: 'high',
    breakdown: {
      views: { score: 85, weight: 0.2 },
      likes: { score: 75, weight: 0.2 },
      comments: { score: 82, weight: 0.25 },
      shares: { score: 70, weight: 0.25 },
      clickThrough: { score: 65, weight: 0.1 }
    },
    history: [
      { period: 'Jan 2023', score: 65 },
      { period: 'Feb 2023', score: 68 },
      { period: 'Mar 2023', score: 70 },
      { period: 'Apr 2023', score: 72 },
      { period: 'May 2023', score: 75 },
      { period: 'Jun 2023', score: 78 }
    ],
    benchmark: {
      industry: 65,
      similar: 70,
      top10Percent: 85
    },
    recommendations: [
      { action: 'Increase post frequency', impact: 'medium' },
      { action: 'Respond to more comments', impact: 'high' },
      { action: 'Add more visual content', impact: 'medium' }
    ]
  };

  const mockOnPeriodChange = jest.fn();
  const mockOnRefresh = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with engagement data', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText('Engagement Score')).toBeInTheDocument();
    expect(screen.getByText('78')).toBeInTheDocument(); // Score
    expect(screen.getByText(/high engagement/i)).toBeInTheDocument(); // Level
  });

  it('displays engagement breakdown', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText(/engagement breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument(); // Views score
    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument(); // Likes score
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument(); // Comments score
    expect(screen.getByText('Shares')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument(); // Shares score
    expect(screen.getByText('Click Through')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument(); // Click Through score
  });

  it('displays engagement history', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText(/engagement history/i)).toBeInTheDocument();
    expect(screen.getByText('Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('Feb 2023')).toBeInTheDocument();
    expect(screen.getByText('Mar 2023')).toBeInTheDocument();
    expect(screen.getByText('Apr 2023')).toBeInTheDocument();
    expect(screen.getByText('May 2023')).toBeInTheDocument();
    expect(screen.getByText('Jun 2023')).toBeInTheDocument();
  });

  it('displays benchmark comparison', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText(/benchmark comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/industry average/i)).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument(); // Industry benchmark
    expect(screen.getByText(/similar content/i)).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument(); // Similar content benchmark
    expect(screen.getByText(/top 10%/i)).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument(); // Top 10% benchmark
  });

  it('displays recommendations', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText(/recommendations/i)).toBeInTheDocument();
    expect(screen.getByText('Increase post frequency')).toBeInTheDocument();
    expect(screen.getByText(/medium impact/i)).toBeInTheDocument();
    expect(screen.getByText('Respond to more comments')).toBeInTheDocument();
    expect(screen.getByText(/high impact/i)).toBeInTheDocument();
    expect(screen.getByText('Add more visual content')).toBeInTheDocument();
  });

  it('calls onPeriodChange when period is changed', () => {
    render(
      <EngagementScore 
        engagementData={mockEngagementData} 
        onPeriodChange={mockOnPeriodChange} 
      />
    );
    
    const periodSelect = screen.getByLabelText(/period/i);
    fireEvent.change(periodSelect, { target: { value: 'yearly' } });
    
    expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly');
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <EngagementScore 
        engagementData={mockEngagementData} 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <EngagementScore 
        engagementData={mockEngagementData} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockEngagementData, expect.any(Object));
  });

  it('displays different engagement levels based on score', () => {
    // High engagement
    const highEngagement = { ...mockEngagementData, score: 85, level: 'very high' };
    const { rerender } = render(<EngagementScore engagementData={highEngagement} />);
    
    expect(screen.getByText(/very high engagement/i)).toBeInTheDocument();
    
    // Medium engagement
    const mediumEngagement = { ...mockEngagementData, score: 55, level: 'medium' };
    rerender(<EngagementScore engagementData={mediumEngagement} />);
    
    expect(screen.getByText(/medium engagement/i)).toBeInTheDocument();
    
    // Low engagement
    const lowEngagement = { ...mockEngagementData, score: 25, level: 'low' };
    rerender(<EngagementScore engagementData={lowEngagement} />);
    
    expect(screen.getByText(/low engagement/i)).toBeInTheDocument();
  });

  it('displays appropriate engagement score colors', () => {
    // High engagement (green)
    const highEngagement = { ...mockEngagementData, score: 85, level: 'very high' };
    const { rerender } = render(<EngagementScore engagementData={highEngagement} />);
    
    const scoreIndicator = screen.getByTestId('score-indicator');
    expect(scoreIndicator).toHaveClass('score-very-high');
    
    // Low engagement (red)
    const lowEngagement = { ...mockEngagementData, score: 25, level: 'low' };
    rerender(<EngagementScore engagementData={lowEngagement} />);
    
    expect(scoreIndicator).toHaveClass('score-low');
  });

  it('displays growth trend', () => {
    // Calculate expected growth: (78 - 75) / 75 * 100 = 4%
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    expect(screen.getByText(/growth trend/i)).toBeInTheDocument();
    expect(screen.getByText(/\+4%/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<EngagementScore isLoading={true} />);
    
    expect(screen.getByText(/loading engagement data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load engagement data';
    render(<EngagementScore error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows toggling between chart and table view', () => {
    render(<EngagementScore engagementData={mockEngagementData} />);
    
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);
    
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays custom date range selector when available', () => {
    render(
      <EngagementScore 
        engagementData={mockEngagementData} 
        allowCustomDateRange={true}
        onPeriodChange={mockOnPeriodChange}
      />
    );
    
    const customRangeButton = screen.getByRole('button', { name: /custom range/i });
    fireEvent.click(customRangeButton);
    
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);
    
    fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-06-30' } });
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnPeriodChange).toHaveBeenCalledWith({
      start: '2023-01-01',
      end: '2023-06-30'
    });
  });
});