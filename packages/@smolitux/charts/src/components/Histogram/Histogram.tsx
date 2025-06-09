// 🔧 TODO [Codex]: Tests fehlen – prüfen & umsetzen
import React, { forwardRef, useMemo } from 'react';
import BarChart, { type BarChartProps, type BarChartSeries } from '../BarChart/BarChart';

export interface HistogramProps extends Omit<BarChartProps, 'data'> {
  /** Numeric values to bin */
  data: number[];
  /** Number of bins */
  bins?: number;
}

/**
 * Histogram visualises frequency distribution of numeric data using BarChart.
 */
export const Histogram = forwardRef<SVGSVGElement, HistogramProps>(
  ({ data, bins = 10, ...rest }, ref) => {
    const barSeries = useMemo<BarChartSeries>(() => {
      if (!data || data.length === 0) {
        return { id: 'hist', name: 'Histogram', data: [] };
      }
      const min = Math.min(...data);
      const max = Math.max(...data);
      const step = (max - min) / bins;
      const counts = new Array(bins).fill(0);
      data.forEach((value) => {
        const index = Math.min(Math.floor((value - min) / step), bins - 1);
        counts[index]++;
      });
      const barData = counts.map((count, i) => {
        const start = min + step * i;
        const end = start + step;
        const label = `${start.toFixed(1)}-${end.toFixed(1)}`;
        return { label, value: count };
      });
      return { id: 'hist', name: 'Histogram', data: barData };
    }, [data, bins]);

    return <BarChart ref={ref} data={barSeries} {...rest} />;
  }
);

Histogram.displayName = 'Histogram';

export default Histogram;
