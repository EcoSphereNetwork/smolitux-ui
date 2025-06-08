import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentModerator } from './ContentModerator';

describe('ContentModerator', () => {
  it('renders without crashing', () => {
    render(<ContentModerator />);
    expect(screen.getByRole('button', { name: /ContentModerator/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ContentModerator className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ContentModerator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
