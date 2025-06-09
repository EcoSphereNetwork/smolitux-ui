import React from 'react';
import { render } from '@testing-library/react';
import { DonutChart } from './DonutChart';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('DonutChart', () => {
  const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 70 },
  ];

  it('renders svg element', () => {
    const { container } = render(<DonutChart data={data} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('passes props to PieChart wrapper', () => {
    const { container } = render(
      <DonutChart data={data} width={200} height={200} className="chart" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg).toHaveClass('chart');
  });
});
