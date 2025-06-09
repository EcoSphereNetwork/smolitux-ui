// packages/@smolitux/charts/src/components/AreaChart/AreaChart.tsx
import React, { useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

interface Theme {
  themeMode?: 'light' | 'dark';
  [key: string]: unknown;
}

export interface AreaChartDataPoint {
  /** X-Wert (Label) */
  x: string | number;
  /** Y-Wert (Datenpunkt) */
  y: number;
  /** Optional: Kategorie für Multi-Serien Charts */
  category?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, unknown>;
}

export interface AreaChartSeries {
  /** ID der Serie */
  id: string;
  /** Name der Serie (für Legende) */
  name: string;
  /** Farbe der Serie */
  color?: string;
  /** Füllung (z.B. für Gradient) */
  fill?: string;
  /** Daten der Serie */
  data: AreaChartDataPoint[];
  /** Liniendicke */
  strokeWidth?: number;
  /** Durchschnittslinie anzeigen */
  showAverage?: boolean;
}

export interface AreaChartProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Einzelne Datenserie oder Array von Serien */
  data: AreaChartSeries | AreaChartSeries[];
  /** Höhe des Charts */
  height?: number;
  /** Breite des Charts (Default: 100%) */
  width?: number | string;
  /** Padding innerhalb des Charts */
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Chart-Titel */
  title?: string;
  /** Achsentitel */
  axisLabels?: { x?: string; y?: string };
  /** Einheiten für Achsenbeschriftungen */
  units?: { x?: string; y?: string };
  /** Grid-Linien anzeigen */
  showGrid?: boolean;
  /** Datenpunkte anzeigen */
  showPoints?: boolean;
  /** Tooltips anzeigen */
  showTooltips?: boolean;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
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
  /** Füllung für Bereich unter der Kurve */
  filled?: boolean;
  /** Gestapelte Bereiche (für mehrere Serien) */
  stacked?: boolean;
  /** Unteres Limit für den Bereich */
  areaBaseValue?: number;
}

/**
 * AreaChart-Komponente für Zeitreihen und kontinuierliche Daten
 */
