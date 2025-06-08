import React from 'react';
import { render, screen } from '@testing-library/react';
import { AudioPlayer } from './AudioPlayer';

describe('AudioPlayer', () => {
  it('renders without crashing', () => {
    render(<AudioPlayer />);
    expect(screen.getByRole('button', { name: /AudioPlayer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AudioPlayer className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<AudioPlayer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
