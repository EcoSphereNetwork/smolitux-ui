import React from 'react';
import renderer from 'react-test-renderer';
import { Pagination } from '../Pagination';

describe('Pagination Snapshots', () => {
  it('renders default pagination', () => {
    const tree = renderer.create(<Pagination totalPages={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with current page and size', () => {
    const tree = renderer.create(<Pagination totalPages={10} currentPage={2} size="sm" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
