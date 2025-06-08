import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostMetrics } from './PostMetrics';

describe('PostMetrics', () => {
  const mockMetrics = {
    views: 1250,
    likes: 42,
    comments: 7,
    shares: 3,
    engagement: 0.12,
    clickThrough: 0.08,
    impressions: 1500,
    reach: 1100,
    demographics: {
      age: [
        { group: '18-24', percentage: 25 },
        { group: '25-34', percentage: 40 },
        { group: '35-44', percentage: 20 },
        { group: '45+', percentage: 15 },
      ],
      gender: [
        { group: 'Male', percentage: 65 },
        { group: 'Female', percentage: 30 },
        { group: 'Other', percentage: 5 },
      ],
      location: [
        { country: 'United States', percentage: 40 },
        { country: 'Germany', percentage: 15 },
        { country: 'United Kingdom', percentage: 12 },
        { country: 'Canada', percentage: 8 },
        { country: 'Other', percentage: 25 },
      ],
    },
    timeDistribution: [
      { hour: '00-04', percentage: 5 },
      { hour: '04-08', percentage: 8 },
      { hour: '08-12', percentage: 22 },
      { hour: '12-16', percentage: 28 },
      { hour: '16-20', percentage: 25 },
      { hour: '20-24', percentage: 12 },
    ],
    referrers: [
      { source: 'Direct', percentage: 35 },
      { source: 'Search', percentage: 25 },
      { source: 'Social', percentage: 20 },
      { source: 'Email', percentage: 12 },
      { source: 'Other', percentage: 8 },
    ],
  };

  const mockOnExport = jest.fn();
  const mockOnRefresh = jest.fn();
  const mockOnPeriodChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with metrics data', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    expect(screen.getByText('Post Metrics')).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument(); // Views
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
  });

  it('displays engagement metrics', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    expect(screen.getByText(/engagement rate/i)).toBeInTheDocument();
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText(/click-through rate/i)).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
    expect(screen.getByText(/impressions/i)).toBeInTheDocument();
    expect(screen.getByText('1,500')).toBeInTheDocument();
    expect(screen.getByText(/reach/i)).toBeInTheDocument();
    expect(screen.getByText('1,100')).toBeInTheDocument();
  });

  it('displays demographic data', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    expect(screen.getByText(/demographics/i)).toBeInTheDocument();

    // Age demographics
    expect(screen.getByText('18-24')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('25-34')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();

    // Gender demographics
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();

    // Location demographics
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('displays time distribution data', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    expect(screen.getByText(/time distribution/i)).toBeInTheDocument();
    expect(screen.getByText('08-12')).toBeInTheDocument();
    expect(screen.getByText('22%')).toBeInTheDocument();
    expect(screen.getByText('12-16')).toBeInTheDocument();
    expect(screen.getByText('28%')).toBeInTheDocument();
  });

  it('displays referrer data', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    expect(screen.getByText(/referrers/i)).toBeInTheDocument();
    expect(screen.getByText('Direct')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('calls onExport when export button is clicked', () => {
    render(<PostMetrics metrics={mockMetrics} onExport={mockOnExport} />);

    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);

    expect(mockOnExport).toHaveBeenCalledWith(mockMetrics);
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(<PostMetrics metrics={mockMetrics} onRefresh={mockOnRefresh} />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('calls onPeriodChange when period is changed', () => {
    render(<PostMetrics metrics={mockMetrics} onPeriodChange={mockOnPeriodChange} />);

    const periodSelect = screen.getByLabelText(/period/i);
    fireEvent.change(periodSelect, { target: { value: 'week' } });

    expect(mockOnPeriodChange).toHaveBeenCalledWith('week');
  });

  it('displays loading state when isLoading is true', () => {
    render(<PostMetrics isLoading={true} />);

    expect(screen.getByText(/loading metrics/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load metrics';
    render(<PostMetrics error={errorMessage} />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('toggles between chart and table view', () => {
    render(<PostMetrics metrics={mockMetrics} />);

    // Initially in chart view
    expect(screen.getByTestId('metrics-charts')).toBeInTheDocument();

    // Switch to table view
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByTestId('metrics-charts')).not.toBeInTheDocument();

    // Switch back to chart view
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);

    expect(screen.getByTestId('metrics-charts')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays comparison metrics when provided', () => {
    const comparisonMetrics = {
      ...mockMetrics,
      comparison: {
        views: { value: 1100, change: 13.64 },
        likes: { value: 35, change: 20 },
        comments: { value: 5, change: 40 },
        shares: { value: 2, change: 50 },
        engagement: { value: 0.1, change: 20 },
      },
    };

    render(<PostMetrics metrics={comparisonMetrics} />);

    expect(screen.getByText(/comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/\+13.64%/i)).toBeInTheDocument(); // Views change
    expect(screen.getByText(/\+20%/i)).toBeInTheDocument(); // Likes change
    expect(screen.getByText(/\+40%/i)).toBeInTheDocument(); // Comments change
    expect(screen.getByText(/\+50%/i)).toBeInTheDocument(); // Shares change
  });

  it('displays insights when provided', () => {
    const metricsWithInsights = {
      ...mockMetrics,
      insights: [
        { type: 'positive', message: 'Engagement is higher than average' },
        { type: 'neutral', message: 'Most engagement comes from the 25-34 age group' },
        { type: 'negative', message: 'Click-through rate is lower than average' },
      ],
    };

    render(<PostMetrics metrics={metricsWithInsights} />);

    expect(screen.getByText(/insights/i)).toBeInTheDocument();
    expect(screen.getByText('Engagement is higher than average')).toBeInTheDocument();
    expect(screen.getByText('Most engagement comes from the 25-34 age group')).toBeInTheDocument();
    expect(screen.getByText('Click-through rate is lower than average')).toBeInTheDocument();
  });

  it('renders with custom className when provided', () => {
    render(<PostMetrics metrics={mockMetrics} className="custom-metrics" />);

    expect(screen.getByTestId('post-metrics')).toHaveClass('custom-metrics');
  });
});
