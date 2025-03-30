import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoPlayer } from '../VideoPlayer';

// Mock the HTML Video element
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

describe('VideoPlayer', () => {
  const mockVideo = {
    id: '1',
    title: 'Test Video',
    src: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    duration: 180, // 3 minutes
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    
    // Video element should be rendered
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', 'https://example.com/video.mp4');
    expect(videoElement).toHaveAttribute('poster', 'https://example.com/poster.jpg');
  });

  test('displays play button', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  test('toggles play/pause when button is clicked', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);
    
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    
    // After clicking play, the button should change to pause
    const pauseButton = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(pauseButton);
    
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  });

  test('displays video duration', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  test('allows volume adjustment', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    const volumeSlider = screen.getByRole('slider', { name: /volume/i });
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    
    // Check that the volume was set to 0.5
    expect(volumeSlider).toHaveValue('0.5');
  });

  test('allows seeking through the video', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    const seekBar = screen.getByRole('slider', { name: /seek/i });
    fireEvent.change(seekBar, { target: { value: '90' } });
    
    // Check that the seek bar was set to 90 (halfway through the video)
    expect(seekBar).toHaveValue('90');
  });

  test('toggles fullscreen mode', () => {
    // Mock the requestFullscreen method
    const requestFullscreenMock = jest.fn();
    Element.prototype.requestFullscreen = requestFullscreenMock;
    
    render(<VideoPlayer video={mockVideo} />);
    
    const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
    fireEvent.click(fullscreenButton);
    
    expect(requestFullscreenMock).toHaveBeenCalledTimes(1);
  });

  test('toggles mute state', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    const muteButton = screen.getByRole('button', { name: /mute/i });
    fireEvent.click(muteButton);
    
    // After clicking mute, the button should change to unmute
    const unmuteButton = screen.getByRole('button', { name: /unmute/i });
    expect(unmuteButton).toBeInTheDocument();
    
    fireEvent.click(unmuteButton);
    
    // After clicking unmute, the button should change back to mute
    expect(screen.getByRole('button', { name: /mute/i })).toBeInTheDocument();
  });

  test('displays playback speed control', () => {
    render(<VideoPlayer video={mockVideo} />);
    
    const speedButton = screen.getByRole('button', { name: /speed/i });
    fireEvent.click(speedButton);
    
    // Speed options should be displayed
    expect(screen.getByText('0.5x')).toBeInTheDocument();
    expect(screen.getByText('1.0x')).toBeInTheDocument();
    expect(screen.getByText('1.5x')).toBeInTheDocument();
    expect(screen.getByText('2.0x')).toBeInTheDocument();
    
    // Select a speed
    fireEvent.click(screen.getByText('1.5x'));
    
    // Speed menu should close
    expect(screen.queryByText('0.5x')).not.toBeInTheDocument();
  });

  test('displays quality control', () => {
    render(<VideoPlayer video={{
      ...mockVideo,
      sources: [
        { src: 'https://example.com/video-720p.mp4', quality: '720p' },
        { src: 'https://example.com/video-1080p.mp4', quality: '1080p' },
        { src: 'https://example.com/video-4k.mp4', quality: '4K' }
      ]
    }} />);
    
    const qualityButton = screen.getByRole('button', { name: /quality/i });
    fireEvent.click(qualityButton);
    
    // Quality options should be displayed
    expect(screen.getByText('720p')).toBeInTheDocument();
    expect(screen.getByText('1080p')).toBeInTheDocument();
    expect(screen.getByText('4K')).toBeInTheDocument();
    
    // Select a quality
    fireEvent.click(screen.getByText('1080p'));
    
    // Quality menu should close
    expect(screen.queryByText('720p')).not.toBeInTheDocument();
  });

  test('displays subtitles control when available', () => {
    render(<VideoPlayer video={{
      ...mockVideo,
      subtitles: [
        { src: 'https://example.com/subtitles-en.vtt', language: 'English', srclang: 'en' },
        { src: 'https://example.com/subtitles-de.vtt', language: 'Deutsch', srclang: 'de' }
      ]
    }} />);
    
    const subtitlesButton = screen.getByRole('button', { name: /subtitles/i });
    fireEvent.click(subtitlesButton);
    
    // Subtitle options should be displayed
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Deutsch')).toBeInTheDocument();
    expect(screen.getByText('Off')).toBeInTheDocument();
    
    // Select a subtitle
    fireEvent.click(screen.getByText('Deutsch'));
    
    // Subtitles menu should close
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  test('handles custom controls prop', () => {
    render(<VideoPlayer 
      video={mockVideo} 
      controls={['play', 'volume']} 
    />);
    
    // Play button should be rendered
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    
    // Volume control should be rendered
    expect(screen.getByRole('slider', { name: /volume/i })).toBeInTheDocument();
    
    // Fullscreen button should not be rendered
    expect(screen.queryByRole('button', { name: /fullscreen/i })).not.toBeInTheDocument();
  });

  test('handles autoplay prop', () => {
    render(<VideoPlayer video={mockVideo} autoPlay />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('autoplay');
  });

  test('handles loop prop', () => {
    render(<VideoPlayer video={mockVideo} loop />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('loop');
  });

  test('handles muted prop', () => {
    render(<VideoPlayer video={mockVideo} muted />);
    
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('muted');
  });
});