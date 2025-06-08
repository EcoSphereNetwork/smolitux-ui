import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaPlayer.original } from './MediaPlayer.original';

describe('MediaPlayer.original', () => {
  it('renders without crashing', () => {
    render(<MediaPlayer.original />);
    expect(screen.getByRole('button', { name: /MediaPlayer.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MediaPlayer.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MediaPlayer.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
