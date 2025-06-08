import React from 'react';
import { render, screen } from '@testing-library/react';
import { withVoiceControl } from './withVoiceControl';

describe('withVoiceControl', () => {
  it('renders without crashing', () => {
    render(<withVoiceControl />);
    expect(screen.getByRole('button', { name: /withVoiceControl/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<withVoiceControl className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<withVoiceControl ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
