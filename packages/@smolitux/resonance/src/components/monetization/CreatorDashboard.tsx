// TODO: forwardRef hinzufügen
import React from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
import { RevenueModel } from './RevenueModel';

export interface ContentStats {
  /** Anzahl der Beiträge */
  postCount: number;
  /** Anzahl der Aufrufe */
  viewCount: number;
  /** Anzahl der Likes */
  likeCount: number;
  /** Anzahl der Kommentare */
  commentCount: number;
  /** Anzahl der Shares */
  shareCount: number;
  /** Durchschnittliche Engagement-Rate */
  engagementRate: number;
}

export interface EarningStats {
  /** Gesamteinnahmen */
  totalEarnings: number;
  /** Einnahmen pro Beitrag */
  earningsPerPost: number;
  /** Einnahmen pro Aufruf */
  earningsPerView: number;
  /** Einnahmen im Vergleich zum Vormonat (in Prozent) */
  monthlyGrowth: number;
}

export interface TopContent {
  /** Eindeutige ID */
  id: string;
  /** Titel */
  title: string;
  /** Typ */
  type: 'text' | 'image' | 'video' | 'audio' | 'mixed';
  /** Anzahl der Aufrufe */
  viewCount: number;
  /** Anzahl der Likes */
  likeCount: number;
  /** Einnahmen */
  earnings: number;
  /** Erstellungsdatum */
  createdAt: string;
}

