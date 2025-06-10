import React from 'react';
import { render } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders without crashing', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
