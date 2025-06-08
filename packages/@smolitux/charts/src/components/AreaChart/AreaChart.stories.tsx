import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    showGrid: { control: { type: 'boolean' } },
    showPoints: { control: { type: 'boolean' } },
    showTooltips: { control: { type: 'boolean' } },
    showLegend: { control: { type: 'boolean' } },
    animated: { control: { type: 'boolean' } },
    startYAxisAtZero: { control: { type: 'boolean' } },
    smooth: { control: { type: 'boolean' } },
    filled: { control: { type: 'boolean' } },
    stacked: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

// Beispieldaten für eine einzelne Serie
const singleSeriesData = {
  id: 'pageViews',
  name: 'Seitenaufrufe',
  data: [
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 150 },
    { x: 'Mär', y: 200 },
    { x: 'Apr', y: 120 },
    { x: 'Mai', y: 180 },
    { x: 'Jun', y: 250 },
  ],
};

// Beispieldaten für mehrere Serien
const multiSeriesData = [
  {
    id: 'pageViews',
    name: 'Seitenaufrufe',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mär', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'Mai', y: 180 },
      { x: 'Jun', y: 250 },
    ],
  },
  {
    id: 'uniqueVisitors',
    name: 'Eindeutige Besucher',
    data: [
      { x: 'Jan', y: 50 },
      { x: 'Feb', y: 90 },
      { x: 'Mär', y: 120 },
      { x: 'Apr', y: 80 },
      { x: 'Mai', y: 110 },
      { x: 'Jun', y: 150 },
    ],
  },
];

export const Default: Story = {
  args: {
    data: singleSeriesData,
    height: 300,
    width: 600,
    title: 'Seitenaufrufe pro Monat',
    showGrid: true,
    showPoints: true,
    showTooltips: true,
    showLegend: true,
    animated: true,
    startYAxisAtZero: true,
    smooth: false,
    filled: true,
  },
};

export const MultiSeries: Story = {
  args: {
    data: multiSeriesData,
    height: 300,
    width: 600,
    title: 'Website-Statistiken',
    showGrid: true,
    showPoints: true,
    showTooltips: true,
    showLegend: true,
    legendPosition: 'bottom',
    animated: true,
    startYAxisAtZero: true,
    smooth: false,
    filled: true,
  },
};

export const Stacked: Story = {
  args: {
    data: multiSeriesData,
    height: 300,
    width: 600,
    title: 'Gestapelte Website-Statistiken',
    showGrid: true,
    showPoints: false,
    showTooltips: true,
    showLegend: true,
    legendPosition: 'right',
    animated: true,
    startYAxisAtZero: true,
    smooth: false,
    filled: true,
    stacked: true,
  },
};

export const Smooth: Story = {
  args: {
    data: singleSeriesData,
    height: 300,
    width: 600,
    title: 'Geglättete Kurve',
    showGrid: true,
    showPoints: true,
    showTooltips: true,
    showLegend: false,
    animated: true,
    startYAxisAtZero: true,
    smooth: true,
    filled: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: multiSeriesData,
    height: 300,
    width: 600,
    title: 'Benutzerdefinierte Farben',
    showGrid: true,
    showPoints: true,
    showTooltips: true,
    showLegend: true,
    animated: true,
    startYAxisAtZero: true,
    smooth: false,
    filled: true,
    colors: ['#FF6B6B', '#4ECDC4'],
  },
};

export const WithAxisLabels: Story = {
  args: {
    data: singleSeriesData,
    height: 300,
    width: 600,
    title: 'Mit Achsenbeschriftungen',
    axisLabels: { x: 'Monat', y: 'Anzahl' },
    units: { y: 'Besucher' },
    showGrid: true,
    showPoints: true,
    showTooltips: true,
    showLegend: true,
    animated: true,
    startYAxisAtZero: true,
    smooth: false,
    filled: true,
  },
};
