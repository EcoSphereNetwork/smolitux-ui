import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabView, TabItem } from './TabView';

const tabs: TabItem[] = [
  { id: 'one', label: 'One', content: <div>First</div> },
  { id: 'two', label: 'Two', content: <div>Second</div> },
];

describe('TabView', () => {
  it('renders tab list and panels', () => {
    render(<TabView tabs={tabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('applies custom className', () => {
    render(<TabView tabs={tabs} className="custom" />);
    const container = screen.getByRole('tablist').parentElement;
    expect(container).toHaveClass('custom');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TabView tabs={tabs} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
