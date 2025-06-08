import React from 'react';
import { render, screen } from '@testing-library/react';
import { SmartContractInteraction } from './SmartContractInteraction';

describe('SmartContractInteraction', () => {
  it('renders without crashing', () => {
    render(<SmartContractInteraction />);
    expect(screen.getByRole('button', { name: /SmartContractInteraction/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SmartContractInteraction className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SmartContractInteraction ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
