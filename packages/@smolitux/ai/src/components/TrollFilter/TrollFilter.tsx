// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Card, Button, ProgressBar } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface TrollFilterProps {
  /** Zu analysierender Kommentar */
  comment: string;
  /** Ergebnis der Analyse */
  result?: {
    /** Toxizitätsbewertung (0-100) */
    toxicity: number;
    /** Kategorien */
    categories: {
      name: string;
      probability: number;
    }[];
    /** Empfohlene Aktion */
    recommendedAction: 'allow' | 'flag' | 'hide' | 'remove';
  };
  /** Ob die Analyse läuft */
  isAnalyzing?: boolean;
  /** Callback für Analyse */
  onAnalyze?: () => void;
  /** Callback für Aktion */
  onAction?: (action: 'allow' | 'flag' | 'hide' | 'remove') => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * TrollFilter-Komponente für die Erkennung toxischen Verhaltens.
 * Analysiert Kommentare und empfiehlt Aktionen.
 */
export const TrollFilter: React.FC<TrollFilterProps> = ({
  comment,
  result,
  isAnalyzing = false,
  onAnalyze,
  onAction,
  className = '',
  style,
}) => {
  const getToxicityLevelColor = (toxicity: number) => {
    if (toxicity < 30) return '#10b981'; // Grün
    if (toxicity < 70) return '#f59e0b'; // Gelb
    return '#ef4444'; // Rot
  };

  const getToxicityLevelText = (toxicity: number) => {
    if (toxicity < 30) return 'Low Toxicity';
    if (toxicity < 70) return 'Medium Toxicity';
    return 'High Toxicity';
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
        return 'Allow Comment';
      case 'flag':
        return 'Flag for Review';
      case 'hide':
        return 'Hide Comment';
      case 'remove':
        return 'Remove Comment';
      default:
        return 'Unknown Action';
    }
  };

  const renderAnalysisResult = () => {
    if (!result) return null;

    return (
      <Box>
        <Box style={{ marginBottom: '16px' }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: '8px' }}>
            <Text weight="medium">Toxicity Level</Text>
            <Text weight="bold" color={getToxicityLevelColor(result.toxicity)}>
              {getToxicityLevelText(result.toxicity)}
            </Text>
          </Flex>
          <ProgressBar
            value={result.toxicity}
            max={100}
            colorScheme={
              result.toxicity < 30 ? 'success' : result.toxicity < 70 ? 'warning' : 'danger'
            }
            size="md"
            style={{ marginBottom: '4px' }}
          />
          <Flex justify="space-between">
            <Text size="sm" color="#6b7280">
              Safe
            </Text>
            <Text size="sm" color="#6b7280">
              Toxic
            </Text>
          </Flex>
        </Box>

        <Box style={{ marginBottom: '16px' }}>
          <Text weight="medium" style={{ marginBottom: '8px' }}>
            Detected Categories
          </Text>
          {result.categories.map((category, index) => (
            <Box
              key={index}
              style={{
                marginBottom: '8px',
              }}
            >
              <Flex justify="space-between" align="center" style={{ marginBottom: '4px' }}>
                <Text>{category.name}</Text>
                <Text weight="medium" color={getToxicityLevelColor(category.probability * 100)}>
                  {Math.round(category.probability * 100)}%
                </Text>
              </Flex>
              <ProgressBar
                value={category.probability * 100}
                max={100}
                colorScheme={
                  category.probability < 0.3
                    ? 'success'
                    : category.probability < 0.7
                      ? 'warning'
                      : 'danger'
                }
                size="sm"
              />
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

  const renderAnalyzeButton = () => {
    if (result) return null;

    return (
      <Button
        onClick={onAnalyze}
        loading={isAnalyzing}
        disabled={isAnalyzing || !comment}
        fullWidth
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Comment'}
      </Button>
    );
  };

  return (
    <Card
      className={`troll-filter ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Text weight="bold" size="lg" style={{ marginBottom: '16px' }}>
          Comment Moderation
        </Text>

        <Box
          style={{
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <Text>{comment}</Text>
        </Box>

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
            <Text>Analyzing comment for toxicity...</Text>
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
