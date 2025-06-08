import React from 'react';
import { render, screen } from '@testing-library/react';
import { index } from './index';

describe('index', () => {
  it('renders without crashing', () => {
    render(<index />);
    expect(screen.getByRole('button', { name: /index/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<index className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<index ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
