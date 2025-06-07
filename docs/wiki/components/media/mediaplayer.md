# MediaPlayer

Die MediaPlayer-Komponente ermöglicht die Wiedergabe von Audio- und Videoinhalten mit einer benutzerfreundlichen Steuerungsoberfläche.

## Import

```jsx
import { MediaPlayer } from '@smolitux/core';
```

## Verwendung

### Einfacher Video-Player

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
/>
```

### Video-Player mit Poster-Bild

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  poster="https://example.com/poster.jpg"
/>
```

### Audio-Player

```jsx
<MediaPlayer 
  mediaType="audio"
  sources={[
    { src: "https://example.com/audio.mp3", type: "audio/mp3" }
  ]}
/>
```

### Player mit mehreren Quellen (verschiedene Qualitäten)

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video-hd.mp4", type: "video/mp4", quality: "HD", bitrate: 5000 },
    { src: "https://example.com/video-sd.mp4", type: "video/mp4", quality: "SD", bitrate: 2000 },
    { src: "https://example.com/video-low.mp4", type: "video/mp4", quality: "Low", bitrate: 800 }
  ]}
/>
```

### Player mit Untertiteln

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  tracks={[
    { src: "https://example.com/subtitles-de.vtt", srclang: "de", label: "Deutsch", default: true },
    { src: "https://example.com/subtitles-en.vtt", srclang: "en", label: "English" },
    { src: "https://example.com/subtitles-fr.vtt", srclang: "fr", label: "Français" }
  ]}
/>
```

### Player mit Kapiteln

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  chapters={[
    { title: "Einleitung", startTime: 0, endTime: 120 },
    { title: "Kapitel 1", startTime: 120, endTime: 360 },
    { title: "Kapitel 2", startTime: 360, endTime: 580 },
    { title: "Zusammenfassung", startTime: 580, endTime: 720 }
  ]}
/>
```

### Player mit benutzerdefiniertem Titel und Beschreibung

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  title="Einführung in React"
  description="Eine umfassende Einführung in die Grundlagen von React und seine wichtigsten Konzepte."
/>
```

### Player mit automatischer Wiedergabe

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  autoPlay
  muted // Autoplay erfordert oft, dass das Video stumm ist
/>
```

### Player mit Loop und Preload

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  loop
  preload="auto"
/>
```

### Player mit benutzerdefinierten Steuerelementen

```jsx
<MediaPlayer 
  mediaType="video"
  sources={[
    { src: "https://example.com/video.mp4", type: "video/mp4" }
  ]}
  controls={{
    play: true,
    volume: true,
    mute: true,
    fullscreen: true,
    progress: true,
    time: true,
    settings: true,
    pip: true,
    airplay: true
  }}
/>
```

### Player mit Ereignishandlern

```jsx
function MediaPlayerWithEvents() {
  const handlePlay = () => {
    console.log('Video wird abgespielt');
  };
  
  const handlePause = () => {
    console.log('Video wurde pausiert');
  };
  
  const handleEnded = () => {
    console.log('Video ist zu Ende');
  };
  
  const handleTimeUpdate = (currentTime) => {
    console.log('Aktuelle Zeit:', currentTime);
  };
  
  return (
    <MediaPlayer 
      mediaType="video"
      sources={[
        { src: "https://example.com/video.mp4", type: "video/mp4" }
      ]}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onTimeUpdate={handleTimeUpdate}
    />
  );
}
```

### Kontrollierter Player

