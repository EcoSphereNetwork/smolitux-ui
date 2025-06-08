import React from 'react';
import { render, screen } from '@testing-library/react';
import { FederatedSearch } from './FederatedSearch';

describe('FederatedSearch', () => {
  it('renders without crashing', () => {
    render(<FederatedSearch />);
    expect(screen.getByRole('button', { name: /FederatedSearch/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FederatedSearch className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FederatedSearch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
