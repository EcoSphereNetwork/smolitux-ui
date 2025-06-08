import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoiceModal } from './VoiceModal';

describe('VoiceModal', () => {
  it('renders without crashing', () => {
    render(<VoiceModal />);
    expect(screen.getByRole('button', { name: /VoiceModal/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VoiceModal className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<VoiceModal ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
