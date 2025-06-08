import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders without crashing', () => {
    render(<TimePicker />);
    expect(screen.getByRole('button', { name: /TimePicker/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TimePicker className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TimePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
