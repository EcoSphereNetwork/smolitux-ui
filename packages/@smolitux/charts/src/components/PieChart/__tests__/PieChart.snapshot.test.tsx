import React from 'react';
import { render } from '@testing-library/react';
import { PieChart } from '../PieChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('PieChart Snapshots', () => {
  const mockData = [
    { id: 'slice1', label: 'Slice 1', value: 35 },
    { id: 'slice2', label: 'Slice 2', value: 25 },
    { id: 'slice3', label: 'Slice 3', value: 20 },
    { id: 'slice4', label: 'Slice 4', value: 15 },
    { id: 'slice5', label: 'Slice 5', value: 5 },
  ];

  it('renders default chart', () => {
    const { asFragment } = render(<PieChart data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
