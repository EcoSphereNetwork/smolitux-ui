import React from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface RevenueModelProps {
  /** Gesamteinnahmen */
  totalRevenue: number;
  /** Währung */
  currency: string;
  /** Creator-Anteil */
  creatorShare: number;
  /** Plattform-Anteil */
  platformShare: number;
  /** Community-Anteil */
  communityShare: number;
  /** Zeitraum */
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all';
  /** Callback für Periodenwechsel */
  onPeriodChange?: (period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all') => void;
  /** Historische Daten */
  historicalData?: {
    date: string;
    totalRevenue: number;
    creatorShare: number;
    platformShare: number;
    communityShare: number;
  }[];
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * RevenueModel-Komponente für die Visualisierung des 30-30-30-Modells.
 * Zeigt die Verteilung der Einnahmen zwischen Creator, Plattform und Community.
 */
export const RevenueModel: React.FC<RevenueModelProps> = ({
  totalRevenue,
  currency,
  creatorShare,
  platformShare,
  communityShare,
  period = 'monthly',
  onPeriodChange,
  historicalData,
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

  const formatPercentage = (value: number, total: number) => {
    return `${((value / total) * 100).toFixed(1)}%`;
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

  const renderPeriodSelector = () => (
    <Flex style={{ overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
      {['daily', 'weekly', 'monthly', 'yearly', 'all'].map((p) => (
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
          onClick={() => onPeriodChange && onPeriodChange(p as any)}
        >
          {getPeriodLabel(p)}
        </Box>
      ))}
    </Flex>
  );

  const renderDistributionChart = () => {
    const total = creatorShare + platformShare + communityShare;
    const creatorPercentage = (creatorShare / total) * 100;
    const platformPercentage = (platformShare / total) * 100;
    const communityPercentage = (communityShare / total) * 100;

    return (
      <Box style={{ marginBottom: '24px' }}>
        <Box
          style={{
            height: '24px',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            marginBottom: '8px',
          }}
        >
          <Box
            style={{
              width: `${creatorPercentage}%`,
              backgroundColor: '#3b82f6',
              height: '100%',
            }}
          />
          <Box
            style={{
              width: `${platformPercentage}%`,
              backgroundColor: '#10b981',
              height: '100%',
            }}
          />
          <Box
            style={{
              width: `${communityPercentage}%`,
              backgroundColor: '#f59e0b',
              height: '100%',
            }}
          />
        </Box>
        <Flex justify="space-between">
          <Flex align="center">
            <Box
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: '#3b82f6',
                marginRight: '4px',
              }}
            />
            <Text size="sm">Creator</Text>
          </Flex>
          <Flex align="center">
            <Box
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: '#10b981',
                marginRight: '4px',
              }}
            />
            <Text size="sm">Platform</Text>
          </Flex>
          <Flex align="center">
            <Box
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: '#f59e0b',
                marginRight: '4px',
              }}
            />
            <Text size="sm">Community</Text>
          </Flex>
        </Flex>
      </Box>
    );
  };

  const renderDistributionDetails = () => (
    <Box>
      <Box style={{ marginBottom: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '4px' }}>
          <Text weight="medium">Creator Share</Text>
          <Text weight="bold">{formatCurrency(creatorShare)}</Text>
        </Flex>
        <Text size="sm" color="#6b7280">
          {formatPercentage(creatorShare, totalRevenue)} of total revenue
        </Text>
      </Box>
      
      <Box style={{ marginBottom: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '4px' }}>
          <Text weight="medium">Platform Share</Text>
          <Text weight="bold">{formatCurrency(platformShare)}</Text>
        </Flex>
        <Text size="sm" color="#6b7280">
          {formatPercentage(platformShare, totalRevenue)} of total revenue
        </Text>
      </Box>
      
      <Box>
        <Flex justify="space-between" align="center" style={{ marginBottom: '4px' }}>
          <Text weight="medium">Community Share</Text>
          <Text weight="bold">{formatCurrency(communityShare)}</Text>
        </Flex>
        <Text size="sm" color="#6b7280">
          {formatPercentage(communityShare, totalRevenue)} of total revenue
        </Text>
      </Box>
    </Box>
  );

  if (isLoading) {
    return (
      <Card
        className={`revenue-model-skeleton ${className}`}
        style={{
          ...style,
        }}
      >
        <Box style={{ padding: '16px' }}>
          <Box
            style={{
              width: '60%',
              height: '24px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <Box
            style={{
              width: '100%',
              height: '24px',
              backgroundColor: '#e5e7eb',
              borderRadius: '12px',
              marginBottom: '24px',
            }}
          />
          <Box
            style={{
              width: '100%',
              height: '120px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      className={`revenue-model ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
          <Box>
            <Text weight="bold" size="xl">Revenue Distribution</Text>
            <Text color="#6b7280">30-30-30 Revenue Model</Text>
          </Box>
          <Text weight="bold" size="xl">
            {formatCurrency(totalRevenue)}
          </Text>
        </Flex>

        {renderPeriodSelector()}
        {renderDistributionChart()}
        {renderDistributionDetails()}

        <Box
          style={{
            marginTop: '24px',
            padding: '12px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Text size="sm" color="#3b82f6">
            The 30-30-30 model distributes revenue fairly: 30% to creators, 30% to platform development, and 30% to community engagement rewards. The remaining 10% covers operational costs.
          </Text>
        </Box>
      </Box>
    </Card>
  );
};