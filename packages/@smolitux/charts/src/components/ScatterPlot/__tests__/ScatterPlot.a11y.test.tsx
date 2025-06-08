import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ScatterPlot } from '../ScatterPlot';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('ScatterPlot Accessibility', () => {
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

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        title="Data Scatter Plot"
        aria-label="Scatter plot showing data points across x and y axes"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        title="Data Scatter Plot"
        aria-label="Scatter plot showing data points across x and y axes"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute(
      'aria-label',
      'Scatter plot showing data points across x and y axes'
    );
  });

  test('should include descriptive title', () => {
    const { container } = render(<ScatterPlot data={mockData} title="Data Scatter Plot" />);

    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Data Scatter Plot');
  });

  test('should include axis labels for better understanding', () => {
    const { container } = render(
      <ScatterPlot data={mockData} axisLabels={{ x: 'X Values', y: 'Y Values' }} />
    );

    const xAxisLabel = container.querySelector('.x-axis-label');
    const yAxisLabel = container.querySelector('.y-axis-label');

    expect(xAxisLabel).toBeInTheDocument();
    expect(xAxisLabel).toHaveTextContent('X Values');
    expect(yAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toHaveTextContent('Y Values');
  });

  test('should provide sufficient color contrast', () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        colors={['#000080']} // Dark blue
        axisLabelColor="#000000" // Black text
      />
    );

    // Check that axis labels have good contrast
    const axisLabels = container.querySelectorAll('text.axis-label');
    expect(axisLabels.length).toBeGreaterThan(0);

    // Axis labels should have black color for contrast
    const blackLabel = Array.from(axisLabels).find(
      (label) => label.getAttribute('fill') === '#000000'
    );

    expect(blackLabel).toBeInTheDocument();
  });

  test('should provide alternative text description for screen readers', () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        aria-label="Scatter plot showing 6 data points with varying x and y values"
        title="Data Scatter Plot"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute(
      'aria-label',
      'Scatter plot showing 6 data points with varying x and y values'
    );
  });

  test('should have accessible legend with sufficient contrast', () => {
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

    const { container } = render(
      <ScatterPlot data={multiSeriesData} showLegend={true} legendTextColor="#000000" />
    );

    // Check that legend text has good contrast
    const legendTexts = container.querySelectorAll('text.legend-label');
    expect(legendTexts.length).toBe(multiSeriesData.length);

    // Legend text should have black color for contrast
    const blackText = Array.from(legendTexts).find(
      (text) => text.getAttribute('fill') === '#000000'
    );

    expect(blackText).toBeInTheDocument();
  });

  test('should have accessible data points with appropriate ARIA attributes', () => {
    const { container } = render(<ScatterPlot data={mockData} />);

    // Data points should have appropriate ARIA attributes
    const dataPoints = container.querySelectorAll('circle.data-point');
    expect(dataPoints.length).toBe(mockData.data.length);

    dataPoints.forEach((point, index) => {
      expect(point).toHaveAttribute('aria-label');

      // The aria-label should contain the x and y values
      const { x, y } = mockData.data[index];
      const ariaLabel = point.getAttribute('aria-label');
      expect(ariaLabel).toContain(x.toString());
      expect(ariaLabel).toContain(y.toString());
    });
  });

  test('should have accessible grid lines when shown', () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        showGrid={true}
        gridColor="#cccccc" // Light gray for subtle grid
      />
    );

    // Grid lines should be rendered
    const gridLines = container.querySelectorAll('line.grid-line');
    expect(gridLines.length).toBeGreaterThan(0);

    // Grid lines should have appropriate color for subtle presentation
    const grayLine = Array.from(gridLines).find(
      (line) => line.getAttribute('stroke') === '#cccccc'
    );

    expect(grayLine).toBeInTheDocument();
  });

  test('should have accessible trend line when shown', () => {
    const { container } = render(
      <ScatterPlot
        data={mockData}
        showTrendLine={true}
        trendLineColor="#000000" // Black for good contrast
      />
    );

    // Trend line should be rendered
    const trendLine = container.querySelector('line.trend-line');
    expect(trendLine).toBeInTheDocument();

    // Trend line should have good contrast
    expect(trendLine).toHaveAttribute('stroke', '#000000');
  });
});
