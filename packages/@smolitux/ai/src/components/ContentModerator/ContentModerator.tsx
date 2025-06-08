import React from 'react';
import { Card, Button } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface ContentModeratorProps {
  /** Zu moderierender Inhalt */
  content: {
    text?: string;
    media?: {
      type: 'image' | 'video' | 'audio';
      url: string;
    }[];
  };
  /** Ergebnis der Moderation */
  result?: {
    /** Gesamtbewertung */
    overallRating: 'safe' | 'questionable' | 'unsafe';
    /** Kategorien */
    categories: {
      name: string;
      rating: 'safe' | 'questionable' | 'unsafe';
      confidence: number;
    }[];
    /** Empfohlene Aktion */
    recommendedAction: 'allow' | 'flag' | 'hide' | 'remove';
  };
  /** Ob die Moderation läuft */
  isModerating?: boolean;
  /** Callback für Moderation */
  onModerate?: () => void;
  /** Callback für Aktion */
  onAction?: (action: 'allow' | 'flag' | 'hide' | 'remove') => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ContentModerator-Komponente für die Moderation von Inhalten.
 * Analysiert verschiedene Inhaltstypen und empfiehlt Aktionen.
 */
export const ContentModerator: React.FC<ContentModeratorProps> = ({
  content,
  result,
  isModerating = false,
  onModerate,
  onAction,
  className = '',
  style,
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'safe':
        return '#10b981';
      case 'questionable':
        return '#f59e0b';
      case 'unsafe':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'safe':
        return 'Safe';
      case 'questionable':
        return 'Questionable';
      case 'unsafe':
        return 'Unsafe';
      default:
        return 'Unknown';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'allow':
        return '#10b981';
      case 'flag':
        return '#f59e0b';
      case 'hide':
        return '#ef4444';
      case 'remove':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'allow':
        return 'Allow Content';
      case 'flag':
        return 'Flag for Review';
      case 'hide':
        return 'Hide Content';
      case 'remove':
        return 'Remove Content';
      default:
        return 'Unknown Action';
    }
  };

  const renderContentPreview = () => {
    return (
      <Box style={{ marginBottom: '16px' }}>
        <Text weight="medium" style={{ marginBottom: '8px' }}>
          Content Preview
        </Text>
        <Box
          style={{
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          {content.text && (
            <Text
              style={{ marginBottom: content.media && content.media.length > 0 ? '12px' : '0' }}
            >
              {content.text}
            </Text>
          )}

          {content.media && content.media.length > 0 && (
            <Flex wrap="wrap" gap="8px">
              {content.media.map((media, index) => {
                if (media.type === 'image') {
                  return (
                    <Box
                      key={index}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={media.url}
                        alt={`Media ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  );
                }

                if (media.type === 'video') {
                  return (
                    <Box
                      key={index}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 3l14 9-14 9V3z"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  );
                }

                if (media.type === 'audio') {
                  return (
                    <Box
                      key={index}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  );
                }

                return null;
              })}
            </Flex>
          )}
        </Box>
      </Box>
    );
  };

  const renderModerationResult = () => {
    if (!result) return null;

    return (
      <Box>
        <Box
          style={{
            padding: '12px',
            backgroundColor: `${getRatingColor(result.overallRating)}20`,
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <Flex justify="space-between" align="center">
            <Text weight="medium">Overall Rating</Text>
            <Text weight="bold" color={getRatingColor(result.overallRating)}>
              {getRatingText(result.overallRating)}
            </Text>
          </Flex>
        </Box>

        <Box style={{ marginBottom: '16px' }}>
          <Text weight="medium" style={{ marginBottom: '8px' }}>
            Content Categories
          </Text>
          {result.categories.map((category, index) => (
            <Box
              key={index}
              style={{
                padding: '8px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              <Flex justify="space-between" align="center">
                <Text>{category.name}</Text>
                <Flex align="center">
                  <Text size="sm" color="#6b7280" style={{ marginRight: '8px' }}>
                    {Math.round(category.confidence * 100)}%
                  </Text>
                  <Box
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: `${getRatingColor(category.rating)}20`,
                      color: getRatingColor(category.rating),
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  >
                    {getRatingText(category.rating)}
                  </Box>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>

        <Box style={{ marginBottom: '16px' }}>
          <Text weight="medium" style={{ marginBottom: '8px' }}>
            Recommended Action
          </Text>
          <Box
            style={{
              padding: '12px',
              backgroundColor: `${getActionColor(result.recommendedAction)}20`,
              borderRadius: '8px',
              color: getActionColor(result.recommendedAction),
              fontWeight: 500,
              marginBottom: '16px',
            }}
          >
            {getActionText(result.recommendedAction)}
          </Box>
        </Box>

        <Flex justify="space-between" wrap="wrap" gap="8px">
          <Button
            variant="outline"
            colorScheme="success"
            onClick={() => onAction && onAction('allow')}
            style={{ flex: '1 0 auto' }}
          >
            Allow
          </Button>
          <Button
            variant="outline"
            colorScheme="warning"
            onClick={() => onAction && onAction('flag')}
            style={{ flex: '1 0 auto' }}
          >
            Flag
          </Button>
          <Button
            variant="outline"
            colorScheme="danger"
            onClick={() => onAction && onAction('hide')}
            style={{ flex: '1 0 auto' }}
          >
            Hide
          </Button>
          <Button
            variant="outline"
            colorScheme="danger"
            onClick={() => onAction && onAction('remove')}
            style={{ flex: '1 0 auto' }}
          >
            Remove
          </Button>
        </Flex>
      </Box>
    );
  };

  const renderModerateButton = () => {
    if (result) return null;

    return (
      <Button
        onClick={onModerate}
        loading={isModerating}
        disabled={isModerating || (!content.text && (!content.media || content.media.length === 0))}
        fullWidth
      >
        {isModerating ? 'Moderating...' : 'Moderate Content'}
      </Button>
    );
  };

  return (
    <Card
      className={`content-moderator ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Text weight="bold" size="lg" style={{ marginBottom: '16px' }}>
          Content Moderation
        </Text>

        {renderContentPreview()}

        {isModerating && !result && (
          <Box
            style={{
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <svg
              className="animate-spin"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 auto 16px' }}
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
            <Text>Moderating content...</Text>
            <Text size="sm" color="#6b7280" style={{ marginTop: '8px' }}>
              This may take a few moments
            </Text>
          </Box>
        )}

        {renderModerationResult()}
        {renderModerateButton()}
      </Box>
    </Card>
  );
};
