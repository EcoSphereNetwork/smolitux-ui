import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid Snapshots', () => {
  it('renders container with two items', () => {
    const { asFragment } = render(
      <Grid gap="md">
        <Grid.Item xs={6}>One</Grid.Item>
        <Grid.Item xs={6}>Two</Grid.Item>
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
