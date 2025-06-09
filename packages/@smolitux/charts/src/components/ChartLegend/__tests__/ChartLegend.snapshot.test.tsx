import React from 'react';
import { render } from '@testing-library/react';
import { ChartLegend } from '../ChartLegend';

describe('ChartLegend Snapshot', () => {
  it('matches snapshot', () => {
    const items = [{ label: 'A', color: '#ff0000' }];
    const { asFragment } = render(
      <svg>
        <ChartLegend items={items} />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
