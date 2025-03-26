import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecommendationCarousel } from '../RecommendationCarousel';

describe('RecommendationCarousel', () => {
  const mockRecommendations = [
    {
      id: '1',
      title: 'Test Recommendation 1',
      description: 'This is a test recommendation',
      imageUrl: 'https://example.com/image1.jpg',
      url: 'https://example.com/1',
      type: 'video' as const,
      score: 0.95,
      category: 'Test Category',
      tags: ['test', 'recommendation'],
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Test Recommendation 2',
      description: 'This is another test recommendation',
      imageUrl: 'https://example.com/image2.jpg',
      url: 'https://example.com/2',
      type: 'article' as const,
      score: 0.85,
      category: 'Test Category',
      tags: ['test', 'recommendation'],
      createdAt: new Date(),
    },
  ];

  it('renders without crashing', () => {
    render(
      <RecommendationCarousel
        recommendations={mockRecommendations}
        title="Test Recommendations"
      />
    );
    
    expect(screen.getByText('Test Recommendations')).toBeInTheDocument();
  });

  it('displays recommendations', () => {
    render(
      <RecommendationCarousel
        recommendations={mockRecommendations}
        title="Test Recommendations"
      />
    );
    
    expect(screen.getByText('Test Recommendation 1')).toBeInTheDocument();
    expect(screen.getByText('Test Recommendation 2')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(
      <RecommendationCarousel
        recommendations={[]}
        title="Test Recommendations"
        loading={true}
      />
    );
    
    // Check for loading indicators
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('displays empty state when no recommendations', () => {
    render(
      <RecommendationCarousel
        recommendations={[]}
        title="Test Recommendations"
      />
    );
    
    expect(screen.getByText('Keine Empfehlungen verfügbar')).toBeInTheDocument();
  });
});