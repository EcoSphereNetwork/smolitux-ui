// packages/@smolitux/charts/src/components/LineChart/LineChart.tsx
import React, { useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

// Define the expected theme shape
interface Theme {
  themeMode?: 'light' | 'dark';
  [key: string]: any;
}

export interface LineChartDataPoint {
  /** X-Wert (Label) */
  x: string | number;
  /** Y-Wert (Datenpunkt) */
  y: number;
  /** Optional: Kategorie für Multi-Serien Charts */
  category?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}

export interface LineChartSeries {
  /** ID der Serie */
  id: string;
  /** Name der Serie (für Legende) */
  name: string;
  /** Farbe der Serie */
  color?: string;
  /** Linientyp */
  lineType?: 'solid' | 'dashed' | 'dotted';
  /** Linienstärke */
  lineWidth?: number;
  /** Daten der Serie */
  data: LineChartDataPoint[];
}

export interface LineChartProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Einzelne Datenserie oder Array von Serien */
  data: LineChartSeries | LineChartSeries[];
  /** Höhe des Charts */
  height?: number;
  /** Breite des Charts (Default: 100%) */
  width?: number | string;
  /** Padding innerhalb des Charts */
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Achsentitel */
  axisLabels?: { x?: string; y?: string };
  /** Einheiten für Achsenbeschriftungen */
  units?: { x?: string; y?: string };
  /** Grid-Linien anzeigen */
  showGrid?: boolean;
  /** Datenpunkte anzeigen */
  showPoints?: boolean;
  /** Werte direkt an den Punkten anzeigen */
  showValues?: boolean;
  /** Tooltips anzeigen */
  showTooltips?: boolean;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Farbe des Legendentexts */
  legendTextColor?: string;
  /** Animation aktivieren */
  animated?: boolean;
  /** Y-Achse bei Null beginnen */
  startYAxisAtZero?: boolean;
  /** Angepasste Farben für mehrere Serien */
  colors?: string[];
  /** Angepasste Formatierung für Y-Achsenbeschriftungen */
  formatYLabel?: (value: number) => string;
  /** Angepasste Formatierung für X-Achsenbeschriftungen */
  formatXLabel?: (value: string | number) => string;
  /** Für responsive SVG (viewBox) */
  aspectRatio?: number;
  /** Fläche unter der Linie füllen */
  showArea?: boolean;
  /** Farbe der Wertelabel */
  valueTextColor?: string;
  /** Chart-Titel */
  title?: string;
}

/**
 * LineChart-Komponente für Zeitreihen und kontinuierliche Daten
 *
 * @example
 * ```tsx
 * <LineChart
 *   data={{
 *     id: 'views',
 *     name: 'Page Views',
 *     data: [
 *       { x: 'Jan', y: 100 },
 *       { x: 'Feb', y: 150 },
 *       { x: 'Mar', y: 200 },
 *       { x: 'Apr', y: 120 },
 *       { x: 'May', y: 180 },
 *     ]
 *   }}
 *   height={300}
 *   showGrid
 *   showPoints
 * />
 * ```
 */
