import React from 'react';
import { render, screen } from '@testing-library/react';
import { StakingInterface, StakingPool } from '../StakingInterface';

describe('StakingInterface', () => {
  const pools: StakingPool[] = [
    { id: '1', name: 'Pool 1', tokenSymbol: 'ECO', apy: 10, totalStaked: '0', isActive: true },
  ];

  test('renders pool name', () => {
    render(<StakingInterface pools={pools} tokenSymbol="ECO" />);
    expect(screen.getByText('Pool 1')).toBeInTheDocument();
  });
});
