import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('VideoPlayer', () => {
  const src = 'test.mp4';

  it('toggles play and pause', () => {
    render(<VideoPlayer src={src} />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playBtn);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const pauseBtn = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(pauseBtn);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('shows controls when provided', () => {
    render(<VideoPlayer src={src} controls />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('supports File src', () => {
    const file = new File(['data'], 'video.mp4', { type: 'video/mp4' });
    render(<VideoPlayer src={file} />);
    const video = document.querySelector('video') as HTMLVideoElement;
    expect(video.src).toContain('blob:');
  });
});
