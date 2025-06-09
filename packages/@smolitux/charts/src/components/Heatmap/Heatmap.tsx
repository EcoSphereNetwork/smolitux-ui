// packages/@smolitux/charts/src/components/Heatmap/Heatmap.tsx
import React, { useMemo, forwardRef, useState } from 'react';
import { useTheme } from '@smolitux/theme';

export interface HeatmapDataPoint {
  /** X-Wert (Spalte) */
  x: string | number;
  /** Y-Wert (Zeile) */
  y: string | number;
  /** Wert für die Farbintensität */
  value: number;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, unknown>;
}

export interface HeatmapColorScale {
  /** Art der Farbskala */
  type: 'sequential' | 'diverging' | 'categorical';
  /** Farben für die Skala (mindestens 2) */
  colors: string[];
  /** Minimaler Wert für die Skala */
  min?: number;
  /** Maximaler Wert für die Skala */
  max?: number;
  /** Mittelpunkt für divergierende Skalen */
  center?: number;
}

export interface HeatmapAxisConfig {
  /** Achsentitel */
  title?: string;
  /** Benutzerdefinierte Achsenbeschriftungen */
  labels?: (string | number)[];
  /** Rotation der Achsenbeschriftungen (in Grad) */
  labelRotation?: number;
}

export interface HeatmapProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Daten für die Heatmap */
  data: HeatmapDataPoint[];
  /** Höhe der Heatmap */
  height?: number;
  /** Breite der Heatmap (Default: 100%) */
  width?: number | string;
  /** Padding innerhalb der Heatmap */
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Titel der Heatmap */
  title?: string;
  /** X-Achsen-Konfiguration */
  xAxis?: HeatmapAxisConfig;
  /** Y-Achsen-Konfiguration */
  yAxis?: HeatmapAxisConfig;
  /** Größe der Zellen (definiert als Quadrat) */
  cellSize?: number | { width: number; height: number };
  /** Abstand zwischen Zellen */
  cellGap?: number;
  /** Anpassbare Farbskala */
  colorScale?: HeatmapColorScale;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Zellwerte anzeigen */
  showValues?: boolean;
  /** Formatierung für Zellwerte */
  formatValue?: (value: number) => string;
  /** Tooltips anzeigen */
  showTooltips?: boolean;
  /** Animation aktivieren */
  animated?: boolean;
  /** Rand um Zellen anzeigen */
  showCellBorder?: boolean;
  /** Für responsive SVG (viewBox) */
  aspectRatio?: number;
  /** Callback bei Klick auf Zelle */
  onCellClick?: (cell: HeatmapDataPoint) => void;
}



/**
 * Heatmap-Komponente für zweidimensionale Datenvisualisierung
 *
 * @example
 * ```tsx
 * <Heatmap
 *   data={[
 *     { x: 'A', y: '1', value: 10 },
 *     { x: 'B', y: '1', value: 20 },
 *     { x: 'A', y: '2', value: 30 },
 *     { x: 'B', y: '2', value: 40 }
 *   ]}
 *   colorScale={{
 *     type: 'sequential',
 *     colors: ['#f7fbff', '#08306b']
 *   }}
 *   cellSize={40}
 *   showLegend
 * />
 * ```
 */
