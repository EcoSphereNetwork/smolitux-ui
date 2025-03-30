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
    expect(screen.getByTestId('media-controls')).toBeInTheDocument();
  });

  it('renders video player by default', () => {
    render(<MediaPlayer src="test-video.mp4" />);
    
    expect(screen.getByTestId('video-element')).toBeInTheDocument();
  });

  it('renders audio player when type is audio', () => {
    render(<MediaPlayer src="test-audio.mp3" type="audio" />);
    
    expect(screen.getByTestId('audio-element')).toBeInTheDocument();
  });

  it('renders with multiple sources', () => {
    const sources = [
      { src: 'test-video.mp4', type: 'video/mp4' },
      { src: 'test-video.webm', type: 'video/webm' }
    ];
    
    render(<MediaPlayer sources={sources} />);
    
    const sourceElements = screen.getAllByTestId('source-element');
    expect(sourceElements).toHaveLength(2);
    expect(sourceElements[0]).toHaveAttribute('src', 'test-video.mp4');
    expect(sourceElements[0]).toHaveAttribute('type', 'video/mp4');
    expect(sourceElements[1]).toHaveAttribute('src', 'test-video.webm');
    expect(sourceElements[1]).toHaveAttribute('type', 'video/webm');
  });

  it('renders with tracks', () => {
    const tracks = [
      { src: 'subtitles-en.vtt', srclang: 'en', label: 'English', kind: 'subtitles' as const },
      { src: 'subtitles-de.vtt', srclang: 'de', label: 'Deutsch', kind: 'subtitles' as const }
    ];
    
    render(<MediaPlayer src="test-video.mp4" tracks={tracks} />);
    
    const trackElements = screen.getAllByTestId('track-element');
    expect(trackElements).toHaveLength(2);
    expect(trackElements[0]).toHaveAttribute('src', 'subtitles-en.vtt');
    expect(trackElements[0]).toHaveAttribute('srclang', 'en');
    expect(trackElements[0]).toHaveAttribute('label', 'English');
    expect(trackElements[0]).toHaveAttribute('kind', 'subtitles');
    expect(trackElements[1]).toHaveAttribute('src', 'subtitles-de.vtt');
    expect(trackElements[1]).toHaveAttribute('srclang', 'de');
    expect(trackElements[1]).toHaveAttribute('label', 'Deutsch');
    expect(trackElements[1]).toHaveAttribute('kind', 'subtitles');
  });

  it('plays media when play button is clicked', () => {
    render(<MediaPlayer src="test-video.mp4" />);
    
    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);
    
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('pauses media when pause button is clicked', () => {
    render(<MediaPlayer src="test-video.mp4" />);
    
    // First play
    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);
    
    // Then simulate playing state
    const mediaElement = screen.getByTestId('video-element');
    Object.defineProperty(mediaElement, 'paused', { value: false });
    
    // Trigger update to show pause button
    fireEvent.playing(mediaElement);
    
    // Now click pause
    const pauseButton = screen.getByLabelText('Pause');
    fireEvent.click(pauseButton);
    
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('mutes and unmutes media', () => {
    render(<MediaPlayer src="test-video.mp4" />);
    
    const muteButton = screen.getByLabelText('Mute');
    fireEvent.click(muteButton);
    
    const mediaElement = screen.getByTestId('video-element');
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
    
    const mediaElement = screen.getByTestId('video-element');
    expect(mediaElement).toHaveProperty('volume', 0.5);
  });

  it('seeks to position when progress bar is clicked', () => {
    render(<MediaPlayer src="test-video.mp4" />);
    
    const mediaElement = screen.getByTestId('video-element');
    
    // Mock duration
    Object.defineProperty(mediaElement, 'duration', { value: 100 });
    
    // Trigger timeupdate to initialize progress bar
    fireEvent.timeUpdate(mediaElement);
    
    const progressBar = screen.getByTestId('progress-bar');
    
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
    
    document.exitFullscreen = exitFullscreenMock;
    Element.prototype.requestFullscreen = requestFullscreenMock;
    
    render(<MediaPlayer src="test-video.mp4" />);
    
    const fullscreenButton = screen.getByLabelText('Enter fullscreen');
    fireEvent.click(fullscreenButton);
    
    expect(requestFullscreenMock).toHaveBeenCalled();
  });

  it('renders with poster image', () => {
    render(<MediaPlayer src="test-video.mp4" poster="poster.jpg" />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('poster', 'poster.jpg');
  });

  it('renders with autoplay', () => {
    render(<MediaPlayer src="test-video.mp4" autoPlay />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('autoplay');
  });

  it('renders with loop', () => {
    render(<MediaPlayer src="test-video.mp4" loop />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('loop');
  });

  it('renders with controls hidden when hideControls is true', () => {
    render(<MediaPlayer src="test-video.mp4" hideControls />);
    
    expect(screen.queryByTestId('media-controls')).not.toBeInTheDocument();
  });

  it('renders with custom width and height', () => {
    render(<MediaPlayer src="test-video.mp4" width={800} height={600} />);
    
    const videoElement = screen.getByTestId('video-element');
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
    
    const mediaElement = screen.getByTestId('video-element');
    fireEvent.play(mediaElement);
    
    expect(handlePlay).toHaveBeenCalled();
  });

  it('calls onPause when media is paused', () => {
    const handlePause = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onPause={handlePause} />);
    
    const mediaElement = screen.getByTestId('video-element');
    fireEvent.pause(mediaElement);
    
    expect(handlePause).toHaveBeenCalled();
  });

  it('calls onEnded when media playback ends', () => {
    const handleEnded = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onEnded={handleEnded} />);
    
    const mediaElement = screen.getByTestId('video-element');
    fireEvent.ended(mediaElement);
    
    expect(handleEnded).toHaveBeenCalled();
  });

  it('calls onTimeUpdate when media time updates', () => {
    const handleTimeUpdate = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onTimeUpdate={handleTimeUpdate} />);
    
    const mediaElement = screen.getByTestId('video-element');
    fireEvent.timeUpdate(mediaElement);
    
    expect(handleTimeUpdate).toHaveBeenCalled();
  });

  it('calls onVolumeChange when volume changes', () => {
    const handleVolumeChange = jest.fn();
    render(<MediaPlayer src="test-video.mp4" onVolumeChange={handleVolumeChange} />);
    
    const mediaElement = screen.getByTestId('video-element');
    fireEvent.volumeChange(mediaElement);
    
    expect(handleVolumeChange).toHaveBeenCalled();
  });
});