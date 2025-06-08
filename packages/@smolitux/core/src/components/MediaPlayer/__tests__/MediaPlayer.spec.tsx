import React from 'react';
import { render } from '@testing-library/react';
import { MediaPlayer } from '../MediaPlayer';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für HTMLMediaElement
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

describe('MediaPlayer Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default video player correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders audio player correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-audio.mp3" type="audio" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with multiple sources correctly', () => {
    const sources = [
      { src: 'test-video.mp4', type: 'video/mp4' },
      { src: 'test-video.webm', type: 'video/webm' },
    ];

    const { asFragment } = render(<MediaPlayer sources={sources} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with tracks correctly', () => {
    const tracks = [
      { src: 'subtitles-en.vtt', srclang: 'en', label: 'English', kind: 'subtitles' as const },
      { src: 'subtitles-de.vtt', srclang: 'de', label: 'Deutsch', kind: 'subtitles' as const },
    ];

    const { asFragment } = render(<MediaPlayer src="test-video.mp4" tracks={tracks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with poster image correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" poster="poster.jpg" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with autoplay correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" autoPlay />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with loop correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" loop />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with controls hidden correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" hideControls />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom width and height correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" width={800} height={600} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(
      <MediaPlayer src="test-video.mp4" className="custom-media-player" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different control variants correctly', () => {
    const variants = ['default', 'minimal', 'transparent', 'floating'];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(
        <MediaPlayer src="test-video.mp4" controlsVariant={variant as any} />
      );
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`MediaPlayer with controls variant ${variant}`);
    });
  });

  it('renders with different aspect ratios correctly', () => {
    const aspectRatios = ['16:9', '4:3', '1:1', '21:9'];

    const fragments = aspectRatios.map((aspectRatio) => {
      const { asFragment } = render(
        <MediaPlayer src="test-video.mp4" aspectRatio={aspectRatio as any} />
      );
      return { aspectRatio, fragment: asFragment() };
    });

    fragments.forEach(({ aspectRatio, fragment }) => {
      expect(fragment).toMatchSnapshot(`MediaPlayer with aspect ratio ${aspectRatio}`);
    });
  });

  it('renders with different quality options correctly', () => {
    const sources = [
      { src: 'test-video-hd.mp4', type: 'video/mp4', quality: 'HD', bitrate: 5000 },
      { src: 'test-video-sd.mp4', type: 'video/mp4', quality: 'SD', bitrate: 2000 },
      { src: 'test-video-low.mp4', type: 'video/mp4', quality: 'Low', bitrate: 800 },
    ];

    const { asFragment } = render(<MediaPlayer sources={sources} showQualitySelector />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with playback speed controls correctly', () => {
    const { asFragment } = render(<MediaPlayer src="test-video.mp4" showSpeedControls />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with all features enabled correctly', () => {
    const sources = [
      { src: 'test-video-hd.mp4', type: 'video/mp4', quality: 'HD', bitrate: 5000 },
      { src: 'test-video-sd.mp4', type: 'video/mp4', quality: 'SD', bitrate: 2000 },
    ];

    const tracks = [
      { src: 'subtitles-en.vtt', srclang: 'en', label: 'English', kind: 'subtitles' as const },
      { src: 'subtitles-de.vtt', srclang: 'de', label: 'Deutsch', kind: 'subtitles' as const },
    ];

    const { asFragment } = render(
      <MediaPlayer
        sources={sources}
        tracks={tracks}
        poster="poster.jpg"
        autoPlay
        loop
        width={800}
        height={600}
        showQualitySelector
        showSpeedControls
        aspectRatio="16:9"
        controlsVariant="floating"
        className="custom-media-player"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
