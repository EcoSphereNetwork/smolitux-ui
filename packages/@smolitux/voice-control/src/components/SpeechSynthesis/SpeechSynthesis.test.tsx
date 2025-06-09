import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@smolitux/theme';
import { SpeechSynthesis } from './SpeechSynthesis';

expect.extend(toHaveNoViolations);

Object.defineProperty(global, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn().mockReturnValue([]),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    speaking: false,
    paused: false,
  },
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

describe('SpeechSynthesis', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders voice control interface', () => {
    render(
      <TestWrapper>
        <SpeechSynthesis text="Hello" />
      </TestWrapper>
    );

    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <SpeechSynthesis text="Hello" />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('shows unsupported message when APIs not available', () => {
    const original = global.speechSynthesis;
    (global as any).speechSynthesis = undefined;

    render(
      <TestWrapper>
        <SpeechSynthesis text="Hello" />
      </TestWrapper>
    );

    expect(screen.getByText(/not supported/i)).toBeInTheDocument();
    (global as any).speechSynthesis = original;
  });
});
