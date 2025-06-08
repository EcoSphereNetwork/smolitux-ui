import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button.fixed } from './Button.fixed';

describe('Button.fixed', () => {
  it('renders without crashing', () => {
    render(<Button.fixed />);
    expect(screen.getByRole('button', { name: /Button.fixed/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button.fixed className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button.fixed ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
