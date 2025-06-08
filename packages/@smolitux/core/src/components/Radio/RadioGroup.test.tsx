import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup />);
    expect(screen.getByRole('button', { name: /RadioGroup/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RadioGroup className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<RadioGroup ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
