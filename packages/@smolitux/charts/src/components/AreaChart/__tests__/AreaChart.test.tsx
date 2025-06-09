import React from 'react';
import { render, screen } from '@testing-library/react';
import { AreaChart } from '../AreaChart';

// Mock für useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('AreaChart', () => {
  const mockData = {
    id: 'testSeries',
    name: 'Test Data',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'May', y: 180 },
    ],
  };

  test('renders chart with default props', () => {
    render(<AreaChart data={mockData} />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(screen.getByText('Test Data')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<AreaChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<AreaChart data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
    expect(svg).toHaveClass('smolitux-area-chart');
  });

  test('handles array of data series', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'secondSeries',
        name: 'Second Series',
        data: [
          { x: 'Jan', y: 50 },
          { x: 'Feb', y: 70 },
          { x: 'Mar', y: 90 },
          { x: 'Apr', y: 60 },
          { x: 'May', y: 80 },
        ],
      },
    ];

    render(<AreaChart data={multiSeriesData} />);

    expect(screen.getByText('Test Data')).toBeInTheDocument();
    expect(screen.getByText('Second Series')).toBeInTheDocument();
  });

  test('renders with title when provided', () => {
    render(<AreaChart data={mockData} title="Test Chart Title" />);

    expect(screen.getByText('Test Chart Title')).toBeInTheDocument();
  });

  test('handles malformed data gracefully', () => {
    const badData: any = { id: 'bad' };
    render(<AreaChart data={badData} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
