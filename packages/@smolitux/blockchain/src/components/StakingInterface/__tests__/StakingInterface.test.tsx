import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StakingInterface } from '../StakingInterface';

describe('StakingInterface', () => {
  const mockStakingData = {
    token: {
      symbol: 'ECO',
      name: 'EcoSphere Token',
      balance: '1500.75',
      imageUrl: 'https://example.com/eco-token.png',
    },
    staking: {
      stakedAmount: '500.5',
      availableRewards: '25.75',
      apr: 12.5, // Annual Percentage Rate
      lockPeriod: 30, // days
      totalStaked: '1000000', // Total staked by all users
      minimumStake: '10',
      unstakingFee: 2.5, // Percentage
      nextRewardDate: '2023-07-01T00:00:00Z',
    },
    userStats: {
      totalEarned: '150.25',
      stakingSince: '2023-01-15T00:00:00Z',
      stakingPeriods: [
        {
          startDate: '2023-01-15T00:00:00Z',
          endDate: '2023-04-15T00:00:00Z',
          amount: '300',
          rewards: '75.5',
        },
        { startDate: '2023-04-16T00:00:00Z', endDate: null, amount: '500.5', rewards: '74.75' },
      ],
    },
  };

  const mockOnStake = jest.fn();
  const mockOnUnstake = jest.fn();
  const mockOnClaimRewards = jest.fn();
  const mockOnCompound = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with staking data', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    expect(screen.getByText('Staking')).toBeInTheDocument();
    expect(screen.getByText('ECO')).toBeInTheDocument();
    expect(screen.getByText('EcoSphere Token')).toBeInTheDocument();
    expect(screen.getByText('500.5 ECO')).toBeInTheDocument(); // Staked amount
    expect(screen.getByText('25.75 ECO')).toBeInTheDocument(); // Available rewards
    expect(screen.getByText('12.5%')).toBeInTheDocument(); // APR
  });

  it('displays token image when provided', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    const tokenImage = screen.getByAltText('ECO');
    expect(tokenImage).toBeInTheDocument();
    expect(tokenImage).toHaveAttribute('src', 'https://example.com/eco-token.png');
  });

  it('displays staking information', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    expect(screen.getByText(/staked amount/i)).toBeInTheDocument();
    expect(screen.getByText('500.5 ECO')).toBeInTheDocument();
    expect(screen.getByText(/available rewards/i)).toBeInTheDocument();
    expect(screen.getByText('25.75 ECO')).toBeInTheDocument();
    expect(screen.getByText(/annual percentage rate/i)).toBeInTheDocument();
    expect(screen.getByText('12.5%')).toBeInTheDocument();
    expect(screen.getByText(/lock period/i)).toBeInTheDocument();
    expect(screen.getByText('30 days')).toBeInTheDocument();
  });

  it('displays user staking statistics', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    expect(screen.getByText(/total earned/i)).toBeInTheDocument();
    expect(screen.getByText('150.25 ECO')).toBeInTheDocument();
    expect(screen.getByText(/staking since/i)).toBeInTheDocument();
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/january 15, 2023/i)).toBeInTheDocument();
  });

  it('allows staking tokens', async () => {
    render(<StakingInterface stakingData={mockStakingData} onStake={mockOnStake} />);

    const stakeTab = screen.getByRole('tab', { name: /stake/i });
    fireEvent.click(stakeTab);

    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const stakeButton = screen.getByRole('button', { name: /stake tokens/i });
    fireEvent.click(stakeButton);

    await waitFor(() => {
      expect(mockOnStake).toHaveBeenCalledWith('100', expect.any(Object));
    });
  });

  it('allows unstaking tokens', async () => {
    render(<StakingInterface stakingData={mockStakingData} onUnstake={mockOnUnstake} />);

    const unstakeTab = screen.getByRole('tab', { name: /unstake/i });
    fireEvent.click(unstakeTab);

    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '50' } });

    const unstakeButton = screen.getByRole('button', { name: /unstake tokens/i });
    fireEvent.click(unstakeButton);

    await waitFor(() => {
      expect(mockOnUnstake).toHaveBeenCalledWith('50', expect.any(Object));
    });
  });

  it('allows claiming rewards', async () => {
    render(<StakingInterface stakingData={mockStakingData} onClaimRewards={mockOnClaimRewards} />);

    const claimButton = screen.getByRole('button', { name: /claim rewards/i });
    fireEvent.click(claimButton);

    await waitFor(() => {
      expect(mockOnClaimRewards).toHaveBeenCalled();
    });
  });

  it('allows compounding rewards', async () => {
    render(<StakingInterface stakingData={mockStakingData} onCompound={mockOnCompound} />);

    const compoundButton = screen.getByRole('button', { name: /compound/i });
    fireEvent.click(compoundButton);

    await waitFor(() => {
      expect(mockOnCompound).toHaveBeenCalled();
    });
  });

  it('displays staking history', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    const historyTab = screen.getByRole('tab', { name: /history/i });
    fireEvent.click(historyTab);

    expect(screen.getByText(/staking history/i)).toBeInTheDocument();
    expect(screen.getByText(/january 15, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/april 16, 2023/i)).toBeInTheDocument();
    expect(screen.getByText('300 ECO')).toBeInTheDocument();
    expect(screen.getByText('75.5 ECO')).toBeInTheDocument(); // Rewards
  });

  it('displays staking calculator', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    const calculatorTab = screen.getByRole('tab', { name: /calculator/i });
    fireEvent.click(calculatorTab);

    expect(screen.getByText(/staking calculator/i)).toBeInTheDocument();

    const amountInput = screen.getByLabelText(/amount to stake/i);
    const periodInput = screen.getByLabelText(/staking period/i);

    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(periodInput, { target: { value: '365' } });

    // Expected reward calculation: 1000 * 0.125 = 125 ECO for 1 year
    expect(screen.getByText('125 ECO')).toBeInTheDocument();
  });

  it('displays validation errors for invalid stake amounts', async () => {
    render(<StakingInterface stakingData={mockStakingData} onStake={mockOnStake} />);

    const stakeTab = screen.getByRole('tab', { name: /stake/i });
    fireEvent.click(stakeTab);

    // Try to stake less than minimum
    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '5' } });

    const stakeButton = screen.getByRole('button', { name: /stake tokens/i });
    fireEvent.click(stakeButton);

    await waitFor(() => {
      expect(screen.getByText(/minimum stake amount is 10 ECO/i)).toBeInTheDocument();
    });

    // Try to stake more than balance
    fireEvent.change(amountInput, { target: { value: '2000' } });
    fireEvent.click(stakeButton);

    await waitFor(() => {
      expect(screen.getByText(/insufficient balance/i)).toBeInTheDocument();
    });
  });

  it('displays unstaking fee information', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    const unstakeTab = screen.getByRole('tab', { name: /unstake/i });
    fireEvent.click(unstakeTab);

    expect(screen.getByText(/unstaking fee/i)).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
  });

  it('displays next reward date information', () => {
    render(<StakingInterface stakingData={mockStakingData} />);

    expect(screen.getByText(/next reward/i)).toBeInTheDocument();
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/july 1, 2023/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<StakingInterface isLoading={true} />);

    expect(screen.getByText(/loading staking data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load staking data';
    render(<StakingInterface error={errorMessage} />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays confirmation dialog when unstaking', async () => {
    render(<StakingInterface stakingData={mockStakingData} onUnstake={mockOnUnstake} />);

    const unstakeTab = screen.getByRole('tab', { name: /unstake/i });
    fireEvent.click(unstakeTab);

    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '50' } });

    const unstakeButton = screen.getByRole('button', { name: /unstake tokens/i });
    fireEvent.click(unstakeButton);

    // Confirmation dialog should appear
    expect(screen.getByText(/confirm unstaking/i)).toBeInTheDocument();
    expect(screen.getByText(/unstaking fee: 1.25 ECO/i)).toBeInTheDocument(); // 2.5% of 50

    // Confirm unstaking
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnUnstake).toHaveBeenCalledWith('50', expect.any(Object));
    });
  });
});
