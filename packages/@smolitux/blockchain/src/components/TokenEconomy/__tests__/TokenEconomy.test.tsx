import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenEconomy } from '../TokenEconomy';

describe('TokenEconomy', () => {
  const tokenInfo = {
    name: 'Eco',
    symbol: 'ECO',
    price: 1,
    currency: 'USD',
    totalSupply: 100,
    circulatingSupply: 90,
    marketCap: 90,
  };

  test('renders token name', () => {
    render(
      <TokenEconomy tokenInfo={tokenInfo} historicalData={[]} distribution={[]} />
    );
    expect(screen.getByText(/Eco/)).toBeInTheDocument();
  });
});
