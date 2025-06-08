import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@smolitux/core';

export interface TokenDistributionSegment {
  /** Name des Segments */
  name: string;
  /** Wert des Segments (in Prozent) */
  value: number;
  /** Farbe des Segments */
  color: string;
  /** Beschreibung des Segments */
  description?: string;
  /** Zusätzliche Metadaten zum Segment */
  metadata?: Record<string, unknown>;
}

export interface TokenDistributionChartProps {
  /** Titel des Diagramms */
  title?: string;
  /** Beschreibung des Diagramms */
  description?: string;
  /** Segmente der Token-Verteilung */
  segments: TokenDistributionSegment[];
  /** Gesamtmenge der Token */
  totalSupply?: string;
  /** Token-Symbol */
  tokenSymbol?: string;
  /** Callback beim Klicken auf ein Segment */
  onSegmentClick?: (segment: TokenDistributionSegment) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Diagramm-Typ */
  chartType?: 'pie' | 'donut' | 'bar';
  /** Legende anzeigen? */
  showLegend?: boolean;
  /** Prozentsätze anzeigen? */
  showPercentages?: boolean;
  /** Werte anzeigen? */
  showValues?: boolean;
}

/**
 * TokenDistributionChart-Komponente für die Visualisierung der Token-Verteilung
 */
