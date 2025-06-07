import React from 'react';
import { render, screen } from '@testing-library/react';
import { PieChart } from '../PieChart';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('PieChart', () => {
  const mockData = [
    { id: 'slice1', label: 'Slice 1', value: 35 },
    { id: 'slice2', label: 'Slice 2', value: 25 },
    { id: 'slice3', label: 'Slice 3', value: 20 },
    { id: 'slice4', label: 'Slice 4', value: 15 },
    { id: 'slice5', label: 'Slice 5', value: 5 },
  ];

  test('renders chart with default props', () => {
    render(<PieChart data={mockData} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('smolitux-pie-chart');

    // Legend should be rendered by default
    expect(screen.getByText('Slice 1')).toBeInTheDocument();
    expect(screen.getByText('Slice 2')).toBeInTheDocument();
    expect(screen.getByText('Slice 3')).toBeInTheDocument();
    expect(screen.getByText('Slice 4')).toBeInTheDocument();
    expect(screen.getByText('Slice 5')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<PieChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<PieChart data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<PieChart data={mockData} title="Distribution Chart" />);

    expect(screen.getByText('Distribution Chart')).toBeInTheDocument();
  });

  test('renders with values when showValues is true', () => {
    render(<PieChart data={mockData} showValues={true} />);

    // Check if values are displayed
    expect(screen.getByText('35%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  test('renders as donut chart when innerRadius is provided', () => {
    render(<PieChart data={mockData} innerRadius={0.5} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check for donut paths
    const paths = document.querySelectorAll('path.pie-slice');
    expect(paths.length).toBe(mockData.length);
  });

  test('renders with custom colors when provided', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    render(<PieChart data={mockData} colors={customColors} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check that at least one slice has the first custom color
    const paths = document.querySelectorAll('path.pie-slice');
    const redPath = Array.from(paths).find((path) => path.getAttribute('fill') === '#FF0000');

    expect(redPath).toBeInTheDocument();
  });

  test('applies custom value text color', () => {
    render(<PieChart data={mockData} showValues valueTextColor="#123456" />);

    const valueText = document.querySelector('text.value-label');
    expect(valueText).toHaveAttribute('fill', '#123456');
  });

  test('applies custom legend text color', () => {
    render(<PieChart data={mockData} legendTextColor="#654321" />);

    const legendText = document.querySelector('.legend-label');
    expect(legendText).toHaveStyle({ color: '#654321' });
  });

  test('renders without animation when animated prop is false', () => {
    render(<PieChart data={mockData} animated={false} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check that no animation styles are applied
    const paths = document.querySelectorAll('path.pie-slice');
    const animatedPaths = Array.from(paths).filter((path) =>
      path.classList.contains('animate-slice')
    );

    expect(animatedPaths.length).toBe(0);
  });

  test('renders without legend when showLegend is false', () => {
    render(<PieChart data={mockData} showLegend={false} />);

    // Legend should not be rendered
    expect(screen.queryByText('Slice 1')).not.toBeInTheDocument();
  });

  test('renders with custom legend position', () => {
    render(<PieChart data={mockData} legendPosition="right" />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Legend should be rendered
    expect(screen.getByText('Slice 1')).toBeInTheDocument();
  });

  test('renders with custom value formatter', () => {
    render(
      <PieChart data={mockData} showValues={true} formatValue={(value) => `${value} units`} />
    );

    // Check if formatted values are displayed
    expect(screen.getByText('35 units')).toBeInTheDocument();
    expect(screen.getByText('25 units')).toBeInTheDocument();
    expect(screen.getByText('20 units')).toBeInTheDocument();
    expect(screen.getByText('15 units')).toBeInTheDocument();
    expect(screen.getByText('5 units')).toBeInTheDocument();
  });

  test('renders with exploded slices when explode prop is provided', () => {
    render(<PieChart data={mockData} explode={[0]} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
