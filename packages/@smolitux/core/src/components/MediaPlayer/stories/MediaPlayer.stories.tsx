import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer } from '../MediaPlayer';

const meta: Meta<typeof MediaPlayer> = {
  title: 'Core/Media/MediaPlayer',
  component: MediaPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Die URL der Mediendatei',
    },
    type: {
      control: {
        type: 'select',
        options: ['video', 'audio'],
      },
      description: 'Der Typ des Medienplayers',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Gibt an, ob die Mediendatei automatisch abgespielt werden soll',
    },
    controls: {
      control: 'boolean',
      description: 'Gibt an, ob Steuerelemente angezeigt werden sollen',
    },
    loop: {
      control: 'boolean',
      description: 'Gibt an, ob die Mediendatei in einer Schleife abgespielt werden soll',
    },
    muted: {
      control: 'boolean',
      description: 'Gibt an, ob die Mediendatei stummgeschaltet sein soll',
    },
    poster: {
      control: 'text',
      description: 'Die URL des Posterbilds (nur für Video)',
    },
    preload: {
      control: {
        type: 'select',
        options: ['auto', 'metadata', 'none'],
      },
      description: 'Gibt an, wie die Mediendatei vorgeladen werden soll',
    },
    width: {
      control: 'text',
      description: 'Die Breite des Players',
    },
    height: {
      control: 'text',
      description: 'Die Höhe des Players',
    },
    onPlay: {
      action: 'played',
      description: 'Callback, der aufgerufen wird, wenn die Mediendatei abgespielt wird',
    },
    onPause: {
      action: 'paused',
      description: 'Callback, der aufgerufen wird, wenn die Mediendatei pausiert wird',
    },
    onEnded: {
      action: 'ended',
      description: 'Callback, der aufgerufen wird, wenn die Mediendatei zu Ende ist',
    },
    onTimeUpdate: {
      action: 'timeUpdated',
      description: 'Callback, der aufgerufen wird, wenn sich die Abspielzeit ändert',
    },
    onVolumeChange: {
      action: 'volumeChanged',
      description: 'Callback, der aufgerufen wird, wenn sich die Lautstärke ändert',
    },
    onLoadedData: {
      action: 'dataLoaded',
      description: 'Callback, der aufgerufen wird, wenn die Mediendaten geladen wurden',
    },
    onError: {
      action: 'error',
      description: 'Callback, der aufgerufen wird, wenn ein Fehler auftritt',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
    children: {
      description: 'Kindelemente des MediaPlayers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaPlayer>;

export const VideoPlayer: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video',
    controls: true,
    width: '600px',
    height: 'auto',
  },
};

export const AudioPlayer: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    type: 'audio',
    controls: true,
    width: '400px',
  },
};

export const WithPoster: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    type: 'video',
    controls: true,
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    width: '600px',
    height: 'auto',
  },
};

export const AutoPlay: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    type: 'video',
    autoPlay: true,
    muted: true, // Autoplay requires muted in most browsers
    controls: true,
    width: '600px',
    height: 'auto',
  },
};

export const LoopingVideo: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    type: 'video',
    loop: true,
    controls: true,
    width: '600px',
    height: 'auto',
  },
};

export const CustomControls: Story = {
  render: () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const handleLoadedData = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = parseFloat(e.target.value);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
      <div className="w-[600px] space-y-2">
        <MediaPlayer
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video"
          controls={false}
          width="100%"
          height="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="rounded-lg"
        />

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center mb-2">
            <button
              onClick={togglePlay}
              className="mr-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="flex-1 mx-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleMute}
              className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="w-24">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ResponsivePlayer: Story = {
  render: () => (
    <div className="w-full max-w-[800px]">
      <MediaPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
        type="video"
        controls
        width="100%"
        height="auto"
        className="rounded-lg"
      />
    </div>
  ),
};

export const WithMultipleSources: Story = {
  render: () => (
    <MediaPlayer type="video" controls width="600px" height="auto" className="rounded-lg">
      <source
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        type="video/mp4"
      />
      <source
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm"
        type="video/webm"
      />
      <p>
        Ihr Browser unterstützt kein HTML5-Video. Hier ist ein{' '}
        <a href="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
          Link zum Video
        </a>
        .
      </p>
    </MediaPlayer>
  ),
};

export const WithTracks: Story = {
  render: () => (
    <MediaPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      type="video"
      controls
      width="600px"
      height="auto"
      className="rounded-lg"
    >
      <track
        src="https://example.com/subtitles-de.vtt"
        kind="subtitles"
        srcLang="de"
        label="Deutsch"
      />
      <track
        src="https://example.com/subtitles-en.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </MediaPlayer>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <MediaPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      type="video"
      controls
      width="600px"
      height="auto"
      className="rounded-xl shadow-lg border-4 border-purple-500"
    />
  ),
};

export const AudioPlayerWithPlaylist: Story = {
  render: () => {
    const [currentTrack, setCurrentTrack] = React.useState(0);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const playlist = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
      {
        title: 'Song 3',
        artist: 'Artist 3',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
    ];

    const playNext = () => {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const playPrevious = () => {
      setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const handleEnded = () => {
      playNext();
    };

    return (
      <div className="w-[400px] bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="mb-4">
          <h3 className="text-lg font-medium">{playlist[currentTrack].title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {playlist[currentTrack].artist}
          </p>
        </div>

        <MediaPlayer
          ref={audioRef}
          src={playlist[currentTrack].src}
          type="audio"
          controls
          width="100%"
          onEnded={handleEnded}
          className="mb-4"
        />

        <div className="flex justify-center space-x-4">
          <button
            onClick={playPrevious}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>
          <button
            onClick={playNext}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Playlist:</h4>
          <ul className="space-y-1">
            {playlist.map((track, index) => (
              <li
                key={index}
                className={`p-2 rounded cursor-pointer ${
                  index === currentTrack
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="font-medium">{track.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{track.artist}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};
