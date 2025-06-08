# @smolitux/media

Media components for Smolitux UI.

## Installation

```bash
npm install @smolitux/media
# or
yarn add @smolitux/media
```

## Components

- AudioPlayer: Plays audio files
- VideoPlayer: Plays video files
- MediaUploader: Uploads media files
- MediaGrid: Displays media in a grid layout
- MediaCarousel: Displays media in a carousel

## Usage

```jsx
import { AudioPlayer } from '@smolitux/media';

const MyComponent = () => {
  const audio = {
    id: '1',
    title: 'My Audio',
    artist: 'Artist Name',
    src: '/path/to/audio.mp3',
    coverImage: '/path/to/cover.jpg',
    duration: 180, // in seconds
  };

  return <AudioPlayer audio={audio} autoPlay={false} showControls={true} />;
};
```

## License

MIT
