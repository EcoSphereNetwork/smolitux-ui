import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from '../Checkbox';

describe('Checkbox Snapshots', () => {
  test('renders default checkbox', () => {
    const tree = renderer.create(<Checkbox label="Check me" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders checked checkbox', () => {
    const tree = renderer.create(<Checkbox label="Check me" checked />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
