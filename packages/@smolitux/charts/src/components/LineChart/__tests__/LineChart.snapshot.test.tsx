import React from 'react';
import { render } from '@testing-library/react';
import { LineChart } from '../LineChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('LineChart Snapshots', () => {
  const mockData = {
    id: 'temperature',
    name: 'Temperature',
    data: [
      { x: 'Jan', y: 5 },
      { x: 'Feb', y: 7 },
      { x: 'Mar', y: 12 },
      { x: 'Apr', y: 15 },
      { x: 'May', y: 20 },
      { x: 'Jun', y: 25 },
    ],
  };

  it('renders default chart', () => {
    const { asFragment } = render(<LineChart data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
