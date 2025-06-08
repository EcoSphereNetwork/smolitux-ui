import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar items={[]} data-testid="sidebar" />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Sidebar items={[]} data-testid="sidebar" className="custom-class" />);
    expect(screen.getByTestId('sidebar')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Sidebar items={[]} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
