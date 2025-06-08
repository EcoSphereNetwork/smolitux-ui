# @smolitux/community

Community components for Smolitux UI.

## Installation

```bash
npm install @smolitux/community
# or
yarn add @smolitux/community
```

## Components

- CommentSection: Displays and manages comments
- UserProfile: Shows user profile information
- NotificationCenter: Manages user notifications
- ActivityFeed: Displays user activity
- FollowButton: Button for following users or topics

## Usage

```jsx
import { CommentSection } from '@smolitux/community';

const MyComponent = () => {
  const comments = [
    // comment objects
  ];

  const handleAddComment = (comment) => {
    console.log('New comment:', comment);
  };

  return <CommentSection comments={comments} onAddComment={handleAddComment} />;
};
```

## License

MIT
