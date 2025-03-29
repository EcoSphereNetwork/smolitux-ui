import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MediaPlayer from './MediaPlayer';

const meta: Meta<typeof MediaPlayer> = {
  title: 'Core/MediaPlayer',
  component: MediaPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['video', 'audio'],
    },
    autoPlay: { control: 'boolean' },
    controls: { control: 'boolean' },
    muted: { control: 'boolean' },
    loop: { control: 'boolean' },
    poster: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    preload: {
      control: { type: 'select' },
      options: ['auto', 'metadata', 'none'],
    },
    playbackRate: { control: 'number', min: 0.25, max: 4, step: 0.25 },
    volume: { control: 'number', min: 0, max: 1, step: 0.1 },
    startTime: { control: 'number' },
    customControls: { control: 'boolean' },
    theaterMode: { control: 'boolean' },
    miniMode: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MediaPlayer>;

// Beispiel-Video-URLs
const videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const posterSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg';

export const DefaultVideo: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
  },
};

export const DefaultAudio: Story = {
  args: {
    src: audioSrc,
    type: 'audio',
    controls: true,
    width: '100%',
  },
};

export const CustomControlsVideo: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: false,
    customControls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
  },
};

export const WithTracks: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    tracks: [
      {
        src: 'https://example.com/subtitles-de.vtt',
        kind: 'subtitles',
        srcLang: 'de',
        label: 'Deutsch',
        default: true,
      },
      {
        src: 'https://example.com/subtitles-en.vtt',
        kind: 'subtitles',
        srcLang: 'en',
        label: 'English',
      },
      {
        src: 'https://example.com/subtitles-fr.vtt',
        kind: 'subtitles',
        srcLang: 'fr',
        label: 'Français',
      },
    ],
  },
};

export const WithQualityOptions: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: false,
    customControls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    qualityOptions: [
      { label: '1080p', src: videoSrc },
      { label: '720p', src: videoSrc },
      { label: '480p', src: videoSrc },
      { label: '360p', src: videoSrc },
    ],
    currentQuality: '720p',
  },
};

export const TheaterMode: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: false,
    customControls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    theaterMode: true,
  },
};

export const MiniMode: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: false,
    customControls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    miniMode: true,
  },
};

export const WithCustomOverlay: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: false,
    customControls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
        <div className="text-white text-center p-4">
          <h3 className="text-xl font-bold">Big Buck Bunny</h3>
          <p className="mt-2">Ein kurzer Film über einen Hasen, der sich an drei Nagetieren rächt.</p>
        </div>
      </div>
    ),
  },
};

export const WithCustomErrorDisplay: Story = {
  args: {
    src: 'https://example.com/invalid-video.mp4', // Ungültige URL, um einen Fehler zu erzeugen
    type: 'video',
    controls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    errorDisplay: (
      <div className="bg-red-900 bg-opacity-75 p-6 rounded-lg text-white text-center">
        <h3 className="text-xl font-bold mb-2">Oops! Etwas ist schiefgelaufen</h3>
        <p>Das Video konnte nicht geladen werden. Bitte versuchen Sie es später erneut.</p>
        <button className="mt-4 px-4 py-2 bg-white text-red-900 rounded font-medium">
          Erneut versuchen
        </button>
      </div>
    ),
  },
};

export const WithCustomLoadingIndicator: Story = {
  args: {
    src: videoSrc,
    type: 'video',
    controls: true,
    poster: posterSrc,
    width: '100%',
    height: 'auto',
    loadingIndicator: (
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="mt-2">Wird geladen...</p>
      </div>
    ),
  },
};

export const ControlledPlayer: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    
    return (
      <div className="space-y-4">
        <MediaPlayer 
          src={videoSrc}
          type="video"
          poster={posterSrc}
          width="100%"
          height="auto"
          controls={false}
          customControls={true}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={setCurrentTime}
          onLoadedMetadata={setDuration}
          onVolumeChange={setVolume}
        />
        
        <div className="p-4 bg-gray-100 rounded">
          <div className="flex justify-between mb-2">
            <span>Status: {isPlaying ? 'Spielt' : 'Pausiert'}</span>
            <span>Lautstärke: {Math.round(volume * 100)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  },
};

// Hilfsfunktion zum Formatieren der Zeit
function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}