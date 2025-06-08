import React from 'react';
import { render, screen } from '@testing-library/react';
import { BreadcrumbItem } from './BreadcrumbItem';

describe('BreadcrumbItem', () => {
  it('renders without crashing', () => {
    render(<BreadcrumbItem />);
    expect(screen.getByRole('button', { name: /BreadcrumbItem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BreadcrumbItem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<BreadcrumbItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
