import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar />);
    expect(screen.getByRole('button', { name: /ProgressBar/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProgressBar className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProgressBar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
