import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceCard } from './VoiceCard';

describe('VoiceCard', () => {
  it('renders without crashing', () => {
    render(<VoiceCard />);
    expect(screen.getByRole('button', { name: /VoiceCard/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceCard className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceCard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
