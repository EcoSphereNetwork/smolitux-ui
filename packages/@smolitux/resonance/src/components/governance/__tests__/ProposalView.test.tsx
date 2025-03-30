import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProposalView } from '../ProposalView';

describe('ProposalView', () => {
  const mockProposal = {
    id: 'prop1',
    title: 'Implement Token Burning Mechanism',
    description: 'Proposal to implement a token burning mechanism to reduce supply and increase value. This will help maintain the token\'s value over time and reward long-term holders.',
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
    category: 'tokenomics',
    details: {
      implementation: 'Smart contract will be updated to burn 1% of tokens from each transaction.',
      timeline: 'Implementation within 2 weeks of proposal passing.',
      budget: 'No additional budget required.',
      risks: 'Potential impact on transaction volume due to increased costs.'
    },
    comments: [
      {
        id: 'comment1',
        content: 'I support this proposal as it will help maintain token value.',
        createdAt: '2023-06-12T10:15:00Z',
        author: {
          id: 'user456',
          username: 'janedoe',
          displayName: 'Jane Doe',
          avatarUrl: 'https://example.com/jane-avatar.jpg'
        },
        likes: 15
      },
      {
        id: 'comment2',
        content: 'I\'m concerned about the impact on transaction volume.',
        createdAt: '2023-06-13T08:45:00Z',
        author: {
          id: 'user789',
          username: 'bobsmith',
          displayName: 'Bob Smith',
          avatarUrl: 'https://example.com/bob-avatar.jpg'
        },
        likes: 8
      }
    ]
  };

  const mockUserVotingPower = 50000;
  const mockOnVote = jest.fn();
  const mockOnComment = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnShare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with proposal data', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByText('Implement Token Burning Mechanism')).toBeInTheDocument();
    expect(screen.getByText(/proposal to implement a token burning mechanism/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByText(/votes for: 1,250,000/i)).toBeInTheDocument();
    expect(screen.getByText(/votes against: 450,000/i)).toBeInTheDocument();
    expect(screen.getByText(/votes abstain: 75,000/i)).toBeInTheDocument();
  });

  it('displays proposal details', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByText(/implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/smart contract will be updated/i)).toBeInTheDocument();
    expect(screen.getByText(/timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/implementation within 2 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/budget/i)).toBeInTheDocument();
    expect(screen.getByText(/no additional budget required/i)).toBeInTheDocument();
    expect(screen.getByText(/risks/i)).toBeInTheDocument();
    expect(screen.getByText(/potential impact on transaction volume/i)).toBeInTheDocument();
  });

  it('displays comments', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
    expect(screen.getByText('I support this proposal as it will help maintain token value.')).toBeInTheDocument();
    expect(screen.getByText('I\'m concerned about the impact on transaction volume.')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('allows voting when user has voting power', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        userVotingPower={mockUserVotingPower}
        onVote={mockOnVote}
      />
    );
    
    expect(screen.getByText(/your voting power: 50,000/i)).toBeInTheDocument();
    
    const voteForButton = screen.getByRole('button', { name: /vote for/i });
    fireEvent.click(voteForButton);
    
    expect(mockOnVote).toHaveBeenCalledWith(mockProposal.id, 'for', mockUserVotingPower);
  });

  it('disables voting when user has no voting power', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        userVotingPower={0}
        onVote={mockOnVote}
      />
    );
    
    expect(screen.getByText(/your voting power: 0/i)).toBeInTheDocument();
    
    const voteForButton = screen.getByRole('button', { name: /vote for/i });
    expect(voteForButton).toBeDisabled();
  });

  it('disables voting when proposal is not active', () => {
    const inactiveProposal = { ...mockProposal, status: 'completed' };
    
    render(
      <ProposalView 
        proposal={inactiveProposal} 
        userVotingPower={mockUserVotingPower}
        onVote={mockOnVote}
      />
    );
    
    const voteForButton = screen.getByRole('button', { name: /vote for/i });
    expect(voteForButton).toBeDisabled();
  });

  it('allows commenting on the proposal', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        onComment={mockOnComment}
      />
    );
    
    const commentInput = screen.getByPlaceholderText(/add a comment/i);
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(mockOnComment).toHaveBeenCalledWith(mockProposal.id, 'This is a test comment');
  });

  it('calls onBack when back button is clicked', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        onBack={mockOnBack}
      />
    );
    
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('calls onShare when share button is clicked', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        onShare={mockOnShare}
      />
    );
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(mockOnShare).toHaveBeenCalledWith(mockProposal);
  });

  it('displays voting progress bar', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays time remaining for active proposals', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByText(/time remaining/i)).toBeInTheDocument();
  });

  it('displays quorum progress', () => {
    render(<ProposalView proposal={mockProposal} />);
    
    expect(screen.getByText(/quorum/i)).toBeInTheDocument();
    expect(screen.getByText(/1,500,000/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<ProposalView isLoading={true} />);
    
    expect(screen.getByText(/loading proposal/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load proposal';
    render(<ProposalView error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows partial voting power allocation', () => {
    render(
      <ProposalView 
        proposal={mockProposal} 
        userVotingPower={mockUserVotingPower}
        onVote={mockOnVote}
        allowPartialVoting={true}
      />
    );
    
    const votingPowerInput = screen.getByLabelText(/voting power to use/i);
    fireEvent.change(votingPowerInput, { target: { value: '25000' } });
    
    const voteForButton = screen.getByRole('button', { name: /vote for/i });
    fireEvent.click(voteForButton);
    
    expect(mockOnVote).toHaveBeenCalledWith(mockProposal.id, 'for', 25000);
  });
});