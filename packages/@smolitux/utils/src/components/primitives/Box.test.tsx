import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders without crashing', () => {
    render(<Box />);
    expect(screen.getByRole('button', { name: /Box/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Box className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Box ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
