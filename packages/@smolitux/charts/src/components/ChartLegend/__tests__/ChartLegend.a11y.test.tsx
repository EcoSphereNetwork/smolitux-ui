import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChartLegend } from '../ChartLegend';

expect.extend(toHaveNoViolations);

describe('ChartLegend Accessibility', () => {
  it('has no violations', async () => {
    const items = [{ label: 'A', color: '#ff0000' }];
    const { container } = render(
      <svg>
        <ChartLegend items={items} />
      </svg>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
