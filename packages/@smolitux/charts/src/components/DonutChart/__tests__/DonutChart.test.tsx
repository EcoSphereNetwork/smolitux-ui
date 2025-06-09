import React from 'react';
import { render, screen } from '@testing-library/react';
import { DonutChart } from '../DonutChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('DonutChart', () => {
  const mockData = [
    { label: 'A', value: 40 },
    { label: 'B', value: 60 },
  ];

  test('renders donut chart with default props', () => {
    render(<DonutChart data={mockData} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('passes through width and height', () => {
    render(<DonutChart data={mockData} width={300} height={300} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '300');
  });

  test('applies custom className', () => {
    render(<DonutChart data={mockData} className="custom" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom');
  });
});
