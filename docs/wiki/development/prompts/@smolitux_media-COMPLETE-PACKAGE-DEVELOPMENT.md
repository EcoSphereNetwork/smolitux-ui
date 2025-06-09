# 🎵 @smolitux/media - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS MEDIA LIBRARY 100% COMPLETE
while [ "$(find packages/@smolitux/media/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 10 ]; do
  bash scripts/smolitux-analyzer.sh --package=media
  cd packages/@smolitux/media
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE MEDIA KOMPONENTE
  MEDIA=("AudioPlayer" "VideoPlayer" "ImageGallery" "MediaUpload" "ImageViewer" "VideoStream" "AudioWave" "MediaGrid" "Carousel" "Lightbox")
  
  NEXT=$(for media in "${MEDIA[@]}"; do
    if [ ! -f "src/components/$media/$media.tsx" ] || [ ! -f "src/components/$media/$media.test.tsx" ] || [ ! -f "src/components/$media/$media.stories.tsx" ]; then
      echo "$media"; break
    fi
  done)
  
  echo "🎯 COMPLETING MEDIA: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE MEDIA KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_MEDIA]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(media): complete $NEXT - media component with accessibility"
  git push origin main
  gh pr create --title "Complete Media: $NEXT" --body "Media component with full controls and accessibility support"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/10 Media Components"
done
echo "🎉 @smolitux/media 100% COMPLETE!"
```

---

## 📋 **MEDIA PACKAGE SPEZIFIKATIONEN:**

### **🎯 Media Components (10 Total):**
```
AudioPlayer VideoPlayer ImageGallery MediaUpload ImageViewer VideoStream AudioWave MediaGrid Carousel Lightbox
```

### **✅ Pro Media Component REQUIRED:**
- **Browser APIs:** HTMLMediaElement, File API, Canvas API
- **Accessibility:** Keyboard controls, screen reader support
- **Performance:** Lazy loading, memory management
- **Mobile:** Touch gestures, responsive design
- **Controls:** Play, pause, seek, volume, fullscreen

### **🔧 CORE Media Interfaces:**
```typescript
// AUDIO Player:
interface AudioPlayerProps {
  src: string | string[];
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onEnd?: () => void;
  showWaveform?: boolean;
  showPlaylist?: boolean;
}

// VIDEO Player:
interface VideoPlayerProps extends AudioPlayerProps {
  poster?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  quality?: 'auto' | '480p' | '720p' | '1080p';
  subtitles?: SubtitleTrack[];
  onFullscreen?: (isFullscreen: boolean) => void;
  showControls?: boolean;
  customControls?: boolean;
}

// IMAGE Gallery:
interface ImageGalleryProps {
  images: ImageItem[];
  selectedIndex?: number;
  onImageSelect?: (index: number) => void;
  layout?: 'grid' | 'masonry' | 'carousel';
  lazy?: boolean;
  zoomable?: boolean;
  downloadable?: boolean;
}
```

### **📁 Media Structure:**
```
src/components/
├── AudioPlayer/            # Audio playback with controls
├── VideoPlayer/            # Video playback with controls
├── ImageGallery/           # Image gallery with layouts
├── MediaUpload/            # File upload with preview
├── ImageViewer/            # Single image viewer with zoom
├── VideoStream/            # Live video streaming
├── AudioWave/              # Audio waveform visualization
├── MediaGrid/              # Grid layout for media
├── Carousel/               # Media carousel/slider
└── Lightbox/               # Modal image/video viewer
```

### **🎮 MEDIA Controls:**
```typescript
// CUSTOM Media Controls:
interface MediaControls {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setPlaybackRate: (rate: number) => void;
}

// KEYBOARD Navigation:
const keyboardControls = {
  'Space': 'togglePlay',
  'ArrowLeft': 'seekBackward',
  'ArrowRight': 'seekForward', 
  'ArrowUp': 'volumeUp',
  'ArrowDown': 'volumeDown',
  'f': 'toggleFullscreen',
  'm': 'toggleMute'
};
```

### **📱 RESPONSIVE Features:**
```typescript
// TOUCH Gestures:
interface TouchGestures {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

// VIEWPORT Optimization:
const useMediaQuery = (query: string) => {
  // Responsive behavior logic
};
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Media Component:
✅ Media API mocking (HTMLMediaElement)
✅ User interaction testing (play, pause, seek)
✅ Accessibility testing (keyboard, screen readers)
✅ Error handling (file not found, unsupported format)
✅ Performance testing (memory leaks, cleanup)
✅ Mobile touch gesture testing
```

### **📚 STORYBOOK Media:**
```typescript
// REQUIRED Stories:
✅ Default media player/viewer
✅ All control variations
✅ Error states and loading
✅ Responsive behavior
✅ Accessibility demonstration
✅ Custom styling examples
✅ Real media files demo
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-media.md`
- **BROWSER APIs:** Graceful degradation for unsupported features
- **FILE HANDLING:** Secure upload and preview logic

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
MEDIA_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $MEDIA_COUNT -lt 10 ]; then
  echo "🔄 CONTINUE: $MEDIA_COUNT/10 Complete - Next media component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 MEDIA LIBRARY COMPLETE: @smolitux/media 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **10/10 Media Components** fully implemented
- **Browser API Integration** for all media types
- **Accessibility Support** keyboard and screen readers
- **Mobile Optimization** touch gestures and responsive
- **Performance** optimized loading and memory management

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **AudioPlayer Component:**
```typescript
export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ 
    src, 
    autoPlay = false, 
    loop = false, 
    volume = 1,
    showWaveform = false,
    onPlay,
    onPause,
    onTimeUpdate,
    className,
    ...props 
  }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    // Combine refs
    const combinedRef = useCombinedRefs(ref, audioRef);
    
    const togglePlay = useCallback(() => {
      if (!audioRef.current) return;
      
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }, [isPlaying, onPlay, onPause]);
    
    // Keyboard controls
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.target !== audioRef.current) return;
        
        switch (e.code) {
          case 'Space':
            e.preventDefault();
            togglePlay();
            break;
          // Additional keyboard controls...
        }
      };
      
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [togglePlay]);
    
    return (
      <div className={cn('audio-player', className)} role="region" aria-label="Audio player">
        <audio
          ref={combinedRef}
          src={Array.isArray(src) ? src[0] : src}
          autoPlay={autoPlay}
          loop={loop}
          volume={volume}
          onTimeUpdate={(e) => {
            const time = e.currentTarget.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          {...props}
        />
        
        {/* Custom Controls */}
        <div className="audio-controls">
          <button 
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            type="button"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          
          {/* Progress bar, volume, etc. */}
        </div>
        
        {/* Waveform visualization */}
        {showWaveform && <AudioWaveform src={src} currentTime={currentTime} />}
        
        {/* Accessibility */}
        <div className="sr-only">
          Audio player. Current time: {formatTime(currentTime)} of {formatTime(duration)}.
          {isPlaying ? 'Playing' : 'Paused'}.
        </div>
      </div>
    );
  }
);
```

### **Media Hook Pattern:**
```typescript
export const useMediaPlayer = (mediaRef: RefObject<HTMLMediaElement>) => {
  const [state, setState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isFullscreen: false,
  });
  
  const controls = useMemo(() => ({
    play: () => mediaRef.current?.play(),
    pause: () => mediaRef.current?.pause(),
    seek: (time: number) => {
      if (mediaRef.current) mediaRef.current.currentTime = time;
    },
    setVolume: (volume: number) => {
      if (mediaRef.current) mediaRef.current.volume = volume;
    },
  }), [mediaRef]);
  
  return { state, controls };
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-media.md << EOF
# @smolitux/media Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/10 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 10" | bc)%)
Browser APIs: ✅ HTMLMediaElement, File API
Latest: $NEXT ✅
Accessibility: Keyboard controls, screen reader support
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 10/10 MEDIA COMPONENTS = 100% MEDIA LIBRARY!**
