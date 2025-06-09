import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChartAxis } from '../ChartAxis';

expect.extend(toHaveNoViolations);

describe('ChartAxis Accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(
      <svg>
        <ChartAxis length={100} ticks={[{ value: 0, position: 0 }]} />
      </svg>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
