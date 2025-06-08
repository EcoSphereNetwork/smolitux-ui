import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

// Mock the HTML Audio element
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

describe('AudioPlayer', () => {
  const mockAudio = {
    id: '1',
    title: 'Test Audio',
    artist: 'Test Artist',
    src: 'https://example.com/audio.mp3',
    coverImage: 'https://example.com/cover.jpg',
    duration: 180, // 3 minutes
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AudioPlayer audio={mockAudio} />);

    expect(screen.getByText('Test Audio')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('displays play button', () => {
    render(<AudioPlayer audio={mockAudio} />);

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('toggles play/pause when button is clicked', () => {
    render(<AudioPlayer audio={mockAudio} />);

    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

    // After clicking play, the button should change to pause
    const pauseButton = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(pauseButton);

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  });

  it('displays audio duration', () => {
    render(<AudioPlayer audio={mockAudio} />);

    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  it('allows volume adjustment', () => {
    render(<AudioPlayer audio={mockAudio} />);

    const volumeSlider = screen.getByRole('slider', { name: /volume/i });
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });

    // Check that the volume was set to 0.5
    expect(volumeSlider).toHaveValue('0.5');
  });
});
