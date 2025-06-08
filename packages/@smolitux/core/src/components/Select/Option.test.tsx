import React from 'react';
import { render, screen } from '@testing-library/react';
import { Option } from './Option';

describe('Option', () => {
  it('renders without crashing', () => {
    render(<Option />);
    expect(screen.getByRole('button', { name: /Option/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Option className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Option ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
