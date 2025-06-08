import React from 'react';
import renderer from 'react-test-renderer';
import { Textarea } from '../Textarea';

describe('Textarea Snapshots', () => {
  test('renders default textarea', () => {
    const tree = renderer.create(<Textarea />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with placeholder', () => {
    const tree = renderer.create(<Textarea placeholder="Type here" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
