import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.pause = jest.fn();
  global.URL.createObjectURL = jest.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = jest.fn();
});

describe('AudioPlayer', () => {
  const src = 'test.mp3';

  it('calls onPlay and onPause callbacks', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    render(<AudioPlayer src={src} onPlay={onPlay} onPause={onPause} />);

    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    fireEvent.loadedMetadata(audioElement);

    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);
    expect(onPlay).toHaveBeenCalled();

    const pauseButton = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(pauseButton);
    expect(onPause).toHaveBeenCalled();
  });

  it('handles volume change', () => {
    render(<AudioPlayer src={src} />);
    const volumeSlider = screen.getAllByRole('slider')[1];
    fireEvent.change(volumeSlider, { target: { value: '0.3' } });
    expect((volumeSlider as HTMLInputElement).value).toBe('0.3');
  });

  it('supports File src', () => {
    const file = new File(['test'], 'test.mp3', { type: 'audio/mpeg' });
    render(<AudioPlayer src={file} />);
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    fireEvent.loadedMetadata(audioElement);
    expect(audioElement.src).toContain('blob:');
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AudioPlayer src={src} ref={ref} />);
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    fireEvent.loadedMetadata(audioElement);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
