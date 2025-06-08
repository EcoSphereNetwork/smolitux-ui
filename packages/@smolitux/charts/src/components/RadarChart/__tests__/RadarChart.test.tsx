import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadarChart } from '../RadarChart';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('RadarChart', () => {
  const mockData = {
    id: 'skills',
    name: 'Skills Assessment',
    data: [
      { axis: 'JavaScript', value: 80 },
      { axis: 'React', value: 90 },
      { axis: 'CSS', value: 70 },
      { axis: 'HTML', value: 95 },
      { axis: 'Node.js', value: 75 },
      { axis: 'TypeScript', value: 85 },
    ],
  };

  test('renders chart with default props', () => {
    render(<RadarChart data={mockData} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Axis labels should be rendered
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<RadarChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<RadarChart data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<RadarChart data={mockData} title="Skills Radar Chart" />);

    expect(screen.getByText('Skills Radar Chart')).toBeInTheDocument();
  });

  test('handles array of data series', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'teamAverage',
        name: 'Team Average',
        data: [
          { axis: 'JavaScript', value: 75 },
          { axis: 'React', value: 80 },
          { axis: 'CSS', value: 65 },
          { axis: 'HTML', value: 90 },
          { axis: 'Node.js', value: 70 },
          { axis: 'TypeScript', value: 75 },
        ],
      },
    ];

    render(<RadarChart data={multiSeriesData} />);

    // Both series names should be in the legend
    expect(screen.getByText('Skills Assessment')).toBeInTheDocument();
    expect(screen.getByText('Team Average')).toBeInTheDocument();
  });

  test('renders with custom colors', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<RadarChart data={mockData} colors={customColors} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Radar area should have the first custom color
    const radarArea = document.querySelector('path.radar-area');
    expect(radarArea).toHaveAttribute('fill', '#FF0000');
  });

  test('renders with custom levels', () => {
    render(<RadarChart data={mockData} levels={5} />);

    // Level circles should be rendered
    const levelCircles = document.querySelectorAll('circle.level-circle');
    expect(levelCircles.length).toBe(5);
  });

  test('renders with custom opacity', () => {
    render(<RadarChart data={mockData} areaOpacity={0.5} />);

    // Radar area should have the specified opacity
    const radarArea = document.querySelector('path.radar-area');
    expect(radarArea).toHaveAttribute('fill-opacity', '0.5');
  });

  test('renders with animation when animated is true', () => {
    render(<RadarChart data={mockData} animated={true} />);

    // Radar area should have animation class
    const radarArea = document.querySelector('path.radar-area');
    expect(radarArea).toHaveClass('animate-radar');
  });

  test('renders without animation when animated is false', () => {
    render(<RadarChart data={mockData} animated={false} />);

    // Radar area should not have animation class
    const radarArea = document.querySelector('path.radar-area');
    expect(radarArea).not.toHaveClass('animate-radar');
  });

  test('renders with custom max value', () => {
    render(<RadarChart data={mockData} maxValue={100} />);

    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders with custom axis labels', () => {
    render(
      <RadarChart
        data={mockData}
        axisLabels={{
          JavaScript: 'JS',
          React: 'React.js',
          CSS: 'CSS3',
          HTML: 'HTML5',
          'Node.js': 'Node',
          TypeScript: 'TS',
        }}
      />
    );

    // Custom axis labels should be rendered
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('CSS3')).toBeInTheDocument();
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByText('TS')).toBeInTheDocument();
  });

  test('renders with custom value formatter', () => {
    render(<RadarChart data={mockData} showValues={true} formatValue={(value) => `${value}%`} />);

    // Value labels should be rendered with the custom format
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  test('renders with legend when showLegend is true', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'teamAverage',
        name: 'Team Average',
        data: [
          { axis: 'JavaScript', value: 75 },
          { axis: 'React', value: 80 },
          { axis: 'CSS', value: 65 },
          { axis: 'HTML', value: 90 },
          { axis: 'Node.js', value: 70 },
          { axis: 'TypeScript', value: 75 },
        ],
      },
    ];

    render(<RadarChart data={multiSeriesData} showLegend={true} />);

    // Legend should be rendered
    expect(screen.getByText('Skills Assessment')).toBeInTheDocument();
    expect(screen.getByText('Team Average')).toBeInTheDocument();
  });

  test('renders without legend when showLegend is false', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'teamAverage',
        name: 'Team Average',
        data: [
          { axis: 'JavaScript', value: 75 },
          { axis: 'React', value: 80 },
          { axis: 'CSS', value: 65 },
          { axis: 'HTML', value: 90 },
          { axis: 'Node.js', value: 70 },
          { axis: 'TypeScript', value: 75 },
        ],
      },
    ];

    render(<RadarChart data={multiSeriesData} showLegend={false} />);

    // Legend should not be rendered
    expect(screen.queryByText('Skills Assessment')).not.toBeInTheDocument();
    expect(screen.queryByText('Team Average')).not.toBeInTheDocument();
  });

  test('handles malformed data gracefully', () => {
    const badData: any = { id: 'bad' };
    render(<RadarChart data={badData} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
