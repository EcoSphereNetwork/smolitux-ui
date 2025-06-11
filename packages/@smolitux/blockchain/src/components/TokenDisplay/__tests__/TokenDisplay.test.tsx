import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenDisplay } from '../TokenDisplay';
import { TokenInfo } from '../../../types';

jest.mock('@smolitux/core', () => ({
  Card: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
}));

const token: TokenInfo = {
  symbol: 'ETH',
  name: 'Ethereum',
  balance: '1',
  valueUSD: 1000,
  address: '0x12345678901234567890',
};

describe('TokenDisplay', () => {
  it('renders token information', () => {
    render(<TokenDisplay token={token} />);
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleClick = jest.fn();
    render(<TokenDisplay token={token} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('token-display'));
    expect(handleClick).toHaveBeenCalledWith(token);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TokenDisplay ref={ref} token={token} />);
    expect(ref.current).toHaveAttribute('data-testid', 'token-display');
  });
});
