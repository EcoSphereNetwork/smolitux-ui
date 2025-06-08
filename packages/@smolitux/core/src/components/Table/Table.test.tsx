import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('renders without crashing', () => {
    render(<Table />);
    expect(screen.getByRole('button', { name: /Table/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Table className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Table ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
