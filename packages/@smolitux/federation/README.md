# @smolitux/federation

Federation components for Smolitux UI.

## Installation

```bash
npm install @smolitux/federation
# or
yarn add @smolitux/federation
```

## Components

- FederatedSearch: Search across federated platforms
- PlatformSelector: Select from available federated platforms
- ActivityStream: Display activity from federated platforms
- FederationStatus: Show federation status
- CrossPlatformShare: Share content across platforms

## Usage

```jsx
import { FederatedSearch } from '@smolitux/federation';

const MyComponent = () => {
  const platforms = [
    { id: 'mastodon', name: 'Mastodon', icon: 'mastodon.png' },
    { id: 'peertube', name: 'PeerTube', icon: 'peertube.png' },
    // more platforms
  ];

  const handleSearch = (query, selectedPlatforms) => {
    console.log('Search query:', query);
    console.log('Selected platforms:', selectedPlatforms);
  };

  return (
    <FederatedSearch 
      platforms={platforms}
      onSearch={handleSearch}
    />
  );
};
```

## License

MIT