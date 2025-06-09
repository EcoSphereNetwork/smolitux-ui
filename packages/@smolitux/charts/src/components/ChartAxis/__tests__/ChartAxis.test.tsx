import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartAxis } from '../ChartAxis';

describe('ChartAxis', () => {
  it('renders axis line', () => {
    render(
      <svg>
        <ChartAxis length={100} />
      </svg>,
    );
    expect(screen.getByTestId('chart-axis')).toBeInTheDocument();
  });

  it('renders ticks', () => {
    const ticks = [
      { value: 0, position: 0 },
      { value: 10, position: 1 },
    ];
    render(
      <svg>
        <ChartAxis length={100} ticks={ticks} />
      </svg>,
    );
    expect(screen.getAllByText('0')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
  });
});
