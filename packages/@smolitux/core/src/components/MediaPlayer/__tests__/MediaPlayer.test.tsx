import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaPlayer } from '../MediaPlayer';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für HTMLMediaElement
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

describe('MediaPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    expect(screen.getByTestId('media-player')).toBeInTheDocument();
    expect(screen.getByTestId('media-player-controls')).toBeInTheDocument();
  });

  it('renders video player by default', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    expect(screen.getByTestId('media-player-video')).toBeInTheDocument();
  });

  it('renders audio player when type is audio', () => {
    render(<MediaPlayer src="test-audio.mp3" type="audio" />);

    expect(screen.getByTestId('media-player-audio')).toBeInTheDocument();
  });

  it('renders with multiple sources', () => {
    const sources = [
      { src: 'test-video.mp4', type: 'video/mp4' },
      { src: 'test-video.webm', type: 'video/webm' },
    ];

    render(<MediaPlayer sources={sources} />);

    expect(screen.getByTestId('media-player-source-0')).toHaveAttribute('src', 'test-video.mp4');
    expect(screen.getByTestId('media-player-source-0')).toHaveAttribute('type', 'video/mp4');
    expect(screen.getByTestId('media-player-source-1')).toHaveAttribute('src', 'test-video.webm');
    expect(screen.getByTestId('media-player-source-1')).toHaveAttribute('type', 'video/webm');
  });

  it('renders with tracks', () => {
    const tracks = [
      { src: 'subtitles-en.vtt', srclang: 'en', label: 'English', kind: 'subtitles' as const },
      { src: 'subtitles-de.vtt', srclang: 'de', label: 'Deutsch', kind: 'subtitles' as const },
    ];

    render(<MediaPlayer src="test-video.mp4" tracks={tracks} />);

    expect(screen.getByTestId('media-player-track-0')).toHaveAttribute('src', 'subtitles-en.vtt');
    expect(screen.getByTestId('media-player-track-0')).toHaveAttribute('srclang', 'en');
    expect(screen.getByTestId('media-player-track-0')).toHaveAttribute('label', 'English');
    expect(screen.getByTestId('media-player-track-0')).toHaveAttribute('kind', 'subtitles');
    expect(screen.getByTestId('media-player-track-1')).toHaveAttribute('src', 'subtitles-de.vtt');
    expect(screen.getByTestId('media-player-track-1')).toHaveAttribute('srclang', 'de');
    expect(screen.getByTestId('media-player-track-1')).toHaveAttribute('label', 'Deutsch');
    expect(screen.getByTestId('media-player-track-1')).toHaveAttribute('kind', 'subtitles');
  });

  it('plays media when play button is clicked', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('pauses media when play button is clicked while playing', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    // First play
    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    // Simulate playing state
    const mediaElement = screen.getByTestId('media-player-video');
    Object.defineProperty(mediaElement, 'paused', { value: false });

    // Trigger play event to update state
    fireEvent.play(mediaElement);

    // Pause should be called when clicking play button again
    fireEvent.click(playButton);

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('mutes and unmutes media', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const muteButton = screen.getByLabelText('Mute');
    fireEvent.click(muteButton);

    const mediaElement = screen.getByTestId('media-player-video');
    expect(mediaElement).toHaveProperty('muted', true);

    // Now unmute
    const unmuteButton = screen.getByLabelText('Unmute');
    fireEvent.click(unmuteButton);

    expect(mediaElement).toHaveProperty('muted', false);
  });

  it('changes volume when volume slider is adjusted', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const volumeSlider = screen.getByLabelText('Volume');
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });

    const mediaElement = screen.getByTestId('media-player-video');
    expect(mediaElement).toHaveProperty('volume', 0.5);
  });

  it('seeks to position when progress bar is clicked', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const mediaElement = screen.getByTestId('media-player-video');

    // Mock duration
    Object.defineProperty(mediaElement, 'duration', { value: 100 });

    // Trigger timeupdate to initialize progress bar
    fireEvent.timeUpdate(mediaElement);

    const progressBar = screen.getByTestId('media-player-progress-bar');

    // Mock getBoundingClientRect
    progressBar.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: 200,
      top: 0,
      right: 200,
      bottom: 0,
      height: 0,
    }));

    // Click at 50% position
    fireEvent.mouseDown(progressBar, { clientX: 100 });

    expect(mediaElement).toHaveProperty('currentTime', 50);
  });

  it('toggles fullscreen mode', () => {
    // Mock requestFullscreen and exitFullscreen
    const requestFullscreenMock = jest.fn();
    const exitFullscreenMock = jest.fn();

    // Save original methods
    const originalRequestFullscreen = Element.prototype.requestFullscreen;
    const originalExitFullscreen = document.exitFullscreen;

    // Mock methods
    Element.prototype.requestFullscreen = requestFullscreenMock;
    document.exitFullscreen = exitFullscreenMock;

    try {
      render(<MediaPlayer src="test-video.mp4" />);

      const fullscreenButton = screen.getByLabelText('Enter fullscreen');
      fireEvent.click(fullscreenButton);

      expect(requestFullscreenMock).toHaveBeenCalled();
    } finally {
      // Restore original methods
      Element.prototype.requestFullscreen = originalRequestFullscreen;
      document.exitFullscreen = originalExitFullscreen;
    }
  });

  it('renders with poster image', () => {
    render(<MediaPlayer src="test-video.mp4" poster="poster.jpg" />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('poster', 'poster.jpg');
  });

  it('renders with autoplay', () => {
    render(<MediaPlayer src="test-video.mp4" autoPlay />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('autoplay');
  });

  it('renders with loop', () => {
    render(<MediaPlayer src="test-video.mp4" loop />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('loop');
  });

  it('renders with controls hidden when hideControls is true', () => {
    render(<MediaPlayer src="test-video.mp4" hideControls />);

    expect(screen.queryByTestId('media-player-controls')).not.toBeInTheDocument();
  });

  it('renders with custom width and height', () => {
    render(<MediaPlayer src="test-video.mp4" width={800} height={600} />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('width', '800');
    expect(videoElement).toHaveAttribute('height', '600');
  });

  it('renders with custom className', () => {
    render(<MediaPlayer src="test-video.mp4" className="custom-media-player" />);

    const container = screen.getByTestId('media-player');
    expect(container).toHaveClass('custom-media-player');
  });

  it('forwards ref to media element', () => {
    const ref = React.createRef<HTMLVideoElement>();
    render(<MediaPlayer src="test-video.mp4" ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('VIDEO');
  });

  it('calls onPlay when media starts playing', () => {
    const handlePlay = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onPlay={handlePlay} />);

    const mediaElement = screen.getByTestId('media-player-video');
    fireEvent.play(mediaElement);

    expect(handlePlay).toHaveBeenCalled();
  });

  it('calls onPause when media is paused', () => {
    const handlePause = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onPause={handlePause} />);

    const mediaElement = screen.getByTestId('media-player-video');
    fireEvent.pause(mediaElement);

    expect(handlePause).toHaveBeenCalled();
  });

  it('calls onEnded when media playback ends', () => {
    const handleEnded = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onEnded={handleEnded} />);

    const mediaElement = screen.getByTestId('media-player-video');
    fireEvent.ended(mediaElement);

    expect(handleEnded).toHaveBeenCalled();
  });

  it('calls onTimeUpdate when media time updates', () => {
    const handleTimeUpdate = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onTimeUpdate={handleTimeUpdate} />);

    const mediaElement = screen.getByTestId('media-player-video');
    fireEvent.timeUpdate(mediaElement);

    expect(handleTimeUpdate).toHaveBeenCalled();
  });

  it('calls onVolumeChange when volume changes', () => {
    const handleVolumeChange = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onVolumeChange={handleVolumeChange} />);

    const mediaElement = screen.getByTestId('media-player-video');
    fireEvent.volumeChange(mediaElement);

    expect(handleVolumeChange).toHaveBeenCalled();
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('aria-label', 'Video player');

    const controls = screen.getByTestId('media-player-controls');
    expect(controls).toHaveAttribute('aria-label', 'Media controls');

    const progressBar = screen.getByTestId('media-player-progress-bar');
    expect(progressBar).toHaveAttribute('role', 'slider');
    expect(progressBar).toHaveAttribute('aria-label', 'Seek');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
});
