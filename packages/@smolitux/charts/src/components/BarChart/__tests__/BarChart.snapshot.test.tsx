import React from 'react';
import { render } from '@testing-library/react';
import { BarChart } from '../BarChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('BarChart Snapshots', () => {
  const mockData = {
    id: 'sales',
    name: 'Sales 2025',
    data: [
      { label: 'Q1', value: 150 },
      { label: 'Q2', value: 230 },
      { label: 'Q3', value: 180 },
      { label: 'Q4', value: 275 },
    ],
  };

  it('renders default chart', () => {
    const { asFragment } = render(<BarChart data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
