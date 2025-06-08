import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatorDashboard } from './CreatorDashboard';

describe('CreatorDashboard', () => {
  const mockCreatorData = {
    id: 'creator123',
    username: 'johndoe',
    displayName: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    stats: {
      followers: 12500,
      subscribers: 850,
      totalRevenue: 15000,
      currency: 'USD',
      contentCount: 87,
      averageEngagement: 0.42,
      topPerformingContent: [
        { id: 'content1', title: 'How to Build a Decentralized App', views: 15000, revenue: 1200 },
        { id: 'content2', title: 'Blockchain Fundamentals', views: 12000, revenue: 950 },
        { id: 'content3', title: 'Smart Contract Security', views: 9500, revenue: 780 },
      ],
    },
    revenue: {
      monthly: 3200,
      breakdown: [
        { source: 'subscriptions', amount: 1800, percentage: 56.25 },
        { source: 'tips', amount: 750, percentage: 23.44 },
        { source: 'content sales', amount: 450, percentage: 14.06 },
        { source: 'advertising', amount: 200, percentage: 6.25 },
      ],
      history: [
        { period: 'Jan 2023', amount: 2500 },
        { period: 'Feb 2023', amount: 2700 },
        { period: 'Mar 2023', amount: 2900 },
        { period: 'Apr 2023', amount: 3000 },
        { period: 'May 2023', amount: 3100 },
        { period: 'Jun 2023', amount: 3200 },
      ],
    },
    audience: {
      demographics: {
        age: [
          { group: '18-24', percentage: 15 },
          { group: '25-34', percentage: 35 },
          { group: '35-44', percentage: 25 },
          { group: '45-54', percentage: 15 },
          { group: '55+', percentage: 10 },
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
      engagement: {
        views: 45000,
        likes: 12000,
        comments: 3500,
        shares: 2200,
        averageTimeSpent: 325, // seconds
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

  it('renders correctly with creator data', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText('Creator Dashboard')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('12,500')).toBeInTheDocument(); // Followers
    expect(screen.getByText('850')).toBeInTheDocument(); // Subscribers
    expect(screen.getByText('$15,000')).toBeInTheDocument(); // Total revenue
  });

  it('displays revenue section', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText(/monthly revenue/i)).toBeInTheDocument();
    expect(screen.getByText('$3,200')).toBeInTheDocument();
    expect(screen.getByText(/revenue breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('$1,800')).toBeInTheDocument();
    expect(screen.getByText('56.25%')).toBeInTheDocument();
  });

  it('displays audience demographics', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText(/audience demographics/i)).toBeInTheDocument();
    expect(screen.getByText(/age distribution/i)).toBeInTheDocument();
    expect(screen.getByText('18-24')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('25-34')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();

    expect(screen.getByText(/gender distribution/i)).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();

    expect(screen.getByText(/geographic distribution/i)).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('displays audience engagement metrics', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText(/audience engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/views/i)).toBeInTheDocument();
    expect(screen.getByText('45,000')).toBeInTheDocument();
    expect(screen.getByText(/likes/i)).toBeInTheDocument();
    expect(screen.getByText('12,000')).toBeInTheDocument();
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
    expect(screen.getByText('3,500')).toBeInTheDocument();
    expect(screen.getByText(/shares/i)).toBeInTheDocument();
    expect(screen.getByText('2,200')).toBeInTheDocument();
    expect(screen.getByText(/average time spent/i)).toBeInTheDocument();
    expect(screen.getByText('5:25')).toBeInTheDocument(); // 325 seconds formatted as 5:25
  });

  it('displays top performing content', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText(/top performing content/i)).toBeInTheDocument();
    expect(screen.getByText('How to Build a Decentralized App')).toBeInTheDocument();
    expect(screen.getByText('15,000 views')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();
    expect(screen.getByText('Blockchain Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('12,000 views')).toBeInTheDocument();
    expect(screen.getByText('$950')).toBeInTheDocument();
    expect(screen.getByText('Smart Contract Security')).toBeInTheDocument();
    expect(screen.getByText('9,500 views')).toBeInTheDocument();
    expect(screen.getByText('$780')).toBeInTheDocument();
  });

  it('calls onPeriodChange when period is changed', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} onPeriodChange={mockOnPeriodChange} />);

    const periodSelect = screen.getByLabelText(/period/i);
    fireEvent.change(periodSelect, { target: { value: 'yearly' } });

    expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly');
  });

  it('calls onContentClick when content item is clicked', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} onContentClick={mockOnContentClick} />);

    const contentItem = screen.getByText('How to Build a Decentralized App');
    fireEvent.click(contentItem);

    expect(mockOnContentClick).toHaveBeenCalledWith(mockCreatorData.stats.topPerformingContent[0]);
  });

  it('calls onExport when export button is clicked', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} onExport={mockOnExport} />);

    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);

    expect(mockOnExport).toHaveBeenCalledWith(mockCreatorData, expect.any(Object));
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} onRefresh={mockOnRefresh} />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays revenue growth rate', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    expect(screen.getByText(/growth rate/i)).toBeInTheDocument();
    // Calculate expected growth rate from last month: (3200 - 3100) / 3100 * 100 = 3.23%
    expect(screen.getByText('3.23%')).toBeInTheDocument();
  });

  it('displays subscriber growth rate', () => {
    const creatorDataWithSubscriberHistory = {
      ...mockCreatorData,
      stats: {
        ...mockCreatorData.stats,
        subscriberHistory: [
          { period: 'May 2023', count: 800 },
          { period: 'Jun 2023', count: 850 },
        ],
      },
    };

    render(<CreatorDashboard creatorData={creatorDataWithSubscriberHistory} />);

    expect(screen.getByText(/subscriber growth/i)).toBeInTheDocument();
    // Calculate expected growth rate: (850 - 800) / 800 * 100 = 6.25%
    expect(screen.getByText('6.25%')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<CreatorDashboard isLoading={true} />);

    expect(screen.getByText(/loading creator data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load creator data';
    render(<CreatorDashboard error={errorMessage} />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows toggling between different dashboard views', () => {
    render(<CreatorDashboard creatorData={mockCreatorData} />);

    const revenueTab = screen.getByRole('tab', { name: /revenue/i });
    const audienceTab = screen.getByRole('tab', { name: /audience/i });
    const contentTab = screen.getByRole('tab', { name: /content/i });

    // Initially on overview tab
    expect(screen.getByText('Creator Dashboard')).toBeInTheDocument();

    // Switch to revenue tab
    fireEvent.click(revenueTab);
    expect(screen.getByText(/revenue breakdown/i)).toBeInTheDocument();

    // Switch to audience tab
    fireEvent.click(audienceTab);
    expect(screen.getByText(/audience demographics/i)).toBeInTheDocument();

    // Switch to content tab
    fireEvent.click(contentTab);
    expect(screen.getByText(/top performing content/i)).toBeInTheDocument();
  });
});
