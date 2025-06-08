import React, { useState } from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
import { ProposalStatus } from './ProposalView';

export interface ProposalSummary {
  /** Eindeutige ID */
  id: string;
  /** Titel */
  title: string;
  /** Kurzbeschreibung */
  summary: string;
  /** Autor */
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  /** Erstellungsdatum */
  createdAt: string;
  /** Status */
  status: ProposalStatus;
  /** Anzahl der Unterstützer */
  supportCount: number;
  /** Anzahl der Stimmen */
  voteCount: number;
  /** Anzahl der Kommentare */
  commentCount: number;
  /** Enddatum der Abstimmung */
  endDate?: string;
}

export interface GovernanceStats {
  /** Anzahl der aktiven Vorschläge */
  activeProposals: number;
  /** Anzahl der implementierten Vorschläge */
  implementedProposals: number;
  /** Anzahl der abgelehnten Vorschläge */
  rejectedProposals: number;
  /** Anzahl der Abstimmungen */
  totalVotes: number;
  /** Anzahl der Teilnehmer */
  totalParticipants: number;
  /** Durchschnittliche Beteiligung (in Prozent) */
  averageParticipation: number;
}

export interface GovernanceDashboardProps {
  /** Vorschläge */
  proposals: ProposalSummary[];
  /** Statistiken */
  stats: GovernanceStats;
  /** Callback für Klick auf einen Vorschlag */
  onProposalClick?: (proposalId: string) => void;
  /** Callback für Erstellung eines neuen Vorschlags */
  onCreateProposal?: () => void;
  /** Callback für Filterung der Vorschläge */
  onFilterChange?: (filter: string) => void;
  /** Aktiver Filter */
  activeFilter?: string;
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * GovernanceDashboard-Komponente für die Übersicht über Community-Governance.
 */
export const GovernanceDashboard: React.FC<GovernanceDashboardProps> = ({
  proposals,
  stats,
  onProposalClick,
  onCreateProposal,
  onFilterChange,
  activeFilter = 'all',
  isLoading = false,
  className = '',
  style,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeRemaining = (endDateString?: string) => {
    if (!endDateString) return '';

    const endDate = new Date(endDateString);
    const now = new Date();

    if (now > endDate) return 'Ended';

    const diffMs = endDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else {
      return `${diffHours}h remaining`;
    }
  };

  const filters = [
    { id: 'all', label: 'All Proposals' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Drafts' },
    { id: 'passed', label: 'Passed' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'implemented', label: 'Implemented' },
  ];

  // Filtere die Vorschläge basierend auf dem aktiven Filter
  const filteredProposals =
    activeFilter === 'all'
      ? proposals
      : proposals.filter((proposal) => proposal.status.code === activeFilter);

  const renderProposalCard = (proposal: ProposalSummary) => (
    <Card
      key={proposal.id}
      className="proposal-card"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      hoverable
      onClick={() => onProposalClick && onProposalClick(proposal.id)}
    >
      <Box style={{ padding: '16px' }}>
        <Flex justify="space-between" align="start" style={{ marginBottom: '12px' }}>
          <Text weight="bold" size="lg" style={{ flex: 1 }}>
            {proposal.title}
          </Text>
          <Box
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: `${proposal.status.color}20`,
              color: proposal.status.color,
              fontWeight: 500,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              marginLeft: '8px',
            }}
          >
            {proposal.status.label}
          </Box>
        </Flex>

        <Text
          style={{
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {proposal.summary}
        </Text>

        <Flex align="center" style={{ marginBottom: '12px' }}>
          <Box
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '8px',
            }}
          >
            <img
              src={proposal.author.avatar}
              alt={proposal.author.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Text size="sm" color="#6b7280">
            by {proposal.author.name} on {formatDate(proposal.createdAt)}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Flex>
            <Flex align="center" style={{ marginRight: '12px' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path
                  d="M7 11v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8M7 11a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1M7 11V7a5 5 0 0 1 10 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Text size="xs" color="#6b7280">
                {proposal.supportCount}
              </Text>
            </Flex>
            <Flex align="center" style={{ marginRight: '12px' }}>
              <svg
                width="16"
                height="16"
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
              <Text size="xs" color="#6b7280">
                {proposal.voteCount}
              </Text>
            </Flex>
            <Flex align="center">
              <svg
                width="16"
                height="16"
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
              <Text size="xs" color="#6b7280">
                {proposal.commentCount}
              </Text>
            </Flex>
          </Flex>

          {proposal.endDate && proposal.status.code === 'active' && (
            <Text size="xs" color="#6b7280">
              {getTimeRemaining(proposal.endDate)}
            </Text>
          )}
        </Flex>
      </Box>
    </Card>
  );

  return (
    <Box
      className={`governance-dashboard ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
        <Box>
          <Text weight="bold" size="2xl">
            Governance Dashboard
          </Text>
          <Text color="#6b7280">Community proposals and voting</Text>
        </Box>
        <Button onClick={onCreateProposal}>Create Proposal</Button>
      </Flex>

      {/* Stats */}
      <Grid columns={3} gap={16} style={{ marginBottom: '24px' }}>
        <Card>
          <Box style={{ padding: '16px', textAlign: 'center' }}>
            <Text weight="bold" size="3xl" color="#3b82f6">
              {stats.activeProposals}
            </Text>
            <Text>Active Proposals</Text>
          </Box>
        </Card>
        <Card>
          <Box style={{ padding: '16px', textAlign: 'center' }}>
            <Text weight="bold" size="3xl" color="#10b981">
              {stats.implementedProposals}
            </Text>
            <Text>Implemented</Text>
          </Box>
        </Card>
        <Card>
          <Box style={{ padding: '16px', textAlign: 'center' }}>
            <Text weight="bold" size="3xl" color="#6b7280">
              {stats.totalParticipants.toLocaleString()}
            </Text>
            <Text>Participants</Text>
          </Box>
        </Card>
      </Grid>

      {/* Filters */}
      <Box style={{ marginBottom: '24px' }}>
        <Flex style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          {filters.map((filter) => (
            <Box
              key={filter.id}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: activeFilter === filter.id ? '#3b82f6' : 'transparent',
                color: activeFilter === filter.id ? 'white' : 'inherit',
                fontWeight: activeFilter === filter.id ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginRight: '8px',
              }}
              onClick={() => onFilterChange && onFilterChange(filter.id)}
            >
              {filter.label}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Proposals */}
      {isLoading ? (
        <Grid columns={1} gap={16} style={{ marginBottom: '24px' }}>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Box style={{ padding: '16px' }}>
                <Box
                  style={{
                    width: '70%',
                    height: '24px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                />
                <Box
                  style={{
                    width: '100%',
                    height: '32px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                />
                <Flex align="center" style={{ marginBottom: '12px' }}>
                  <Box
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#e5e7eb',
                      marginRight: '8px',
                    }}
                  />
                  <Box
                    style={{
                      width: '120px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Flex>
              </Box>
            </Card>
          ))}
        </Grid>
      ) : filteredProposals.length === 0 ? (
        <Card>
          <Box style={{ padding: '32px 16px', textAlign: 'center' }}>
            <Text color="#6b7280">No proposals found</Text>
          </Box>
        </Card>
      ) : (
        <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={16} style={{ marginBottom: '24px' }}>
          {filteredProposals.map(renderProposalCard)}
        </Grid>
      )}
    </Box>
  );
};
