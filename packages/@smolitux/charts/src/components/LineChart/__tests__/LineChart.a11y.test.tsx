import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LineChart } from '../LineChart';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('LineChart Accessibility', () => {
  const mockData = {
    id: 'temperature',
    name: 'Temperature',
    data: [
      { x: 'Jan', y: 5 },
      { x: 'Feb', y: 7 },
      { x: 'Mar', y: 12 },
      { x: 'Apr', y: 15 },
      { x: 'May', y: 20 },
      { x: 'Jun', y: 25 }
    ]
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <LineChart 
        data={mockData}
        title="Monthly Temperature"
        aria-label="Chart: Monthly Temperature"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <LineChart 
        data={mockData}
        title="Monthly Temperature"
        aria-label="Chart: Monthly Temperature"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Chart: Monthly Temperature');
  });

  test('should include descriptive title', () => {
    const { container } = render(
      <LineChart 
        data={mockData}
        title="Monthly Temperature"
      />
    );
    
    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Monthly Temperature');
  });

  test('should include axis labels for better understanding', () => {
    const { container } = render(
      <LineChart 
        data={mockData}
        axisLabels={{ x: 'Month', y: 'Temperature (°C)' }}
      />
    );
    
    const xAxisLabel = container.querySelector('.x-axis-label');
    const yAxisLabel = container.querySelector('.y-axis-label');
    
    expect(xAxisLabel).toBeInTheDocument();
    expect(xAxisLabel).toHaveTextContent('Month');
    expect(yAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toHaveTextContent('Temperature (°C)');
  });

  test('should provide alternative text description for screen readers', () => {
    const { container } = render(
      <LineChart 
        data={mockData}
        aria-label="Temperature chart showing an increase from 5°C in January to 25°C in June"
        title="Monthly Temperature"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Temperature chart showing an increase from 5°C in January to 25°C in June');
  });
});