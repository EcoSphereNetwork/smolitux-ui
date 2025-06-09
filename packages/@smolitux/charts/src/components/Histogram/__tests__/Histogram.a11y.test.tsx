import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Histogram } from '../Histogram';

expect.extend(toHaveNoViolations);

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Histogram Accessibility', () => {
  const values = [1, 2, 2, 3, 4, 5, 5];

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Histogram data={values} bins={4} aria-label="Histogram" title="Values" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
