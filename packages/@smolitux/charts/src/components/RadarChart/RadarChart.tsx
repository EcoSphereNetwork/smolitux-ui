// packages/@smolitux/charts/src/components/RadarChart/RadarChart.tsx
import React, { useMemo, forwardRef, useState } from 'react';
import { useTheme } from '@smolitux/theme';

export interface RadarChartDataPoint {
  /** Achsenbezeichnung */
  axis: string;
  /** Wert für die Achse */
  value: number;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}

export interface RadarChartSeries {
  /** ID oder Name der Serie */
  name: string;
  /** Farbe der Serie */
  color?: string;
  /** Datenpunkte der Serie */
  values: RadarChartDataPoint[];
  /** Füllfarbe (für gefüllte Radarplots) */
  fillColor?: string;
  /** Transparenz der Füllung */
  fillOpacity?: number;
  /** Liniendicke */
  lineWidth?: number;
  /** Linientyp */
  lineType?: 'solid' | 'dashed' | 'dotted';
  /** Punktgröße */
  pointSize?: number;
}

export interface RadarChartProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Datenserien für das Radar-Chart */
  data: RadarChartSeries[];
  /** Höhe des Charts */
  height?: number;
  /** Breite des Charts (Default: 100%) */
  width?: number | string;
  /** Padding innerhalb des Charts */
  padding?: number;
  /** Titel des Charts */
  title?: string;
  /** Anzahl der konzentrischen Kreise (Level) */
  levels?: number;
  /** Maximaler Wert (für die Skalierung) */
  maxValue?: number;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Animation aktivieren */
  animated?: boolean;
  /** Achsenbeschriftungen anzeigen */
  showLabels?: boolean;
  /** Werte anzeigen */
  showValues?: boolean;
  /** Format für Werte */
  formatValue?: (value: number) => string;
  /** Achsen einfärben */
  colorAxes?: boolean;
  /** Füllung für die Polygone aktivieren */
  filled?: boolean;
  /** Punkte anzeigen */
  showPoints?: boolean;
  /** Tooltips anzeigen */
  showTooltips?: boolean;
  /** Angepasste Farben für mehrere Serien */
  colors?: string[];
  /** Größe des Radius (in Prozent des verfügbaren Raums) */
  radiusSize?: number;
  /** Callback bei Klick auf einen Punkt */
  onPointClick?: (point: RadarChartDataPoint, seriesIndex: number) => void;
}

/**
 * RadarChart-Komponente für multivariate Daten
 * 
 * @example
 * ```tsx
 * <RadarChart
 *   data={[
 *     {
 *       name: 'Serie A',
 *       color: '#3B82F6',
 *       values: [
 *         { axis: 'Verkauf', value: 80 },
 *         { axis: 'Marketing', value: 60 },
 *         { axis: 'Entwicklung', value: 90 }
 *       ]
 *     }
 *   ]}
 *   maxValue={100}
 *   levels={5}
 *   filled
 * />
 * ```
 */
