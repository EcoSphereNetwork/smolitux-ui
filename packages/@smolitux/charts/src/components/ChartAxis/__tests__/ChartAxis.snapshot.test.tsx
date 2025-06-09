import React from 'react';
import { render } from '@testing-library/react';
import { ChartAxis } from '../ChartAxis';

describe('ChartAxis Snapshot', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <svg>
        <ChartAxis length={100} ticks={[{ value: 0, position: 0 }]} />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
