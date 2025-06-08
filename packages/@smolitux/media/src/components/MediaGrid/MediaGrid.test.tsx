import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaGrid } from './MediaGrid';

describe('MediaGrid', () => {
  it('renders without crashing', () => {
    render(<MediaGrid />);
    expect(screen.getByRole('button', { name: /MediaGrid/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MediaGrid className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MediaGrid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
