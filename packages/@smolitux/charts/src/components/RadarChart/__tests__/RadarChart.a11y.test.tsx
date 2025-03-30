import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RadarChart } from '../RadarChart';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('RadarChart Accessibility', () => {
  const mockData = {
    id: 'skills',
    name: 'Skills Assessment',
    data: [
      { axis: 'JavaScript', value: 80 },
      { axis: 'React', value: 90 },
      { axis: 'CSS', value: 70 },
      { axis: 'HTML', value: 95 },
      { axis: 'Node.js', value: 75 },
      { axis: 'TypeScript', value: 85 }
    ]
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        title="Skills Radar Chart"
        aria-label="Radar chart showing skills assessment across 6 technologies"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        title="Skills Radar Chart"
        aria-label="Radar chart showing skills assessment across 6 technologies"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Radar chart showing skills assessment across 6 technologies');
  });

  test('should include descriptive title', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        title="Skills Radar Chart"
      />
    );
    
    const titleElement = container.querySelector('text.chart-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Skills Radar Chart');
  });

  test('should provide sufficient color contrast', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        colors={['#000080']} // Dark blue
        axisLabelColor="#000000" // Black text
      />
    );
    
    // Check that axis labels have good contrast
    const axisLabels = container.querySelectorAll('text.axis-label');
    expect(axisLabels.length).toBe(mockData.data.length);
    
    // Axis labels should have black color for contrast
    const blackLabel = Array.from(axisLabels).find(label => 
      label.getAttribute('fill') === '#000000'
    );
    
    expect(blackLabel).toBeInTheDocument();
  });

  test('should provide alternative text description for screen readers', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        aria-label="Radar chart showing JavaScript: 80%, React: 90%, CSS: 70%, HTML: 95%, Node.js: 75%, TypeScript: 85%"
        title="Skills Radar Chart"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Radar chart showing JavaScript: 80%, React: 90%, CSS: 70%, HTML: 95%, Node.js: 75%, TypeScript: 85%');
  });

  test('should have accessible legend with sufficient contrast', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'teamAverage',
        name: 'Team Average',
        data: [
          { axis: 'JavaScript', value: 75 },
          { axis: 'React', value: 80 },
          { axis: 'CSS', value: 65 },
          { axis: 'HTML', value: 90 },
          { axis: 'Node.js', value: 70 },
          { axis: 'TypeScript', value: 75 }
        ]
      }
    ];
    
    const { container } = render(
      <RadarChart 
        data={multiSeriesData}
        showLegend={true}
        legendTextColor="#000000"
      />
    );
    
    // Check that legend text has good contrast
    const legendTexts = container.querySelectorAll('text.legend-label');
    expect(legendTexts.length).toBe(multiSeriesData.length);
    
    // Legend text should have black color for contrast
    const blackText = Array.from(legendTexts).find(text => 
      text.getAttribute('fill') === '#000000'
    );
    
    expect(blackText).toBeInTheDocument();
  });

  test('should have accessible level indicators', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        levels={5}
        levelLabelColor="#000000"
      />
    );
    
    // Level circles should be rendered
    const levelCircles = container.querySelectorAll('circle.level-circle');
    expect(levelCircles.length).toBe(5);
    
    // Level labels should have good contrast
    const levelLabels = container.querySelectorAll('text.level-label');
    expect(levelLabels.length).toBeGreaterThan(0);
    
    // Level labels should have black color for contrast
    const blackLabel = Array.from(levelLabels).find(label => 
      label.getAttribute('fill') === '#000000'
    );
    
    expect(blackLabel).toBeInTheDocument();
  });

  test('should have accessible value labels when shown', () => {
    const { container } = render(
      <RadarChart 
        data={mockData}
        showValues={true}
        valueTextColor="#000000"
      />
    );
    
    // Value labels should be rendered
    const valueLabels = container.querySelectorAll('text.value-label');
    expect(valueLabels.length).toBe(mockData.data.length);
    
    // Value labels should have black color for contrast
    const blackLabel = Array.from(valueLabels).find(label => 
      label.getAttribute('fill') === '#000000'
    );
    
    expect(blackLabel).toBeInTheDocument();
  });
});