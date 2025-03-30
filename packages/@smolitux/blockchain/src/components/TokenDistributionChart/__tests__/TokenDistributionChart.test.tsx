import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenDistributionChart } from '../TokenDistributionChart';

describe('TokenDistributionChart', () => {
  const mockDistributionData = [
    { name: 'Community', value: 40, color: '#3b82f6' },
    { name: 'Team', value: 15, color: '#10b981' },
    { name: 'Foundation', value: 25, color: '#f59e0b' },
    { name: 'Investors', value: 20, color: '#ef4444' }
  ];

  const mockOnSegmentClick = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with distribution data', () => {
    render(<TokenDistributionChart distributionData={mockDistributionData} />);
    
    expect(screen.getByText('Token Distribution')).toBeInTheDocument();
    expect(screen.getByText('Community: 40%')).toBeInTheDocument();
    expect(screen.getByText('Team: 15%')).toBeInTheDocument();
    expect(screen.getByText('Foundation: 25%')).toBeInTheDocument();
    expect(screen.getByText('Investors: 20%')).toBeInTheDocument();
  });

  it('renders chart with correct segments', () => {
    render(<TokenDistributionChart distributionData={mockDistributionData} />);
    
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
    
    // Check for SVG elements
    const svgElement = chartContainer.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check for pie segments
    const segments = chartContainer.querySelectorAll('path');
    expect(segments.length).toBe(4); // One for each distribution segment
  });

  it('calls onSegmentClick when a segment is clicked', () => {
    render(
      <TokenDistributionChart 
        distributionData={mockDistributionData} 
        onSegmentClick={mockOnSegmentClick} 
      />
    );
    
    const communitySegment = screen.getByText('Community: 40%');
    fireEvent.click(communitySegment);
    
    expect(mockOnSegmentClick).toHaveBeenCalledWith(mockDistributionData[0]);
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <TokenDistributionChart 
        distributionData={mockDistributionData} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockDistributionData, expect.any(Object));
  });

  it('toggles between chart and table view', () => {
    render(<TokenDistributionChart distributionData={mockDistributionData} />);
    
    // Initially in chart view
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    
    // Switch to table view
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    expect(screen.queryByTestId('chart-container')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Switch back to chart view
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);
    
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays table with correct data in table view', () => {
    render(<TokenDistributionChart distributionData={mockDistributionData} />);
    
    // Switch to table view
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check table headers
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    
    // Check table rows
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5); // Header + 4 data rows
    
    // Check cell contents
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('displays chart title when provided', () => {
    const title = 'ECO Token Distribution';
    render(
      <TokenDistributionChart 
        distributionData={mockDistributionData} 
        title={title} 
      />
    );
    
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<TokenDistributionChart isLoading={true} />);
    
    expect(screen.getByText(/loading distribution data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load distribution data';
    render(<TokenDistributionChart error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays empty state when no distribution data is provided', () => {
    render(<TokenDistributionChart distributionData={[]} />);
    
    expect(screen.getByText(/no distribution data available/i)).toBeInTheDocument();
  });

  it('displays legend with correct colors', () => {
    render(<TokenDistributionChart distributionData={mockDistributionData} />);
    
    const legendItems = screen.getAllByTestId('legend-item');
    expect(legendItems.length).toBe(4); // One for each distribution segment
    
    // Check color indicators
    const colorIndicators = screen.getAllByTestId('color-indicator');
    expect(colorIndicators.length).toBe(4);
    
    // Check that colors match the data
    expect(colorIndicators[0]).toHaveStyle(`background-color: ${mockDistributionData[0].color}`);
    expect(colorIndicators[1]).toHaveStyle(`background-color: ${mockDistributionData[1].color}`);
    expect(colorIndicators[2]).toHaveStyle(`background-color: ${mockDistributionData[2].color}`);
    expect(colorIndicators[3]).toHaveStyle(`background-color: ${mockDistributionData[3].color}`);
  });

  it('highlights selected segment when clicked', () => {
    render(
      <TokenDistributionChart 
        distributionData={mockDistributionData} 
        onSegmentClick={mockOnSegmentClick} 
      />
    );
    
    const communitySegment = screen.getByText('Community: 40%');
    fireEvent.click(communitySegment);
    
    // The segment should be highlighted
    expect(communitySegment).toHaveClass('selected');
    
    // Click another segment
    const teamSegment = screen.getByText('Team: 15%');
    fireEvent.click(teamSegment);
    
    // The new segment should be highlighted and the previous one should not
    expect(teamSegment).toHaveClass('selected');
    expect(communitySegment).not.toHaveClass('selected');
  });

  it('displays detailed information when a segment is selected', () => {
    render(
      <TokenDistributionChart 
        distributionData={mockDistributionData} 
        showDetailedView={true}
      />
    );
    
    const communitySegment = screen.getByText('Community: 40%');
    fireEvent.click(communitySegment);
    
    expect(screen.getByText(/selected segment/i)).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });
});