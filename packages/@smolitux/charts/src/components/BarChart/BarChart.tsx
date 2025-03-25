// packages/@smolitux/charts/src/components/BarChart/BarChart.tsx
import React, { useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

export interface BarChartDataPoint {
  /** Kategorie/Label für den Balken */
  label: string;
  /** Wert für den Balken */
  value: number;
  /** Optional: Farbe des Balkens */
  color?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}

export interface BarChartSeries {
  /** ID der Serie */
  id: string;
  /** Name der Serie (für Legende) */
  name: string;
  /** Farbe der Serie */
  color?: string;
  /** Daten der Serie */
  data: BarChartDataPoint[];
}

export interface BarChartProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Einzelne Datenserie oder Array von Serien */
  data: BarChartSeries | BarChartSeries[];
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
  /** Einheit für Y-Achse */
  yUnit?: string;
  /** Grid-Linien anzeigen */
  showGrid?: boolean;
  /** Balken-Labels anzeigen */
  showLabels?: boolean;
  /** Werte über den Balken anzeigen */
  showValues?: boolean;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Animation aktivieren */
  animated?: boolean;
  /** Y-Achse bei Null beginnen */
  startYAxisAtZero?: boolean;
  /** Horizontale statt vertikale Balken */
  horizontal?: boolean;
  /** Gruppierte Balken (Side-by-Side) oder Gestapelt */
  stacked?: boolean;
  /** Angepasste Farben für Datenreihen */
  colors?: string[];
  /** Angepasste Formatierung für Y-Achsenbeschriftungen */
  formatYLabel?: (value: number) => string;
  /** Für responsive SVG (viewBox) */
  aspectRatio?: number;
}

/**
 * BarChart-Komponente für kategoriale Daten
 * 
 * @example
 * ```tsx
 * <BarChart
 *   data={{
 *     id: 'sales',
 *     name: 'Sales 2025',
 *     data: [
 *       { label: 'Q1', value: 150 },
 *       { label: 'Q2', value: 230 },
 *       { label: 'Q3', value: 180 },
 *       { label: 'Q4', value: 275 },
 *     ]
 *   }}
 *   height={300}
 *   showGrid
 *   showValues
 * />
 * ```
 */
