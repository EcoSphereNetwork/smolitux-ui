import React from 'react';
import { render } from '@testing-library/react';
import { DonutChart } from '../DonutChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('DonutChart Snapshots', () => {
  const mockData = [
    { label: 'A', value: 40 },
    { label: 'B', value: 60 },
  ];

  it('renders default chart', () => {
    const { asFragment } = render(<DonutChart data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
