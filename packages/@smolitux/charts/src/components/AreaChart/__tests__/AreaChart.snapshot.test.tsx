import React from 'react';
import { render } from '@testing-library/react';
import { AreaChart } from '../AreaChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('AreaChart Snapshots', () => {
  const mockData = {
    id: 'testSeries',
    name: 'Test Data',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'May', y: 180 },
    ],
  };

  it('renders default chart', () => {
    const { asFragment } = render(<AreaChart data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
