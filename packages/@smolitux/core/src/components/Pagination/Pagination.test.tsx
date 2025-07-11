import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination />);
    expect(screen.getByRole('button', { name: /Pagination/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Pagination className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Pagination ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
