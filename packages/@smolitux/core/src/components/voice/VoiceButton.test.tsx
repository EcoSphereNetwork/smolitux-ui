import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceButton } from './VoiceButton';

describe('VoiceButton', () => {
  it('renders without crashing', () => {
    render(<VoiceButton />);
    expect(screen.getByRole('button', { name: /VoiceButton/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceButton className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
