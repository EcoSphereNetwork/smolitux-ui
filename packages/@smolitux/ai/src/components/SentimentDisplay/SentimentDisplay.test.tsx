import React from 'react';
import { render, screen } from '@testing-library/react';
import { SentimentDisplay } from './SentimentDisplay';

describe('SentimentDisplay', () => {
  it('renders without crashing', () => {
    render(<SentimentDisplay />);
    expect(screen.getByRole('button', { name: /SentimentDisplay/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SentimentDisplay className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SentimentDisplay ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
