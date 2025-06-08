import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceControlProvider } from './VoiceControlProvider';

describe('VoiceControlProvider', () => {
  it('renders without crashing', () => {
    render(<VoiceControlProvider />);
    expect(screen.getByRole('button', { name: /VoiceControlProvider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceControlProvider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceControlProvider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
