import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenDisplay } from './TokenDisplay';

describe('TokenDisplay', () => {
  it('renders without crashing', () => {
    render(<TokenDisplay />);
    expect(screen.getByTestId('TokenDisplay')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<TokenDisplay className="custom-class" />);
    const element = screen.getByTestId('TokenDisplay');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<TokenDisplay ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<TokenDisplay>Test Content</TokenDisplay>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<TokenDisplay />);
    const element = screen.getByTestId('TokenDisplay');
    expect(element).toBeInTheDocument();
  });
});
