import React from 'react';
import renderer from 'react-test-renderer';
import { Skeleton } from '../Skeleton';

describe('Skeleton Snapshots', () => {
  it('renders default text skeleton', () => {
    const tree = renderer.create(<Skeleton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders circular wave skeleton', () => {
    const tree = renderer.create(<Skeleton variant="circular" animation="wave" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