export const RadarChart = forwardRef<SVGSVGElement, RadarChartProps>(({
  data,
  height = 400,
  width = '100%',
  padding = 30,
  title,
  levels = 5,
  maxValue,
  showLegend = true,
  legendPosition = 'bottom',
  animated = true,
  showLabels = true,
  showValues = false,
  formatValue = (value) => `${value}`,
  colorAxes = false,
  filled = true,
  showPoints = true,
  showTooltips = true,
  colors,
  radiusSize = 85,
  onPointClick,
  className = '',
  ...rest
}, ref) => {
  const theme = useTheme();
  // Access theme mode safely with fallback to 'light'
  const themeMode = theme.mode || 'light';
  
  // Hover state for tooltips
  const [hoveredPoint, setHoveredPoint] = useState<{
    point: RadarChartDataPoint;
    seriesIndex: number;
    x: number;
    y: number;
  } | null>(null);
  
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
  
  // SVG viewBox für Responsivität
  const viewBoxSize = 500;
  
  // Berechnung für den Radius und das Zentrum
  const center = viewBoxSize / 2;
  const radius = (center - padding) * (radiusSize / 100);
  
  // Datenaufbereitung und Berechnungen
  const {
    processedData,
    axes,
    allValues,
    actualMaxValue
  } = useMemo(() => {
    // Alle eindeutigen Achsen extrahieren
    const allAxes = Array.from(
      new Set(
        data.flatMap(series => series.values.map(point => point.axis))
      )
    );
    
    // Alle Werte (für auto-scaling wenn kein maxValue)
    const values = data.flatMap(series => series.values.map(point => point.value));
    const dataMaxValue = Math.max(...values);
    
    // Tatsächliches Maximum (entweder vom Benutzer oder aus den Daten)
    const maxVal = maxValue !== undefined ? maxValue : dataMaxValue;
    
    // Daten mit Farbinformationen anreichern
    const processed = data.map((series, index) => {
      const seriesColor = series.color || chartColors[index % chartColors.length];
      const fillColor = series.fillColor || seriesColor;
      const fillOpacity = series.fillOpacity !== undefined ? series.fillOpacity : 0.2;
      const lineWidth = series.lineWidth || 2;
      const pointSize = series.pointSize || 4;
      
      // Map für schnellen Zugriff auf Werte nach Achse
      const valueMap = new Map<string, number>();
      series.values.forEach(point => {
        valueMap.set(point.axis, point.value);
      });
      
      // Werte für jede Achse auffüllen (mit 0 für fehlende Achsen)
      const allAxisValues = allAxes.map(axis => {
        const value = valueMap.get(axis) || 0;
        return {
          axis,
          value,
          // Normalisierter Wert für das Zeichnen
          normalizedValue: value / maxVal,
          metadata: series.values.find(p => p.axis === axis)?.metadata || {}
        };
      });
      
      return {
        ...series,
        color: seriesColor,
        fillColor,
        fillOpacity,
        lineWidth,
        pointSize,
        values: allAxisValues
      };
    });
    
    return {
      processedData: processed,
      axes: allAxes,
      allValues: values,
      actualMaxValue: maxVal
    };
  }, [data, maxValue, chartColors]);
  
  // Anzahl der Achsen
  const numAxes = axes.length;
  
  // Winkelabstand zwischen den Achsen
  const angleSlice = (Math.PI * 2) / numAxes;
  
  // Linien-Dash-Array für verschiedene Linientypen
  const getDashArray = (lineType?: string) => {
    switch (lineType) {
      case 'dashed':
        return '6,4';
      case 'dotted':
        return '2,2';
      default:
        return 'none';
    }
  };
  
  // Handler für Hover-Events
  const handlePointMouseEnter = (point: RadarChartDataPoint, seriesIndex: number, x: number, y: number) => {
    if (showTooltips) {
      setHoveredPoint({
        point,
        seriesIndex,
        x,
        y
      });
    }
  };
  
  const handlePointMouseLeave = () => {
    setHoveredPoint(null);
  };
  
  // Handler für Klick-Events
  const handlePointClick = (point: RadarChartDataPoint, seriesIndex: number) => {
    if (onPointClick) {
      onPointClick(point, seriesIndex);
    }
  };
  
  // Berechnung der Koordinaten für einen Punkt
  const getPointCoordinate = (value: number, index: number) => {
    // Winkel basierend auf dem Index
    const angle = index * angleSlice - Math.PI / 2;
    
    // Position berechnen (im Uhrzeigersinn von oben)
    const x = center + value * radius * Math.cos(angle);
    const y = center + value * radius * Math.sin(angle);
    
    return { x, y };
  };
  
  // Generierung des Pfads für ein Radar-Polygon
  const generateRadarPath = (values: { normalizedValue: number }[]) => {
    if (values.length === 0) return '';
    
    const points = values.map((point, i) => {
      const { x, y } = getPointCoordinate(point.normalizedValue, i);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')} Z`;
  };
  
  // Rendern der Legende
  const renderLegend = () => {
    // Position basierend auf legendPosition
    const legendX = legendPosition === 'left' 
      ? padding
      : legendPosition === 'right'
        ? viewBoxSize - 100
        : center - (processedData.length * 60) / 2;
        
    const legendY = legendPosition === 'top'
      ? padding
      : legendPosition === 'bottom'
        ? viewBoxSize - padding
        : center;
        
    // Ausrichtung der Legende
    const isHorizontal = legendPosition === 'top' || legendPosition === 'bottom';
    
    return (
      <g 
        className="legend" 
        transform={`translate(${legendX}, ${legendY})`}
      >
        {processedData.map((series, i) => (
          <g 
            key={`legend-${i}`}
            transform={isHorizontal ? `translate(${i * 120}, 0)` : `translate(0, ${i * 25})`}
          >
            <rect
              width={16}
              height={16}
              fill={series.color}
              fillOpacity={filled ? series.fillOpacity : 1}
              stroke={series.color}
              strokeWidth={1}
              rx={2}
            />
            <text
              x={24}
              y={12}
              fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
              fontSize={12}
              fontWeight="500"
            >
              {series.name}
            </text>
          </g>
        ))}
      </g>
    );
  };
  
  return (
    <svg
      ref={ref}
      className={`w-full ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      {/* Titel (falls vorhanden) */}
      {title && (
        <text
          x={center}
          y={padding / 2}
          textAnchor="middle"
          fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
          fontSize={16}
          fontWeight="bold"
        >
          {title}
        </text>
      )}
      
      {/* Hintergrund */}
      <g className="radar-background">
        {/* Konzentrische Kreise für Levels */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = radius * ((i + 1) / levels);
          
          return (
            <circle
              key={`level-${i}`}
              cx={center}
              cy={center}
              r={levelRadius}
              fill="none"
              stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
              strokeWidth={1}
              strokeDasharray="2,2"
              opacity={0.7}
            />
          );
        })}
        
        {/* Achsen der Radarplot */}
        {axes.map((axis, i) => {
          const endpoint = getPointCoordinate(1, i);
          const axisColor = colorAxes 
            ? chartColors[i % chartColors.length] 
            : (themeMode === 'dark' ? '#6B7280' : '#9CA3AF');
          
          return (
            <g key={`axis-${i}`} className="radar-axis">
              {/* Achsenlinie */}
              <line
                x1={center}
                y1={center}
                x2={endpoint.x}
                y2={endpoint.y}
                stroke={axisColor}
                strokeWidth={1}
              />
              
              {/* Achsenbeschriftung */}
              {showLabels && (
                <text
                  // Position etwas außerhalb des Radarplots
                  x={center + (radius + 15) * Math.cos(i * angleSlice - Math.PI / 2)}
                  y={center + (radius + 15) * Math.sin(i * angleSlice - Math.PI / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                  fontSize={11}
                  fontWeight="500"
                >
                  {axis}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Werte-Beschriftungen auf den Levels */}
        {levels > 0 && (
          <g className="level-labels">
            {/* Label für den höchsten Level */}
            <text
              x={center}
              y={center - radius - 5}
              textAnchor="middle"
              fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
              fontSize={10}
            >
              {formatValue(actualMaxValue)}
            </text>
            
            {/* Label für den mittleren Level */}
            <text
              x={center}
              y={center - radius / 2 - 5}
              textAnchor="middle"
              fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
              fontSize={10}
            >
              {formatValue(actualMaxValue / 2)}
            </text>
          </g>
        )}
      </g>
      
      {/* Datenreihen */}
      <g className="radar-series">
        {processedData.map((series, seriesIndex) => {
          // Pfad für das Polygon
          const radarPath = generateRadarPath(series.values);
          
          return (
            <g key={`series-${seriesIndex}`} className="radar-series-item">
              {/* Gefülltes Polygon */}
              {filled && (
                <path
                  d={radarPath}
                  fill={series.fillColor}
                  fillOpacity={series.fillOpacity}
                  stroke="none"
                  className={animated ? 'animate-fade-in' : ''}
                  style={animated ? { 
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${seriesIndex * 0.2}s`
                  } : {}}
                />
              )}
              
              {/* Umriss des Polygons */}
              <path
                d={radarPath}
                fill="none"
                stroke={series.color}
                strokeWidth={series.lineWidth}
                strokeLinejoin="round"
                strokeDasharray={getDashArray(series.lineType)}
                className={animated ? 'animate-draw' : ''}
                style={animated ? { 
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: `draw 1.5s ease-out forwards ${seriesIndex * 0.2}s`
                } : {}}
              />
              
              {/* Datenpunkte */}
              {showPoints && (
                <g className="radar-points">
                  {series.values.map((point, pointIndex) => {
                    const coord = getPointCoordinate(point.normalizedValue, pointIndex);
                    
                    return (
                      <circle
                        key={`point-${seriesIndex}-${pointIndex}`}
                        cx={coord.x}
                        cy={coord.y}
                        r={series.pointSize}
                        fill={themeMode === 'dark' ? '#1F2937' : 'white'}
                        stroke={series.color}
                        strokeWidth={1.5}
                        className={animated ? 'animate-fade-in' : ''}
                        style={animated ? { 
                          opacity: 0,
                          animation: `fadeIn 0.3s ease-out forwards ${(seriesIndex * 0.2) + 1.5 + (pointIndex * 0.1)}s`
                        } : {}}
                        onMouseEnter={() => handlePointMouseEnter(point, seriesIndex, coord.x, coord.y)}
                        onMouseLeave={handlePointMouseLeave}
                        onClick={() => handlePointClick(point, seriesIndex)}
                        cursor={onPointClick ? 'pointer' : 'default'}
                      />
                    );
                  })}
                </g>
              )}
              
              {/* Werte anzeigen */}
              {showValues && (
                <g className="radar-values">
                  {series.values.map((point, pointIndex) => {
                    const coord = getPointCoordinate(point.normalizedValue + 0.1, pointIndex);
                    
                    return (
                      <text
                        key={`value-${seriesIndex}-${pointIndex}`}
                        x={coord.x}
                        y={coord.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                        fontSize={10}
                        fontWeight="500"
                        className={animated ? 'animate-fade-in' : ''}
                        style={animated ? { 
                          opacity: 0,
                          animation: `fadeIn 0.3s ease-out forwards ${(seriesIndex * 0.2) + 1.8 + (pointIndex * 0.1)}s`
                        } : {}}
                      >
                        {formatValue(point.value)}
                      </text>
                    );
                  })}
                </g>
              )}
            </g>
          );
        })}
      </g>
      
      {/* Legende */}
      {showLegend && renderLegend()}
      
      {/* Tooltip */}
      {showTooltips && hoveredPoint && (
        <g className="radar-tooltip">
          <rect
            x={hoveredPoint.x - 60}
            y={hoveredPoint.y - 40}
            width={120}
            height={30}
            rx={4}
            fill={themeMode === 'dark' ? '#1F2937' : 'white'}
            stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
            strokeWidth={1}
            opacity={0.9}
          />
          <text
            x={hoveredPoint.x}
            y={hoveredPoint.y - 25}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#F9FAFB' : '#1F2937'}
            fontSize={12}
            fontWeight="500"
          >
            {`${hoveredPoint.point.axis}: ${formatValue(hoveredPoint.point.value)}`}
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
            
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </defs>
    </svg>
  );
});

RadarChart.displayName = 'RadarChart';

export default RadarChart;
