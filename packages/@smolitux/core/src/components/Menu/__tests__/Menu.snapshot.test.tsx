import React from 'react';
import renderer from 'react-test-renderer';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Menu Snapshots', () => {
  it('renders default vertical menu', () => {
    const tree = renderer
      .create(
        <Menu>
          <MenuItem id="home">Home</MenuItem>
          <MenuItem id="about">About</MenuItem>
        </Menu>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal primary menu', () => {
    const tree = renderer
      .create(
        <Menu variant="primary" direction="horizontal">
          <MenuItem id="dashboard">Dashboard</MenuItem>
          <MenuItem id="settings">Settings</MenuItem>
        </Menu>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
