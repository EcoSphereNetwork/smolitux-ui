// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Card } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';
import { EngagementScore } from '@smolitux/ai';

export interface PostMetric {
  name: string;
  value: number;
  change?: number;
  benchmark?: number;
  higherIsBetter?: boolean;
}

export interface PostMetricsProps {
  /** Titel */
  title?: string;
  /** Beschreibung */
  description?: string;
  /** Gesamtpunktzahl */
  score: number;
  /** Benchmark-Punktzahl */
  benchmarkScore?: number;
  /** Metriken */
  metrics: PostMetric[];
  /** Zeitraum */
  period?: 'day' | 'week' | 'month' | 'year' | 'all';
  /** Callback für Periodenwechsel */
  onPeriodChange?: (period: 'day' | 'week' | 'month' | 'year' | 'all') => void;
  /** Callback für Aktualisierung */
  onRefresh?: () => void;
  /** Ob die Metriken geladen werden */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * PostMetrics-Komponente für die Anzeige von Beitragsmetriken.
 */
export const PostMetrics: React.FC<PostMetricsProps> = ({
  title = 'Post Performance',
  description = 'Analytics and metrics for your post',
  score,
  benchmarkScore,
  metrics,
  period = 'week',
  onPeriodChange,
  onRefresh,
  isLoading = false,
  className = '',
  style,
}) => {
  // Konvertiere die Metriken in das Format der EngagementScore-Komponente
  const formattedMetrics = metrics.map((metric) => ({
    name: metric.name,
    value: metric.value,
    weight: 1 / metrics.length, // Gleichmäßige Gewichtung
    description: `${metric.name} metric`,
    benchmark: metric.benchmark,
    higherIsBetter: metric.higherIsBetter !== undefined ? metric.higherIsBetter : true,
  }));

  return (
    <Card
      className={`post-metrics ${className}`}
      style={{
        ...style,
      }}
    >
      <EngagementScore
        title={title}
        description={description}
        score={score}
        metrics={formattedMetrics}
        onRefresh={onRefresh}
        loading={isLoading}
        benchmarkScore={benchmarkScore}
        benchmarkText="Average"
        contentTitle="This Post"
        contentType="post"
        analysisTimestamp={new Date()}
      />
    </Card>
  );
};
