import React from 'react';
import { render, screen } from '@testing-library/react';
import { FakeNewsDetector } from './FakeNewsDetector';

describe('FakeNewsDetector', () => {
  it('renders without crashing', () => {
    render(<FakeNewsDetector />);
    expect(screen.getByRole('button', { name: /FakeNewsDetector/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FakeNewsDetector className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FakeNewsDetector ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