export const Heatmap = forwardRef<SVGSVGElement, HeatmapProps>(
  (
    {
      data,
      height = 400,
      width = '100%',
      padding = { top: 40, right: 30, bottom: 50, left: 60 },
      title,
      xAxis,
      yAxis,
      cellSize = 40,
      cellGap = 1,
      colorScale = {
        type: 'sequential',
        colors: ['#f7fbff', '#08306b'],
        min: undefined,
        max: undefined,
      },
      showLegend = true,
      legendPosition = 'bottom',
      showValues = false,
      formatValue = (value) => `${value}`,
      showTooltips = true,
      animated = true,
      showCellBorder = true,
      aspectRatio = 1,
      onCellClick,
      className = '',
      ...rest
    },
    ref
  ) => {
    const { mode: themeMode } = useTheme();

    // Hover state for tooltips
    const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

    // Padding-Werte mit Defaults
    const paddingTop = padding.top ?? 40;
    const paddingRight = padding.right ?? 30;
    const paddingBottom = padding.bottom ?? 50;
    const paddingLeft = padding.left ?? 60;

    // Cell size can be a number or an object
    const cellWidth = typeof cellSize === 'number' ? cellSize : cellSize.width;
    const cellHeight = typeof cellSize === 'number' ? cellSize : cellSize.height;

    // SVG viewBox für Responsivität
    const viewBoxWidth = 1000;
    const viewBoxHeight = Math.round(viewBoxWidth / aspectRatio);

    // Datenaufbereitung für die Heatmap
    const { processedData, xLabels, yLabels, minValue, maxValue, colorMapper } = useMemo(() => {
      // Eindeutige X- und Y-Werte extrahieren und sortieren
      const uniqueXValues = Array.from(new Set(data.map((d) => d.x))).sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });

      const uniqueYValues = Array.from(new Set(data.map((d) => d.y))).sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });

      // Benutzerdefinierte Labels verwenden, falls angegeben
      const xLabelsToUse = xAxis?.labels || uniqueXValues;
      const yLabelsToUse = yAxis?.labels || uniqueYValues;

      // Min/Max-Werte für die Farbskalierung ermitteln
      const dataMin = Math.min(...data.map((d) => d.value));
      const dataMax = Math.max(...data.map((d) => d.value));

      // Tatsächliche Min/Max-Werte (unter Berücksichtigung der benutzerdefinierten Werte)
      const minVal = colorScale.min !== undefined ? colorScale.min : dataMin;
      const maxVal = colorScale.max !== undefined ? colorScale.max : dataMax;

      // Mittelpunkt für divergierende Skalen
      const centerVal = colorScale.center !== undefined ? colorScale.center : (minVal + maxVal) / 2;

      // Funktion zum Mappen von Werten auf Farben
      const getColorForValue = (value: number): string => {
        const { type, colors } = colorScale;

        // Sicherstellen, dass mindestens 2 Farben vorhanden sind
        if (colors.length < 2) {
          console.warn('Mindestens 2 Farben für die Farbskala benötigt');
          return colors[0] || '#000000';
        }

        switch (type) {
          case 'categorical':
            // Für kategoriale Daten: Index in der Farbliste
            const normalizedIndex = Math.max(
              0,
              Math.min(
                Math.floor(((value - minVal) / (maxVal - minVal)) * (colors.length - 1)),
                colors.length - 1
              )
            );
            return colors[normalizedIndex];

          case 'diverging':
            // Für divergierende Daten: Unterscheidung links/rechts vom Mittelpunkt
            if (value < centerVal) {
              // Wert ist links vom Mittelpunkt
              const normalizedVal = (value - minVal) / (centerVal - minVal);
              const colorIndex = Math.floor(normalizedVal * (colors.length / 2));
              return colors[colorIndex];
            } else {
              // Wert ist rechts vom Mittelpunkt
              const normalizedVal = (value - centerVal) / (maxVal - centerVal);
              const colorIndex = Math.floor(
                colors.length / 2 + normalizedVal * (colors.length / 2)
              );
              return colors[Math.min(colorIndex, colors.length - 1)];
            }

          case 'sequential':
          default:
            // Für sequentielle Daten: Lineares Mapping zwischen Min und Max
            const normalizedVal = (value - minVal) / (maxVal - minVal);
            if (normalizedVal <= 0) return colors[0];
            if (normalizedVal >= 1) return colors[colors.length - 1];

            const segment = normalizedVal * (colors.length - 1);
            const index = Math.floor(segment);
            const fraction = segment - index;

            // Interpolieren zwischen zwei benachbarten Farben
            if (index < colors.length - 1) {
              return interpolateColor(colors[index], colors[index + 1], fraction);
            }

            return colors[index];
        }
      };

      // Erstelle ein vollständiges Datenraster (einschließlich fehlender Werte)
      const processedDataMap = new Map<string, HeatmapDataPoint>();

      data.forEach((point) => {
        const key = `${point.x}-${point.y}`;
        processedDataMap.set(key, point);
      });

      // Matrix mit allen Kombinationen aus x und y erstellen
      const processed: HeatmapDataPoint[] = [];

      yLabelsToUse.forEach((y) => {
        xLabelsToUse.forEach((x) => {
          const key = `${x}-${y}`;
          const existingPoint = processedDataMap.get(key);

          if (existingPoint) {
            processed.push(existingPoint);
          } else {
            // Leerer Datenpunkt mit Nullwert
            processed.push({
              x,
              y,
              value: 0,
              metadata: { isEmpty: true },
            });
          }
        });
      });

      return {
        processedData: processed,
        xLabels: xLabelsToUse,
        yLabels: yLabelsToUse,
        minValue: minVal,
        maxValue: maxVal,
        colorMapper: getColorForValue,
      };
    }, [data, colorScale, xAxis, yAxis]);

    // Berechnung der tatsächlichen Breite und Höhe der Heatmap
    const heatmapWidth = xLabels.length * cellWidth + (xLabels.length - 1) * cellGap;
    const heatmapHeight = yLabels.length * cellHeight + (yLabels.length - 1) * cellGap;

    // Dimensionen für responsives Rendering
    const effectiveWidth = typeof width === 'number' ? width : '100%';
    const effectiveHeight = Math.max(height, heatmapHeight + paddingTop + paddingBottom);

    // Position der Legende berechnen
    const legendHeight = showLegend ? 30 : 0;
    const legendWidth = 150;
    const getLegendPosition = () => {
      switch (legendPosition) {
        case 'top':
          return {
            x: paddingLeft + heatmapWidth / 2 - legendWidth / 2,
            y: paddingTop / 2,
          };
        case 'bottom':
          return {
            x: paddingLeft + heatmapWidth / 2 - legendWidth / 2,
            y: paddingTop + heatmapHeight + 20,
          };
        case 'left':
          return {
            x: paddingLeft / 2 - legendWidth / 2,
            y: paddingTop + heatmapHeight / 2,
          };
        case 'right':
          return {
            x: paddingLeft + heatmapWidth + 20,
            y: paddingTop + heatmapHeight / 2,
          };
        default:
          return {
            x: paddingLeft + heatmapWidth / 2 - legendWidth / 2,
            y: paddingTop + heatmapHeight + 20,
          };
      }
    };

    // Handler für Hover-Events
    const handleCellMouseEnter = (cell: HeatmapDataPoint, event: React.MouseEvent) => {
      if (showTooltips) {
        setHoveredCell(cell);
        setTooltipPos({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        });
      }
    };

    const handleCellMouseLeave = () => {
      setHoveredCell(null);
      setTooltipPos(null);
    };

    // Handler für Klick-Events
    const handleCellClick = (cell: HeatmapDataPoint) => {
      if (onCellClick) {
        onCellClick(cell);
      }
    };

    // Hilfsfunktion zur Farbinterpolation
    function interpolateColor(color1: string, color2: string, factor: number): string {
      // Einfache Implementierung der linearen Interpolation zwischen zwei Farben
      const hex = (color: string) => {
        const hex = color.replace('#', '');
        return hex.length === 3
          ? [hex[0] + hex[0], hex[1] + hex[1], hex[2] + hex[2]]
          : [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)];
      };

      const r1 = parseInt(hex(color1)[0], 16);
      const g1 = parseInt(hex(color1)[1], 16);
      const b1 = parseInt(hex(color1)[2], 16);

      const r2 = parseInt(hex(color2)[0], 16);
      const g2 = parseInt(hex(color2)[1], 16);
      const b2 = parseInt(hex(color2)[2], 16);

      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));

      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    return (
      <svg
        ref={ref}
        className={`w-full ${className}`}
        width={effectiveWidth}
        height={effectiveHeight}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
        {...rest}
      >
        {/* Titel (falls vorhanden) */}
        {title && (
          <text
            x={viewBoxWidth / 2}
            y={paddingTop / 2}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
            fontSize={16}
            fontWeight="bold"
          >
            {title}
          </text>
        )}

        {/* X-Achsenbeschriftungen */}
        {xLabels.map((label, index) => {
          const x = paddingLeft + index * (cellWidth + cellGap) + cellWidth / 2;
          const y = paddingTop + heatmapHeight + 20;
          const rotation = xAxis?.labelRotation || 0;

          return (
            <g key={`x-label-${index}`} className="x-axis-label">
              <text
                x={x}
                y={y}
                textAnchor={rotation ? 'end' : 'middle'}
                dominantBaseline="hanging"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize={12}
                transform={rotation ? `rotate(${rotation}, ${x}, ${y})` : undefined}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* X-Achsentitel */}
        {xAxis?.title && (
          <text
            x={paddingLeft + heatmapWidth / 2}
            y={paddingTop + heatmapHeight + (xAxis?.labelRotation ? 50 : 40)}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
            fontSize={14}
            fontWeight="bold"
          >
            {xAxis.title}
          </text>
        )}

        {/* Y-Achsenbeschriftungen */}
        {yLabels.map((label, index) => {
          const x = paddingLeft - 10;
          const y = paddingTop + index * (cellHeight + cellGap) + cellHeight / 2;

          return (
            <g key={`y-label-${index}`} className="y-axis-label">
              <text
                x={x}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize={12}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Y-Achsentitel */}
        {yAxis?.title && (
          <text
            transform={`rotate(-90, ${paddingLeft / 3}, ${paddingTop + heatmapHeight / 2})`}
            x={paddingLeft / 3}
            y={paddingTop + heatmapHeight / 2}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
            fontSize={14}
            fontWeight="bold"
          >
            {yAxis.title}
          </text>
        )}

        {/* Heatmap-Zellen */}
        <g className="heatmap-cells">
          {processedData.map((cell, index) => {
            const xIndex = xLabels.indexOf(cell.x);
            const yIndex = yLabels.indexOf(cell.y);

            if (xIndex === -1 || yIndex === -1) return null;

            const x = paddingLeft + xIndex * (cellWidth + cellGap);
            const y = paddingTop + yIndex * (cellHeight + cellGap);
            const isEmpty = cell.metadata?.isEmpty;

            // Zellenfarbe basierend auf dem Wert
            const cellColor = isEmpty
              ? themeMode === 'dark'
                ? '#1F2937'
                : '#F9FAFB'
              : colorMapper(cell.value);

            // Border-Farbe
            const borderColor = themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

            return (
              <g key={`cell-${index}`} className="heatmap-cell">
                <rect
                  x={x}
                  y={y}
                  width={cellWidth}
                  height={cellHeight}
                  fill={cellColor}
                  stroke={showCellBorder ? borderColor : 'none'}
                  strokeWidth={showCellBorder ? 1 : 0}
                  className={animated ? 'animate-fade-in' : ''}
                  style={
                    animated
                      ? {
                          opacity: 0,
                          animation: `fadeIn 0.3s ease-out forwards ${index * 0.005}s`,
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleCellMouseEnter(cell, e)}
                  onMouseLeave={handleCellMouseLeave}
                  onClick={() => handleCellClick(cell)}
                  cursor={onCellClick ? 'pointer' : 'default'}
                />

                {/* Zellwerte anzeigen */}
                {showValues && !isEmpty && (
                  <text
                    x={x + cellWidth / 2}
                    y={y + cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={getContrastColor(cellColor)}
                    fontSize={12}
                    className={animated ? 'animate-fade-in' : ''}
                    style={
                      animated
                        ? {
                            opacity: 0,
                            animation: `fadeIn 0.3s ease-out forwards ${index * 0.005 + 0.2}s`,
                          }
                        : {}
                    }
                  >
                    {formatValue(cell.value)}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Legende */}
        {showLegend && (
          <g
            className="heatmap-legend"
            transform={`translate(${getLegendPosition().x}, ${getLegendPosition().y})`}
          >
            {/* Legende basierend auf der Farbskala */}
            {(() => {
              // Farben für die Legende generieren
              const steps = 5;
              const legendColors: { color: string; value: number }[] = [];

              for (let i = 0; i < steps; i++) {
                const fraction = i / (steps - 1);
                const value = minValue + fraction * (maxValue - minValue);
                const color = colorMapper(value);
                legendColors.push({ color, value });
              }

              return (
                <>
                  <text
                    x={0}
                    y={0}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                    fontSize={12}
                  >
                    {formatValue(minValue)}
                  </text>

                  {/* Farbbalken */}
                  {legendColors.map((item, i) => (
                    <rect
                      key={`legend-${i}`}
                      x={30 + (i * (legendWidth - 60)) / (steps - 1)}
                      y={-5}
                      width={(legendWidth - 60) / (steps - 1)}
                      height={10}
                      fill={item.color}
                    />
                  ))}

                  <text
                    x={legendWidth}
                    y={0}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                    fontSize={12}
                  >
                    {formatValue(maxValue)}
                  </text>
                </>
              );
            })()}
          </g>
        )}

        {/* Tooltip */}
        {showTooltips && hoveredCell && tooltipPos && (
          <g className="heatmap-tooltip">
            <rect
              x={tooltipPos.x - 80}
              y={tooltipPos.y - 40}
              width={160}
              height={30}
              rx={4}
              fill={themeMode === 'dark' ? '#1F2937' : 'white'}
              stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
              strokeWidth={1}
              opacity={0.9}
            />
            <text
              x={tooltipPos.x}
              y={tooltipPos.y - 25}
              textAnchor="middle"
              fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
              fontSize={12}
            >
              {`${hoveredCell.x}, ${hoveredCell.y}: ${formatValue(hoveredCell.value)}`}
            </text>
          </g>
        )}

        {/* Animation-Styles */}
        <defs>
          <style>
            {`
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

// Hilfsfunktion zur Bestimmung der Kontrastfarbe für Text
function getContrastColor(backgroundColor: string): string {
  // Farbe in RGB umwandeln
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Helligkeit berechnen (YIQ-Formel)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Bei hellen Hintergründen dunklen Text verwenden und umgekehrt
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

Heatmap.displayName = 'Heatmap';

export default Heatmap;
