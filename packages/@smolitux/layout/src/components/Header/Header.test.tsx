import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header data-testid="header" />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Header data-testid="header" className="custom-class" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Header ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
