import React from 'react';
import { render, screen } from '@testing-library/react';
import { List } from './List';

describe('List', () => {
  it('renders without crashing', () => {
    render(<List />);
    expect(screen.getByRole('button', { name: /List/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<List className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<List ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