export const LineChart = forwardRef<SVGSVGElement, LineChartProps>(
  (
    {
      data,
      height = 300,
      width = '100%',
      padding = { top: 30, right: 30, bottom: 40, left: 50 },
      axisLabels,
      units,
      showGrid = true,
      showPoints = true,
      showValues = false,
      showTooltips = true,
      showLegend = true,
      legendPosition = 'top',
      legendTextColor,
      animated = true,
      startYAxisAtZero = false,
      colors,
      formatYLabel = (value) => `${value}`,
      formatXLabel = (value) => `${value}`,
      aspectRatio = 16 / 9,
      showArea = false,
      valueTextColor,
      title,
      className = '',
      ...rest
    },
    ref
  ) => {
    const theme = useTheme() as Theme;
    const themeMode = theme?.themeMode || 'light';
    // Sicherstellen, dass wir mit einem Array von Serien arbeiten
    const seriesArray = Array.isArray(data) ? data : [data];

    // Standard-Farbpalette
    const defaultColors = [
      '#3B82F6', // blue-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
      '#EF4444', // red-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#06B6D4', // cyan-500
      '#14B8A6', // teal-500
      '#F97316', // orange-500
      '#6366F1', // indigo-500
    ];

    // Tatsächlich verwendete Farben
    const chartColors = colors || defaultColors;

    // Padding-Werte mit Defaults
    const paddingTop = padding.top ?? 30;
    const paddingRight = padding.right ?? 30;
    const paddingBottom = padding.bottom ?? 40;
    const paddingLeft = padding.left ?? 50;

    // Eigentliche Zeichenfläche (ohne Padding)
    const drawingWidth = typeof width === 'number' ? width - paddingLeft - paddingRight : '100%';
    const numericDrawingWidth = typeof drawingWidth === 'number' ? drawingWidth : 0;
    const drawingHeight = height - paddingTop - paddingBottom;

    // Datenaufbereitung und Skalierung
    const { xLabels, yMin, yMax, normalizedSeries, yScale } = useMemo(() => {
      // Alle X-Labels aus allen Serien extrahieren (für Achsenbeschriftung)
      const allXValues = seriesArray
        .flatMap((series) => series.data.map((d) => d.x))
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
          }
          return String(a).localeCompare(String(b));
        });

      // Min/Max Y-Werte für Skalierung
      let minY = startYAxisAtZero ? 0 : Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      seriesArray.forEach((series) => {
        series.data.forEach((point) => {
          if (point.y < minY) minY = point.y;
          if (point.y > maxY) maxY = point.y;
        });
      });

      // Skalierungsfunktionen
      const yScale = (value: number) => {
        const range = maxY - minY;
        if (range === 0) return 0.5; // Wenn alle Werte gleich sind
        return 1 - (value - minY) / range;
      };

      // Normalisierte Daten für das Zeichnen
      const normalized = seriesArray.map((series, seriesIndex) => {
        const color = series.color || chartColors[seriesIndex % chartColors.length];

        // Datenpunkte mit normalisierten Koordinaten
        const points = series.data
          .map((point) => {
            const xIndex = allXValues.indexOf(point.x);
            const xPos = xIndex / Math.max(1, allXValues.length - 1);
            const yPos = yScale(point.y);

            return {
              x: xPos,
              y: yPos,
              rawX: point.x,
              rawY: point.y,
              metadata: point.metadata,
            };
          })
          .sort((a, b) => {
            if (typeof a.rawX === 'number' && typeof b.rawX === 'number') {
              return a.rawX - b.rawX;
            }
            return String(a.rawX).localeCompare(String(b.rawX));
          });

        return {
          ...series,
          color,
          points,
        };
      });

      return {
        xLabels: allXValues,
        yMin: minY,
        yMax: maxY,
        normalizedSeries: normalized,
        yScale,
      };
    }, [seriesArray, chartColors, startYAxisAtZero]);

    // SVG viewBox für Responsivität
    const viewBoxWidth = 1000;
    const viewBoxHeight = Math.round(viewBoxWidth / aspectRatio);

    // Linienpfad für jede Serie generieren
    const generateLinePath = (points: { x: number; y: number }[]) => {
      if (points.length === 0) return '';

      const pathParts = points.map((point, i) => {
        // Explizite Typumwandlungen, da drawingWidth sowohl string als auch number sein kann
        const x = paddingLeft + point.x * (typeof drawingWidth === 'number' ? drawingWidth : 0);
        const y = paddingTop + point.y * drawingHeight;

        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      });

      return pathParts.join(' ');
    };

    // Pfad für gefüllte Fläche unter der Linie
    const generateAreaPath = (points: { x: number; y: number }[]) => {
      if (points.length === 0) return '';

      const first = points[0];
      const last = points[points.length - 1];
      const startX = paddingLeft + first.x * (typeof drawingWidth === 'number' ? drawingWidth : 0);
      const startY = paddingTop + drawingHeight;
      const endX = paddingLeft + last.x * (typeof drawingWidth === 'number' ? drawingWidth : 0);

      const line = generateLinePath(points);
      return `${line} L ${endX} ${startY} L ${startX} ${startY} Z`;
    };

    // Dasharray für verschiedene Linientypen
    const getLineStyle = (lineType: LineChartSeries['lineType'] = 'solid') => {
      switch (lineType) {
        case 'dashed':
          return '6,4';
        case 'dotted':
          return '2,2';
        default:
          return 'none';
      }
    };

    // Y-Achsen-Ticks berechnen
    const yAxisTicks = useMemo(() => {
      const tickCount = 5;
      const step = (yMax - yMin) / (tickCount - 1);

      return Array.from({ length: tickCount }, (_, i) => {
        const value = yMin + step * i;
        const position = yScale(value);
        return {
          value,
          position,
          label: formatYLabel(value),
        };
      });
    }, [yMin, yMax, yScale, formatYLabel]);

    // X-Achsen-Ticks berechnen
    const xAxisTicks = useMemo(() => {
      // Bei zu vielen Labels nur eine Teilmenge anzeigen
      const maxVisibleLabels = 10;
      const visibleIndexes: number[] = [];

      if (xLabels.length <= maxVisibleLabels) {
        // Alle Labels anzeigen, wenn es nicht zu viele sind
        visibleIndexes.push(...Array.from({ length: xLabels.length }, (_, i) => i));
      } else {
        // Ersten und letzten Wert immer anzeigen + regelmäßige Intervalle
        visibleIndexes.push(0);

        const step = Math.ceil(xLabels.length / (maxVisibleLabels - 2));
        for (let i = step; i < xLabels.length - 1; i += step) {
          visibleIndexes.push(i);
        }

        visibleIndexes.push(xLabels.length - 1);
      }

      return visibleIndexes.map((index) => {
        const value = xLabels[index];
        const position = index / Math.max(1, xLabels.length - 1);
        return {
          value,
          position,
          label: formatXLabel(value),
        };
      });
    }, [xLabels, formatXLabel]);

    return (
      <svg
        ref={ref}
        className={`w-full ${className}`}
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
        {...rest}
      >
        {title && (
          <text
            className="chart-title"
            x={
              paddingLeft +
              (typeof drawingWidth === 'number' ? drawingWidth / 2 : numericDrawingWidth / 2)
            }
            y={paddingTop / 2}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize="14"
            fontWeight="bold"
          >
            {title}
          </text>
        )}
        {/* Hintergrund */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth}
          height={drawingHeight}
          fill={themeMode === 'dark' ? '#1F2937' : '#F9FAFB'}
          strokeWidth={1}
          stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
        />

        {/* Grid-Linien */}
        {showGrid && (
          <g className="grid-lines">
            {/* Horizontale Grid-Linien (Y-Achse) */}
            {yAxisTicks.map((tick) => (
              <line
                key={`y-grid-${tick.value}`}
                x1={paddingLeft}
                y1={paddingTop + tick.position * drawingHeight}
                x2={
                  paddingLeft +
                  (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y2={paddingTop + tick.position * drawingHeight}
                stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}

            {/* Vertikale Grid-Linien (X-Achse) */}
            {xAxisTicks.map((tick) => (
              <line
                key={`x-grid-${tick.value}`}
                x1={
                  paddingLeft +
                  tick.position *
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y1={paddingTop}
                x2={
                  paddingLeft +
                  tick.position *
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y2={paddingTop + drawingHeight}
                stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
          </g>
        )}

        {/* Datenlinien */}
        <g className="data-lines">
          {normalizedSeries.map((series) => (
            <g key={series.id} className="data-series">
              {showArea && (
                <path
                  d={generateAreaPath(series.points)}
                  fill={series.color}
                  opacity={0.2}
                  className="area"
                />
              )}
              {/* Linie */}
              <path
                d={generateLinePath(series.points)}
                fill="none"
                stroke={series.color}
                strokeWidth={series.lineWidth || 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={getLineStyle(series.lineType)}
                className={`line ${animated ? 'animate-draw' : ''}`}
                style={
                  animated
                    ? {
                        strokeDasharray: '1000',
                        strokeDashoffset: '1000',
                        animation: 'draw 1.5s ease-in-out forwards',
                      }
                    : {}
                }
              />

              {/* Datenpunkte */}
              {showPoints &&
                series.points.map((point, i) => (
                  <circle
                    key={`${series.id}-point-${i}`}
                    cx={
                      paddingLeft +
                      point.x *
                        (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                    }
                    cy={paddingTop + point.y * drawingHeight}
                    r={4}
                    fill={themeMode === 'dark' ? '#1F2937' : '#FFFFFF'}
                    stroke={series.color}
                    strokeWidth={2}
                    className={`data-point ${animated ? 'animate-fade-in' : ''}`}
                    style={
                      animated
                        ? {
                            opacity: 0,
                            animation: 'fadeIn 0.3s ease-in-out forwards 1.5s',
                          }
                        : {}
                    }
                  />
                ))}

              {showValues &&
                series.points.map((point, i) => (
                  <text
                    key={`${series.id}-label-${i}`}
                    x={
                      paddingLeft +
                      point.x *
                        (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                    }
                    y={paddingTop + point.y * drawingHeight - 8}
                    textAnchor="middle"
                    className="value-label"
                    fill={valueTextColor || (themeMode === 'dark' ? '#D1D5DB' : '#4B5563')}
                    fontSize="12"
                  >
                    {formatYLabel(point.rawY ?? 0)}
                  </text>
                ))}
            </g>
          ))}
        </g>

        {/* Y-Achse */}
        <g className="y-axis">
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + drawingHeight}
            stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
            strokeWidth={1}
          />

          {/* Y-Achsen-Ticks und Labels */}
          {yAxisTicks.map((tick) => (
            <g key={`y-tick-${tick.value}`}>
              <line
                x1={paddingLeft - 5}
                y1={paddingTop + tick.position * drawingHeight}
                x2={paddingLeft}
                y2={paddingTop + tick.position * drawingHeight}
                stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 10}
                y={paddingTop + tick.position * drawingHeight}
                textAnchor="end"
                dominantBaseline="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize="12"
              >
                {tick.label}
                {units?.y ? ` ${units.y}` : ''}
              </text>
            </g>
          ))}

          {/* Y-Achsentitel */}
          {axisLabels?.y && (
            <text
              transform={`rotate(-90, ${paddingLeft / 3}, ${paddingTop + drawingHeight / 2})`}
              x={paddingLeft / 3}
              y={paddingTop + drawingHeight / 2}
              textAnchor="middle"
              fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
              fontSize="12"
              fontWeight="bold"
            >
              {axisLabels.y}
            </text>
          )}
        </g>

        {/* X-Achse */}
        <g className="x-axis">
          <line
            x1={paddingLeft}
            y1={paddingTop + drawingHeight}
            x2={
              paddingLeft + (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
            }
            y2={paddingTop + drawingHeight}
            stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
            strokeWidth={1}
          />

          {/* X-Achsen-Ticks und Labels */}
          {xAxisTicks.map((tick) => (
            <g key={`x-tick-${tick.value}`}>
              <line
                x1={
                  paddingLeft +
                  tick.position *
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y1={paddingTop + drawingHeight}
                x2={
                  paddingLeft +
                  tick.position *
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y2={paddingTop + drawingHeight + 5}
                stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
                strokeWidth={1}
              />
              <text
                x={
                  paddingLeft +
                  tick.position *
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth)
                }
                y={paddingTop + drawingHeight + 20}
                textAnchor="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize="12"
              >
                {tick.label}
                {units?.x ? ` ${units.x}` : ''}
              </text>
            </g>
          ))}

          {/* X-Achsentitel */}
          {axisLabels?.x && (
            <text
              x={
                paddingLeft +
                (typeof drawingWidth === 'number' ? drawingWidth / 2 : numericDrawingWidth / 2)
              }
              y={height - 10}
              textAnchor="middle"
              fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
              fontSize="12"
              fontWeight="bold"
            >
              {axisLabels.x}
            </text>
          )}
        </g>

        {/* Legende */}
        {showLegend && (
          <g className="chart-legend">
            {/* Positionierung der Legende basierend auf legendPosition */}
            {(() => {
              const legendY =
                legendPosition === 'top'
                  ? 10
                  : legendPosition === 'bottom'
                    ? height - 10 - seriesArray.length * 20
                    : paddingTop + 10;

              const legendX =
                legendPosition === 'right'
                  ? paddingLeft +
                    (typeof drawingWidth === 'number' ? drawingWidth : numericDrawingWidth) +
                    10
                  : legendPosition === 'left'
                    ? 10
                    : paddingLeft + 10;

              return (
                <g transform={`translate(${legendX}, ${legendY})`}>
                  {normalizedSeries.map((series, index) => (
                    <g key={`legend-${series.id}`} transform={`translate(0, ${index * 20})`}>
                      <rect width={12} height={12} fill={series.color} rx={2} />
                      <text
                        x={20}
                        y={10}
                        dominantBaseline="middle"
                        fill={legendTextColor || (themeMode === 'dark' ? '#D1D5DB' : '#4B5563')}
                        fontSize="12"
                      >
                        {series.name}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })()}
          </g>
        )}

        {/* Stile für Animationen */}
        <defs>
          <style>
            {`
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }
          `}
          </style>
        </defs>
      </svg>
    );
  }
);

LineChart.displayName = 'LineChart';

// Add CSS classes from LineChart.css
LineChart.defaultProps = {
  className: 'smolitux-line-chart',
};

export default LineChart;
