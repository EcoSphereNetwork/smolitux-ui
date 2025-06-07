import React from 'react';
import { render } from '@testing-library/react';
import Flex from '../Flex';

describe('Flex Snapshots', () => {
  it('renders row with two items', () => {
    const { asFragment } = render(
      <Flex gap={2} justifyContent="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
