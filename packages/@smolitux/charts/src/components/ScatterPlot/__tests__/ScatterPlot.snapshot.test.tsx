import React from 'react';
import { render } from '@testing-library/react';
import { ScatterPlot } from '../ScatterPlot';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('ScatterPlot Snapshots', () => {
  const mockData = {
    id: 'dataset1',
    name: 'Dataset 1',
    data: [
      { x: 10, y: 20, size: 5 },
      { x: 15, y: 30, size: 8 },
      { x: 20, y: 15, size: 6 },
      { x: 25, y: 40, size: 10 },
      { x: 30, y: 25, size: 7 },
      { x: 35, y: 35, size: 9 },
    ],
  };

  it('renders default chart', () => {
    const { asFragment } = render(<ScatterPlot data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
