import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from '../Checkbox';

describe('Checkbox Snapshots', () => {
  test('renders default checkbox', () => {
    const tree = renderer
      .create(<Checkbox id="checkbox-default" label="Check me" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders checked checkbox', () => {
    const tree = renderer
      .create(<Checkbox id="checkbox-checked" label="Check me" checked />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
