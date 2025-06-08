import React from 'react';
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders without crashing', () => {
    render(<VideoPlayer />);
    expect(screen.getByRole('button', { name: /VideoPlayer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VideoPlayer className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VideoPlayer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
