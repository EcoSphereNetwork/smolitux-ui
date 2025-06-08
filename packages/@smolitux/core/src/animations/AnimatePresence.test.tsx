import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatePresence } from './AnimatePresence';

describe('AnimatePresence', () => {
  it('renders without crashing', () => {
    render(<AnimatePresence />);
    expect(screen.getByRole('button', { name: /AnimatePresence/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AnimatePresence className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<AnimatePresence ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