```jsx
function ControlledMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div>
      <MediaPlayer 
        mediaType="video"
        sources={[
          { src: "https://example.com/video.mp4", type: "video/mp4" }
        ]}
        playing={isPlaying}
        currentTime={currentTime}
        volume={volume}
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
        onMute={() => setIsMuted(true)}
        onUnmute={() => setIsMuted(false)}
      />
      
      <div className="mt-4 flex items-center space-x-4">
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md"
          onClick={handlePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 rounded-md"
          onClick={handleMuteToggle}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        
        <div className="flex items-center">
          <span className="mr-2">Volume:</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume} 
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `mediaType` | `'audio' \| 'video'` | - | Typ des Mediums (Audio oder Video) |
| `sources` | `MediaSource[]` | - | Medienquellen (für verschiedene Qualitätsstufen/Formate) |
| `tracks` | `MediaTrack[]` | - | Untertitel-Tracks |
| `chapters` | `MediaChapter[]` | - | Kapitel |
| `poster` | `string` | - | Vorschaubild (nur für Video) |
| `title` | `string` | - | Titel des Mediums |
| `description` | `string` | - | Beschreibung des Mediums |
| `autoPlay` | `boolean` | `false` | Automatische Wiedergabe starten |
| `loop` | `boolean` | `false` | Wiedergabe in Schleife |
| `muted` | `boolean` | `false` | Stummschaltung |
| `preload` | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Vorladestrategie |
| `controls` | `MediaControls` | - | Konfiguration der Steuerelemente |
| `playing` | `boolean` | - | Kontrollierter Wiedergabestatus |
| `currentTime` | `number` | - | Kontrollierte aktuelle Wiedergabezeit in Sekunden |
| `volume` | `number` | `1` | Lautstärke (0-1) |
| `playbackRate` | `number` | `1` | Wiedergabegeschwindigkeit |
| `aspectRatio` | `string` | `'16:9'` | Seitenverhältnis (nur für Video) |
| `width` | `string \| number` | `'100%'` | Breite des Players |
| `height` | `string \| number` | `'auto'` | Höhe des Players |
| `onPlay` | `() => void` | - | Callback bei Start der Wiedergabe |
| `onPause` | `() => void` | - | Callback bei Pause der Wiedergabe |
| `onEnded` | `() => void` | - | Callback bei Ende der Wiedergabe |
| `onTimeUpdate` | `(currentTime: number) => void` | - | Callback bei Zeitaktualisierung |
| `onVolumeChange` | `(volume: number) => void` | - | Callback bei Lautstärkeänderung |
| `onMute` | `() => void` | - | Callback bei Stummschaltung |
| `onUnmute` | `() => void` | - | Callback bei Aufhebung der Stummschaltung |
| `onFullscreenEnter` | `() => void` | - | Callback bei Eintritt in den Vollbildmodus |
| `onFullscreenExit` | `() => void` | - | Callback bei Verlassen des Vollbildmodus |
| `onQualityChange` | `(quality: string) => void` | - | Callback bei Qualitätsänderung |
| `onTrackChange` | `(track: MediaTrack) => void` | - | Callback bei Änderung des Untertitels |
| `onChapterChange` | `(chapter: MediaChapter) => void` | - | Callback bei Kapitelwechsel |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### MediaSource Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `src` | `string` | URL der Mediendatei |
| `type` | `string` | MIME-Typ der Mediendatei |
| `quality` | `string` | Qualitätsbezeichnung (z.B. "HD", "SD", "HQ") |
| `bitrate` | `number` | Bitrate in kbps |

### MediaTrack Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `src` | `string` | URL der Untertiteldatei |
| `srclang` | `string` | Sprachcode (z.B. "de", "en") |
| `label` | `string` | Beschreibung (z.B. "Deutsch", "English") |
| `default` | `boolean` | Ist der Track standardmäßig aktiviert? |
| `kind` | `'subtitles' \| 'captions' \| 'descriptions' \| 'chapters' \| 'metadata'` | Art des Tracks |

### MediaChapter Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `title` | `string` | Titel des Kapitels |
| `startTime` | `number` | Startzeit in Sekunden |
| `endTime` | `number` | Endzeit in Sekunden |

### MediaControls Interface

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|-------------|
| `play` | `boolean` | `true` | Play/Pause-Button anzeigen |
| `volume` | `boolean` | `true` | Lautstärkeregler anzeigen |
| `mute` | `boolean` | `true` | Stummschalter anzeigen |
| `fullscreen` | `boolean` | `true` | Vollbildschaltfläche anzeigen (nur für Video) |
| `progress` | `boolean` | `true` | Fortschrittsleiste anzeigen |
| `time` | `boolean` | `true` | Zeitanzeige anzeigen |
| `settings` | `boolean` | `true` | Einstellungsmenü anzeigen |
| `pip` | `boolean` | `true` | Picture-in-Picture-Schaltfläche anzeigen (nur für Video) |
| `airplay` | `boolean` | `false` | AirPlay-Schaltfläche anzeigen |

## Barrierefreiheit

Die MediaPlayer-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<audio>` und `<video>` Elemente für korrekte Semantik
- Unterstützt Untertitel und Beschreibungen
- Steuerelemente sind per Tastatur bedienbar
- ARIA-Attribute für bessere Screenreader-Unterstützung
- Ausreichender Kontrast für Steuerelemente

## Beispiele

### Video-Kurs-Player

