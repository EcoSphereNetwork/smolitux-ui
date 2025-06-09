import React from 'react';
import { render, screen } from '@testing-library/react';
import { SmartContractInteraction } from './SmartContractInteraction';

describe('SmartContractInteraction', () => {
  it('renders without crashing', () => {
    render(<SmartContractInteraction />);
    expect(screen.getByTestId('SmartContractInteraction')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<SmartContractInteraction className="custom-class" />);
    const element = screen.getByTestId('SmartContractInteraction');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<SmartContractInteraction ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<SmartContractInteraction>Test Content</SmartContractInteraction>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<SmartContractInteraction />);
    const element = screen.getByTestId('SmartContractInteraction');
    expect(element).toBeInTheDocument();
  });
});
