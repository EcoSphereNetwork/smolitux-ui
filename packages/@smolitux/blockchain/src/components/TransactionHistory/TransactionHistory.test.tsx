import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';

describe('TransactionHistory', () => {
  it('renders without crashing', () => {
    render(<TransactionHistory />);
    expect(screen.getByRole('button', { name: /TransactionHistory/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TransactionHistory className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TransactionHistory ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
