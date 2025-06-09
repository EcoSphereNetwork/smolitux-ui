// TODO: forwardRef hinzufügen
import React from 'react';
import { Box, Flex, Text } from '../primitives';
import { Button, Tooltip } from '@smolitux/core';

export interface PostInteractionsProps {
  /** Anzahl der Likes */
  likeCount: number;
  /** Anzahl der Kommentare */
  commentCount: number;
  /** Anzahl der Shares */
  shareCount: number;
  /** Anzahl der Aufrufe */
  viewCount: number;
  /** Ob der Beitrag vom aktuellen Benutzer geliked wurde */
  isLiked?: boolean;
  /** Ob der Beitrag vom aktuellen Benutzer geteilt wurde */
  isShared?: boolean;
  /** Callback für Like */
  onLike?: () => void;
  /** Callback für Kommentar */
  onComment?: () => void;
  /** Callback für Share */
  onShare?: () => void;
  /** Callback für Bookmark */
  onBookmark?: () => void;
  /** Ob der Beitrag gebookmarkt wurde */
  isBookmarked?: boolean;
  /** Zusätzliche Aktionen */
  actions?: React.ReactNode;
  /** Ob die Interaktionen deaktiviert sind */
  disabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * PostInteractions-Komponente für die Anzeige und Steuerung von Beitragsinteraktionen.
 */
export const PostInteractions: React.FC<PostInteractionsProps> = ({
  likeCount,
  commentCount,
  shareCount,
  viewCount,
  isLiked = false,
  isShared = false,
  isBookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
  actions,
  disabled = false,
  className = '',
  style,
}) => {
  return (
    <Box
      className={`post-interactions ${className}`}
      style={{
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 0',
        ...style,
      }}
    >
      {/* Statistiken */}
      <Flex justify="space-between" align="center" style={{ marginBottom: '12px' }}>
        <Flex>
          <Flex align="center" style={{ marginRight: '16px' }}>
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
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text size="sm">{likeCount.toLocaleString()}</Text>
          </Flex>
          <Flex align="center" style={{ marginRight: '16px' }}>
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
            <Text size="sm">{commentCount.toLocaleString()}</Text>
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
                d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text size="sm">{shareCount.toLocaleString()}</Text>
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
          <Text size="sm">{viewCount.toLocaleString()}</Text>
        </Flex>
      </Flex>

      {/* Aktionen */}
      <Flex justify="space-between" align="center">
        <Flex>
          <Tooltip content="Like">
            <Button
              variant={isLiked ? 'solid' : 'ghost'}
              colorScheme={isLiked ? 'primary' : 'secondary'}
              onClick={onLike}
              disabled={disabled}
              style={{ marginRight: '8px' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10h3l-4 8v-6h-3l4-8v6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isLiked ? 'currentColor' : 'none'}
                />
              </svg>
              <Text style={{ marginLeft: '4px' }}>Like</Text>
            </Button>
          </Tooltip>

          <Tooltip content="Comment">
            <Button
              variant="ghost"
              onClick={onComment}
              disabled={disabled}
              style={{ marginRight: '8px' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Text style={{ marginLeft: '4px' }}>Comment</Text>
            </Button>
          </Tooltip>

          <Tooltip content="Share">
            <Button
              variant={isShared ? 'solid' : 'ghost'}
              colorScheme={isShared ? 'primary' : 'secondary'}
              onClick={onShare}
              disabled={disabled}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isShared ? 'currentColor' : 'none'}
                />
              </svg>
              <Text style={{ marginLeft: '4px' }}>Share</Text>
            </Button>
          </Tooltip>
        </Flex>

        <Flex>
          {actions}

          {onBookmark && (
            <Tooltip content={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}>
              <Button variant="ghost" onClick={onBookmark} disabled={disabled}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={isBookmarked ? 'currentColor' : 'none'}
                  />
                </svg>
              </Button>
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
