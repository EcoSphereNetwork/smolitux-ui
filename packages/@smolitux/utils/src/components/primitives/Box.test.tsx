import React from 'react';
import { render } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders without crashing', () => {
    const { container } = render(<Box />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Box className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
