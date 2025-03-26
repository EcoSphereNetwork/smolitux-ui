import React from 'react';
import { Card } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
import { MediaPlayer } from '@smolitux/core';

export interface FeedItemData {
  /** Eindeutige ID */
  id: string;
  /** Autor */
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  /** Erstellungsdatum */
  createdAt: string;
  /** Inhaltstyp (text, image, video, audio) */
  contentType: 'text' | 'image' | 'video' | 'audio' | 'mixed';
  /** Inhalt */
  content: {
    text?: string;
    media?: {
      type: 'image' | 'video' | 'audio';
      url: string;
      thumbnail?: string;
    }[];
  };
  /** Interaktionsstatistiken */
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  /** Monetarisierungsinformationen */
  monetization?: {
    enabled: boolean;
    earnings: number;
    currency: string;
  };
  /** Ob der Beitrag vom aktuellen Benutzer geliked wurde */
  isLiked?: boolean;
  /** Ob der Beitrag vom aktuellen Benutzer geteilt wurde */
  isShared?: boolean;
}

export interface FeedItemProps {
  /** Beitragsdaten */
  item: FeedItemData;
  /** Callback für Like */
  onLike?: (id: string) => void;
  /** Callback für Kommentar */
  onComment?: (id: string) => void;
  /** Callback für Share */
  onShare?: (id: string) => void;
  /** Callback für Klick auf den Beitrag */
  onClick?: (id: string) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * FeedItem-Komponente für die Anzeige eines einzelnen Beitrags im Feed.
 * Unterstützt verschiedene Inhaltstypen und Interaktionen.
 */
export const FeedItem: React.FC<FeedItemProps> = ({
  item,
  onLike,
  onComment,
  onShare,
  onClick,
  className = '',
  style,
}) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) onLike(item.id);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComment) onComment(item.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(item.id);
  };

  const handleClick = () => {
    if (onClick) onClick(item.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderMedia = () => {
    if (!item.content.media || item.content.media.length === 0) return null;

    return (
      <Box className="feed-item-media" style={{ marginTop: '12px' }}>
        {item.content.media.map((media, index) => {
          if (media.type === 'image') {
            return (
              <Box 
                key={index} 
                style={{ 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  maxHeight: '400px',
                }}
              >
                <img 
                  src={media.url} 
                  alt={`Media content ${index + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'cover',
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
                  marginBottom: '12px',
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
    if (!item.monetization || !item.monetization.enabled) return null;

    return (
      <Box 
        className="feed-item-monetization" 
        style={{ 
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text 
          size="sm" 
          color="#3b82f6"
          style={{ fontWeight: 500 }}
        >
          {`${item.monetization.earnings} ${item.monetization.currency}`} earned
        </Text>
      </Box>
    );
  };

  return (
    <Card
      className={`feed-item ${className}`}
      style={{
        marginBottom: '16px',
        cursor: 'pointer',
        ...style,
      }}
      onClick={handleClick}
      hoverable
    >
      <Box style={{ padding: '16px' }}>
        {/* Author info */}
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
              src={item.author.avatar} 
              alt={item.author.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </Box>
          <Box>
            <Text weight="bold">{item.author.name}</Text>
            <Text size="sm" color="#6b7280">{formatDate(item.createdAt)}</Text>
          </Box>
        </Flex>

        {/* Content */}
        <Box style={{ marginTop: '12px' }}>
          {item.content.text && (
            <Text style={{ whiteSpace: 'pre-wrap' }}>{item.content.text}</Text>
          )}
          {renderMedia()}
        </Box>

        {/* Monetization */}
        {renderMonetization()}

        {/* Interaction stats */}
        <Flex 
          justify="space-between" 
          align="center" 
          style={{ 
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <Flex>
            <Flex 
              align="center" 
              style={{ 
                marginRight: '16px',
                color: item.isLiked ? '#3b82f6' : 'inherit',
                fontWeight: item.isLiked ? 500 : 400,
              }}
              onClick={handleLike}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path 
                  d="M14 10h3l-4 8v-6h-3l4-8v6z" 
                  stroke={item.isLiked ? "#3b82f6" : "currentColor"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill={item.isLiked ? "#3b82f6" : "none"}
                />
              </svg>
              <Text size="sm">{item.stats.likes}</Text>
            </Flex>
            <Flex 
              align="center" 
              style={{ marginRight: '16px' }}
              onClick={handleComment}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path 
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <Text size="sm">{item.stats.comments}</Text>
            </Flex>
            <Flex 
              align="center" 
              style={{ 
                color: item.isShared ? '#3b82f6' : 'inherit',
                fontWeight: item.isShared ? 500 : 400,
              }}
              onClick={handleShare}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path 
                  d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" 
                  stroke={item.isShared ? "#3b82f6" : "currentColor"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <Text size="sm">{item.stats.shares}</Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '4px' }}
            >
              <path 
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <Text size="sm">{item.stats.views}</Text>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};