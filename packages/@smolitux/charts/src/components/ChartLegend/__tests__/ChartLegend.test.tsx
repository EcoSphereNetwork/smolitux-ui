import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartLegend } from '../ChartLegend';

describe('ChartLegend', () => {
  const items = [
    { label: 'A', color: '#ff0000' },
    { label: 'B', color: '#00ff00' },
  ];

  it('renders legend items', () => {
    render(
      <svg>
        <ChartLegend items={items} />
      </svg>,
    );
    expect(screen.getByTestId('chart-legend')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
