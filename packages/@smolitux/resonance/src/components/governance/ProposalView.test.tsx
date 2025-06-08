import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProposalView } from './ProposalView';

describe('ProposalView', () => {
  it('renders without crashing', () => {
    render(<ProposalView />);
    expect(screen.getByRole('button', { name: /ProposalView/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProposalView className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProposalView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
