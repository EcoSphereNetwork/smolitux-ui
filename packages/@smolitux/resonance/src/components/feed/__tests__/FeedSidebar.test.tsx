import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeedSidebar } from './FeedSidebar';

describe('FeedSidebar', () => {
  const mockTrendingTopics = [
    { name: 'blockchain', count: 1250 },
    { name: 'crypto', count: 980 },
    { name: 'defi', count: 750 },
    { name: 'nft', count: 620 },
    { name: 'web3', count: 580 },
  ];

  const mockSuggestedUsers = [
    {
      id: 'user1',
      username: 'janedoe',
      displayName: 'Jane Doe',
      avatarUrl: 'https://example.com/jane-avatar.jpg',
      isVerified: true,
      followers: 12500,
    },
    {
      id: 'user2',
      username: 'bobsmith',
      displayName: 'Bob Smith',
      avatarUrl: 'https://example.com/bob-avatar.jpg',
      isVerified: false,
      followers: 8700,
    },
    {
      id: 'user3',
      username: 'alicejones',
      displayName: 'Alice Jones',
      avatarUrl: 'https://example.com/alice-avatar.jpg',
      isVerified: true,
      followers: 9300,
    },
  ];

  const mockOnTopicClick = jest.fn();
  const mockOnUserClick = jest.fn();
  const mockOnFollowUser = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<FeedSidebar />);

    expect(screen.getByTestId('feed-sidebar')).toBeInTheDocument();
  });

  it('displays trending topics when provided', () => {
    render(<FeedSidebar trendingTopics={mockTrendingTopics} />);

    expect(screen.getByText(/trending topics/i)).toBeInTheDocument();
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('980')).toBeInTheDocument();
  });

  it('calls onTopicClick when a topic is clicked', () => {
    render(<FeedSidebar trendingTopics={mockTrendingTopics} onTopicClick={mockOnTopicClick} />);

    const topic = screen.getByText('#blockchain');
    fireEvent.click(topic);

    expect(mockOnTopicClick).toHaveBeenCalledWith('blockchain');
  });

  it('displays suggested users when provided', () => {
    render(<FeedSidebar suggestedUsers={mockSuggestedUsers} />);

    expect(screen.getByText(/suggested users/i)).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('@janedoe')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('@bobsmith')).toBeInTheDocument();
    expect(screen.getByText('Alice Jones')).toBeInTheDocument();
    expect(screen.getByText('@alicejones')).toBeInTheDocument();
  });

  it('calls onUserClick when a user is clicked', () => {
    render(<FeedSidebar suggestedUsers={mockSuggestedUsers} onUserClick={mockOnUserClick} />);

    const user = screen.getByText('Jane Doe');
    fireEvent.click(user);

    expect(mockOnUserClick).toHaveBeenCalledWith(mockSuggestedUsers[0]);
  });

  it('calls onFollowUser when follow button is clicked', () => {
    render(<FeedSidebar suggestedUsers={mockSuggestedUsers} onFollowUser={mockOnFollowUser} />);

    const followButtons = screen.getAllByRole('button', { name: /follow/i });
    fireEvent.click(followButtons[0]);

    expect(mockOnFollowUser).toHaveBeenCalledWith(mockSuggestedUsers[0].id);
  });

  it('displays verified badge for verified users', () => {
    render(<FeedSidebar suggestedUsers={mockSuggestedUsers} />);

    const verifiedBadges = screen.getAllByTestId('verified-badge');
    expect(verifiedBadges.length).toBe(2); // Two verified users
  });

  it('displays feed filters when showFilters is true', () => {
    render(<FeedSidebar showFilters={true} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText(/feed filters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });

  it('calls onFilterChange when filter is changed', () => {
    render(<FeedSidebar showFilters={true} onFilterChange={mockOnFilterChange} />);

    const filterSelect = screen.getByLabelText(/filter by/i);
    fireEvent.change(filterSelect, { target: { value: 'trending' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('trending');
  });

  it('displays search input when showSearch is true', () => {
    render(<FeedSidebar showSearch={true} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls onSearch when search input is changed', () => {
    const onSearch = jest.fn();
    render(<FeedSidebar showSearch={true} onSearch={onSearch} />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'blockchain' } });

    expect(onSearch).toHaveBeenCalledWith('blockchain');
  });

  it('displays user stats when provided', () => {
    const userStats = {
      posts: 87,
      followers: 1250,
      following: 450,
    };

    render(<FeedSidebar userStats={userStats} />);

    expect(screen.getByText(/your stats/i)).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument(); // Posts
    expect(screen.getByText('1,250')).toBeInTheDocument(); // Followers
    expect(screen.getByText('450')).toBeInTheDocument(); // Following
  });

  it('displays recent activity when provided', () => {
    const recentActivity = [
      { type: 'like', user: 'Jane Doe', content: 'liked your post', time: '2h ago' },
      { type: 'comment', user: 'Bob Smith', content: 'commented on your post', time: '3h ago' },
      { type: 'follow', user: 'Alice Jones', content: 'followed you', time: '5h ago' },
    ];

    render(<FeedSidebar recentActivity={recentActivity} />);

    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('liked your post')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('commented on your post')).toBeInTheDocument();
    expect(screen.getByText('3h ago')).toBeInTheDocument();
    expect(screen.getByText('Alice Jones')).toBeInTheDocument();
    expect(screen.getByText('followed you')).toBeInTheDocument();
    expect(screen.getByText('5h ago')).toBeInTheDocument();
  });

  it('displays upcoming events when provided', () => {
    const upcomingEvents = [
      { title: 'Blockchain Conference', date: '2023-07-15', location: 'Berlin' },
      { title: 'Web3 Hackathon', date: '2023-07-22', location: 'Online' },
    ];

    render(<FeedSidebar upcomingEvents={upcomingEvents} />);

    expect(screen.getByText(/upcoming events/i)).toBeInTheDocument();
    expect(screen.getByText('Blockchain Conference')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Web3 Hackathon')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders in compact mode when isCompact is true', () => {
    render(<FeedSidebar isCompact={true} />);

    expect(screen.getByTestId('feed-sidebar')).toHaveClass('sidebar-compact');
  });

  it('renders with custom className when provided', () => {
    render(<FeedSidebar className="custom-sidebar" />);

    expect(screen.getByTestId('feed-sidebar')).toHaveClass('custom-sidebar');
  });

  it('displays see more button when there are more items than limit', () => {
    render(<FeedSidebar trendingTopics={mockTrendingTopics} topicsLimit={3} />);

    expect(screen.getByText(/see more/i)).toBeInTheDocument();
  });

  it('expands list when see more button is clicked', () => {
    render(<FeedSidebar trendingTopics={mockTrendingTopics} topicsLimit={3} />);

    // Initially only 3 topics should be visible
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#defi')).toBeInTheDocument();
    expect(screen.queryByText('#nft')).not.toBeInTheDocument();

    const seeMoreButton = screen.getByText(/see more/i);
    fireEvent.click(seeMoreButton);

    // After clicking, all topics should be visible
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#defi')).toBeInTheDocument();
    expect(screen.getByText('#nft')).toBeInTheDocument();
    expect(screen.getByText('#web3')).toBeInTheDocument();
  });
});
