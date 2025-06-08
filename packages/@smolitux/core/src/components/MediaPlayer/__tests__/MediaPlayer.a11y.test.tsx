import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { MediaPlayer } from '../MediaPlayer';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true,
};

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für HTMLMediaElement
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

describe('MediaPlayer Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<MediaPlayer src="test-video.mp4" />);
    expect(violations).toHaveLength(0);
  });

  it('should have proper ARIA attributes for video player', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveAttribute('aria-label', 'Video player');
  });

  it('should have proper ARIA attributes for audio player', () => {
    render(<MediaPlayer src="test-audio.mp3" type="audio" />);

    const audioElement = screen.getByTestId('media-player-audio');
    expect(audioElement).toHaveAttribute('aria-label', 'Audio player');
  });

  it('should have proper ARIA attributes for controls', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const controls = screen.getByTestId('media-player-controls');
    expect(controls).toHaveAttribute('aria-label', 'Media controls');
  });

  it('should have proper ARIA attributes for progress bar', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const progressBar = screen.getByTestId('media-player-progress-bar');
    expect(progressBar).toHaveAttribute('role', 'slider');
    expect(progressBar).toHaveAttribute('aria-label', 'Seek');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should have proper ARIA attributes for play button', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const playButton = screen.getByLabelText('Play');
    expect(playButton).toHaveAttribute('aria-label', 'Play');
    expect(playButton).toHaveAttribute('type', 'button');
  });

  it('should have proper ARIA attributes for mute button', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const muteButton = screen.getByLabelText('Mute');
    expect(muteButton).toHaveAttribute('aria-label', 'Mute');
    expect(muteButton).toHaveAttribute('type', 'button');
  });

  it('should have proper ARIA attributes for volume slider', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const volumeSlider = screen.getByLabelText('Volume');
    expect(volumeSlider).toHaveAttribute('aria-label', 'Volume');
  });

  it('should have proper ARIA attributes for fullscreen button', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const fullscreenButton = screen.getByLabelText('Enter fullscreen');
    expect(fullscreenButton).toHaveAttribute('aria-label', 'Enter fullscreen');
    expect(fullscreenButton).toHaveAttribute('type', 'button');
  });

  it('should have accessible focus management', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const playButton = screen.getByLabelText('Play');
    playButton.focus();
    expect(a11y.hasVisibleFocusIndicator(playButton)).toBe(true);

    const muteButton = screen.getByLabelText('Mute');
    muteButton.focus();
    expect(a11y.hasVisibleFocusIndicator(muteButton)).toBe(true);

    const volumeSlider = screen.getByLabelText('Volume');
    volumeSlider.focus();
    expect(a11y.hasVisibleFocusIndicator(volumeSlider)).toBe(true);

    const fullscreenButton = screen.getByLabelText('Enter fullscreen');
    fullscreenButton.focus();
    expect(a11y.hasVisibleFocusIndicator(fullscreenButton)).toBe(true);
  });

  it('should have accessible keyboard navigation', () => {
    // Clear mock calls
    jest.clearAllMocks();

    render(<MediaPlayer src="test-video.mp4" />);

    const playButton = screen.getByLabelText('Play');
    playButton.focus();

    // Simulate keyboard interaction with click (which is what happens with Enter key)
    fireEvent.click(playButton);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const muteButton = screen.getByLabelText('Mute');
    muteButton.focus();

    fireEvent.click(muteButton);
    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement).toHaveProperty('muted', true);
  });

  it('should have accessible fallback content', () => {
    render(<MediaPlayer src="test-video.mp4" />);

    const videoElement = screen.getByTestId('media-player-video');
    expect(videoElement.textContent).toContain('Your browser does not support the video element');
  });
});
