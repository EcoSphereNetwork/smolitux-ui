import React from 'react';
import { Card, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface TokenEconomyProps {
  /** Token-Informationen */
  tokenInfo: {
    /** Token-Name */
    name: string;
    /** Token-Symbol */
    symbol: string;
    /** Token-Preis */
    price: number;
    /** Währung */
    currency: string;
    /** Gesamtangebot */
    totalSupply: number;
    /** Zirkulierendes Angebot */
    circulatingSupply: number;
    /** Marktkapitalisierung */
    marketCap: number;
  };
  /** Historische Daten */
  historicalData: {
    /** Zeitstempel */
    timestamp: string;
    /** Preis */
    price: number;
    /** Volumen */
    volume: number;
  }[];
  /** Verteilung */
  distribution: {
    /** Kategorie */
    category: string;
    /** Wert */
    value: number;
    /** Prozentsatz */
    percentage: number;
  }[];
  /** Zeitraum */
  period: 'day' | 'week' | 'month' | 'year' | 'all';
  /** Callback für Periodenwechsel */
  onPeriodChange?: (period: 'day' | 'week' | 'month' | 'year' | 'all') => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * TokenEconomy-Komponente für die Visualisierung der Token-Wirtschaft.
 * Zeigt Token-Informationen, historische Daten und Verteilung an.
 */
export const TokenEconomy: React.FC<TokenEconomyProps> = ({
  tokenInfo,
  historicalData,
  distribution,
  period = 'month',
  onPeriodChange,
  className = '',
  style,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: tokenInfo.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
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
      case 'day':
        return 'Last 24 Hours';
      case 'week':
        return 'Last 7 Days';
      case 'month':
        return 'Last 30 Days';
      case 'year':
        return 'Last Year';
      case 'all':
        return 'All Time';
      default:
        return 'Last 30 Days';
    }
  };

  const renderPeriodSelector = () => (
    <Flex style={{ overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
      {['day', 'week', 'month', 'year', 'all'].map((p) => (
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

  const renderTokenInfo = () => (
    <Box style={{ marginBottom: '24px' }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
        <Box>
          <Text weight="bold" size="xl">
            {tokenInfo.name} ({tokenInfo.symbol})
          </Text>
          <Text weight="bold" size="2xl" color="#3b82f6">
            {formatCurrency(tokenInfo.price)}
          </Text>
        </Box>
        <Box
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#f3f4f6',
          }}
        >
          <Text weight="medium">Market Cap</Text>
          <Text weight="bold">{formatCurrency(tokenInfo.marketCap)}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box>
          <Text color="#6b7280">Total Supply</Text>
          <Text weight="medium">
            {formatNumber(tokenInfo.totalSupply)} {tokenInfo.symbol}
          </Text>
        </Box>
        <Box>
          <Text color="#6b7280">Circulating Supply</Text>
          <Text weight="medium">
            {formatNumber(tokenInfo.circulatingSupply)} {tokenInfo.symbol}
          </Text>
        </Box>
      </Flex>
    </Box>
  );

  const renderPriceChart = () => {
    // In a real implementation, this would use a chart library
    // For this example, we'll create a simple visual representation

    if (historicalData.length === 0) {
      return (
        <Box
          style={{
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <Text color="#6b7280">No historical data available</Text>
        </Box>
      );
    }

    const maxPrice = Math.max(...historicalData.map((d) => d.price));
    const minPrice = Math.min(...historicalData.map((d) => d.price));
    const range = maxPrice - minPrice;

    return (
      <Box style={{ marginBottom: '24px' }}>
        <Text weight="medium" style={{ marginBottom: '8px' }}>
          Price History
        </Text>
        <Box
          style={{
            height: '200px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            position: 'relative',
          }}
        >
          <Flex
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
            {historicalData.map((data, index) => {
              const height = range === 0 ? 50 : ((data.price - minPrice) / range) * 100;
              const width = `${100 / historicalData.length}%`;

              return (
                <Box
                  key={index}
                  style={{
                    width,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                  }}
                >
                  <Box
                    style={{
                      width: '80%',
                      height: `${height}%`,
                      backgroundColor: '#3b82f6',
                      borderRadius: '2px',
                      margin: '0 auto',
                    }}
                  />
                  {index % Math.ceil(historicalData.length / 5) === 0 && (
                    <Text
                      size="xs"
                      color="#6b7280"
                      style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatDate(data.timestamp)}
                    </Text>
                  )}
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    );
  };

  const renderDistribution = () => {
    if (distribution.length === 0) {
      return (
        <Box
          style={{
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          <Text color="#6b7280">No distribution data available</Text>
        </Box>
      );
    }

    // Generate colors for the distribution
    const colors = [
      '#3b82f6', // Blue
      '#10b981', // Green
      '#f59e0b', // Yellow
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#ec4899', // Pink
      '#6b7280', // Gray
    ];

    return (
      <Box>
        <Text weight="medium" style={{ marginBottom: '8px' }}>
          Token Distribution
        </Text>
        <Flex>
          <Box
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              position: 'relative',
              marginRight: '16px',
            }}
          >
            {/* Simplified pie chart */}
            <svg width="150" height="150" viewBox="0 0 100 100">
              {distribution.map((segment, index) => {
                const startAngle =
                  distribution.slice(0, index).reduce((sum, s) => sum + s.percentage, 0) * 3.6;
                const endAngle = startAngle + segment.percentage * 3.6;

                // Convert angles to radians
                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;

                // Calculate coordinates
                const x1 = 50 + 50 * Math.cos(startRad);
                const y1 = 50 + 50 * Math.sin(startRad);
                const x2 = 50 + 50 * Math.cos(endRad);
                const y2 = 50 + 50 * Math.sin(endRad);

                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = segment.percentage > 50 ? 1 : 0;

                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </svg>
          </Box>
          <Box style={{ flex: 1 }}>
            {distribution.map((segment, index) => (
              <Flex key={index} align="center" style={{ marginBottom: '8px' }}>
                <Box
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: colors[index % colors.length],
                    marginRight: '8px',
                  }}
                />
                <Box style={{ flex: 1 }}>
                  <Text>{segment.category}</Text>
                </Box>
                <Box style={{ textAlign: 'right' }}>
                  <Text weight="medium">
                    {formatNumber(segment.value)} {tokenInfo.symbol}
                  </Text>
                  <Text size="sm" color="#6b7280">
                    {formatPercentage(segment.percentage)}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Box>
    );
  };

  return (
    <Card
      className={`token-economy ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
          <Text weight="bold" size="xl">
            Token Economy
          </Text>
          {renderPeriodSelector()}
        </Flex>

        {renderTokenInfo()}
        {renderPriceChart()}
        {renderDistribution()}
      </Box>
    </Card>
  );
};
