import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AreaChart } from '../AreaChart';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

// Mock für useTheme hook
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
        title="Monatliche Besucher"
        aria-label="Diagramm: Monatliche Besucher"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <AreaChart 
        data={mockData}
        title="Monatliche Besucher"
        aria-label="Diagramm: Monatliche Besucher"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Diagramm: Monatliche Besucher');
  });

  test('should be keyboard navigable when interactive elements are present', () => {
    const { container } = render(
      <AreaChart 
        data={mockData}
        showPoints={true}
        showTooltips={true}
        aria-label="Interaktives Diagramm: Monatliche Besucher"
      />
    );
    
    // Prüfen, ob das SVG-Element fokussierbar ist, wenn es interaktive Elemente enthält
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('tabIndex', '0');
  });
});