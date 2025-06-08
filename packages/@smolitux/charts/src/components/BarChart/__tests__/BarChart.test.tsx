import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarChart } from '../BarChart';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('BarChart', () => {
  const mockData = {
    id: 'sales',
    name: 'Sales 2025',
    data: [
      { label: 'Q1', value: 150 },
      { label: 'Q2', value: 230 },
      { label: 'Q3', value: 180 },
      { label: 'Q4', value: 275 },
    ],
  };

  test('renders chart with default props', () => {
    render(<BarChart data={mockData} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Legend should be rendered by default
    expect(screen.getByText('Sales 2025')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<BarChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<BarChart data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<BarChart data={mockData} title="Sales Report" />);

    expect(screen.getByText('Sales Report')).toBeInTheDocument();
  });

  test('renders axis labels when provided', () => {
    render(<BarChart data={mockData} axisLabels={{ x: 'Quarters', y: 'Revenue' }} />);

    expect(screen.getByText('Quarters')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  test('renders y-axis unit when provided', () => {
    render(<BarChart data={mockData} yUnit="$" showValues={true} />);

    // Check if at least one value has the unit
    const valueWithUnit = screen.getByText('150 $');
    expect(valueWithUnit).toBeInTheDocument();
  });

  test('handles array of data series', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'forecast',
        name: 'Forecast 2026',
        data: [
          { label: 'Q1', value: 180 },
          { label: 'Q2', value: 250 },
          { label: 'Q3', value: 200 },
          { label: 'Q4', value: 300 },
        ],
      },
    ];

    render(<BarChart data={multiSeriesData} />);

    // Both series names should be in the legend
    expect(screen.getByText('Sales 2025')).toBeInTheDocument();
    expect(screen.getByText('Forecast 2026')).toBeInTheDocument();
  });

  test('renders horizontal bars when horizontal prop is true', () => {
    render(<BarChart data={mockData} horizontal={true} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders stacked bars when stacked prop is true', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'forecast',
        name: 'Forecast 2026',
        data: [
          { label: 'Q1', value: 180 },
          { label: 'Q2', value: 250 },
          { label: 'Q3', value: 200 },
          { label: 'Q4', value: 300 },
        ],
      },
    ];

    render(<BarChart data={multiSeriesData} stacked={true} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders without animation when animated prop is false', () => {
    render(<BarChart data={mockData} animated={false} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check that no animation styles are applied
    const rects = document.querySelectorAll('rect');
    const animatedRects = Array.from(rects).filter(
      (rect) => rect.classList.contains('animate-rise') || rect.classList.contains('animate-grow')
    );

    expect(animatedRects.length).toBe(0);
  });

  test('renders without legend when showLegend is false', () => {
    render(<BarChart data={mockData} showLegend={false} />);

    // Legend should not be rendered
    expect(screen.queryByText('Sales 2025')).not.toBeInTheDocument();
  });

  test('renders with custom colors when provided', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<BarChart data={mockData} colors={customColors} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check that at least one rect has the first custom color
    const rects = document.querySelectorAll('rect');
    const redRect = Array.from(rects).find((rect) => rect.getAttribute('fill') === '#FF0000');

    expect(redRect).toBeInTheDocument();
  });

  test('applies custom value text color', () => {
    render(<BarChart data={mockData} showValues valueTextColor="#123456" />);

    const text = document.querySelector('text');
    expect(text).toHaveAttribute('fill', '#123456');
  });

  test('applies custom legend text color', () => {
    render(<BarChart data={mockData} legendTextColor="#654321" />);

    const legendText = screen.getByText('Sales 2025');
    expect(legendText).toHaveAttribute('fill', '#654321');
  });

  test('handles malformed data gracefully', () => {
    const badData: any = { id: 'bad' };
    render(<BarChart data={badData} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
