import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeFiDashboard, DeFiProtocol } from '../DeFiDashboard';

describe('DeFiDashboard', () => {
  const protocols: DeFiProtocol[] = [
    {
      name: 'StakeHub',
      chainId: 1,
      tvl: '1M',
      apy: 12.5,
      actions: [
        { type: 'stake', label: 'Stake', enabled: true },
        { type: 'claim', label: 'Claim', enabled: false },
      ],
    },
  ];

  it('renders protocol information', () => {
    render(<DeFiDashboard protocols={protocols} />);
    expect(screen.getByText('StakeHub')).toBeInTheDocument();
    expect(screen.getByText(/TVL:/)).toBeInTheDocument();
    expect(screen.getByText(/APY:/)).toBeInTheDocument();
  });

  it('filters by chain', () => {
    render(<DeFiDashboard protocols={protocols} filterChain={[137]} />);
    expect(screen.queryByText('StakeHub')).not.toBeInTheDocument();
  });

  it('handles actions', () => {
    const onAction = jest.fn();
    render(<DeFiDashboard protocols={protocols} onAction={onAction} />);
    const stakeButton = screen.getByRole('button', { name: 'Stake' });
    fireEvent.click(stakeButton);
    expect(onAction).toHaveBeenCalledWith(protocols[0], protocols[0].actions[0]);
  });
});
