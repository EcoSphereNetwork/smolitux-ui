import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeedFilter } from './FeedFilter';

describe('FeedFilter', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSortChange = jest.fn();
  const mockOnTagSelect = jest.fn();
  const mockOnTimeRangeChange = jest.fn();

  const mockTags = ['blockchain', 'crypto', 'defi', 'nft', 'web3'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<FeedFilter />);
    
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
  });

  it('calls onFilterChange when filter is changed', () => {
    render(<FeedFilter onFilterChange={mockOnFilterChange} />);
    
    const filterSelect = screen.getByLabelText(/filter by/i);
    fireEvent.change(filterSelect, { target: { value: 'trending' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('trending');
  });

  it('calls onSortChange when sort is changed', () => {
    render(<FeedFilter onSortChange={mockOnSortChange} />);
    
    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'newest' } });
    
    expect(mockOnSortChange).toHaveBeenCalledWith('newest');
  });

  it('displays available tags when provided', () => {
    render(<FeedFilter tags={mockTags} onTagSelect={mockOnTagSelect} />);
    
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
    expect(screen.getByText('blockchain')).toBeInTheDocument();
    expect(screen.getByText('crypto')).toBeInTheDocument();
    expect(screen.getByText('defi')).toBeInTheDocument();
    expect(screen.getByText('nft')).toBeInTheDocument();
    expect(screen.getByText('web3')).toBeInTheDocument();
  });

  it('calls onTagSelect when a tag is clicked', () => {
    render(<FeedFilter tags={mockTags} onTagSelect={mockOnTagSelect} />);
    
    const tag = screen.getByText('blockchain');
    fireEvent.click(tag);
    
    expect(mockOnTagSelect).toHaveBeenCalledWith('blockchain');
  });

  it('displays selected tags with active state', () => {
    render(<FeedFilter tags={mockTags} selectedTags={['blockchain', 'defi']} onTagSelect={mockOnTagSelect} />);
    
    const blockchainTag = screen.getByText('blockchain');
    const defiTag = screen.getByText('defi');
    
    expect(blockchainTag).toHaveClass('tag-active');
    expect(defiTag).toHaveClass('tag-active');
  });

  it('displays time range selector when showTimeRange is true', () => {
    render(<FeedFilter showTimeRange={true} onTimeRangeChange={mockOnTimeRangeChange} />);
    
    expect(screen.getByText(/time range/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
  });

  it('calls onTimeRangeChange when time range is changed', () => {
    render(<FeedFilter showTimeRange={true} onTimeRangeChange={mockOnTimeRangeChange} />);
    
    const fromInput = screen.getByLabelText(/from/i);
    const toInput = screen.getByLabelText(/to/i);
    
    fireEvent.change(fromInput, { target: { value: '2023-01-01' } });
    fireEvent.change(toInput, { target: { value: '2023-06-30' } });
    
    expect(mockOnTimeRangeChange).toHaveBeenCalledWith({
      from: '2023-01-01',
      to: '2023-06-30'
    });
  });

  it('displays filter presets when provided', () => {
    const filterPresets = [
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' }
    ];
    
    render(<FeedFilter filterPresets={filterPresets} onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('This Week')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter preset is clicked', () => {
    const filterPresets = [
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' }
    ];
    
    render(<FeedFilter filterPresets={filterPresets} onFilterChange={mockOnFilterChange} />);
    
    const todayPreset = screen.getByText('Today');
    fireEvent.click(todayPreset);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('today');
  });

  it('displays active filter preset', () => {
    const filterPresets = [
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' }
    ];
    
    render(<FeedFilter filterPresets={filterPresets} activeFilter="week" onFilterChange={mockOnFilterChange} />);
    
    const weekPreset = screen.getByText('This Week');
    expect(weekPreset).toHaveClass('preset-active');
  });

  it('displays search input when showSearch is true', () => {
    render(<FeedFilter showSearch={true} />);
    
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls onSearch when search input is changed', () => {
    const onSearch = jest.fn();
    render(<FeedFilter showSearch={true} onSearch={onSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'blockchain' } });
    
    expect(onSearch).toHaveBeenCalledWith('blockchain');
  });

  it('displays clear filters button when filters are applied', () => {
    render(<FeedFilter selectedTags={['blockchain']} activeFilter="trending" onClearFilters={jest.fn()} />);
    
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  it('calls onClearFilters when clear filters button is clicked', () => {
    const onClearFilters = jest.fn();
    render(<FeedFilter selectedTags={['blockchain']} activeFilter="trending" onClearFilters={onClearFilters} />);
    
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);
    
    expect(onClearFilters).toHaveBeenCalled();
  });

  it('displays filter count when filters are applied', () => {
    render(<FeedFilter selectedTags={['blockchain', 'defi']} activeFilter="trending" />);
    
    expect(screen.getByText(/3 filters applied/i)).toBeInTheDocument();
  });

  it('renders in compact mode when isCompact is true', () => {
    render(<FeedFilter isCompact={true} />);
    
    expect(screen.getByTestId('feed-filter')).toHaveClass('filter-compact');
  });

  it('renders in vertical mode when isVertical is true', () => {
    render(<FeedFilter isVertical={true} />);
    
    expect(screen.getByTestId('feed-filter')).toHaveClass('filter-vertical');
  });

  it('renders with custom className when provided', () => {
    render(<FeedFilter className="custom-filter" />);
    
    expect(screen.getByTestId('feed-filter')).toHaveClass('custom-filter');
  });
});