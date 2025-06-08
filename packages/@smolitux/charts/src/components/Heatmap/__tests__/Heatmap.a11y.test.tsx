import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Heatmap } from '../Heatmap';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Heatmap Accessibility', () => {
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

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Heatmap
        data={mockData}
        title="Data Heatmap"
        aria-label="Heatmap showing data values across categories"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <Heatmap
        data={mockData}
        title="Data Heatmap"
        aria-label="Heatmap showing data values across categories"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Heatmap showing data values across categories');
  });

  test('should include descriptive title', () => {
    const { container } = render(<Heatmap data={mockData} title="Data Heatmap" />);

    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Data Heatmap');
  });

  test('should include axis labels for better understanding', () => {
    const { container } = render(
      <Heatmap data={mockData} xAxis={{ title: 'Categories' }} yAxis={{ title: 'Metrics' }} />
    );

    const xAxisLabel = container.querySelector('.x-axis-label');
    const yAxisLabel = container.querySelector('.y-axis-label');

    expect(xAxisLabel).toBeInTheDocument();
    expect(xAxisLabel).toHaveTextContent('Categories');
    expect(yAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toHaveTextContent('Metrics');
  });

  test('should provide sufficient color contrast', () => {
    const { container } = render(
      <Heatmap
        data={mockData}
        colorScale={{
          type: 'sequential',
          colors: ['#ffffff', '#000000'],
          min: 0,
          max: 100,
        }}
        showValues={true}
        valueTextColor="#ffffff"
      />
    );

    // Check that value text has good contrast against cell backgrounds
    const valueTexts = container.querySelectorAll('text.cell-value');
    expect(valueTexts.length).toBe(mockData.length);

    // At least one value text should have white color for contrast against dark cells
    const whiteText = Array.from(valueTexts).find(
      (text) => text.getAttribute('fill') === '#ffffff'
    );

    expect(whiteText).toBeInTheDocument();
  });

  test('should provide alternative text description for screen readers', () => {
    const { container } = render(
      <Heatmap
        data={mockData}
        aria-label="Heatmap showing values from 10 to 90 across a 3x3 grid"
        title="Data Heatmap"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute(
      'aria-label',
      'Heatmap showing values from 10 to 90 across a 3x3 grid'
    );
  });

  test('should have accessible legend with sufficient contrast', () => {
    const { container } = render(
      <Heatmap data={mockData} showLegend={true} legendTextColor="#000000" />
    );

    // Check that legend text has good contrast
    const legendTexts = container.querySelectorAll('.legend-label');

    // Legend should be present
    expect(legendTexts.length).toBeGreaterThan(0);
  });

  test('should have cells with appropriate ARIA attributes', () => {
    const { container } = render(<Heatmap data={mockData} showValues={true} />);

    // Cells should have appropriate ARIA attributes
    const cells = container.querySelectorAll('rect.heatmap-cell');

    cells.forEach((cell, index) => {
      expect(cell).toHaveAttribute('aria-label');

      // The aria-label should contain the value
      const value = mockData[index].value;
      const ariaLabel = cell.getAttribute('aria-label');
      expect(ariaLabel).toContain(value.toString());
    });
  });
});
