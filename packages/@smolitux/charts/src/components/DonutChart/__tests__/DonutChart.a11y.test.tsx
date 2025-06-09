import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DonutChart } from '../DonutChart';

expect.extend(toHaveNoViolations);

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('DonutChart Accessibility', () => {
  const mockData = [
    { label: 'A', value: 40 },
    { label: 'B', value: 60 },
  ];

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <DonutChart data={mockData} title="Distribution" aria-label="Donut chart" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
