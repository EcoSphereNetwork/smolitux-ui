import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BarChart } from '../BarChart';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('BarChart Accessibility', () => {
  const mockData = {
    id: 'sales',
    name: 'Sales 2025',
    data: [
      { label: 'Q1', value: 150 },
      { label: 'Q2', value: 230 },
      { label: 'Q3', value: 180 },
      { label: 'Q4', value: 275 },
    ]
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <BarChart 
        data={mockData}
        title="Quarterly Sales"
        aria-label="Chart: Quarterly Sales"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <BarChart 
        data={mockData}
        title="Quarterly Sales"
        aria-label="Chart: Quarterly Sales"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Chart: Quarterly Sales');
  });

  test('should include descriptive title', () => {
    const { container } = render(
      <BarChart 
        data={mockData}
        title="Quarterly Sales"
      />
    );
    
    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Quarterly Sales');
  });

  test('should include axis labels for better understanding', () => {
    const { container } = render(
      <BarChart 
        data={mockData}
        axisLabels={{ x: 'Quarters', y: 'Revenue ($)' }}
      />
    );
    
    const xAxisLabel = container.querySelector('.x-axis-label');
    const yAxisLabel = container.querySelector('.y-axis-label');
    
    expect(xAxisLabel).toBeInTheDocument();
    expect(xAxisLabel).toHaveTextContent('Quarters');
    expect(yAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toHaveTextContent('Revenue ($)');
  });
});