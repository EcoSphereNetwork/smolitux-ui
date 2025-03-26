import React, { useState } from 'react';
import { Card, Button, ProgressBar } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface VoteOption {
  /** Eindeutige ID */
  id: string;
  /** Anzeigename */
  label: string;
  /** Aktuelle Stimmenanzahl */
  votes: number;
  /** Prozentsatz der Stimmen */
  percentage: number;
}

export interface VotingSystemProps {
  /** Titel der Abstimmung */
  title: string;
  /** Beschreibung der Abstimmung */
  description?: string;
  /** Abstimmungsoptionen */
  options: VoteOption[];
  /** Gesamtstimmenanzahl */
  totalVotes: number;
  /** Ob der Benutzer bereits abgestimmt hat */
  hasVoted?: boolean;
  /** Gewählte Option des Benutzers */
  userVote?: string;
  /** Callback für Abstimmung */
  onVote?: (optionId: string) => void;
  /** Enddatum der Abstimmung */
  endDate?: string;
  /** Ob die Abstimmung aktiv ist */
  isActive?: boolean;
  /** Ob die Abstimmung geladen wird */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * VotingSystem-Komponente für Community-Abstimmungen.
 * Zeigt Abstimmungsoptionen und Ergebnisse an.
 */
export const VotingSystem: React.FC<VotingSystemProps> = ({
  title,
  description,
  options,
  totalVotes,
  hasVoted = false,
  userVote,
  onVote,
  endDate,
  isActive = true,
  isLoading = false,
  className = '',
  style,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(userVote || null);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(selectedOption);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getTimeRemaining = (endDateString?: string) => {
    if (!endDateString) return '';
    
    const endDate = new Date(endDateString);
    const now = new Date();
    
    if (now > endDate) return 'Ended';
    
    const diffMs = endDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`;
    } else {
      return `${diffMinutes}m remaining`;
    }
  };

  const isEnded = endDate ? new Date() > new Date(endDate) : false;
  const canVote = isActive && !hasVoted && !isEnded && !isLoading;

  return (
    <Card
      className={`voting-system ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        {/* Header */}
        <Box style={{ marginBottom: '16px' }}>
          <Text weight="bold" size="xl">{title}</Text>
          {description && (
            <Text style={{ marginTop: '8px' }}>{description}</Text>
          )}
          <Flex justify="space-between" align="center" style={{ marginTop: '12px' }}>
            <Text size="sm" color="#6b7280">
              {formatNumber(totalVotes)} votes
            </Text>
            {endDate && (
              <Text size="sm" color={isEnded ? '#ef4444' : '#6b7280'}>
                {getTimeRemaining(endDate)}
              </Text>
            )}
          </Flex>
        </Box>

        {/* Options */}
        <Box style={{ marginBottom: '16px' }}>
          {options.map((option) => (
            <Box
              key={option.id}
              style={{
                marginBottom: '12px',
                cursor: canVote ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (canVote) {
                  setSelectedOption(option.id);
                }
              }}
            >
              <Flex justify="space-between" align="center" style={{ marginBottom: '4px' }}>
                <Flex align="center">
                  {canVote ? (
                    <Box
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${selectedOption === option.id ? '#3b82f6' : '#d1d5db'}`,
                        marginRight: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selectedOption === option.id && (
                        <Box
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#3b82f6',
                          }}
                        />
                      )}
                    </Box>
                  ) : (
                    userVote === option.id && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: '8px' }}
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )
                  )}
                  <Text weight={userVote === option.id ? 'bold' : 'normal'}>
                    {option.label}
                  </Text>
                </Flex>
                <Text weight="medium">
                  {formatPercentage(option.percentage)}
                </Text>
              </Flex>
              <ProgressBar
                value={option.percentage}
                max={100}
                colorScheme={userVote === option.id ? 'primary' : 'secondary'}
                size="sm"
                style={{ marginBottom: '4px' }}
              />
              <Text size="sm" color="#6b7280" style={{ textAlign: 'right' }}>
                {formatNumber(option.votes)} votes
              </Text>
            </Box>
          ))}
        </Box>

        {/* Actions */}
        {canVote ? (
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isLoading}
            loading={isLoading}
            fullWidth
          >
            Vote
          </Button>
        ) : hasVoted ? (
          <Box
            style={{
              padding: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Text color="#3b82f6">
              You have already voted
              {userVote && ` for "${options.find(o => o.id === userVote)?.label}"`}
            </Text>
          </Box>
        ) : isEnded ? (
          <Box
            style={{
              padding: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Text color="#ef4444">
              This vote has ended
            </Text>
          </Box>
        ) : null}
      </Box>
    </Card>
  );
};