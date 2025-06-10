import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenDistributionChart, TokenDistributionSegment } from '../TokenDistributionChart';

describe('TokenDistributionChart', () => {
  const segments: TokenDistributionSegment[] = [
    { name: 'Community', value: 40, color: '#3b82f6' },
    { name: 'Team', value: 60, color: '#10b981' },
  ];

  test('renders segment names', () => {
    render(<TokenDistributionChart segments={segments} />);
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  test('calls onSegmentClick', () => {
    const handleClick = jest.fn();
    render(<TokenDistributionChart segments={segments} onSegmentClick={handleClick} />);
    fireEvent.click(screen.getByText('Community'));
    expect(handleClick).toHaveBeenCalledWith(segments[0]);
  });
});
