// packages/@smolitux/charts/src/components/ScatterPlot/ScatterPlot.tsx
import React, { useMemo, forwardRef, useState } from 'react';
import { useTheme } from '@smolitux/theme';

export interface ScatterPlotDataPoint {
  /** X-Wert */
  x: number;
  /** Y-Wert */
  y: number;
  /** Größe des Punktes (optional) */
  size?: number;
  /** Farbe des Punktes (optional) */
  color?: string;
  /** Label/Name des Punktes (optional) */
  label?: string;
  /** Optional: Kategorie für Gruppierung */
  category?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}

export interface ScatterPlotSeries {
  /** ID der Serie */
  id: string;
  /** Name der Serie (für Legende) */
  name: string;
  /** Standard-Farbe der Serie */
  color?: string;
  /** Standard-Größe der Punkte */
  pointSize?: number;
  /** Daten der Serie */
  data: ScatterPlotDataPoint[];
  /** Form der Punkte */
  shape?: 'circle' | 'square' | 'triangle' | 'diamond' | 'cross';
}

export interface ScatterPlotProps extends Omit<React.SVGProps<SVGSVGElement>, 'data'> {
  /** Einzelne Datenserie oder Array von Serien */
  data: ScatterPlotSeries | ScatterPlotSeries[];
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
  /** Tooltips anzeigen */
  showTooltips?: boolean;
  /** Legende anzeigen */
  showLegend?: boolean;
  /** Position der Legende */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Animation aktivieren */
  animated?: boolean;
  /** X-Achse bei Null beginnen */
  startXAxisAtZero?: boolean;
  /** Y-Achse bei Null beginnen */
  startYAxisAtZero?: boolean;
  /** Angepasste Farben für mehrere Serien */
  colors?: string[];
  /** Regression-Linie anzeigen */
  showRegressionLine?: boolean;
  /** Angepasste Formatierung für X-Achsenbeschriftungen */
  formatXLabel?: (value: number) => string;
  /** Angepasste Formatierung für Y-Achsenbeschriftungen */
  formatYLabel?: (value: number) => string;
  /** Für responsive SVG (viewBox) */
  aspectRatio?: number;
  /** X-Achsenbereich [min, max] */
  xDomain?: [number, number];
  /** Y-Achsenbereich [min, max] */
  yDomain?: [number, number];
  /** Callback bei Klick auf Punkt */
  onPointClick?: (point: ScatterPlotDataPoint, seriesIndex: number) => void;
}

/**
 * ScatterPlot-Komponente für Datenpunkte in einem x/y-Koordinatensystem
 * 
 * @example
 * ```tsx
 * <ScatterPlot
 *   data={{
 *     id: 'scatter1',
 *     name: 'Datenpunkte',
 *     data: [
 *       { x: 10, y: 20, size: 5 },
 *       { x: 15, y: 30, size: 10 },
 *       { x: 20, y: 15, size: 8 }
 *     ]
 *   }}
 *   height={300}
 *   showGrid
 *   showTooltips
 * />
 * ```
 */
