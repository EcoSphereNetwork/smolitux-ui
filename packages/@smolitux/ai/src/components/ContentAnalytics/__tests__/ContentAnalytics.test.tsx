import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContentAnalytics } from '../ContentAnalytics';

describe('ContentAnalytics', () => {
  const mockAnalyticsData = {
    summary: {
      totalContent: 87,
      totalViews: 125000,
      totalEngagement: 15600,
      averageEngagementRate: 0.125, // 12.5%
      topPerformingCategories: ['blockchain', 'cryptocurrency', 'web3'],
      contentGrowth: 0.15, // 15% growth
    },
    contentBreakdown: [
      { type: 'articles', count: 45, percentage: 51.7 },
      { type: 'videos', count: 22, percentage: 25.3 },
      { type: 'podcasts', count: 12, percentage: 13.8 },
      { type: 'infographics', count: 8, percentage: 9.2 },
    ],
    performance: {
      views: [
        { period: 'Jan 2023', count: 18000 },
        { period: 'Feb 2023', count: 19500 },
        { period: 'Mar 2023', count: 20200 },
        { period: 'Apr 2023', count: 21500 },
        { period: 'May 2023', count: 22800 },
        { period: 'Jun 2023', count: 23000 },
      ],
      engagement: [
        { period: 'Jan 2023', count: 2250 },
        { period: 'Feb 2023', count: 2440 },
        { period: 'Mar 2023', count: 2525 },
        { period: 'Apr 2023', count: 2690 },
        { period: 'May 2023', count: 2850 },
        { period: 'Jun 2023', count: 2845 },
      ],
      topContent: [
        { id: 'content1', title: 'Introduction to Blockchain', views: 8500, engagement: 1200 },
        { id: 'content2', title: 'Web3 Development Guide', views: 7200, engagement: 980 },
        { id: 'content3', title: 'Cryptocurrency Basics', views: 6800, engagement: 850 },
      ],
    },
    audience: {
      demographics: {
        age: [
          { group: '18-24', percentage: 18 },
          { group: '25-34', percentage: 35 },
          { group: '35-44', percentage: 25 },
          { group: '45-54', percentage: 15 },
          { group: '55+', percentage: 7 },
        ],
        location: [
          { country: 'United States', percentage: 42 },
          { country: 'United Kingdom', percentage: 12 },
          { country: 'Germany', percentage: 8 },
          { country: 'Canada', percentage: 7 },
          { country: 'Australia', percentage: 5 },
          { country: 'Other', percentage: 26 },
        ],
        devices: [
          { type: 'Desktop', percentage: 65 },
          { type: 'Mobile', percentage: 30 },
          { type: 'Tablet', percentage: 5 },
        ],
      },
      behavior: {
        timeOfDay: [
          { hour: '00-04', percentage: 5 },
          { hour: '04-08', percentage: 8 },
          { hour: '08-12', percentage: 22 },
          { hour: '12-16', percentage: 28 },
          { hour: '16-20', percentage: 25 },
          { hour: '20-24', percentage: 12 },
        ],
        dayOfWeek: [
          { day: 'Monday', percentage: 15 },
          { day: 'Tuesday', percentage: 16 },
          { day: 'Wednesday', percentage: 18 },
          { day: 'Thursday', percentage: 17 },
          { day: 'Friday', percentage: 14 },
          { day: 'Saturday', percentage: 10 },
          { day: 'Sunday', percentage: 10 },
        ],
        referralSources: [
          { source: 'Direct', percentage: 35 },
          { source: 'Social Media', percentage: 25 },
          { source: 'Search Engines', percentage: 20 },
          { source: 'Email', percentage: 12 },
          { source: 'Other Websites', percentage: 8 },
        ],
      },
    },
  };

  const mockOnPeriodChange = jest.fn();
  const mockOnContentClick = jest.fn();
  const mockOnExport = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with analytics data', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText('Content Analytics')).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument(); // Total content
    expect(screen.getByText('125,000')).toBeInTheDocument(); // Total views
    expect(screen.getByText('15,600')).toBeInTheDocument(); // Total engagement
    expect(screen.getByText('12.5%')).toBeInTheDocument(); // Average engagement rate
  });

  it('displays content breakdown', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/content breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('51.7%')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('25.3%')).toBeInTheDocument();
  });

  it('displays performance metrics', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/performance metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/views over time/i)).toBeInTheDocument();
    expect(screen.getByText(/engagement over time/i)).toBeInTheDocument();

    // Check for months in the chart
    expect(screen.getByText('Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('Jun 2023')).toBeInTheDocument();
  });

  it('displays top performing content', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/top performing content/i)).toBeInTheDocument();
    expect(screen.getByText('Introduction to Blockchain')).toBeInTheDocument();
    expect(screen.getByText('8,500 views')).toBeInTheDocument();
    expect(screen.getByText('Web3 Development Guide')).toBeInTheDocument();
    expect(screen.getByText('7,200 views')).toBeInTheDocument();
    expect(screen.getByText('Cryptocurrency Basics')).toBeInTheDocument();
    expect(screen.getByText('6,800 views')).toBeInTheDocument();
  });

  it('displays audience demographics', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/audience demographics/i)).toBeInTheDocument();

    // Age groups
    expect(screen.getByText('18-24')).toBeInTheDocument();
    expect(screen.getByText('18%')).toBeInTheDocument();
    expect(screen.getByText('25-34')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();

    // Locations
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();

    // Devices
    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('displays audience behavior', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/audience behavior/i)).toBeInTheDocument();

    // Time of day
    expect(screen.getByText('08-12')).toBeInTheDocument();
    expect(screen.getByText('22%')).toBeInTheDocument();

    // Day of week
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('18%')).toBeInTheDocument();

    // Referral sources
    expect(screen.getByText('Direct')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });

  it('calls onPeriodChange when period is changed', () => {
    render(
      <ContentAnalytics analyticsData={mockAnalyticsData} onPeriodChange={mockOnPeriodChange} />
    );

    const periodSelect = screen.getByLabelText(/period/i);
    fireEvent.change(periodSelect, { target: { value: 'yearly' } });

    expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly');
  });

  it('calls onContentClick when content item is clicked', () => {
    render(
      <ContentAnalytics analyticsData={mockAnalyticsData} onContentClick={mockOnContentClick} />
    );

    const contentItem = screen.getByText('Introduction to Blockchain');
    fireEvent.click(contentItem);

    expect(mockOnContentClick).toHaveBeenCalledWith(mockAnalyticsData.performance.topContent[0]);
  });

  it('calls onExport when export button is clicked', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} onExport={mockOnExport} />);

    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);

    expect(mockOnExport).toHaveBeenCalledWith(mockAnalyticsData, expect.any(Object));
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} onRefresh={mockOnRefresh} />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays content growth rate', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    expect(screen.getByText(/content growth/i)).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<ContentAnalytics isLoading={true} />);

    expect(screen.getByText(/loading analytics data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load analytics data';
    render(<ContentAnalytics error={errorMessage} />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows toggling between different dashboard views', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    const overviewTab = screen.getByRole('tab', { name: /overview/i });
    const performanceTab = screen.getByRole('tab', { name: /performance/i });
    const audienceTab = screen.getByRole('tab', { name: /audience/i });

    // Initially on overview tab
    expect(screen.getByText('Content Analytics')).toBeInTheDocument();

    // Switch to performance tab
    fireEvent.click(performanceTab);
    expect(screen.getByText(/performance metrics/i)).toBeInTheDocument();

    // Switch to audience tab
    fireEvent.click(audienceTab);
    expect(screen.getByText(/audience demographics/i)).toBeInTheDocument();

    // Switch back to overview tab
    fireEvent.click(overviewTab);
    expect(screen.getByText(/content breakdown/i)).toBeInTheDocument();
  });

  it('allows toggling between chart and table view', () => {
    render(<ContentAnalytics analyticsData={mockAnalyticsData} />);

    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);

    expect(screen.getByRole('table')).toBeInTheDocument();

    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays content recommendations when available', () => {
    const analyticsDataWithRecommendations = {
      ...mockAnalyticsData,
      recommendations: [
        { type: 'Create more video content', reason: 'Videos have 30% higher engagement' },
        { type: 'Post on Wednesdays', reason: 'Highest audience activity' },
        { type: 'Focus on blockchain topics', reason: 'Top performing category' },
      ],
    };

    render(<ContentAnalytics analyticsData={analyticsDataWithRecommendations} />);

    expect(screen.getByText(/content recommendations/i)).toBeInTheDocument();
    expect(screen.getByText('Create more video content')).toBeInTheDocument();
    expect(screen.getByText('Videos have 30% higher engagement')).toBeInTheDocument();
    expect(screen.getByText('Post on Wednesdays')).toBeInTheDocument();
    expect(screen.getByText('Highest audience activity')).toBeInTheDocument();
  });
});
