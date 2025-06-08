import React from 'react';
import { render, screen } from '@testing-library/react';
import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('renders without crashing', () => {
    render(<Collapse />);
    expect(screen.getByRole('button', { name: /Collapse/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Collapse className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Collapse ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
