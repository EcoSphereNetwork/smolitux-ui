import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceSelect } from './VoiceSelect';

describe('VoiceSelect', () => {
  it('renders without crashing', () => {
    render(<VoiceSelect />);
    expect(screen.getByRole('button', { name: /VoiceSelect/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceSelect className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceSelect ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