export const ScatterPlot = forwardRef<SVGSVGElement, ScatterPlotProps>(({
  data,
  height = 300,
  width = '100%',
  padding = { top: 30, right: 30, bottom: 40, left: 50 },
  title,
  axisLabels,
  units,
  showGrid = true,
  showTooltips = true,
  showLegend = true,
  legendPosition = 'top',
  animated = true,
  startXAxisAtZero = false,
  startYAxisAtZero = false,
  colors,
  showRegressionLine = false,
  formatXLabel = (value) => `${value}`,
  formatYLabel = (value) => `${value}`,
  aspectRatio = 16 / 9,
  xDomain,
  yDomain,
  onPointClick,
  className = '',
  ...rest
}, ref) => {
  const { themeMode } = useTheme();
  
  // Hover state for tooltips
  const [hoveredPoint, setHoveredPoint] = useState<{
    point: ScatterPlotDataPoint;
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
  
  // Konvertiere einzelne Serie in Array
  const seriesArray = Array.isArray(data) ? data : [data];
  
  // Datenaufbereitung und Domains berechnen
  const { 
    xMin, xMax, yMin, yMax, 
    normalizedSeries, 
    regressionLines 
  } = useMemo(() => {
    // Min/Max X- und Y-Werte für Achsenskalierung ermitteln
    let minX = xDomain ? xDomain[0] : Number.MAX_VALUE;
    let maxX = xDomain ? xDomain[1] : Number.MIN_VALUE;
    let minY = yDomain ? yDomain[0] : Number.MAX_VALUE;
    let maxY = yDomain ? yDomain[1] : Number.MIN_VALUE;
    
    if (!xDomain || !yDomain) {
      // Berechne Min/Max aus den Daten, wenn keine Domains angegeben
      seriesArray.forEach(series => {
        series.data.forEach(point => {
          if (!xDomain) {
            minX = Math.min(minX, point.x);
            maxX = Math.max(maxX, point.x);
          }
          if (!yDomain) {
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
          }
        });
      });
    }
    
    // Optional: Bei 0 beginnen
    if (startXAxisAtZero && minX > 0) minX = 0;
    if (startYAxisAtZero && minY > 0) minY = 0;
    
    // Etwas Abstand zum Rand hinzufügen (5% des Bereichs)
    const xPadding = (maxX - minX) * 0.05;
    const yPadding = (maxY - minY) * 0.05;
    
    if (!xDomain) {
      minX -= xPadding;
      maxX += xPadding;
    }
    
    if (!yDomain) {
      minY -= yPadding;
      maxY += yPadding;
    }
    
    // Regressionslinien berechnen, wenn gewünscht
    const regressionLinesData: { id: string; color: string; points: [number, number][] }[] = [];
    
    if (showRegressionLine) {
      seriesArray.forEach((series, index) => {
        // Einfache lineare Regression mit der Methode der kleinsten Quadrate
        const n = series.data.length;
        
        if (n < 2) return; // Brauchen mindestens 2 Punkte
        
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;
        
        series.data.forEach(point => {
          sumX += point.x;
          sumY += point.y;
          sumXY += point.x * point.y;
          sumX2 += point.x * point.x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Regressionslinie zeichnen (von min x bis max x)
        const color = series.color || chartColors[index % chartColors.length];
        
        regressionLinesData.push({
          id: `regression-${series.id}`,
          color,
          points: [
            [minX, slope * minX + intercept],
            [maxX, slope * maxX + intercept]
          ]
        });
      });
    }
    
    // Normalisiere die Datenserien
    const normalized = seriesArray.map((series, seriesIndex) => {
      // Default oder angegebene Farbe/Größe verwenden
      const color = series.color || chartColors[seriesIndex % chartColors.length];
      const basePointSize = series.pointSize || 8;
      
      // Form und spezifische Eigenheiten
      const shape = series.shape || 'circle';
      
      // Normalisierte Punkte mit Darstellungsinformationen
      const normalizedPoints = series.data.map(point => {
        // Punktgröße (Standard oder aus Datenpunkt)
        const size = point.size || basePointSize;
        
        // Skalierte Koordinaten berechnen (Prozent vom Zeichenbereich)
        const xPos = ((point.x - minX) / (maxX - minX));
        const yPos = 1 - ((point.y - minY) / (maxY - minY)); // Y-Achse ist invertiert
        
        return {
          ...point,
          normalizedX: xPos,
          normalizedY: yPos,
          pointColor: point.color || color,
          pointSize: size
        };
      });
      
      return {
        ...series,
        color,
        shape,
        normalizedPoints
      };
    });
    
    return {
      xMin: minX,
      xMax: maxX,
      yMin: minY,
      yMax: maxY,
      normalizedSeries: normalized,
      regressionLines: regressionLinesData
    };
  }, [seriesArray, startXAxisAtZero, startYAxisAtZero, xDomain, yDomain, chartColors, showRegressionLine]);
  
  // X und Y Achsen-Ticks generieren
  const generateTicks = (min: number, max: number, count: number = 5) => {
    const step = (max - min) / (count - 1);
    return Array.from({ length: count }, (_, i) => min + step * i);
  };
  
  const xTicks = useMemo(() => {
    return generateTicks(xMin, xMax).map(value => ({
      value,
      label: formatXLabel(value),
      position: (value - xMin) / (xMax - xMin)
    }));
  }, [xMin, xMax, formatXLabel]);
  
  const yTicks = useMemo(() => {
    return generateTicks(yMin, yMax).map(value => ({
      value,
      label: formatYLabel(value),
      position: 1 - ((value - yMin) / (yMax - yMin)) // Y-Achse ist invertiert
    }));
  }, [yMin, yMax, formatYLabel]);
  
  // Hilfsfunktion zum Zeichnen von Punkten in verschiedenen Formen
  const renderPoint = (point: ScatterPlotDataPoint & { normalizedX: number; normalizedY: number; pointColor: string; pointSize: number }, seriesIndex: number, shape: string) => {
    // Position in Pixeln berechnen
    const x = paddingLeft + point.normalizedX * drawingWidth;
    const y = paddingTop + point.normalizedY * drawingHeight;
    const size = point.pointSize;
    
    // Hover-Handler
    const handleMouseEnter = () => {
      if (showTooltips) {
        setHoveredPoint({
          point,
          seriesIndex,
          x: x + size / 2,
          y: y - size
        });
      }
    };
    
    const handleMouseLeave = () => {
      setHoveredPoint(null);
    };
    
    const handleClick = () => {
      if (onPointClick) {
        onPointClick(point, seriesIndex);
      }
    };
    
    // Form des Punktes basierend auf Serie darstellen
    switch (shape) {
      case 'square':
        return (
          <rect
            key={`point-${seriesIndex}-${point.x}-${point.y}`}
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            fill={point.pointColor}
            stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
            strokeWidth={1}
            className={`transition-opacity ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            cursor={onPointClick ? 'pointer' : 'default'}
          />
        );
      case 'triangle':
        const trianglePath = `M ${x} ${y - size / Math.sqrt(3)} L ${x + size / 2} ${y + size / (2 * Math.sqrt(3))} L ${x - size / 2} ${y + size / (2 * Math.sqrt(3))} Z`;
        return (
          <path
            key={`point-${seriesIndex}-${point.x}-${point.y}`}
            d={trianglePath}
            fill={point.pointColor}
            stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
            strokeWidth={1}
            className={`transition-opacity ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            cursor={onPointClick ? 'pointer' : 'default'}
          />
        );
      case 'diamond':
        const diamondPath = `M ${x} ${y - size / 2} L ${x + size / 2} ${y} L ${x} ${y + size / 2} L ${x - size / 2} ${y} Z`;
        return (
          <path
            key={`point-${seriesIndex}-${point.x}-${point.y}`}
            d={diamondPath}
            fill={point.pointColor}
            stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
            strokeWidth={1}
            className={`transition-opacity ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            cursor={onPointClick ? 'pointer' : 'default'}
          />
        );
      case 'cross':
        const crossSize = size / 2;
        return (
          <g
            key={`point-${seriesIndex}-${point.x}-${point.y}`}
            className={`transition-opacity ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            cursor={onPointClick ? 'pointer' : 'default'}
          >
            <line
              x1={x - crossSize}
              y1={y - crossSize}
              x2={x + crossSize}
              y2={y + crossSize}
              stroke={point.pointColor}
              strokeWidth={2}
            />
            <line
              x1={x - crossSize}
              y1={y + crossSize}
              x2={x + crossSize}
              y2={y - crossSize}
              stroke={point.pointColor}
              strokeWidth={2}
            />
          </g>
        );
      case 'circle':
      default:
        return (
          <circle
            key={`point-${seriesIndex}-${point.x}-${point.y}`}
            cx={x}
            cy={y}
            r={size / 2}
            fill={point.pointColor}
            stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
            strokeWidth={1}
            className={`transition-opacity ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            cursor={onPointClick ? 'pointer' : 'default'}
          />
        );
    }
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
      
      {/* Grid-Linien */}
      {showGrid && (
        <g className="grid-lines">
          {/* Horizontale Grid-Linien (Y-Achse) */}
          {yTicks.map(tick => (
            <line
              key={`y-grid-${tick.value}`}
              x1={paddingLeft}
              y1={paddingTop + tick.position * drawingHeight}
              x2={paddingLeft + drawingWidth}
              y2={paddingTop + tick.position * drawingHeight}
              stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          ))}
          
          {/* Vertikale Grid-Linien (X-Achse) */}
          {xTicks.map(tick => (
            <line
              key={`x-grid-${tick.value}`}
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
      
      {/* Regressionslinien, falls angefordert */}
      {showRegressionLine && (
        <g className="regression-lines">
          {regressionLines.map(line => {
            const x1 = paddingLeft + ((line.points[0][0] - xMin) / (xMax - xMin)) * drawingWidth;
            const y1 = paddingTop + (1 - ((line.points[0][1] - yMin) / (yMax - yMin))) * drawingHeight;
            const x2 = paddingLeft + ((line.points[1][0] - xMin) / (xMax - xMin)) * drawingWidth;
            const y2 = paddingTop + (1 - ((line.points[1][1] - yMin) / (yMax - yMin))) * drawingHeight;
            
            return (
              <line
                key={line.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray="5,5"
                opacity={0.7}
                className={animated ? 'animate-draw' : ''}
                style={animated ? { 
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: 'draw 1.5s ease-in-out forwards 0.5s'
                } : {}}
              />
            );
          })}
        </g>
      )}
      
      {/* Datenpunkte */}
      <g className="data-points">
        {normalizedSeries.map((series, seriesIndex) => (
          <g key={`series-${series.id}`} className="series">
            {series.normalizedPoints.map((point) => 
              renderPoint(point, seriesIndex, series.shape || 'circle')
            )}
          </g>
        ))}
      </g>
      
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
        
        {/* X-Achsen-Ticks und Labels */}
        {xTicks.map(tick => (
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
              fontSize={12}
            >
              {tick.label}
              {units?.x ? ` ${units.x}` : ''}
            </text>
          </g>
        ))}
        
        {/* X-Achsentitel */}
        {axisLabels?.x && (
          <text
            x={paddingLeft + drawingWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
            fontSize={14}
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
        
        {/* Y-Achsen-Ticks und Labels */}
        {yTicks.map(tick => (
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
              fontSize={12}
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
            fontSize={14}
            fontWeight="bold"
          >
            {axisLabels.y}
          </text>
        )}
      </g>
      
      {/* Legende */}
      {showLegend && normalizedSeries.length > 1 && (
        <g className="chart-legend">
          {(() => {
            // Positionierung der Legende basierend auf legendPosition
            const legendY = legendPosition === 'top' 
              ? 10 
              : legendPosition === 'bottom' 
                ? height - 10 - normalizedSeries.length * 20 
                : paddingTop + 10;
                
            const legendX = legendPosition === 'right' 
              ? paddingLeft + drawingWidth + 10 
              : legendPosition === 'left' 
                ? 10 
                : paddingLeft + 10;
                
            return (
              <g transform={`translate(${legendX}, ${legendY})`}>
                {normalizedSeries.map((series, index) => (
                  <g 
                    key={`legend-${series.id}`} 
                    transform={`translate(0, ${index * 20})`}
                  >
                    {/* Legendensymbol entsprechend der Punktform */}
                    <g className="legend-symbol">
                      {(() => {
                        switch (series.shape) {
                        case 'square':
                          return (
                            <rect
                              width={12}
                              height={12}
                              fill={series.color}
                              stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
                              strokeWidth={1}
                            />
                          );
                        case 'triangle':
                          return (
                            <path
                              d="M6 0 L12 12 L0 12 Z"
                              fill={series.color}
                              stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
                              strokeWidth={1}
                            />
                          );
                        case 'diamond':
                          return (
                            <path
                              d="M6 0 L12 6 L6 12 L0 6 Z"
                              fill={series.color}
                              stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
                              strokeWidth={1}
                            />
                          );
                        case 'cross':
                          return (
                            <g>
                              <line
                                x1={0}
                                y1={0}
                                x2={12}
                                y2={12}
                                stroke={series.color}
                                strokeWidth={2}
                              />
                              <line
                                x1={0}
                                y1={12}
                                x2={12}
                                y2={0}
                                stroke={series.color}
                                strokeWidth={2}
                              />
                            </g>
                          );
                        case 'circle':
                        default:
                          return (
                            <circle
                              cx={6}
                              cy={6}
                              r={6}
                              fill={series.color}
                              stroke={themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'}
                              strokeWidth={1}
                            />
                          );
                      })()
                    </g>
                    <text
                      x={20}
                      y={6}
                      dominantBaseline="middle"
                      fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
                      fontSize={12}
                    >
                      {series.name}
                    </text>
