// packages/@smolitux/charts/src/components/AreaChart/AreaChart.tsx
import React, { useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

export interface AreaChartDataPoint {
  /** X-Wert (Label) */
  x: string | number;
  /** Y-Wert (Datenpunkt) */
  y: number;
  /** Optional: Kategorie für Multi-Serien Charts */
  category?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
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
  /** Gestapelt (für mehrere Serien) */
  stacked?: boolean;
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
  /** Kurven glätten */
  smooth?: boolean;
  /** Füllung für Bereich unter der Kurve */
  filled?: boolean;
  /** Gestapelte Bereiche (für mehrere Serien) */
  stacked?: boolean;
  /** Benutzerdefiniertee Tooltip-Rendering */
  renderTooltip?: (point: AreaChartDataPoint, series: AreaChartSeries) => React.ReactNode;
  /** Unteres Limit für den Bereich (für Bereichsdiagramme mit oberem und unterem Limit) */
  areaBaseValue?: number;
}

/**
 * AreaChart-Komponente für Zeitreihen und kontinuierliche Daten
 * 
 * @example
 * ```tsx
 * <AreaChart
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
 *   filled
 * />
 * ```
 */
export const AreaChart = forwardRef<SVGSVGElement, AreaChartProps>(({
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
  smooth = false,
  filled = true,
  stacked = false,
  renderTooltip,
  areaBaseValue,
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
  
  // Basiswert für den Bereich (default: 0)
  const baseValue = areaBaseValue !== undefined ? areaBaseValue : (startYAxisAtZero ? 0 : undefined);
  
  // Datenaufbereitung und Skalierung
  const {
    xLabels,
    yMin,
    yMax,
    normalizedSeries,
    yScale,
  } = useMemo(() => {
    // Alle X-Labels aus allen Serien extrahieren (für Achsenbeschriftung)
    const allXValues = seriesArray
      .flatMap(series => series.data.map(d => d.x))
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
    
    if (stacked) {
      // Bei gestapelten Bereichen müssen wir die Summen pro X-Wert berechnen
      const stackTotals = new Map<string | number, number>();
      
      allXValues.forEach(x => {
        let sum = 0;
        seriesArray.forEach(series => {
          const point = series.data.find(d => d.x === x);
          if (point) sum += point.y;
        });
        stackTotals.set(x, sum);
        if (sum > maxY) maxY = sum;
      });
      
      if (!startYAxisAtZero) {
        minY = Math.min(...stackTotals.values());
      }
    } else {
      // Normaler Min/Max über alle Serien
      seriesArray.forEach(series => {
        series.data.forEach(point => {
          if (point.y < minY) minY = point.y;
          if (point.y > maxY) maxY = point.y;
        });
      });
    }
    
    // Wenn der Basis-Wert für den Bereich definiert ist, berücksichtigen wir ihn
    if (baseValue !== undefined && baseValue < minY) {
      minY = baseValue;
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
    
    // Y-Skala für die Normalisierung der Werte
    const yScale = (value: number) => {
      return 1 - ((value - minY) / (maxY - minY));
    };
    
    // Normalisierte Daten für die Darstellung
    const normalizedSeries = seriesArray.map((series, index) => {
      return {
        ...series,
        color: series.color || chartColors[index % chartColors.length],
        data: series.data.map(point => ({
          ...point,
          normalizedY: yScale(point.y)
        }))
      };
    });
    
    return {
      xLabels: allXValues,
      yMin: minY,
      yMax: maxY,
      normalizedSeries,
      yScale
    };
  }, [seriesArray, startYAxisAtZero, stacked, baseValue, chartColors]);
  
  // Hier würde die eigentliche Rendering-Logik folgen
  // Für dieses Beispiel geben wir nur ein Platzhalter-SVG zurück
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`smolitux-area-chart ${className}`}
      {...rest}
    >
      <rect
        x="0"
        y="0"
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={themeMode === 'dark' ? '#374151' : '#E5E7EB'}
        strokeWidth="1"
      />
      <text
        x={viewBoxWidth / 2}
        y={viewBoxHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={themeMode === 'dark' ? '#D1D5DB' : '#4B5563'}
        fontSize="24"
      >
        AreaChart Platzhalter
      </text>
    </svg>
  );
});

export default AreaChart;