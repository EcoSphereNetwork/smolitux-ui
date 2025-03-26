import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GovernanceDashboard } from './GovernanceDashboard';

describe('GovernanceDashboard', () => {
  const mockProposals = [
    {
      id: 'prop1',
      title: 'Implement Token Burning Mechanism',
      description: 'Proposal to implement a token burning mechanism to reduce supply and increase value.',
      status: 'active',
      createdAt: '2023-06-10T14:30:00Z',
      endDate: '2023-06-25T14:30:00Z',
      creator: {
        id: 'user123',
        username: 'johndoe',
        displayName: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg'
      },
      votesFor: 1250000,
      votesAgainst: 450000,
      votesAbstain: 75000,
      quorum: 1500000,
      threshold: 0.66,
      category: 'tokenomics'
    },
    {
      id: 'prop2',
      title: 'Add New Community Moderators',
      description: 'Proposal to add 5 new community moderators to help manage the growing community.',
      status: 'pending',
      createdAt: '2023-06-15T10:15:00Z',
      endDate: '2023-06-30T10:15:00Z',
      creator: {
        id: 'user456',
        username: 'janedoe',
        displayName: 'Jane Doe',
        avatarUrl: 'https://example.com/jane-avatar.jpg'
      },
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      quorum: 1500000,
      threshold: 0.5,
      category: 'governance'
    }
  ];

  const mockStats = {
    totalProposals: 15,
    activeProposals: 3,
    pendingProposals: 2,
    completedProposals: 10,
    participationRate: 0.42,
    averageVotingPower: 25000,
    topVoters: [
      { id: 'user123', username: 'johndoe', votingPower: 150000 },
      { id: 'user456', username: 'janedoe', votingPower: 120000 },
      { id: 'user789', username: 'bobsmith', votingPower: 100000 }
    ]
  };

  const mockOnCreateProposal = jest.fn();
  const mockOnViewProposal = jest.fn();
  const mockOnFilterChange = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with proposals and stats', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
      />
    );
    
    expect(screen.getByText('Governance Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Implement Token Burning Mechanism')).toBeInTheDocument();
    expect(screen.getByText('Add New Community Moderators')).toBeInTheDocument();
    expect(screen.getByText('Total Proposals: 15')).toBeInTheDocument();
    expect(screen.getByText('Active: 3')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 10')).toBeInTheDocument();
    expect(screen.getByText('Participation Rate: 42%')).toBeInTheDocument();
  });

  it('calls onCreateProposal when create proposal button is clicked', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
        onCreateProposal={mockOnCreateProposal} 
      />
    );
    
    const createButton = screen.getByRole('button', { name: /create proposal/i });
    fireEvent.click(createButton);
    
    expect(mockOnCreateProposal).toHaveBeenCalled();
  });

  it('calls onViewProposal when a proposal is clicked', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
        onViewProposal={mockOnViewProposal} 
      />
    );
    
    const proposal = screen.getByText('Implement Token Burning Mechanism');
    fireEvent.click(proposal);
    
    expect(mockOnViewProposal).toHaveBeenCalledWith(mockProposals[0]);
  });

  it('filters proposals when filter is changed', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const statusFilter = screen.getByLabelText(/status/i);
    fireEvent.change(statusFilter, { target: { value: 'active' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      status: 'active'
    }));
  });

  it('displays proposal status badges with correct colors', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
      />
    );
    
    const activeBadge = screen.getByText('active');
    const pendingBadge = screen.getByText('pending');
    
    expect(activeBadge).toHaveClass('status-active');
    expect(pendingBadge).toHaveClass('status-pending');
  });

  it('displays voting progress bars for active proposals', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
      />
    );
    
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('displays time remaining for active proposals', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
      />
    );
    
    expect(screen.getByText(/time remaining/i)).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
        onRefresh={mockOnRefresh} 
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays loading state when isLoading is true', () => {
    render(<GovernanceDashboard isLoading={true} />);
    
    expect(screen.getByText(/loading governance data/i)).toBeInTheDocument();
  });

  it('displays empty state when no proposals are available', () => {
    render(<GovernanceDashboard proposals={[]} stats={mockStats} />);
    
    expect(screen.getByText(/no proposals available/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load governance data';
    render(<GovernanceDashboard error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays top voters in the stats section', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
      />
    );
    
    expect(screen.getByText(/top voters/i)).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('janedoe')).toBeInTheDocument();
    expect(screen.getByText('bobsmith')).toBeInTheDocument();
  });

  it('allows sorting proposals by different criteria', () => {
    render(
      <GovernanceDashboard 
        proposals={mockProposals} 
        stats={mockStats} 
        onFilterChange={mockOnFilterChange} 
      />
    );
    
    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'votesFor' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      sortBy: 'votesFor'
    }));
  });
});