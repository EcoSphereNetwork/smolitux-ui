import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from '../NotificationCenter';

describe('NotificationCenter', () => {
  it('renders without crashing', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByTestId('notification-center')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<NotificationCenter notifications={[]} className="custom-class" />);
    expect(screen.getByTestId('notification-center')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<NotificationCenter notifications={[]} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
