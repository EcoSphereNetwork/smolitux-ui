import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SentimentDisplay } from '../';

// Erweitere Jest-Matcher um Barrierefreiheitspruefungen
expect.extend(toHaveNoViolations);

// Mock für setTimeout und clearTimeout
jest.useFakeTimers();

describe('SentimentDisplay Accessibility', () => {
  const mockSentiment = {
    positive: 0.7,
    negative: 0.1,
    neutral: 0.2,
  };

  const mockEmotions = {
    joy: 0.6,
    sadness: 0.1,
    fear: 0.05,
    anger: 0.05,
    surprise: 0.1,
    disgust: 0.1,
  };

  // Test für die Standard-SentimentDisplay-Komponente
  test('should not have accessibility violations with standard SentimentDisplay', async () => {
    const { container } = render(
      <SentimentDisplay title="Stimmungsanalyse" sentiment={mockSentiment} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der SentimentDisplay-Komponente
  test('should not have accessibility violations with A11y SentimentDisplay', async () => {
    const { container } = render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse für Artikel XYZ"
        isLiveRegion={true}
        ariaLive="polite"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper ARIA attributes with A11y SentimentDisplay', () => {
    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse für Artikel XYZ"
        isLiveRegion={true}
        ariaLive="polite"
        ariaAtomic={true}
      />
    );

    const display = screen.getByLabelText('Stimmungsanalyse für Artikel XYZ');
    expect(display).toHaveAttribute('aria-live', 'polite');
    expect(display).toHaveAttribute('aria-atomic', 'true');
  });

  test('should handle different roles correctly', () => {
    const { rerender } = render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        isRegion={true}
      />
    );

    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        isStatus={true}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should handle loading state correctly', () => {
    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        loading={true}
        isLiveRegion={true}
      />
    );

    // Sollte eine Screenreader-Ankündigung für den Ladezustand haben
    expect(screen.getByText('Lade Stimmungsanalyse...')).toBeInTheDocument();

    // Sollte aria-busy auf true gesetzt haben
    const display = screen.getByLabelText('Stimmungsanalyse');
    expect(display).toHaveAttribute('aria-busy', 'true');
  });

  test('should handle refresh button correctly', () => {
    const handleRefresh = jest.fn();

    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        onRefresh={handleRefresh}
      />
    );

    const refreshButton = screen.getByLabelText('Analyse aktualisieren');
    expect(refreshButton).toBeInTheDocument();

    // Klicke auf den Refresh-Button
    fireEvent.click(refreshButton);

    // Callback sollte aufgerufen worden sein
    expect(handleRefresh).toHaveBeenCalled();
  });

  test('should handle time range selection correctly', () => {
    const handleTimeRangeChange = jest.fn();

    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        onTimeRangeChange={handleTimeRangeChange}
        timeRanges={['24h', '7d', '30d']}
        currentTimeRange="7d"
        showTrend={true}
      />
    );

    // Sollte eine Toolbar für die Zeitraumauswahl haben
    const toolbar = screen.getByRole('toolbar', { name: 'Zeitraumauswahl' });
    expect(toolbar).toBeInTheDocument();

    // Sollte Buttons für die Zeiträume haben
    const timeRangeButtons = screen.getAllByRole('button');
    expect(timeRangeButtons.length).toBe(3);

    // Der aktuelle Zeitraum sollte als gedrückt markiert sein
    const currentButton = screen.getByText('7 Tage');
    expect(currentButton).toHaveAttribute('aria-pressed', 'true');

    // Klicke auf einen anderen Zeitraum
    const otherButton = screen.getByText('24 Stunden');
    fireEvent.click(otherButton);

    // Callback sollte aufgerufen worden sein
    expect(handleTimeRangeChange).toHaveBeenCalledWith('24h');
  });

  test('should handle sentiment distribution correctly', () => {
    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        ariaLabel="Stimmungsanalyse"
        showDistribution={true}
      />
    );

    // Sollte Überschriften für die Stimmungsverteilung haben
    expect(screen.getByText('Stimmungsverteilung')).toBeInTheDocument();

    // Sollte Labels für die Stimmungswerte haben
    expect(screen.getByText('Positiv')).toBeInTheDocument();
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('Negativ')).toBeInTheDocument();

    // Sollte ProgressBars mit korrekten ARIA-Attributen haben
    const positiveBar = screen.getByLabelText('Positiv');
    expect(positiveBar).toHaveAttribute('aria-valuetext', '70.0%');

    const neutralBar = screen.getByLabelText('Neutral');
    expect(neutralBar).toHaveAttribute('aria-valuetext', '20.0%');

    const negativeBar = screen.getByLabelText('Negativ');
    expect(negativeBar).toHaveAttribute('aria-valuetext', '10.0%');
  });

  test('should handle emotions correctly', () => {
    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        emotions={mockEmotions}
        ariaLabel="Stimmungsanalyse"
        showEmotions={true}
      />
    );

    // Sollte Überschrift für die Emotionen haben
    expect(screen.getByText('Emotionen')).toBeInTheDocument();

    // Sollte Labels für die Emotionen haben
    expect(screen.getByText('Freude')).toBeInTheDocument();
    expect(screen.getByText('Traurigkeit')).toBeInTheDocument();
    expect(screen.getByText('Angst')).toBeInTheDocument();
    expect(screen.getByText('Wut')).toBeInTheDocument();
    expect(screen.getByText('Überraschung')).toBeInTheDocument();
    expect(screen.getByText('Ekel')).toBeInTheDocument();

    // Sollte ProgressBars mit korrekten ARIA-Attributen haben
    const joyBar = screen.getByLabelText('Freude');
    expect(joyBar).toHaveAttribute('aria-valuetext', '60.0%');
  });

  test('should handle trend chart correctly', () => {
    const mockTrend = [
      { timestamp: new Date('2023-01-01'), value: 0.5 },
      { timestamp: new Date('2023-01-02'), value: 0.6 },
      { timestamp: new Date('2023-01-03'), value: 0.4 },
    ];

    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        trend={mockTrend}
        ariaLabel="Stimmungsanalyse"
        showTrend={true}
        isChart={true}
      />
    );

    // Sollte Überschrift für den Trend haben
    expect(screen.getByText('Stimmungstrend')).toBeInTheDocument();

    // Sollte ein Chart mit korrekten ARIA-Attributen haben
    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Stimmungstrend mit 3 Datenpunkten')
    );
  });

  test('should handle topics correctly', () => {
    const mockTopics = [
      { name: 'Thema 1', sentiment: 0.8, frequency: 10, relevance: 0.9 },
      { name: 'Thema 2', sentiment: -0.5, frequency: 5, relevance: 0.7 },
      { name: 'Thema 3', sentiment: 0.1, frequency: 3, relevance: 0.5 },
    ];

    render(
      <SentimentDisplay.A11y
        title="Stimmungsanalyse"
        sentiment={mockSentiment}
        topics={mockTopics}
        ariaLabel="Stimmungsanalyse"
        showTopics={true}
      />
    );

    // Sollte Überschrift für die Themen haben
    expect(screen.getByText('Themen')).toBeInTheDocument();

    // Sollte eine Liste von Themen haben
    const topicsList = screen.getByLabelText('Themen');
    expect(topicsList).toBeInTheDocument();

    // Sollte die Themen anzeigen
    expect(screen.getByText('Thema 1')).toBeInTheDocument();
    expect(screen.getByText('Thema 2')).toBeInTheDocument();
    expect(screen.getByText('Thema 3')).toBeInTheDocument();

    // Sollte ProgressBars mit korrekten ARIA-Attributen haben
    const topic1Bar = screen.getByLabelText('Thema 1');
    expect(topic1Bar).toHaveAttribute('aria-valuetext', expect.stringContaining('Relevanz: 90%'));
  });
});
