import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VoiceRecognition } from './VoiceRecognition';

expect.extend(toHaveNoViolations);

declare global {
  interface Window {
    SpeechRecognition: unknown;
    webkitSpeechRecognition: unknown;
  }
}

describe('VoiceRecognition', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders unsupported message if API missing', () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;
    const { getByRole } = render(<VoiceRecognition />);
    expect(getByRole('status')).toHaveTextContent('Speech recognition not supported');
  });

  it('starts and stops recognition', () => {
    const start = jest.fn();
    const stop = jest.fn();
    const Mock = jest.fn().mockImplementation(() => ({ start, stop }));
    window.SpeechRecognition = Mock;
    const { getByRole } = render(<VoiceRecognition />);
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(start).toHaveBeenCalled();
    fireEvent.click(btn);
    expect(stop).toHaveBeenCalled();
  });

  it('has no a11y violations', async () => {
    window.SpeechRecognition = jest.fn().mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
    const { container } = render(<VoiceRecognition />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
