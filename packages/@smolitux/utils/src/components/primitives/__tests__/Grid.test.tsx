import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from '../Grid';

describe('Grid', () => {
  it('renders with grid styles', () => {
    const { container } = render(<Grid columns={2} gap={8} />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ display: 'grid' });
    expect(div.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  it('applies grid styles', () => {
    const { container } = render(<Grid columns={2} rows={2} gap={4} />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle('display: grid');
    expect(div).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
    expect(div).toHaveStyle('grid-template-rows: repeat(2, 1fr)');
    expect(div).toHaveStyle('gap: 4px');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
