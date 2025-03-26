import React from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
// import { CommentSection } from '@smolitux/community/src/components'; // Temporarily commented out
import { VotingSystem, VoteOption } from './VotingSystem';

export interface ProposalStatus {
  /** Status-Code */
  code: 'draft' | 'active' | 'passed' | 'rejected' | 'implemented';
  /** Anzeigename */
  label: string;
  /** Beschreibung */
  description?: string;
  /** Farbe */
  color: string;
}

export interface ProposalViewProps {
  /** Titel des Vorschlags */
  title: string;
  /** Beschreibung des Vorschlags */
  description: string;
  /** Autor des Vorschlags */
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  /** Erstellungsdatum */
  createdAt: string;
  /** Status des Vorschlags */
  status: ProposalStatus;
  /** Abstimmungsoptionen */
  voteOptions: VoteOption[];
  /** Gesamtstimmenanzahl */
  totalVotes: number;
  /** Ob der Benutzer bereits abgestimmt hat */
  hasVoted?: boolean;
  /** Gewählte Option des Benutzers */
  userVote?: string;
  /** Enddatum der Abstimmung */
  endDate?: string;
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
  /** Callback für Abstimmung */
  onVote?: (optionId: string) => void;
  /** Callback für Kommentar */
  onComment?: (content: string) => void;
  /** Callback für Kommentar-Like */
  onCommentLike?: (commentId: string) => void;
  /** Callback für Kommentar-Antwort */
  onCommentReply?: (commentId: string, content: string) => void;
  /** Callback für Unterstützung des Vorschlags */
  onSupport?: () => void;
  /** Ob der Vorschlag unterstützt wird */
  isSupported?: boolean;
  /** Anzahl der Unterstützer */
  supportCount: number;
  /** Ob der Vorschlag geladen wird */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ProposalView-Komponente für die Anzeige von Community-Vorschlägen.
 */
export const ProposalView: React.FC<ProposalViewProps> = ({
  title,
  description,
  author,
  createdAt,
  status,
  voteOptions,
  totalVotes,
  hasVoted,
  userVote,
  endDate,
  comments = [],
  onVote,
  onComment,
  onCommentLike,
  onCommentReply,
  onSupport,
  isSupported = false,
  supportCount,
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
    });
  };

  // Konvertiere die Kommentare in das Format der CommentSection-Komponente
  const formattedComments = comments.map(comment => ({
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
    replies: comment.replies?.map(reply => ({
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

  const tabs = [
    {
      id: 'details',
      label: 'Details',
      content: (
        <Box style={{ padding: '16px' }}>
          <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{description}</Text>
        </Box>
      ),
    },
    {
      id: 'voting',
      label: 'Voting',
      content: (
        <Box style={{ padding: '16px' }}>
          <VotingSystem
            title="Vote on this proposal"
            options={voteOptions}
            totalVotes={totalVotes}
            hasVoted={hasVoted}
            userVote={userVote}
            onVote={onVote}
            endDate={endDate}
            isActive={status.code === 'active'}
            isLoading={isLoading}
          />
        </Box>
      ),
    },
    {
      id: 'discussion',
      label: 'Discussion',
      content: (
        <Box style={{ padding: '16px' }}>
          <Box style={{ padding: '16px' }}>
            <Text weight="bold" size="lg">Comments</Text>
            <Text size="sm" color="#6b7280">Comments functionality temporarily disabled</Text>
          </Box>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Card
        className={`proposal-view-skeleton ${className}`}
        style={{
          ...style,
        }}
      >
        <Box style={{ padding: '16px' }}>
          <Box
            style={{
              width: '70%',
              height: '24px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <Flex align="center" style={{ marginBottom: '16px' }}>
            <Box
              style={{
                width: '40px',
                height: '40px',
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
            }}
          />
        </Box>
      </Card>
    );
  }

  return (
    <Box
      className={`proposal-view ${className}`}
      style={{
        ...style,
      }}
    >
      <Card style={{ marginBottom: '24px' }}>
        <Box style={{ padding: '16px' }}>
          {/* Header */}
          <Box style={{ marginBottom: '16px' }}>
            <Flex justify="space-between" align="start">
              <Text weight="bold" size="2xl">{title}</Text>
              <Box
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: `${status.color}20`,
                  color: status.color,
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                {status.label}
              </Box>
            </Flex>
            <Flex align="center" style={{ marginTop: '12px' }}>
              <Box 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  marginRight: '8px',
                }}
              >
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </Box>
              <Box>
                <Text weight="medium">{author.name}</Text>
                <Text size="sm" color="#6b7280">Created on {formatDate(createdAt)}</Text>
              </Box>
            </Flex>
          </Box>

          {/* Support Button */}
          <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
            <Button
              variant={isSupported ? 'solid' : 'outline'}
              colorScheme={isSupported ? 'primary' : 'secondary'}
              onClick={onSupport}
              disabled={status.code !== 'draft' || isLoading}
            >
              {isSupported ? 'Supported' : 'Support Proposal'}
            </Button>
            <Text size="sm" color="#6b7280">
              {supportCount} {supportCount === 1 ? 'supporter' : 'supporters'}
            </Text>
          </Flex>
        </Box>

        {/* Tabs */}
        <TabView
          tabs={tabs}
          activeTab="details"
        />
      </Card>
    </Box>
  );
};