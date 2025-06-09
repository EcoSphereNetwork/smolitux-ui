// TODO: Tests fehlen
import React, { forwardRef } from 'react';

export interface ChartAxisTick {
  /** Wert des Ticks */
  value: string | number;
  /** Position relativ (0-1) */
  position: number;
  /** Optionales Label */
  label?: string;
}

export interface ChartAxisProps extends React.SVGAttributes<SVGGElement> {
  /** Orientierung der Achse */
  orientation?: 'horizontal' | 'vertical';
  /** Gesamtlänge der Achse */
  length: number;
  /** Ticks für die Achse */
  ticks?: ChartAxisTick[];
  /** Achsenlabel */
  axisLabel?: string;
  /** Abstand der Ticks */
  tickSize?: number;
}

/**
 * Universelle Achsen-Komponente für SVG-Charts
 */
export const ChartAxis = forwardRef<SVGGElement, ChartAxisProps>(
  (
    {
      orientation = 'horizontal',
      length,
      ticks = [],
      axisLabel,
      tickSize = 6,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const axisLine = isHorizontal
      ? { x1: 0, y1: 0, x2: length, y2: 0 }
      : { x1: 0, y1: 0, x2: 0, y2: length };

    return (
      <g ref={ref} className={`smolitux-chart-axis ${className}`.trim()} {...rest} data-testid="chart-axis">
        <line {...axisLine} stroke="currentColor" />
        {ticks.map((tick) => {
          const pos = tick.position * length;
          const tickProps = isHorizontal
            ? { x1: pos, y1: 0, x2: pos, y2: tickSize }
            : { x1: 0, y1: pos, x2: -tickSize, y2: pos };
          const textProps = isHorizontal
            ? { x: pos, y: tickSize + 12, textAnchor: 'middle' as const }
            : { x: -tickSize - 2, y: pos, textAnchor: 'end' as const, dominantBaseline: 'middle' as const };
          return (
            <g key={tick.value} className="tick">
              <line {...tickProps} stroke="currentColor" />
              <text {...textProps} fontSize="12" fill="currentColor">
                {tick.label ?? tick.value}
              </text>
            </g>
          );
        })}
        {axisLabel && (
          <text
            x={isHorizontal ? length / 2 : -tickSize - 20}
            y={isHorizontal ? tickSize + 28 : length / 2}
            textAnchor="middle"
            transform={isHorizontal ? undefined : `rotate(-90, ${-tickSize - 20}, ${length / 2})`}
            fontSize="12"
            fontWeight="bold"
            fill="currentColor"
          >
            {axisLabel}
          </text>
        )}
      </g>
    );
  },
);

ChartAxis.displayName = 'ChartAxis';

export default ChartAxis;