export interface CreatorDashboardProps {
  /** Benutzername */
  username: string;
  /** Profilbild */
  avatar: string;
  /** Content-Statistiken */
  contentStats: ContentStats;
  /** Einnahmen-Statistiken */
  earningStats: EarningStats;
  /** Top-Inhalte */
  topContent: TopContent[];
  /** Einnahmenverteilung */
  revenueDistribution: {
    totalRevenue: number;
    creatorShare: number;
    platformShare: number;
    communityShare: number;
  };
  /** Währung */
  currency: string;
  /** Zeitraum */
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all';
  /** Callback für Periodenwechsel */
  onPeriodChange?: (period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all') => void;
  /** Callback für Auszahlung */
  onWithdraw?: () => void;
  /** Callback für Klick auf einen Inhalt */
  onContentClick?: (contentId: string) => void;
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * CreatorDashboard-Komponente für die Anzeige von Creator-Statistiken und -Einnahmen.
 */
export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  username,
  avatar,
  contentStats,
  earningStats,
  topContent,
  revenueDistribution,
  currency,
  period = 'monthly',
  onPeriodChange,
  onWithdraw,
  onContentClick,
  isLoading = false,
  className = '',
  style,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'This Week';
      case 'monthly':
        return 'This Month';
      case 'yearly':
        return 'This Year';
      case 'all':
        return 'All Time';
      default:
        return 'This Month';
    }
  };

  const periods: CreatorDashboardProps['period'][] = ['daily', 'weekly', 'monthly', 'yearly', 'all'];

  const renderPeriodSelector = () => (
    <Flex style={{ overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
      {periods.map((p) => (
        <Box
          key={p}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: period === p ? '#3b82f6' : 'transparent',
            color: period === p ? 'white' : 'inherit',
            fontWeight: period === p ? 500 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            marginRight: '8px',
          }}
          onClick={() => onPeriodChange && onPeriodChange(p)}
        >
          {getPeriodLabel(p)}
        </Box>
      ))}
    </Flex>
  );

  const renderEarningsSummary = () => (
    <Card style={{ marginBottom: '24px' }}>
      <Box style={{ padding: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
          <Box>
            <Text weight="bold" size="xl">
              Creator Earnings
            </Text>
            <Text color="#6b7280">{getPeriodLabel(period)}</Text>
          </Box>
          <Button onClick={onWithdraw}>Withdraw</Button>
        </Flex>

        <Grid columns={{ base: 1, md: 2 }} gap={16}>
          <Box>
            <Text color="#6b7280">Total Earnings</Text>
            <Text weight="bold" size="3xl" color="#3b82f6">
              {formatCurrency(earningStats.totalEarnings)}
            </Text>
            <Text size="sm" color={earningStats.monthlyGrowth >= 0 ? '#10b981' : '#ef4444'}>
              {formatPercentage(earningStats.monthlyGrowth)} from last period
            </Text>
          </Box>
          <Grid columns={2} gap={16}>
            <Box>
              <Text color="#6b7280">Per Post</Text>
              <Text weight="bold" size="xl">
                {formatCurrency(earningStats.earningsPerPost)}
              </Text>
            </Box>
            <Box>
              <Text color="#6b7280">Per View</Text>
              <Text weight="bold" size="xl">
                {formatCurrency(earningStats.earningsPerView)}
              </Text>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );

  const renderContentStats = () => (
    <Card style={{ marginBottom: '24px' }}>
      <Box style={{ padding: '16px' }}>
        <Text weight="bold" size="xl" style={{ marginBottom: '16px' }}>
          Content Performance
        </Text>

        <Grid columns={{ base: 2, md: 5 }} gap={16}>
          <Box>
            <Text color="#6b7280">Posts</Text>
            <Text weight="bold" size="xl">
              {formatNumber(contentStats.postCount)}
            </Text>
          </Box>
          <Box>
            <Text color="#6b7280">Views</Text>
            <Text weight="bold" size="xl">
              {formatNumber(contentStats.viewCount)}
            </Text>
          </Box>
          <Box>
            <Text color="#6b7280">Likes</Text>
            <Text weight="bold" size="xl">
              {formatNumber(contentStats.likeCount)}
            </Text>
          </Box>
          <Box>
            <Text color="#6b7280">Comments</Text>
            <Text weight="bold" size="xl">
              {formatNumber(contentStats.commentCount)}
            </Text>
          </Box>
          <Box>
            <Text color="#6b7280">Engagement</Text>
            <Text weight="bold" size="xl">
              {contentStats.engagementRate.toFixed(1)}%
            </Text>
          </Box>
        </Grid>
      </Box>
    </Card>
  );

  const renderTopContent = () => (
    <Card style={{ marginBottom: '24px' }}>
      <Box style={{ padding: '16px' }}>
        <Text weight="bold" size="xl" style={{ marginBottom: '16px' }}>
          Top Performing Content
        </Text>

        {topContent.length === 0 ? (
          <Box style={{ textAlign: 'center', padding: '24px 0' }}>
            <Text color="#6b7280">No content available for this period</Text>
          </Box>
        ) : (
          <Box>
            {topContent.map((content, index) => (
              <Box
                key={content.id}
                style={{
                  padding: '12px 0',
                  borderBottom: index < topContent.length - 1 ? '1px solid #e5e7eb' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => onContentClick && onContentClick(content.id)}
              >
                <Flex justify="space-between" align="center">
                  <Box style={{ flex: 1 }}>
                    <Flex align="center" style={{ marginBottom: '4px' }}>
                      <Box
                        style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: '#f3f4f6',
                          marginRight: '8px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                      </Box>
                      <Text weight="medium">{content.title}</Text>
                    </Flex>
                    <Text size="sm" color="#6b7280">
                      Created on {formatDate(content.createdAt)}
                    </Text>
                  </Box>
                  <Flex style={{ marginRight: '16px' }}>
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
                      <Text size="sm">{formatNumber(content.viewCount)}</Text>
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
                          d="M14 10h3l-4 8v-6h-3l4-8v6z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Text size="sm">{formatNumber(content.likeCount)}</Text>
                    </Flex>
                  </Flex>
                  <Text weight="bold" color="#3b82f6">
                    {formatCurrency(content.earnings)}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );

  const renderRevenueModel = () => (
    <RevenueModel
      totalRevenue={revenueDistribution.totalRevenue}
      currency={currency}
      creatorShare={revenueDistribution.creatorShare}
      platformShare={revenueDistribution.platformShare}
      communityShare={revenueDistribution.communityShare}
      period={period}
      onPeriodChange={onPeriodChange}
    />
  );

  if (isLoading) {
    return (
      <Box
        className={`creator-dashboard-skeleton ${className}`}
        style={{
          ...style,
        }}
      >
        <Card style={{ marginBottom: '24px' }}>
          <Box style={{ padding: '16px' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
              <Box>
                <Box
                  style={{
                    width: '150px',
                    height: '24px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }}
                />
                <Box
                  style={{
                    width: '100px',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                />
              </Box>
              <Box
                style={{
                  width: '100px',
                  height: '36px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                }}
              />
            </Flex>
            <Grid columns={{ base: 1, md: 2 }} gap={16}>
              <Box>
                <Box
                  style={{
                    width: '100px',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }}
                />
                <Box
                  style={{
                    width: '150px',
                    height: '32px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                />
              </Box>
              <Grid columns={2} gap={16}>
                <Box>
                  <Box
                    style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                  />
                  <Box
                    style={{
                      width: '100px',
                      height: '24px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Box>
                  <Box
                    style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                  />
                  <Box
                    style={{
                      width: '100px',
                      height: '24px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box style={{ padding: '16px' }}>
            <Box
              style={{
                width: '150px',
                height: '24px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '16px',
              }}
            />
            <Grid columns={{ base: 2, md: 5 }} gap={16}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Box key={i}>
                  <Box
                    style={{
                      width: '60px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                  />
                  <Box
                    style={{
                      width: '80px',
                      height: '24px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      data-testid="CreatorDashboard"
      className={`creator-dashboard ${className}`}
      style={{
        ...style,
      }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
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
              src={avatar}
              alt={username}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box>
            <Text weight="bold" size="xl">
              {username}
            </Text>
            <Text color="#6b7280">Creator Dashboard</Text>
          </Box>
        </Flex>
        {renderPeriodSelector()}
      </Flex>

      {renderEarningsSummary()}
      {renderContentStats()}
      {renderTopContent()}
      {renderRevenueModel()}
    </Box>
  );
};
