import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid Snapshots', () => {
  it('renders container with two items', () => {
    const { asFragment } = render(
      <Grid container spacing={2}>
        <Grid item xs={6}>
          One
        </Grid>
        <Grid item xs={6}>
          Two
        </Grid>
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
