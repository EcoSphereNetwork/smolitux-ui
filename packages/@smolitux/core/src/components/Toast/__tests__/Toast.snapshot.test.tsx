import React from 'react';
import renderer from 'react-test-renderer';
import { Toast } from '../Toast';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Toast Snapshots', () => {
  it('renders success toast', () => {
    const tree = renderer
      .create(<Toast type="success" title="Yay" message="Done" isOpen />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
