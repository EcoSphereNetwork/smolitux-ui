import React from 'react';
import { Card, Button } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
import { MediaPlayer } from '@smolitux/core';
// import { CommentSection } from '@smolitux/community/src/components'; // Temporarily commented out
import { PostInteractions } from './PostInteractions';
import { PostMetrics } from './PostMetrics';
import { FeedItemData } from '../feed/FeedItem';

export interface PostViewProps {
  /** Beitragsdaten */
  post: FeedItemData;
  /** Kommentare */
  comments?: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    isLiked?: boolean;
    replies?: {
      id: string;
      author: {
        id: string;
        name: string;
        avatar: string;
      };
      content: string;
      createdAt: string;
      likes: number;
      isLiked?: boolean;
    }[];
  }[];
  /** Metriken */
  metrics?: {
    score: number;
    benchmarkScore?: number;
    metrics: {
      name: string;
      value: number;
      change?: number;
      benchmark?: number;
      higherIsBetter?: boolean;
    }[];
  };
  /** Callback für Like */
  onLike?: () => void;
  /** Callback für Kommentar */
  onComment?: (content: string) => void;
  /** Callback für Share */
  onShare?: () => void;
  /** Callback für Bookmark */
  onBookmark?: () => void;
  /** Callback für Kommentar-Like */
  onCommentLike?: (commentId: string) => void;
  /** Callback für Kommentar-Antwort */
  onCommentReply?: (commentId: string, content: string) => void;
  /** Callback für Löschen des Beitrags */
  onDelete?: () => void;
  /** Callback für Bearbeiten des Beitrags */
  onEdit?: () => void;
  /** Callback für Melden des Beitrags */
  onReport?: () => void;
  /** Ob der Beitrag vom aktuellen Benutzer erstellt wurde */
  isOwnPost?: boolean;
  /** Ob die Metriken angezeigt werden sollen */
  showMetrics?: boolean;
  /** Ob die Kommentare angezeigt werden sollen */
  showComments?: boolean;
  /** Ob der Beitrag geladen wird */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * PostView-Komponente für die Detailansicht eines Beitrags.
 */
export const PostView: React.FC<PostViewProps> = ({
  post,
  comments = [],
  metrics,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onCommentLike,
  onCommentReply,
  onDelete,
  onEdit,
  onReport,
  isOwnPost = false,
  showMetrics = true,
  showComments = true,
  isLoading = false,
  className = '',
  style,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMedia = () => {
    if (!post.content.media || post.content.media.length === 0) return null;

    return (
      <Box className="post-media" style={{ marginTop: '16px' }}>
        {post.content.media.map((media, index) => {
          if (media.type === 'image') {
            return (
              <Box
                key={index}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <img
                  src={media.url}
                  alt={`Media content ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '600px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            );
          } else if (media.type === 'video' || media.type === 'audio') {
            return (
              <Box
                key={index}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <MediaPlayer
                  url={media.url}
                  type={media.type}
                  thumbnail={media.thumbnail}
                  controls
                />
              </Box>
            );
          }
          return null;
        })}
      </Box>
    );
  };

  const renderMonetization = () => {
    if (!post.monetization || !post.monetization.enabled) return null;

    return (
      <Box
        className="post-monetization"
        style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
        }}
      >
        <Flex justify="space-between" align="center">
          <Text weight="medium" color="#3b82f6">
            Monetized Content
          </Text>
          <Text weight="bold" color="#3b82f6">
            {post.monetization.earnings} {post.monetization.currency}
          </Text>
        </Flex>
        <Text size="sm" color="#6b7280" style={{ marginTop: '4px' }}>
          This content is monetized. Creator earns 30% of revenue, platform 30%, and community 30%.
        </Text>
      </Box>
    );
  };

  const renderActions = () => {
    if (!isOwnPost && !onReport) return null;

    return (
      <Box style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // Dropdown-Menü anzeigen
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {/* Dropdown-Menü hier implementieren */}
      </Box>
    );
  };

  // Konvertiere die Kommentare in das Format der CommentSection-Komponente
  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    author: {
      id: comment.author.id,
      name: comment.author.name,
      avatar: comment.author.avatar,
    },
    content: comment.content,
    createdAt: comment.createdAt,
    likes: comment.likes,
    isLiked: comment.isLiked,
    replies: comment.replies?.map((reply) => ({
      id: reply.id,
      author: {
        id: reply.author.id,
        name: reply.author.name,
        avatar: reply.author.avatar,
      },
      content: reply.content,
      createdAt: reply.createdAt,
      likes: reply.likes,
      isLiked: reply.isLiked,
    })),
  }));

  if (isLoading) {
    return (
      <Card
        className={`post-view-skeleton ${className}`}
        style={{
          ...style,
        }}
      >
        <Box style={{ padding: '16px' }}>
          <Flex align="center" style={{ marginBottom: '16px' }}>
            <Box
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#e5e7eb',
                marginRight: '12px',
              }}
            />
            <Box>
              <Box
                style={{
                  width: '120px',
                  height: '16px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              />
              <Box
                style={{
                  width: '80px',
                  height: '12px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                }}
              />
            </Box>
          </Flex>
          <Box
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              marginBottom: '16px',
            }}
          />
          <Box
            style={{
              width: '100%',
              height: '16px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          />
          <Box
            style={{
              width: '80%',
              height: '16px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
            }}
          />
        </Box>
      </Card>
    );
  }

  return (
    <Box
      className={`post-view ${className}`}
      style={{
        ...style,
      }}
    >
      <Card style={{ position: 'relative', marginBottom: '24px' }}>
        <Box style={{ padding: '16px' }}>
          {/* Author info */}
          <Flex align="center">
            <Box
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '12px',
              }}
            >
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box>
              <Text weight="bold" size="lg">
                {post.author.name}
              </Text>
              <Text size="sm" color="#6b7280">
                {formatDate(post.createdAt)}
              </Text>
            </Box>
          </Flex>

          {/* Content */}
          <Box style={{ marginTop: '16px' }}>
            {post.content.text && (
              <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{post.content.text}</Text>
            )}
            {renderMedia()}
          </Box>

          {/* Monetization */}
          {renderMonetization()}

          {/* Actions */}
          {renderActions()}
        </Box>

        {/* Interactions */}
        <PostInteractions
          likeCount={post.stats.likes}
          commentCount={post.stats.comments}
          shareCount={post.stats.shares}
          viewCount={post.stats.views}
          isLiked={post.isLiked}
          isShared={post.isShared}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onBookmark={onBookmark}
        />
      </Card>

      {/* Metrics */}
      {showMetrics && metrics && (
        <Box style={{ marginBottom: '24px' }}>
          <PostMetrics
            score={metrics.score}
            benchmarkScore={metrics.benchmarkScore}
            metrics={metrics.metrics}
          />
        </Box>
      )}

      {/* Comments */}
      {showComments && (
        <Card>
          <Box style={{ padding: '16px' }}>
            <Text weight="bold" size="lg">
              Comments
            </Text>
            <Text size="sm" color="#6b7280">
              Comments functionality temporarily disabled
            </Text>
          </Box>
        </Card>
      )}
    </Box>
  );
};
