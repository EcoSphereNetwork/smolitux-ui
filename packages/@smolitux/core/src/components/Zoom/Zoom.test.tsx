import React from 'react';
import { render, screen } from '@testing-library/react';
import { Zoom } from './Zoom';

describe('Zoom', () => {
  it('renders without crashing', () => {
    render(<Zoom />);
    expect(screen.getByRole('button', { name: /Zoom/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Zoom className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Zoom ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
