import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AreaChart } from '../AreaChart';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('AreaChart Accessibility', () => {
  const mockData = {
    id: 'testSeries',
    name: 'Test Data',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'May', y: 180 }
    ]
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <AreaChart 
        data={mockData}
        title="Monthly Visitors"
        aria-label="Chart: Monthly Visitors"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <AreaChart 
        data={mockData}
        title="Monthly Visitors"
        aria-label="Chart: Monthly Visitors"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Chart: Monthly Visitors');
  });

  test('should be keyboard navigable when interactive elements are present', () => {
    const { container } = render(
      <AreaChart 
        data={mockData}
        showPoints={true}
        showTooltips={true}
        aria-label="Interactive Chart: Monthly Visitors"
      />
    );
    
    // Check if the SVG element is focusable when it contains interactive elements
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('tabIndex', '0');
  });
});