import React from 'react';
import { render } from '@testing-library/react';
import { Grid } from '../Grid';

describe('Grid', () => {
  it('renders with grid styles', () => {
    const { container } = render(<Grid columns={2} rows={2} gap={4} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle('display: grid');
    expect(el).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
    expect(el).toHaveStyle('grid-template-rows: repeat(2, 1fr)');
  });
});
