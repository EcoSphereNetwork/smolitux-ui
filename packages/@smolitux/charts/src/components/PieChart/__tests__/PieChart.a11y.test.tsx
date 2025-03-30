import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PieChart } from '../PieChart';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('PieChart Accessibility', () => {
  const mockData = [
    { id: 'slice1', label: 'Slice 1', value: 35 },
    { id: 'slice2', label: 'Slice 2', value: 25 },
    { id: 'slice3', label: 'Slice 3', value: 20 },
    { id: 'slice4', label: 'Slice 4', value: 15 },
    { id: 'slice5', label: 'Slice 5', value: 5 }
  ];

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        title="Distribution Chart"
        aria-label="Chart: Distribution of values"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        title="Distribution Chart"
        aria-label="Chart: Distribution of values"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Chart: Distribution of values');
  });

  test('should include descriptive title', () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        title="Distribution Chart"
      />
    );
    
    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Distribution Chart');
  });

  test('should provide accessible color contrast', () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        colors={['#000000', '#FFFFFF', '#0000FF', '#FF0000', '#00FF00']}
        showValues={true}
        valueTextColor="#000000"
      />
    );
    
    // Check that value text has good contrast against slice colors
    const valueTexts = container.querySelectorAll('text.value-label');
    expect(valueTexts.length).toBe(mockData.length);
    
    // At least one value text should have black color for contrast
    const blackText = Array.from(valueTexts).find(text => 
      text.getAttribute('fill') === '#000000'
    );
    
    expect(blackText).toBeInTheDocument();
  });

  test('should provide alternative text description for screen readers', () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        aria-label="Distribution chart showing Slice 1 at 35%, Slice 2 at 25%, Slice 3 at 20%, Slice 4 at 15%, and Slice 5 at 5%"
        title="Distribution Chart"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Distribution chart showing Slice 1 at 35%, Slice 2 at 25%, Slice 3 at 20%, Slice 4 at 15%, and Slice 5 at 5%');
  });

  test('should have accessible legend with sufficient contrast', () => {
    const { container } = render(
      <PieChart 
        data={mockData}
        legendTextColor="#000000"
      />
    );
    
    // Check that legend text has good contrast
    const legendTexts = container.querySelectorAll('text.legend-label');
    expect(legendTexts.length).toBe(mockData.length);
    
    // Legend text should have black color for contrast
    const blackText = Array.from(legendTexts).find(text => 
      text.getAttribute('fill') === '#000000'
    );
    
    expect(blackText).toBeInTheDocument();
  });
});