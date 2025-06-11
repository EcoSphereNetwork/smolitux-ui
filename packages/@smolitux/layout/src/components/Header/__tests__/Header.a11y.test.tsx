import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Header } from '../Header';

expect.extend(toHaveNoViolations);

describe('Header Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Header title="Test" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
