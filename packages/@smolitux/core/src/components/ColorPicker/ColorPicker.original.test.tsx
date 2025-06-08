import React from 'react';
import { render, screen } from '@testing-library/react';
import { ColorPicker.original } from './ColorPicker.original';

describe('ColorPicker.original', () => {
  it('renders without crashing', () => {
    render(<ColorPicker.original />);
    expect(screen.getByRole('button', { name: /ColorPicker.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ColorPicker.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ColorPicker.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
