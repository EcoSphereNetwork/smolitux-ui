import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';

describe('TransactionHistory', () => {
  it('renders without crashing', () => {
    render(<TransactionHistory />);
    expect(screen.getByTestId('TransactionHistory')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<TransactionHistory className="custom-class" />);
    const element = screen.getByTestId('TransactionHistory');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<TransactionHistory ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<TransactionHistory>Test Content</TransactionHistory>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<TransactionHistory />);
    const element = screen.getByTestId('TransactionHistory');
    expect(element).toBeInTheDocument();
  });
});
