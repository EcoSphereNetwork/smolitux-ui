import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RewardSystem } from './RewardSystem';

describe('RewardSystem', () => {
  const mockRewards = [
    { id: '1', name: 'Bronze Badge', points: 100, icon: '🥉', claimed: false },
    { id: '2', name: 'Silver Badge', points: 500, icon: '🥈', claimed: false },
    { id: '3', name: 'Gold Badge', points: 1000, icon: '🥇', claimed: true },
  ];

  const mockUser = {
    id: 'user123',
    name: 'Test User',
    points: 750,
    level: 3,
  };

  it('renders correctly with default props', () => {
    render(<RewardSystem rewards={mockRewards} user={mockUser} />);

    expect(screen.getByText('Bronze Badge')).toBeInTheDocument();
    expect(screen.getByText('Silver Badge')).toBeInTheDocument();
    expect(screen.getByText('Gold Badge')).toBeInTheDocument();
    expect(screen.getByText('🥉')).toBeInTheDocument();
    expect(screen.getByText('🥈')).toBeInTheDocument();
    expect(screen.getByText('🥇')).toBeInTheDocument();
  });

  it('displays user points correctly', () => {
    render(<RewardSystem rewards={mockRewards} user={mockUser} />);

    expect(screen.getByText('750 points')).toBeInTheDocument();
    expect(screen.getByText('Level 3')).toBeInTheDocument();
  });

  it('shows which rewards are claimable', () => {
    render(<RewardSystem rewards={mockRewards} user={mockUser} />);

    // Bronze Badge should be claimable (user has enough points and it's not claimed)
    const bronzeBadge = screen.getByText('Bronze Badge').closest('[data-testid="reward-item"]');
    expect(bronzeBadge).toHaveClass('claimable');

    // Silver Badge should be claimable (user has enough points and it's not claimed)
    const silverBadge = screen.getByText('Silver Badge').closest('[data-testid="reward-item"]');
    expect(silverBadge).toHaveClass('claimable');

    // Gold Badge should not be claimable (already claimed)
    const goldBadge = screen.getByText('Gold Badge').closest('[data-testid="reward-item"]');
    expect(goldBadge).toHaveClass('claimed');
    expect(goldBadge).not.toHaveClass('claimable');
  });

  it('calls onClaimReward when a claimable reward is clicked', () => {
    const handleClaimReward = jest.fn();
    render(
      <RewardSystem rewards={mockRewards} user={mockUser} onClaimReward={handleClaimReward} />
    );

    const bronzeBadge = screen.getByText('Bronze Badge').closest('[data-testid="reward-item"]');
    fireEvent.click(bronzeBadge);

    expect(handleClaimReward).toHaveBeenCalledWith('1');
  });

  it('does not call onClaimReward when a non-claimable reward is clicked', () => {
    const handleClaimReward = jest.fn();
    render(
      <RewardSystem rewards={mockRewards} user={mockUser} onClaimReward={handleClaimReward} />
    );

    const goldBadge = screen.getByText('Gold Badge').closest('[data-testid="reward-item"]');
    fireEvent.click(goldBadge);

    expect(handleClaimReward).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(
      <RewardSystem
        rewards={mockRewards}
        user={mockUser}
        className="custom-rewards"
        data-testid="reward-system"
      />
    );

    const rewardSystem = screen.getByTestId('reward-system');
    expect(rewardSystem).toHaveClass('custom-rewards');
  });

  it('renders with custom style', () => {
    render(
      <RewardSystem
        rewards={mockRewards}
        user={mockUser}
        style={{ backgroundColor: 'lightblue' }}
        data-testid="reward-system"
      />
    );

    const rewardSystem = screen.getByTestId('reward-system');
    expect(rewardSystem).toHaveStyle('background-color: lightblue');
  });

  it('renders with different layout styles', () => {
    const { rerender } = render(
      <RewardSystem
        rewards={mockRewards}
        user={mockUser}
        layout="grid"
        data-testid="reward-system"
      />
    );

    let rewardSystem = screen.getByTestId('reward-system');
    expect(rewardSystem).toHaveClass('layout-grid');

    rerender(
      <RewardSystem
        rewards={mockRewards}
        user={mockUser}
        layout="list"
        data-testid="reward-system"
      />
    );

    rewardSystem = screen.getByTestId('reward-system');
    expect(rewardSystem).toHaveClass('layout-list');
  });

  it('renders with progress indicators', () => {
    render(
      <RewardSystem
        rewards={mockRewards}
        user={mockUser}
        showProgress
        data-testid="reward-system"
      />
    );

    expect(screen.getByText('750/1000')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with reward details when expanded', () => {
    render(<RewardSystem rewards={mockRewards} user={mockUser} expandable />);

    const bronzeBadge = screen.getByText('Bronze Badge');
    fireEvent.click(bronzeBadge);

    expect(screen.getByText('Reward Details')).toBeInTheDocument();
    expect(screen.getByText('Points Required: 100')).toBeInTheDocument();
  });
});
