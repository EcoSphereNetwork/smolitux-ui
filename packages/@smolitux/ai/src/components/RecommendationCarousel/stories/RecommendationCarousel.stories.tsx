import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RecommendationCarousel } from '../RecommendationCarousel';

const meta: Meta<typeof RecommendationCarousel> = {
  title: 'AI/RecommendationCarousel',
  component: RecommendationCarousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    visibleItems: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Anzahl der sichtbaren Elemente',
    },
    loading: {
      control: 'boolean',
      description: 'Ist die Komponente im Ladezustand?',
    },
    autoScroll: {
      control: 'boolean',
      description: 'Automatisches Scrollen aktivieren',
    },
    autoScrollInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervall für automatisches Scrollen (in ms)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecommendationCarousel>;

// Mock-Daten für die Empfehlungen
const mockRecommendationGroups = [
  {
    id: 'trending',
    title: 'Trending',
    description: 'Beliebte Inhalte, die gerade im Trend liegen',
    items: [
      {
        id: '1',
        title: 'Einführung in React',
        description: 'Eine Einführung in die React-Bibliothek für Anfänger',
        url: 'https://example.com/react-intro',
        thumbnailUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=React+Intro',
        type: 'video',
        creator: {
          id: 'user1',
          name: 'Max Mustermann',
          avatarUrl: 'https://placehold.co/100/3b82f6/ffffff?text=MM',
        },
        relevance: 0.95,
        reason: 'Basierend auf deinen Interessen an Webentwicklung',
      },
      {
        id: '2',
        title: 'Advanced CSS Techniques',
        description: 'Fortgeschrittene CSS-Techniken für moderne Webseiten',
        url: 'https://example.com/advanced-css',
        thumbnailUrl: 'https://placehold.co/600x400/10b981/ffffff?text=CSS+Techniques',
        type: 'article',
        creator: {
          id: 'user2',
          name: 'Anna Schmidt',
          avatarUrl: 'https://placehold.co/100/10b981/ffffff?text=AS',
        },
        relevance: 0.85,
        reason: 'Ähnlich zu Inhalten, die du kürzlich angesehen hast',
      },
      {
        id: '3',
        title: 'JavaScript Performance Optimization',
        description: 'Wie du deine JavaScript-Anwendungen optimieren kannst',
        url: 'https://example.com/js-performance',
        thumbnailUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=JS+Performance',
        type: 'video',
        creator: {
          id: 'user3',
          name: 'Tim Weber',
          avatarUrl: 'https://placehold.co/100/f59e0b/ffffff?text=TW',
        },
        relevance: 0.80,
        reason: 'Basierend auf deinen Interessen an JavaScript',
      },
      {
        id: '4',
        title: 'Building a REST API with Node.js',
        description: 'Schritt-für-Schritt-Anleitung zum Erstellen einer REST API',
        url: 'https://example.com/node-rest-api',
        thumbnailUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Node.js+API',
        type: 'article',
        creator: {
          id: 'user4',
          name: 'Laura Müller',
          avatarUrl: 'https://placehold.co/100/ef4444/ffffff?text=LM',
        },
        relevance: 0.75,
        reason: 'Ähnlich zu Inhalten, die du geliked hast',
      },
      {
        id: '5',
        title: 'TypeScript für React-Entwickler',
        description: 'Wie du TypeScript in deinen React-Projekten einsetzen kannst',
        url: 'https://example.com/typescript-react',
        thumbnailUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=TypeScript+React',
        type: 'video',
        creator: {
          id: 'user5',
          name: 'Felix Bauer',
          avatarUrl: 'https://placehold.co/100/8b5cf6/ffffff?text=FB',
        },
        relevance: 0.70,
        reason: 'Basierend auf deinen Interessen an TypeScript',
      },
      {
        id: '6',
        title: 'Responsive Design Best Practices',
        description: 'Best Practices für responsives Webdesign',
        url: 'https://example.com/responsive-design',
        thumbnailUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Responsive+Design',
        type: 'article',
        creator: {
          id: 'user6',
          name: 'Sophie Klein',
          avatarUrl: 'https://placehold.co/100/ec4899/ffffff?text=SK',
        },
        relevance: 0.65,
        reason: 'Ähnlich zu Inhalten, die du kürzlich angesehen hast',
      },
    ],
  },
  {
    id: 'forYou',
    title: 'Für dich',
    description: 'Personalisierte Empfehlungen basierend auf deinen Interessen',
    items: [
      {
        id: '7',
        title: 'Vue.js vs. React: Ein Vergleich',
        description: 'Ein detaillierter Vergleich zwischen Vue.js und React',
        url: 'https://example.com/vue-vs-react',
        thumbnailUrl: 'https://placehold.co/600x400/06b6d4/ffffff?text=Vue+vs+React',
        type: 'article',
        creator: {
          id: 'user7',
          name: 'David Fischer',
          avatarUrl: 'https://placehold.co/100/06b6d4/ffffff?text=DF',
        },
        relevance: 0.90,
        reason: 'Basierend auf deinen Interessen an Frontend-Frameworks',
      },
      {
        id: '8',
        title: 'GraphQL für Anfänger',
        description: 'Eine Einführung in GraphQL für Anfänger',
        url: 'https://example.com/graphql-intro',
        thumbnailUrl: 'https://placehold.co/600x400/f97316/ffffff?text=GraphQL',
        type: 'video',
        creator: {
          id: 'user8',
          name: 'Julia Wagner',
          avatarUrl: 'https://placehold.co/100/f97316/ffffff?text=JW',
        },
        relevance: 0.85,
        reason: 'Ähnlich zu Inhalten, die du geliked hast',
      },
      {
        id: '9',
        title: 'Docker für Entwickler',
        description: 'Wie du Docker in deinem Entwicklungsworkflow einsetzen kannst',
        url: 'https://example.com/docker-dev',
        thumbnailUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Docker',
        type: 'article',
        creator: {
          id: 'user9',
          name: 'Markus Schneider',
          avatarUrl: 'https://placehold.co/100/3b82f6/ffffff?text=MS',
        },
        relevance: 0.80,
        reason: 'Basierend auf deinen Interessen an DevOps',
      },
      {
        id: '10',
        title: 'Einführung in Next.js',
        description: 'Eine Einführung in das Next.js-Framework',
        url: 'https://example.com/nextjs-intro',
        thumbnailUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Next.js',
        type: 'video',
        creator: {
          id: 'user10',
          name: 'Nina Hoffmann',
          avatarUrl: 'https://placehold.co/100/10b981/ffffff?text=NH',
        },
        relevance: 0.75,
        reason: 'Ähnlich zu Inhalten, die du kürzlich angesehen hast',
      },
    ],
  },
];

export const Default: Story = {
  args: {
    groups: mockRecommendationGroups,
    visibleItems: 4,
    loading: false,
    autoScroll: false,
    autoScrollInterval: 5000,
  },
};

export const Loading: Story = {
  args: {
    groups: mockRecommendationGroups,
    visibleItems: 4,
    loading: true,
    autoScroll: false,
  },
};

export const AutoScroll: Story = {
  args: {
    groups: mockRecommendationGroups,
    visibleItems: 4,
    loading: false,
    autoScroll: true,
    autoScrollInterval: 3000,
  },
};

export const FewerItems: Story = {
  args: {
    groups: mockRecommendationGroups,
    visibleItems: 3,
    loading: false,
    autoScroll: false,
  },
};

export const MoreItems: Story = {
  args: {
    groups: mockRecommendationGroups,
    visibleItems: 5,
    loading: false,
    autoScroll: false,
  },
};

export const EmptyState: Story = {
  args: {
    groups: [
      {
        id: 'empty',
        title: 'Keine Empfehlungen',
        description: 'Es sind keine Empfehlungen verfügbar',
        items: [],
      },
    ],
    visibleItems: 4,
    loading: false,
    autoScroll: false,
  },
};