export const BarChart = forwardRef<SVGSVGElement, BarChartProps>(({
  data,
  height = 300,
  width = '100%',
  padding = { top: 30, right: 30, bottom: 40, left: 50 },
  title,
  axisLabels,
  yUnit,
  showGrid = true,
  showLabels = true,
  showValues = false,
  showLegend = true,
  legendPosition = 'top',
  animated = true,
  startYAxisAtZero = true,
  horizontal = false,
  stacked = false,
  colors,
  formatYLabel = (value) => `${value}`,
  aspectRatio = 16 / 9,
  className = '',
  ...rest
}, ref) => {
  const { themeMode } = useTheme();
  
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
  const drawingHeight = height - paddingTop - paddingBottom;
  
  // SVG viewBox für Responsivität
  const viewBoxWidth = 1000;
  const viewBoxHeight = Math.round(viewBoxWidth / aspectRatio);
  
  // Datenaufbereitung
  const {
    allCategories,
    yMin,
    yMax,
    normData,
  } = useMemo(() => {
    // Alle Kategorien/Labels aus allen Serien extrahieren
    const categories = Array.from(new Set(
      seriesArray.flatMap(series => series.data.map(d => d.label))
    ));
    
    // Min/Max Y-Werte für Skalierung
    let minY = startYAxisAtZero ? 0 : Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    
    if (stacked) {
      // Bei gestapelten Balken müssen wir Summen pro Kategorie berechnen
      const sums = categories.map(category => {
        let sum = 0;
        seriesArray.forEach(series => {
          const point = series.data.find(d => d.label === category);
          if (point) sum += point.value;
        });
        return sum;
      });
      
      minY = startYAxisAtZero ? 0 : Math.min(...sums);
      maxY = Math.max(...sums);
    } else {
      // Bei nicht gestapelten Balken einfach Min/Max über alle Werte
      seriesArray.forEach(series => {
        series.data.forEach(point => {
          if (point.value < minY) minY = point.value;
          if (point.value > maxY) maxY = point.value;
        });
      });
    }
    
    // Sicherheitscheck für den Fall, dass alle Werte gleich sind
    if (minY === maxY) {
      if (minY === 0) {
        maxY = 1; // Wenn alle Werte 0 sind
      } else {
        // Andernfalls etwas Spielraum schaffen
        minY = startYAxisAtZero ? 0 : minY * 0.9;
        maxY = maxY * 1.1;
      }
    }
    
    // Daten mit zusätzlichen Infos für das Zeichnen anreichern
    const normalizedData = seriesArray.map((series, seriesIndex) => {
      const color = series.color || chartColors[seriesIndex % chartColors.length];
      
      // Alle Kategorien durchgehen und Datenpunkte finden/erstellen
      const processedData = categories.map(category => {
        const point = series.data.find(d => d.label === category);
        
        if (!point) {
          // Wenn kein Punkt für diese Kategorie existiert, einen leeren erstellen
          return {
            label: category,
            value: 0,
            color,
            metadata: {}
          };
        }
        
        return {
          ...point,
          color: point.color || color
        };
      });
      
      return {
        ...series,
        color,
        processedData
      };
    });
    
    return {
      allCategories: categories,
      yMin: minY,
      yMax: maxY,
      normData: normalizedData
    };
  }, [seriesArray, chartColors, startYAxisAtZero, stacked]);
  
  // Y-Achsen-Ticks berechnen
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const step = (yMax - yMin) / (tickCount - 1);
    
    return Array.from({ length: tickCount }, (_, i) => {
      const value = yMin + step * i;
      return {
        value,
        label: formatYLabel(value)
      };
    });
  }, [yMin, yMax, formatYLabel]);
  
  // Funktion zur Bestimmung der Y-Position (oder X-Position bei horizontalem Chart)
  const scaleValue = (value: number) => {
    if (yMax === yMin) return 0;
    return (value - yMin) / (yMax - yMin);
  };
  
  // Balkenbreite berechnen
  const getBarWidth = () => {
    if (horizontal) {
      // Bei horizontalen Balken ist die "Breite" eigentlich die Höhe jedes Balkens
      const totalBars = stacked 
        ? allCategories.length 
        : allCategories.length * seriesArray.length;
      
      const availableHeight = drawingHeight;
      // Ein bisschen Abstand zwischen den Balken lassen (20%)
      return (availableHeight * 0.8) / totalBars;
    } else {
      // Bei vertikalen Balken ist es die tatsächliche Breite
      const totalBars = stacked 
        ? allCategories.length 
        : allCategories.length * seriesArray.length;
      
      const availableWidth = drawingWidth;
      // Ein bisschen Abstand zwischen den Balken lassen (20%)
      return (availableWidth * 0.8) / totalBars;
    }
  };
  
  // Hilfsfunktion zum Rendern der Balken (vertikale Variante)
  const renderVerticalBars = () => {
    const barWidth = getBarWidth();
    const barSpacing = stacked ? 0 : barWidth / 4;
    
    return (
      <g>
        {allCategories.map((category, categoryIndex) => {
          const categoryX = paddingLeft + (drawingWidth / allCategories.length) * (categoryIndex + 0.5);
          
          // Bei gestapelten Balken
          if (stacked) {
            let stackStart = 0;
            
            return (
              <g key={`category-${category}`}>
                {normData.map((series, seriesIndex) => {
                  const dataPoint = series.processedData[categoryIndex];
                  const barHeight = scaleValue(dataPoint.value) * drawingHeight;
                  
                  // Überspringe Balken mit Wert 0
                  if (dataPoint.value === 0) {
                    return null;
                  }
                  
                  const x = categoryX - barWidth / 2;
                  const y = paddingTop + drawingHeight - stackStart - barHeight;
                  
                  // Position für nächsten Balken in diesem Stack updaten
                  stackStart += barHeight;
                  
                  return (
                    <g key={`bar-${series.id}-${category}`}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={dataPoint.color}
                        strokeWidth={1}
                        stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.5)'}
                        rx={2}
                        className={animated ? 'animate-rise' : ''}
                        style={animated ? {
                          transformOrigin: 'bottom',
                          transform: 'scaleY(0)',
                          animation: `growUp ${0.5 + seriesIndex * 0.1}s ease-out forwards ${seriesIndex * 0.1}s`
                        } : {}}
                      />
                      
                      {/* Wert über dem Balken anzeigen */}
                      {showValues && dataPoint.value > 0 && (
                        <text
                          x={x + barWidth / 2}
                          y={y - 5}
                          textAnchor="middle"
                          fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                          fontSize={12}
                          fontWeight="bold"
                          className={animated ? 'animate-fade-in' : ''}
                          style={animated ? {
                            opacity: 0,
                            animation: 'fadeIn 0.5s ease-out forwards 0.5s'
                          } : {}}
                        >
                          {formatYLabel(dataPoint.value)}
                          {yUnit ? ` ${yUnit}` : ''}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          } else {
            // Bei gruppierten Balken
            return (
              <g key={`category-${category}`}>
                {normData.map((series, seriesIndex) => {
                  const dataPoint = series.processedData[categoryIndex];
                  const barHeight = scaleValue(dataPoint.value) * drawingHeight;
                  
                  // Position innerhalb der Gruppe berechnen
                  const groupOffsetX = (seriesIndex - seriesArray.length / 2 + 0.5) * (barWidth + barSpacing);
                  const x = categoryX + groupOffsetX - barWidth / 2;
                  const y = paddingTop + drawingHeight - barHeight;
                  
                  return (
                    <g key={`bar-${series.id}-${category}`}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={dataPoint.color}
                        strokeWidth={1}
                        stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.5)'}
                        rx={2}
                        className={animated ? 'animate-rise' : ''}
                        style={animated ? {
                          transformOrigin: 'bottom',
                          transform: 'scaleY(0)',
                          animation: `growUp ${0.5 + seriesIndex * 0.1}s ease-out forwards ${seriesIndex * 0.1}s`
                        } : {}}
                      />
                      
                      {/* Wert über dem Balken anzeigen */}
                      {showValues && dataPoint.value > 0 && (
                        <text
                          x={x + barWidth / 2}
                          y={y - 5}
                          textAnchor="middle"
                          fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                          fontSize={12}
                          fontWeight="bold"
                          className={animated ? 'animate-fade-in' : ''}
                          style={animated ? {
                            opacity: 0,
                            animation: 'fadeIn 0.5s ease-out forwards 0.5s'
                          } : {}}
                        >
                          {formatYLabel(dataPoint.value)}
                          {yUnit ? ` ${yUnit}` : ''}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          }
        })}
      </g>
    );
  };
  
  // Hilfsfunktion zum Rendern der Balken (horizontale Variante)
  const renderHorizontalBars = () => {
    const barHeight = getBarWidth();
    const barSpacing = stacked ? 0 : barHeight / 4;
    
    return (
      <g>
        {allCategories.map((category, categoryIndex) => {
          const categoryY = paddingTop + (drawingHeight / allCategories.length) * (categoryIndex + 0.5);
          
          // Bei gestapelten Balken
          if (stacked) {
            let stackStart = 0;
            
            return (
              <g key={`category-${category}`}>
                {normData.map((series, seriesIndex) => {
                  const dataPoint = series.processedData[categoryIndex];
                  const barWidth = scaleValue(dataPoint.value) * drawingWidth;
                  
                  // Position innerhalb der Gruppe berechnen
                  const groupOffsetY = (seriesIndex - seriesArray.length / 2 + 0.5) * (barHeight + barSpacing);
                  const y = categoryY + groupOffsetY - barHeight / 2;
                  const x = paddingLeft;
                  
                  return (
                    <g key={`bar-${series.id}-${category}`}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={dataPoint.color}
                        strokeWidth={1}
                        stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.5)'}
                        rx={2}
                        className={animated ? 'animate-grow' : ''}
                        style={animated ? {
                          transformOrigin: 'left',
                          transform: 'scaleX(0)',
                          animation: `growRight ${0.5 + seriesIndex * 0.1}s ease-out forwards ${seriesIndex * 0.1}s`
                        } : {}}
                      />
                      
                      {/* Wert neben dem Balken anzeigen */}
                      {showValues && dataPoint.value > 0 && (
                        <text
                          x={x + barWidth + 5}
                          y={y + barHeight / 2}
                          dominantBaseline="middle"
                          fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                          fontSize={12}
                          fontWeight="bold"
                          className={animated ? 'animate-fade-in' : ''}
                          style={animated ? {
                            opacity: 0,
                            animation: 'fadeIn 0.5s ease-out forwards 0.5s'
                          } : {}}
                        >
                          {formatYLabel(dataPoint.value)}
                          {yUnit ? ` ${yUnit}` : ''}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          }
        })}
      </g>
    );
  };
  
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
      {/* Hintergrund */}
      <rect
        x={paddingLeft}
        y={paddingTop}
        width={drawingWidth}
        height={drawingHeight}
        fill={themeMode === 'dark' ? '#1F2937' : '#F9FAFB'}
        strokeWidth={1}
        stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
      />
      
      {/* Titel (falls vorhanden) */}
      {title && (
        <text
          x={width / 2}
          y={paddingTop / 2}
          textAnchor="middle"
          fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
          fontSize={16}
          fontWeight="bold"
        >
          {title}
        </text>
      )}
      
      {/* Grid-Linien */}
      {showGrid && (
        <g className="grid-lines">
          {yAxisTicks.map((tick, index) => {
            if (horizontal) {
              // Vertikale Grid-Linien für horizontale Balken
              const x = paddingLeft + scaleValue(tick.value) * drawingWidth;
              return (
                <line
                  key={`grid-${index}`}
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={paddingTop + drawingHeight}
                  stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              );
            } else {
              // Horizontale Grid-Linien für vertikale Balken
              const y = paddingTop + (1 - scaleValue(tick.value)) * drawingHeight;
              return (
                <line
                  key={`grid-${index}`}
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + drawingWidth}
                  y2={y}
                  stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              );
            }
          })}
        </g>
      )}
      
      {/* Balken zeichnen */}
      {horizontal ? renderHorizontalBars() : renderVerticalBars()}
      
      {/* X-Achse und Labels */}
      <g className="x-axis">
        <line
          x1={paddingLeft}
          y1={paddingTop + drawingHeight}
          x2={paddingLeft + drawingWidth}
          y2={paddingTop + drawingHeight}
          stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
          strokeWidth={1}
        />
        
        {/* Kategorien/Labels */}
        {showLabels && !horizontal && (
          allCategories.map((category, index) => {
            const x = paddingLeft + (drawingWidth / allCategories.length) * (index + 0.5);
            return (
              <text
                key={`label-${category}`}
                x={x}
                y={paddingTop + drawingHeight + 20}
                textAnchor="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize={12}
              >
                {category}
              </text>
            );
          })
        )}
        
        {/* X-Achsentitel */}
        {axisLabels?.x && !horizontal && (
          <text
            x={paddingLeft + drawingWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize={12}
            fontWeight="bold"
          >
            {axisLabels.x}
          </text>
        )}
        
        {/* Horizontale Variante: Y-Achsentitel auf der X-Achse */}
        {axisLabels?.y && horizontal && (
          <text
            x={paddingLeft + drawingWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize={12}
            fontWeight="bold"
          >
            {axisLabels.y}
          </text>
        )}
      </g>
      
      {/* Y-Achse und Labels */}
      <g className="y-axis">
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + drawingHeight}
          stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
          strokeWidth={1}
        />
        
        {/* Wert-Labels (horizontal oder vertikal) */}
        {horizontal ? (
          // Horizontale Balken: Werte auf der X-Achse
          yAxisTicks.map((tick, index) => {
            const x = paddingLeft + scaleValue(tick.value) * drawingWidth;
            return (
              <g key={`tick-${index}`}>
                <line
                  x1={x}
                  y1={paddingTop + drawingHeight}
                  x2={x}
                  y2={paddingTop + drawingHeight + 5}
                  stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={paddingTop + drawingHeight + 20}
                  textAnchor="middle"
                  fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                  fontSize={12}
                >
                  {tick.label}
                  {yUnit ? ` ${yUnit}` : ''}
                </text>
              </g>
            );
          })
        ) : (
          // Vertikale Balken: Werte auf der Y-Achse
          yAxisTicks.map((tick, index) => {
            const y = paddingTop + (1 - scaleValue(tick.value)) * drawingHeight;
            return (
              <g key={`tick-${index}`}>
                <line
                  x1={paddingLeft - 5}
                  y1={y}
                  x2={paddingLeft}
                  y2={y}
                  stroke={themeMode === 'dark' ? '#6B7280' : '#9CA3AF'}
                  strokeWidth={1}
                />
                <text
                  x={paddingLeft - 10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                  fontSize={12}
                >
                  {tick.label}
                  {yUnit ? ` ${yUnit}` : ''}
                </text>
              </g>
            );
          })
        )}
        
        {/* Kategorien bei horizontalen Balken */}
        {showLabels && horizontal && (
          allCategories.map((category, index) => {
            const y = paddingTop + (drawingHeight / allCategories.length) * (index + 0.5);
            return (
              <text
                key={`label-${category}`}
                x={paddingLeft - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                fontSize={12}
              >
                {category}
              </text>
            );
          })
        )}
        
        {/* Y-Achsentitel */}
        {axisLabels?.y && !horizontal && (
          <text
            transform={`rotate(-90, ${paddingLeft / 3}, ${paddingTop + drawingHeight / 2})`}
            x={paddingLeft / 3}
            y={paddingTop + drawingHeight / 2}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize={12}
            fontWeight="bold"
          >
            {axisLabels.y}
          </text>
        )}
        
        {/* X-Achsentitel auf der Y-Achse bei horizontalen Balken */}
        {axisLabels?.x && horizontal && (
          <text
            transform={`rotate(-90, ${paddingLeft / 3}, ${paddingTop + drawingHeight / 2})`}
            x={paddingLeft / 3}
            y={paddingTop + drawingHeight / 2}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize={12}
            fontWeight="bold"
          >
            {axisLabels.x}
          </text>
        )}
      </g>
      
      {/* Legende */}
      {showLegend && seriesArray.length > 1 && (
        <g className="chart-legend">
          {(() => {
            // Berechnung der Position der Legende
            const legendY = legendPosition === 'top' 
              ? 10 
              : legendPosition === 'bottom' 
                ? height - 10 - seriesArray.length * 20 
                : paddingTop + 10;
                
            const legendX = legendPosition === 'right' 
              ? paddingLeft + drawingWidth + 10 
              : legendPosition === 'left' 
                ? 10 
                : paddingLeft + 10;
                
            return (
              <g transform={`translate(${legendX}, ${legendY})`}>
                {normData.map((series, index) => (
                  <g 
                    key={`legend-${series.id}`} 
                    transform={`translate(0, ${index * 20})`}
                  >
                    <rect
                      width={12}
                      height={12}
                      fill={series.color}
                      rx={2}
                    />
                    <text
                      x={20}
                      y={10}
                      dominantBaseline="middle"
                      fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                      fontSize={12}
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
      
      {/* Animation-Styles */}
      <defs>
        <style>
          {`
            @keyframes growUp {
              to {
                transform: scaleY(1);
              }
            }
            
            @keyframes growRight {
              to {
                transform: scaleX(1);
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
});

BarChart.displayName = 'BarChart';

export default BarChart;ingWidth;
                  
                  // Überspringe Balken mit Wert 0
                  if (dataPoint.value === 0) {
                    return null;
                  }
                  
                  const y = categoryY - barHeight / 2;
                  const x = paddingLeft + stackStart;
                  
                  // Position für nächsten Balken in diesem Stack updaten
                  stackStart += barWidth;
                  
                  return (
                    <g key={`bar-${series.id}-${category}`}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={dataPoint.color}
                        strokeWidth={1}
                        stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.5)'}
                        rx={2}
                        className={animated ? 'animate-grow' : ''}
                        style={animated ? {
                          transformOrigin: 'left',
                          transform: 'scaleX(0)',
                          animation: `growRight ${0.5 + seriesIndex * 0.1}s ease-out forwards ${seriesIndex * 0.1}s`
                        } : {}}
                      />
                      
                      {/* Wert neben dem Balken anzeigen */}
                      {showValues && dataPoint.value > 0 && (
                        <text
                          x={x + barWidth + 5}
                          y={y + barHeight / 2}
                          dominantBaseline="middle"
                          fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                          fontSize={12}
                          fontWeight="bold"
                          className={animated ? 'animate-fade-in' : ''}
                          style={animated ? {
                            opacity: 0,
                            animation: 'fadeIn 0.5s ease-out forwards 0.5s'
                          } : {}}
                        >
                          {formatYLabel(dataPoint.value)}
                          {yUnit ? ` ${yUnit}` : ''}
                        </text>
                      )}
                    </g>
                  );
                })
              </g>
            );
          } else {
            // Bei gruppierten Balken
            return (
              <g key={`category-${category}`}>
                {normData.map((series, seriesIndex) => {
                  const dataPoint = series.processedData[categoryIndex];
                  const barWidth = scaleValue(dataPoint.value) * drawingWidth;
