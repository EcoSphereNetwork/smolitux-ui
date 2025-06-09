import React from 'react';
import { render } from '@testing-library/react';
import { Histogram } from '../Histogram';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Histogram', () => {
  const values = [1, 2, 2, 3, 4, 5, 5];

  test('renders histogram', () => {
    const { container } = render(<Histogram data={values} bins={4} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
