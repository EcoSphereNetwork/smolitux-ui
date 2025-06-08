import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceInput } from './VoiceInput';

describe('VoiceInput', () => {
  it('renders without crashing', () => {
    render(<VoiceInput />);
    expect(screen.getByRole('button', { name: /VoiceInput/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceInput className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
