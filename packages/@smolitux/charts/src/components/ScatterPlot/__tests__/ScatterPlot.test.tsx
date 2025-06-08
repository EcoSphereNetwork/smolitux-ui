import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScatterPlot } from '../ScatterPlot';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('ScatterPlot', () => {
  const mockData = {
    id: 'dataset1',
    name: 'Dataset 1',
    data: [
      { x: 10, y: 20, size: 5 },
      { x: 15, y: 30, size: 8 },
      { x: 20, y: 15, size: 6 },
      { x: 25, y: 40, size: 10 },
      { x: 30, y: 25, size: 7 },
      { x: 35, y: 35, size: 9 },
    ],
  };

  test('renders chart with default props', () => {
    render(<ScatterPlot data={mockData} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Points should be rendered
    const points = document.querySelectorAll('circle.data-point');
    expect(points.length).toBe(mockData.data.length);
  });

  test('passes height and width properties correctly', () => {
    render(<ScatterPlot data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<ScatterPlot data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<ScatterPlot data={mockData} title="Scatter Plot Chart" />);

    expect(screen.getByText('Scatter Plot Chart')).toBeInTheDocument();
  });

  test('renders axis labels when provided', () => {
    render(<ScatterPlot data={mockData} axisLabels={{ x: 'X Axis', y: 'Y Axis' }} />);

    expect(screen.getByText('X Axis')).toBeInTheDocument();
    expect(screen.getByText('Y Axis')).toBeInTheDocument();
  });

  test('handles array of data series', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'dataset2',
        name: 'Dataset 2',
        data: [
          { x: 12, y: 22, size: 5 },
          { x: 17, y: 32, size: 8 },
          { x: 22, y: 17, size: 6 },
          { x: 27, y: 42, size: 10 },
          { x: 32, y: 27, size: 7 },
          { x: 37, y: 37, size: 9 },
        ],
      },
    ];

    render(<ScatterPlot data={multiSeriesData} />);

    // Both series names should be in the legend
    expect(screen.getByText('Dataset 1')).toBeInTheDocument();
    expect(screen.getByText('Dataset 2')).toBeInTheDocument();

    // Points from both series should be rendered
    const points = document.querySelectorAll('circle.data-point');
    expect(points.length).toBe(mockData.data.length * 2);
  });

  test('renders with custom colors', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<ScatterPlot data={mockData} colors={customColors} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Points should have the first custom color
    const points = document.querySelectorAll('circle.data-point');
    const redPoint = Array.from(points).find((point) => point.getAttribute('fill') === '#FF0000');

    expect(redPoint).toBeInTheDocument();
  });

  test('renders with custom point size', () => {
    render(<ScatterPlot data={mockData} pointSize={10} />);

    // Points should have the specified size
    const points = document.querySelectorAll('circle.data-point');
    const firstPoint = points[0];

    expect(firstPoint).toHaveAttribute('r', '10');
  });

  test('renders with variable point sizes when sizeScale is provided', () => {
    render(<ScatterPlot data={mockData} sizeScale={{ min: 5, max: 20 }} />);

    // Points should have different sizes
    const points = document.querySelectorAll('circle.data-point');
    const radii = Array.from(points).map((point) => parseFloat(point.getAttribute('r') || '0'));

    // Check that there are different sizes
    const uniqueRadii = new Set(radii);
    expect(uniqueRadii.size).toBeGreaterThan(1);
  });

  test('renders with grid when showGrid is true', () => {
    render(<ScatterPlot data={mockData} showGrid={true} />);

    // Grid lines should be rendered
    const gridLines = document.querySelectorAll('line.grid-line');
    expect(gridLines.length).toBeGreaterThan(0);
  });

  test('renders with animation when animated is true', () => {
    render(<ScatterPlot data={mockData} animated={true} />);

    // Points should have animation class
    const points = document.querySelectorAll('circle.data-point');
    const animatedPoints = Array.from(points).filter((point) =>
      point.classList.contains('animate-fade-in')
    );

    expect(animatedPoints.length).toBeGreaterThan(0);
  });

  test('renders without animation when animated is false', () => {
    render(<ScatterPlot data={mockData} animated={false} />);

    // Points should not have animation class
    const points = document.querySelectorAll('circle.data-point');
    const animatedPoints = Array.from(points).filter((point) =>
      point.classList.contains('animate-fade-in')
    );

    expect(animatedPoints.length).toBe(0);
  });

  test('renders with custom axis scales', () => {
    render(
      <ScatterPlot data={mockData} xScale={{ min: 0, max: 50 }} yScale={{ min: 0, max: 50 }} />
    );

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders with trend line when showTrendLine is true', () => {
    render(<ScatterPlot data={mockData} showTrendLine={true} />);

    // Trend line should be rendered
    const trendLine = document.querySelector('line.trend-line');
    expect(trendLine).toBeInTheDocument();
  });

  test('renders with legend when showLegend is true', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'dataset2',
        name: 'Dataset 2',
        data: [
          { x: 12, y: 22, size: 5 },
          { x: 17, y: 32, size: 8 },
          { x: 22, y: 17, size: 6 },
          { x: 27, y: 42, size: 10 },
          { x: 32, y: 27, size: 7 },
          { x: 37, y: 37, size: 9 },
        ],
      },
    ];

    render(<ScatterPlot data={multiSeriesData} showLegend={true} />);

    // Legend should be rendered
    expect(screen.getByText('Dataset 1')).toBeInTheDocument();
    expect(screen.getByText('Dataset 2')).toBeInTheDocument();
  });

  test('renders without legend when showLegend is false', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'dataset2',
        name: 'Dataset 2',
        data: [
          { x: 12, y: 22, size: 5 },
          { x: 17, y: 32, size: 8 },
          { x: 22, y: 17, size: 6 },
          { x: 27, y: 42, size: 10 },
          { x: 32, y: 27, size: 7 },
          { x: 37, y: 37, size: 9 },
        ],
      },
    ];

    render(<ScatterPlot data={multiSeriesData} showLegend={false} />);

    // Legend should not be rendered
    expect(screen.queryByText('Dataset 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Dataset 2')).not.toBeInTheDocument();
  });

  test('renders with tooltip when showTooltip is true', () => {
    render(<ScatterPlot data={mockData} showTooltip={true} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
