import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenEconomy } from './TokenEconomy';

describe('TokenEconomy', () => {
  it('renders without crashing', () => {
    render(<TokenEconomy />);
    expect(screen.getByTestId('TokenEconomy')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<TokenEconomy className="custom-class" />);
    const element = screen.getByTestId('TokenEconomy');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<TokenEconomy ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<TokenEconomy>Test Content</TokenEconomy>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<TokenEconomy />);
    const element = screen.getByTestId('TokenEconomy');
    expect(element).toBeInTheDocument();
  });
});
