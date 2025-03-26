# @smolitux/ai

AI components for Smolitux UI.

## Installation

```bash
npm install @smolitux/ai
# or
yarn add @smolitux/ai
```

## Components

- RecommendationCarousel: Displays AI-powered content recommendations
- ContentAnalytics: Shows analytics data for content
- SentimentDisplay: Visualizes sentiment analysis results
- EngagementScore: Displays engagement metrics
- TrendingTopics: Shows trending topics based on AI analysis

## Usage

```jsx
import { RecommendationCarousel } from '@smolitux/ai';

const MyComponent = () => {
  const recommendations = [
    // recommendation objects
  ];

  return (
    <RecommendationCarousel 
      recommendations={recommendations}
      title="Recommended for you"
    />
  );
};
```

## License

MIT