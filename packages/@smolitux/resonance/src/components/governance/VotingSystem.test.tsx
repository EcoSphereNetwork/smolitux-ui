import React from 'react';
import { render, screen } from '@testing-library/react';
import { VotingSystem } from './VotingSystem';

describe('VotingSystem', () => {
  it('renders without crashing', () => {
    render(<VotingSystem />);
    expect(screen.getByRole('button', { name: /VotingSystem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VotingSystem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VotingSystem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
