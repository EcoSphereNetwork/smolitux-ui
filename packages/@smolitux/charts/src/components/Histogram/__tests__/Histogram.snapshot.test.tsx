import React from 'react';
import { render } from '@testing-library/react';
import { Histogram } from '../Histogram';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Histogram Snapshots', () => {
  const values = [1, 2, 2, 3, 4, 5, 5];

  it('renders default chart', () => {
    const { asFragment } = render(<Histogram data={values} bins={4} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