export const AreaChart = forwardRef<SVGSVGElement, AreaChartProps>(
  (
    {
      data,
      height = 300,
      width = '100%',
      padding = { top: 30, right: 30, bottom: 40, left: 50 },
      title,
      axisLabels,
      units,
      showGrid = true,
      showPoints = true,
      showTooltips = true,
      showLegend = true,
      legendPosition = 'top',
      animated = true,
      startYAxisAtZero = true,
      colors,
      formatYLabel = (value) => `${value}`,
      formatXLabel = (value) => `${value}`,
      aspectRatio = 16 / 9,
      filled = true,
      stacked = false,
      areaBaseValue,
      className = '',
      ...rest
    },
    ref
  ) => {
    const theme = useTheme() as Theme;
    const themeMode = theme.themeMode ?? 'light';

    const seriesArray = Array.isArray(data) ? data : [data];

    const defaultColors = [
      '#3B82F6',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#8B5CF6',
      '#EC4899',
      '#06B6D4',
      '#14B8A6',
      '#F97316',
      '#6366F1',
    ];
    const chartColors = colors || defaultColors;

    const paddingTop = padding.top ?? 30;
    const paddingRight = padding.right ?? 30;
    const paddingBottom = padding.bottom ?? 40;
    const paddingLeft = padding.left ?? 50;

    const drawingWidth = typeof width === 'number' ? width - paddingLeft - paddingRight : 0;
    const drawingHeight = height - paddingTop - paddingBottom;

    const viewBoxWidth = 1000;
    const viewBoxHeight = Math.round(viewBoxWidth / aspectRatio);

    const baseValue =
      areaBaseValue !== undefined ? areaBaseValue : startYAxisAtZero ? 0 : undefined;

    const { xLabels, yMin, yMax, normalizedSeries } = useMemo(() => {
      const allXValues = seriesArray
        .flatMap((s) => s.data.map((d) => d.x))
        .filter((v, i, self) => self.indexOf(v) === i)
        .sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') return a - b;
          return String(a).localeCompare(String(b));
        });

      let minY = startYAxisAtZero ? 0 : Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      if (stacked) {
        const totals = allXValues.map((x) => {
          return seriesArray.reduce((sum, series) => {
            const pt = series.data.find((d) => d.x === x);
            return sum + (pt ? pt.y : 0);
          }, 0);
        });
        maxY = Math.max(...totals, maxY);
        if (!startYAxisAtZero) {
          minY = Math.min(...totals);
        }
      } else {
        seriesArray.forEach((series) => {
          series.data.forEach((point) => {
            if (point.y < minY) minY = point.y;
            if (point.y > maxY) maxY = point.y;
          });
        });
      }

      if (baseValue !== undefined && baseValue < minY) {
        minY = baseValue;
      }

      if (minY === maxY) {
        if (minY === 0) {
          maxY = 1;
        } else {
          minY = startYAxisAtZero ? 0 : minY * 0.9;
          maxY = maxY * 1.1;
        }
      }

      const yScale = (value: number) => 1 - (value - minY) / (maxY - minY);

      const stackedOffsets = allXValues.map(() => baseValue ?? minY);

      const normalized = seriesArray.map((series, index) => {
        const color = series.color || chartColors[index % chartColors.length];
        const points = allXValues.map((x, xi) => {
          const pt = series.data.find((d) => d.x === x);
          const value = pt ? pt.y : 0;
          const stackedValue = stacked ? stackedOffsets[xi] + value : value;
          const base = stacked ? stackedOffsets[xi] : (baseValue ?? minY);
          if (stacked) stackedOffsets[xi] += value;
          return {
            xIndex: xi,
            value,
            stackedValue,
            base,
            normalizedY: yScale(stackedValue),
            normalizedBase: yScale(base),
          };
        });
        return { ...series, color, points };
      });

      return { xLabels: allXValues, yMin: minY, yMax: maxY, normalizedSeries: normalized };
    }, [seriesArray, chartColors, stacked, startYAxisAtZero, baseValue]);

    const yScale = (value: number) => 1 - (value - yMin) / (yMax - yMin);

    const yAxisTicks = useMemo(() => {
      const tickCount = 5;
      const step = (yMax - yMin) / (tickCount - 1);
      return Array.from({ length: tickCount }, (_, i) => {
        const value = yMin + step * i;
        return {
          value,
          label: formatYLabel(value),
          position: yScale(value),
        };
      });
    }, [yMin, yMax, formatYLabel]);

    const xAxisTicks = useMemo(() => {
      const maxVisible = 10;
      const indexes: number[] = [];
      if (xLabels.length <= maxVisible) {
        indexes.push(...Array.from({ length: xLabels.length }, (_, i) => i));
      } else {
        indexes.push(0);
        const step = Math.ceil(xLabels.length / (maxVisible - 2));
        for (let i = step; i < xLabels.length - 1; i += step) indexes.push(i);
        indexes.push(xLabels.length - 1);
      }
      return indexes.map((i) => ({
        value: xLabels[i],
        position: i / Math.max(1, xLabels.length - 1),
        label: formatXLabel(xLabels[i]),
      }));
    }, [xLabels, formatXLabel]);

    const generateAreaPath = (
      points: { xIndex: number; normalizedY: number; normalizedBase: number }[]
    ) => {
      if (points.length === 0) return '';
      const path = points.map((p, idx) => {
        const x = paddingLeft + (p.xIndex / Math.max(1, xLabels.length - 1)) * drawingWidth;
        const y = paddingTop + p.normalizedY * drawingHeight;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      const last = points[points.length - 1];
      const first = points[0];
      path.push(
        `L ${paddingLeft + (last.xIndex / Math.max(1, xLabels.length - 1)) * drawingWidth} ${paddingTop + last.normalizedBase * drawingHeight}`
      );
      path.push(
        `L ${paddingLeft + (first.xIndex / Math.max(1, xLabels.length - 1)) * drawingWidth} ${paddingTop + first.normalizedBase * drawingHeight} Z`
      );
      return path.join(' ');
    };

    const interactive = showPoints || showTooltips;

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        role="img"
        aria-label={rest['aria-label']}
        tabIndex={interactive ? 0 : undefined}
        className={`smolitux-area-chart ${className}`}
        {...rest}
      >
        {/* Hintergrund */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={drawingWidth}
          height={drawingHeight}
          fill={themeMode === 'dark' ? '#1F2937' : '#F9FAFB'}
          stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
          strokeWidth={1}
        />

        {/* Grid-Linien */}
        {showGrid && (
          <g className="grid-lines">
            {yAxisTicks.map((tick) => (
              <line
                key={`y-${tick.value}`}
                x1={paddingLeft}
                y1={paddingTop + tick.position * drawingHeight}
                x2={paddingLeft + drawingWidth}
                y2={paddingTop + tick.position * drawingHeight}
                stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
            {xAxisTicks.map((tick) => (
              <line
                key={`x-${tick.value}`}
                x1={paddingLeft + tick.position * drawingWidth}
                y1={paddingTop}
                x2={paddingLeft + tick.position * drawingWidth}
                y2={paddingTop + drawingHeight}
                stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
          </g>
        )}

        {/* Datenbereiche */}
        <g className="data-areas">
          {normalizedSeries.map((series) => (
            <g key={series.id} className="series-area">
              <path
                d={generateAreaPath(series.points)}
                fill={filled ? series.color : 'none'}
                stroke={series.color}
                strokeWidth={series.strokeWidth || 2}
                opacity={filled ? 0.4 : 1}
              />
              {showPoints &&
                series.points.map((p, i) => (
                  <circle
                    key={`pt-${series.id}-${i}`}
                    cx={paddingLeft + (p.xIndex / Math.max(1, xLabels.length - 1)) * drawingWidth}
                    cy={paddingTop + p.normalizedY * drawingHeight}
                    r={4}
                    fill={themeMode === 'dark' ? '#1F2937' : '#FFFFFF'}
                    stroke={series.color}
                    strokeWidth={2}
                  />
                ))}
            </g>
          ))}
        </g>

        {/* Chart-Titel */}
        {title && (
          <text
            className="chart-title"
            x={paddingLeft + drawingWidth / 2}
            y={paddingTop - 10}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize="16"
            fontWeight="bold"
          >
            {title}
          </text>
        )}

        {/* X-Achse */}
        <g className="x-axis">
          <line
            x1={paddingLeft}
            y1={paddingTop + drawingHeight}
            x2={paddingLeft + drawingWidth}
            y2={paddingTop + drawingHeight}
            stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
            strokeWidth={1}
          />
          {xAxisTicks.map((tick) => (
            <g key={`x-tick-${tick.value}`}>
              <line
                x1={paddingLeft + tick.position * drawingWidth}
                y1={paddingTop + drawingHeight}
                x2={paddingLeft + tick.position * drawingWidth}
                y2={paddingTop + drawingHeight + 5}
                stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
                strokeWidth={1}
              />
              <text
                x={paddingLeft + tick.position * drawingWidth}
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
          {axisLabels?.x && (
            <text
              className="x-axis-label"
              x={paddingLeft + drawingWidth / 2}
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
          {axisLabels?.y && (
            <text
              className="y-axis-label"
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

        {/* Legende */}
        {showLegend && (
          <g className="chart-legend">
            {(() => {
              const legendY =
                legendPosition === 'top'
                  ? 10
                  : legendPosition === 'bottom'
                    ? height - 10 - seriesArray.length * 20
                    : paddingTop + 10;
              const legendX =
                legendPosition === 'right'
                  ? paddingLeft + drawingWidth + 10
                  : legendPosition === 'left'
                    ? 10
                    : paddingLeft + 10;
              return (
                <g transform={`translate(${legendX}, ${legendY})`}>
                  {normalizedSeries.map((series, idx) => (
                    <g key={`legend-${series.id}`} transform={`translate(0, ${idx * 20})`}>
                      <rect width={12} height={12} fill={series.color} rx={2} />
                      <text
                        x={20}
                        y={10}
                        dominantBaseline="middle"
                        fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
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
      </svg>
    );
  }
);

AreaChart.displayName = 'AreaChart';

AreaChart.defaultProps = {
  className: 'smolitux-area-chart',
};

export default AreaChart;
