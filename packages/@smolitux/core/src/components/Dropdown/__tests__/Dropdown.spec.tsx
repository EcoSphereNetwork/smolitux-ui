import React from 'react';
import renderer from 'react-test-renderer';
import { Dropdown } from '../Dropdown';
import { DropdownToggle } from '../DropdownToggle';
import { DropdownMenu } from '../DropdownMenu';
import { DropdownItem } from '../DropdownItem';

describe('Dropdown Snapshots', () => {
  test('renders closed dropdown', () => {
    const tree = renderer
      .create(
        <Dropdown id="dropdown-test">
          <DropdownToggle>Menu</DropdownToggle>
          <DropdownMenu>
            <DropdownItem value="profile">Profile</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders open dropdown', () => {
    const tree = renderer
      .create(
        <Dropdown id="dropdown-test" isOpen>
          <DropdownToggle>Menu</DropdownToggle>
          <DropdownMenu>
            <DropdownItem value="profile">Profile</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
