import React from 'react';
import { render, screen } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    render(<ColorPicker />);
    expect(screen.getByRole('button', { name: /ColorPicker/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ColorPicker className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ColorPicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
