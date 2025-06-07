import React from 'react';
import { render } from '@testing-library/react';
import { RadarChart } from '../RadarChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('RadarChart Snapshots', () => {
  const mockData = {
    id: 'skills',
    name: 'Skills Assessment',
    data: [
      { axis: 'JavaScript', value: 80 },
      { axis: 'React', value: 90 },
      { axis: 'CSS', value: 70 },
      { axis: 'HTML', value: 95 },
      { axis: 'Node.js', value: 75 },
      { axis: 'TypeScript', value: 85 },
    ],
  };

  it('renders default chart', () => {
    const { asFragment } = render(<RadarChart data={[mockData]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
