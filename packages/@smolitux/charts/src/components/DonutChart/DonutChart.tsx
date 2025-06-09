import React, { forwardRef } from 'react';
import PieChart, { type PieChartProps } from '../PieChart/PieChart';

export interface DonutChartProps extends Omit<PieChartProps, 'donut'> {}

/**
 * DonutChart is a thin wrapper around PieChart with donut mode enabled by default.
 */
export const DonutChart = forwardRef<SVGSVGElement, DonutChartProps>(({ ...props }, ref) => (
  <PieChart ref={ref} donut {...props} />
));

DonutChart.displayName = 'DonutChart';

export default DonutChart;
