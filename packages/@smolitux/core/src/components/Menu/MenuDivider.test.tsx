import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuDivider } from './MenuDivider';

describe('MenuDivider', () => {
  it('renders without crashing', () => {
    render(<MenuDivider />);
    expect(screen.getByRole('button', { name: /MenuDivider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MenuDivider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MenuDivider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