```jsx
function CourseVideoPlayer() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isCompleted, setIsCompleted] = useState([false, false, false, false]);
  
  const lessons = [
    {
      title: "Einführung in React",
      description: "Grundlagen und Konzepte von React",
      video: "https://example.com/react-intro.mp4",
      duration: "10:15"
    },
    {
      title: "Komponenten und Props",
      description: "Erstellen und Verwenden von React-Komponenten",
      video: "https://example.com/react-components.mp4",
      duration: "15:30"
    },
    {
      title: "State und Lifecycle",
      description: "Zustandsverwaltung in React-Komponenten",
      video: "https://example.com/react-state.mp4",
      duration: "12:45"
    },
    {
      title: "Hooks",
      description: "Einführung in React Hooks",
      video: "https://example.com/react-hooks.mp4",
      duration: "18:20"
    }
  ];
  
  const handleVideoEnded = () => {
    const newCompleted = [...isCompleted];
    newCompleted[currentLesson] = true;
    setIsCompleted(newCompleted);
    
    // Automatisch zur nächsten Lektion wechseln, wenn verfügbar
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };
  
  const handleLessonClick = (index) => {
    setCurrentLesson(index);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">React-Grundlagenkurs</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <MediaPlayer 
            mediaType="video"
            sources={[
              { src: lessons[currentLesson].video, type: "video/mp4" }
            ]}
            title={lessons[currentLesson].title}
            description={lessons[currentLesson].description}
            onEnded={handleVideoEnded}
          />
        </div>
        
        <div className="md:w-1/3">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 font-medium">Kursinhalt</div>
            <div className="divide-y">
              {lessons.map((lesson, index) => (
                <div 
                  key={index}
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${currentLesson === index ? 'bg-blue-50' : ''}`}
                  onClick={() => handleLessonClick(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {isCompleted[index] ? (
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs mr-2">
                          {index + 1}
                        </span>
                      )}
                      <span className={`font-medium ${isCompleted[index] ? 'text-gray-500' : ''}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-7">{lesson.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Audio-Podcast-Player

```jsx
function PodcastPlayer() {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const episodes = [
    {
      title: "Die Zukunft der KI",
      description: "In dieser Episode sprechen wir über die neuesten Entwicklungen im Bereich der künstlichen Intelligenz.",
      audio: "https://example.com/podcast-ai.mp3",
      duration: "45:12",
      date: "15. Mai 2023"
    },
    {
      title: "Web-Entwicklung 2023",
      description: "Trends und Technologien in der Web-Entwicklung für das Jahr 2023.",
      audio: "https://example.com/podcast-web.mp3",
      duration: "38:45",
      date: "1. Juni 2023"
    },
    {
      title: "Remote Work und Produktivität",
      description: "Tipps und Tricks für effektives Arbeiten im Home Office.",
      audio: "https://example.com/podcast-remote.mp3",
      duration: "52:30",
      date: "15. Juni 2023"
    }
  ];
  
  const handleEpisodeClick = (index) => {
    setCurrentEpisode(index);
  };
  
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <img 
          src="https://example.com/podcast-cover.jpg" 
          alt="Podcast Cover" 
          className="w-24 h-24 rounded-lg mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">Tech Talk Podcast</h1>
          <p className="text-gray-500">Wöchentliche Diskussionen über Technologie und Innovation</p>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium">{episodes[currentEpisode].title}</h2>
          <span className="text-sm text-gray-500">{episodes[currentEpisode].date}</span>
        </div>
        
        <p className="text-gray-700 mb-4">{episodes[currentEpisode].description}</p>
        
        <MediaPlayer 
          mediaType="audio"
          sources={[
            { src: episodes[currentEpisode].audio, type: "audio/mp3" }
          ]}
          playbackRate={playbackRate}
        />
        
        <div className="flex items-center mt-2">
          <span className="text-sm mr-2">Geschwindigkeit:</span>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
            <button 
              key={rate}
              className={`px-2 py-1 text-xs rounded mr-1 ${playbackRate === rate ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePlaybackRateChange(rate)}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>
      
      <h3 className="font-medium mb-2">Alle Episoden</h3>
      <div className="space-y-3">
        {episodes.map((episode, index) => (
          <div 
            key={index}
            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${currentEpisode === index ? 'border-primary-500' : ''}`}
            onClick={() => handleEpisodeClick(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{episode.title}</h4>
              <span className="text-sm text-gray-500">{episode.duration}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{episode.description}</p>
            <div className="text-xs text-gray-400 mt-2">{episode.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Video-Galerie

```jsx
function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const videos = [
    {
      id: 1,
      title: "Naturaufnahmen: Wald im Herbst",
      description: "Entspannende Aufnahmen eines Waldes im Herbst mit Vogelgezwitscher.",
      thumbnail: "https://example.com/forest-thumb.jpg",
      src: "https://example.com/forest.mp4",
      duration: "2:15"
    },
    {
      id: 2,
      title: "Zeitraffer: Sonnenuntergang am Meer",
      description: "Beeindruckender Zeitraffer eines Sonnenuntergangs an der Küste.",
      thumbnail: "https://example.com/sunset-thumb.jpg",
      src: "https://example.com/sunset.mp4",
      duration: "1:30"
    },
    {
      id: 3,
      title: "Städtisches Leben: New York City",
      description: "Eindrücke aus dem pulsierenden Leben in New York City.",
      thumbnail: "https://example.com/nyc-thumb.jpg",
      src: "https://example.com/nyc.mp4",
      duration: "3:45"
    },
    {
      id: 4,
      title: "Tierwelt: Delfine im Ozean",
      description: "Faszinierende Aufnahmen von Delfinen, die im offenen Ozean schwimmen.",
      thumbnail: "https://example.com/dolphins-thumb.jpg",
      src: "https://example.com/dolphins.mp4",
      duration: "2:50"
    }
  ];
  
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };
  
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Video-Galerie</h1>
      
      {selectedVideo ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-medium">{selectedVideo.title}</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseVideo}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <MediaPlayer 
            mediaType="video"
            sources={[
              { src: selectedVideo.src, type: "video/mp4" }
            ]}
            title={selectedVideo.title}
            description={selectedVideo.description}
            autoPlay
          />
          
          <p className="text-gray-700 mt-2">{selectedVideo.description}</p>
        </div>
      ) : null}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map(video => (
          <div 
            key={video.id}
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleVideoSelect(video)}
          >
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="font-medium truncate">{video.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```