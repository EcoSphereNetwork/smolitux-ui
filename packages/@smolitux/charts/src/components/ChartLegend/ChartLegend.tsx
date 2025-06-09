import React, { forwardRef } from 'react';

export interface LegendItem {
  /** Beschriftung des Eintrags */
  label: string;
  /** Farbe des Eintrags */
  color: string;
}

export interface ChartLegendProps extends React.SVGAttributes<SVGGElement> {
  /** Einträge der Legende */
  items: LegendItem[];
  /** Ausrichtung der Einträge */
  direction?: 'horizontal' | 'vertical';
  /** Abstand zwischen den Einträgen */
  itemSpacing?: number;
  /** Größe der Farbmarkierung */
  markerSize?: number;
}

/**
 * Wiederverwendbare SVG-Legende
 */
export const ChartLegend = forwardRef<SVGGElement, ChartLegendProps>(
  (
    {
      items,
      direction = 'vertical',
      itemSpacing = 20,
      markerSize = 12,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <g ref={ref} className={`smolitux-chart-legend ${className}`.trim()} {...rest} data-testid="chart-legend">
        {items.map((item, index) => {
          const translate =
            direction === 'vertical'
              ? `translate(0, ${index * itemSpacing})`
              : `translate(${index * (markerSize * 4)}, 0)`;
          return (
            <g key={item.label} transform={translate} className="legend-item">
              <rect width={markerSize} height={markerSize} fill={item.color} rx={2} />
              <text x={markerSize + 4} y={markerSize / 2} dominantBaseline="middle" fontSize="12" fill="currentColor">
                {item.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  },
);

ChartLegend.displayName = 'ChartLegend';

export default ChartLegend;
