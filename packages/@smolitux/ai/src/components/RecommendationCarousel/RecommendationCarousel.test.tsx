import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecommendationCarousel } from './RecommendationCarousel';

describe('RecommendationCarousel', () => {
  it('renders without crashing', () => {
    render(<RecommendationCarousel />);
    expect(screen.getByRole('button', { name: /RecommendationCarousel/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RecommendationCarousel className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<RecommendationCarousel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
