import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(<Breadcrumb />);
    expect(screen.getByRole('button', { name: /Breadcrumb/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Breadcrumb className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Breadcrumb ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
