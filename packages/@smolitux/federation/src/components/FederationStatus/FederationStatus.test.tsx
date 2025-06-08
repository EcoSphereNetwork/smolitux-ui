import React from 'react';
import { render, screen } from '@testing-library/react';
import { FederationStatus } from './FederationStatus';

describe('FederationStatus', () => {
  it('renders without crashing', () => {
    render(<FederationStatus />);
    expect(screen.getByRole('button', { name: /FederationStatus/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FederationStatus className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FederationStatus ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
