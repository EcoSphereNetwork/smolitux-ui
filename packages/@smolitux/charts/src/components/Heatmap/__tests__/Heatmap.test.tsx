import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heatmap } from '../Heatmap';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Heatmap', () => {
  const mockData = [
    { x: 'A', y: '1', value: 10 },
    { x: 'A', y: '2', value: 20 },
    { x: 'A', y: '3', value: 30 },
    { x: 'B', y: '1', value: 40 },
    { x: 'B', y: '2', value: 50 },
    { x: 'B', y: '3', value: 60 },
    { x: 'C', y: '1', value: 70 },
    { x: 'C', y: '2', value: 80 },
    { x: 'C', y: '3', value: 90 },
  ];

  test('renders chart with default props', () => {
    render(<Heatmap data={mockData} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Cells should be rendered
    const cells = document.querySelectorAll('rect.heatmap-cell');
    expect(cells.length).toBe(mockData.length);
  });

  test('passes height and width properties correctly', () => {
    render(<Heatmap data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<Heatmap data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<Heatmap data={mockData} title="Heat Map Chart" />);

    expect(screen.getByText('Heat Map Chart')).toBeInTheDocument();
  });

  test('renders axis labels when provided', () => {
    render(<Heatmap data={mockData} xAxis={{ title: 'X Axis' }} yAxis={{ title: 'Y Axis' }} />);

    expect(screen.getByText('X Axis')).toBeInTheDocument();
    expect(screen.getByText('Y Axis')).toBeInTheDocument();
  });

  test('renders with custom color scale', () => {
    const colorScale = {
      type: 'sequential' as const,
      colors: ['#ffffff', '#ff0000'],
      min: 0,
      max: 100,
    };

    render(<Heatmap data={mockData} colorScale={colorScale} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Cells should be rendered with different colors
    const cells = document.querySelectorAll('rect.heatmap-cell');
    expect(cells.length).toBe(mockData.length);

    // Check that cells have different fill colors
    const fillColors = new Set();
    cells.forEach((cell) => {
      fillColors.add(cell.getAttribute('fill'));
    });

    // Should have more than one color
    expect(fillColors.size).toBeGreaterThan(1);
  });

  test('renders with custom cell size', () => {
    render(<Heatmap data={mockData} cellSize={50} />);

    // Cells should be rendered with the specified size
    const cells = document.querySelectorAll('rect.heatmap-cell');
    const firstCell = cells[0];

    expect(firstCell).toHaveAttribute('width', '50');
    expect(firstCell).toHaveAttribute('height', '50');
  });

  test('renders with cell borders when showBorders is true', () => {
    render(<Heatmap data={mockData} showBorders={true} />);

    // Cells should have stroke attribute
    const cells = document.querySelectorAll('rect.heatmap-cell');
    const firstCell = cells[0];

    expect(firstCell).toHaveAttribute('stroke');
  });

  test('renders with cell labels when showValues is true', () => {
    render(<Heatmap data={mockData} showValues={true} />);

    // Value labels should be rendered
    const valueLabels = document.querySelectorAll('text.cell-value');
    expect(valueLabels.length).toBe(mockData.length);

    // Check that the first value label has the correct text
    expect(valueLabels[0]).toHaveTextContent('10');
  });

  test('renders with custom value formatter', () => {
    render(<Heatmap data={mockData} showValues={true} formatValue={(value) => `${value}%`} />);

    // Value labels should be rendered with the custom format
    const valueLabels = document.querySelectorAll('text.cell-value');
    expect(valueLabels[0]).toHaveTextContent('10%');
  });

  test('renders with legend when showLegend is true', () => {
    render(<Heatmap data={mockData} showLegend={true} />);

    // Legend should be rendered
    const legend = document.querySelector('.heatmap-legend');
    expect(legend).toBeInTheDocument();
  });

  test('renders with custom legend position', () => {
    render(<Heatmap data={mockData} showLegend={true} legendPosition="right" />);

    // Legend should be rendered
    const legend = document.querySelector('.heatmap-legend');
    expect(legend).toBeInTheDocument();
  });

  test('renders with tooltip when showTooltip is true', () => {
    render(<Heatmap data={mockData} showTooltip={true} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders with animation when animated is true', () => {
    render(<Heatmap data={mockData} animated={true} />);

    // Cells should have animation class
    const cells = document.querySelectorAll('rect.heatmap-cell');
    const animatedCells = Array.from(cells).filter((cell) =>
      cell.classList.contains('animate-fade-in')
    );

    expect(animatedCells.length).toBeGreaterThan(0);
  });
});
