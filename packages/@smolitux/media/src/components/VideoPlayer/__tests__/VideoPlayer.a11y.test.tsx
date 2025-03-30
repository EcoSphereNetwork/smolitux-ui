import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VideoPlayer } from '../VideoPlayer';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock the HTML Video element
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

describe('VideoPlayer Accessibility', () => {
  const mockVideo = {
    id: '1',
    title: 'Test Video',
    src: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    duration: 180, // 3 minutes
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <VideoPlayer 
        video={mockVideo}
        aria-label="Video player for Test Video"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes on video element', () => {
    const { container } = render(
      <VideoPlayer 
        video={mockVideo}
        aria-label="Video player for Test Video"
      />
    );
    
    const videoElement = container.querySelector('video');
    expect(videoElement).toHaveAttribute('aria-label', 'Video player for Test Video');
  });

  test('should have accessible controls', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    // Play button should have accessible name
    const playButton = container.querySelector('button[aria-label="Play"]');
    expect(playButton).toBeInTheDocument();
    
    // Volume control should have accessible name
    const volumeControl = container.querySelector('input[aria-label="Volume"]');
    expect(volumeControl).toBeInTheDocument();
    
    // Seek bar should have accessible name
    const seekBar = container.querySelector('input[aria-label="Seek"]');
    expect(seekBar).toBeInTheDocument();
  });

  test('should have accessible time display', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    const timeDisplay = container.querySelector('.time-display');
    expect(timeDisplay).toBeInTheDocument();
    expect(timeDisplay).toHaveAttribute('aria-live', 'polite');
  });

  test('should have accessible subtitles when available', () => {
    const { container } = render(
      <VideoPlayer video={{
        ...mockVideo,
        subtitles: [
          { src: 'https://example.com/subtitles-en.vtt', language: 'English', srclang: 'en' },
          { src: 'https://example.com/subtitles-de.vtt', language: 'Deutsch', srclang: 'de' }
        ]
      }} />
    );
    
    // Video should have track elements
    const trackElements = container.querySelectorAll('track');
    expect(trackElements.length).toBe(2);
    
    // First track should be English
    expect(trackElements[0]).toHaveAttribute('srclang', 'en');
    expect(trackElements[0]).toHaveAttribute('label', 'English');
    
    // Second track should be German
    expect(trackElements[1]).toHaveAttribute('srclang', 'de');
    expect(trackElements[1]).toHaveAttribute('label', 'Deutsch');
  });

  test('should have accessible fullscreen button', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    const fullscreenButton = container.querySelector('button[aria-label="Enter fullscreen"]');
    expect(fullscreenButton).toBeInTheDocument();
  });

  test('should have accessible mute button', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    const muteButton = container.querySelector('button[aria-label="Mute"]');
    expect(muteButton).toBeInTheDocument();
  });

  test('should have accessible playback speed control', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    const speedButton = container.querySelector('button[aria-label="Playback speed"]');
    expect(speedButton).toBeInTheDocument();
    expect(speedButton).toHaveAttribute('aria-haspopup', 'true');
  });

  test('should have accessible quality control when available', () => {
    const { container } = render(
      <VideoPlayer video={{
        ...mockVideo,
        sources: [
          { src: 'https://example.com/video-720p.mp4', quality: '720p' },
          { src: 'https://example.com/video-1080p.mp4', quality: '1080p' }
        ]
      }} />
    );
    
    const qualityButton = container.querySelector('button[aria-label="Video quality"]');
    expect(qualityButton).toBeInTheDocument();
    expect(qualityButton).toHaveAttribute('aria-haspopup', 'true');
  });

  test('should have keyboard accessible controls', () => {
    const { container } = render(
      <VideoPlayer video={mockVideo} />
    );
    
    // All interactive elements should be focusable
    const interactiveElements = container.querySelectorAll('button, input[type="range"]');
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1');
    });
  });
});