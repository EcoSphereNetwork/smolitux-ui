import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrendingTopics } from '../TrendingTopics';

describe('TrendingTopics', () => {
  const mockTopicsData = {
    topics: [
      { 
        name: 'Blockchain', 
        score: 95, 
        change: 15, 
        trend: 'up',
        relatedTerms: ['cryptocurrency', 'web3', 'ethereum'],
        sentiment: 0.75
      },
      { 
        name: 'Artificial Intelligence', 
        score: 92, 
        change: 8, 
        trend: 'up',
        relatedTerms: ['machine learning', 'neural networks', 'deep learning'],
        sentiment: 0.82
      },
      { 
        name: 'Metaverse', 
        score: 88, 
        change: 12, 
        trend: 'up',
        relatedTerms: ['virtual reality', 'augmented reality', 'digital assets'],
        sentiment: 0.65
      },
      { 
        name: 'NFTs', 
        score: 85, 
        change: -3, 
        trend: 'down',
        relatedTerms: ['digital art', 'collectibles', 'tokens'],
        sentiment: 0.45
      },
      { 
        name: 'DeFi', 
        score: 82, 
        change: 5, 
        trend: 'up',
        relatedTerms: ['decentralized finance', 'yield farming', 'liquidity pools'],
        sentiment: 0.68
      }
    ],
    timeframe: 'weekly',
    lastUpdated: '2023-06-15T10:30:00Z',
    sources: ['social media', 'news articles', 'blogs', 'forums'],
    categories: [
      { name: 'Technology', count: 3 },
      { name: 'Finance', count: 2 },
      { name: 'Art', count: 1 }
    ]
  };

  const mockOnTopicClick = jest.fn();
  const mockOnTimeframeChange = jest.fn();
  const mockOnRefresh = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with topics data', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    expect(screen.getByText('Trending Topics')).toBeInTheDocument();
    expect(screen.getByText('Blockchain')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument(); // Score
    expect(screen.getByText('+15%')).toBeInTheDocument(); // Change
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument(); // Score
    expect(screen.getByText('+8%')).toBeInTheDocument(); // Change
  });

  it('displays topics in order of score', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    const topicElements = screen.getAllByTestId('topic-item');
    expect(topicElements[0]).toHaveTextContent('Blockchain');
    expect(topicElements[1]).toHaveTextContent('Artificial Intelligence');
    expect(topicElements[2]).toHaveTextContent('Metaverse');
    expect(topicElements[3]).toHaveTextContent('NFTs');
    expect(topicElements[4]).toHaveTextContent('DeFi');
  });

  it('displays trend indicators correctly', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    const upTrendIndicators = screen.getAllByTestId('trend-up');
    expect(upTrendIndicators.length).toBe(4); // 4 topics with 'up' trend
    
    const downTrendIndicators = screen.getAllByTestId('trend-down');
    expect(downTrendIndicators.length).toBe(1); // 1 topic with 'down' trend
  });

  it('calls onTopicClick when a topic is clicked', () => {
    render(
      <TrendingTopics 
        topicsData={mockTopicsData} 
        onTopicClick={mockOnTopicClick} 
      />
    );
    
    const topicElement = screen.getByText('Blockchain');
    fireEvent.click(topicElement);
    
    expect(mockOnTopicClick).toHaveBeenCalledWith(mockTopicsData.topics[0]);
  });

  it('calls onTimeframeChange when timeframe is changed', () => {
    render(
      <TrendingTopics 
        topicsData={mockTopicsData} 
        onTimeframeChange={mockOnTimeframeChange} 
      />
    );
    
    const timeframeSelect = screen.getByLabelText(/timeframe/i);
    fireEvent.change(timeframeSelect, { target: { value: 'monthly' } });
    
    expect(mockOnTimeframeChange).toHaveBeenCalledWith('monthly');
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <TrendingTopics 
        topicsData={mockTopicsData} 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <TrendingTopics 
        topicsData={mockTopicsData} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockTopicsData, expect.any(Object));
  });

  it('displays related terms when a topic is expanded', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    // Initially, related terms should not be visible
    expect(screen.queryByText('Related Terms:')).not.toBeInTheDocument();
    
    // Expand the first topic
    const expandButton = screen.getAllByRole('button', { name: /expand/i })[0];
    fireEvent.click(expandButton);
    
    // Now related terms should be visible
    expect(screen.getByText('Related Terms:')).toBeInTheDocument();
    expect(screen.getByText('cryptocurrency')).toBeInTheDocument();
    expect(screen.getByText('web3')).toBeInTheDocument();
    expect(screen.getByText('ethereum')).toBeInTheDocument();
  });

  it('displays sentiment indicators for topics', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    const sentimentIndicators = screen.getAllByTestId('sentiment-indicator');
    expect(sentimentIndicators.length).toBe(5); // One for each topic
    
    // Check that the first topic has a positive sentiment indicator
    expect(sentimentIndicators[0]).toHaveClass('sentiment-positive');
  });

  it('displays category breakdown', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    expect(screen.getByText(/category breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Count for Technology
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Count for Finance
    expect(screen.getByText('Art')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Count for Art
  });

  it('displays sources information', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    expect(screen.getByText(/sources/i)).toBeInTheDocument();
    expect(screen.getByText('social media')).toBeInTheDocument();
    expect(screen.getByText('news articles')).toBeInTheDocument();
    expect(screen.getByText('blogs')).toBeInTheDocument();
    expect(screen.getByText('forums')).toBeInTheDocument();
  });

  it('displays last updated timestamp', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/june 15, 2023/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<TrendingTopics isLoading={true} />);
    
    expect(screen.getByText(/loading trending topics/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load trending topics';
    render(<TrendingTopics error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows filtering topics by category', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    const categoryFilter = screen.getByLabelText(/filter by category/i);
    fireEvent.change(categoryFilter, { target: { value: 'Technology' } });
    
    // Only technology topics should be visible
    const topicElements = screen.getAllByTestId('topic-item');
    expect(topicElements.length).toBeLessThan(5); // Less than the total number of topics
  });

  it('allows sorting topics by different criteria', () => {
    render(<TrendingTopics topicsData={mockTopicsData} />);
    
    const sortSelect = screen.getByLabelText(/sort by/i);
    
    // Sort by change (instead of default score)
    fireEvent.change(sortSelect, { target: { value: 'change' } });
    
    // Topics should now be sorted by change
    const topicElements = screen.getAllByTestId('topic-item');
    expect(topicElements[0]).toHaveTextContent('Blockchain'); // Highest change (+15%)
  });
});