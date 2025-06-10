import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';
import { Transaction } from '../../../types';

describe('TransactionHistory', () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      hash: '0xabc',
      type: 'send',
      amount: '1',
      tokenSymbol: 'ETH',
      from: '0x111',
      to: '0x222',
      timestamp: new Date('2023-01-01'),
      status: 'confirmed',
      network: 'eth',
    },
  ];

  it('renders transaction entries', () => {
    render(<TransactionHistory transactions={transactions} />);
    expect(screen.getByText('Gesendet')).toBeInTheDocument();
  });

  it('handles transaction click', () => {
    const handleClick = jest.fn();
    render(
      <TransactionHistory
        transactions={transactions}
        onTransactionClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Gesendet'));
    expect(handleClick).toHaveBeenCalledWith(transactions[0]);
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TransactionHistory ref={ref} transactions={transactions} />);
    expect(ref.current).toHaveAttribute('data-testid', 'transaction-history');
  });
});
