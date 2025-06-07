import React from 'react';
import renderer from 'react-test-renderer';
import { TimePicker } from '../TimePicker';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('TimePicker Snapshots', () => {
  it('renders default time picker', () => {
    const tree = renderer.create(<TimePicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with initial value', () => {
    const tree = renderer.create(<TimePicker value="12:30" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
