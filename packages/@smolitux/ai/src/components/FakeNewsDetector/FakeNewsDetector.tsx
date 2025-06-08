import React, { useState } from 'react';
import { Card, Button, Tooltip, ProgressBar } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface FakeNewsDetectorProps {
  /** Zu analysierender Text */
  content: string;
  /** Ergebnis der Analyse */
  result?: {
    /** Wahrscheinlichkeit für Falschinformationen (0-100) */
    probability: number;
    /** Vertrauenswürdigkeit (0-100) */
    trustworthiness: number;
    /** Faktoren, die zur Bewertung beigetragen haben */
    factors: {
      name: string;
      description: string;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
    /** Empfehlungen */
    recommendations?: string[];
  };
  /** Ob die Analyse läuft */
  isAnalyzing?: boolean;
  /** Callback für Analyse */
  onAnalyze?: () => void;
  /** Callback für Meldung */
  onReport?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * FakeNewsDetector-Komponente für die Erkennung von Falschinformationen.
 * Analysiert Inhalte und zeigt Vertrauenswürdigkeitsbewertungen an.
 */
export const FakeNewsDetector: React.FC<FakeNewsDetectorProps> = ({
  content,
  result,
  isAnalyzing = false,
  onAnalyze,
  onReport,
  className = '',
  style,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTrustLevelColor = (trustworthiness: number) => {
    if (trustworthiness >= 70) return '#10b981'; // Grün
    if (trustworthiness >= 40) return '#f59e0b'; // Gelb
    return '#ef4444'; // Rot
  };

  const getTrustLevelText = (trustworthiness: number) => {
    if (trustworthiness >= 70) return 'High Trustworthiness';
    if (trustworthiness >= 40) return 'Medium Trustworthiness';
    return 'Low Trustworthiness';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'positive') return '#10b981';
    if (impact === 'negative') return '#ef4444';
    return '#6b7280';
  };

  const getImpactIcon = (impact: string) => {
    if (impact === 'positive') {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12l3 3 6-6"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (impact === 'negative') {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9l-6 6M9 9l6 6"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12h8"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderContent = () => {
    if (content.length > 200 && !isExpanded) {
      return (
        <Box>
          <Text style={{ marginBottom: '8px' }}>{content.substring(0, 200)}...</Text>
          <Button variant="link" size="sm" onClick={() => setIsExpanded(true)}>
            Show more
          </Button>
        </Box>
      );
    }
    return <Text style={{ marginBottom: '16px' }}>{content}</Text>;
  };

  const renderAnalysisResult = () => {
    if (!result) return null;

    return (
      <Box>
        <Box style={{ marginBottom: '16px' }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: '8px' }}>
            <Text weight="medium">Trustworthiness</Text>
            <Text weight="bold" color={getTrustLevelColor(result.trustworthiness)}>
              {getTrustLevelText(result.trustworthiness)}
            </Text>
          </Flex>
          <ProgressBar
            value={result.trustworthiness}
            max={100}
            colorScheme={
              result.trustworthiness >= 70
                ? 'success'
                : result.trustworthiness >= 40
                  ? 'warning'
                  : 'danger'
            }
            size="md"
            style={{ marginBottom: '4px' }}
          />
          <Flex justify="space-between">
            <Text size="sm" color="#6b7280">
              Low Trust
            </Text>
            <Text size="sm" color="#6b7280">
              High Trust
            </Text>
          </Flex>
        </Box>

        <Box style={{ marginBottom: '16px' }}>
          <Text weight="medium" style={{ marginBottom: '8px' }}>
            Analysis Factors
          </Text>
          {result.factors.map((factor, index) => (
            <Box
              key={index}
              style={{
                padding: '8px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              <Flex align="start">
                <Box style={{ marginRight: '8px', marginTop: '2px' }}>
                  {getImpactIcon(factor.impact)}
                </Box>
                <Box>
                  <Text weight="medium">{factor.name}</Text>
                  <Text size="sm">{factor.description}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>

        {result.recommendations && result.recommendations.length > 0 && (
          <Box style={{ marginBottom: '16px' }}>
            <Text weight="medium" style={{ marginBottom: '8px' }}>
              Recommendations
            </Text>
            <Box
              style={{
                padding: '12px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {result.recommendations.map((recommendation, index) => (
                  <li key={index}>
                    <Text size="sm">{recommendation}</Text>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        )}

        <Flex justify="space-between">
          <Button variant="outline" onClick={onAnalyze} disabled={isAnalyzing}>
            Re-analyze
          </Button>
          <Button variant="outline" colorScheme="danger" onClick={onReport}>
            Report Content
          </Button>
        </Flex>
      </Box>
    );
  };

  const renderAnalyzeButton = () => {
    if (result) return null;

    return (
      <Button
        onClick={onAnalyze}
        loading={isAnalyzing}
        disabled={isAnalyzing || !content}
        fullWidth
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze for Misinformation'}
      </Button>
    );
  };

  return (
    <Card
      className={`fake-news-detector ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
          <Text weight="bold" size="lg">
            Content Verification
          </Text>
          <Tooltip content="This tool analyzes content for potential misinformation using AI">
            <Box style={{ cursor: 'help' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16v-4M12 8h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Tooltip>
        </Flex>

        {renderContent()}

        {isAnalyzing && !result && (
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
            <Text>Analyzing content for misinformation...</Text>
            <Text size="sm" color="#6b7280" style={{ marginTop: '8px' }}>
              This may take a few moments
            </Text>
          </Box>
        )}

        {renderAnalysisResult()}
        {renderAnalyzeButton()}
      </Box>
    </Card>
  );
};
