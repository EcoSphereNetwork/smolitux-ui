import React from 'react';
import { render } from '@testing-library/react';
import { Heatmap } from '../Heatmap';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Heatmap Snapshots', () => {
  const mockData = [
    { x: 'A', y: '1', value: 10 },
    { x: 'A', y: '2', value: 20 },
    { x: 'A', y: '3', value: 30 },
    { x: 'B', y: '1', value: 40 },
    { x: 'B', y: '2', value: 50 },
    { x: 'B', y: '3', value: 60 },
    { x: 'C', y: '1', value: 70 },
    { x: 'C', y: '2', value: 80 },
    { x: 'C', y: '3', value: 90 },
  ];

  it('renders default chart', () => {
    const { asFragment } = render(<Heatmap data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
