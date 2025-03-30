import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from '../LineChart';

// Mock for useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('LineChart', () => {
  const mockData = {
    id: 'temperature',
    name: 'Temperature',
    data: [
      { x: 'Jan', y: 5 },
      { x: 'Feb', y: 7 },
      { x: 'Mar', y: 12 },
      { x: 'Apr', y: 15 },
      { x: 'May', y: 20 },
      { x: 'Jun', y: 25 }
    ]
  };

  test('renders chart with default props', () => {
    render(<LineChart data={mockData} />);
    
    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Legend should be rendered by default
    expect(screen.getByText('Temperature')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<LineChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('applies custom className', () => {
    render(<LineChart data={mockData} className="custom-chart" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-chart');
  });

  test('renders with title when provided', () => {
    render(<LineChart data={mockData} title="Temperature Chart" />);
    
    expect(screen.getByText('Temperature Chart')).toBeInTheDocument();
  });

  test('renders axis labels when provided', () => {
    render(<LineChart 
      data={mockData} 
      axisLabels={{ x: 'Month', y: 'Temperature' }}
    />);
    
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
  });

  test('renders axis units when provided', () => {
    render(<LineChart 
      data={mockData} 
      units={{ y: '°C' }}
      showValues={true}
    />);
    
    // Check if at least one tick has the unit
    const tickWithUnit = screen.getByText('5 °C');
    expect(tickWithUnit).toBeInTheDocument();
  });

  test('handles array of data series', () => {
    const multiSeriesData = [
      mockData,
      {
        id: 'humidity',
        name: 'Humidity',
        data: [
          { x: 'Jan', y: 65 },
          { x: 'Feb', y: 60 },
          { x: 'Mar', y: 55 },
          { x: 'Apr', y: 50 },
          { x: 'May', y: 45 },
          { x: 'Jun', y: 40 }
        ]
      }
    ];
    
    render(<LineChart data={multiSeriesData} />);
    
    // Both series names should be in the legend
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
  });

  test('renders with different line types', () => {
    const multiSeriesData = [
      {
        ...mockData,
        lineType: 'dashed'
      },
      {
        id: 'humidity',
        name: 'Humidity',
        lineType: 'dotted',
        data: [
          { x: 'Jan', y: 65 },
          { x: 'Feb', y: 60 },
          { x: 'Mar', y: 55 },
          { x: 'Apr', y: 50 },
          { x: 'May', y: 45 },
          { x: 'Jun', y: 40 }
        ]
      }
    ];
    
    render(<LineChart data={multiSeriesData} />);
    
    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Check for dashed and dotted lines
    const paths = document.querySelectorAll('path.line');
    expect(paths.length).toBe(2);
    
    const dashedPath = Array.from(paths).find(path => 
      path.getAttribute('stroke-dasharray') !== null
    );
    expect(dashedPath).toBeInTheDocument();
  });

  test('renders with area fill when showArea is true', () => {
    render(<LineChart data={mockData} showArea={true} />);
    
    // Check for area path
    const areaPath = document.querySelector('path.area');
    expect(areaPath).toBeInTheDocument();
  });

  test('renders with data points when showPoints is true', () => {
    render(<LineChart data={mockData} showPoints={true} />);
    
    // Check for data points (circles)
    const points = document.querySelectorAll('circle.data-point');
    expect(points.length).toBe(mockData.data.length);
  });

  test('renders without animation when animated prop is false', () => {
    render(<LineChart data={mockData} animated={false} />);
    
    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Check that no animation styles are applied
    const paths = document.querySelectorAll('path.line');
    const animatedPaths = Array.from(paths).filter(path => 
      path.classList.contains('animate-draw')
    );
    
    expect(animatedPaths.length).toBe(0);
  });

  test('renders without legend when showLegend is false', () => {
    render(<LineChart data={mockData} showLegend={false} />);
    
    // Legend should not be rendered
    expect(screen.queryByText('Temperature')).not.toBeInTheDocument();
  });

  test('renders with custom colors when provided', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<LineChart data={mockData} colors={customColors} />);
    
    // SVG should be rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Check that the line has the first custom color
    const path = document.querySelector('path.line');
    expect(path).toHaveAttribute('stroke', '#FF0000');
  });
});