export const TokenDistributionChart: React.FC<TokenDistributionChartProps> = ({
  title = 'Token-Verteilung',
  description,
  segments,
  totalSupply,
  tokenSymbol = 'Token',
  onSegmentClick,
  className = '',
  loading = false,
  chartType = 'donut',
  showLegend = true,
  showPercentages = true,
  showValues = false,
}) => {
  const [activeSegment, setActiveSegment] = useState<TokenDistributionSegment | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<TokenDistributionSegment | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  // Gesamtsumme der Segmente berechnen
  const totalPercentage = segments.reduce((sum, segment) => sum + segment.value, 0);

  // Kreisdiagramm-Daten berechnen
  const calculatePieChartData = () => {
    let startAngle = 0;

    return segments.map((segment) => {
      const percentage = (segment.value / totalPercentage) * 100;
      const angle = (percentage / 100) * 360;
      const endAngle = startAngle + angle;

      // SVG-Pfad für das Kreissegment berechnen
      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

      // Großer Bogen-Flag (1 wenn Winkel > 180°)
      const largeArcFlag = angle > 180 ? 1 : 0;

      // Pfad für das Kreissegment
      const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      // Textposition für das Label berechnen
      const labelAngle = startAngle + angle / 2;
      const labelRadius = chartType === 'donut' ? 25 : 30;
      const labelX = 50 + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
      const labelY = 50 + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

      // Ergebnis speichern
      const result = {
        segment,
        percentage,
        path,
        startAngle,
        endAngle,
        labelX,
        labelY,
      };

      // Startwinkel für das nächste Segment aktualisieren
      startAngle = endAngle;

      return result;
    });
  };

  // Kreisdiagramm-Daten
  const pieChartData = calculatePieChartData();

  // Segment anklicken
  const handleSegmentClick = (segment: TokenDistributionSegment) => {
    setActiveSegment(activeSegment === segment ? null : segment);

    if (onSegmentClick) {
      onSegmentClick(segment);
    }
  };

  // Wert formatieren
  const formatValue = (value: number): string => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toString();
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholder = () => {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="flex justify-center mb-4">
          <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700 mr-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="ml-auto h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Kreisdiagramm rendern
  const renderPieChart = () => {
    return (
      <div className="flex flex-col items-center">
        <svg ref={chartRef} viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64">
          {/* Kreissegmente */}
          {pieChartData.map(({ segment, path }, index) => (
            <path
              key={`segment-${index}`}
              d={path}
              fill={segment.color}
              stroke="#fff"
              strokeWidth="1"
              className="cursor-pointer transition-opacity duration-200"
              style={{
                opacity:
                  hoveredSegment && hoveredSegment !== segment
                    ? 0.6
                    : activeSegment && activeSegment !== segment
                      ? 0.6
                      : 1,
              }}
              onClick={() => handleSegmentClick(segment)}
              onMouseEnter={() => setHoveredSegment(segment)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          ))}

          {/* Donut-Loch */}
          {chartType === 'donut' && (
            <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-800" />
          )}

          {/* Prozentsätze */}
          {showPercentages &&
            chartType !== 'donut' &&
            pieChartData.map(({ segment, percentage, labelX, labelY }, index) => {
              // Nur Prozentsätze für größere Segmente anzeigen
              if (percentage < 5) return null;

              return (
                <text
                  key={`label-${index}`}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  {Math.round(percentage)}%
                </text>
              );
            })}

          {/* Zentraler Text für Donut-Diagramm */}
          {chartType === 'donut' && activeSegment && (
            <>
              <text
                x="50"
                y="47"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="6"
                fontWeight="bold"
                className="select-none pointer-events-none text-gray-900 dark:text-white"
              >
                {Math.round((activeSegment.value / totalPercentage) * 100)}%
              </text>
              <text
                x="50"
                y="54"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="4"
                className="select-none pointer-events-none text-gray-500 dark:text-gray-400"
              >
                {activeSegment.name}
              </text>
            </>
          )}

          {/* Zentraler Text für Donut-Diagramm (wenn kein Segment aktiv ist) */}
          {chartType === 'donut' && !activeSegment && (
            <>
              <text
                x="50"
                y="47"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="6"
                fontWeight="bold"
                className="select-none pointer-events-none text-gray-900 dark:text-white"
              >
                100%
              </text>
              <text
                x="50"
                y="54"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="4"
                className="select-none pointer-events-none text-gray-500 dark:text-gray-400"
              >
                {tokenSymbol}
              </text>
            </>
          )}
        </svg>
      </div>
    );
  };

  // Balkendiagramm rendern
  const renderBarChart = () => {
    return (
      <div className="w-full">
        <div className="space-y-4">
          {segments.map((segment, index) => {
            const percentage = (segment.value / totalPercentage) * 100;

            return (
              <div
                key={`bar-${index}`}
                className="space-y-1"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => handleSegmentClick(segment)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {segment.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(percentage)}%
                    {showValues && (
                      <span className="ml-2">
                        ({formatValue(segment.value)} {tokenSymbol})
                      </span>
                    )}
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: segment.color,
                      opacity:
                        hoveredSegment && hoveredSegment !== segment
                          ? 0.6
                          : activeSegment && activeSegment !== segment
                            ? 0.6
                            : 1,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>

        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}

        {totalSupply && (
          <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Gesamtmenge: {totalSupply} {tokenSymbol}
          </p>
        )}
      </div>

      {/* Inhalt */}
      {loading ? (
        renderPlaceholder()
      ) : segments.length === 0 ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-lg font-medium">Keine Daten verfügbar</p>
          <p className="mt-2">Es sind keine Token-Verteilungsdaten verfügbar.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Diagramm */}
          <div className={`${showLegend ? 'md:w-1/2' : 'w-full'} mb-6 md:mb-0`}>
            {chartType === 'bar' ? renderBarChart() : renderPieChart()}
          </div>

          {/* Legende */}
          {showLegend && (
            <div className="md:w-1/2 md:pl-6">
              <div className="space-y-3">
                {segments.map((segment, index) => {
                  const percentage = (segment.value / totalPercentage) * 100;

                  return (
                    <div
                      key={`legend-${index}`}
                      className={`flex items-start p-2 rounded-md cursor-pointer transition-colors ${
                        activeSegment === segment
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => handleSegmentClick(segment)}
                      onMouseEnter={() => setHoveredSegment(segment)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: segment.color }}
                      />

                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {segment.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                            {Math.round(percentage)}%
                          </p>
                        </div>

                        {showValues && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatValue(segment.value)} {tokenSymbol}
                          </p>
                        )}

                        {segment.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {segment.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
