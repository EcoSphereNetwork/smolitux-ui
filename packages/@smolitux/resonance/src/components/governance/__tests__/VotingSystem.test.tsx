import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VotingSystem } from './VotingSystem';

describe('VotingSystem', () => {
  const mockProposal = {
    id: '123',
    title: 'Test Proposal',
    description: 'This is a test proposal',
    options: ['Yes', 'No', 'Abstain'],
    votes: {
      'Yes': 10,
      'No': 5,
      'Abstain': 2
    },
    status: 'active',
    deadline: new Date(Date.now() + 86400000).toISOString() // 1 day from now
  };

  it('renders correctly with default props', () => {
    render(
      <VotingSystem proposal={mockProposal} />
    );
    
    expect(screen.getByText('Test Proposal')).toBeInTheDocument();
    expect(screen.getByText('This is a test proposal')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Abstain')).toBeInTheDocument();
  });

  it('displays vote counts correctly', () => {
    render(
      <VotingSystem proposal={mockProposal} showResults />
    );
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onVote when an option is selected', () => {
    const handleVote = jest.fn();
    render(
      <VotingSystem proposal={mockProposal} onVote={handleVote} />
    );
    
    const yesOption = screen.getByText('Yes');
    fireEvent.click(yesOption);
    
    expect(handleVote).toHaveBeenCalledWith('123', 'Yes');
  });

  it('disables voting when proposal is closed', () => {
    const closedProposal = {
      ...mockProposal,
      status: 'closed'
    };
    
    const handleVote = jest.fn();
    render(
      <VotingSystem proposal={closedProposal} onVote={handleVote} />
    );
    
    const yesOption = screen.getByText('Yes');
    fireEvent.click(yesOption);
    
    expect(handleVote).not.toHaveBeenCalled();
    expect(screen.getByText('Voting closed')).toBeInTheDocument();
  });

  it('disables voting when user has already voted', () => {
    const handleVote = jest.fn();
    render(
      <VotingSystem proposal={mockProposal} onVote={handleVote} userVote="Yes" />
    );
    
    const noOption = screen.getByText('No');
    fireEvent.click(noOption);
    
    expect(handleVote).not.toHaveBeenCalled();
    expect(screen.getByText('You voted: Yes')).toBeInTheDocument();
  });

  it('displays time remaining until deadline', () => {
    render(
      <VotingSystem proposal={mockProposal} />
    );
    
    expect(screen.getByText(/Time remaining:/)).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <VotingSystem proposal={mockProposal} className="custom-voting" data-testid="voting-system" />
    );
    
    const votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('custom-voting');
  });

  it('renders with custom style', () => {
    render(
      <VotingSystem proposal={mockProposal} style={{ backgroundColor: 'lightblue' }} data-testid="voting-system" />
    );
    
    const votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveStyle('background-color: lightblue');
  });

  it('renders with different voting styles', () => {
    const { rerender } = render(
      <VotingSystem proposal={mockProposal} votingStyle="buttons" data-testid="voting-system" />
    );
    
    let votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('voting-buttons');
    
    rerender(
      <VotingSystem proposal={mockProposal} votingStyle="slider" data-testid="voting-system" />
    );
    
    votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('voting-slider');
  });

  it('renders with different result display styles', () => {
    const { rerender } = render(
      <VotingSystem proposal={mockProposal} showResults resultStyle="bar" data-testid="voting-system" />
    );
    
    let votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('results-bar');
    
    rerender(
      <VotingSystem proposal={mockProposal} showResults resultStyle="pie" data-testid="voting-system" />
    );
    
    votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('results-pie');
  });

  it('renders with weighted voting when enabled', () => {
    render(
      <VotingSystem proposal={mockProposal} weightedVoting data-testid="voting-system" />
    );
    
    const votingSystem = screen.getByTestId('voting-system');
    expect(votingSystem).toHaveClass('weighted-voting');
    expect(screen.getByLabelText('Voting Power')).toBeInTheDocument();
  });
});