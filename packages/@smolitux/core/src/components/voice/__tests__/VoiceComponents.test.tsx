import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { VoiceButton } from '../VoiceButton';
import { VoiceInput } from '../VoiceInput';
import { VoiceSelect } from '../VoiceSelect';
import { VoiceModal } from '../VoiceModal';
import { VoiceCard } from '../VoiceCard';
import { useVoiceControl } from '@smolitux/voice-control';

jest.mock('@smolitux/voice-control', () => {
  const actual = jest.requireActual('@smolitux/voice-control');
  return {
    ...actual,
    useVoiceControl: jest.fn(),
  };
});

const context: unknown = {
  isListening: false,
  startListening: jest.fn(),
  stopListening: jest.fn(),
  recognizedText: '',
  lastCommand: '',
  targetComponent: null,
  registerComponent: jest.fn(),
  unregisterComponent: jest.fn(),
};

beforeEach(() => {
  (useVoiceControl as jest.Mock).mockImplementation(() => context);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  context.lastCommand = '';
  context.targetComponent = null;
});

describe('voice component registration', () => {
  const components = [VoiceButton, VoiceInput, VoiceSelect, VoiceModal, VoiceCard];

  test.each(components)('%p registers on mount', (Component) => {
    render(<Component />);
    expect(context.registerComponent).toHaveBeenCalledTimes(1);
    context.registerComponent.mockClear();
  });

  test.each(components)('%p unregisters on unmount', (Component) => {
    const { unmount } = render(<Component />);
    unmount();
    expect(context.unregisterComponent).toHaveBeenCalledTimes(1);
    context.unregisterComponent.mockClear();
  });
});

describe('VoiceButton command handling', () => {
  test('triggers click on recognized command', () => {
    const onClick = jest.fn();
    const { container, rerender } = render(<VoiceButton id="btn" onClick={onClick} />);
    const id = context.registerComponent.mock.calls[0][0];
    context.lastCommand = 'klick';
    context.targetComponent = id;
    rerender(<VoiceButton id="btn" onClick={onClick} />);
    expect(onClick).toHaveBeenCalled();
    expect(container.querySelector('button')).toBeTruthy();
  });
});
