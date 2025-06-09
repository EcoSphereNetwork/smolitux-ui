// TODO: forwardRef hinzufügen
import React from 'react';
import { Box, Flex, Text } from '../primitives';
import { Card, Button } from '@smolitux/core';
import { TrendingTopics } from '@smolitux/ai';

export interface TrendingTopic {
  id: string;
  name: string;
  description?: string;
  category?: string;
  mentionCount: number;
  change?: number;
  isNew?: boolean;
}

export interface SuggestedUser {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followerCount?: number;
}

export interface FeedSidebarProps {
  /** Trending-Themen */
  trendingTopics?: TrendingTopic[];
  /** Vorgeschlagene Benutzer */
  suggestedUsers?: SuggestedUser[];
  /** Callback für Aktualisierung der Trending-Themen */
  onRefreshTrending?: () => void;
  /** Callback für Folgen eines Benutzers */
  onFollowUser?: (userId: string) => void;
  /** Callback für Klick auf ein Trending-Thema */
  onTopicClick?: (topicId: string) => void;
  /** Callback für Klick auf einen vorgeschlagenen Benutzer */
  onUserClick?: (userId: string) => void;
  /** Ob Trending-Themen geladen werden */
  isLoadingTrending?: boolean;
  /** Ob vorgeschlagene Benutzer geladen werden */
  isLoadingUsers?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * FeedSidebar-Komponente für die Anzeige von Trending-Themen und vorgeschlagenen Benutzern.
 */
export const FeedSidebar: React.FC<FeedSidebarProps> = ({
  trendingTopics = [],
  suggestedUsers = [],
  onRefreshTrending,
  onFollowUser,
  onTopicClick,
  onUserClick,
  isLoadingTrending = false,
  isLoadingUsers = false,
  className = '',
  style,
}) => {
  // Konvertiere die Trending-Themen in das Format der TrendingTopics-Komponente
  const formattedTopics = trendingTopics.map((topic) => ({
    id: topic.id,
    name: topic.name,
    description: topic.description || '',
    category: topic.category || 'General',
    mentionCount: topic.mentionCount,
    change: topic.change || 0,
    isNew: topic.isNew || false,
  }));

  return (
    <Box
      className={`feed-sidebar ${className}`}
      style={{
        width: '300px',
        ...style,
      }}
    >
      {/* Trending-Themen */}
      <Box style={{ marginBottom: '24px' }}>
        <TrendingTopics
          title="Trending Topics"
          description="What's popular right now"
          topics={formattedTopics}
          onRefresh={onRefreshTrending}
          loading={isLoadingTrending}
          onTopicClick={onTopicClick}
        />
      </Box>

      {/* Vorgeschlagene Benutzer */}
      <Card style={{ marginBottom: '24px' }}>
        <Box style={{ padding: '16px' }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
            <Text weight="bold" size="lg">
              Suggested Users
            </Text>
            {isLoadingUsers ? (
              <Box style={{ width: '20px', height: '20px' }}>
                <svg
                  className="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </Box>
            ) : null}
          </Flex>

          {suggestedUsers.length === 0 ? (
            <Text color="#6b7280">No suggestions available</Text>
          ) : (
            <Box>
              {suggestedUsers.map((user) => (
                <Flex
                  key={user.id}
                  align="center"
                  justify="space-between"
                  style={{
                    marginBottom: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="hover:bg-gray-100"
                  onClick={() => onUserClick && onUserClick(user.id)}
                >
                  <Flex align="center">
                    <Box
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginRight: '12px',
                      }}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Text weight="bold">{user.name}</Text>
                      {user.followerCount !== undefined && (
                        <Text size="sm" color="#6b7280">
                          {user.followerCount.toLocaleString()} followers
                        </Text>
                      )}
                    </Box>
                  </Flex>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onFollowUser) onFollowUser(user.id);
                    }}
                  >
                    Follow
                  </Button>
                </Flex>
              ))}
            </Box>
          )}
        </Box>
      </Card>

      {/* Footer */}
      <Box>
        <Text size="sm" color="#6b7280">
          © 2023 ResonanceLink •{' '}
          <a href="#" style={{ color: 'inherit' }}>
            Privacy
          </a>{' '}
          •{' '}
          <a href="#" style={{ color: 'inherit' }}>
            Terms
          </a>
        </Text>
      </Box>
    </Box>
  );
};
