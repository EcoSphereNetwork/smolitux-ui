// packages/@smolitux/charts/src/components/PieChart/PieChart.tsx
import React, { useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

// Proper typing for theme object
interface Theme {
  themeMode?: 'light' | 'dark';
  [key: string]: any;
}

export interface PieChartDataPoint {
  /** Label für das Segment */
  label: string;
  /** Wert des Segments */
  value: number;
  /** Optional: Farbe des Segments */
  color?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}

export interface PieChartProps extends React.SVGProps<SVGSVGElement> {
  /** Daten für das Pie Chart */
  data: PieChartDataPoint[];
  /** Höhe des Charts */
  height?: number;
  /** Breite des Charts (Default: 100%) */
  width?: number | string;
  /** Padding innerhalb des Charts */
  padding?: number;
  /** Chart-Titel */
  title?: string;
  /** Einheit für Werte */
  valueUnit?: string;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Animation aktivieren */
  animated?: boolean;
  /** Donut-Chart statt Pie-Chart */
  donut?: boolean;
  /** Donut-Breite (nur wenn donut=true) */
  donutWidth?: number;
  /** Prozentwerte innerhalb der Segmente anzeigen */
  showValues?: boolean;
  /** Werte innerhalb der Segmente anzeigen */
  showLabels?: boolean;
  /** Eigene Formatierung für Werte */
  formatValue?: (value: number, percentage: number) => string;
  /** Angepasste Farben für die Segmente */
  colors?: string[];
  /** Aktives Segment (für Interaktivität) */
  activeSegment?: string | number;
  /** Rotationswinkel (in Grad) */
  startAngle?: number;
  /** Für responsive SVG (viewBox) */
  aspectRatio?: number;
  /** Callback bei Klick auf Segment */
  onSegmentClick?: (segment: PieChartDataPoint, index: number) => void;
  /** Slices hervorheben */
  explode?: number[];
  /** Farbe der Werte */
  valueTextColor?: string;
  /** Farbe der Legende */
  legendTextColor?: string;
}

/**
 * PieChart-Komponente für kategoriale Daten
 *
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { label: 'A', value: 30 },
 *     { label: 'B', value: 45 },
 *     { label: 'C', value: 25 }
 *   ]}
 *   height={300}
 *   showLegend
 *   showValues
 * />
 * ```
 */
export const PieChart = forwardRef<SVGSVGElement, PieChartProps>(
  (
    {
      data,
      height = 300,
      width = '100%',
      padding = 30,
      title,
      valueUnit,
      showLegend = true,
      legendPosition = 'bottom',
      animated = true,
      donut = false,
      donutWidth = 60,
      showValues = false,
      showLabels = false,
      formatValue = (value, percentage) => `${percentage.toFixed(1)}%`,
      colors,
      activeSegment,
      startAngle = 0,
      aspectRatio = 1,
      onSegmentClick,
      explode,
      valueTextColor,
      legendTextColor,
      className = '',
      ...rest
    },
    ref
  ) => {
    const theme = useTheme() as Theme;
    const themeMode = theme.themeMode ?? 'light';

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
      '#A855F7', // purple-500
      '#0EA5E9', // sky-500
      '#84CC16', // lime-500
      '#22D3EE', // cyan-400
      '#F472B6', // pink-400
    ];

    // Tatsächlich verwendete Farben
    const chartColors = colors || defaultColors;

    // Für SVG viewBox
    const viewBoxWidth = 100;
    const viewBoxHeight = viewBoxWidth / aspectRatio;

    // Berechnungen für die Segmente
    const { totalValue, normalizedData, segments, centerX, centerY, radius } = useMemo(() => {
      // Summe aller Werte
      const total = data.reduce((sum, item) => sum + item.value, 0);

      // Daten mit Prozentangaben und Farben anreichern
      const normalized = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        return {
          ...item,
          percentage,
          color: item.color || chartColors[index % chartColors.length],
        };
      });

      // Mittelpunkt des Charts
      const cX = viewBoxWidth / 2;
      const cY = viewBoxHeight / 2;

      // Radius unter Berücksichtigung des Paddings
      const r = Math.min(cX, cY) - (padding / 100) * Math.min(cX, cY);

      // Segmente berechnen
      const segs: Array<{
        path: string;
        centroid: [number, number];
        data: PieChartDataPoint & { percentage: number; color: string };
        isActive: boolean;
        index: number;
      }> = [];

      let currentAngle = (startAngle - 90) * (Math.PI / 180); // Start from top

      normalized.forEach((item, index) => {
        // Anteil am Kreis (in Radianten)
        const angleSize = (item.percentage / 100) * 2 * Math.PI;
        const endAngle = currentAngle + angleSize;

        // Bestimme, ob das Segment groß genug für einen Bogen ist
        const largeArcFlag = angleSize > Math.PI ? 1 : 0;

        // Punkte für den Pfad berechnen
        const startX = cX + r * Math.cos(currentAngle);
        const startY = cY + r * Math.sin(currentAngle);
        const endX = cX + r * Math.cos(endAngle);
        const endY = cY + r * Math.sin(endAngle);

        let path;

        if (donut) {
          // Innerer Radius für Donut-Chart
          const innerRadius = r - (donutWidth / 100) * r;

          // Punkte für den inneren Kreis
          const innerStartX = cX + innerRadius * Math.cos(endAngle);
          const innerStartY = cY + innerRadius * Math.sin(endAngle);
          const innerEndX = cX + innerRadius * Math.cos(currentAngle);
          const innerEndY = cY + innerRadius * Math.sin(currentAngle);

          // SVG-Pfad für Donut-Segment
          path = `
          M ${startX} ${startY}
          A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}
          L ${innerStartX} ${innerStartY}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}
          Z
        `;
        } else {
          // SVG-Pfad für reguläres Pie-Segment
          path = `
          M ${cX} ${cY}
          L ${startX} ${startY}
          A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `;
        }

        // Mittelpunkt des Segments für Label-Platzierung
        // Etwas weiter außen für bessere Lesbarkeit
        const labelRadius = donut ? r - (donutWidth / 2 / 100) * r : r * 0.65;

        const midAngle = currentAngle + angleSize / 2;
        const centroidX = cX + labelRadius * Math.cos(midAngle);
        const centroidY = cY + labelRadius * Math.sin(midAngle);

        // Zum Segments-Array hinzufügen
        segs.push({
          path,
          centroid: [centroidX, centroidY],
          data: item,
          isActive:
            activeSegment !== undefined
              ? typeof activeSegment === 'string'
                ? item.label === activeSegment
                : index === activeSegment
              : false,
          index,
        });

        // Aktualisiere den Startpunkt für das nächste Segment
        currentAngle = endAngle;
      });

      return {
        totalValue: total,
        normalizedData: normalized,
        segments: segs,
        centerX: cX,
        centerY: cY,
        radius: r,
      };
    }, [data, donut, donutWidth, chartColors, startAngle, aspectRatio, padding, activeSegment]);

    // Legende generieren
    const renderLegend = () => {
      const legendItems = normalizedData.map((item, index) => (
        <div
          key={`legend-${index}`}
          className={`flex items-center mb-1 cursor-pointer ${activeSegment !== undefined && !segments[index].isActive ? 'opacity-60' : ''}`}
          onClick={() => onSegmentClick && onSegmentClick(item, index)}
        >
          <div className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: item.color }} />
          <div className="text-xs">
            <span className="legend-label font-medium" style={{ color: legendTextColor }}>
              {item.label}
            </span>
            <span
              className="ml-2 text-gray-500 dark:text-gray-400"
              style={{ color: legendTextColor }}
            >
              {item.value}
              {valueUnit ? ` ${valueUnit}` : ''} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      ));

      const legendClasses = {
        top: 'mb-4',
        right: 'ml-4',
        bottom: 'mt-4',
        left: 'mr-4',
      };

      const isVertical = legendPosition === 'left' || legendPosition === 'right';

      return (
        <div
          className={`${legendClasses[legendPosition]} ${isVertical ? 'flex-shrink-0' : 'w-full'}`}
        >
          <div className={`${isVertical ? 'flex flex-col' : 'flex flex-wrap'}`}>{legendItems}</div>
        </div>
      );
    };

    // Container-Stil bei horizontaler Legende
    const containerStyle = {
      display: 'flex',
      flexDirection: legendPosition === 'left' || legendPosition === 'right' ? 'row' : 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    } as React.CSSProperties;

    // Reihenfolge der Legende
    const legendOrder = {
      top: 0,
      left: 0,
      right: 2,
      bottom: 2,
    };

    // Chart-Order
    const chartOrder = 1;

    // Styling basierend auf der Legendenposition
    const legendStyles = {
      display: 'flex',
      flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row',
      order: legendOrder[legendPosition],
    } as React.CSSProperties;

    const chartStyles = {
      order: chartOrder,
    } as React.CSSProperties;

    return (
      <div className={`w-full ${className}`} style={containerStyle}>
        {/* Legende wenn Position top oder left */}
        {showLegend && (legendPosition === 'top' || legendPosition === 'left') && (
          <div style={legendStyles}>{renderLegend()}</div>
        )}

        {/* Chart */}
        <div style={chartStyles}>
          <svg
            ref={ref}
            width={width}
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            role="img"
            aria-label={rest['aria-label']}
            className={`smolitux-pie-chart ${className}`}
            preserveAspectRatio="xMidYMid meet"
            {...rest}
          >
            {/* Titel */}
            {title && (
              <text
                className="chart-title"
                x={viewBoxWidth / 2}
                y={((padding / 100) * viewBoxHeight) / 2}
                textAnchor="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize="5px"
                fontWeight="bold"
              >
                {title}
              </text>
            )}

            {/* Segmente */}
            <g>
              {segments.map((segment, index) => (
                <g key={`segment-${index}`}>
                  <path
                    d={segment.path}
                    fill={segment.data.color}
                    stroke={themeMode === 'dark' ? '#1F2937' : 'white'}
                    strokeWidth="0.5"
                    className={`
                    ${animated ? 'transition-opacity duration-300' : ''}
                    ${activeSegment !== undefined && !segment.isActive ? 'opacity-50' : 'opacity-100'}
                    ${onSegmentClick ? 'cursor-pointer hover:opacity-80' : ''}
                  `}
                    onClick={() => onSegmentClick && onSegmentClick(segment.data, index)}
                  >
                    {animated && (
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        dur="0.8s"
                        begin={`${index * 0.1}s`}
                        fill="freeze"
                      />
                    )}
                  </path>

                  {/* Werte im Segment */}
                  {showValues && segment.data.percentage > 5 && (
                    <text
                      x={segment.centroid[0]}
                      y={segment.centroid[1]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="value-label text-xs font-bold"
                      fill={valueTextColor || '#ffffff'}
                      style={{ fontSize: '3px', textShadow: '0px 0px 2px rgba(0,0,0,0.5)' }}
                    >
                      {formatValue(segment.data.value, segment.data.percentage)}
                    </text>
                  )}

                  {/* Labels außerhalb des Segments */}
                  {showLabels && segment.data.percentage > 3 && (
                    <text
                      x={segment.centroid[0]}
                      y={segment.centroid[1]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`
                      ${donut ? 'fill-gray-900 dark:fill-white' : 'fill-white'}
                      text-xs font-medium
                    `}
                      style={{ fontSize: '2.5px' }}
                    >
                      {segment.data.label}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Mitte für Donut-Chart */}
            {donut && (
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - (donutWidth / 100) * radius}
                fill={themeMode === 'dark' ? '#1F2937' : 'white'}
              />
            )}

            {/* Gesamtwert in der Mitte (für Donut-Chart) */}
            {donut && (
              <g>
                <text
                  x={centerX}
                  y={centerY - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-900 dark:fill-white text-sm font-bold"
                  style={{ fontSize: '4px' }}
                >
                  {totalValue}
                </text>
                {valueUnit && (
                  <text
                    x={centerX}
                    y={centerY + 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-500 dark:fill-gray-400 text-xs"
                    style={{ fontSize: '3px' }}
                  >
                    {valueUnit}
                  </text>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* Legende wenn Position bottom oder right */}
        {showLegend && (legendPosition === 'bottom' || legendPosition === 'right') && (
          <div style={legendStyles}>{renderLegend()}</div>
        )}

        {/* Animation-Styles */}
        <style>{`
        @keyframes fillIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      </div>
    );
  }
);

PieChart.displayName = 'PieChart';

export default PieChart;
