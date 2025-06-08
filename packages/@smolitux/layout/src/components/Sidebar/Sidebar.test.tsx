import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar />);
    expect(screen.getByRole('button', { name: /Sidebar/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Sidebar className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Sidebar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
