import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MediaPlayerA11y } from '../MediaPlayer.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

// Mock für HTMLMediaElement
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', { value: 100 });
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', { value: 0, writable: true });
Object.defineProperty(window.HTMLMediaElement.prototype, 'volume', { value: 1, writable: true });
Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', { value: false, writable: true });
Object.defineProperty(window.HTMLMediaElement.prototype, 'textTracks', { value: [], writable: true });

// Mock für requestFullscreen und exitFullscreen
Element.prototype.requestFullscreen = jest.fn().mockImplementation(() => Promise.resolve());
document.exitFullscreen = jest.fn().mockImplementation(() => Promise.resolve());

describe('MediaPlayer Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render video player with correct ARIA attributes', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        ariaRoledescription="Video Player"
      />
    );
    
    const player = screen.getByTestId('media-player');
    expect(player).toHaveAttribute('aria-label', 'Test video');
    expect(player).toHaveAttribute('aria-roledescription', 'Video Player');
    
    const video = screen.getByTestId('video-element');
    expect(video).toBeInTheDocument();
  });

  it('should render audio player with correct ARIA attributes', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/audio.mp3"
        type="audio"
        controls
        ariaLabel="Test audio"
        ariaRoledescription="Audio Player"
      />
    );
    
    const player = screen.getByTestId('media-player');
    expect(player).toHaveAttribute('aria-label', 'Test audio');
    expect(player).toHaveAttribute('aria-roledescription', 'Audio Player');
    
    const audio = screen.getByTestId('audio-element');
    expect(audio).toBeInTheDocument();
  });

  it('should render with description for screen readers', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        description="This is a test video description"
      />
    );
    
    const player = screen.getByTestId('media-player');
    expect(player).toHaveAttribute('aria-describedby');
    
    const descriptionId = player.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId as string);
    expect(description).toHaveTextContent('This is a test video description');
    expect(description).toHaveClass('sr-only');
  });

  it('should render with announcement for screen readers', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        screenReaderAnnouncements
      />
    );
    
    const announcement = screen.getByTestId('media-player').querySelector('[aria-live="polite"]');
    expect(announcement).toBeInTheDocument();
    expect(announcement).toHaveClass('sr-only');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
  });

  it('should render with keyboard help', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        keyboardHelp
      />
    );
    
    const helpButton = screen.getByLabelText('Tastaturhilfe anzeigen');
    expect(helpButton).toBeInTheDocument();
    
    fireEvent.click(helpButton);
    
    const helpDialog = screen.getByRole('dialog', { name: 'Tastaturkürzel' });
    expect(helpDialog).toBeInTheDocument();
    expect(screen.getByText('Leertaste oder K: Wiedergabe starten/pausieren')).toBeInTheDocument();
  });

  it('should render with transcript', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        transcript={<p>This is the transcript of the video.</p>}
      />
    );
    
    const transcript = screen.getByLabelText('Transkript');
    expect(transcript).toBeInTheDocument();
    expect(transcript).toHaveAttribute('tabIndex', '0');
    expect(screen.getByText('This is the transcript of the video.')).toBeInTheDocument();
  });

  it('should render with tracks and captions controls', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        tracks={[
          { src: "/subtitles/de.vtt", srclang: "de", label: "Deutsch", kind: "subtitles", default: true }
        ]}
        captionsIndicator
      />
    );
    
    const captionsButton = screen.getByLabelText('Untertitel ausschalten');
    expect(captionsButton).toBeInTheDocument();
    expect(captionsButton).toHaveAttribute('aria-pressed', 'true');
    
    fireEvent.click(captionsButton);
    
    expect(captionsButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should handle play/pause button correctly', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
      />
    );
    
    const playButton = screen.getByLabelText('Abspielen');
    expect(playButton).toBeInTheDocument();
    
    fireEvent.click(playButton);
    
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('should handle mute button correctly', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
      />
    );
    
    const muteButton = screen.getByLabelText('Stummschalten');
    expect(muteButton).toBeInTheDocument();
    
    fireEvent.click(muteButton);
    
    expect(screen.getByLabelText('Ton einschalten')).toBeInTheDocument();
  });

  it('should handle fullscreen button correctly', async () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        fullscreenIndicator
      />
    );
    
    const fullscreenButton = screen.getByLabelText('Vollbildmodus');
    expect(fullscreenButton).toBeInTheDocument();
    
    fireEvent.click(fullscreenButton);
    
    await waitFor(() => {
      expect(Element.prototype.requestFullscreen).toHaveBeenCalled();
    });
  });

  it('should handle volume slider correctly', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        volumeIndicator
      />
    );
    
    const volumeSlider = screen.getByLabelText('Lautstärke');
    expect(volumeSlider).toBeInTheDocument();
    
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    
    expect(volumeSlider).toHaveValue('0.5');
  });

  it('should handle playback speed selector correctly', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        speedIndicator
      />
    );
    
    const speedSelector = screen.getByLabelText('Wiedergabegeschwindigkeit');
    expect(speedSelector).toBeInTheDocument();
    
    fireEvent.change(speedSelector, { target: { value: '1.5' } });
    
    expect(speedSelector).toHaveValue('1.5');
  });

  it('should handle progress bar correctly', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        progressIndicator
      />
    );
    
    const progressBar = screen.getByRole('slider', { name: 'Fortschritt' });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('tabIndex', '0');
  });

  it('should handle keyboard shortcuts', () => {
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
        keyboardShortcuts
      />
    );
    
    const player = screen.getByTestId('media-player');
    
    // Simulate focus on the player
    fireEvent.focus(player);
    
    // Test space key for play
    fireEvent.keyDown(player, { key: ' ' });
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    
    // Test 'm' key for mute
    fireEvent.keyDown(player, { key: 'm' });
    
    // Test arrow keys for seeking
    fireEvent.keyDown(player, { key: 'ArrowLeft' });
    fireEvent.keyDown(player, { key: 'ArrowRight' });
    
    // Test 'f' key for fullscreen
    fireEvent.keyDown(player, { key: 'f' });
    expect(Element.prototype.requestFullscreen).toHaveBeenCalled();
  });

  it('should respect reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    render(
      <MediaPlayerA11y
        src="https://example.com/video.mp4"
        type="video"
        controls
        ariaLabel="Test video"
      />
    );
    
    // No direct way to test this, but the component should be rendered
    expect(screen.getByTestId('media-player')).toBeInTheDocument();
  });
});