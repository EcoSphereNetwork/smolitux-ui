import React from 'react';
import { render, screen } from '@testing-library/react';
import { AudioPlayer } from './AudioPlayer';

describe('AudioPlayer', () => {
  const src = 'test.mp3';

  it('renders play button', () => {
    render(<AudioPlayer src={src} />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AudioPlayer src={src} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AudioPlayer src={src} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
