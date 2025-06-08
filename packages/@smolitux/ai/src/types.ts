export interface AIResponse<T> {
  /** Status of the AI request */
  status: 'success' | 'error';
  /** Payload returned by the AI service */
  data?: T;
  /** Optional error message */
  error?: string;
}

export interface AnalyticsReport {
  /** Identifier of the analyzed content */
  contentId: string;
  /** Generated at timestamp */
  generatedAt: string;
  /** List of metrics */
  metrics: Array<{ name: string; value: number; unit?: string }>;
}

export interface ModerationConfig {
  /** Whether automatic moderation is enabled */
  enabled: boolean;
  /** Threshold for blocking content */
  blockThreshold: number;
  /** Optional list of blocked terms */
  blockedTerms?: string[];
}
