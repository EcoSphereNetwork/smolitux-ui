import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaPlayer } from './MediaPlayer';

describe('MediaPlayer', () => {
  it('renders without crashing', () => {
    render(<MediaPlayer />);
    expect(screen.getByRole('button', { name: /MediaPlayer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MediaPlayer className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MediaPlayer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
